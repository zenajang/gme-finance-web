'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { COMMON_COLORS } from '@/constants/colors';
import dynamicImport from 'next/dynamic';
import '../components/admin/TiptapEditor.css';
import type { User } from '@supabase/supabase-js';
import { useSWRConfig } from 'swr';

// Tiptap editor dynamic import (disable SSR)
const TiptapEditor = dynamicImport(() => import('@/app/components/admin/TiptapEditor'), {
  ssr: false,
  loading: () => (
    <div className="h-64 bg-gray-50 rounded-xl flex items-center justify-center">
      <div className="flex items-center gap-3 text-gray-500">
        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
        <span>Loading editor...</span>
      </div>
    </div>
  )
});

interface BlogPost {
  id: string;
  title: string;
  content: string;
  author_id: string;
  author_email: string;
  published: boolean;
  category: 'blog' | 'customer_feedback';
  thumbnail_url?: string | null;
  created_at: string;
  updated_at: string;
}

// HTML에서 자체 업로드 비디오 URL 추출
function extractVideoSrc(html: string): string | null {
  const videoTagMatch = html.match(/<video[^>]*>/);
  if (videoTagMatch) {
    const srcMatch = videoTagMatch[0].match(/src=["']([^"']+)["']/);
    if (srcMatch) return srcMatch[1];
  }
  const sourceMatch = html.match(/<source[^>]*src=["']([^"']+)["']/);
  return sourceMatch ? sourceMatch[1] : null;
}

// YouTube 비디오 ID 추출
function extractYoutubeId(html: string): string | null {
  const embedMatch = html.match(/youtube\.com\/embed\/([^?&"'\s>]+)/);
  if (embedMatch) return embedMatch[1];
  return null;
}

// YouTube 썸네일 URL 생성
function getYoutubeThumbnail(videoId: string): string {
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}

// 비디오 타입 및 정보 추출
function getVideoInfo(html: string): { type: 'video' | 'youtube' | null; src: string | null; thumbnail: string | null } {
  // 자체 업로드 비디오 체크
  const videoSrc = extractVideoSrc(html);
  if (videoSrc) {
    return { type: 'video', src: videoSrc, thumbnail: null };
  }

  // YouTube 체크
  const youtubeId = extractYoutubeId(html);
  if (youtubeId) {
    return { type: 'youtube', src: null, thumbnail: getYoutubeThumbnail(youtubeId) };
  }

  return { type: null, src: null, thumbnail: null };
}

// HTML에서 첫 번째 이미지 URL 추출
function extractFirstImage(html: string): string | null {
  const imgMatch = html.match(/<img[^>]*src="([^">]+)"/);
  return imgMatch ? imgMatch[1] : null;
}

// HTML 태그 제거하고 텍스트만 추출
function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').trim();
}

async function generateVideoThumbnail(videoUrl: string): Promise<string | null> {
  try {
    const video = document.createElement('video');
    video.crossOrigin = 'anonymous';
    video.muted = true;
    video.playsInline = true;
    video.preload = 'metadata';
    video.src = videoUrl;

    await new Promise<void>((resolve, reject) => {
      const onLoaded = () => resolve();
      const onError = () => reject(new Error('Video load failed'));
      video.addEventListener('loadedmetadata', onLoaded, { once: true });
      video.addEventListener('error', onError, { once: true });
    });

    const seekTime = Number.isFinite(video.duration)
      ? Math.min(0.5, Math.max(0, video.duration * 0.1))
      : 0.5;

    await new Promise<void>((resolve, reject) => {
      const onSeeked = () => resolve();
      const onError = () => reject(new Error('Video seek failed'));
      video.addEventListener('seeked', onSeeked, { once: true });
      video.addEventListener('error', onError, { once: true });
      video.currentTime = seekTime;
    });

    const canvas = document.createElement('canvas');
    const maxWidth = 640;
    const scale = video.videoWidth > 0 ? Math.min(1, maxWidth / video.videoWidth) : 1;
    canvas.width = Math.round(video.videoWidth * scale);
    canvas.height = Math.round(video.videoHeight * scale);

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return null;
    }

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const blob = await new Promise<Blob | null>((resolve) => {
      canvas.toBlob(resolve, 'image/jpeg', 0.75);
    });

    if (!blob) {
      return null;
    }

    const supabase = createClient();
    const fileName = `${Date.now()}_${Math.random().toString(36).slice(2)}.jpg`;
    const filePath = `blog-thumbnails/${fileName}`;
    const { error } = await supabase.storage
      .from('images')
      .upload(filePath, blob, {
        cacheControl: '31536000',
        upsert: false,
        contentType: 'image/jpeg',
      });

    if (error) {
      console.error('Thumbnail upload error:', error);
      return null;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('images')
      .getPublicUrl(filePath);

    return publicUrl || null;
  } catch (error) {
    console.error('Thumbnail generation error:', error);
    return null;
  }
}

async function getThumbnailUrlFromContent(html: string): Promise<string | null> {
  const videoInfo = getVideoInfo(html);
  if (videoInfo.type === 'youtube' && videoInfo.thumbnail) {
    return videoInfo.thumbnail;
  }

  if (videoInfo.type === 'video' && videoInfo.src) {
    return generateVideoThumbnail(videoInfo.src);
  }

  return null;
}

export default function AdminPage() {
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'write' | 'list'>('write');

  // Blog post state
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<'blog' | 'customer_feedback'>('blog');
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [saving, setSaving] = useState(false);

  // Edit mode state
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  // Filter state for posts list
  const [filterCategory, setFilterCategory] = useState<'all' | 'blog' | 'customer_feedback'>('all');

  // Check user authentication
  useEffect(() => {
    checkUser();
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 페이지가 히스토리에서 복원될 때마다 인증 체크
  useEffect(() => {
    const handlePageShow = (event: PageTransitionEvent) => {
      // bfcache(Back/Forward Cache)에서 복원된 경우
      if (event.persisted) {
        checkUser();
      }
    };

    const handleVisibilityChange = () => {
      // 페이지가 다시 보일 때 인증 체크
      if (document.visibilityState === 'visible') {
        checkUser();
      }
    };

    window.addEventListener('pageshow', handlePageShow);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('pageshow', handlePageShow);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle browser back/forward button and page navigation
  useEffect(() => {
    const handlePopState = async () => {
      // 즉시 히스토리를 다시 푸시해서 페이지 이동을 막음
      window.history.pushState(null, '', '/admin');

      const shouldLogout = window.confirm('로그아웃하고 페이지를 나가시겠습니까?');

      if (shouldLogout) {
        const supabase = createClient();
        await supabase.auth.signOut();
        window.location.replace('/');
      }
    };

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = '';
    };

    // 초기 히스토리 스택에 현재 페이지 추가
    window.history.pushState(null, '', '/admin');

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [router]);

  async function checkUser() {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.replace('/login?redirect=/admin');
    } else {
      setUser(user);
    }
    setLoading(false);
  }

  async function fetchPosts() {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setPosts(data);
    }
  }

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.replace('/login');
  }

  async function handleSave() {
    if (!title || !content) {
      alert('Please enter both title and content.');
      return;
    }

    setSaving(true);

    try {
      const thumbnailUrl = await getThumbnailUrlFromContent(content);
      const supabase = createClient();
      if (isEditMode && editingPostId) {
        const updatePayload: {
          title: string;
          content: string;
          category: string;
          updated_at: string;
          thumbnail_url?: string;
        } = {
          title,
          content,
          category,
          updated_at: new Date().toISOString(),
        };
        if (thumbnailUrl) {
          updatePayload.thumbnail_url = thumbnailUrl;
        }

        const { data, error } = await supabase
          .from('blog_posts')
          .update(updatePayload)
          .eq('id', editingPostId)
          .select();

        if (error) {
          alert('Error updating post: ' + error.message);
        } else if (!data || data.length === 0) {
          alert('Update failed: No rows were updated. Please check permissions.');
        } else {
          alert('Post updated successfully!');
          mutate(
            (key) =>
              Array.isArray(key) &&
              (key[0] === 'blog_posts' || key[0] === 'blog_post')
          );
          resetForm();
          fetchPosts();
          setActiveTab('list');
        }
      } else {
        const insertPayload: {
          title: string;
          content: string;
          category: string;
          author_id?: string;
          author_email?: string;
          thumbnail_url?: string;
        } = {
          title,
          content,
          category,
          author_id: user?.id,
          author_email: user?.email,
        };
        if (thumbnailUrl) {
          insertPayload.thumbnail_url = thumbnailUrl;
        }

        const { error } = await supabase
          .from('blog_posts')
          .insert([
            {
              ...insertPayload,
              published: true,
            }
          ]);

        if (error) {
          alert('Error saving post: ' + error.message);
        } else {
          alert('Post saved successfully!');
          mutate(
            (key) =>
              Array.isArray(key) &&
              (key[0] === 'blog_posts' || key[0] === 'blog_post')
          );
          resetForm();
          fetchPosts();
          setActiveTab('list');
        }
      }
    } catch (err) {
      console.error('Save error:', err);
      alert('An error occurred while saving.');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this post?')) return;

    const supabase = createClient();
    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id);

    if (!error) {
      if (editingPostId === id) {
        resetForm();
      }
      mutate(
        (key) =>
          Array.isArray(key) &&
          (key[0] === 'blog_posts' || key[0] === 'blog_post')
      );
      fetchPosts();
    } else {
      alert('Error deleting post: ' + error.message);
    }
  }

  function handleEdit(post: BlogPost) {
    setTitle(post.title);
    setContent(post.content);
    setCategory(post.category || 'blog');
    setEditingPostId(post.id);
    setIsEditMode(true);
    setActiveTab('write');
  }

  // 폼 초기화
  function resetForm() {
    setTitle('');
    setContent('');
    setCategory('blog');
    setEditingPostId(null);
    setIsEditMode(false);
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-red-500/30 rounded-full" />
            <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-red-500 rounded-full animate-spin" />
          </div>
          <p className="text-gray-500 text-sm">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-lg shadow-red-500/25">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-lg font-bold text-gray-900">GME Admin</h1>
                  <p className="text-xs text-gray-500">Content Management</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-full border border-gray-200">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm text-gray-600">{user?.email}</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-lg md:rounded-xl transition-all duration-200 border border-gray-200 cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Total Posts</p>
                <p className="text-2xl font-medium text-gray-900">{posts.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Published</p>
                <p className="text-2xl font-medium text-gray-900">{posts.filter(p => p.published).length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Latest Post</p>
                <p className="text-sm font-medium text-gray-900 truncate max-w-[150px]">
                  {posts[0]?.title || 'No posts yet'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('write')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg md:rounded-xl font-medium transition-all duration-200 cursor-pointer ${activeTab === 'write'
              ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg shadow-red-500/25'
              : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            {isEditMode ? 'Edit Post' : 'Write New'}
          </button>
          <button
            onClick={() => setActiveTab('list')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg md:rounded-xl font-medium transition-all duration-200 cursor-pointer ${activeTab === 'list'
              ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg shadow-red-500/25'
              : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
            All Posts
            <span className={`ml-1 px-2 py-0.5 text-xs rounded-full ${activeTab === 'list' ? 'bg-white/20' : 'bg-gray-100'}`}>{posts.length}</span>
          </button>
        </div>

        {/* Write Tab */}
        {activeTab === 'write' && (
          <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8">
            {/* Edit Mode Indicator */}
            {isEditMode && (
              <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-blue-900">Editing Mode</p>
                    <p className="text-sm text-blue-600">You are editing an existing post</p>
                  </div>
                </div>
                <button
                  onClick={resetForm}
                  className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded-lg md:rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            )}

            <div className="mb-6 relative">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Category
              </label>
              <button
                type="button"
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                onBlur={() => setTimeout(() => setIsCategoryOpen(false), 150)}
                className="w-48 px-3 py-2 text-sm text-left border-2 border-gray-200 rounded-lg focus:outline-none focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition-all bg-white cursor-pointer flex items-center justify-between"
              >
                <span>{category === 'blog' ? 'Blog' : 'Customer Feedback'}</span>
                <svg
                  className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isCategoryOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isCategoryOpen && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white border-2 border-gray-200 rounded-lg shadow-lg z-10 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => { setCategory('blog'); setIsCategoryOpen(false); }}
                    className={`w-full px-3 py-2 text-sm text-left hover:bg-gray-100 transition-colors ${category === 'blog' ? 'bg-red-50 text-red-600' : ''}`}
                  >
                    Blog
                  </button>
                  <button
                    type="button"
                    onClick={() => { setCategory('customer_feedback'); setIsCategoryOpen(false); }}
                    className={`w-full px-3 py-2 text-sm text-left hover:bg-gray-100 transition-colors ${category === 'customer_feedback' ? 'bg-red-50 text-red-600' : ''}`}
                  >
                    Customer Feedback
                  </button>
                </div>
              )}
            </div>

            <div className="mb-6">
              <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
                Post Title
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition-all"
                placeholder="Enter an engaging title for your post..."
              />
            </div>

            <div className="mb-6">
              <label htmlFor="content" className="block text-sm font-semibold text-gray-700 mb-2">
                Content
              </label>
              <TiptapEditor
                content={content}
                onChange={setContent}
                placeholder="Write your blog content here..."
              />
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
              <button
                onClick={resetForm}
                className="px-6 py-2.5 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg md:rounded-xl font-medium transition-colors cursor-pointer"
              >
                Clear
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 px-6 py-2.5 text-white rounded-lg md:rounded-xl font-medium transition-all disabled:opacity-60 cursor-pointer shadow-lg"
                style={{
                  backgroundColor: saving ? COMMON_COLORS.grayDark : COMMON_COLORS.primary,
                  boxShadow: saving ? 'none' : `0 10px 25px -5px ${COMMON_COLORS.primary}40`,
                }}
                onMouseEnter={(e) => {
                  if (!saving) e.currentTarget.style.backgroundColor = COMMON_COLORS.primaryHover;
                }}
                onMouseLeave={(e) => {
                  if (!saving) e.currentTarget.style.backgroundColor = COMMON_COLORS.primary;
                }}
              >
                {saving ? (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{isEditMode ? 'Update Post' : 'Publish Post'}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* List Tab */}
        {activeTab === 'list' && (
          <div className="space-y-4">
            {/* Filter Buttons */}
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setFilterCategory('all')}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all cursor-pointer ${
                  filterCategory === 'all'
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                All
                <span className={`ml-1.5 px-1.5 py-0.5 text-xs rounded-full ${
                  filterCategory === 'all' ? 'bg-white/20' : 'bg-gray-200'
                }`}>
                  {posts.length}
                </span>
              </button>
              <button
                onClick={() => setFilterCategory('blog')}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all cursor-pointer ${
                  filterCategory === 'blog'
                    ? 'bg-blue-600 text-white'
                    : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                }`}
              >
                Blog
                <span className={`ml-1.5 px-1.5 py-0.5 text-xs rounded-full ${
                  filterCategory === 'blog' ? 'bg-white/20' : 'bg-blue-100'
                }`}>
                  {posts.filter(p => p.category === 'blog').length}
                </span>
              </button>
              <button
                onClick={() => setFilterCategory('customer_feedback')}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all cursor-pointer ${
                  filterCategory === 'customer_feedback'
                    ? 'bg-purple-600 text-white'
                    : 'bg-purple-50 text-purple-600 hover:bg-purple-100'
                }`}
              >
                Customer Feedback
                <span className={`ml-1.5 px-1.5 py-0.5 text-xs rounded-full ${
                  filterCategory === 'customer_feedback' ? 'bg-white/20' : 'bg-purple-100'
                }`}>
                  {posts.filter(p => p.category === 'customer_feedback').length}
                </span>
              </button>
            </div>

            {posts.filter(p => filterCategory === 'all' || p.category === filterCategory).length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-12 text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gray-100 flex items-center justify-center">
                  <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No posts yet</h3>
                <p className="text-gray-500 mb-6">Create your first blog post to get started</p>
                <button
                  onClick={() => setActiveTab('write')}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg md:rounded-xl font-medium shadow-lg shadow-red-500/25 hover:shadow-red-500/40 transition-all cursor-pointer"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Create First Post
                </button>
              </div>
            ) : (
              posts.filter(p => filterCategory === 'all' || p.category === filterCategory).map((post, index) => {
                const videoInfo = getVideoInfo(post.content);
                const imageSrc = extractFirstImage(post.content);
                const hasThumbnail = videoInfo.type || imageSrc;

                return (
                  <div
                    key={post.id}
                    className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex">
                      {/* 썸네일 영역 */}
                      {hasThumbnail && (
                        <div className="w-40 h-40 flex-shrink-0 relative overflow-hidden">
                          {videoInfo.type === 'video' ? (
                            // 자체 업로드 비디오 - 아이콘 플레이스홀더
                            <div className="w-full h-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                              <div className="text-center">
                                <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-2">
                                  <svg className="w-7 h-7 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z" />
                                  </svg>
                                </div>
                                <span className="text-white text-xs font-medium">VIDEO</span>
                              </div>
                            </div>
                          ) : videoInfo.type === 'youtube' && videoInfo.thumbnail ? (
                            // YouTube - 썸네일 이미지
                            <>
                              <img
                                src={videoInfo.thumbnail}
                                alt="YouTube thumbnail"
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                                <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center">
                                  <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z" />
                                  </svg>
                                </div>
                              </div>
                            </>
                          ) : imageSrc ? (
                            <img
                              src={imageSrc}
                              alt="Thumbnail"
                              className="w-full h-full object-cover"
                            />
                          ) : null}
                        </div>
                      )}

                      {/* 컨텐츠 영역 */}
                      <div className="flex-1 p-6">
                        <div className="flex justify-between items-start gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-3">
                              <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${post.category === 'customer_feedback'
                                ? 'bg-purple-100 text-purple-700'
                                : 'bg-blue-100 text-blue-700'
                                }`}>
                                {post.category === 'customer_feedback' ? 'Customer Feedback' : 'Blog'}
                              </span>
                              {videoInfo.type && (
                                <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                                  videoInfo.type === 'youtube'
                                    ? 'bg-red-100 text-red-700'
                                    : 'bg-orange-100 text-orange-700'
                                }`}>
                                  {videoInfo.type === 'youtube' ? 'YouTube' : 'Video'}
                                </span>
                              )}
                              <span className="text-sm text-gray-400">
                                {new Date(post.created_at).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric'
                                })}
                              </span>
                            </div>

                            <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
                              {post.title}
                            </h3>

                            <p className="text-gray-500 line-clamp-2 text-sm mb-4">
                              {stripHtml(post.content)}
                            </p>

                            <div className="flex items-center gap-4 text-sm text-gray-400">
                              <div className="flex items-center gap-1.5">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                <span className="truncate max-w-[150px]">{post.author_email}</span>
                              </div>
                              {post.updated_at && post.updated_at !== post.created_at && (
                                <div className="flex items-center gap-1.5 text-blue-500">
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                  </svg>
                                  <span>Updated {new Date(post.updated_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => handleEdit(post)}
                              className="p-2.5 text-blue-600 hover:bg-blue-50 rounded-lg md:rounded-xl transition-colors cursor-pointer"
                              title="Edit post"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                            <button
                              onClick={() => handleDelete(post.id)}
                              className="p-2.5 text-red-600 hover:bg-red-50 rounded-lg md:rounded-xl transition-colors cursor-pointer"
                              title="Delete post"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}
      </main>
    </div>
  );
}

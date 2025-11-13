'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { COMMON_COLORS } from '@/constants/colors';
import dynamicImport from 'next/dynamic';
import '../components/admin/TiptapEditor.css';
import type { User } from '@supabase/supabase-js';

// Tiptap editor dynamic import (disable SSR)
const TiptapEditor = dynamicImport(() => import('@/app/components/admin/TiptapEditor'), {
  ssr: false,
  loading: () => <p className="text-gray-500">Loading editor...</p>
});

interface BlogPost {
  id: string;
  title: string;
  content: string;
  author_id: string;
  author_email: string;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export default function AdminPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'write' | 'list'>('write');

  // Blog post state
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [saving, setSaving] = useState(false);
  
  // Edit mode state
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

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
      const supabase = createClient();
      if (isEditMode && editingPostId) {
        const { error } = await supabase
          .from('blog_posts')
          .update({
            title,
            content,
            updated_at: new Date().toISOString(),
          })
          .eq('id', editingPostId);

        if (error) {
          alert('Error updating post: ' + error.message);
        } else {
          alert('Post updated successfully!');
          resetForm();
          fetchPosts();
          setActiveTab('list');
        }
      } else {
        const { error } = await supabase
          .from('blog_posts')
          .insert([
            {
              title,
              content,
              author_id: user?.id,
              author_email: user?.email,
              published: true,
            }
          ]);

        if (error) {
          alert('Error saving post: ' + error.message);
        } else {
          alert('Post saved successfully!');
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
      fetchPosts();
    } else {
      alert('Error deleting post: ' + error.message);
    }
  }

  function handleEdit(post: BlogPost) {
    setTitle(post.title);
    setContent(post.content);
    setEditingPostId(post.id);
    setIsEditMode(true);
    setActiveTab('write');
  }

  // 폼 초기화
  function resetForm() {
    setTitle('');
    setContent('');
    setEditingPostId(null);
    setIsEditMode(false);
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">GME Finance Admin</h1>
              <span className="ml-4 text-sm text-gray-500">Admin: {user?.email}</span>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm text-red-600 hover:text-red-800 transition-colors cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('write')}
                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors cursor-pointer ${
                  activeTab === 'write'
                    ? 'text-red-600 border-red-600'
                    : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {isEditMode ? 'Edit Post' : 'Write New Post'}
              </button>
              <button
                onClick={() => setActiveTab('list')}
                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors cursor-pointer ${
                  activeTab === 'list'
                    ? 'text-red-600 border-red-600'
                    : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Posts ({posts.length})
              </button>
            </nav>
          </div>
        </div>

        {/* Write Tab */}
        {activeTab === 'write' && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            {/* Edit Mode Indicator */}
            {isEditMode && (
              <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg flex justify-between items-center">
                <span className="text-sm text-blue-700 font-medium">
                  📝 Editing existing post
                </span>
                <button
                  onClick={resetForm}
                  className="text-sm text-blue-600 hover:text-blue-800 underline"
                >
                  Cancel & Create New Post
                </button>
              </div>
            )}

            <div className="mb-6">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Enter blog post title"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                Content
              </label>
              <TiptapEditor
                content={content}
                onChange={setContent}
                placeholder="Write your blog content here..."
              />
            </div>

            <div className="flex justify-end gap-4">
              <button
                onClick={resetForm}
                className="px-6 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors cursor-pointer"
              >
                Reset
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-6 py-2 text-white rounded-lg transition-colors disabled:opacity-60 cursor-pointer"
                style={{
                  backgroundColor: saving ? COMMON_COLORS.grayDark : COMMON_COLORS.primary,
                }}
                onMouseEnter={(e) => {
                  if (!saving) e.currentTarget.style.backgroundColor = COMMON_COLORS.primaryHover;
                }}
                onMouseLeave={(e) => {
                  if (!saving) e.currentTarget.style.backgroundColor = COMMON_COLORS.primary;
                }}
              >
                {saving ? 'Saving...' : isEditMode ? 'Update Post' : 'Save Post'}
              </button>
            </div>
          </div>
        )}

        {/* List Tab */}
        {activeTab === 'list' && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            {posts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">No posts yet.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {posts.map((post) => (
                  <div key={post.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{post.title}</h3>
                        <div
                          className="text-gray-600 line-clamp-2 mb-2 prose prose-sm max-w-none tiptap-editor"
                          dangerouslySetInnerHTML={{ __html: post.content }}
                        />
                        <div className="flex items-center text-sm text-gray-500 space-x-4">
                          <span>Author: {post.author_email}</span>
                          <span>
                            Created: {new Date(post.created_at).toLocaleDateString('en-US')}
                          </span>
                          {post.updated_at && post.updated_at !== post.created_at && (
                            <span className="text-blue-600">
                              Updated: {new Date(post.updated_at).toLocaleDateString('en-US')}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={() => handleEdit(post)}
                          className="px-3 py-1 text-sm text-blue-600 hover:text-blue-800 cursor-pointer"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(post.id)}
                          className="px-3 py-1 text-sm text-red-600 hover:text-red-800 cursor-pointer"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
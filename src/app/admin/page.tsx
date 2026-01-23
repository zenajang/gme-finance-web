'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { COMMON_COLORS } from '@/constants/colors';
import dynamicImport from 'next/dynamic';
import '../components/admin/TiptapEditor.css';
import type { User } from '@supabase/supabase-js';
import { useSWRConfig } from 'swr';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '@/app/components/common/LanguageSwitcher';
import * as XLSX from 'xlsx';

function EditorLoading() {
  const { t } = useTranslation();
  return (
    <div className="h-64 bg-gray-50 rounded-xl flex items-center justify-center">
      <div className="flex items-center gap-3 text-gray-500">
        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
        <span>{t('admin.loading.editor')}</span>
      </div>
    </div>
  );
}

// Tiptap editor dynamic import (disable SSR)
const TiptapEditor = dynamicImport(() => import('@/app/components/admin/TiptapEditor'), {
  ssr: false,
  loading: () => <EditorLoading />
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

interface NoticePost {
  id: string;
  title: string;
  category: string | null;
  content?: string | null;
  table_columns: string[];
  table_rows: string[][];
  author_id: string;
  author_email: string;
  pinned: boolean;
  status: string;
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
  const { t, i18n } = useTranslation();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState<'blog' | 'notices'>('blog');
  const [activeBlogTab, setActiveBlogTab] = useState<'write' | 'list'>('write');
  const [activeNoticeTab, setActiveNoticeTab] = useState<'write' | 'list' | 'templates'>('write');

  // Blog post state
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<'blog' | 'customer_feedback'>('blog');
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [saving, setSaving] = useState(false);
  const [notices, setNotices] = useState<NoticePost[]>([]);
  const [noticeSaving, setNoticeSaving] = useState(false);

  // Notice UI state (storage not wired yet)
  const [noticeTitle, setNoticeTitle] = useState('');
  const [noticeContent, setNoticeContent] = useState('');
  const [noticePinned, setNoticePinned] = useState(false);
  const noticeCategoryOptions = [
    { value: 'loss_of_benefit', label: t('notices.category.loss_of_benefit') },
    { value: 'auction', label: t('notices.category.auction') },
    { value: 'transfer', label: t('notices.category.transfer') },
  ] as const;
  const getNoticeCategoryLabel = (value?: string | null) => {
    const key = value || 'loss_of_benefit';
    return t(`notices.category.${key}`, { defaultValue: key });
  };
  const getNoticeStatusLabel = (status?: string | null) => {
    const normalized = (status || 'Published').toLowerCase();
    return t(`admin.notice.status.${normalized}`, { defaultValue: status || '' });
  };
  const getDefaultNoticeColumns = () => ([
    t('admin.notice.table.columns.name'),
    t('admin.notice.table.columns.role'),
    t('admin.notice.table.columns.department'),
    t('admin.notice.table.columns.note'),
  ]);
  const [noticeCategory, setNoticeCategory] = useState<string>('loss_of_benefit');
  const [noticeColumns, setNoticeColumns] = useState<string[]>(() => getDefaultNoticeColumns());
  const [noticeRows, setNoticeRows] = useState<string[][]>([
    ['', '', '', ''],
    ['', '', '', ''],
  ]);
  const [noticeEditingId, setNoticeEditingId] = useState<string | null>(null);
  const [noticeEditMode, setNoticeEditMode] = useState(false);
  const [noticeTemplates, setNoticeTemplates] = useState<Record<string, string>>({});
  const [templatesSaving, setTemplatesSaving] = useState(false);
  const [confirmCategoryOpen, setConfirmCategoryOpen] = useState(false);
  const [pendingCategory, setPendingCategory] = useState<string | null>(null);
  const noticeFileInputRef = useRef<HTMLInputElement | null>(null);
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
    fetchNotices();
    fetchNoticeTemplates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (noticeContent.trim().length > 0) return;
    const template = noticeTemplates[noticeCategory] || '';
    if (template.trim().length > 0) {
      setNoticeContent(template);
    }
  }, [noticeTemplates, noticeContent, noticeCategory]);

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

      const shouldLogout = window.confirm(t('admin.confirm.leave'));

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
  }, [router, t]);

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

  async function fetchNotices() {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('notices')
      .select('*')
      .order('pinned', { ascending: false })
      .order('created_at', { ascending: false });

    if (!error && data) {
      setNotices(data);
    }
  }

  async function fetchNoticeTemplates() {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('notice_templates')
      .select('category, content');

    if (!error && data) {
      const map: Record<string, string> = {};
      data.forEach((row) => {
        map[row.category] = row.content || '';
      });
      setNoticeTemplates(map);
    }
  }

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.replace('/login');
  }

  async function handleSave() {
    if (!title || !content) {
      alert(t('admin.alerts.missingTitleContent'));
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
          alert(t('admin.alerts.updatePostError', { message: error.message }));
        } else if (!data || data.length === 0) {
          alert(t('admin.alerts.updatePostNoRows'));
        } else {
          alert(t('admin.alerts.updatePostSuccess'));
          mutate(
            (key) =>
              Array.isArray(key) &&
              (key[0] === 'blog_posts' || key[0] === 'blog_post')
          );
          resetForm();
          fetchPosts();
          setActiveBlogTab('list');
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
          alert(t('admin.alerts.savePostError', { message: error.message }));
        } else {
          alert(t('admin.alerts.savePostSuccess'));
          mutate(
            (key) =>
              Array.isArray(key) &&
              (key[0] === 'blog_posts' || key[0] === 'blog_post')
          );
          resetForm();
          fetchPosts();
          setActiveBlogTab('list');
        }
      }
    } catch (err) {
      console.error('Save error:', err);
      alert(t('admin.alerts.savePostGeneric'));
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm(t('admin.alerts.deletePostConfirm'))) return;

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
      alert(t('admin.alerts.deletePostError', { message: error.message }));
    }
  }

  async function handleNoticeSave() {
    if (!noticeTitle.trim()) {
      alert(t('admin.alerts.noticeTitleRequired'));
      return;
    }

    const normalizedRows = noticeRows
      .map((row) => row.map((cell) => cell.trim()))
      .filter((row) => row.some((cell) => cell.length > 0));

    if (normalizedRows.length === 0) {
      alert(t('admin.alerts.noticeRowRequired'));
      return;
    }

    setNoticeSaving(true);

    try {
      const supabase = createClient();
      const payload = {
        title: noticeTitle.trim(),
        content: noticeContent.trim(),
        category: noticeCategory,
        table_columns: noticeColumns.map((col) => col.trim()),
        table_rows: normalizedRows,
        pinned: noticePinned,
        status: 'Published',
        author_id: user?.id,
        author_email: user?.email,
      };

      if (noticeEditMode && noticeEditingId) {
        const { data, error } = await supabase
          .from('notices')
          .update({
            ...payload,
            updated_at: new Date().toISOString(),
          })
          .eq('id', noticeEditingId)
          .select();

        if (error) {
          alert(t('admin.alerts.updateNoticeError', { message: error.message }));
          return;
        }
        if (!data || data.length === 0) {
          alert(t('admin.alerts.updateNoticeNoRows'));
          return;
        }
      } else {
        const { error } = await supabase
          .from('notices')
          .insert([payload]);

        if (error) {
          alert(t('admin.alerts.saveNoticeError', { message: error.message }));
          return;
        }
      }

      alert(noticeEditMode ? t('admin.alerts.updateNoticeSuccess') : t('admin.alerts.saveNoticeSuccess'));
      resetNoticeForm();
      fetchNotices();
      setActiveNoticeTab('list');
    } catch (err) {
      console.error('Notice save error:', err);
      alert(t('admin.alerts.saveNoticeGeneric'));
    } finally {
      setNoticeSaving(false);
    }
  }

  async function handleNoticeDelete(id: string) {
    if (!confirm(t('admin.alerts.deleteNoticeConfirm'))) return;

    const supabase = createClient();
    const { error } = await supabase
      .from('notices')
      .delete()
      .eq('id', id);

    if (error) {
      alert(t('admin.alerts.deleteNoticeError', { message: error.message }));
      return;
    }

    if (noticeEditingId === id) {
      resetNoticeForm();
    }

    fetchNotices();
  }

  function resetNoticeForm() {
    setNoticeTitle('');
    setNoticeContent('');
    setNoticePinned(false);
    setNoticeCategory('loss_of_benefit');
    setNoticeColumns(getDefaultNoticeColumns());
    setNoticeRows([['', '', '', ''], ['', '', '', '']]);
    setNoticeEditingId(null);
    setNoticeEditMode(false);
  }

  function handleNoticeEdit(notice: NoticePost) {
    setNoticeTitle(notice.title);
    setNoticeContent(notice.content || '');
    setNoticePinned(!!notice.pinned);
    setNoticeCategory(notice.category || 'loss_of_benefit');
    setNoticeColumns(notice.table_columns?.length ? notice.table_columns : getDefaultNoticeColumns());
    setNoticeRows(
      notice.table_rows?.length
        ? notice.table_rows.map((row) => [...row])
        : [['', '', '', ''], ['', '', '', '']]
    );
    setNoticeEditingId(notice.id);
    setNoticeEditMode(true);
    setActiveSection('notices');
    setActiveNoticeTab('write');
  }

  function applyNoticeCategory(nextCategory: string) {
    setNoticeCategory(nextCategory);
    setNoticeContent(noticeTemplates[nextCategory] || '');
  }

  function handleNoticeCategoryChange(nextCategory: string) {
    if (nextCategory === noticeCategory) return;
    const currentTemplate = (noticeTemplates[noticeCategory] || '').trim();
    const currentContent = noticeContent.trim();
    const hasEdits = currentContent.length > 0 && currentContent !== currentTemplate;

    if (hasEdits) {
      setPendingCategory(nextCategory);
      setConfirmCategoryOpen(true);
      return;
    }

    applyNoticeCategory(nextCategory);
  }

  function handleConfirmCategoryChange() {
    if (!pendingCategory) {
      setConfirmCategoryOpen(false);
      return;
    }
    applyNoticeCategory(pendingCategory);
    setPendingCategory(null);
    setConfirmCategoryOpen(false);
  }

  function handleCancelCategoryChange() {
    setPendingCategory(null);
    setConfirmCategoryOpen(false);
  }

  async function handleNoticeExcelUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const buffer = await file.arrayBuffer();
      const workbook = XLSX.read(buffer, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      if (!sheetName) {
        alert(t('admin.notice.uploadEmpty'));
        return;
      }
      const sheet = workbook.Sheets[sheetName];
      const rows = XLSX.utils.sheet_to_json<(string | number)[]>(sheet, {
        header: 1,
        blankrows: false,
        defval: '',
        raw: false,
      });

      if (!rows.length) {
        alert(t('admin.notice.uploadEmpty'));
        return;
      }

      const formatCell = (value: string | number) => String(value ?? '').trim();

      const header = rows[0].map((cell) => formatCell(cell));
      const dataRows = rows.slice(1);

      const activeIndexes = header
        .map((_, idx) => idx)
        .filter((idx) => {
          const label = header[idx].trim().toLowerCase();
          if (label === 'no' || label === 'no.' || label === '번호') return false;
          if (header[idx]) return true;
          return dataRows.some((row) => String(row?.[idx] ?? '').trim().length > 0);
        });

      if (!activeIndexes.length) {
        alert(t('admin.notice.uploadEmpty'));
        return;
      }

      const columns = activeIndexes.map((idx, colIndex) => {
        const label = header[idx];
        return label || t('admin.notice.table.columnDefault', { number: colIndex + 1 });
      });

      const normalizedRows = dataRows
        .map((row) => activeIndexes.map((idx) => formatCell(row?.[idx] ?? '')))
        .filter((row) => row.some((cell) => cell.length > 0));

      if (!normalizedRows.length) {
        alert(t('admin.notice.uploadNoRows'));
      }

      setNoticeColumns(columns);
      setNoticeRows(normalizedRows.length ? normalizedRows : [Array(columns.length).fill('')]);
    } catch (error) {
      console.error('Excel upload error:', error);
      alert(t('admin.notice.uploadError'));
    } finally {
      if (event.target) {
        event.target.value = '';
      }
    }
  }

  async function handleSaveTemplates() {
    setTemplatesSaving(true);
    try {
      const supabase = createClient();
      const payload = noticeCategoryOptions.map((option) => ({
        category: option.value,
        content: noticeTemplates[option.value] || '',
      }));
      const { error } = await supabase
        .from('notice_templates')
        .upsert(payload, { onConflict: 'category' });

      if (error) {
        alert(t('admin.alerts.saveTemplatesError', { message: error.message }));
      } else {
        alert(t('admin.alerts.saveTemplatesSuccess'));
        fetchNoticeTemplates();
      }
    } finally {
      setTemplatesSaving(false);
    }
  }

  function handleEdit(post: BlogPost) {
    setTitle(post.title);
    setContent(post.content);
    setCategory(post.category || 'blog');
    setEditingPostId(post.id);
    setIsEditMode(true);
    setActiveBlogTab('write');
  }

  // 폼 초기화
  function resetForm() {
    setTitle('');
    setContent('');
    setCategory('blog');
    setEditingPostId(null);
    setIsEditMode(false);
  }

  const locale = i18n.language || 'en';

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-red-500/30 rounded-full" />
            <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-red-500 rounded-full animate-spin" />
          </div>
          <p className="text-gray-500 text-sm">{t('admin.loading.panel')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-lg shadow-red-500/25">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-lg font-bold text-gray-900">{t('admin.header.title')}</h1>
                  <p className="text-xs text-gray-500">{t('admin.header.subtitle')}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-full border border-gray-200">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm text-gray-600">{user?.email}</span>
              </div>
              <LanguageSwitcher className="hidden sm:flex" forceVisible size="compact" />
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-lg md:rounded-xl transition-all duration-200 border border-gray-200 cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span>{t('admin.header.logout')}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 sticky top-24">
              <div className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <span>{t('admin.sidebar.content')}</span>
              </div>
              <nav className="mt-2 space-y-1">
                <button
                  onClick={() => setActiveSection('blog')}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                    activeSection === 'blog'
                      ? 'bg-red-50 text-red-700 border border-red-100'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <span className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                    activeSection === 'blog' ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-500'
                  }`}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </span>
                  <div className="text-left">
                    <div>{t('admin.sidebar.blog')}</div>
                    <div className="text-xs text-gray-400">{t('admin.sidebar.postsCount', { count: posts.length })}</div>
                  </div>
                </button>
                <button
                  onClick={() => setActiveSection('notices')}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                    activeSection === 'notices'
                      ? 'bg-blue-50 text-blue-700 border border-blue-100'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <span className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                    activeSection === 'notices' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-500'
                  }`}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h10M7 16h6m5 5H6a2 2 0 01-2-2V5a2 2 0 012-2h8.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </span>
                  <div className="text-left">
                    <div>{t('admin.sidebar.notices')}</div>
                    <div className="text-xs text-gray-400">{t('admin.sidebar.noticesCount', { count: notices.length })}</div>
                  </div>
                </button>
              </nav>
            </div>
          </aside>

          {/* Content */}
          <section className="flex-1 min-w-0">
            {/* Stats Cards */}
            {activeSection === 'blog' ? (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">{t('admin.stats.totalPosts')}</p>
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
                      <p className="text-gray-500 text-sm">{t('admin.stats.published')}</p>
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
                      <p className="text-gray-500 text-sm">{t('admin.stats.latestPost')}</p>
                      <p className="text-sm font-medium text-gray-900 truncate max-w-[150px]">
                        {posts[0]?.title || t('admin.stats.noPosts')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6l4 2m5 4H6a2 2 0 01-2-2V6a2 2 0 012-2h7l5 5v9a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">{t('admin.stats.totalNotices')}</p>
                      <p className="text-2xl font-medium text-gray-900">{notices.length}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v4m0 4h.01M4 19h16l-8-14-8 14z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">{t('admin.stats.pinned')}</p>
                      <p className="text-2xl font-medium text-gray-900">{notices.filter(n => n.pinned).length}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3M5 11h14M7 19h10a2 2 0 002-2v-6H5v6a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">{t('admin.stats.latestNotice')}</p>
                      <p className="text-sm font-medium text-gray-900 truncate max-w-[150px]">
                        {notices[0]?.title || t('admin.stats.noNotices')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab Navigation */}
            {activeSection === 'blog' ? (
              <div className="flex gap-2 mb-6">
                <button
                  onClick={() => setActiveBlogTab('write')}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-lg md:rounded-xl font-medium transition-all duration-200 cursor-pointer ${activeBlogTab === 'write'
                    ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg shadow-red-500/25'
                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                    }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  {isEditMode ? t('admin.blog.editPost') : t('admin.blog.writeNew')}
                </button>
                <button
                  onClick={() => setActiveBlogTab('list')}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-lg md:rounded-xl font-medium transition-all duration-200 cursor-pointer ${activeBlogTab === 'list'
                    ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg shadow-red-500/25'
                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                    }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                  {t('admin.blog.allPosts')}
                  <span className={`ml-1 px-2 py-0.5 text-xs rounded-full ${activeBlogTab === 'list' ? 'bg-white/20' : 'bg-gray-100'}`}>{posts.length}</span>
                </button>
              </div>
            ) : (
              <div className="flex gap-2 mb-6">
                <button
                  onClick={() => setActiveNoticeTab('write')}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-lg md:rounded-xl font-medium transition-all duration-200 cursor-pointer ${activeNoticeTab === 'write'
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25'
                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                    }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  {t('admin.notice.write')}
                </button>
                <button
                  onClick={() => setActiveNoticeTab('templates')}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-lg md:rounded-xl font-medium transition-all duration-200 cursor-pointer ${activeNoticeTab === 'templates'
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25'
                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                    }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5h8M8 9h8M8 13h6m-8 6h12a2 2 0 002-2V7a2 2 0 00-2-2H6a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {t('admin.templates.tab')}
                </button>
                <button
                  onClick={() => setActiveNoticeTab('list')}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-lg md:rounded-xl font-medium transition-all duration-200 cursor-pointer ${activeNoticeTab === 'list'
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25'
                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                    }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                  {t('admin.notice.all')}
                  <span className={`ml-1 px-2 py-0.5 text-xs rounded-full ${activeNoticeTab === 'list' ? 'bg-white/20' : 'bg-gray-100'}`}>{notices.length}</span>
                </button>
              </div>
            )}

            {/* Write Tab */}
            {activeSection === 'blog' && activeBlogTab === 'write' && (
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
                    <p className="font-semibold text-blue-900">{t('admin.blog.editingMode')}</p>
                    <p className="text-sm text-blue-600">{t('admin.blog.editingModeSubtitle')}</p>
                  </div>
                </div>
                <button
                  onClick={resetForm}
                  className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded-lg md:rounded-xl transition-colors cursor-pointer"
                >
                  {t('admin.common.cancel')}
                </button>
              </div>
            )}

            <div className="mb-6 relative">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t('admin.blog.category')}
              </label>
              <button
                type="button"
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                onBlur={() => setTimeout(() => setIsCategoryOpen(false), 150)}
                className="w-48 px-3 py-2 text-sm text-left border-2 border-gray-200 rounded-lg focus:outline-none focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition-all bg-white cursor-pointer flex items-center justify-between"
              >
                <span>{category === 'blog' ? t('admin.blog.categoryBlog') : t('admin.blog.categoryFeedback')}</span>
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
                    {t('admin.blog.categoryBlog')}
                  </button>
                  <button
                    type="button"
                    onClick={() => { setCategory('customer_feedback'); setIsCategoryOpen(false); }}
                    className={`w-full px-3 py-2 text-sm text-left hover:bg-gray-100 transition-colors ${category === 'customer_feedback' ? 'bg-red-50 text-red-600' : ''}`}
                  >
                    {t('admin.blog.categoryFeedback')}
                  </button>
                </div>
              )}
            </div>

            <div className="mb-6">
              <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
                {t('admin.blog.title')}
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition-all"
                placeholder={t('admin.blog.titlePlaceholder')}
              />
            </div>

            <div className="mb-6">
              <label htmlFor="content" className="block text-sm font-semibold text-gray-700 mb-2">
                {t('admin.blog.content')}
              </label>
              <TiptapEditor
                content={content}
                onChange={setContent}
                placeholder={t('admin.blog.editorPlaceholder')}
              />
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
              <button
                onClick={resetForm}
                className="px-6 py-2.5 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg md:rounded-xl font-medium transition-colors cursor-pointer"
              >
                {t('admin.common.clear')}
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
                    <span>{t('admin.common.saving')}</span>
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{isEditMode ? t('admin.blog.updatePost') : t('admin.blog.publishPost')}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* List Tab */}
        {activeSection === 'blog' && activeBlogTab === 'list' && (
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
                {t('admin.blog.filterAll')}
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
                {t('admin.blog.categoryBlog')}
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
                {t('admin.blog.categoryFeedback')}
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
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('admin.blog.emptyTitle')}</h3>
                <p className="text-gray-500 mb-6">{t('admin.blog.emptySubtitle')}</p>
                <button
                  onClick={() => setActiveBlogTab('write')}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg md:rounded-xl font-medium shadow-lg shadow-red-500/25 hover:shadow-red-500/40 transition-all cursor-pointer"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  {t('admin.blog.createFirst')}
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
                                <span className="text-white text-xs font-medium">{t('admin.blog.videoBadge')}</span>
                              </div>
                            </div>
                          ) : videoInfo.type === 'youtube' && videoInfo.thumbnail ? (
                            // YouTube - 썸네일 이미지
                            <>
                              <img
                                src={videoInfo.thumbnail}
                                alt={t('admin.blog.youtubeThumbnailAlt')}
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
                              alt={t('admin.blog.thumbnailAlt')}
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
                                {post.category === 'customer_feedback' ? t('admin.blog.categoryFeedback') : t('admin.blog.categoryBlog')}
                              </span>
                              {videoInfo.type && (
                                <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                                  videoInfo.type === 'youtube'
                                    ? 'bg-red-100 text-red-700'
                                    : 'bg-orange-100 text-orange-700'
                                }`}>
                                  {videoInfo.type === 'youtube' ? t('admin.blog.youtubeLabel') : t('admin.blog.videoLabel')}
                                </span>
                              )}
                              <span className="text-sm text-gray-400">
                                {new Date(post.created_at).toLocaleDateString(locale, {
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
                                  <span>{t('admin.blog.updated', { date: new Date(post.updated_at).toLocaleDateString(locale, { month: 'short', day: 'numeric' }) })}</span>
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => handleEdit(post)}
                              className="p-2.5 text-blue-600 hover:bg-blue-50 rounded-lg md:rounded-xl transition-colors cursor-pointer"
                              title={t('admin.blog.editPostTitle')}
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                            <button
                              onClick={() => handleDelete(post.id)}
                              className="p-2.5 text-red-600 hover:bg-red-50 rounded-lg md:rounded-xl transition-colors cursor-pointer"
                              title={t('admin.blog.deletePostTitle')}
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
            {activeSection === 'notices' && activeNoticeTab === 'write' && (
              <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8">
                <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z" />
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <p className="font-semibold text-blue-900">
                      {noticeEditMode ? t('admin.notice.editing') : t('admin.notice.create')}
                    </p>
                    <p className="text-sm text-blue-600">
                      {noticeEditMode ? t('admin.notice.editingSubtitle') : t('admin.notice.createSubtitle')}
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <label htmlFor="notice-title" className="block text-sm font-semibold text-gray-700 mb-2">
                    {t('admin.notice.title')}
                  </label>
                  <input
                    id="notice-title"
                    type="text"
                    value={noticeTitle}
                    onChange={(e) => setNoticeTitle(e.target.value)}
                    className="w-full px-4 py-3 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
                    placeholder={t('admin.notice.titlePlaceholder')}
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="notice-category" className="block text-sm font-semibold text-gray-700 mb-2">
                    {t('admin.notice.category')}
                  </label>
                  <select
                    id="notice-category"
                    value={noticeCategory}
                    onChange={(e) => handleNoticeCategoryChange(e.target.value)}
                    className="w-full px-4 py-3 text-sm border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all bg-white"
                  >
                    {noticeCategoryOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-6">
                  <label htmlFor="notice-content" className="block text-sm font-semibold text-gray-700 mb-2">
                    {t('admin.notice.content')}
                  </label>
                  <div className="flex items-center justify-between mb-2 text-xs text-gray-500">
                    <span>{t('admin.notice.contentHint')}</span>
                  </div>
                  <textarea
                    id="notice-content"
                    value={noticeContent}
                    onChange={(e) => setNoticeContent(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 text-sm border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
                    placeholder={t('admin.notice.contentPlaceholder')}
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t('admin.notice.table.title')}
                  </label>
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <button
                        type="button"
                        onClick={() => noticeFileInputRef.current?.click()}
                        className="px-3 py-1.5 text-xs font-medium text-blue-700 bg-white border border-blue-200 rounded-lg hover:bg-blue-50"
                      >
                        {t('admin.notice.uploadButton')}
                      </button>
                      <input
                        ref={noticeFileInputRef}
                        type="file"
                        accept=".xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                        className="hidden"
                        onChange={handleNoticeExcelUpload}
                      />
                      <span className="text-xs text-gray-400">{t('admin.notice.uploadHint')}</span>
                      <button
                        type="button"
                        onClick={() => {
                          setNoticeRows((prev) => [...prev, new Array(noticeColumns.length).fill('')]);
                        }}
                        className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-100"
                      >
                        {t('admin.notice.table.addRow')}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setNoticeColumns((prev) => [...prev, t('admin.notice.table.columnDefault', { number: prev.length + 1 })]);
                          setNoticeRows((prev) => prev.map((row) => [...row, '']));
                        }}
                        className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-100"
                      >
                        {t('admin.notice.table.addColumn')}
                      </button>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="min-w-[900px] text-sm">
                        <thead>
                          <tr>
                            {noticeColumns.map((col, colIndex) => (
                              <th key={colIndex} className="px-2 py-2 text-left">
                                <div className="flex items-center gap-2">
                                  <input
                                    value={col}
                                    onChange={(e) => {
                                      const next = [...noticeColumns];
                                      next[colIndex] = e.target.value;
                                      setNoticeColumns(next);
                                    }}
                                    className="w-40 px-2 py-1 text-xs font-semibold text-gray-700 bg-white border border-gray-200 rounded"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => {
                                      if (noticeColumns.length <= 1) return;
                                      setNoticeColumns((prev) => prev.filter((_, i) => i !== colIndex));
                                      setNoticeRows((prev) => prev.map((row) => row.filter((_, i) => i !== colIndex)));
                                    }}
                                    className="text-gray-300 hover:text-gray-500"
                                    title={t('admin.notice.table.removeColumn')}
                                  >
                                    ×
                                  </button>
                                </div>
                              </th>
                            ))}
                            <th className="px-2 py-2 text-right text-xs text-gray-400">{t('admin.notice.table.actions')}</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {noticeRows.map((row, rowIndex) => (
                            <tr key={rowIndex} className="bg-white">
                              {row.map((cell, colIndex) => (
                                <td key={colIndex} className="px-2 py-2">
                                  <input
                                    value={cell}
                                    onChange={(e) => {
                                      setNoticeRows((prev) => {
                                        const next = prev.map((r) => [...r]);
                                        next[rowIndex][colIndex] = e.target.value;
                                        return next;
                                      });
                                    }}
                                    className="w-56 px-2 py-1 text-sm border border-gray-200 rounded"
                                    placeholder={t('admin.notice.table.rowPlaceholder', { number: rowIndex + 1 })}
                                  />
                                </td>
                              ))}
                              <td className="px-2 py-2 text-right">
                                <button
                                  type="button"
                                  onClick={() => {
                                    if (noticeRows.length <= 1) return;
                                    setNoticeRows((prev) => prev.filter((_, i) => i !== rowIndex));
                                  }}
                                  className="text-xs text-gray-400 hover:text-gray-600"
                                >
                                  {t('admin.notice.table.removeRow')}
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 mb-6">
                  <button
                    type="button"
                    onClick={() => setNoticePinned((prev) => !prev)}
                    className={`px-4 py-2 rounded-lg md:rounded-xl text-sm font-medium transition-colors border ${
                      noticePinned ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-gray-100 text-gray-600 border-gray-200'
                    }`}
                  >
                    {noticePinned ? t('admin.notice.pinned') : t('admin.notice.pinToTop')}
                  </button>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                  <button
                    onClick={resetNoticeForm}
                    className="px-6 py-2.5 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg md:rounded-xl font-medium transition-colors cursor-pointer"
                  >
                    {t('admin.common.clear')}
                  </button>
                  <button
                    onClick={handleNoticeSave}
                    disabled={noticeSaving}
                    className="flex items-center gap-2 px-6 py-2.5 text-white rounded-lg md:rounded-xl font-medium transition-all disabled:opacity-60 cursor-pointer shadow-lg"
                    style={{
                      backgroundColor: noticeSaving ? COMMON_COLORS.grayDark : '#3b82f6',
                      boxShadow: noticeSaving ? 'none' : '0 10px 25px -5px rgba(59, 130, 246, 0.25)',
                    }}
                  >
                    {noticeSaving ? (
                      <>
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        <span>{t('admin.common.saving')}</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{noticeEditMode ? t('admin.notice.update') : t('admin.notice.publish')}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {activeSection === 'notices' && activeNoticeTab === 'list' && (
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{t('admin.notice.listTitle')}</h3>
                  </div>
                  <button
                    onClick={() => setActiveNoticeTab('write')}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg md:rounded-xl text-sm font-medium shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all cursor-pointer"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    {t('admin.notice.newNotice')}
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead className="bg-gray-50 text-gray-500">
                      <tr>
                        <th className="px-6 py-3 text-left font-semibold">{t('admin.notice.tableHeaders.title')}</th>
                        <th className="px-6 py-3 text-left font-semibold">{t('admin.notice.tableHeaders.category')}</th>
                        <th className="px-6 py-3 text-left font-semibold">{t('admin.notice.tableHeaders.status')}</th>
                        <th className="px-6 py-3 text-left font-semibold">{t('admin.notice.tableHeaders.pinned')}</th>
                        <th className="px-6 py-3 text-left font-semibold">{t('admin.notice.tableHeaders.author')}</th>
                        <th className="px-6 py-3 text-left font-semibold">{t('admin.notice.tableHeaders.date')}</th>
                        <th className="px-6 py-3 text-right font-semibold">{t('admin.notice.tableHeaders.actions')}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {notices.map((notice) => (
                        <tr key={notice.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 text-gray-900 font-medium">{notice.title}</td>
                          <td className="px-6 py-4 text-gray-500">
                            {getNoticeCategoryLabel(notice.category)}
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                              notice.status === 'Published'
                                ? 'bg-emerald-100 text-emerald-700'
                                : notice.status === 'Scheduled'
                                  ? 'bg-amber-100 text-amber-700'
                                  : 'bg-gray-100 text-gray-600'
                            }`}>
                              {getNoticeStatusLabel(notice.status)}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            {notice.pinned ? (
                              <span className="inline-flex items-center gap-1 text-blue-600">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                                </svg>
                                {t('admin.notice.pinnedLabel')}
                              </span>
                            ) : (
                              <span className="text-gray-400">—</span>
                            )}
                          </td>
                          <td className="px-6 py-4 text-gray-500">{notice.author_email}</td>
                          <td className="px-6 py-4 text-gray-500">
                            {new Date(notice.created_at).toLocaleDateString(locale, {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-end gap-2 text-gray-400">
                              <button
                                onClick={() => handleNoticeEdit(notice)}
                                className="px-3 py-1.5 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200"
                              >
                                {t('admin.common.edit')}
                              </button>
                              <button
                                onClick={() => handleNoticeDelete(notice.id)}
                                className="px-3 py-1.5 rounded-lg bg-gray-100 text-red-600 hover:bg-red-50"
                              >
                                {t('admin.common.delete')}
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {notices.length === 0 && (
                  <div className="px-6 py-12 text-center text-sm text-gray-400">
                    {t('admin.notice.empty')}
                  </div>
                )}
              </div>
            )}

            {activeSection === 'notices' && activeNoticeTab === 'templates' && (
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{t('admin.templates.title')}</h3>
                    <p className="text-sm text-gray-500">{t('admin.templates.subtitle')}</p>
                  </div>
                  <button
                    onClick={handleSaveTemplates}
                    disabled={templatesSaving}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg md:rounded-xl text-sm font-medium shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all disabled:opacity-60"
                  >
                    {templatesSaving ? t('admin.common.saving') : t('admin.templates.save')}
                  </button>
                </div>
                <div className="p-6 space-y-6">
                  {noticeCategoryOptions.map((option) => (
                    <div key={option.value}>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        {option.label}
                      </label>
                      <textarea
                        value={noticeTemplates[option.value] || ''}
                        onChange={(e) =>
                          setNoticeTemplates((prev) => ({
                            ...prev,
                            [option.value]: e.target.value,
                          }))
                        }
                        rows={4}
                        className="w-full px-4 py-3 text-sm border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
                        placeholder={t('admin.templates.placeholder')}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        </div>
      </main>

      {confirmCategoryOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={handleCancelCategoryChange}
        >
          <div
            className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center font-bold">
                !
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900">{t('admin.notice.confirmTitle')}</h4>
                <p className="text-sm text-gray-500">{t('admin.notice.confirmSubtitle')}</p>
              </div>
            </div>
            <p className="text-sm text-gray-700 mb-6">
              {t('admin.notice.confirmChangeCategory')}
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={handleCancelCategoryChange}
                className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg"
              >
                {t('admin.common.cancel')}
              </button>
              <button
                onClick={handleConfirmCategoryChange}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
              >
                {t('admin.notice.confirmProceed')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

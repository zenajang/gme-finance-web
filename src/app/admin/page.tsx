'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import dynamicImport from 'next/dynamic';
import '../components/admin/TiptapEditor.css';
import { useSWRConfig } from 'swr';
import { useTranslation } from 'react-i18next';
import BlogSection from '@/app/admin/components/BlogSection';
import NoticeSection from '@/app/admin/components/NoticeSection';
import CountrySection from '@/app/admin/components/CountrySection';
import CollectionStaffSection from '@/app/admin/components/CollectionStaffSection';
import AdminHeader from '@/app/admin/components/AdminHeader';
import AdminSidebar from '@/app/admin/components/AdminSidebar';
import AdminStats from '@/app/admin/components/AdminStats';
import type { BlogPost, NoticePost, NoticeCategoryOption, CountryPost, CountryKey } from '@/app/admin/types';
// CountryPost and CountryKey used below in state declarations
import { useAdminAuth } from '@/app/admin/hooks/useAdminAuth';
import { useBlogPosts } from '@/app/admin/hooks/useBlogPosts';
import { useNotices } from '@/app/admin/hooks/useNotices';
import { useCollectionStaff } from '@/app/admin/hooks/useCollectionStaff';

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
  const { user, loading, checkUser, handleLogout } = useAdminAuth();
  const [activeSection, setActiveSection] = useState<'blog' | 'notices' | 'countries' | 'staff'>('blog');
  const [activeBlogTab, setActiveBlogTab] = useState<'write' | 'list'>('write');
  const [activeNoticeTab, setActiveNoticeTab] = useState<'write' | 'list' | 'templates'>('write');
  const [activeCountryTab, setActiveCountryTab] = useState<'write' | 'list'>('write');

  // 추심직원 관리
  const {
    staff,
    name: staffName,
    setName: setStaffName,
    department: staffDepartment,
    setDepartment: setStaffDepartment,
    employeeNumber: staffEmployeeNumber,
    setEmployeeNumber: setStaffEmployeeNumber,
    corporateNumber: staffCorporateNumber,
    setCorporateNumber: setStaffCorporateNumber,
    editingId: staffEditingId,
    saving: staffSaving,
    fileInputRef: staffFileInputRef,
    fetchStaff,
    resetForm: resetStaffForm,
    handleEdit: handleStaffEdit,
    handleSave: handleStaffSave,
    handleDelete: handleStaffDelete,
    handleExcelUpload: handleStaffExcelUpload,
  } = useCollectionStaff({ t });

  // Country blog state
  const [countryPosts, setCountryPosts] = useState<CountryPost[]>([]);
  const [countryTitle, setCountryTitle] = useState('');
  const [countryContent, setCountryContent] = useState('');
  const [countrySelected, setCountrySelected] = useState<CountryKey>('vietnam');
  const [countryAuthorName, setCountryAuthorName] = useState('');
  const [countrySaving, setCountrySaving] = useState(false);
  const [countryEditMode, setCountryEditMode] = useState(false);
  const [countryEditingId, setCountryEditingId] = useState<string | null>(null);
  const [filterCountry, setFilterCountry] = useState<CountryKey | 'all'>('all');

  const noticeCategoryOptions: ReadonlyArray<NoticeCategoryOption> = [
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

  const {
    title,
    setTitle,
    content,
    setContent,
    authorName,
    setAuthorName,
    category,
    setCategory,
    posts,
    saving,
    isEditMode,
    fetchPosts,
    handleSave,
    handleDelete,
    handleEdit,
    resetForm,
  } = useBlogPosts({
    user,
    getThumbnailUrlFromContent,
    mutate,
    t,
    onSaved: () => setActiveBlogTab('list'),
  });

  const {
    notices,
    noticeSaving,
    noticeTitle,
    setNoticeTitle,
    noticeContent,
    setNoticeContent,
    noticePinned,
    setNoticePinned,
    noticeCategory,
    noticeColumns,
    setNoticeColumns,
    noticeRows,
    setNoticeRows,
    noticeEditMode,
    noticeTemplates,
    setNoticeTemplates,
    templatesSaving,
    confirmCategoryOpen,
    noticeFileInputRef,
    fetchNotices,
    fetchNoticeTemplates,
    resetNoticeForm,
    handleNoticeEdit,
    handleNoticeCategoryChange,
    handleConfirmCategoryChange,
    handleCancelCategoryChange,
    handleNoticeSave,
    handleNoticeDelete,
    handleSaveTemplates,
    handleNoticeExcelUpload,
  } = useNotices({
    user,
    noticeCategoryOptions,
    getDefaultNoticeColumns: () => ([
      t('admin.notice.table.columns.name'),
      t('admin.notice.table.columns.role'),
      t('admin.notice.table.columns.department'),
      t('admin.notice.table.columns.note'),
    ]),
    t,
    onSaved: () => setActiveNoticeTab('list'),
  });

  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  // Filter state for posts list
  const [filterCategory, setFilterCategory] = useState<'all' | 'blog' | 'customer_feedback'>('all');

  const handleEditPost = (post: BlogPost) => {
    handleEdit(post);
    setActiveBlogTab('write');
  };

  const handleEditNotice = (notice: NoticePost) => {
    handleNoticeEdit(notice);
    setActiveSection('notices');
    setActiveNoticeTab('write');
  };

  const resetCountryForm = () => {
    setCountryTitle('');
    setCountryContent('');
    setCountryAuthorName('');
    setCountrySelected('vietnam');
    setCountryEditMode(false);
    setCountryEditingId(null);
  };

  const handleEditCountry = (post: CountryPost) => {
    setCountryTitle(post.title);
    setCountryContent(post.content);
    setCountryAuthorName(post.author_name ?? '');
    setCountrySelected(post.country);
    setCountryEditMode(true);
    setCountryEditingId(post.id);
    setActiveSection('countries');
    setActiveCountryTab('write');
  };

  const handleSaveCountry = async () => {
    if (!countryTitle.trim()) return;
    setCountrySaving(true);
    try {
      const supabase = createClient();
      const thumbnail = await getThumbnailUrlFromContent(countryContent);
      const payload = {
        title: countryTitle.trim(),
        content: countryContent,
        country: countrySelected,
        category: 'country' as const,
        published: true,
        author_id: user?.id,
        author_email: user?.email,
        author_name: countryAuthorName.trim() || undefined,
        thumbnail_url: thumbnail,
      };
      if (countryEditMode && countryEditingId) {
        await supabase.from('blog_posts').update({ ...payload, updated_at: new Date().toISOString() }).eq('id', countryEditingId);
      } else {
        await supabase.from('blog_posts').insert([payload]);
      }
      resetCountryForm();
      setActiveCountryTab('list');
      await fetchCountryPosts();
    } finally {
      setCountrySaving(false);
    }
  };

  const handleDeleteCountry = async (id: string) => {
    if (!confirm(t('admin.alerts.deleteNoticeConfirm'))) return;
    const supabase = createClient();
    await supabase.from('blog_posts').delete().eq('id', id);
    await fetchCountryPosts();
  };

  const fetchCountryPosts = async () => {
    const supabase = createClient();
    const { data } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('category', 'country')
      .order('created_at', { ascending: false });
    setCountryPosts((data ?? []) as CountryPost[]);
  };

  // Check user authentication
  useEffect(() => {
    checkUser();
    fetchPosts();
    fetchNotices();
    fetchNoticeTemplates();
    fetchCountryPosts();
    fetchStaff();
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
      <AdminHeader userEmail={user?.email} onLogout={handleLogout} t={t} />

      {/* Main Content */}
      <main className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          <AdminSidebar
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            postsCount={posts.length}
            noticesCount={notices.length}
            countryPostsCount={countryPosts.length}
            staffCount={staff.length}
            t={t}
          />

          {/* Content */}
          <section className="flex-1 min-w-0">
            <AdminStats activeSection={activeSection} posts={posts} notices={notices} countryPosts={countryPosts} t={t} />

            {activeSection === 'countries' ? (
              <CountrySection
                activeCountryTab={activeCountryTab}
                setActiveCountryTab={setActiveCountryTab}
                isEditMode={countryEditMode}
                resetForm={resetCountryForm}
                title={countryTitle}
                setTitle={setCountryTitle}
                authorName={countryAuthorName}
                setAuthorName={setCountryAuthorName}
                country={countrySelected}
                setCountry={setCountrySelected}
                content={countryContent}
                setContent={setCountryContent}
                saving={countrySaving}
                handleSave={handleSaveCountry}
                posts={countryPosts}
                filterCountry={filterCountry}
                setFilterCountry={setFilterCountry}
                handleEdit={handleEditCountry}
                handleDelete={handleDeleteCountry}
                locale={locale}
                t={t}
                Editor={TiptapEditor}
              />
            ) : activeSection === 'blog' ? (
              <BlogSection
                activeBlogTab={activeBlogTab}
                setActiveBlogTab={setActiveBlogTab}
                isEditMode={isEditMode}
                resetForm={resetForm}
                title={title}
                setTitle={setTitle}
                authorName={authorName}
                setAuthorName={setAuthorName}
                category={category}
                setCategory={setCategory}
                isCategoryOpen={isCategoryOpen}
                setIsCategoryOpen={setIsCategoryOpen}
                content={content}
                setContent={setContent}
                saving={saving}
                handleSave={handleSave}
                posts={posts}
                filterCategory={filterCategory}
                setFilterCategory={setFilterCategory}
                handleEdit={handleEditPost}
                handleDelete={handleDelete}
                getVideoInfo={getVideoInfo}
                extractFirstImage={extractFirstImage}
                stripHtml={stripHtml}
                locale={locale}
                t={t}
                Editor={TiptapEditor}
              />
            ) : activeSection === 'staff' ? (
              <CollectionStaffSection
                staff={staff}
                name={staffName}
                setName={setStaffName}
                department={staffDepartment}
                setDepartment={setStaffDepartment}
                employeeNumber={staffEmployeeNumber}
                setEmployeeNumber={setStaffEmployeeNumber}
                corporateNumber={staffCorporateNumber}
                setCorporateNumber={setStaffCorporateNumber}
                editingId={staffEditingId}
                saving={staffSaving}
                fileInputRef={staffFileInputRef}
                handleSave={handleStaffSave}
                handleEdit={handleStaffEdit}
                handleDelete={handleStaffDelete}
                handleExcelUpload={handleStaffExcelUpload}
                resetForm={resetStaffForm}
                t={t}
              />
            ) : (
              <NoticeSection
                activeNoticeTab={activeNoticeTab}
                setActiveNoticeTab={setActiveNoticeTab}
                noticeEditMode={noticeEditMode}
                noticeTitle={noticeTitle}
                setNoticeTitle={setNoticeTitle}
                noticeCategory={noticeCategory}
                handleNoticeCategoryChange={handleNoticeCategoryChange}
                noticeCategoryOptions={noticeCategoryOptions}
                noticeContent={noticeContent}
                setNoticeContent={setNoticeContent}
                noticeColumns={noticeColumns}
                setNoticeColumns={setNoticeColumns}
                noticeRows={noticeRows}
                setNoticeRows={setNoticeRows}
                noticePinned={noticePinned}
                setNoticePinned={setNoticePinned}
                resetNoticeForm={resetNoticeForm}
                handleNoticeSave={handleNoticeSave}
                noticeSaving={noticeSaving}
                notices={notices}
                handleNoticeEdit={handleEditNotice}
                handleNoticeDelete={handleNoticeDelete}
                getNoticeCategoryLabel={getNoticeCategoryLabel}
                getNoticeStatusLabel={getNoticeStatusLabel}
                noticeTemplates={noticeTemplates}
                setNoticeTemplates={setNoticeTemplates}
                templatesSaving={templatesSaving}
                handleSaveTemplates={handleSaveTemplates}
                noticeFileInputRef={noticeFileInputRef}
                handleNoticeExcelUpload={handleNoticeExcelUpload}
                confirmCategoryOpen={confirmCategoryOpen}
                handleCancelCategoryChange={handleCancelCategoryChange}
                handleConfirmCategoryChange={handleConfirmCategoryChange}
                locale={locale}
                t={t}
              />
            )}
          </section>
        </div>
      </main>

      
    </div>
  );
}

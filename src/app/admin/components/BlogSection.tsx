/* eslint-disable @next/next/no-img-element */
'use client';

import { type ComponentType, type Dispatch, type SetStateAction } from 'react';
import { COMMON_COLORS } from '@/constants/colors';
import type { BlogPost, BlogCategory } from '@/app/admin/types';

interface BlogSectionProps {
  activeBlogTab: 'write' | 'list';
  setActiveBlogTab: Dispatch<SetStateAction<'write' | 'list'>>;
  isEditMode: boolean;
  resetForm: () => void;
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
  authorName: string;
  setAuthorName: Dispatch<SetStateAction<string>>;
  category: BlogCategory;
  setCategory: Dispatch<SetStateAction<BlogCategory>>;
  isCategoryOpen: boolean;
  setIsCategoryOpen: Dispatch<SetStateAction<boolean>>;
  content: string;
  setContent: Dispatch<SetStateAction<string>>;
  saving: boolean;
  handleSave: () => void;
  posts: BlogPost[];
  filterCategory: 'all' | 'blog' | 'customer_feedback';
  setFilterCategory: Dispatch<SetStateAction<'all' | 'blog' | 'customer_feedback'>>;
  handleEdit: (post: BlogPost) => void;
  handleDelete: (id: string) => void;
  getVideoInfo: (html: string) => { type: 'video' | 'youtube' | null; src: string | null; thumbnail: string | null };
  extractFirstImage: (html: string) => string | null;
  stripHtml: (html: string) => string;
  locale: string;
  t: (key: string, options?: Record<string, unknown>) => string;
  Editor: ComponentType<{ content: string; onChange: (value: string) => void; placeholder?: string }>;
}

export default function BlogSection({
  activeBlogTab,
  setActiveBlogTab,
  isEditMode,
  resetForm,
  title,
  setTitle,
  authorName,
  setAuthorName,
  category,
  setCategory,
  isCategoryOpen,
  setIsCategoryOpen,
  content,
  setContent,
  saving,
  handleSave,
  posts,
  filterCategory,
  setFilterCategory,
  handleEdit,
  handleDelete,
  getVideoInfo,
  extractFirstImage,
  stripHtml,
  locale,
  t,
  Editor,
}: BlogSectionProps) {
  return (
    <>
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

      {activeBlogTab === 'write' && (
        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8">
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
            <label htmlFor="authorName" className="block text-sm font-semibold text-gray-700 mb-2">
              {t('admin.blog.authorName')}
            </label>
            <input
              id="authorName"
              type="text"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              className="w-full px-4 py-3 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition-all"
              placeholder={t('admin.blog.authorNamePlaceholder')}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="content" className="block text-sm font-semibold text-gray-700 mb-2">
              {t('admin.blog.content')}
            </label>
            <Editor
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

      {activeBlogTab === 'list' && (
        <div className="space-y-4">
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
                    {hasThumbnail && (
                      <div className="w-40 h-40 flex-shrink-0 relative overflow-hidden">
                        {videoInfo.type === 'video' ? (
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
                              <span className="truncate max-w-[150px]">{post.author_name || post.author_email}</span>
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
    </>
  );
}

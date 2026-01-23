'use client';

import { type Dispatch, type SetStateAction, type RefObject, type ChangeEvent } from 'react';
import { COMMON_COLORS } from '@/constants/colors';
import type { NoticePost, NoticeCategoryOption } from '@/app/admin/types';

interface NoticeSectionProps {
  activeNoticeTab: 'write' | 'list' | 'templates';
  setActiveNoticeTab: Dispatch<SetStateAction<'write' | 'list' | 'templates'>>;
  noticeEditMode: boolean;
  noticeTitle: string;
  setNoticeTitle: Dispatch<SetStateAction<string>>;
  noticeCategory: string;
  handleNoticeCategoryChange: (value: string) => void;
  noticeCategoryOptions: ReadonlyArray<NoticeCategoryOption>;
  noticeContent: string;
  setNoticeContent: Dispatch<SetStateAction<string>>;
  noticeColumns: string[];
  setNoticeColumns: Dispatch<SetStateAction<string[]>>;
  noticeRows: string[][];
  setNoticeRows: Dispatch<SetStateAction<string[][]>>;
  noticePinned: boolean;
  setNoticePinned: Dispatch<SetStateAction<boolean>>;
  resetNoticeForm: () => void;
  handleNoticeSave: () => void;
  noticeSaving: boolean;
  notices: NoticePost[];
  handleNoticeEdit: (notice: NoticePost) => void;
  handleNoticeDelete: (id: string) => void;
  getNoticeCategoryLabel: (value?: string | null) => string;
  getNoticeStatusLabel: (value?: string | null) => string;
  noticeTemplates: Record<string, string>;
  setNoticeTemplates: Dispatch<SetStateAction<Record<string, string>>>;
  templatesSaving: boolean;
  handleSaveTemplates: () => void;
  noticeFileInputRef: RefObject<HTMLInputElement | null>;
  handleNoticeExcelUpload: (event: ChangeEvent<HTMLInputElement>) => void;
  confirmCategoryOpen: boolean;
  handleCancelCategoryChange: () => void;
  handleConfirmCategoryChange: () => void;
  locale: string;
  t: (key: string, options?: Record<string, unknown>) => string;
}

export default function NoticeSection({
  activeNoticeTab,
  setActiveNoticeTab,
  noticeEditMode,
  noticeTitle,
  setNoticeTitle,
  noticeCategory,
  handleNoticeCategoryChange,
  noticeCategoryOptions,
  noticeContent,
  setNoticeContent,
  noticeColumns,
  setNoticeColumns,
  noticeRows,
  setNoticeRows,
  noticePinned,
  setNoticePinned,
  resetNoticeForm,
  handleNoticeSave,
  noticeSaving,
  notices,
  handleNoticeEdit,
  handleNoticeDelete,
  getNoticeCategoryLabel,
  getNoticeStatusLabel,
  noticeTemplates,
  setNoticeTemplates,
  templatesSaving,
  handleSaveTemplates,
  noticeFileInputRef,
  handleNoticeExcelUpload,
  confirmCategoryOpen,
  handleCancelCategoryChange,
  handleConfirmCategoryChange,
  locale,
  t,
}: NoticeSectionProps) {
  return (
    <>
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

      {activeNoticeTab === 'write' && (
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
              <div className="flex flex-wrap items-center gap-2 mb-1">
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
              <div className="mb-3 flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-700">
                <span>{t('admin.notice.uploadFormatNote')}</span>
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

      {activeNoticeTab === 'list' && (
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

      {activeNoticeTab === 'templates' && (
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
    </>
  );
}

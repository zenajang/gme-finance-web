'use client';

import { useCallback, useRef, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { User } from '@supabase/supabase-js';
import type { NoticePost, NoticeCategoryOption } from '@/app/admin/types';
import { parseNoticeExcel } from '@/app/admin/utils/noticeExcel';

interface UseNoticesOptions {
  user: User | null;
  noticeCategoryOptions: ReadonlyArray<NoticeCategoryOption>;
  getDefaultNoticeColumns: () => string[];
  t: (key: string, options?: Record<string, unknown>) => string;
  onSaved?: () => void;
}

export function useNotices({ user, noticeCategoryOptions, getDefaultNoticeColumns, t, onSaved }: UseNoticesOptions) {
  const [notices, setNotices] = useState<NoticePost[]>([]);
  const [noticeSaving, setNoticeSaving] = useState(false);
  const [noticeTitle, setNoticeTitle] = useState('');
  const [noticeContent, setNoticeContent] = useState('');
  const [noticePinned, setNoticePinned] = useState(false);
  const [noticeCategory, setNoticeCategory] = useState<string>('loss_of_benefit');
  const [noticeColumns, setNoticeColumns] = useState<string[]>(() => getDefaultNoticeColumns());
  const [noticeRows, setNoticeRows] = useState<string[][]>([['', '', '', ''], ['', '', '', '']]);
  const [noticeEditingId, setNoticeEditingId] = useState<string | null>(null);
  const [noticeEditMode, setNoticeEditMode] = useState(false);

  const [noticeTemplates, setNoticeTemplates] = useState<Record<string, string>>({});
  const [templatesSaving, setTemplatesSaving] = useState(false);

  const [confirmCategoryOpen, setConfirmCategoryOpen] = useState(false);
  const [pendingCategory, setPendingCategory] = useState<string | null>(null);

  const noticeFileInputRef = useRef<HTMLInputElement | null>(null);

  const fetchNotices = useCallback(async () => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('notices')
      .select('*')
      .order('pinned', { ascending: false })
      .order('created_at', { ascending: false });

    if (!error && data) {
      setNotices(data as NoticePost[]);
    }
  }, []);

  const fetchNoticeTemplates = useCallback(async () => {
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
  }, []);

  const resetNoticeForm = useCallback(() => {
    setNoticeTitle('');
    setNoticeContent('');
    setNoticePinned(false);
    setNoticeCategory('loss_of_benefit');
    setNoticeColumns(getDefaultNoticeColumns());
    setNoticeRows([['', '', '', ''], ['', '', '', '']]);
    setNoticeEditingId(null);
    setNoticeEditMode(false);
  }, [getDefaultNoticeColumns]);

  const handleNoticeEdit = useCallback((notice: NoticePost) => {
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
  }, [getDefaultNoticeColumns]);

  const applyNoticeCategory = useCallback((nextCategory: string) => {
    setNoticeCategory(nextCategory);
    setNoticeContent(noticeTemplates[nextCategory] || '');
  }, [noticeTemplates]);

  const handleNoticeCategoryChange = useCallback((nextCategory: string) => {
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
  }, [applyNoticeCategory, noticeCategory, noticeContent, noticeTemplates]);

  const handleConfirmCategoryChange = useCallback(() => {
    if (!pendingCategory) {
      setConfirmCategoryOpen(false);
      return;
    }
    applyNoticeCategory(pendingCategory);
    setPendingCategory(null);
    setConfirmCategoryOpen(false);
  }, [applyNoticeCategory, pendingCategory]);

  const handleCancelCategoryChange = useCallback(() => {
    setPendingCategory(null);
    setConfirmCategoryOpen(false);
  }, []);

  const handleNoticeSave = useCallback(async () => {
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
      onSaved?.();
    } catch (err) {
      console.error('Notice save error:', err);
      alert(t('admin.alerts.saveNoticeGeneric'));
    } finally {
      setNoticeSaving(false);
    }
  }, [fetchNotices, noticeCategory, noticeColumns, noticeContent, noticeEditMode, noticeEditingId, noticePinned, noticeRows, noticeTitle, onSaved, resetNoticeForm, t, user?.email, user?.id]);

  const handleNoticeDelete = useCallback(async (id: string) => {
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
  }, [fetchNotices, noticeEditingId, resetNoticeForm, t]);

  const handleSaveTemplates = useCallback(async () => {
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
  }, [fetchNoticeTemplates, noticeCategoryOptions, noticeTemplates, t]);

  const handleNoticeExcelUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const buffer = await file.arrayBuffer();
      const result = parseNoticeExcel(buffer, {
        getDefaultColumnLabel: (index) => t('admin.notice.table.columnDefault', { number: index }),
      });

      if (result.warning === 'empty') {
        alert(t('admin.notice.uploadEmpty'));
        return;
      }
      if (result.warning === 'noRows') {
        alert(t('admin.notice.uploadNoRows'));
      }

      setNoticeColumns(result.columns);
      setNoticeRows(result.rows);
    } catch (error) {
      console.error('Excel upload error:', error);
      alert(t('admin.notice.uploadError'));
    } finally {
      if (event.target) {
        event.target.value = '';
      }
    }
  }, [t]);

  return {
    notices,
    setNotices,
    noticeSaving,
    noticeTitle,
    setNoticeTitle,
    noticeContent,
    setNoticeContent,
    noticePinned,
    setNoticePinned,
    noticeCategory,
    setNoticeCategory,
    noticeColumns,
    setNoticeColumns,
    noticeRows,
    setNoticeRows,
    noticeEditingId,
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
  };
}

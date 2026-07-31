'use client';

import { useCallback, useRef, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { CollectionStaff } from '@/app/admin/types';
import { parseStaffExcel } from '@/app/admin/utils/staffExcel';

interface UseCollectionStaffOptions {
  t: (key: string, options?: Record<string, unknown>) => string;
}

export function useCollectionStaff({ t }: UseCollectionStaffOptions) {
  const [staff, setStaff] = useState<CollectionStaff[]>([]);
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [employeeNumber, setEmployeeNumber] = useState('');
  const [corporateNumber, setCorporateNumber] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const fetchStaff = useCallback(async () => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('collection_staff')
      .select('id,name,department,employee_number,corporate_number,sort_order,created_at,updated_at')
      .order('sort_order', { ascending: true })
      .order('name', { ascending: true });

    if (!error && data) {
      setStaff(data as CollectionStaff[]);
    } else if (error) {
      console.error('Collection staff fetch error:', error);
    }
  }, []);

  const resetForm = useCallback(() => {
    setName('');
    setDepartment('');
    setEmployeeNumber('');
    setCorporateNumber('');
    setEditingId(null);
  }, []);

  const handleEdit = useCallback((member: CollectionStaff) => {
    setName(member.name);
    setDepartment(member.department ?? '');
    setEmployeeNumber(member.employee_number ?? '');
    setCorporateNumber(member.corporate_number ?? '');
    setEditingId(member.id);
  }, []);

  const handleSave = useCallback(async () => {
    if (!name.trim()) {
      alert(t('admin.staff.nameRequired'));
      return;
    }
    setSaving(true);
    try {
      const supabase = createClient();
      const payload = {
        name: name.trim(),
        department: department.trim() || null,
        employee_number: employeeNumber.trim() || null,
        corporate_number: corporateNumber.trim() || null,
      };

      if (editingId) {
        const { error } = await supabase.from('collection_staff').update(payload).eq('id', editingId);
        if (error) {
          alert(t('admin.staff.saveError', { message: error.message }));
          return;
        }
      } else {
        const { error } = await supabase.from('collection_staff').insert([payload]);
        if (error) {
          alert(t('admin.staff.saveError', { message: error.message }));
          return;
        }
      }
      resetForm();
      await fetchStaff();
    } finally {
      setSaving(false);
    }
  }, [corporateNumber, department, editingId, employeeNumber, fetchStaff, name, resetForm, t]);

  const handleDelete = useCallback(async (id: string) => {
    if (!confirm(t('admin.staff.deleteConfirm'))) return;
    const supabase = createClient();
    const { error } = await supabase.from('collection_staff').delete().eq('id', id);
    if (error) {
      alert(t('admin.staff.deleteError', { message: error.message }));
      return;
    }
    if (editingId === id) resetForm();
    await fetchStaff();
  }, [editingId, fetchStaff, resetForm, t]);

  const handleExcelUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const buffer = await file.arrayBuffer();
      const result = parseStaffExcel(buffer);

      if (result.warning === 'empty' || result.rows.length === 0) {
        alert(t('admin.staff.excelEmpty'));
        return;
      }

      setSaving(true);
      const supabase = createClient();
      const { error } = await supabase.from('collection_staff').insert(result.rows);
      if (error) {
        alert(t('admin.staff.saveError', { message: error.message }));
        return;
      }
      alert(t('admin.staff.excelSuccess', { count: result.rows.length }));
      await fetchStaff();
    } catch (err) {
      console.error('Staff excel upload error:', err);
      alert(t('admin.staff.excelError'));
    } finally {
      setSaving(false);
      if (event.target) event.target.value = '';
    }
  }, [fetchStaff, t]);

  return {
    staff,
    name,
    setName,
    department,
    setDepartment,
    employeeNumber,
    setEmployeeNumber,
    corporateNumber,
    setCorporateNumber,
    editingId,
    saving,
    fileInputRef,
    fetchStaff,
    resetForm,
    handleEdit,
    handleSave,
    handleDelete,
    handleExcelUpload,
  };
}

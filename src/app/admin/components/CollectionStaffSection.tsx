'use client';

import type { CollectionStaff } from '@/app/admin/types';

interface CollectionStaffSectionProps {
  staff: CollectionStaff[];
  name: string;
  setName: (v: string) => void;
  department: string;
  setDepartment: (v: string) => void;
  employeeNumber: string;
  setEmployeeNumber: (v: string) => void;
  corporateNumber: string;
  setCorporateNumber: (v: string) => void;
  editingId: string | null;
  saving: boolean;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  handleSave: () => void;
  handleEdit: (member: CollectionStaff) => void;
  handleDelete: (id: string) => void;
  handleExcelUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  resetForm: () => void;
  t: (key: string, options?: Record<string, unknown>) => string;
}

export default function CollectionStaffSection({
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
  handleSave,
  handleEdit,
  handleDelete,
  handleExcelUpload,
  resetForm,
  t,
}: CollectionStaffSectionProps) {
  const inputClass =
    'w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500';

  return (
    <div className="space-y-6">
      {/* 입력 폼 */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            {editingId ? t('admin.staff.editTitle') : t('admin.staff.addTitle')}
          </h2>
          {/* 엑셀 업로드 */}
          <div>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={saving}
              className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700 transition hover:bg-emerald-100 disabled:opacity-50"
            >
              {t('admin.staff.excelUpload')}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".xlsx,.xls,.csv"
              onChange={handleExcelUpload}
              className="hidden"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label htmlFor="staff-name" className="block text-sm font-medium text-gray-700 mb-1">
              {t('admin.staff.name')} <span className="text-red-500">*</span>
            </label>
            <input id="staff-name" type="text" value={name} onChange={(e) => setName(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label htmlFor="staff-dept" className="block text-sm font-medium text-gray-700 mb-1">
              {t('admin.staff.department')}
            </label>
            <input id="staff-dept" type="text" value={department} onChange={(e) => setDepartment(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label htmlFor="staff-empno" className="block text-sm font-medium text-gray-700 mb-1">
              {t('admin.staff.employeeNumber')}
            </label>
            <input id="staff-empno" type="text" value={employeeNumber} onChange={(e) => setEmployeeNumber(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label htmlFor="staff-corpno" className="block text-sm font-medium text-gray-700 mb-1">
              {t('admin.staff.corporateNumber')}
            </label>
            <input id="staff-corpno" type="text" value={corporateNumber} onChange={(e) => setCorporateNumber(e.target.value)} className={inputClass} />
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
          >
            {saving ? t('admin.staff.saving') : editingId ? t('admin.staff.edit') : t('admin.staff.add')}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
            >
              {t('admin.staff.cancel')}
            </button>
          )}
        </div>
        <p className="mt-3 text-xs text-gray-400">{t('admin.staff.excelHint')}</p>
      </div>

      {/* 목록 */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="bg-gray-50 text-gray-700 border-b border-gray-200">
                <th scope="col" className="px-4 py-3 text-left font-semibold">{t('admin.staff.name')}</th>
                <th scope="col" className="px-4 py-3 text-left font-semibold">{t('admin.staff.department')}</th>
                <th scope="col" className="px-4 py-3 text-left font-semibold">{t('admin.staff.employeeNumber')}</th>
                <th scope="col" className="px-4 py-3 text-left font-semibold">{t('admin.staff.corporateNumber')}</th>
                <th scope="col" className="px-4 py-3 text-right font-semibold">{t('admin.staff.manage')}</th>
              </tr>
            </thead>
            <tbody>
              {staff.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-gray-400">
                    {t('admin.staff.empty')}
                  </td>
                </tr>
              ) : (
                staff.map((member) => (
                  <tr key={member.id} className="border-b border-gray-100 last:border-b-0 text-gray-700">
                    <td className="px-4 py-3">{member.name}</td>
                    <td className="px-4 py-3">{member.department || '-'}</td>
                    <td className="px-4 py-3">{member.employee_number || '-'}</td>
                    <td className="px-4 py-3">{member.corporate_number || '-'}</td>
                    <td className="px-4 py-3 text-right whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => handleEdit(member)}
                        className="mr-2 rounded-md px-2 py-1 text-xs font-medium text-blue-600 hover:bg-blue-50"
                      >
                        {t('admin.staff.edit')}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(member.id)}
                        className="rounded-md px-2 py-1 text-xs font-medium text-red-600 hover:bg-red-50"
                      >
                        {t('admin.staff.delete')}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

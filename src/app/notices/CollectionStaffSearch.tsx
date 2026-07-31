'use client';

import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { createClient } from '@/lib/supabase/client';
import type { CollectionStaff } from '@/app/admin/types';

export default function CollectionStaffSearch() {
  const { t } = useTranslation();
  const [staff, setStaff] = useState<CollectionStaff[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [submittedQuery, setSubmittedQuery] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from('collection_staff')
          .select('id,name,department,employee_number,corporate_number,sort_order,created_at,updated_at')
          .order('sort_order', { ascending: true })
          .order('name', { ascending: true });

        if (error) {
          console.error('Collection staff fetch error:', error);
          return;
        }
        setStaff((data as CollectionStaff[]) || []);
      } finally {
        setLoading(false);
      }
    };
    fetchStaff();
  }, []);

  const results = useMemo(() => {
    if (!hasSearched) return [];
    const keyword = submittedQuery.trim().toLowerCase();
    if (!keyword) return staff;
    return staff.filter((s) => s.name.toLowerCase().includes(keyword));
  }, [staff, submittedQuery, hasSearched]);

  const handleSearch = () => {
    setSubmittedQuery(query);
    setHasSearched(true);
  };

  return (
    <section aria-labelledby="collection-staff-heading">
      <div className="mb-8">
        <h2 id="collection-staff-heading" className="text-xl md:text-2xl font-bold text-gray-900">
          {t('notices.staffSearch.title')}
        </h2>
        <p className="mt-2 text-sm text-gray-500">{t('notices.staffSearch.excludeNote')}</p>
      </div>

      {/* 검색 */}
      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-5 md:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <label htmlFor="staff-search" className="text-sm font-semibold text-gray-700 sm:w-16 shrink-0">
            {t('notices.staffSearch.searchLabel')}
          </label>
          <div className="flex flex-1 gap-2">
            <input
              id="staff-search"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSearch();
              }}
              placeholder={t('notices.staffSearch.searchPlaceholder')}
              className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#DF2121] focus:outline-none focus:ring-1 focus:ring-[#DF2121]"
            />
            <button
              type="button"
              onClick={handleSearch}
              className="whitespace-nowrap rounded-lg bg-gray-800 px-4 py-2 text-sm font-semibold text-white transition hover:bg-gray-900"
            >
              {t('notices.staffSearch.searchButton')}
            </button>
          </div>
        </div>
      </div>

      {/* 검색결과 */}
      <div className="mt-8">
        <h3 className="mb-3 text-lg font-bold text-gray-900">{t('notices.staffSearch.resultsTitle')}</h3>
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] text-sm">
              <thead>
                <tr className="bg-gray-50 text-gray-700 border-b border-gray-200">
                  <th scope="col" className="px-4 md:px-6 py-3 text-center font-semibold">{t('notices.staffSearch.colName')}</th>
                  <th scope="col" className="px-4 md:px-6 py-3 text-center font-semibold">{t('notices.staffSearch.colDepartment')}</th>
                  <th scope="col" className="px-4 md:px-6 py-3 text-center font-semibold">{t('notices.staffSearch.colEmployeeNumber')}</th>
                  <th scope="col" className="px-4 md:px-6 py-3 text-center font-semibold">{t('notices.staffSearch.colCorporateNumber')}</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-10 text-center text-gray-400">
                      {t('notices.staffSearch.loading')}
                    </td>
                  </tr>
                ) : results.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-10 text-center text-gray-400">
                      {t('notices.staffSearch.empty')}
                    </td>
                  </tr>
                ) : (
                  results.map((s) => (
                    <tr key={s.id} className="border-b border-gray-100 last:border-b-0 text-gray-700">
                      <td className="px-4 md:px-6 py-4 text-center">{s.name}</td>
                      <td className="px-4 md:px-6 py-4 text-center">{s.department || '-'}</td>
                      <td className="px-4 md:px-6 py-4 text-center">{s.employee_number || '-'}</td>
                      <td className="px-4 md:px-6 py-4 text-center">{s.corporate_number || '-'}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

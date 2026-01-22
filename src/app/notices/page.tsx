'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { NOTICES } from './data';

type NoticeRow = {
  id: string;
  title: string;
  pinned: boolean;
  created_at: string;
};

export default function NoticesPage() {
  const [notices, setNotices] = useState<NoticeRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from('notices')
          .select('id,title,pinned,created_at')
          .order('pinned', { ascending: false })
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Notice fetch error:', error);
          return;
        }

        setNotices(data || []);
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  const mergedRows = [
    ...NOTICES.map((notice) => ({
      kind: 'static' as const,
      key: notice.slug,
      title: notice.title,
      pinned: notice.pinned,
      date: notice.date,
      href: `/notices/${notice.slug}`,
    })),
    ...notices.map((notice) => ({
      kind: 'dynamic' as const,
      key: notice.id,
      title: notice.title,
      pinned: notice.pinned,
      date: notice.created_at,
      href: `/notices/${notice.id}`,
    })),
  ];
  const totalPages = Math.max(1, Math.ceil(mergedRows.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const pagedRows = mergedRows.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const pageWindowSize = 5;
  const windowStart = Math.floor((currentPage - 1) / pageWindowSize) * pageWindowSize + 1;
  const windowEnd = Math.min(totalPages, windowStart + pageWindowSize - 1);
  const pageItems = Array.from({ length: windowEnd - windowStart + 1 }, (_, i) => windowStart + i);

  return (
    <main className="min-h-screen relative overflow-hidden blog-paper py-8 md:py-20 px-4 md:px-8 lg:px-40">
      <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[#ffe1cf] blur-3xl opacity-70 animate-float-slow" />
      <div className="pointer-events-none absolute top-40 -left-16 h-64 w-64 rounded-full bg-[#ffd7c2] blur-3xl opacity-60 animate-float-slower" />

      <div className="max-w-5xl mx-auto mt-12 relative z-10">
        <div className="mb-10 md:mb-14 text-center">
          <span className="animate-fade-up inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-gray-700 shadow-sm ring-1 ring-black/5 backdrop-blur">
            Heads-up
            <span className="h-1 w-1 rounded-full bg-red-400" />
            Notices
          </span>
          <h1 className="animate-fade-up mt-3 text-3xl md:text-5xl font-extrabold text-gray-900">Notices</h1>
          <p className="animate-fade-up mt-4 text-gray-600 text-base md:text-lg">
            Check the latest notices and important updates.
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <div className="min-w-[520px]">
              <div className="grid grid-cols-[72px_1fr_140px] text-sm font-semibold text-gray-700 bg-gray-50 border-b border-gray-200">
                <div className="px-4 md:px-6 py-3 whitespace-nowrap">번호</div>
                <div className="px-4 md:px-6 py-3">제목</div>
                <div className="px-4 md:px-6 py-3 text-center whitespace-nowrap">등록일</div>
              </div>
              {loading ? (
                <div className="px-6 py-10 text-center text-sm text-gray-400">
                  Loading notices...
                </div>
              ) : mergedRows.length === 0 ? (
                <div className="px-6 py-10 text-center text-sm text-gray-400">
                  No notices yet.
                </div>
              ) : (
                pagedRows.map((notice, index) => (
                <div
                  key={notice.key}
                  className="grid grid-cols-[72px_1fr_140px] text-sm md:text-base text-gray-700 border-b border-gray-100 last:border-b-0 bg-white"
                >
                  <div className="px-4 md:px-6 py-4 whitespace-nowrap">
                    {(currentPage - 1) * pageSize + index + 1}
                  </div>
                  <div className="px-4 md:px-6 py-4">
                    <Link
                      href={notice.href}
                      className="inline-flex items-center gap-2 text-gray-900 hover:text-gray-700 font-medium"
                    >
                      {notice.pinned && (
                        <span className="rounded-md bg-gray-100 px-2 py-0.5 text-xs font-semibold text-gray-600">
                          공지
                        </span>
                      )}
                      {notice.kind === 'static' && (
                        <span className="rounded-md bg-amber-50 px-2 py-0.5 text-xs font-semibold text-amber-700">
                          기본공지
                        </span>
                      )}
                      {notice.title}
                    </Link>
                  </div>
                  <div className="px-4 md:px-6 py-4 text-center whitespace-nowrap">
                    <time dateTime={notice.date}>
                      {new Date(notice.date).toLocaleDateString('ko-KR', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit'
                      })}
                    </time>
                  </div>
                </div>
              )))}
            </div>
          </div>
        </div>

        {!loading && mergedRows.length > pageSize && (
          <div className="mt-6 flex items-center justify-center gap-2 text-sm">
            <button
              onClick={() => setPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-gray-600 disabled:opacity-40 hover:border-[#DF2121]/30 hover:text-[#DF2121]"
            >
              {'<'}
            </button>
            <div className="flex items-center gap-1.5">
              {pageItems.map((item) => (
                <button
                  key={item}
                  onClick={() => setPage(item)}
                  className={`min-w-[36px] px-3 py-2 rounded-lg border text-sm font-medium transition ${
                    item === currentPage
                      ? 'text-white shadow-sm'
                      : 'border-gray-200 bg-white text-gray-600 hover:border-[#DF2121]/30 hover:text-[#DF2121] hover:bg-[#DF2121]/5'
                  }`}
                  style={item === currentPage ? { backgroundColor: '#DF2121', borderColor: '#DF2121' } : undefined}
                >
                  {item}
                </button>
              ))}
            </div>
            <button
              onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-gray-600 disabled:opacity-40 hover:border-[#DF2121]/30 hover:text-[#DF2121]"
            >
              {'>'}
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

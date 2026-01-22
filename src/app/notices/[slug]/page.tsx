'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { NOTICES } from '../data';

export default function NoticeDetailPage() {
  const params = useParams();
  const slug = typeof params?.slug === 'string' ? params.slug : Array.isArray(params?.slug) ? params.slug[0] : '';
  const staticNotice = useMemo(() => NOTICES.find((item) => item.slug === slug), [slug]);
  const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(slug);
  const [notice, setNotice] = useState<{
    id: string;
    title: string;
    table_columns: string[];
    table_rows: string[][];
    author_email: string | null;
    pinned: boolean;
    created_at: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotice = async () => {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from('notices')
          .select('id,title,table_columns,table_rows,author_email,pinned,created_at')
          .eq('id', slug)
          .single();

        if (error) {
          console.error('Notice fetch error:', error);
          setNotice(null);
          return;
        }

        setNotice(data);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      if (isUuid) {
        fetchNotice();
      } else {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, [slug, isUuid]);

  return (
    <main className="min-h-screen relative overflow-hidden blog-paper py-8 md:py-20 px-4 md:px-8 lg:px-20">
      <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[#ffe1cf] blur-3xl opacity-70 animate-float-slow" />
      <div className="pointer-events-none absolute top-40 -left-16 h-64 w-64 rounded-full bg-[#ffd7c2] blur-3xl opacity-60 animate-float-slower" />

      <div className="max-w-5xl mx-auto mt-12 relative z-10">
        <Link
          href="/notices"
          className="group inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/80 px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm transition hover:-translate-y-0.5 hover:border-gray-300 hover:bg-white hover:text-gray-900"
        >
          <span className="grid h-6 w-6 place-items-center rounded-full bg-gray-100 text-gray-500 transition group-hover:bg-gray-200 group-hover:text-gray-700">
            ←
          </span>
          Notices로 돌아가기
        </Link>

        <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 md:p-10 shadow-sm">
          {loading ? (
            <div className="py-16 text-center text-sm text-gray-400">Loading notice...</div>
          ) : !notice && !staticNotice ? (
            <div className="py-16 text-center text-sm text-gray-400">Notice not found.</div>
          ) : staticNotice ? (
            <>
              <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                <span className="rounded-full bg-gray-100 px-3 py-1 font-semibold text-gray-700">
                  Notice
                </span>
                <time dateTime={staticNotice.date}>
                  {new Date(staticNotice.date).toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
                <span className="text-gray-400">·</span>
                <span>{staticNotice.author}</span>
              </div>

              <h1 className="mt-5 text-2xl md:text-4xl font-bold text-gray-900">
                {staticNotice.title}
              </h1>
              <p className="mt-3 text-gray-600">{staticNotice.excerpt}</p>

              <div className="mt-8 space-y-8 text-gray-700">
                {staticNotice.body.map((section, index) => (
                  <section key={`${staticNotice.slug}-section-${index}`}>
                    {section.heading && (
                      <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-3">
                        {section.heading}
                      </h2>
                    )}
                    <div className="space-y-3">
                      {section.paragraphs.map((paragraph, paragraphIndex) => (
                        <p key={`${staticNotice.slug}-p-${index}-${paragraphIndex}`}>{paragraph}</p>
                      ))}
                    </div>
                    {section.table && (
                      <div className="mt-4 overflow-hidden rounded-xl border border-gray-200">
                        <table className="w-full text-sm text-gray-700">
                          <thead className="bg-gray-50 text-gray-600">
                            <tr>
                              {section.table.headers.map((header, headerIndex) => {
                                const isArrow = header === '→';
                                return (
                                  <th
                                    key={`${staticNotice.slug}-th-${index}-${headerIndex}-${header}`}
                                    className={`px-4 py-3 text-left font-semibold${
                                      isArrow ? ' w-8 text-center text-gray-400' : ''
                                    }`}
                                  >
                                    {header}
                                  </th>
                                );
                              })}
                            </tr>
                          </thead>
                          <tbody>
                            {section.table.rows.map((row, rowIndex) => (
                              <tr
                                key={`${staticNotice.slug}-tr-${index}-${rowIndex}`}
                                className="border-t border-gray-200"
                              >
                                {row.map((cell, cellIndex) => {
                                  const isArrow = cell === '→';
                                  return (
                                    <td
                                      key={`${staticNotice.slug}-td-${index}-${rowIndex}-${cellIndex}`}
                                      className={`px-4 py-3 whitespace-pre-line${
                                        isArrow ? ' w-8 text-center text-gray-400' : ''
                                      }`}
                                    >
                                      {cell}
                                    </td>
                                  );
                                })}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </section>
                ))}
              </div>

              {staticNotice.attachments && staticNotice.attachments.length > 0 && (
                <div className="mt-10 rounded-xl bg-gray-50 p-5">
                  <h3 className="text-sm font-semibold text-gray-700">첨부 파일</h3>
                  <div className="mt-3 flex flex-col gap-2">
                    {staticNotice.attachments.map((file) => (
                      <a
                        key={file.href}
                        href={file.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 transition hover:border-gray-300 hover:text-gray-900"
                      >
                        {file.label}
                        <span className="text-gray-400">Download</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : notice ? (
            <>
              <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                <span className="rounded-full bg-gray-100 px-3 py-1 font-semibold text-gray-700">
                  Notice
                </span>
                {notice.pinned && (
                  <span className="rounded-full bg-blue-50 px-3 py-1 font-semibold text-blue-700">
                    Pinned
                  </span>
                )}
                <time dateTime={notice.created_at}>
                  {new Date(notice.created_at).toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
                <span className="text-gray-400">·</span>
                <span>{notice.author_email || 'admin@gmefinance.com'}</span>
              </div>

              <h1 className="mt-5 text-2xl md:text-4xl font-bold text-gray-900">
                {notice.title}
              </h1>

              <div className="mt-8 space-y-8 text-gray-700">
                <section>
                  <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-3">
                    공지 명단
                  </h2>
                  <div className="overflow-hidden rounded-xl border border-gray-200">
                    <table className="w-full text-sm text-gray-700">
                      <thead className="bg-gray-50 text-gray-600">
                        <tr>
                          <th className="px-4 py-3 text-left font-semibold">No</th>
                          {notice.table_columns.map((header, headerIndex) => (
                            <th
                              key={`${notice.id}-th-${headerIndex}-${header}`}
                              className="px-4 py-3 text-left font-semibold"
                            >
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {notice.table_rows.map((row, rowIndex) => (
                          <tr
                            key={`${notice.id}-tr-${rowIndex}`}
                            className="border-t border-gray-200"
                          >
                            <td className="px-4 py-3 text-gray-400">{rowIndex + 1}</td>
                            {row.map((cell, cellIndex) => (
                              <td
                                key={`${notice.id}-td-${rowIndex}-${cellIndex}`}
                                className="px-4 py-3 whitespace-pre-line"
                              >
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </main>
  );
}

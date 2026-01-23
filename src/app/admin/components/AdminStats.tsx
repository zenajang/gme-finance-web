'use client';

interface BlogPost {
  published: boolean;
  title: string;
}

interface NoticePost {
  pinned: boolean;
  title: string;
}

interface AdminStatsProps {
  activeSection: 'blog' | 'notices';
  posts: BlogPost[];
  notices: NoticePost[];
  t: (key: string) => string;
}

export default function AdminStats({ activeSection, posts, notices, t }: AdminStatsProps) {
  if (activeSection === 'blog') {
    return (
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
    );
  }

  return (
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
  );
}

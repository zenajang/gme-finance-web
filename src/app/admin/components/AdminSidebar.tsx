'use client';

interface AdminSidebarProps {
  activeSection: 'blog' | 'notices' | 'countries' | 'staff';
  setActiveSection: (value: 'blog' | 'notices' | 'countries' | 'staff') => void;
  postsCount: number;
  noticesCount: number;
  countryPostsCount: number;
  staffCount: number;
  t: (key: string, options?: Record<string, unknown>) => string;
}

export default function AdminSidebar({
  activeSection,
  setActiveSection,
  postsCount,
  noticesCount,
  countryPostsCount,
  staffCount,
  t,
}: AdminSidebarProps) {
  return (
    <aside className="lg:w-64 flex-shrink-0">
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 sticky top-24">
        <div className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
          <span>{t('admin.sidebar.content')}</span>
        </div>
        <nav className="mt-2 space-y-1">
          <button
            onClick={() => setActiveSection('blog')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
              activeSection === 'blog'
                ? 'bg-red-50 text-red-700 border border-red-100'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <span className={`w-9 h-9 rounded-lg flex items-center justify-center ${
              activeSection === 'blog' ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-500'
            }`}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </span>
            <div className="text-left">
              <div>{t('admin.sidebar.blog')}</div>
              <div className="text-xs text-gray-400">{t('admin.sidebar.postsCount', { count: postsCount })}</div>
            </div>
          </button>
          <button
            onClick={() => setActiveSection('notices')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
              activeSection === 'notices'
                ? 'bg-blue-50 text-blue-700 border border-blue-100'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <span className={`w-9 h-9 rounded-lg flex items-center justify-center ${
              activeSection === 'notices' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-500'
            }`}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h10M7 16h6m5 5H6a2 2 0 01-2-2V5a2 2 0 012-2h8.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </span>
            <div className="text-left">
              <div>{t('admin.sidebar.notices')}</div>
              <div className="text-xs text-gray-400">{t('admin.sidebar.noticesCount', { count: noticesCount })}</div>
            </div>
          </button>
          <button
            onClick={() => setActiveSection('countries')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
              activeSection === 'countries'
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <span className={`w-9 h-9 rounded-lg flex items-center justify-center ${
              activeSection === 'countries' ? 'bg-emerald-500 text-white' : 'bg-gray-100 text-gray-500'
            }`}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
            <div className="text-left">
              <div>{t('admin.sidebar.countries')}</div>
              <div className="text-xs text-gray-400">{t('admin.sidebar.countryPostsCount', { count: countryPostsCount })}</div>
            </div>
          </button>
          <button
            onClick={() => setActiveSection('staff')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
              activeSection === 'staff'
                ? 'bg-amber-50 text-amber-700 border border-amber-100'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <span className={`w-9 h-9 rounded-lg flex items-center justify-center ${
              activeSection === 'staff' ? 'bg-amber-500 text-white' : 'bg-gray-100 text-gray-500'
            }`}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-1.13a4 4 0 10-4-4 4 4 0 004 4z" />
              </svg>
            </span>
            <div className="text-left">
              <div>{t('admin.sidebar.staff')}</div>
              <div className="text-xs text-gray-400">{t('admin.sidebar.staffCount', { count: staffCount })}</div>
            </div>
          </button>
        </nav>
      </div>
    </aside>
  );
}

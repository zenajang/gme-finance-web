'use client';

import type { CountryPost, CountryKey } from '@/app/admin/types';

const COUNTRY_OPTIONS: { value: CountryKey; label: string; flag: string }[] = [
  { value: 'bangladesh', label: 'Bangladesh', flag: '🇧🇩' },
  { value: 'cambodia', label: 'Cambodia', flag: '🇰🇭' },
  { value: 'india', label: 'India', flag: '🇮🇳' },
  { value: 'indonesia', label: 'Indonesia', flag: '🇮🇩' },
  { value: 'mongolia', label: 'Mongolia', flag: '🇲🇳' },
  { value: 'myanmar', label: 'Myanmar', flag: '🇲🇲' },
  { value: 'nepal', label: 'Nepal', flag: '🇳🇵' },
  { value: 'pakistan', label: 'Pakistan', flag: '🇵🇰' },
  { value: 'philippines', label: 'Philippines', flag: '🇵🇭' },
  { value: 'russia', label: 'Russia', flag: '🇷🇺' },
  { value: 'srilanka', label: 'Sri Lanka', flag: '🇱🇰' },
  { value: 'thailand', label: 'Thailand', flag: '🇹🇭' },
  { value: 'uzbekistan', label: 'Uzbekistan', flag: '🇺🇿' },
  { value: 'vietnam', label: 'Vietnam', flag: '🇻🇳' },
];

interface CountrySectionProps {
  activeCountryTab: 'write' | 'list';
  setActiveCountryTab: (tab: 'write' | 'list') => void;
  isEditMode: boolean;
  resetForm: () => void;
  title: string;
  setTitle: (v: string) => void;
  country: CountryKey;
  setCountry: (v: CountryKey) => void;
  content: string;
  setContent: (v: string) => void;
  saving: boolean;
  handleSave: () => void;
  posts: CountryPost[];
  filterCountry: CountryKey | 'all';
  setFilterCountry: (v: CountryKey | 'all') => void;
  handleEdit: (post: CountryPost) => void;
  handleDelete: (id: string) => void;
  locale: string;
  t: (key: string, options?: Record<string, unknown>) => string;
  Editor: React.ComponentType<{ content: string; onChange: (v: string) => void }>;
}

export default function CountrySection({
  activeCountryTab,
  setActiveCountryTab,
  isEditMode,
  resetForm,
  title,
  setTitle,
  country,
  setCountry,
  content,
  setContent,
  saving,
  handleSave,
  posts,
  filterCountry,
  setFilterCountry,
  handleEdit,
  handleDelete,
  locale,
  t,
  Editor,
}: CountrySectionProps) {
  const filteredPosts = filterCountry === 'all'
    ? posts
    : posts.filter(p => p.country === filterCountry);

  const getCountryLabel = (key: string) =>
    COUNTRY_OPTIONS.find(o => o.value === key)?.label ?? key;
  const getCountryFlag = (key: string) =>
    COUNTRY_OPTIONS.find(o => o.value === key)?.flag ?? '';

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Tabs */}
      <div className="flex items-center border-b border-gray-200 px-6 pt-4 gap-1">
        {(['write', 'list'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveCountryTab(tab)}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
              activeCountryTab === tab
                ? 'text-emerald-700 border-b-2 border-emerald-500 bg-emerald-50/50'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab === 'write' ? t('admin.tabs.write') : `${t('admin.tabs.list')} (${posts.length})`}
          </button>
        ))}
      </div>

      <div className="p-6">
        {activeCountryTab === 'write' ? (
          <div className="space-y-5">
            {/* Edit mode banner */}
            {isEditMode && (
              <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3">
                <span className="text-sm text-emerald-700 font-medium">{t('admin.blog.editingMode')}</span>
                <button
                  onClick={resetForm}
                  className="text-xs text-emerald-600 hover:text-emerald-800 underline"
                >
                  {t('admin.common.cancel')}
                </button>
              </div>
            )}

            {/* Country selector */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('admin.country.selectCountry')}
              </label>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value as CountryKey)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 bg-white"
              >
                {COUNTRY_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.flag} {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('admin.blog.title')}
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={t('admin.blog.titlePlaceholder')}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400"
              />
            </div>

            {/* Editor */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('admin.blog.content')}
              </label>
              <Editor content={content} onChange={setContent} />
            </div>

            {/* Save button */}
            <div className="flex justify-end">
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-sm font-medium rounded-xl transition-colors"
              >
                {saving ? (
                  <>
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    {t('admin.common.saving')}
                  </>
                ) : (
                  isEditMode ? t('admin.notice.update') : t('admin.notice.publish')
                )}
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Country filter */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilterCountry('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                  filterCountry === 'all'
                    ? 'bg-emerald-600 text-white border-emerald-600'
                    : 'border-gray-200 text-gray-600 hover:border-emerald-300'
                }`}
              >
                All ({posts.length})
              </button>
              {COUNTRY_OPTIONS.filter(o => posts.some(p => p.country === o.value)).map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setFilterCountry(opt.value)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                    filterCountry === opt.value
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'border-gray-200 text-gray-600 hover:border-emerald-300'
                  }`}
                >
                  {opt.flag} {opt.label} ({posts.filter(p => p.country === opt.value).length})
                </button>
              ))}
            </div>

            {/* Posts list */}
            {filteredPosts.length === 0 ? (
              <div className="text-center py-16 text-gray-400 text-sm">
                {t('admin.country.noPosts')}
              </div>
            ) : (
              <div className="space-y-3">
                {filteredPosts.map((post) => (
                  <div
                    key={post.id}
                    className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:border-emerald-200 hover:bg-emerald-50/30 transition-colors group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="text-2xl">{getCountryFlag(post.country)}</span>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{post.title}</p>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {getCountryLabel(post.country)} · {new Date(post.created_at).toLocaleDateString(locale)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleEdit(post)}
                        className="px-3 py-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg border border-emerald-200 transition-colors"
                      >
                        {t('admin.common.edit')}
                      </button>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg border border-red-200 transition-colors"
                      >
                        {t('admin.common.delete')}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

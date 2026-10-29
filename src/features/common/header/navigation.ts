// 헤더 · 모바일 메뉴 공통 메뉴. href 가 없는 Countries 는 나라 목록 드롭다운을 연다
// 문구는 header.<key>
export const NAV_ITEMS: { key: string; href?: string }[] = [
  { key: 'home', href: '/' },
  { key: 'blog', href: '/about/blog' },
  { key: 'careers', href: '/careers' },
  { key: 'countries' },
  { key: 'notices', href: '/notices' },
];

// 홈은 정확히 일치, 나머지는 하위 경로까지 현재 페이지로 본다
export const isCurrentPath = (pathname: string, href: string) =>
  href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);

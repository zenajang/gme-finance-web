import type { Country } from '@/constants/countries';

// 나라 페이지 주소. 이름을 소문자로 바꾸고 공백을 뺀다 (Sri Lanka → /srilanka)
export const getCountryPath = ({ name }: Country) => `/${name.toLowerCase().replace(/\s+/g, '')}`;

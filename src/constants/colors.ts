// 공통 색상 (전역에서 사용)
export const COMMON_COLORS = {
  primary: '#DF2121',
  primaryHover: '#e98c8cff',
  primaryText: '#EF4444',
  primaryLight: '#faeaeaff',
  white: '#FFFFFF',
  black: '#000000',
  grayDark: '#1F2937',
  grayLight: '#F2F2F2',
  navyDark: '#1a1a2e',
  gradientOrange: '#FF7645',
  gradientRedDeep: '#CF080B',
  accentRed1: 'rgba(247, 92, 86, 1)',
  accentRed2: '#EC3322',
  accentRed3: '#f37974ff',
} as const;

export type ColorScheme = {
  primary: string;
  hover: string;
  introHover?: string;
  title?: string;
  subtitle?: string;
  gradient1: string;
  gradient2?: string;
  gradient3?: string;
  gradient4?: string;
  gradient5?: string;
};

export const COUNTRY_COLORS: Record<string, ColorScheme> = {
  bangladesh: {
    primary: '#0E7700',
    hover: '#abc2a8ff',
    introHover: '#d1f1ccff',
    gradient1: '#FFFFFF',
    gradient2: '#F7FDDF',
    gradient3: '#FFFFEE',
  },

  myanmar: {
    primary: '#FF8000',
    hover: '#f5b372ff',
    subtitle: '#FF8000',
    gradient1: '#FFFFFF',
    gradient2: '#FFF0DB',
  },

  thailand: {
    primary: '#DF2121',
    hover: '#e98c8cff',
    title: '#FFFFFF',
    subtitle: '#DF2121',
    gradient1: '#003983',
    gradient2: '#030947',
  },

  uzbekistan: {
    primary: '#0094AE',
    hover: '#bacfd3ff',
    introHover: '#F3FCFF',
    subtitle: '#0094AE',
    gradient1: '#F3FCFF',
  },

  pakistan: {
    primary: '#006E14',
    hover: '#8fad95ff',
    introHover: '#eaf3ecff',
    subtitle: '#006E14',
    gradient1: '#F8FFEA',
    gradient2: '#FFFFFF',
  },

  philippines: {
    primary: '#EA0C1E',
    hover: '#FF6B78',
    gradient1: '#FEF7DB',
    gradient2: '#FAE5EB',
    gradient3: '#FCFEFE',
    gradient4: '#DBECF4',
  },

  china: {
    primary: '#DF2121',
    hover: '#e98c8cff',
    gradient1: '#FFF4DF',
    gradient2: '#FFFCF5',
    gradient3: '#FFFCE9',
    gradient4: '#FFF4F0',
  },

  cambodia: {
    primary: '#DF2121',
    hover: '#e98c8cff',
    gradient1: '#FFF0F0',
    gradient2: '#F3F9FF',
  },

  india: {
    primary: '#0E7700',
    hover: '#abc2a8ff',
    gradient1: '#FFD5B1',
    gradient2: '#FFFFFF',
    gradient3: '#D8EDB7',
  },

  vietnam: {
    primary: '#DF2121',
    hover: '#e98c8cff',
    gradient1: '#FFFCE9',
    gradient2: '#FFF4F0',
  },

  indonesia: {
    primary: '#DF2121',
    hover: '#e98c8cff',
    gradient1: '#FFE6D8',
    gradient2: '#FFC8C8',
    gradient3: '#FFF3F3',
    gradient4: '#FFF8F5',
    gradient5: '#FFEBEB',
  },

  mongolia: {
    primary: '#DF2121',
    hover: '#e98c8cff',
    gradient1: '#F8F4E7',
    gradient2: '#FFF1C3',
  },

  nepal: {
    primary: '#DF2121',
    hover: '#e98c8cff',
    gradient1: '#FFF4C7',
    gradient2: '#FFFFFF',
  },

  srilanka: {
    primary: '#DF2121',
    hover: '#e98c8cff',
    gradient1: '#FFFAE9',
    gradient2: '#FFCB21',
  },

  russia: {
    primary: '#DF2121',
    hover: '#e98c8cff',
    gradient1: '#E3F2FF',
    gradient2: '#FFFFFF',
  },
};

export const getGradient = (countryCode: string, type: 'section' | 'emi' = 'section'): string => {
  const colors = COUNTRY_COLORS[countryCode];
  if (!colors) return 'linear-gradient(to bottom, #FFFFFF, #FFFFFF)';

  const gradients: string[] = [colors.gradient1];
  if (colors.gradient2) gradients.push(colors.gradient2);
  if (colors.gradient3) gradients.push(colors.gradient3);
  if (colors.gradient4) gradients.push(colors.gradient4);
  if (colors.gradient5) gradients.push(colors.gradient5);

  return `linear-gradient(to bottom, ${gradients.join(', ')})`;
};

export const getColorScheme = (countryCode: string): ColorScheme => {
  return COUNTRY_COLORS[countryCode] || COUNTRY_COLORS.philippines;
};

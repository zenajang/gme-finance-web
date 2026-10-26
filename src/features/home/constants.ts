export const APPLY_LOAN_URL = 'https://gme.channel.io';

// 신청 가능 비자 (D · E · F · G · H 순)
export const VISA_CODES = [
  'D-2',
  'E-1',
  'E-2',
  'E-3',
  'E-7',
  'E-9',
  'E-10',
  'F-2',
  'F-4',
  'F-5',
  'F-6',
  'G-1',
  'H-2',
] as const;

// 대출 상품 정보 표 (README 확정값)
export const LOAN_TERMS = [
  { label: 'Registration information', value: 'Registration No. 2019-금감원-1801' },
  { label: 'Interest rate', value: 'Up to 20% per annum' },
  { label: 'Interest calculation', value: 'Interest is charged monthly on the agreed date.' },
  {
    label: 'Repayment method',
    value:
      'Repayment amounts may vary depending on the loan terms and repayment method stated in the individual loan agreement.',
  },
  {
    label: 'Overdue interest rate',
    value:
      'Loan rate + up to 3% per annum, within the legal maximum rate of 20% per annum. Applicable only to contracts renewed from July 7, 2021.',
  },
  { label: 'Related costs', value: 'No additional fees or early repayment penalties.' },
  { label: 'Loan period', value: '3–60 months' },
  {
    label: 'Registration verification',
    value: 'Financial Supervisory Service (registration check) · 02-3145-5114',
  },
] as const;

// 실적 카드. 아이콘 SVG 는 StatsStrip 에서 icon 키로 매핑한다.
export const STATS = [
  { icon: 'globe', value: '14+', label: 'Countries Served' },
  { icon: 'chart', value: '₩600B+', label: 'Loan Released' },
  { icon: 'trophy', value: '1M+', label: 'Successful Loan Cases' },
  { icon: 'headset', value: '24/7', label: 'Customer Support' },
] as const;

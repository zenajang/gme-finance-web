const MASKED_CATEGORY = 'loss_of_benefit';
const NAME_HEADER_KEYWORDS = ['이름'];
const BIRTH_DATE_HEADER_KEYWORDS = ['생년월일'];
const BIRTH_DATE_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;

const maskName = (name: string): string => {
  const trimmed = name.trim();
  if (!trimmed) return trimmed;

  const visibleLength = Math.ceil(trimmed.length / 2);
  const visible = trimmed.slice(0, visibleLength);
  const masked = '*'.repeat(trimmed.length - visibleLength);

  return `${visible}${masked}`;
};

const maskBirthDate = (value: string): string => {
  const trimmed = value.trim();
  const match = trimmed.match(BIRTH_DATE_PATTERN);
  if (!match) return value;

  const [, year, month] = match;
  return `${year}-${month}-**`;
};

const isNameColumn = (header: string): boolean => {
  return NAME_HEADER_KEYWORDS.some((keyword) => header.includes(keyword));
};

const isBirthDateColumn = (header: string): boolean => {
  return BIRTH_DATE_HEADER_KEYWORDS.some((keyword) => header.includes(keyword));
};

export const maskNoticeCell = (header: string, value: string, category?: string | null): string => {
  if (category !== MASKED_CATEGORY) return value;
  if (isNameColumn(header)) return maskName(value);
  if (isBirthDateColumn(header)) return maskBirthDate(value);
  return value;
};

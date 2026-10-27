import type { ReactNode } from 'react';
import { Container } from '@/features/home/atoms';

interface SectionProps {
  id?: string;
  tone: 'white' | 'gray';
  // 섹션마다 위아래 여백이 다른 경우 덮어쓴다
  paddingClassName?: string;
  children: ReactNode;
}

// 배경 이미지 위에 섹션마다 반투명 막을 번갈아 덮는다 (시안 기준)
const TONE_CLASS = {
  white: 'before:bg-[rgba(255,255,255,.72)]',
  gray: 'before:bg-[rgba(246,247,249,.76)]',
} as const;

const Section = ({
  id,
  tone,
  paddingClassName = 'py-22 max-lg:py-17',
  children,
}: SectionProps) => {
  return (
    <section
      id={id}
      className={`relative before:pointer-events-none before:absolute before:inset-0 ${paddingClassName} ${TONE_CLASS[tone]}`}
    >
      <Container className="relative">{children}</Container>
    </section>
  );
};

export default Section;

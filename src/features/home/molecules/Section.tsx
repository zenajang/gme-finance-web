import type { ReactNode } from 'react';
import Container from '@/features/home/atoms/Container';

interface SectionProps {
  id: string;
  tone: 'white' | 'gray';
  children: ReactNode;
}

// 배경 이미지 위에 섹션마다 반투명 막을 번갈아 덮는다 (시안 기준)
const TONE_CLASS = {
  white: 'before:bg-[rgba(255,255,255,.72)]',
  gray: 'before:bg-[rgba(246,247,249,.76)]',
} as const;

export default function Section({ id, tone, children }: SectionProps) {
  return (
    <section
      id={id}
      className={`relative py-22 before:pointer-events-none before:absolute before:inset-0 max-lg:py-17 ${TONE_CLASS[tone]}`}
    >
      <Container className="relative">{children}</Container>
    </section>
  );
}

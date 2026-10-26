import Container from '@/features/home/atoms/Container';
import StatItem from '@/features/home/molecules/StatItem';

const STATS = [
  {
    value: '14+',
    label: 'Countries Served',
    icon: (
      <svg viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="8" />
        <path d="M4 12h16M12 4c2.3 2.2 3.5 4.9 3.5 8S14.3 17.8 12 20M12 4C9.7 6.2 8.5 8.9 8.5 12S9.7 17.8 12 20" />
      </svg>
    ),
  },
  {
    value: '₩600B+',
    label: 'Loan Released',
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M5 19V13M10 19V9M15 19V6M20 19V3" />
        <path d="M4 10l5-4 4 2 7-5" />
      </svg>
    ),
  },
  {
    value: '1M+',
    label: 'Successful Loan Cases',
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M8 4h8v4c0 3-1.8 5-4 5s-4-2-4-5V4Z" />
        <path d="M8 6H5c0 3 1 5 4 5M16 6h3c0 3-1 5-4 5M12 13v4M8 20h8M10 17h4" />
      </svg>
    ),
  },
  {
    value: '24/7',
    label: 'Customer Support',
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M4 13v-1a8 8 0 0 1 16 0v1" />
        <path d="M4 13h3v6H5a1 1 0 0 1-1-1v-5ZM20 13h-3v6h2a1 1 0 0 0 1-1v-5Z" />
      </svg>
    ),
  },
];

const StatsStrip = () => {
  return (
    <section aria-label="GME Finance highlights" className="bg-white py-3.5">
      <Container className="grid grid-cols-4 gap-2.5 max-lg:grid-cols-2 max-lg:gap-2">
        {STATS.map(({ value, label, icon }) => (
          <StatItem key={label} icon={icon} value={value} label={label} />
        ))}
      </Container>
    </section>
  );
};

export default StatsStrip;

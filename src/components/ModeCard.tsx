import Link from 'next/link';
import type { GameMode } from '@/lib/types';

interface ModeCardProps {
  mode: GameMode;
  href: string;
  disabled?: boolean;
}

const MODE_CONFIG: Record<GameMode, { icon: string; name: string; description: string; color: string; glow: string }> = {
  flashcard: {
    icon: '🃏',
    name: 'Flashcard',
    description: 'Học từ vựng theo thẻ, lật mặt xem nghĩa',
    color: 'rgba(139,92,246,0.15)',
    glow: 'rgba(139,92,246,0.4)',
  },
  sentence: {
    icon: '🧩',
    name: 'Sắp xếp câu',
    description: 'Xếp các từ thành câu tiếng Anh đúng',
    color: 'rgba(99,102,241,0.15)',
    glow: 'rgba(99,102,241,0.4)',
  },
  'type-en': {
    icon: '⌨️',
    name: 'Gõ tiếng Anh',
    description: 'Đọc nghĩa tiếng Việt, gõ từ tiếng Anh',
    color: 'rgba(16,185,129,0.15)',
    glow: 'rgba(16,185,129,0.4)',
  },
  'type-vi': {
    icon: '🇻🇳',
    name: 'Gõ tiếng Việt',
    description: 'Đọc từ tiếng Anh, gõ nghĩa tiếng Việt',
    color: 'rgba(245,158,11,0.15)',
    glow: 'rgba(245,158,11,0.4)',
  },
};

export default function ModeCard({ mode, href, disabled }: ModeCardProps) {
  const cfg = MODE_CONFIG[mode];

  const inner = (
    <div
      style={{
        padding: '24px 20px',
        borderRadius: 'var(--radius-lg)',
        background: cfg.color,
        border: '1px solid var(--border-subtle)',
        minHeight: '130px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        transition: 'all var(--transition-base)',
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-3px)';
          (e.currentTarget as HTMLDivElement).style.boxShadow = `0 8px 30px ${cfg.glow}`;
          (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border-default)';
        }
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
        (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
        (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border-subtle)';
      }}
    >
      <span style={{ fontSize: '2rem', lineHeight: 1 }}>{cfg.icon}</span>
      <div>
        <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '4px' }}>
          {cfg.name}
        </div>
        <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
          {cfg.description}
        </div>
      </div>
    </div>
  );

  if (disabled) return inner;

  return (
    <Link href={href} style={{ textDecoration: 'none', display: 'block' }}>
      {inner}
    </Link>
  );
}

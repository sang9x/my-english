import Navigation from '@/components/Navigation';
import TypingEnGame from '@/components/TypingEnGame';
import Link from 'next/link';
import { TOPICS, WORDS } from '@/lib/data';

export default async function TypeEnPage({ params }: { params: Promise<{ topicId: string }> }) {
  const { topicId } = await params;
  let words = WORDS[topicId] ?? null;
  const topic = TOPICS.find((t) => t.id === topicId);
  if (!words) {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'}/api/topics/${topicId}/words`, { cache: 'no-store' });
      if (res.ok) { const d = await res.json(); words = d.words ?? []; }
    } catch { words = []; }
  }
  return (
    <div className="page-wrapper" style={{ minHeight: '100dvh' }}>
      <Navigation />
      <div className="container-app" style={{ paddingTop: '32px', paddingBottom: '80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
          <Link href={`/topic/${topicId}`} style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }}>← {topic?.name ?? topicId}</Link>
          <h1 style={{ fontWeight: 700, fontSize: '1.25rem', color: 'var(--text-primary)', margin: 0 }}>⌨️ Gõ tiếng Anh</h1>
        </div>
        {words && words.length >= 1 ? (
          <TypingEnGame words={words} topicId={topicId} />
        ) : (
          <p style={{ color: 'var(--text-secondary)', textAlign: 'center' }}>Chưa có từ vựng.</p>
        )}
      </div>
    </div>
  );
}

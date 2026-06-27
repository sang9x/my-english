import Navigation from '@/components/Navigation';
import FlashcardGame from '@/components/FlashcardGame';
import Link from 'next/link';
import { TOPICS, WORDS } from '@/lib/data';

export default async function FlashcardPage({
  params,
}: {
  params: Promise<{ topicId: string }>;
}) {
  const { topicId } = await params;

  // System topic
  let words = WORDS[topicId] ?? null;
  const topic = TOPICS.find((t) => t.id === topicId);

  // Custom topic from API
  if (!words) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'}/api/topics/${topicId}/words`,
        { cache: 'no-store' }
      );
      if (res.ok) {
        const data = await res.json();
        words = data.words ?? [];
      }
    } catch {
      words = [];
    }
  }

  const topicName = topic?.name ?? topicId;

  return (
    <div className="page-wrapper" style={{ minHeight: '100dvh' }}>
      <Navigation />
      <div className="container-app" style={{ paddingTop: '32px', paddingBottom: '80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px', flexWrap: 'wrap' }}>
          <Link href={`/topic/${topicId}`} style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }}>
            ← {topicName}
          </Link>
          <h1 style={{ fontWeight: 700, fontSize: '1.25rem', color: 'var(--text-primary)', margin: 0 }}>
            🃏 Flashcard
          </h1>
        </div>

        {words && words.length >= 1 ? (
          <FlashcardGame words={words} topicId={topicId} />
        ) : (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <p style={{ color: 'var(--text-secondary)' }}>Chủ đề này chưa có từ vựng.</p>
            <Link href={`/my-topics/${topicId}`} className="btn btn-primary" style={{ textDecoration: 'none', marginTop: '16px', display: 'inline-block' }}>
              Thêm từ vựng
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

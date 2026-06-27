import Navigation from '@/components/Navigation';
import SentenceGame from '@/components/SentenceGame';
import Link from 'next/link';
import { TOPICS, SENTENCES, WORDS } from '@/lib/data';
import type { Sentence, Word } from '@/lib/types';

function wordsToSentences(words: Word[]): Sentence[] {
  return words
    .filter((w) => w.example)
    .map((w) => ({
      english: w.example!,
      vietnamese: w.exampleVi ?? w.example!,
      words: w.example!.split(' '),
    }));
}


export default async function SentencePage({ params }: { params: Promise<{ topicId: string }> }) {
  const { topicId } = await params;
  const topic = TOPICS.find((t) => t.id === topicId);

  let sentences: Sentence[] = SENTENCES[topicId] ?? [];

  if (sentences.length === 0) {
    // Custom topic: build from word examples
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'}/api/topics/${topicId}/words`, { cache: 'no-store' });
      if (res.ok) {
        const d = await res.json();
        sentences = wordsToSentences(d.words ?? []);
      }
    } catch { sentences = []; }
  }

  return (
    <div className="page-wrapper" style={{ minHeight: '100dvh' }}>
      <Navigation />
      <div className="container-app" style={{ paddingTop: '32px', paddingBottom: '80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
          <Link href={`/topic/${topicId}`} style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }}>← {topic?.name ?? topicId}</Link>
          <h1 style={{ fontWeight: 700, fontSize: '1.25rem', color: 'var(--text-primary)', margin: 0 }}>🧩 Sắp xếp câu</h1>
        </div>
        {sentences.length >= 1 ? (
          <SentenceGame sentences={sentences} topicId={topicId} />
        ) : (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <p style={{ color: 'var(--text-secondary)' }}>Chủ đề này chưa có câu ví dụ để chơi.</p>
          </div>
        )}
      </div>
    </div>
  );
}

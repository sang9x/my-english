import Navigation from '@/components/Navigation';
import ModeCard from '@/components/ModeCard';
import Link from 'next/link';
import { TOPICS, WORDS } from '@/lib/data';
import type { GameMode } from '@/lib/types';

const GAME_MODES: GameMode[] = ['flashcard', 'sentence', 'type-en', 'type-vi'];

export default async function TopicPage({
  params,
}: {
  params: Promise<{ topicId: string }>;
}) {
  const { topicId } = await params;

  // Try system topics first
  let topic = TOPICS.find((t) => t.id === topicId) ?? null;
  let wordCount = topic ? WORDS[topicId]?.length ?? topic.wordCount : 0;

  // Try custom topic from API if not found
  if (!topic) {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'}/api/topics/${topicId}`, {
        cache: 'no-store',
      });
      if (res.ok) {
        const data = await res.json();
        topic = data.topic;
        wordCount = data.topic?.wordCount ?? 0;
      }
    } catch {
      // fallthrough
    }
  }

  if (!topic) {
    return (
      <div className="page-wrapper" style={{ minHeight: '100dvh' }}>
        <Navigation />
        <div className="container-app" style={{ padding: '80px 16px', textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '16px' }}>😕</div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
            Không tìm thấy chủ đề
          </h1>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
            Chủ đề này không tồn tại hoặc đã bị xóa.
          </p>
          <Link href="/" className="btn btn-primary" style={{ textDecoration: 'none' }}>
            ← Về trang chủ
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper" style={{ minHeight: '100dvh' }}>
      <Navigation />

      <div className="container-app" style={{ paddingTop: '48px', paddingBottom: '80px' }}>
        {/* Back */}
        <Link
          href="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            color: 'var(--text-secondary)',
            fontSize: '0.9rem',
            textDecoration: 'none',
            marginBottom: '32px',
          }}
        >
          ← Quay lại
        </Link>

        {/* Topic header */}
        <div
          className="card animate-slide-up"
          style={{ padding: '32px', marginBottom: '40px', textAlign: 'center' }}
        >
          <div style={{ fontSize: '4rem', marginBottom: '12px', lineHeight: 1 }}>{topic.emoji}</div>
          <h1 style={{ fontSize: '1.875rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>
            {topic.name}
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginBottom: '16px' }}>
            {topic.description}
          </p>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: 'var(--radius-full)',
              background: 'rgba(139,92,246,0.1)',
              color: 'var(--brand-violet-light)',
              fontSize: '0.875rem',
              fontWeight: 600,
              border: '1px solid rgba(139,92,246,0.2)',
            }}
          >
            📝 {wordCount} từ vựng
          </span>
        </div>

        {/* Mode selection */}
        <div style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '16px' }}>
            🎮 Chọn chế độ học
          </h2>
          <div
            className="stagger-children"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: '16px',
            }}
          >
            {GAME_MODES.map((mode) => (
              <div key={mode} className="animate-slide-up">
                <ModeCard
                  mode={mode}
                  href={`/topic/${topicId}/${mode}`}
                  disabled={wordCount < 3}
                />
              </div>
            ))}
          </div>
          {wordCount < 3 && (
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginTop: '12px', textAlign: 'center' }}>
              ⚠️ Cần ít nhất 3 từ để chơi game. Hãy thêm từ vào chủ đề này trước.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

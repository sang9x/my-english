import Navigation from '@/components/Navigation';
import CloneTopicButton from '@/components/CloneTopicButton';

interface WordRow {
  id: string;
  english: string;
  vietnamese: string[];
  ipa?: string;
}

interface ShareTopic {
  id: string;
  name: string;
  description: string;
  emoji: string;
  shareCode: string;
}

export default async function SharePage({ params }: { params: Promise<{ shareCode: string }> }) {
  const { shareCode } = await params;

  let topic: ShareTopic | null = null;
  let words: WordRow[] = [];

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'}/api/share/${shareCode.toUpperCase()}`, { cache: 'no-store' });
    if (res.ok) {
      const d = await res.json();
      topic = d.topic;
      words = d.words ?? [];
    }
  } catch { /* ignore */ }

  if (!topic) {
    return (
      <div className="page-wrapper" style={{ minHeight: '100dvh' }}>
        <Navigation />
        <div className="container-app" style={{ paddingTop: '80px', textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '16px' }}>😕</div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>Không tìm thấy</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Chủ đề này không tồn tại hoặc đã bị xóa.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper" style={{ minHeight: '100dvh' }}>
      <Navigation />
      <div className="container-app" style={{ paddingTop: '40px', paddingBottom: '80px' }}>
        {/* Topic preview */}
        <div className="card animate-slide-up" style={{ padding: '32px', marginBottom: '24px', textAlign: 'center' }}>
          <div style={{ fontSize: '3.5rem', marginBottom: '12px' }}>{topic.emoji}</div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>{topic.name}</h1>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>{topic.description || 'Bộ từ vựng tùy chỉnh'}</p>
          <span style={{ display: 'inline-block', padding: '6px 16px', borderRadius: 'var(--radius-full)', background: 'rgba(139,92,246,0.1)', color: 'var(--brand-violet-light)', fontWeight: 600, fontSize: '0.875rem', border: '1px solid rgba(139,92,246,0.2)', marginBottom: '24px' }}>
            📝 {words.length} từ vựng
          </span>
          <div>
            <CloneTopicButton shareCode={shareCode} />
          </div>
        </div>

        {/* Word preview */}
        {words.length > 0 && (
          <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-subtle)' }}>
              <h2 style={{ fontWeight: 700, fontSize: '1.0625rem', color: 'var(--text-primary)' }}>
                📖 Danh sách từ vựng
              </h2>
            </div>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Từ tiếng Anh</th>
                  <th>Nghĩa</th>
                  <th>IPA</th>
                </tr>
              </thead>
              <tbody>
                {words.map((w) => (
                  <tr key={w.id}>
                    <td style={{ fontWeight: 600 }}>{w.english}</td>
                    <td style={{ color: 'var(--text-secondary)' }}>{w.vietnamese.join(' / ')}</td>
                    <td><span className="ipa-text">{w.ipa || '—'}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

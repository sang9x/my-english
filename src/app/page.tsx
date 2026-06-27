import Navigation from '@/components/Navigation';
import TopicCard from '@/components/TopicCard';
import CustomTopicsSection from '@/components/CustomTopicsSection';
import { TOPICS } from '@/lib/data';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="page-wrapper" style={{ minHeight: '100dvh' }}>
      <Navigation />

      {/* Hero */}
      <section
        style={{
          padding: '80px 0 60px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div className="container-app">
          <div
            className="animate-slide-up"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 16px',
              borderRadius: 'var(--radius-full)',
              background: 'rgba(139,92,246,0.12)',
              border: '1px solid rgba(139,92,246,0.25)',
              fontSize: '0.875rem',
              color: 'var(--brand-violet-light)',
              fontWeight: 600,
              marginBottom: '24px',
            }}
          >
            ✨ Học từ vựng qua trò chơi tương tác
          </div>

          <h1 className="text-hero animate-slide-up" style={{ animationDelay: '80ms', marginBottom: '16px' }}>
            Học Tiếng Anh{' '}
            <span className="text-gradient">Thú Vị</span>
          </h1>

          <p
            className="animate-slide-up"
            style={{
              animationDelay: '160ms',
              fontSize: '1.125rem',
              color: 'var(--text-secondary)',
              maxWidth: '560px',
              margin: '0 auto 36px',
              lineHeight: 1.7,
            }}
          >
            Làm chủ từ vựng tiếng Anh qua Flashcard, Game Sắp xếp câu và Gõ từ.
            Tự tạo bộ từ vựng và chia sẻ với bạn bè.
          </p>

          <div
            className="animate-slide-up"
            style={{ animationDelay: '240ms', display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}
          >
            <Link href="#topics" className="btn btn-primary btn-lg" style={{ textDecoration: 'none' }}>
              🚀 Bắt đầu học ngay
            </Link>
            <Link href="/my-topics/new" className="btn btn-secondary btn-lg" style={{ textDecoration: 'none' }}>
              + Tạo bộ từ của tôi
            </Link>
          </div>
        </div>

        {/* Decorative orbs */}
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '600px',
            height: '400px',
            background: 'radial-gradient(ellipse, rgba(139,92,246,0.15) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
      </section>

      {/* System Topics */}
      <section id="topics" style={{ padding: '0 0 60px' }}>
        <div className="container-app">
          <div style={{ marginBottom: '28px' }}>
            <h2
              style={{
                fontSize: '1.375rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                marginBottom: '6px',
              }}
            >
              📚 Chủ đề học tập
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem' }}>
              5 chủ đề từ vựng được tuyển chọn kỹ lưỡng
            </p>
          </div>

          <div
            className="stagger-children"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: '16px',
            }}
          >
            {TOPICS.map((topic) => (
              <div key={topic.id} className="animate-slide-up">
                <TopicCard topic={topic} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Topics */}
      <section style={{ padding: '0 0 80px' }}>
        <div className="container-app">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '24px',
              flexWrap: 'wrap',
              gap: '12px',
            }}
          >
            <div>
              <h2
                style={{
                  fontSize: '1.375rem',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  marginBottom: '4px',
                }}
              >
                🗂️ Chủ đề của tôi
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem' }}>
                Bộ từ vựng do bạn tự tạo
              </p>
            </div>
            <Link href="/my-topics" className="btn btn-ghost btn-sm" style={{ textDecoration: 'none' }}>
              Quản lý →
            </Link>
          </div>

          <CustomTopicsSection />
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          borderTop: '1px solid var(--border-subtle)',
          padding: '24px 0',
          textAlign: 'center',
          color: 'var(--text-muted)',
          fontSize: '0.875rem',
        }}
      >
        <div className="container-app">
          Made with ❤️ · MyEnglish — Học từ vựng tiếng Anh mỗi ngày
        </div>
      </footer>
    </div>
  );
}

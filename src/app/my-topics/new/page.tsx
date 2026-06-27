'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navigation from '@/components/Navigation';

const EMOJI_OPTIONS = ['📚', '✈️', '💼', '👨‍👩‍👧', '💻', '📊', '🎓', '🌍', '🏋️', '🍕', '🎵', '🏠', '💡', '🔬', '🎨', '⚽', '🌿', '🛒', '💊', '📰'];

export default function NewTopicPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [emoji, setEmoji] = useState('📚');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) { setError('Tên chủ đề không được để trống'); return; }
    setLoading(true); setError('');
    try {
      const res = await fetch('/api/topics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), description: description.trim(), emoji }),
      });
      if (res.ok) {
        const data = await res.json();
        router.push(`/my-topics/${data.topic.id}`);
      } else {
        const d = await res.json();
        setError(d.error ?? 'Có lỗi xảy ra');
      }
    } catch {
      setError('Không thể kết nối máy chủ');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper" style={{ minHeight: '100dvh' }}>
      <Navigation />
      <div className="container-app" style={{ paddingTop: '40px', paddingBottom: '80px', maxWidth: '560px' }}>
        <Link href="/my-topics" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem', display: 'block', marginBottom: '24px' }}>
          ← Quay lại
        </Link>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '32px' }}>
          ✨ Tạo chủ đề mới
        </h1>

        <form onSubmit={submit} className="card" style={{ padding: '28px' }}>
          {/* Emoji */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '10px', fontSize: '0.9375rem' }}>
              Biểu tượng
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {EMOJI_OPTIONS.map((e) => (
                <button
                  type="button"
                  key={e}
                  onClick={() => setEmoji(e)}
                  style={{
                    width: '44px', height: '44px', fontSize: '1.5rem',
                    border: `2px solid ${emoji === e ? 'var(--brand-violet)' : 'var(--border-subtle)'}`,
                    borderRadius: 'var(--radius-md)', background: emoji === e ? 'rgba(139,92,246,0.1)' : 'var(--bg-elevated)',
                    cursor: 'pointer', transition: 'all var(--transition-fast)',
                  }}
                >
                  {e}
                </button>
              ))}
            </div>
          </div>

          {/* Name */}
          <div style={{ marginBottom: '16px' }}>
            <label htmlFor="topic-name" style={{ display: 'block', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px', fontSize: '0.9375rem' }}>
              Tên chủ đề <span style={{ color: 'var(--error)' }}>*</span>
            </label>
            <input
              id="topic-name"
              className="input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="VD: Từ vựng IELTS Band 7"
              maxLength={100}
            />
          </div>

          {/* Description */}
          <div style={{ marginBottom: '24px' }}>
            <label htmlFor="topic-desc" style={{ display: 'block', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px', fontSize: '0.9375rem' }}>
              Mô tả
            </label>
            <textarea
              id="topic-desc"
              className="textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Mô tả ngắn về bộ từ vựng này..."
              rows={3}
            />
          </div>

          {error && (
            <p style={{ color: 'var(--error)', fontSize: '0.875rem', marginBottom: '16px' }}>❌ {error}</p>
          )}

          <div style={{ display: 'flex', gap: '10px' }}>
            <button type="submit" className="btn btn-primary btn-lg" disabled={loading} style={{ flex: 1 }}>
              {loading ? '⏳ Đang tạo...' : '✨ Tạo chủ đề'}
            </button>
            <Link href="/my-topics" className="btn btn-secondary btn-lg" style={{ textDecoration: 'none' }}>Hủy</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

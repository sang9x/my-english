'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import type { CustomTopic } from '@/lib/types';

export default function MyTopicsPage() {
  const [topics, setTopics] = useState<CustomTopic[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/topics')
      .then((r) => r.ok ? r.json() : { topics: [] })
      .then((d) => setTopics(d.topics ?? []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="page-wrapper" style={{ minHeight: '100dvh' }}>
      <Navigation />
      <div className="container-app" style={{ paddingTop: '40px', paddingBottom: '80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px', flexWrap: 'wrap', gap: '12px' }}>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            🗂️ Chủ đề của tôi
          </h1>
          <Link href="/my-topics/new" className="btn btn-primary" style={{ textDecoration: 'none' }}>
            + Tạo chủ đề mới
          </Link>
        </div>

        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px' }}>
            {[1, 2, 3].map((i) => <div key={i} className="shimmer" style={{ height: '180px', borderRadius: 'var(--radius-lg)' }} />)}
          </div>
        ) : topics.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 24px', border: '2px dashed var(--border-default)', borderRadius: 'var(--radius-xl)', background: 'var(--glass-bg)' }}>
            <div style={{ fontSize: '3.5rem', marginBottom: '16px' }}>📚</div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>Chưa có chủ đề nào</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', maxWidth: '360px', margin: '0 auto 24px' }}>
              Tạo bộ từ vựng riêng của bạn và bắt đầu học ngay hôm nay!
            </p>
            <Link href="/my-topics/new" className="btn btn-primary btn-lg" style={{ textDecoration: 'none' }}>
              + Tạo chủ đề đầu tiên
            </Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px' }}>
            {topics.map((t) => (
              <div key={t.id} className="card card-hover" style={{ padding: '20px', position: 'relative' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>{t.emoji}</div>
                <h3 style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '4px' }}>{t.name}</h3>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: '12px', minHeight: '2.4em' }}>{t.description || 'Chưa có mô tả'}</p>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '14px' }}>
                  {(t as CustomTopic & { wordCount?: number }).wordCount ?? 0} từ · Mã: {t.shareCode}
                </p>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <Link href={`/topic/${t.id}`} className="btn btn-primary btn-sm" style={{ textDecoration: 'none', flex: 1, justifyContent: 'center' }}>
                    Học
                  </Link>
                  <Link href={`/my-topics/${t.id}`} className="btn btn-secondary btn-sm" style={{ textDecoration: 'none', flex: 1, justifyContent: 'center' }}>
                    Quản lý
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

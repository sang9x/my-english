'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import TopicCard from '@/components/TopicCard';
import type { CustomTopic } from '@/lib/types';

export default function CustomTopicsSection() {
  const [topics, setTopics] = useState<CustomTopic[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/topics')
      .then((r) => r.ok ? r.json() : { topics: [] })
      .then((d) => setTopics(d.topics ?? []))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px' }}>
        {[1, 2, 3].map((i) => (
          <div key={i} className="skeleton shimmer" style={{ height: '170px', borderRadius: 'var(--radius-lg)' }} />
        ))}
      </div>
    );
  }

  if (topics.length === 0) {
    return (
      <div
        style={{
          textAlign: 'center',
          padding: '48px 24px',
          borderRadius: 'var(--radius-xl)',
          border: '2px dashed var(--border-default)',
          background: 'var(--glass-bg)',
        }}
      >
        <div style={{ fontSize: '3rem', marginBottom: '12px' }}>📚</div>
        <h3 style={{ fontWeight: 700, fontSize: '1.125rem', color: 'var(--text-primary)', marginBottom: '8px' }}>
          Chưa có chủ đề tùy chỉnh
        </h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', marginBottom: '20px' }}>
          Tạo bộ từ vựng riêng của bạn và chia sẻ với bạn bè!
        </p>
        <Link href="/my-topics/new" className="btn btn-primary" style={{ textDecoration: 'none' }}>
          + Tạo chủ đề đầu tiên
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px', marginBottom: '20px' }}>
        {topics.slice(0, 6).map((t) => (
          <TopicCard key={t.id} topic={t} />
        ))}
      </div>
      {topics.length > 6 && (
        <div style={{ textAlign: 'center' }}>
          <Link href="/my-topics" className="btn btn-secondary" style={{ textDecoration: 'none' }}>
            Xem tất cả ({topics.length} chủ đề)
          </Link>
        </div>
      )}
    </div>
  );
}

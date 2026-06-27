'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CloneTopicButton({ shareCode }: { shareCode: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const clone = async () => {
    setLoading(true); setError('');
    try {
      const res = await fetch(`/api/share/${shareCode.toUpperCase()}/clone`, { method: 'POST' });
      if (res.ok) {
        const d = await res.json();
        router.push(`/my-topics/${d.topic.id}`);
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
    <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
      <button className="btn btn-primary btn-lg" onClick={clone} disabled={loading}>
        {loading ? '⏳ Đang clone...' : '📥 Clone về thư viện của tôi'}
      </button>
      {error && <p style={{ color: 'var(--error)', fontSize: '0.875rem' }}>{error}</p>}
    </div>
  );
}

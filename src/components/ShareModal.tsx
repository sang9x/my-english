'use client';

import { useState } from 'react';

interface ShareModalProps {
  shareCode: string;
  topicName: string;
  onClose: () => void;
}

export default function ShareModal({ shareCode, topicName, onClose }: ShareModalProps) {
  const [copied, setCopied] = useState(false);
  const link = typeof window !== 'undefined' ? `${window.location.origin}/share/${shareCode}` : `/share/${shareCode}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content animate-scale-in" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
          <div>
            <h2 style={{ fontWeight: 700, fontSize: '1.25rem', color: 'var(--text-primary)', marginBottom: '4px' }}>🔗 Chia sẻ chủ đề</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{topicName}</p>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={onClose}>✕</button>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px' }}>
            Link chia sẻ:
          </label>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              className="input"
              value={link}
              readOnly
              onClick={(e) => (e.target as HTMLInputElement).select()}
              style={{ fontSize: '0.875rem' }}
            />
            <button
              className={`btn ${copied ? 'btn-success' : 'btn-primary'}`}
              onClick={copy}
              style={{ whiteSpace: 'nowrap', minWidth: '90px' }}
            >
              {copied ? '✅ Đã copy' : '📋 Copy'}
            </button>
          </div>
        </div>

        <div style={{ padding: '12px 16px', borderRadius: 'var(--radius-md)', background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)' }}>
          <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
            💡 Mã chia sẻ: <code style={{ fontWeight: 700, color: 'var(--brand-violet-light)', fontSize: '0.875rem' }}>{shareCode}</code>
          </p>
          <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            Người dùng khác có thể dùng link này để clone toàn bộ bộ từ vựng về thư viện của họ.
          </p>
        </div>
      </div>
    </div>
  );
}

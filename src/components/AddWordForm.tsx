'use client';

import { useState } from 'react';

interface AddWordFormProps {
  topicId: string;
  onAdded: () => void;
}

export default function AddWordForm({ topicId, onAdded }: AddWordFormProps) {
  const [english, setEnglish] = useState('');
  const [vietnamese, setVietnamese] = useState('');
  const [ipa, setIpa] = useState('');
  const [example, setExample] = useState('');
  const [exampleVi, setExampleVi] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!english.trim() || !vietnamese.trim()) return;
    setLoading(true); setMsg(null);
    try {
      const res = await fetch(`/api/topics/${topicId}/words`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ english, vietnamese, ipa, example, exampleVi }),
      });
      if (res.ok) {
        setMsg({ type: 'success', text: `✅ Đã thêm "${english.trim()}"` });
        setEnglish(''); setVietnamese(''); setIpa(''); setExample(''); setExampleVi('');
        onAdded();
      } else {
        const d = await res.json();
        setMsg({ type: 'error', text: `❌ ${d.error}` });
      }
    } catch {
      setMsg({ type: 'error', text: '❌ Lỗi kết nối' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
            Từ tiếng Anh *
          </label>
          <input id="add-english" className="input" value={english} onChange={(e) => setEnglish(e.target.value)} placeholder="e.g. beautiful" autoComplete="off" />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
            Nghĩa tiếng Việt * <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>(cách nhau bằng dấu phẩy)</span>
          </label>
          <input id="add-vietnamese" className="input" value={vietnamese} onChange={(e) => setVietnamese(e.target.value)} placeholder="e.g. đẹp, xinh đẹp" autoComplete="off" />
        </div>
      </div>
      <div>
        <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>IPA (phiên âm)</label>
        <input id="add-ipa" className="input" value={ipa} onChange={(e) => setIpa(e.target.value)} placeholder="e.g. /ˈbjuːtɪfl/" autoComplete="off" />
      </div>
      <div>
        <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>Câu ví dụ tiếng Anh</label>
        <input id="add-example" className="input" value={example} onChange={(e) => setExample(e.target.value)} placeholder="e.g. She is a beautiful person." autoComplete="off" />
      </div>
      <div>
        <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>Nghĩa câu ví dụ</label>
        <input id="add-example-vi" className="input" value={exampleVi} onChange={(e) => setExampleVi(e.target.value)} placeholder="e.g. Cô ấy là một người đẹp." autoComplete="off" />
      </div>

      {msg && (
        <p style={{ color: msg.type === 'success' ? 'var(--success)' : 'var(--error)', fontSize: '0.875rem' }}>{msg.text}</p>
      )}

      <button type="submit" className="btn btn-primary" disabled={loading || !english.trim() || !vietnamese.trim()}>
        {loading ? '⏳ Đang lưu...' : '+ Thêm từ'}
      </button>
    </form>
  );
}

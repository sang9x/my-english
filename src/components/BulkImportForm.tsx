'use client';

import { useState } from 'react';

interface BulkImportFormProps {
  topicId: string;
  onImported: () => void;
}

interface ParsedRow {
  english: string;
  vietnamese: string[];
  ipa: string;
  status: 'valid' | 'error';
  error?: string;
}

function parseText(text: string): ParsedRow[] {
  return text
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0 && !line.startsWith('#'))
    .map((line) => {
      const parts = line.split('|').map((p) => p.trim());
      if (parts.length < 2 || !parts[0] || !parts[1]) {
        return { english: parts[0] ?? line, vietnamese: [], ipa: '', status: 'error' as const, error: 'Thiếu nghĩa tiếng Việt' };
      }
      return {
        english: parts[0],
        vietnamese: parts[1].split(',').map((v) => v.trim().toLowerCase()).filter(Boolean),
        ipa: parts[2] ?? '',
        status: 'valid' as const,
      };
    });
}

export default function BulkImportForm({ topicId, onImported }: BulkImportFormProps) {
  const [text, setText] = useState('');
  const [preview, setPreview] = useState<ParsedRow[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ added: number; duplicates: number; errors: number } | null>(null);

  const handlePreview = () => {
    const rows = parseText(text);
    setPreview(rows);
    setResult(null);
  };

  const handleImport = async () => {
    if (!preview) return;
    const valid = preview.filter((r) => r.status === 'valid');
    if (valid.length === 0) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/topics/${topicId}/words/bulk`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ words: valid }),
      });
      if (res.ok) {
        const d = await res.json();
        setResult(d);
        setText('');
        setPreview(null);
        onImported();
      }
    } catch { /* ignore */ }
    finally { setLoading(false); }
  };

  return (
    <div>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '12px' }}>
        Mỗi dòng một từ theo định dạng: <code style={{ background: 'var(--bg-elevated)', padding: '2px 6px', borderRadius: '4px', fontSize: '0.8rem' }}>từ tiếng Anh | nghĩa,nghĩa2 | IPA (tùy chọn)</code>
      </p>

      <textarea
        id="bulk-input"
        className="textarea"
        value={text}
        onChange={(e) => { setText(e.target.value); setPreview(null); setResult(null); }}
        rows={8}
        placeholder={'beautiful | đẹp, xinh đẹp | /ˈbjuːtɪfl/\nhappy | vui, hạnh phúc | /ˈhæpi/\nrun | chạy'}
      />

      <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
        <button className="btn btn-secondary" onClick={handlePreview} disabled={!text.trim()}>👁️ Xem trước</button>
        {preview && preview.filter((r) => r.status === 'valid').length > 0 && (
          <button className="btn btn-primary" onClick={handleImport} disabled={loading}>
            {loading ? '⏳ Đang nhập...' : `✅ Nhập ${preview.filter((r) => r.status === 'valid').length} từ hợp lệ`}
          </button>
        )}
      </div>

      {result && (
        <div style={{ marginTop: '12px', padding: '12px 16px', borderRadius: 'var(--radius-md)', background: 'var(--success-bg)', border: '1px solid rgba(16,185,129,0.2)' }}>
          <p style={{ color: 'var(--success)', fontWeight: 600, fontSize: '0.9375rem' }}>
            ✅ Đã thêm {result.added} từ · Trùng: {result.duplicates} · Lỗi: {result.errors}
          </p>
        </div>
      )}

      {preview && preview.length > 0 && (
        <div style={{ marginTop: '16px', overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr><th>Từ tiếng Anh</th><th>Nghĩa</th><th>IPA</th><th>Trạng thái</th></tr>
            </thead>
            <tbody>
              {preview.map((row, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 500 }}>{row.english}</td>
                  <td>{row.vietnamese.join(', ')}</td>
                  <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', color: 'var(--text-muted)' }}>{row.ipa}</td>
                  <td>
                    {row.status === 'valid'
                      ? <span className="badge badge-success">✅ Hợp lệ</span>
                      : <span className="badge badge-error" title={row.error}>❌ {row.error}</span>
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

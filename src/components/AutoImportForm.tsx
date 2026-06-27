'use client';

import { useState } from 'react';

interface AutoImportFormProps {
  topicId: string;
  onImported: () => void;
}

interface LookupRow {
  word: string;
  ipa: string;
  definition: string;
  vietnameseInput: string;
  found: boolean;
  selected: boolean;
}

export default function AutoImportForm({ topicId, onImported }: AutoImportFormProps) {
  const [text, setText] = useState('');
  const [rows, setRows] = useState<LookupRow[]>([]);
  const [looking, setLooking] = useState(false);
  const [progress, setProgress] = useState(0);
  const [importing, setImporting] = useState(false);
  const [importResult, setImportResult] = useState<string | null>(null);

  const lookup = async () => {
    const words = text
      .split(/[\n,]+/)
      .map((w) => w.trim().toLowerCase())
      .filter((w) => w.length > 0);

    if (words.length === 0) return;
    setLooking(true);
    setRows([]);
    setProgress(0);
    setImportResult(null);

    const results: LookupRow[] = [];
    for (let i = 0; i < words.length; i++) {
      setProgress(Math.round(((i + 1) / words.length) * 100));
      try {
        const res = await fetch(`/api/lookup?word=${encodeURIComponent(words[i])}`);
        const d = await res.json();
        results.push({
          word: words[i],
          ipa: d.ipa ?? '',
          definition: d.definitions?.[0]?.definition ?? '',
          vietnameseInput: '',
          found: d.found ?? false,
          selected: d.found ?? false,
        });
      } catch {
        results.push({ word: words[i], ipa: '', definition: '', vietnameseInput: '', found: false, selected: false });
      }
      setRows([...results]);
    }
    setLooking(false);
  };

  const toggleSelect = (i: number) => setRows((r) => r.map((row, idx) => idx === i ? { ...row, selected: !row.selected } : row));
  const setVi = (i: number, val: string) => setRows((r) => r.map((row, idx) => idx === i ? { ...row, vietnameseInput: val } : row));

  const importSelected = async () => {
    const toImport = rows
      .filter((r) => r.selected && r.found && r.vietnameseInput.trim())
      .map((r) => ({
        english: r.word,
        vietnamese: r.vietnameseInput.split(',').map((v) => v.trim().toLowerCase()).filter(Boolean),
        ipa: r.ipa,
      }));
    if (toImport.length === 0) return;
    setImporting(true);
    try {
      const res = await fetch(`/api/topics/${topicId}/words/bulk`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ words: toImport }),
      });
      if (res.ok) {
        const d = await res.json();
        setImportResult(`✅ Đã thêm ${d.added} từ · Trùng: ${d.duplicates}`);
        setText('');
        setRows([]);
        onImported();
      }
    } catch { /* ignore */ }
    finally { setImporting(false); }
  };

  const selectedCount = rows.filter((r) => r.selected && r.found && r.vietnameseInput.trim()).length;

  return (
    <div>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '12px' }}>
        Nhập danh sách từ tiếng Anh (phân cách bằng dấu phẩy hoặc xuống dòng). Hệ thống sẽ tự tra cứu IPA và nghĩa từ Cambridge Dictionary.
      </p>
      <textarea
        id="auto-import-input"
        className="textarea"
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={4}
        placeholder="beautiful, happy, run&#10;technology&#10;innovation"
        disabled={looking}
      />
      <button className="btn btn-primary" onClick={lookup} disabled={looking || !text.trim()} style={{ marginTop: '12px' }}>
        {looking ? `🔍 Đang tra cứu... ${progress}%` : '🔍 Tra cứu'}
      </button>

      {looking && (
        <div className="progress-bar" style={{ marginTop: '10px' }}>
          <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
        </div>
      )}

      {importResult && (
        <p style={{ color: 'var(--success)', fontWeight: 600, fontSize: '0.9375rem', marginTop: '12px' }}>{importResult}</p>
      )}

      {rows.length > 0 && (
        <>
          <div style={{ marginTop: '20px', overflowX: 'auto' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th style={{ width: '40px' }}>
                    <input type="checkbox"
                      checked={rows.filter((r) => r.found).every((r) => r.selected)}
                      onChange={(e) => setRows((r) => r.map((row) => row.found ? { ...row, selected: e.target.checked } : row))}
                    />
                  </th>
                  <th>Từ</th><th>IPA</th><th>Định nghĩa (EN)</th><th>Nghĩa tiếng Việt *</th><th>Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={i} style={{ opacity: row.found ? 1 : 0.5 }}>
                    <td>
                      <input type="checkbox" checked={row.selected} disabled={!row.found} onChange={() => toggleSelect(i)} />
                    </td>
                    <td style={{ fontWeight: 600 }}>{row.word}</td>
                    <td><span className="ipa-text">{row.ipa || '—'}</span></td>
                    <td style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', maxWidth: '200px' }}>{row.definition || '—'}</td>
                    <td>
                      {row.found ? (
                        <input
                          className="input"
                          value={row.vietnameseInput}
                          onChange={(e) => setVi(i, e.target.value)}
                          placeholder="VD: đẹp, xinh đẹp"
                          style={{ minHeight: '36px', padding: '4px 10px', fontSize: '0.875rem' }}
                        />
                      ) : '—'}
                    </td>
                    <td>
                      {row.found
                        ? <span className="badge badge-success">✅ Tìm thấy</span>
                        : <span className="badge badge-error">❌ Không có</span>
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ marginTop: '16px', display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
            <button
              className="btn btn-success btn-lg"
              onClick={importSelected}
              disabled={importing || selectedCount === 0}
            >
              {importing ? '⏳ Đang thêm...' : `✅ Thêm ${selectedCount} từ đã chọn`}
            </button>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.8125rem' }}>
              * Cần điền nghĩa tiếng Việt trước khi thêm
            </span>
          </div>
        </>
      )}
    </div>
  );
}

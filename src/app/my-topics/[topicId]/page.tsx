'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import AddWordForm from '@/components/AddWordForm';
import BulkImportForm from '@/components/BulkImportForm';
import AutoImportForm from '@/components/AutoImportForm';
import ShareModal from '@/components/ShareModal';
import type { CustomTopic, CustomWord } from '@/lib/types';

type Tab = 'words' | 'add' | 'bulk' | 'auto';

export default function ManageTopicPage({ params }: { params: Promise<{ topicId: string }> }) {
  const router = useRouter();
  const [topicId, setTopicId] = useState('');
  const [topic, setTopic] = useState<CustomTopic | null>(null);
  const [words, setWords] = useState<CustomWord[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<Tab>('words');
  const [showShare, setShowShare] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<CustomWord>>({});
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [deleteInput, setDeleteInput] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [sortCol, setSortCol] = useState<'english' | 'createdAt'>('createdAt');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    params.then(({ topicId: id }) => {
      setTopicId(id);
      loadTopic(id);
    });
  }, [params]);

  const loadTopic = useCallback(async (id: string) => {
    setLoading(true);
    try {
      const [tr, wr] = await Promise.all([
        fetch(`/api/topics/${id}`),
        fetch(`/api/topics/${id}/words`),
      ]);
      if (tr.ok) { const d = await tr.json(); setTopic(d.topic); }
      if (wr.ok) { const d = await wr.json(); setWords(d.words ?? []); }
    } catch { /* ignore */ }
    finally { setLoading(false); }
  }, []);

  const refreshWords = () => loadTopic(topicId);

  const sorted = [...words].sort((a, b) => {
    const av = sortCol === 'english' ? a.english : a.createdAt;
    const bv = sortCol === 'english' ? b.english : b.createdAt;
    if (av < bv) return sortDir === 'asc' ? -1 : 1;
    if (av > bv) return sortDir === 'asc' ? 1 : -1;
    return 0;
  });

  const sort = (col: typeof sortCol) => {
    if (sortCol === col) setSortDir((d) => d === 'asc' ? 'desc' : 'asc');
    else { setSortCol(col); setSortDir('asc'); }
  };

  const startEdit = (w: CustomWord) => { setEditingId(w.id); setEditData({ english: w.english, vietnamese: w.vietnamese, ipa: w.ipa, example: w.example, exampleVi: w.exampleVi }); };
  const cancelEdit = () => { setEditingId(null); setEditData({}); };

  const saveEdit = async (wordId: string) => {
    const res = await fetch(`/api/topics/${topicId}/words/${wordId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...editData, vietnamese: Array.isArray(editData.vietnamese) ? editData.vietnamese.join(', ') : editData.vietnamese }),
    });
    if (res.ok) { cancelEdit(); refreshWords(); }
  };

  const deleteWord = async (wordId: string) => {
    if (!confirm('Xóa từ này?')) return;
    await fetch(`/api/topics/${topicId}/words/${wordId}`, { method: 'DELETE' });
    refreshWords();
  };

  const deleteTopic = async () => {
    if (deleteInput !== topic?.name) return;
    setDeleting(true);
    await fetch(`/api/topics/${topicId}`, { method: 'DELETE' });
    router.push('/my-topics');
  };

  const tabs: { key: Tab; label: string }[] = [
    { key: 'words', label: `📋 Danh sách (${words.length})` },
    { key: 'add', label: '➕ Thêm từ' },
    { key: 'bulk', label: '📄 Bulk Import' },
    { key: 'auto', label: '🤖 Auto-Import' },
  ];

  if (loading) {
    return (
      <div className="page-wrapper" style={{ minHeight: '100dvh' }}>
        <Navigation />
        <div className="container-app" style={{ paddingTop: '40px' }}>
          <div className="shimmer" style={{ height: '120px', borderRadius: 'var(--radius-lg)', marginBottom: '24px' }} />
          <div className="shimmer" style={{ height: '400px', borderRadius: 'var(--radius-lg)' }} />
        </div>
      </div>
    );
  }

  if (!topic) {
    return (
      <div className="page-wrapper" style={{ minHeight: '100dvh' }}>
        <Navigation />
        <div className="container-app" style={{ paddingTop: '80px', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-secondary)' }}>Không tìm thấy chủ đề.</p>
          <Link href="/my-topics" className="btn btn-primary" style={{ textDecoration: 'none', marginTop: '16px', display: 'inline-block' }}>← Quay lại</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper" style={{ minHeight: '100dvh' }}>
      <Navigation />
      <div className="container-app" style={{ paddingTop: '32px', paddingBottom: '80px' }}>
        <Link href="/my-topics" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem', display: 'block', marginBottom: '20px' }}>← Chủ đề của tôi</Link>

        {/* Topic header */}
        <div className="card" style={{ padding: '24px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <span style={{ fontSize: '3rem', lineHeight: 1 }}>{topic.emoji}</span>
              <div>
                <h1 style={{ fontSize: '1.375rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '4px' }}>{topic.name}</h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '4px' }}>{topic.description || 'Chưa có mô tả'}</p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                  {words.length} từ · Mã: <code style={{ color: 'var(--brand-violet-light)', fontWeight: 700 }}>{topic.shareCode}</code>
                </p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <Link href={`/topic/${topicId}`} className="btn btn-primary btn-sm" style={{ textDecoration: 'none' }}>🎮 Học</Link>
              <button className="btn btn-secondary btn-sm" onClick={() => setShowShare(true)}>🔗 Chia sẻ</button>
              <button className="btn btn-ghost btn-sm" style={{ color: 'var(--error)' }} onClick={() => setDeleteConfirm(true)}>🗑️ Xóa</button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '4px', marginBottom: '20px', overflowX: 'auto', paddingBottom: '4px' }}>
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              style={{
                padding: '8px 16px', borderRadius: 'var(--radius-md)', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap', border: 'none',
                background: tab === t.key ? 'rgba(139,92,246,0.15)' : 'transparent',
                color: tab === t.key ? 'var(--brand-violet-light)' : 'var(--text-secondary)',
                borderBottom: tab === t.key ? '2px solid var(--brand-violet)' : '2px solid transparent',
                transition: 'all var(--transition-fast)',
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="card" style={{ padding: '24px' }}>
          {tab === 'words' && (
            words.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>📝</div>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>Chưa có từ nào. Hãy thêm từ vựng!</p>
                <button className="btn btn-primary" onClick={() => setTab('add')}>+ Thêm từ đầu tiên</button>
              </div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th onClick={() => sort('english')} style={{ cursor: 'pointer', userSelect: 'none' }}>
                        Từ tiếng Anh {sortCol === 'english' ? (sortDir === 'asc' ? '↑' : '↓') : ''}
                      </th>
                      <th>Nghĩa tiếng Việt</th>
                      <th>IPA</th>
                      <th style={{ textAlign: 'right' }}>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sorted.map((w) => (
                      <tr key={w.id}>
                        {editingId === w.id ? (
                          <>
                            <td><input className="input" value={editData.english ?? ''} onChange={(e) => setEditData((d) => ({ ...d, english: e.target.value }))} style={{ minHeight: '36px', padding: '4px 8px' }} /></td>
                            <td><input className="input" value={Array.isArray(editData.vietnamese) ? editData.vietnamese.join(', ') : (editData.vietnamese ?? '')} onChange={(e) => setEditData((d) => ({ ...d, vietnamese: e.target.value.split(',').map((v) => v.trim()) }))} style={{ minHeight: '36px', padding: '4px 8px' }} /></td>
                            <td><input className="input" value={editData.ipa ?? ''} onChange={(e) => setEditData((d) => ({ ...d, ipa: e.target.value }))} style={{ minHeight: '36px', padding: '4px 8px', fontFamily: 'var(--font-mono)' }} /></td>
                            <td style={{ textAlign: 'right' }}>
                              <button className="btn btn-success btn-sm" onClick={() => saveEdit(w.id)}>✓</button>
                              <button className="btn btn-ghost btn-sm" onClick={cancelEdit} style={{ marginLeft: '4px' }}>✕</button>
                            </td>
                          </>
                        ) : (
                          <>
                            <td style={{ fontWeight: 600 }}>{w.english}</td>
                            <td style={{ color: 'var(--text-secondary)' }}>{w.vietnamese.join(' / ')}</td>
                            <td><span className="ipa-text">{w.ipa || '—'}</span></td>
                            <td style={{ textAlign: 'right' }}>
                              <button className="btn btn-ghost btn-sm" onClick={() => startEdit(w)}>✏️</button>
                              <button className="btn btn-ghost btn-sm" onClick={() => deleteWord(w.id)} style={{ color: 'var(--error)' }}>🗑️</button>
                            </td>
                          </>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          )}
          {tab === 'add' && <AddWordForm topicId={topicId} onAdded={() => { refreshWords(); setTab('words'); }} />}
          {tab === 'bulk' && <BulkImportForm topicId={topicId} onImported={() => { refreshWords(); setTab('words'); }} />}
          {tab === 'auto' && <AutoImportForm topicId={topicId} onImported={() => { refreshWords(); setTab('words'); }} />}
        </div>
      </div>

      {/* Share modal */}
      {showShare && (
        <ShareModal shareCode={topic.shareCode} topicName={topic.name} onClose={() => setShowShare(false)} />
      )}

      {/* Delete confirm modal */}
      {deleteConfirm && (
        <div className="modal-overlay" onClick={() => setDeleteConfirm(false)}>
          <div className="modal-content animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <h2 style={{ fontWeight: 700, fontSize: '1.25rem', color: 'var(--error)', marginBottom: '12px' }}>⚠️ Xóa chủ đề</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '8px' }}>
              Hành động này sẽ xóa vĩnh viễn chủ đề <strong style={{ color: 'var(--text-primary)' }}>&quot;{topic.name}&quot;</strong> và tất cả {words.length} từ vựng.
            </p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '16px' }}>
              Nhập tên chủ đề để xác nhận:
            </p>
            <input
              className="input"
              value={deleteInput}
              onChange={(e) => setDeleteInput(e.target.value)}
              placeholder={topic.name}
              style={{ marginBottom: '16px' }}
            />
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                className="btn btn-danger"
                disabled={deleteInput !== topic.name || deleting}
                onClick={deleteTopic}
                style={{ flex: 1 }}
              >
                {deleting ? '⏳ Đang xóa...' : '🗑️ Xóa vĩnh viễn'}
              </button>
              <button className="btn btn-secondary" onClick={() => { setDeleteConfirm(false); setDeleteInput(''); }}>Hủy</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import { getStreak, getGameHistory, getKnownCount } from '@/lib/storage';
import { TOPICS, WORDS } from '@/lib/data';
import type { StreakData, GameResult } from '@/lib/types';

const MODE_LABELS: Record<string, string> = {
  flashcard: '🃏 Flashcard',
  sentence: '🧩 Sắp xếp câu',
  'type-en': '⌨️ Gõ tiếng Anh',
  'type-vi': '🇻🇳 Gõ tiếng Việt',
};

export default function ProgressPage() {
  const [streak, setStreak] = useState<StreakData>({ currentStreak: 0, longestStreak: 0, lastStudyDate: '' });
  const [history, setHistory] = useState<GameResult[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setStreak(getStreak());
    setHistory(getGameHistory(15));
    setMounted(true);
  }, []);

  const totalWords = TOPICS.reduce((sum, t) => sum + (WORDS[t.id]?.length ?? t.wordCount), 0);
  const totalKnown = mounted
    ? TOPICS.reduce((sum, t) => sum + getKnownCount(t.id), 0)
    : 0;

  return (
    <div className="page-wrapper" style={{ minHeight: '100dvh' }}>
      <Navigation />
      <div className="container-app" style={{ paddingTop: '40px', paddingBottom: '80px' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '32px' }}>
          📊 Tiến trình học tập
        </h1>

        {/* Stats grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px', marginBottom: '36px' }}>
          {/* Streak */}
          <div className="card" style={{ padding: '24px', textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>🔥</div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)' }}>{streak.currentStreak}</div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Ngày học liên tiếp</div>
            {streak.longestStreak > 0 && (
              <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '4px' }}>Kỷ lục: {streak.longestStreak} ngày</div>
            )}
          </div>

          {/* Known words */}
          <div className="card" style={{ padding: '24px', textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>✅</div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--success)' }}>{totalKnown}</div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Từ đã thuộc / {totalWords}</div>
            <div className="progress-bar" style={{ marginTop: '10px' }}>
              <div className="progress-bar-fill" style={{ width: `${totalWords > 0 ? (totalKnown / totalWords) * 100 : 0}%` }} />
            </div>
          </div>

          {/* Sessions */}
          <div className="card" style={{ padding: '24px', textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>🎮</div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--brand-violet-light)' }}>{history.length}</div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Lần chơi gần đây</div>
          </div>
        </div>

        {/* Per-topic progress */}
        <div style={{ marginBottom: '36px' }}>
          <h2 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '16px' }}>
            Tiến trình theo chủ đề
          </h2>
          <div className="card" style={{ padding: '20px' }}>
            {TOPICS.map((topic, i) => {
              const total = WORDS[topic.id]?.length ?? topic.wordCount;
              const known = mounted ? getKnownCount(topic.id) : 0;
              const pct = total > 0 ? Math.round((known / total) * 100) : 0;
              return (
                <div key={topic.id} style={{ marginBottom: i < TOPICS.length - 1 ? '16px' : 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ fontSize: '0.9375rem', color: 'var(--text-primary)', fontWeight: 500 }}>
                      {topic.emoji} {topic.name}
                    </span>
                    <span style={{ fontSize: '0.875rem', color: 'var(--brand-violet-light)', fontWeight: 600 }}>
                      {known}/{total} ({pct}%)
                    </span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-bar-fill" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Game history */}
        <div>
          <h2 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '16px' }}>
            Lịch sử chơi gần đây
          </h2>
          {history.length === 0 ? (
            <div className="card" style={{ padding: '40px', textAlign: 'center' }}>
              <p style={{ color: 'var(--text-secondary)' }}>Chưa có lịch sử. Hãy bắt đầu học nhé!</p>
              <Link href="/" className="btn btn-primary" style={{ textDecoration: 'none', marginTop: '16px', display: 'inline-block' }}>Bắt đầu học →</Link>
            </div>
          ) : (
            <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Chế độ</th>
                    <th>Chủ đề</th>
                    <th>Điểm</th>
                    <th>Ngày</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((r, i) => {
                    const topic = TOPICS.find((t) => t.id === r.topicId);
                    return (
                      <tr key={i}>
                        <td>{MODE_LABELS[r.mode] ?? r.mode}</td>
                        <td>{topic ? `${topic.emoji} ${topic.name}` : r.topicId}</td>
                        <td>
                          <span style={{ color: 'var(--success)', fontWeight: 600 }}>{r.score}</span>
                          <span style={{ color: 'var(--text-muted)' }}>/{r.total}</span>
                        </td>
                        <td style={{ color: 'var(--text-muted)', fontSize: '0.8125rem' }}>
                          {new Date(r.date).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

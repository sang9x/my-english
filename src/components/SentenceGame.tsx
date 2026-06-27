'use client';

import { useState, useCallback, useRef } from 'react';
import Link from 'next/link';
import type { Sentence } from '@/lib/types';
import { saveGameResult, updateStreakOnStudy } from '@/lib/storage';

interface SentenceGameProps {
  sentences: Sentence[];
  topicId: string;
}

function speak(text: string) {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'en-US'; u.rate = 0.85;
    window.speechSynthesis.speak(u);
  }
}

function shuffleArr<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function SentenceGame({ sentences, topicId }: SentenceGameProps) {
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<string[]>([]);
  const [available, setAvailable] = useState<string[]>(() => shuffleArr(sentences[0]?.words ?? []));
  const [status, setStatus] = useState<'playing' | 'correct' | 'wrong'>('playing');
  const [hintUsed, setHintUsed] = useState(false);
  const [score, setScore] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [finished, setFinished] = useState(false);
  const answerZoneRef = useRef<HTMLDivElement>(null);

  const sentence = sentences[idx];

  const next = useCallback(() => {
    const nextIdx = idx + 1;
    if (nextIdx >= sentences.length) {
      setFinished(true);
      saveGameResult({ topicId, mode: 'sentence', score, total: sentences.length, date: Date.now() });
      updateStreakOnStudy();
    } else {
      setIdx(nextIdx);
      setSelected([]);
      setAvailable(shuffleArr(sentences[nextIdx].words));
      setStatus('playing');
      setHintUsed(false);
    }
  }, [idx, sentences, score, topicId]);

  const addWord = (word: string, i: number) => {
    if (status !== 'playing') return;
    setSelected((s) => [...s, word]);
    setAvailable((a) => { const n = [...a]; n.splice(i, 1); return n; });
  };

  const removeWord = (i: number) => {
    if (status !== 'playing') return;
    const word = selected[i];
    setSelected((s) => { const n = [...s]; n.splice(i, 1); return n; });
    setAvailable((a) => [...a, word]);
  };

  const check = () => {
    const ans = selected.join(' ');
    if (ans === sentence.english) {
      setStatus('correct');
      setScore((s) => s + (hintUsed ? 5 : 10));
      speak(sentence.english);
    } else {
      setStatus('wrong');
      setWrongCount((c) => c + 1);
    }
  };

  const hint = () => {
    const nextWord = sentence.words[selected.length];
    if (!nextWord) return;
    setHintUsed(true);
    const i = available.indexOf(nextWord);
    if (i !== -1) addWord(nextWord, i);
    else {
      // word might already be in selected in wrong position — just refill
      setSelected([...sentence.words.slice(0, selected.length + 1)]);
      setAvailable(sentence.words.slice(selected.length + 1).filter((w) => !selected.includes(w)));
    }
  };

  if (finished) {
    return (
      <div className="game-area animate-scale-in" style={{ textAlign: 'center', padding: '40px 0' }}>
        <div style={{ fontSize: '3.5rem', marginBottom: '12px' }}>{score >= sentences.length * 8 ? '🏆' : '💪'}</div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>Hoàn thành!</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '8px' }}>Tổng điểm: <span style={{ color: 'var(--brand-violet-light)', fontWeight: 700, fontSize: '1.5rem' }}>{score}</span></p>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>Đúng {sentences.length - wrongCount}/{sentences.length} câu</p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <button className="btn btn-primary btn-lg" onClick={() => { setIdx(0); setSelected([]); setAvailable(shuffleArr(sentences[0].words)); setStatus('playing'); setHintUsed(false); setScore(0); setWrongCount(0); setFinished(false); }}>🔄 Chơi lại</button>
          <Link href={`/topic/${topicId}`} className="btn btn-secondary btn-lg" style={{ textDecoration: 'none' }}>← Chế độ khác</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="game-area">
      {/* Progress */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
        <span>Câu {idx + 1} / {sentences.length}</span>
        <span className="score-display" style={{ fontSize: '1rem' }}>{score} <span className="score-label">điểm</span></span>
      </div>
      <div className="progress-bar" style={{ marginBottom: '24px' }}>
        <div className="progress-bar-fill" style={{ width: `${(idx / sentences.length) * 100}%` }} />
      </div>

      {/* Vietnamese prompt */}
      <div className="card" style={{ padding: '24px', marginBottom: '20px', textAlign: 'center' }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '8px' }}>Sắp xếp câu tiếng Anh có nghĩa:</p>
        <p style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)' }}>{sentence.vietnamese}</p>
      </div>

      {/* Answer zone */}
      <div
        ref={answerZoneRef}
        className={`answer-zone${status === 'correct' ? ' correct' : status === 'wrong' ? ' incorrect' : ''}${status === 'wrong' ? ' animate-shake' : ''}`}
        style={{ marginBottom: '16px', minHeight: '64px' }}
      >
        {selected.length === 0 ? (
          <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Chọn các từ bên dưới...</span>
        ) : (
          selected.map((w, i) => (
            <span
              key={`${w}-${i}`}
              className="word-chip selected"
              onClick={() => removeWord(i)}
              style={{ cursor: 'pointer' }}
            >
              {w}
            </span>
          ))
        )}
      </div>

      {/* Wrong answer reveal */}
      {status === 'wrong' && (
        <div className="animate-slide-down" style={{ textAlign: 'center', marginBottom: '12px' }}>
          <p style={{ color: 'var(--error)', fontSize: '0.875rem', marginBottom: '4px' }}>❌ Chưa đúng!</p>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
            Đáp án: <strong style={{ color: 'var(--text-primary)' }}>{sentence.english}</strong>
          </p>
        </div>
      )}

      {/* Word chips pool */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px', justifyContent: 'center' }}>
        {available.map((w, i) => (
          <span
            key={`avail-${w}-${i}`}
            className={`word-chip${status !== 'playing' ? ' disabled' : ''}`}
            onClick={() => addWord(w, i)}
          >
            {w}
          </span>
        ))}
      </div>

      {/* Buttons */}
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
        {status === 'playing' && (
          <>
            <button className="btn btn-ghost btn-sm" onClick={() => { setSelected([]); setAvailable(shuffleArr(sentence.words)); }}>
              🔄 Xóa
            </button>
            {selected.length < sentence.words.length && (
              <button className="btn btn-ghost btn-sm" onClick={hint}>
                💡 Gợi ý {hintUsed ? '(-50%)' : ''}
              </button>
            )}
            <button className="btn btn-primary" onClick={check} disabled={selected.length === 0}>
              ✓ Kiểm tra
            </button>
          </>
        )}
        {(status === 'correct' || status === 'wrong') && (
          <button className="btn btn-primary btn-lg" onClick={next}>
            {idx + 1 < sentences.length ? 'Tiếp theo →' : 'Kết thúc 🏁'}
          </button>
        )}
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import type { Word } from '@/lib/types';
import { saveGameResult, updateStreakOnStudy } from '@/lib/storage';

interface TypingEnGameProps {
  words: Word[];
  topicId: string;
}

function speak(text: string) {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'en-US'; u.rate = 0.9;
    window.speechSynthesis.speak(u);
  }
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function TypingEnGame({ words, topicId }: TypingEnGameProps) {
  const shuffled = useRef(shuffle(words));
  const [idx, setIdx] = useState(0);
  const [input, setInput] = useState('');
  const [status, setStatus] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [showHint, setShowHint] = useState(false);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [finished, setFinished] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const word = shuffled.current[idx];

  const next = useCallback(() => {
    if (idx + 1 >= shuffled.current.length) {
      setFinished(true);
      saveGameResult({ topicId, mode: 'type-en', score, total: shuffled.current.length, date: Date.now() });
      updateStreakOnStudy();
    } else {
      setIdx((i) => i + 1);
      setInput('');
      setStatus('idle');
      setShowHint(false);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [idx, score, topicId]);

  const check = useCallback(() => {
    if (!input.trim()) return;
    setAttempts((a) => a + 1);
    if (input.trim().toLowerCase() === word.english.toLowerCase()) {
      setStatus('correct');
      setScore((s) => s + 1);
      speak(word.english);
      setTimeout(next, 1200);
    } else {
      setStatus('wrong');
    }
  }, [input, word, next]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [idx]);

  if (finished) {
    return (
      <div className="game-area animate-scale-in" style={{ textAlign: 'center', padding: '40px 0' }}>
        <div style={{ fontSize: '3.5rem', marginBottom: '12px' }}>{score >= shuffled.current.length * 0.8 ? '🏆' : '💪'}</div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>Hoàn thành!</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
          Đúng <span style={{ color: 'var(--success)', fontWeight: 700 }}>{score}</span> / {shuffled.current.length} từ
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <button className="btn btn-primary btn-lg" onClick={() => { shuffled.current = shuffle(words); setIdx(0); setInput(''); setStatus('idle'); setScore(0); setAttempts(0); setFinished(false); }}>🔄 Chơi lại</button>
          <Link href={`/topic/${topicId}`} className="btn btn-secondary btn-lg" style={{ textDecoration: 'none' }}>← Chế độ khác</Link>
        </div>
      </div>
    );
  }

  const blanks = Array.from(word.english).map(() => '_').join(' ');

  return (
    <div className="game-area">
      {/* Progress */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
        <span>{idx + 1} / {shuffled.current.length}</span>
        <span>✅ {score} đúng</span>
      </div>
      <div className="progress-bar" style={{ marginBottom: '32px' }}>
        <div className="progress-bar-fill" style={{ width: `${(idx / shuffled.current.length) * 100}%` }} />
      </div>

      {/* Question */}
      <div className="card" style={{ padding: '32px', textAlign: 'center', marginBottom: '24px' }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '8px' }}>Nghĩa tiếng Việt:</p>
        <p style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '16px' }}>
          {word.vietnamese[0]}
          {word.vietnamese.length > 1 && (
            <span style={{ color: 'var(--text-muted)', fontSize: '1rem' }}> / {word.vietnamese.slice(1).join(' / ')}</span>
          )}
        </p>
        <p style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', fontSize: '1.125rem', letterSpacing: '0.2em' }}>
          {showHint ? word.english[0] + blanks.slice(1) : blanks}
        </p>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '4px' }}>{word.english.length} chữ cái</p>
      </div>

      {/* Input */}
      <div
        className={status === 'correct' ? 'animate-correct' : status === 'wrong' ? 'animate-wrong' : ''}
        style={{ marginBottom: '16px', borderRadius: 'var(--radius-md)', padding: '2px' }}
      >
        <input
          ref={inputRef}
          className="input"
          value={input}
          onChange={(e) => { setInput(e.target.value); if (status === 'wrong') setStatus('idle'); }}
          onKeyDown={(e) => { if (e.key === 'Enter') check(); }}
          placeholder="Gõ từ tiếng Anh..."
          style={{
            textAlign: 'center',
            fontSize: '1.25rem',
            borderColor: status === 'correct' ? 'var(--success)' : status === 'wrong' ? 'var(--error)' : undefined,
          }}
          disabled={status === 'correct'}
          autoComplete="off"
          spellCheck={false}
        />
      </div>

      {status === 'wrong' && (
        <div className="animate-slide-down" style={{ textAlign: 'center', marginBottom: '12px' }}>
          <p style={{ color: 'var(--error)', fontSize: '0.9375rem', marginBottom: '4px' }}>❌ Sai rồi!</p>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
            Đáp án: <strong style={{ color: 'var(--text-primary)' }}>{word.english}</strong>
          </p>
        </div>
      )}

      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
        {!showHint && status !== 'correct' && (
          <button className="btn btn-ghost btn-sm" onClick={() => setShowHint(true)}>💡 Xem chữ đầu</button>
        )}
        <button className="btn btn-primary" onClick={check} disabled={!input.trim() || status === 'correct'} style={{ minWidth: '120px' }}>
          ✓ Kiểm tra
        </button>
        {status === 'wrong' && (
          <button className="btn btn-secondary" onClick={next}>Bỏ qua →</button>
        )}
      </div>
    </div>
  );
}

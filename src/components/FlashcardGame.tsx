'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import type { Word } from '@/lib/types';
import { setWordProgress, saveGameResult, updateStreakOnStudy } from '@/lib/storage';

interface FlashcardGameProps {
  words: Word[];
  topicId: string;
}

function speak(text: string) {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(text);
    utt.lang = 'en-US';
    utt.rate = 0.9;
    window.speechSynthesis.speak(utt);
  }
}

export default function FlashcardGame({ words, topicId }: FlashcardGameProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [knownIds, setKnownIds] = useState<Set<string>>(new Set());
  const [reviewIds, setReviewIds] = useState<Set<string>>(new Set());
  const [isFinished, setIsFinished] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentWord = words[currentIndex];

  const goNext = useCallback(() => {
    if (currentIndex < words.length - 1) {
      setCurrentIndex((i) => i + 1);
      setIsFlipped(false);
    } else {
      setIsFinished(true);
      const known = Array.from(knownIds);
      saveGameResult({ topicId, mode: 'flashcard', score: known.length, total: words.length, date: Date.now() });
      updateStreakOnStudy();
    }
  }, [currentIndex, words.length, knownIds, topicId]);

  const goPrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
      setIsFlipped(false);
    }
  }, [currentIndex]);

  const markKnown = useCallback(() => {
    setWordProgress({ wordId: currentWord.id, topicId, known: true, lastSeen: Date.now() });
    setKnownIds((s) => new Set([...s, currentWord.id]));
    setReviewIds((s) => { const n = new Set(s); n.delete(currentWord.id); return n; });
    goNext();
  }, [currentWord, topicId, goNext]);

  const markReview = useCallback(() => {
    setWordProgress({ wordId: currentWord.id, topicId, known: false, lastSeen: Date.now() });
    setReviewIds((s) => new Set([...s, currentWord.id]));
    setKnownIds((s) => { const n = new Set(s); n.delete(currentWord.id); return n; });
    goNext();
  }, [currentWord, topicId, goNext]);

  const restart = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setKnownIds(new Set());
    setReviewIds(new Set());
    setIsFinished(false);
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (isFinished) return;
      if (e.code === 'Space') { e.preventDefault(); setIsFlipped((f) => !f); }
      if (e.code === 'ArrowRight') goNext();
      if (e.code === 'ArrowLeft') goPrev();
      if (e.key === '1') markKnown();
      if (e.key === '2') markReview();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isFinished, goNext, goPrev, markKnown, markReview]);

  if (isFinished) {
    const pct = Math.round((knownIds.size / words.length) * 100);
    return (
      <div className="game-area animate-scale-in" style={{ textAlign: 'center', padding: '40px 0' }}>
        <div style={{ fontSize: '4rem', marginBottom: '16px' }}>
          {pct >= 80 ? '🎉' : pct >= 50 ? '💪' : '📖'}
        </div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>
          Hoàn thành!
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginBottom: '24px' }}>
          Bạn đã thuộc <span style={{ color: 'var(--success)', fontWeight: 700 }}>{knownIds.size}</span> / {words.length} từ ({pct}%)
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="btn btn-primary btn-lg" onClick={restart}>🔄 Học lại</button>
          <Link href={`/topic/${topicId}`} className="btn btn-secondary btn-lg" style={{ textDecoration: 'none' }}>← Chọn chế độ khác</Link>
        </div>
      </div>
    );
  }

  const progress = ((currentIndex) / words.length) * 100;

  return (
    <div className="game-area" ref={containerRef}>
      {/* Progress */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          {currentIndex + 1} / {words.length}
        </span>
        <div style={{ display: 'flex', gap: '12px', fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
          <span>✅ {knownIds.size}</span>
          <span>🔄 {reviewIds.size}</span>
        </div>
      </div>
      <div className="progress-bar" style={{ marginBottom: '24px' }}>
        <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
      </div>

      {/* Flashcard */}
      <div
        className="flashcard-container"
        onClick={() => setIsFlipped((f) => !f)}
        style={{ marginBottom: '24px' }}
      >
        <div className={`flashcard-inner${isFlipped ? ' flipped' : ''}`}>
          {/* Front */}
          <div className="flashcard-face flashcard-front">
            <button
              className="btn btn-ghost btn-sm"
              style={{ position: 'absolute', top: '12px', right: '12px' }}
              onClick={(e) => { e.stopPropagation(); speak(currentWord.english); }}
              title="Phát âm"
            >
              🔊
            </button>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)', textAlign: 'center', marginBottom: '8px' }}>
              {currentWord.english}
            </div>
            {currentWord.ipa && (
              <div className="ipa-text" style={{ marginBottom: '12px' }}>{currentWord.ipa}</div>
            )}
            <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginTop: '16px' }}>
              Nhấn Space hoặc click để xem nghĩa
            </div>
          </div>

          {/* Back */}
          <div className="flashcard-face flashcard-back">
            <div style={{ fontWeight: 800, fontSize: '1.5rem', color: 'var(--text-primary)', textAlign: 'center', marginBottom: '12px' }}>
              {currentWord.vietnamese.join(' / ')}
            </div>
            {currentWord.example && (
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontStyle: 'italic', color: 'var(--text-secondary)', fontSize: '0.9375rem', marginBottom: '4px' }}>
                  &ldquo;{currentWord.example}&rdquo;
                </p>
                {currentWord.exampleVi && (
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                    {currentWord.exampleVi}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <button className="btn btn-secondary" onClick={goPrev} disabled={currentIndex === 0}>
          ← Trước
        </button>
        <button className="btn btn-danger" onClick={markReview} style={{ flex: 1, maxWidth: '180px' }}>
          🔄 Xem lại <kbd style={{ fontSize: '0.75rem', opacity: 0.7 }}>2</kbd>
        </button>
        <button className="btn btn-success" onClick={markKnown} style={{ flex: 1, maxWidth: '180px' }}>
          ✅ Đã thuộc <kbd style={{ fontSize: '0.75rem', opacity: 0.7 }}>1</kbd>
        </button>
      </div>

      <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '12px' }}>
        Space: lật thẻ · ←→: chuyển · 1: thuộc · 2: xem lại
      </p>
    </div>
  );
}

import {
  getWordProgress,
  setWordProgress,
  getAllProgress,
  getKnownCount,
  saveGameResult,
  getGameHistory,
  getStreak,
  updateStreakOnStudy,
  clearAllProgress
} from '../lib/storage';

describe('Storage Helpers', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.useFakeTimers().setSystemTime(new Date('2026-06-27').getTime());
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('should handle word progress correctly', () => {
    const progress = {
      wordId: 'w1',
      topicId: 'travel',
      known: true,
      lastSeen: Date.now(),
    };

    setWordProgress(progress);

    expect(getWordProgress('w1')).toEqual(progress);
    expect(getAllProgress('travel')).toEqual([progress]);
    expect(getKnownCount('travel')).toBe(1);

    // mark as unknown
    setWordProgress({ ...progress, known: false });
    expect(getKnownCount('travel')).toBe(0);
  });

  test('should record game history', () => {
    const result = {
      topicId: 'travel',
      mode: 'flashcard' as const,
      score: 8,
      total: 10,
      date: Date.now(),
    };

    saveGameResult(result);
    expect(getGameHistory()).toEqual([result]);
    expect(getGameHistory(1)).toEqual([result]);
    expect(getGameHistory(0)).toEqual([]);
  });

  test('should update streak on study', () => {
    // Initial streak
    expect(getStreak()).toEqual({ currentStreak: 0, longestStreak: 0, lastStudyDate: '' });

    // Study today
    const s1 = updateStreakOnStudy();
    expect(s1.currentStreak).toBe(1);
    expect(s1.longestStreak).toBe(1);
    expect(s1.lastStudyDate).toBe('2026-06-27');

    // Study same day again should not change streak count
    const s2 = updateStreakOnStudy();
    expect(s2.currentStreak).toBe(1);

    // Mock next day
    jest.setSystemTime(new Date('2026-06-28').getTime());
    const s3 = updateStreakOnStudy();
    expect(s3.currentStreak).toBe(2);
    expect(s3.longestStreak).toBe(2);
    expect(s3.lastStudyDate).toBe('2026-06-28');
  });

  test('should clear all progress', () => {
    setWordProgress({ wordId: 'w1', topicId: 'travel', known: true, lastSeen: Date.now() });
    clearAllProgress();
    expect(getWordProgress('w1')).toBeNull();
  });
});

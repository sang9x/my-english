import type { WordProgress, GameResult, StreakData } from './types';

// ─── Constants ────────────────────────────────────────────────────────────────

const PREFIX = 'myenglish_';

const KEYS = {
  PROGRESS: `${PREFIX}progress`,
  GAME_HISTORY: `${PREFIX}game_history`,
  STREAK: `${PREFIX}streak`,
} as const;

// ─── localStorage helpers ─────────────────────────────────────────────────────

function isStorageAvailable(): boolean {
  try {
    const test = '__storage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
}

function readJSON<T>(key: string): T | null {
  if (!isStorageAvailable()) return null;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function writeJSON<T>(key: string, value: T): void {
  if (!isStorageAvailable()) return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Silently ignore quota exceeded or other storage errors
  }
}

// ─── Progress helpers ─────────────────────────────────────────────────────────

function getAllProgressMap(): Record<string, WordProgress> {
  return readJSON<Record<string, WordProgress>>(KEYS.PROGRESS) ?? {};
}

export function getWordProgress(wordId: string): WordProgress | null {
  const map = getAllProgressMap();
  return map[wordId] ?? null;
}

export function setWordProgress(progress: WordProgress): void {
  const map = getAllProgressMap();
  map[progress.wordId] = progress;
  writeJSON(KEYS.PROGRESS, map);
}

export function getAllProgress(topicId: string): WordProgress[] {
  const map = getAllProgressMap();
  return Object.values(map).filter((p) => p.topicId === topicId);
}

export function getKnownCount(topicId: string): number {
  return getAllProgress(topicId).filter((p) => p.known).length;
}

// ─── Game history ─────────────────────────────────────────────────────────────

export function saveGameResult(result: GameResult): void {
  const history = readJSON<GameResult[]>(KEYS.GAME_HISTORY) ?? [];
  history.unshift(result); // newest first
  writeJSON(KEYS.GAME_HISTORY, history);
}

export function getGameHistory(limit?: number): GameResult[] {
  const history = readJSON<GameResult[]>(KEYS.GAME_HISTORY) ?? [];
  return limit !== undefined ? history.slice(0, limit) : history;
}

// ─── Streak ───────────────────────────────────────────────────────────────────

const DEFAULT_STREAK: StreakData = {
  currentStreak: 0,
  longestStreak: 0,
  lastStudyDate: '',
};

export function getStreak(): StreakData {
  return readJSON<StreakData>(KEYS.STREAK) ?? { ...DEFAULT_STREAK };
}

/**
 * Call this every time the user completes a study session.
 * Returns the updated StreakData.
 */
export function updateStreakOnStudy(): StreakData {
  const streak = getStreak();
  const today = new Date().toISOString().slice(0, 10); // "YYYY-MM-DD"

  if (streak.lastStudyDate === today) {
    // Already studied today — no change
    return streak;
  }

  const yesterday = new Date(Date.now() - 86_400_000).toISOString().slice(0, 10);
  const isConsecutive = streak.lastStudyDate === yesterday;

  const updated: StreakData = {
    currentStreak: isConsecutive ? streak.currentStreak + 1 : 1,
    longestStreak: Math.max(
      streak.longestStreak,
      isConsecutive ? streak.currentStreak + 1 : 1
    ),
    lastStudyDate: today,
  };

  writeJSON(KEYS.STREAK, updated);
  return updated;
}

// ─── Clear all ────────────────────────────────────────────────────────────────

export function clearAllProgress(): void {
  if (!isStorageAvailable()) return;
  try {
    Object.values(KEYS).forEach((key) => localStorage.removeItem(key));
  } catch {
    // Silently ignore
  }
}

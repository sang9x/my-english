// ─── Topic ────────────────────────────────────────────────────────────────────

export interface Topic {
  id: string;
  name: string;
  description: string;
  emoji: string;
  wordCount: number;
  type: 'system' | 'custom';
  shareCode?: string;
}

// ─── Word ─────────────────────────────────────────────────────────────────────

export interface Word {
  id: string;
  topicId: string;
  english: string;
  vietnamese: string[];
  ipa?: string;
  example?: string;
  exampleVi?: string;
}

// ─── Sentence (dùng cho game sắp xếp câu) ────────────────────────────────────

export interface Sentence {
  english: string;
  vietnamese: string;
  words: string[];
}

// ─── Custom Topic / Word ──────────────────────────────────────────────────────

export interface CustomTopic {
  id: string;
  name: string;
  description: string;
  emoji: string;
  shareCode: string;
  createdAt: number;
}

export interface CustomWord {
  id: string;
  topicId: string;
  english: string;
  vietnamese: string[];
  ipa?: string;
  example?: string;
  exampleVi?: string;
  createdAt: number;
}

// ─── Game ─────────────────────────────────────────────────────────────────────

export type GameMode = 'flashcard' | 'sentence' | 'type-en' | 'type-vi';

export interface GameResult {
  topicId: string;
  mode: GameMode;
  score: number;
  total: number;
  date: number; // Unix timestamp (ms)
}

// ─── Progress ─────────────────────────────────────────────────────────────────

export interface WordProgress {
  wordId: string;
  topicId: string;
  known: boolean;
  lastSeen: number; // Unix timestamp (ms)
}

// ─── Streak ───────────────────────────────────────────────────────────────────

export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastStudyDate: string; // ISO date string "YYYY-MM-DD"
}

// ─── Dictionary Lookup ────────────────────────────────────────────────────────

export interface LookupDefinition {
  partOfSpeech: string;
  definition: string;
  example?: string;
}

export interface LookupResult {
  word: string;
  ipa?: string;
  definitions: LookupDefinition[];
  found: boolean;
}

// ─── Bulk Import ──────────────────────────────────────────────────────────────

export type BulkImportStatus = 'valid' | 'error' | 'duplicate';

export interface BulkImportRow {
  english: string;
  vietnamese: string[];
  ipa?: string;
  status: BulkImportStatus;
  error?: string;
}

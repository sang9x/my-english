import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

// ============================================================
// Database singleton
// ============================================================
let _db: Database.Database | null = null;

function getDb(): Database.Database {
  if (_db) return _db;

  const dataDir = path.join(process.cwd(), "data");
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  const dbPath = path.join(dataDir, "custom.db");
  _db = new Database(dbPath);

  // Enable WAL mode for better concurrent performance
  _db.pragma("journal_mode = WAL");
  _db.pragma("foreign_keys = ON");

  initSchema(_db);
  return _db;
}

// ============================================================
// Schema initialization
// ============================================================
function initSchema(db: Database.Database): void {
  db.exec(`
    CREATE TABLE IF NOT EXISTS topics (
      id         TEXT PRIMARY KEY,
      name       TEXT NOT NULL,
      description TEXT DEFAULT '',
      emoji      TEXT DEFAULT '📚',
      shareCode  TEXT UNIQUE NOT NULL,
      createdAt  INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS words (
      id          TEXT PRIMARY KEY,
      topicId     TEXT NOT NULL REFERENCES topics(id) ON DELETE CASCADE,
      english     TEXT NOT NULL,
      vietnamese  TEXT NOT NULL,
      ipa         TEXT DEFAULT '',
      example     TEXT DEFAULT '',
      exampleVi   TEXT DEFAULT '',
      createdAt   INTEGER NOT NULL,
      UNIQUE(topicId, english)
    );

    CREATE INDEX IF NOT EXISTS idx_words_topicId ON words(topicId);
    CREATE INDEX IF NOT EXISTS idx_topics_shareCode ON topics(shareCode);
  `);
}

// ============================================================
// Topic helpers
// ============================================================
export interface DbTopic {
  id: string;
  name: string;
  description: string;
  emoji: string;
  shareCode: string;
  createdAt: number;
  wordCount?: number;
}

export interface DbWord {
  id: string;
  topicId: string;
  english: string;
  vietnamese: string; // JSON string of string[]
  ipa: string;
  example: string;
  exampleVi: string;
  createdAt: number;
}

export function getAllTopics(): DbTopic[] {
  const db = getDb();
  const rows = db
    .prepare(
      `SELECT t.*, COUNT(w.id) as wordCount
       FROM topics t
       LEFT JOIN words w ON w.topicId = t.id
       GROUP BY t.id
       ORDER BY t.createdAt DESC`
    )
    .all() as DbTopic[];
  return rows;
}

export function getTopicById(id: string): DbTopic | null {
  const db = getDb();
  const row = db
    .prepare(
      `SELECT t.*, COUNT(w.id) as wordCount
       FROM topics t
       LEFT JOIN words w ON w.topicId = t.id
       WHERE t.id = ?
       GROUP BY t.id`
    )
    .get(id) as DbTopic | undefined;
  return row ?? null;
}

export function getTopicByShareCode(shareCode: string): DbTopic | null {
  const db = getDb();
  const row = db
    .prepare(
      `SELECT t.*, COUNT(w.id) as wordCount
       FROM topics t
       LEFT JOIN words w ON w.topicId = t.id
       WHERE t.shareCode = ?
       GROUP BY t.id`
    )
    .get(shareCode) as DbTopic | undefined;
  return row ?? null;
}

export function createTopic(data: {
  id: string;
  name: string;
  description?: string;
  emoji?: string;
  shareCode: string;
}): DbTopic {
  const db = getDb();
  const now = Date.now();
  db.prepare(
    `INSERT INTO topics (id, name, description, emoji, shareCode, createdAt)
     VALUES (?, ?, ?, ?, ?, ?)`
  ).run(
    data.id,
    data.name,
    data.description ?? "",
    data.emoji ?? "📚",
    data.shareCode,
    now
  );
  return getTopicById(data.id)!;
}

export function updateTopic(
  id: string,
  data: Partial<{ name: string; description: string; emoji: string }>
): DbTopic | null {
  const db = getDb();
  const fields: string[] = [];
  const values: unknown[] = [];

  if (data.name !== undefined) { fields.push("name = ?"); values.push(data.name); }
  if (data.description !== undefined) { fields.push("description = ?"); values.push(data.description); }
  if (data.emoji !== undefined) { fields.push("emoji = ?"); values.push(data.emoji); }

  if (fields.length === 0) return getTopicById(id);

  values.push(id);
  db.prepare(`UPDATE topics SET ${fields.join(", ")} WHERE id = ?`).run(...values);
  return getTopicById(id);
}

export function deleteTopic(id: string): boolean {
  const db = getDb();
  const result = db.prepare("DELETE FROM topics WHERE id = ?").run(id);
  return result.changes > 0;
}

// ============================================================
// Word helpers
// ============================================================
export function getWordsByTopicId(topicId: string): DbWord[] {
  const db = getDb();
  return db
    .prepare("SELECT * FROM words WHERE topicId = ? ORDER BY createdAt DESC")
    .all(topicId) as DbWord[];
}

export function getWordById(id: string): DbWord | null {
  const db = getDb();
  const row = db.prepare("SELECT * FROM words WHERE id = ?").get(id) as DbWord | undefined;
  return row ?? null;
}

export function addWord(data: {
  id: string;
  topicId: string;
  english: string;
  vietnamese: string[]; // will be stored as JSON
  ipa?: string;
  example?: string;
  exampleVi?: string;
}): { success: boolean; duplicate: boolean; word?: DbWord } {
  const db = getDb();
  const now = Date.now();

  // Check duplicate
  const existing = db
    .prepare("SELECT id FROM words WHERE topicId = ? AND LOWER(english) = LOWER(?)")
    .get(data.topicId, data.english);
  if (existing) return { success: false, duplicate: true };

  db.prepare(
    `INSERT INTO words (id, topicId, english, vietnamese, ipa, example, exampleVi, createdAt)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
  ).run(
    data.id,
    data.topicId,
    data.english,
    JSON.stringify(data.vietnamese),
    data.ipa ?? "",
    data.example ?? "",
    data.exampleVi ?? "",
    now
  );

  return { success: true, duplicate: false, word: getWordById(data.id) ?? undefined };
}

export function updateWord(
  id: string,
  data: Partial<{
    english: string;
    vietnamese: string[];
    ipa: string;
    example: string;
    exampleVi: string;
  }>
): DbWord | null {
  const db = getDb();
  const fields: string[] = [];
  const values: unknown[] = [];

  if (data.english !== undefined) { fields.push("english = ?"); values.push(data.english); }
  if (data.vietnamese !== undefined) { fields.push("vietnamese = ?"); values.push(JSON.stringify(data.vietnamese)); }
  if (data.ipa !== undefined) { fields.push("ipa = ?"); values.push(data.ipa); }
  if (data.example !== undefined) { fields.push("example = ?"); values.push(data.example); }
  if (data.exampleVi !== undefined) { fields.push("exampleVi = ?"); values.push(data.exampleVi); }

  if (fields.length === 0) return getWordById(id);
  values.push(id);
  db.prepare(`UPDATE words SET ${fields.join(", ")} WHERE id = ?`).run(...values);
  return getWordById(id);
}

export function deleteWord(id: string): boolean {
  const db = getDb();
  const result = db.prepare("DELETE FROM words WHERE id = ?").run(id);
  return result.changes > 0;
}

export interface BulkAddResult {
  added: number;
  duplicates: number;
  errors: number;
  results: Array<{ english: string; status: "added" | "duplicate" | "error"; error?: string }>;
}

export function bulkAddWords(
  topicId: string,
  words: Array<{
    id: string;
    english: string;
    vietnamese: string[];
    ipa?: string;
    example?: string;
    exampleVi?: string;
  }>
): BulkAddResult {
  const db = getDb();
  const result: BulkAddResult = { added: 0, duplicates: 0, errors: 0, results: [] };

  const insertMany = db.transaction(() => {
    for (const word of words) {
      try {
        const res = addWord({ ...word, topicId });
        if (res.success) {
          result.added++;
          result.results.push({ english: word.english, status: "added" });
        } else if (res.duplicate) {
          result.duplicates++;
          result.results.push({ english: word.english, status: "duplicate" });
        }
      } catch (err) {
        result.errors++;
        result.results.push({
          english: word.english,
          status: "error",
          error: err instanceof Error ? err.message : "Unknown error",
        });
      }
    }
  });

  insertMany();
  return result;
}

// ============================================================
// Clone topic (for share feature)
// ============================================================
export function cloneTopic(shareCode: string, newId: string, newShareCode: string): DbTopic | null {
  const source = getTopicByShareCode(shareCode);
  if (!source) return null;

  const db = getDb();
  const words = getWordsByTopicId(source.id);

  const now = Date.now();
  const cloneAll = db.transaction(() => {
    db.prepare(
      `INSERT INTO topics (id, name, description, emoji, shareCode, createdAt)
       VALUES (?, ?, ?, ?, ?, ?)`
    ).run(newId, source.name, source.description, source.emoji, newShareCode, now);

    const insertWord = db.prepare(
      `INSERT INTO words (id, topicId, english, vietnamese, ipa, example, exampleVi, createdAt)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
    );

    for (const word of words) {
      const { nanoid } = require("nanoid");
      insertWord.run(
        nanoid(),
        newId,
        word.english,
        word.vietnamese,
        word.ipa,
        word.example,
        word.exampleVi,
        now
      );
    }
  });

  cloneAll();
  return getTopicById(newId);
}

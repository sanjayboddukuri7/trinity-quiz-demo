/**
 * Trinity Quiz (Prototype) keeps everything in the visitor's browser (localStorage).
 * There is no server, database or login: this is a prototype for Trinity Tech clients.
 */

export interface Profile {
  id: string;
  name: string;
}

export interface AnswerRecord {
  qid: string;
  sel: number | null;
  correct: boolean;
}

export interface Attempt {
  id: string;
  userId: string;
  studentName: string;
  quizId: string;
  topicId: string;
  quizTitle: string;
  score: number;
  total: number;
  percentage: number;
  timeTakenSeconds: number;
  answers: AnswerRecord[];
  submittedAt: string;
}

const PREFIX = 'trinity-quiz-demo:';
const ATTEMPTS_KEY = PREFIX + 'attempts';
const NAME_KEY = PREFIX + 'name';
export const DEMO_USER_ID = 'demo';

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // storage full or blocked: progress just won't persist
  }
}

export function loadProfile(): Profile {
  return { id: DEMO_USER_ID, name: read<string>(NAME_KEY, '') || 'Guest' };
}

export function saveName(name: string): Profile {
  write(NAME_KEY, name.trim().slice(0, 24));
  return loadProfile();
}

/** Newest first. */
export function loadAttempts(): Attempt[] {
  const list = read<Attempt[]>(ATTEMPTS_KEY, []);
  return Array.isArray(list) ? list : [];
}

export function saveAttempt(a: Attempt): Attempt {
  write(ATTEMPTS_KEY, [a, ...loadAttempts().filter(x => x.id !== a.id)].slice(0, 200));
  return a;
}

/** Clears every result, draft and the saved name. */
export function resetDemo(): void {
  try {
    Object.keys(localStorage)
      .filter(k => k.startsWith(PREFIX))
      .forEach(k => localStorage.removeItem(k));
  } catch {
    /* ignore */
  }
}

/** In-progress quiz drafts, kept in this browser so a set can be resumed later. */
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
    if (value === undefined) localStorage.removeItem(key);
    else localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // storage full or blocked: in-progress saving is a convenience only
  }
}

export interface QuizDraft {
  answers: (number | null)[];
  flagged: number[];
  current: number;
  elapsed: number;
  savedAt: string;
}

const draftKey = (userId: string, quizId: string) => `trinity-quiz-demo:draft_${userId}_${quizId}`;

export const loadDraft = (userId: string, quizId: string) => read<QuizDraft | null>(draftKey(userId, quizId), null);
export const saveDraft = (userId: string, quizId: string, draft: QuizDraft) => write(draftKey(userId, quizId), draft);
export const clearDraft = (userId: string, quizId: string) => write(draftKey(userId, quizId), undefined);

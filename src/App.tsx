import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CATEGORIES, QUESTIONS, type CategoryId, type Question } from "./questions";

const TRINITY_URL = "https://trinity-tech.vercel.app";
const START_PROJECT_URL = `${TRINITY_URL}/project?category=${encodeURIComponent("Quiz App")}`;
const SECONDS_PER_QUESTION = 15;
const MIXED_ROUND = 10;
const BOARD_KEY = "trinity-quiz-demo:leaderboard";
const NAME_KEY = "trinity-quiz-demo:name";

type Screen = "start" | "play" | "result" | "board";
type PickId = CategoryId | "mixed";

interface Answer {
  question: Question;
  picked: number; // -1 = time ran out
  points: number;
}

interface BoardEntry {
  name: string;
  score: number;
  correct: number;
  total: number;
  category: string;
  date: string;
}

const shuffle = <T,>(list: T[]): T[] => {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

// Shuffle the options too, keeping track of where the right answer went.
const prepare = (q: Question): Question => {
  const order = shuffle(q.options.map((_, i) => i));
  return { ...q, options: order.map((i) => q.options[i]), answer: order.indexOf(q.answer) };
};

const buildRound = (cat: PickId): Question[] => {
  const pool = cat === "mixed" ? shuffle(QUESTIONS).slice(0, MIXED_ROUND) : shuffle(QUESTIONS.filter((q) => q.category === cat));
  return pool.map(prepare);
};

const loadBoard = (): BoardEntry[] => {
  try {
    const raw = JSON.parse(localStorage.getItem(BOARD_KEY) || "[]");
    return Array.isArray(raw) ? raw : [];
  } catch {
    return [];
  }
};

const saveBoard = (entries: BoardEntry[]) => {
  try {
    localStorage.setItem(BOARD_KEY, JSON.stringify(entries));
  } catch {
    /* storage full or blocked: the leaderboard is optional */
  }
};

const verdict = (pct: number) =>
  pct === 100 ? "Perfect score! 🏆" : pct >= 80 ? "Brilliant! 🌟" : pct >= 50 ? "Nice work! 👏" : "Good try — play again! 💪";

export default function App() {
  const [screen, setScreen] = useState<Screen>("start");
  const [category, setCategory] = useState<PickId>("gk");
  const [name, setName] = useState(() => localStorage.getItem(NAME_KEY) || "");
  const [round, setRound] = useState<Question[]>([]);
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [timeLeft, setTimeLeft] = useState(SECONDS_PER_QUESTION);
  const [streak, setStreak] = useState(0);
  const [board, setBoard] = useState<BoardEntry[]>(loadBoard);
  const [lastEntry, setLastEntry] = useState<BoardEntry | null>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  const question = round[index];
  const score = answers.reduce((s, a) => s + a.points, 0);
  const correctCount = answers.filter((a) => a.picked === a.question.answer).length;
  const categoryName = CATEGORIES.find((c) => c.id === category)?.name ?? "";

  const start = () => {
    const clean = name.trim().slice(0, 20);
    setName(clean);
    try {
      localStorage.setItem(NAME_KEY, clean);
    } catch {
      /* ignore */
    }
    setRound(buildRound(category));
    setIndex(0);
    setPicked(null);
    setAnswers([]);
    setStreak(0);
    setTimeLeft(SECONDS_PER_QUESTION);
    setScreen("play");
  };

  const answer = useCallback(
    (choice: number) => {
      if (!question || picked !== null) return;
      const right = choice === question.answer;
      // 100 points for a right answer + up to 75 bonus points for speed
      const points = right ? 100 + Math.round((timeLeft / SECONDS_PER_QUESTION) * 75) : 0;
      setPicked(choice);
      setStreak((s) => (right ? s + 1 : 0));
      setAnswers((list) => [...list, { question, picked: choice, points }]);
    },
    [question, picked, timeLeft],
  );

  const finish = (all: Answer[]) => {
    const entry: BoardEntry = {
      name: name || "Guest",
      score: all.reduce((s, a) => s + a.points, 0),
      correct: all.filter((a) => a.picked === a.question.answer).length,
      total: all.length,
      category: categoryName,
      date: new Date().toISOString(),
    };
    const next = [...board, entry].sort((a, b) => b.score - a.score).slice(0, 10);
    setBoard(next);
    saveBoard(next);
    setLastEntry(entry);
    setScreen("result");
  };

  const next = () => {
    if (index + 1 >= round.length) return finish(answers);
    setIndex(index + 1);
    setPicked(null);
    setTimeLeft(SECONDS_PER_QUESTION);
  };

  // Countdown while a question is open; time out counts as a wrong answer.
  useEffect(() => {
    if (screen !== "play" || picked !== null) return;
    if (timeLeft <= 0) {
      answer(-1);
      return;
    }
    const t = window.setTimeout(() => setTimeLeft((s) => s - 1), 1000);
    return () => window.clearTimeout(t);
  }, [screen, picked, timeLeft, answer]);

  // Keyboard: 1-4 to answer, Enter for next question.
  useEffect(() => {
    if (screen !== "play") return;
    const onKey = (e: KeyboardEvent) => {
      if (picked === null && /^[1-4]$/.test(e.key)) answer(Number(e.key) - 1);
      else if (picked !== null && e.key === "Enter") nextRef.current?.click();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [screen, picked, answer]);

  useEffect(() => {
    if (picked !== null) nextRef.current?.focus();
  }, [picked]);

  const shareText = useMemo(() => {
    if (!lastEntry) return "";
    return `I scored ${lastEntry.score} points (${lastEntry.correct}/${lastEntry.total}) in Trinity Quiz (Demo) — ${lastEntry.category}. Can you beat me? ${window.location.origin}\n\nA demo project by Trinity Tech.`;
  }, [lastEntry]);

  return (
    <div className="app">
      <div className="demo-ribbon" role="note">
        <span className="demo-pill">DEMO</span>
        This is a sample project by Trinity Tech — scores are saved only in your browser.
        <a href={START_PROJECT_URL} target="_blank" rel="noreferrer">
          Get a quiz like this →
        </a>
      </div>

      <header className="top">
        <button className="brand" onClick={() => setScreen("start")} aria-label="Trinity Quiz (Demo) home">
          <img src="/mark.png" alt="" width={40} height={30} />
          <span>
            <strong>Trinity Quiz</strong>
            <small>(Demo) · by Trinity Tech</small>
          </span>
        </button>
        <button className="ghost" onClick={() => setScreen("board")}>
          🏆 Leaderboard
        </button>
      </header>

      <main className="stage">
        {screen === "start" && (
          <section className="card intro" aria-labelledby="intro-title">
            <p className="kicker">Demo by Trinity Tech</p>
            <h1 id="intro-title">
              Trinity Quiz <span className="gold">(Demo)</span>
            </h1>
            <p className="lead">
              Pick a topic, beat the {SECONDS_PER_QUESTION}-second timer and climb the leaderboard. Faster right answers earn bonus
              points.
            </p>

            <label className="field">
              <span>Your name (for the leaderboard)</span>
              <input value={name} maxLength={20} placeholder="Guest" onChange={(e) => setName(e.target.value)} />
            </label>

            <fieldset className="cats">
              <legend>Choose a topic</legend>
              {CATEGORIES.map((c) => {
                const count = c.id === "mixed" ? MIXED_ROUND : QUESTIONS.filter((q) => q.category === c.id).length;
                return (
                  <button
                    key={c.id}
                    type="button"
                    className={"cat" + (category === c.id ? " on" : "")}
                    aria-pressed={category === c.id}
                    onClick={() => setCategory(c.id)}
                  >
                    <span className="cat-icon" aria-hidden>
                      {c.icon}
                    </span>
                    <b>{c.name}</b>
                    <small>
                      {c.blurb} · {count} questions
                    </small>
                  </button>
                );
              })}
            </fieldset>

            <button className="primary big" onClick={start}>
              Start quiz
            </button>
          </section>
        )}

        {screen === "play" && question && (
          <section className="card play" aria-live="polite">
            <div className="hud">
              <span>
                Question <b>{index + 1}</b> / {round.length}
              </span>
              <span>{streak >= 2 ? `🔥 ${streak} in a row` : categoryName}</span>
              <span>
                Score <b>{score}</b>
              </span>
            </div>
            <div className="progress" aria-hidden>
              <i style={{ width: `${(index / round.length) * 100}%` }} />
            </div>

            <div className={"timer" + (timeLeft <= 5 && picked === null ? " low" : "")} aria-label={`${timeLeft} seconds left`}>
              <svg viewBox="0 0 44 44" aria-hidden>
                <circle cx="22" cy="22" r="19" className="track" />
                <circle
                  cx="22"
                  cy="22"
                  r="19"
                  className="ring"
                  style={{ strokeDashoffset: `${119.4 * (1 - timeLeft / SECONDS_PER_QUESTION)}` }}
                />
              </svg>
              <span>{timeLeft}</span>
            </div>

            <h2 className="q">{question.text}</h2>

            <div className="options">
              {question.options.map((opt, i) => {
                const state =
                  picked === null ? "" : i === question.answer ? " right" : i === picked ? " wrong" : " dim";
                return (
                  <button key={opt} className={"option" + state} disabled={picked !== null} onClick={() => answer(i)}>
                    <kbd>{i + 1}</kbd>
                    {opt}
                  </button>
                );
              })}
            </div>

            {picked !== null && (
              <div className={"feedback " + (picked === question.answer ? "ok" : "bad")}>
                <p>
                  <b>
                    {picked === question.answer
                      ? `Correct! +${answers[answers.length - 1]?.points ?? 0} points`
                      : picked === -1
                        ? "Time's up!"
                        : "Not quite."}
                  </b>{" "}
                  {question.explain}
                </p>
                <button ref={nextRef} className="primary" onClick={next}>
                  {index + 1 >= round.length ? "See results" : "Next question →"}
                </button>
              </div>
            )}
          </section>
        )}

        {screen === "result" && lastEntry && (
          <section className="card result">
            <p className="kicker">Round complete · {lastEntry.category}</p>
            <h1>{verdict(Math.round((correctCount / round.length) * 100))}</h1>
            <div className="stats">
              <div>
                <b>{lastEntry.score}</b>
                <span>points</span>
              </div>
              <div>
                <b>
                  {lastEntry.correct}/{lastEntry.total}
                </b>
                <span>correct</span>
              </div>
              <div>
                <b>{Math.round((lastEntry.correct / lastEntry.total) * 100)}%</b>
                <span>accuracy</span>
              </div>
            </div>

            <div className="actions">
              <button className="primary" onClick={start}>
                Play again
              </button>
              <a className="whatsapp" href={`https://wa.me/?text=${encodeURIComponent(shareText)}`} target="_blank" rel="noreferrer">
                Share on WhatsApp
              </a>
              <button className="ghost" onClick={() => setScreen("start")}>
                Change topic
              </button>
            </div>

            <details className="review">
              <summary>Review your answers</summary>
              <ol>
                {answers.map((a) => (
                  <li key={a.question.id} className={a.picked === a.question.answer ? "ok" : "bad"}>
                    <p>{a.question.text}</p>
                    <small>
                      {a.picked === a.question.answer
                        ? `✔ ${a.question.options[a.question.answer]}`
                        : `✘ ${a.picked === -1 ? "No answer" : a.question.options[a.picked]} — answer: ${a.question.options[a.question.answer]}`}
                    </small>
                  </li>
                ))}
              </ol>
            </details>

            <Leaderboard entries={board} highlight={lastEntry} />
          </section>
        )}

        {screen === "board" && (
          <section className="card">
            <p className="kicker">Top 10 on this device</p>
            <h1>Leaderboard</h1>
            <Leaderboard entries={board} />
            <div className="actions">
              <button className="primary" onClick={() => setScreen("start")}>
                Play now
              </button>
              {board.length > 0 && (
                <button
                  className="ghost"
                  onClick={() => {
                    setBoard([]);
                    saveBoard([]);
                  }}
                >
                  Clear leaderboard
                </button>
              )}
            </div>
          </section>
        )}
      </main>

      <footer className="foot">
        <p>
          <b>Trinity Quiz (Demo)</b> is a demo project by{" "}
          <a href={TRINITY_URL} target="_blank" rel="noreferrer">
            Trinity Tech
          </a>
          . Questions and scores are samples for demonstration only.
        </p>
        <a className="cta" href={START_PROJECT_URL} target="_blank" rel="noreferrer">
          Want a quiz for your brand, school or event? Start a project with Trinity Tech
        </a>
      </footer>
    </div>
  );
}

function Leaderboard({ entries, highlight }: { entries: BoardEntry[]; highlight?: BoardEntry }) {
  if (!entries.length) return <p className="empty">No scores yet — be the first to play!</p>;
  return (
    <table className="board">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Topic</th>
          <th className="num">Correct</th>
          <th className="num">Points</th>
        </tr>
      </thead>
      <tbody>
        {entries.map((e, i) => (
          <tr key={e.date + i} className={highlight && e.date === highlight.date ? "me" : ""}>
            <td>{i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : i + 1}</td>
            <td>{e.name}</td>
            <td>{e.category}</td>
            <td className="num">
              {e.correct}/{e.total}
            </td>
            <td className="num">
              <b>{e.score}</b>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

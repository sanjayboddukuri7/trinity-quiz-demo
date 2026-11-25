import { useCallback, useEffect, useState, type ReactNode } from 'react';
import { AnimatePresence } from 'motion/react';
import { House, History as HistoryIcon } from 'lucide-react';
import { loadAttempts, loadProfile, resetDemo, saveAttempt, saveName, type Attempt, type Profile } from '../lib/store';
import { TOPICS, getQuiz, getTopic, quizzesForTopic } from '../lib/bank';
import { navigate, Redirect, useRoute } from '../lib/router';
import { Shell, type NavSection } from '../components/Shell';
import { QuizPlayer } from '../components/QuizPlayer';
import { Modal, TopicIcon } from '../components/ui';
import { Home } from './Home';
import { TopicView } from './TopicView';
import { HistoryView } from './HistoryView';
import { ResultView } from './ResultView';

export interface StudentData {
  profile: Profile;
  attempts: Attempt[];
  isLocked: (quizId: string) => boolean;
  visibleTopics: typeof TOPICS;
}

// Every set is open in the prototype.
const isLocked = () => false;

export function StudentApp() {
  const route = useRoute();
  const [profile, setProfile] = useState<Profile>(loadProfile);
  const [attempts, setAttempts] = useState<Attempt[]>(loadAttempts);
  const [toast, setToast] = useState('');
  const [nameOpen, setNameOpen] = useState(false);
  const [nameDraft, setNameDraft] = useState('');
  const [resetOpen, setResetOpen] = useState(false);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(''), 3500);
    return () => clearTimeout(t);
  }, [toast]);

  const handleSubmit = useCallback(async (quizId: string, answers: (number | null)[], elapsed: number) => {
    const quiz = getQuiz(quizId)!;
    const records = quiz.questions.map((q, i) => ({ qid: q.id, sel: answers[i], correct: answers[i] === q.answer }));
    const score = records.filter(r => r.correct).length;
    const attempt = saveAttempt({
      id: crypto.randomUUID(),
      userId: profile.id,
      studentName: profile.name,
      quizId: quiz.id,
      topicId: quiz.topicId,
      quizTitle: quiz.title,
      score,
      total: quiz.questions.length,
      percentage: Math.round((score / quiz.questions.length) * 100),
      timeTakenSeconds: elapsed,
      answers: records,
      submittedAt: new Date().toISOString(),
    });
    setAttempts(prev => [attempt, ...prev.filter(a => a.id !== attempt.id)]);
    navigate(`result/${attempt.id}`, { replace: true });
  }, [profile]);

  const openNameEditor = () => {
    setNameDraft(profile.name === 'Guest' ? '' : profile.name);
    setNameOpen(true);
  };
  const commitName = () => {
    setProfile(saveName(nameDraft));
    setNameOpen(false);
  };

  const [view, param] = route;
  const data: StudentData = { profile, attempts, isLocked, visibleTopics: TOPICS };

  // Focus mode: the quiz runs full-screen without the sidebar.
  if (view === 'quiz' && param) {
    const quiz = getQuiz(param);
    if (!quiz) return <Redirect to="" />;
    return (
      <QuizPlayer
        key={quiz.id}
        quiz={quiz}
        userId={profile.id}
        onSubmit={(answers, elapsed) => handleSubmit(quiz.id, answers, elapsed)}
        onExit={() => navigate(`topic/${quiz.topicId}`)}
      />
    );
  }

  const completedIn = (topicId: string) =>
    new Set(attempts.filter(a => a.topicId === topicId).map(a => a.quizId)).size;

  const sections: NavSection[] = [
    {
      items: [
        { key: 'home', label: 'Dashboard', href: '', icon: <House className="w-4 h-4" strokeWidth={1.75} /> },
        { key: 'history', label: 'My results', href: 'history', icon: <HistoryIcon className="w-4 h-4" strokeWidth={1.75} />, meta: attempts.length || undefined },
      ],
    },
    {
      label: 'Topics',
      items: TOPICS.map(t => ({
        key: `topic-${t.id}`,
        label: t.title,
        href: `topic/${t.id}`,
        icon: <TopicIcon icon={t.icon} />,
        meta: `${completedIn(t.id)}/${quizzesForTopic(t.id).length}`,
      })),
    },
  ];

  let activeKey = 'home';
  let content: ReactNode;
  if (view === 'topic' && param && getTopic(param)) {
    activeKey = `topic-${param}`;
    content = <TopicView key={param} topicId={param} data={data} />;
  } else if (view === 'history') {
    activeKey = 'history';
    content = <HistoryView key="history" data={data} />;
  } else if (view === 'result' && param) {
    const attempt = attempts.find(a => a.id === param);
    activeKey = attempt ? `topic-${attempt.topicId}` : 'history';
    content = <ResultView key={param} attempt={attempt} data={data} />;
  } else {
    content = <Home key="home" data={data} onEditName={openNameEditor} />;
  }

  return (
    <Shell
      sections={sections}
      activeKey={activeKey}
      user={{ name: profile.name, subtitle: 'Prototype visitor · tap to rename' }}
      onEditName={openNameEditor}
      onReset={() => setResetOpen(true)}
    >
      <AnimatePresence mode="wait">{content}</AnimatePresence>

      <Modal
        open={nameOpen}
        onClose={() => setNameOpen(false)}
        title="What should we call you?"
        footer={
          <>
            <button className="btn-outline" onClick={() => setNameOpen(false)}>Cancel</button>
            <button className="btn-primary" onClick={commitName}>Save</button>
          </>
        }
      >
        <p className="mb-3">Your name shows on your dashboard and results. It is saved only in this browser.</p>
        <input
          autoFocus
          value={nameDraft}
          maxLength={24}
          placeholder="Guest"
          onChange={e => setNameDraft(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && commitName()}
          className="w-full h-11 rounded-lg border border-line px-3 text-[15px] text-ink focus:border-brand"
        />
      </Modal>

      <Modal
        open={resetOpen}
        onClose={() => setResetOpen(false)}
        title="Reset the prototype?"
        footer={
          <>
            <button className="btn-outline" onClick={() => setResetOpen(false)}>Cancel</button>
            <button
              className="btn-danger"
              onClick={() => {
                resetDemo();
                setAttempts([]);
                setProfile(loadProfile());
                setResetOpen(false);
                setToast('Prototype reset. Every set is fresh again.');
                navigate('', { replace: true });
              }}
            >
              Reset
            </button>
          </>
        }
      >
        This clears your name, results and in-progress sets from this browser so you can try the prototype from the start.
      </Modal>

      {toast && (
        <div role="status" className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 bg-ink text-white text-sm px-4 py-2.5 rounded-lg shadow-lift max-w-[90vw]">
          {toast}
        </div>
      )}
    </Shell>
  );
}

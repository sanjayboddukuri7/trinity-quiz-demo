import { useEffect, useState, type ReactNode } from 'react';
import { motion, AnimatePresence, animate } from 'motion/react';
import {
  Globe, Landmark, Atom, Rocket, Trophy, Palette, BookOpen, LoaderCircle, X, ArrowUpRight,
  type LucideIcon,
} from 'lucide-react';

export const TRINITY_URL = 'https://trinity-tech.vercel.app';
export const START_PROJECT_URL = `${TRINITY_URL}/project?category=${encodeURIComponent('Quiz App')}`;

const ICONS: Record<string, LucideIcon> = {
  globe: Globe,
  landmark: Landmark,
  atom: Atom,
  rocket: Rocket,
  trophy: Trophy,
  palette: Palette,
};

/** Gold strip shown on every screen so visitors know this is a sample project. */
export function DemoRibbon() {
  return (
    <div role="note" className="bg-gradient-to-r from-[#b8741a] via-[#e8a33d] to-[#f6d28a] text-[#1b1407] text-[12.5px]">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-2 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center">
        <span className="rounded-full bg-[#1b1407] text-[#f6c66b] px-2 py-0.5 text-[10.5px] font-bold tracking-[0.14em]">DEMO</span>
        <span>Sample project by Trinity Tech. Your progress is saved only in this browser.</span>
        <a href={START_PROJECT_URL} target="_blank" rel="noreferrer" className="font-semibold underline underline-offset-2 inline-flex items-center gap-0.5">
          Get a quiz like this <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}

export function DemoFooter() {
  return (
    <footer className="max-w-6xl mx-auto px-4 sm:px-8 pb-10">
      <div className="border-t border-line pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[13px] text-ink-muted">
        <p>
          <span className="font-semibold text-ink">Trinity Quiz (Demo)</span> is a demo project by{' '}
          <a href={TRINITY_URL} target="_blank" rel="noreferrer" className="font-semibold text-brand hover:underline">Trinity Tech</a>.
          Questions and results are samples for demonstration only.
        </p>
        <a href={START_PROJECT_URL} target="_blank" rel="noreferrer" className="btn-outline shrink-0">
          Build a quiz for your brand <ArrowUpRight className="w-4 h-4" />
        </a>
      </div>
    </footer>
  );
}

export function TopicIcon({ icon, className = 'w-4 h-4' }: { icon: string; className?: string }) {
  const Icon = ICONS[icon] ?? BookOpen;
  return <Icon className={className} strokeWidth={1.75} aria-hidden />;
}

export function Spinner({ className = 'w-5 h-5' }: { className?: string }) {
  return <LoaderCircle className={`${className} animate-spin`} aria-hidden />;
}

/** Fades/slides page content in; keyed by the caller so route changes animate. */
export function Page({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function PageHeader({ eyebrow, title, children, actions }: { eyebrow?: string; title: ReactNode; children?: ReactNode; actions?: ReactNode }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-8">
      <div className="min-w-0">
        {eyebrow && <div className="eyebrow mb-2">{eyebrow}</div>}
        <h1 className="page-title">{title}</h1>
        {children && <p className="mt-2 text-[15px] text-ink-muted max-w-2xl">{children}</p>}
      </div>
      {actions && <div className="flex flex-wrap gap-2 shrink-0">{actions}</div>}
    </div>
  );
}

export function CountUp({ value, duration = 0.9, suffix = '' }: { value: number; duration?: number; suffix?: string }) {
  const [shown, setShown] = useState(0);
  useEffect(() => {
    const controls = animate(0, value, { duration, ease: [0.22, 1, 0.36, 1], onUpdate: v => setShown(Math.round(v)) });
    return () => controls.stop();
  }, [value, duration]);
  return <span className="tabular">{shown}{suffix}</span>;
}

export function ScoreRing({ pct, size = 148, stroke = 10, children }: { pct: number; size?: number; stroke?: number; children?: ReactNode }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const color = pct >= 70 ? '#17784C' : pct >= 50 ? '#A86A12' : '#C2392C';
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#ECE9E2" strokeWidth={stroke} />
        <motion.circle
          cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: c * (1 - pct / 100) }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">{children}</div>
    </div>
  );
}

export function ProgressBar({ value, className = '', tone = 'brand' }: { value: number; className?: string; tone?: 'brand' | 'good' | 'ink' }) {
  const color = tone === 'good' ? 'bg-good' : tone === 'ink' ? 'bg-ink' : 'bg-brand';
  return (
    <div className={`h-1.5 rounded-full bg-black/[0.06] overflow-hidden ${className}`}>
      <motion.div
        className={`h-full rounded-full ${color}`}
        initial={{ width: 0 }}
        animate={{ width: `${Math.max(0, Math.min(100, value))}%` }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}

export function Stat({ label, value, hint }: { label: string; value: ReactNode; hint?: ReactNode }) {
  return (
    <div className="card p-5">
      <div className="eyebrow">{label}</div>
      <div className="mt-2 font-display text-[32px] leading-none font-semibold tabular">{value}</div>
      {hint && <div className="mt-2 text-xs text-ink-muted">{hint}</div>}
    </div>
  );
}

export function ScoreBadge({ pct }: { pct: number }) {
  const cls = pct >= 70 ? 'bg-good-soft text-good' : pct >= 50 ? 'bg-warn-soft text-warn' : 'bg-bad-soft text-bad';
  return <span className={`chip tabular font-semibold ${cls}`}>{pct}%</span>;
}

export function Empty({ title, children, action }: { title: string; children?: ReactNode; action?: ReactNode }) {
  return (
    <div className="card px-6 py-12 text-center">
      <div className="mx-auto mb-4 w-10 h-10 rounded-full border border-dashed border-ink-faint flex items-center justify-center">
        <BookOpen className="w-4 h-4 text-ink-faint" />
      </div>
      <div className="font-semibold">{title}</div>
      {children && <p className="mt-1 text-sm text-ink-muted max-w-sm mx-auto">{children}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export function ErrorNote({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="rounded-lg border border-bad/25 bg-bad-soft px-4 py-3 text-sm text-bad flex items-center justify-between gap-3">
      <span>{message}</span>
      {onRetry && <button className="font-semibold underline underline-offset-2" onClick={onRetry}>Retry</button>}
    </div>
  );
}

export function Modal({ open, onClose, title, children, footer }: { open: boolean; onClose: () => void; title: string; children: ReactNode; footer?: ReactNode }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-ink/40" onClick={onClose} />
          <motion.div
            role="dialog" aria-modal="true" aria-label={title}
            className="relative w-full sm:max-w-md bg-white rounded-t-2xl sm:rounded-2xl shadow-lift"
            initial={{ y: 24, opacity: 0, scale: 0.98 }} animate={{ y: 0, opacity: 1, scale: 1 }} exit={{ y: 16, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between px-5 pt-5">
              <h2 className="font-semibold text-[17px]">{title}</h2>
              <button className="btn-ghost h-8 px-2" onClick={onClose} aria-label="Close"><X className="w-4 h-4" /></button>
            </div>
            <div className="px-5 pt-2 pb-5 text-sm text-ink-soft">{children}</div>
            {footer && <div className="px-5 pb-5 flex justify-end gap-2">{footer}</div>}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <img src="/mark.png" alt="" className="w-9 h-7 object-contain shrink-0 drop-shadow-[0_0_8px_rgba(232,163,61,0.45)]" />
      <div className="leading-none">
        <div className={`font-brand text-[14px] font-bold tracking-[0.12em] uppercase ${light ? 'text-white' : 'text-ink'}`}>
          Trinity Quiz <span className="text-[#e8a33d] normal-case tracking-normal font-sans text-[12px] font-semibold">(Demo)</span>
        </div>
        <div className={`text-[11px] mt-1 ${light ? 'text-white/50' : 'text-ink-muted'}`}>by Trinity Tech</div>
      </div>
    </div>
  );
}

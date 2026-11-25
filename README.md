# Trinity Quiz (Demo)

A demo quiz platform by [Trinity Tech](https://trinity-tech.vercel.app), built to show clients what a practice-quiz website can do.

Visitors open it directly — no access code, no sign-up.

- **6 topics, 12 sets, 120 questions** of world general knowledge (`src/data/bank.ts`)
- Dashboard with "continue where you stopped", stats and recent results
- Quiz player: question palette, mark for review, timer, keyboard shortcuts (1–4, ← →, F, Enter)
- Leave mid-set and resume later
- Result page with score ring and an answer review filtered by wrong / skipped / correct, with explanations
- Results history per topic
- Rename yourself or reset the demo from the sidebar
- "Demo by Trinity Tech" ribbon on every screen and a footer linking to Trinity Tech

No backend, database or API keys: everything is saved in the visitor's browser (localStorage).

## Run locally

```
npm install
npm run dev
```

Opens on http://127.0.0.1:3200.

## Deploy on Vercel

Import this repository as a new Vercel project (framework: Vite). Build command `npm run build`, output folder `dist`. No environment variables needed.

## Add questions

Add a set to `SETS` in `src/data/bank.ts`: each question is `[question, options, index of correct option, explanation]`. Topic counts and set numbers update automatically.

# Trinity Quiz (Demo)

A demo quiz app by [Trinity Tech](https://trinity-tech.vercel.app), built to show clients what a quiz website can do.

- 3 topics + a mixed round, 8 questions each (questions live in `src/questions.ts`)
- 15-second timer, instant right/wrong feedback with a short explanation
- Points with a speed bonus, streaks, progress bar, answer review
- Top-10 leaderboard saved in the visitor's browser (no database)
- Share score on WhatsApp
- "Demo by Trinity Tech" ribbon and footer on every screen

No backend, database or API keys. It is a static site.

## Run locally

```
npm install
npm run dev
```

Opens on http://127.0.0.1:3200.

## Deploy on Vercel

Import this folder as a new Vercel project (framework: Vite). Build command `npm run build`, output folder `dist`. No environment variables needed.

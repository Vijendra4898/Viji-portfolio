# VIJENDRA.DEV — Sci-Fi Next.js Freelance Portfolio

A database-free, Vercel-friendly portfolio built with Next.js, TypeScript, Three.js / React Three Fiber and Framer Motion.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Before deploying

1. Open `components/ProjectAssistant.tsx` and replace `patelvijendra55@gmail.com`.
2. Open `components/Portfolio.tsx` and replace both `patelvijendra55@gmail.com` occurrences.
3. Replace the concept projects in `components/Portfolio.tsx` with your actual work.
4. Update your name, location and copy.

## Production build

```bash
npm run build
npm start
```

## Deploy to Vercel

Push this folder to GitHub and import the repository into Vercel. No database or environment variables are required.

## Important

The "AI Project Assistant" is a local interactive demo, not a live LLM. This keeps the portfolio fully functional without an API key or database. If you later want a real AI assistant, add a server-side API route and keep the key in Vercel environment variables.

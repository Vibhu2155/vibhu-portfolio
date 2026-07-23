<div align="center">

# 🚀 Vibhu — Portfolio

**A minimal, production-ready personal portfolio built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion — featuring a lightweight, deterministic "AI Assistant" that answers questions using only the portfolio's own data.**

[![Next.js](https://img.shields.io/badge/Next.js-14-000000?logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38BDF8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-0055FF?logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Deploy on Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?logo=vercel&logoColor=white)](https://vercel.com/new)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](#-license)

[Live Demo](#-live-demo) · [Features](#-features) · [Tech Stack](#-tech-stack) · [Getting Started](#-getting-started) · [Deployment](#-deployment-vercel)

</div>

---

## 📖 Overview

This project was built as an **AI Fluency Internship Capstone**. It's a single-page portfolio covering **Home, About, Skills, Projects, Certifications, an AI Assistant, and Contact** — designed to read like a portfolio built by an experienced engineer, not a template.

Every piece of content (name, bio, skills, projects, certifications, contact links) lives in **one file**: [`src/data/profile.ts`](./src/data/profile.ts). Every section component, and the AI Assistant, read from that single source of truth. To update the site, you edit that one file — nothing else needs to change.

> **Why the AI Assistant is intentionally simple.** The brief asked for an assistant that **never hallucinates** and stays easy to maintain. Instead of wiring up a hosted LLM (which needs an API key, a server route, and ongoing cost), the assistant is a small deterministic scorer: it matches keywords in a question against topics, and every answer is composed only from strings already in `profile.ts`. It cannot invent facts, updating `profile.ts` automatically updates what it can say, and it runs entirely client-side. If you later want true natural-language understanding, [`answer()`](./src/lib/ai/answer.ts) is the only function that needs to change — swap its body for a hosted model and keep the same signature.

---

## ✨ Features

| | Feature |
|---|---|
| ⚡ | **Modern stack** — Next.js 14 App Router, TypeScript, Tailwind CSS, Framer Motion |
| 🎯 | **Single source of truth** — all content centralized in `profile.ts` |
| 🤖 | **Deterministic AI Assistant** — keyword-scored Q&A engine; no API key, no server cost, structurally incapable of hallucinating |
| 📱 | **Fully responsive** — desktop, laptop, tablet, and mobile layouts |
| ♿ | **Accessible** — semantic HTML, visible keyboard focus states, `role="log"` / `aria-live` chat, `prefers-reduced-motion` respected |
| 🔍 | **SEO-ready** — metadata, Open Graph tags, JSON-LD `Person` data, dynamic `sitemap.xml` / `robots.txt`, SVG favicon |
| 🏎️ | **Performance-minded** — compressed images, `next/font` for zero layout shift, static generation, small JS bundles |
| 🚢 | **Zero-config deploy** — no environment variables or secrets required; deploys to Vercel out of the box |

---

## 🛠️ Tech Stack

| Layer     | Choice                                                                                                    |
|-----------|-----------------------------------------------------------------------------------------------------------|
| Framework | Next.js 14 (App Router)                                                                                   |
| Language  | TypeScript (strict, `noUncheckedIndexedAccess`)                                                           |
| Styling   | Tailwind CSS                                                                                              |
| Motion    | Framer Motion                                                                                             |
| Icons     | lucide-react                                                                                              |
| Fonts     | Space Grotesk (display), IBM Plex Sans (body), IBM Plex Mono (labels) — via `next/font/google`            |
| Hosting   | Vercel                                                                                                    |

---

## 📸 Screenshots

> _Replace the placeholders below with real screenshots. Add images under `public/images/` or a `docs/` folder and update the paths._

| Home | AI Assistant |
|------|--------------|
| ![Home section](https://placehold.co/600x380?text=Home) | ![AI Assistant](https://placehold.co/600x380?text=AI+Assistant) |

| Projects | Mobile |
|----------|--------|
| ![Projects section](https://placehold.co/600x380?text=Projects) | ![Mobile layout](https://placehold.co/280x560?text=Mobile) |

---

## 📁 Folder Structure

```
├── public/
│   ├── favicon.svg
│   └── images/
│       └── profile.jpg          # profile photo — swap with your own
├── src/
│   ├── app/
│   │   ├── layout.tsx           # Fonts, global <html>, SEO metadata, JSON-LD
│   │   ├── page.tsx             # Assembles all sections in fixed order
│   │   ├── globals.css          # Design tokens & base styles
│   │   ├── sitemap.ts           # Dynamic sitemap.xml
│   │   └── robots.ts            # Dynamic robots.txt
│   ├── components/
│   │   ├── layout/              # Header, Footer
│   │   ├── sections/            # Hero, About, Skills, Projects,
│   │   │                        #   Certifications, AIAssistant, Contact
│   │   └── ui/                  # Button, Card, Container, SectionHeading
│   ├── data/
│   │   └── profile.ts           # ⭐ single source of truth for all content
│   └── lib/ai/
│       ├── answer.ts            # Public API — deterministic Q&A entrypoint
│       ├── engine.ts            # Matching + weighted, no-repeat selection
│       ├── types.ts             # Shared contract
│       └── knowledge/           # Curated response pools
│           ├── portfolio.ts     # Work, projects, skills, certs
│           ├── smalltalk.ts     # Greetings, general conversation
│           ├── humor.ts         # Lighthearted responses
│           ├── creative.ts      # Creative / open-ended prompts
│           ├── authoring.ts     # Writing-related topics
│           └── index.ts         # Barrel export
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.mjs
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js 18.18 or later**
- **npm** (or pnpm / yarn — no lockfile is committed, so any package manager works)

### Installation

```bash
git clone https://github.com/Vibhu2155/portfolio.git
cd portfolio
npm install
```

### 🔐 Environment Variables

**None required.** This portfolio has zero required environment variables or secrets — it deploys and runs with no configuration. The AI Assistant runs entirely client-side, so there is no API key to set and no server to configure.

There is no `.env` file to create. (`.env*` files are already git-ignored should you introduce one later.)

### ▶️ Running Locally

```bash
npm run dev
```

Open **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## 📜 Available Scripts

| Command             | Description                                        |
|---------------------|----------------------------------------------------|
| `npm run dev`       | Start the Next.js dev server on `localhost:3000`   |
| `npm run build`     | Production build — statically generates all routes |
| `npm run start`     | Serve the production build                         |
| `npm run lint`      | Run ESLint (`next/core-web-vitals`)                |
| `npm run typecheck` | Run `tsc --noEmit` (strict mode)                   |

> Before considering a change done, run `npm run typecheck`, `npm run lint`, and `npm run build` — all three should pass clean.

### 🏗️ Production Build

```bash
npm run build   # optimized production build
npm run start   # serve it locally
```

---

## 🌐 Deployment (Vercel)

This project deploys to **Vercel with zero configuration**.

1. Push this repository to GitHub.
2. Go to **[vercel.com/new](https://vercel.com/new)** and import the repository.
3. Framework preset: **Next.js** (auto-detected). No environment variables are required.
4. Click **Deploy**.

Every push to your default branch redeploys automatically. Because the site is fully static and has no backend, it also runs on any host that supports Next.js (Netlify, Cloudflare Pages, a Node server, etc.).

---

## 🔗 Live Demo

🌍 **Live site:** _add your Vercel URL here after deploying_ → `https://<your-project>.vercel.app`

---

## ✏️ Updating Content

Open [`src/data/profile.ts`](./src/data/profile.ts) and edit:

- `name`, `tagline`, `hometown`, `location`, `institution`, `education`, `careerGoal`, `email`, `github`, `linkedin`, `photo`
  - `hometown` is where you're originally from; `location` is where you currently live/study; `institution` is your college/university. **Keep these distinct** — several sections and the AI Assistant depend on the difference.
- `about` — array of paragraphs shown in the About section
- `skills` — grouped by `languages`, `frameworks`, `cloud`, `databases`, `tools`, `concepts`
- `certifications` — array of `{ name, issuer, summary }`
- `projects` — array of project objects; set `featured: true` on the one that should headline the Projects section

No other file needs to change. To swap the profile photo, replace `public/images/profile.jpg` (keep it under ~300 KB for performance).

---

## 🧭 Future Improvements

- Blog / writing section for cloud & data engineering notes
- Project case-study pages with architecture diagrams
- Wire the AI Assistant to a hosted model (retrieval limited to `profile.ts`) for freer-form phrasing while keeping the no-hallucination guarantee
- Automated Lighthouse CI checks on pull requests
- Dark mode (kept out of v1 per the design brief's light-only requirement)

---

## 📄 License

This project is released under the **MIT License** — the code is free to reuse as a template.

Please **replace the content in `src/data/profile.ts` and the photo in `public/images/`** with your own before publishing.

---

<div align="center">

Built with ❤️ using Next.js · Designed to be maintained by editing a single file.

</div>

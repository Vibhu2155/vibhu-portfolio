# Vibhu — Portfolio

A minimal, production-ready personal portfolio built with Next.js 14 (App Router), TypeScript, Tailwind CSS, and Framer Motion — featuring a lightweight, deterministic "AI Assistant" that answers questions about the site owner using only the portfolio's own data.

**Live demo:** _add your Vercel URL here after deploying_

---

## Overview

This project was built as an AI Fluency Internship Capstone. It's a single-page portfolio covering Home, About, Skills, Projects, Certifications, an AI Assistant, and Contact — designed to read like a portfolio built by an experienced engineer, not a template.

Every piece of content (name, bio, skills, projects, certifications, contact links) lives in **one file**: [`src/data/profile.ts`](./src/data/profile.ts). Every section component, and the AI Assistant, read from that single source of truth. To update the site, you edit that one file — nothing else needs to change.

## Features

- **Modern stack** — Next.js 14 App Router, TypeScript, Tailwind CSS, Framer Motion
- **Single source of truth** — all content centralized in `profile.ts`
- **Deterministic AI Assistant** — a keyword-scored Q&A engine (see [`src/lib/ai/answer.ts`](./src/lib/ai/answer.ts)) that answers only from portfolio data. No external API key, no server cost, and structurally incapable of hallucinating because it can only return strings that already exist in `profile.ts`
- **Fully responsive** — desktop, laptop, tablet, and mobile layouts
- **Accessible** — visible keyboard focus states, semantic HTML, `prefers-reduced-motion` respected
- **SEO-ready** — metadata, Open Graph tags, dynamic `sitemap.xml` and `robots.txt`, SVG favicon
- **Performance-minded** — optimized/compressed images, `next/font` for zero layout shift, static generation, small JS bundles
- **Zero-config deploy** — no environment variables or secrets required; deploys to Vercel out of the box

## Tech Stack

| Layer       | Choice                         |
|-------------|--------------------------------|
| Framework   | Next.js 14 (App Router)         |
| Language    | TypeScript                     |
| Styling     | Tailwind CSS                    |
| Motion      | Framer Motion                   |
| Icons       | lucide-react                    |
| Fonts       | Space Grotesk (display), IBM Plex Sans (body), IBM Plex Mono (labels) — via `next/font/google` |
| Hosting     | Vercel                          |

## Why the AI Assistant is intentionally simple

The brief asked for an assistant that **never hallucinates** and stays easy to maintain. Instead of wiring up a hosted LLM (which would need an API key, a server route, and ongoing cost), the assistant is a small deterministic scorer: it matches keywords in a question against topics, and every topic's answer is composed only from strings already in `profile.ts`. That means:

- It cannot invent facts — there's no generative step, only lookup.
- Updating `profile.ts` automatically updates what the assistant can say.
- It runs entirely client-side, so it deploys anywhere Next.js does, with no backend.

If you later want true natural-language understanding, `answer()` in `src/lib/ai/answer.ts` is the only function that needs to change — swap its body for a call to a hosted model and keep the same signature.

## Project Structure

```
├── public/
│   ├── favicon.svg
│   └── images/
│       └── profile.jpg
├── src/
│   ├── app/
│   │   ├── layout.tsx        # Fonts, global <html>, SEO metadata
│   │   ├── page.tsx          # Assembles all sections
│   │   ├── globals.css       # Design tokens & base styles
│   │   ├── sitemap.ts        # Dynamic sitemap.xml
│   │   └── robots.ts         # Dynamic robots.txt
│   ├── components/
│   │   ├── layout/           # Header, Footer
│   │   ├── sections/         # Hero, About, Skills, Projects,
│   │   │                     # Certifications, AIAssistant, Contact
│   │   └── ui/                # Button, Card, Container, SectionHeading
│   ├── data/
│   │   └── profile.ts        # ⭐ single source of truth for all content
│   └── lib/ai/
│       └── answer.ts         # Deterministic Q&A engine for the assistant
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.mjs
```

## Getting Started

### Prerequisites

- Node.js 18.18 or later
- npm (or pnpm/yarn if you prefer — lockfile isn't committed, so any works)

### Installation

```bash
git clone https://github.com/Vibhu2155/portfolio.git
cd portfolio
npm install
```

### Running locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Type-checking & linting

```bash
npm run typecheck
npm run lint
```

### Production build

```bash
npm run build
npm run start
```

## Updating Content

Open `src/data/profile.ts` and edit:

- `name`, `tagline`, `hometown`, `location`, `institution`, `education`, `careerGoal`, `email`, `github`, `linkedin`, `photo`
  - `hometown` is where you're originally from; `location` is where you currently live/study; `institution` is your college/university. Keep these distinct — several sections and the AI Assistant depend on the difference.
- `about` — array of paragraphs shown in the About section (and used by the assistant)
- `skills` — grouped by `languages`, `frameworks`, `cloud`, `databases`, `tools`, `concepts`
- `certifications` — array of `{ name, issuer, summary }`
- `projects` — array of project objects; set `featured: true` on the one that should headline the Projects section

No other file needs to change — sections and the AI Assistant re-render from this data automatically.

To swap the profile photo, replace `public/images/profile.jpg` (keep it reasonably sized — under ~300KB is ideal for performance).

## Deployment (Vercel)

1. Push this repository to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository.
3. Framework preset: **Next.js** (auto-detected). No environment variables are required.
4. Click **Deploy**.

Every push to your default branch redeploys automatically.

## Refinement Log

**Latest pass:**

- **Fixed page-jump scroll bug (root cause).** The AI Assistant called `element.scrollIntoView({ behavior: "smooth" })` on every new message. With no `block` option, that call walks up *every* scrollable ancestor — including the browser window — to bring the target into view, so sending a message could yank the whole page down instead of just scrolling the chat log. Fixed by scrolling the chat container's own `scrollTop` directly (`src/components/sections/AIAssistant.tsx`), which never touches the window or any ancestor scroll position.
- **Fixed a factual accuracy bug.** The site previously implied "based in Lucknow" while also saying "studying" there. `profile.ts` now separates `hometown` (Lucknow), `location` (Ghaziabad, where currently based), and `institution` (KIET Group of Institutions, Ghaziabad) as distinct fields, and every section/the AI Assistant read from the correct one.
- **Mobile navigation rebuilt.** The old mobile header only showed 3 of 6 links in a cramped horizontal strip. Replaced with a proper accessible hamburger menu (`aria-expanded`, `aria-controls`, body-scroll lock while open) that surfaces every section.
- **AI Assistant UX polish:** added a typing indicator (a UI pacing choice — the lookup itself is instant, not a network call), a reset-conversation control, disabled/empty-input states on the send button and suggested prompts, and `role="log"` / `aria-live="polite"` on the message list so screen readers announce new messages without moving focus.
- **Featured project detail expanded** to explicitly cover AWS, ECS, tracing, root cause analysis, and performance analysis, matching how the flagship project is actually scoped.
- **SEO:** added JSON-LD `Person` structured data (name, links, alma mater, hometown, areas of expertise) for richer recruiter/search-engine visibility.
- Re-verified: `tsc --noEmit` clean, `next build` succeeds with static generation on all routes, `eslint` clean, no stray `scrollIntoView`/`focus()`/`href="#"` patterns anywhere else in the codebase.

## Future Improvements

- Add a blog/writing section for cloud & data engineering notes
- Add project case-study pages with architecture diagrams
- Wire the AI Assistant to a hosted model (with retrieval limited to `profile.ts`) for freer-form phrasing while keeping the same no-hallucination guarantee
- Add automated Lighthouse CI checks on pull requests
- Add dark mode (kept out of v1 per the design brief's light-only requirement)

## License

This portfolio's code is free to reuse as a template. Please replace the content in `src/data/profile.ts` and the photo in `public/images/` with your own before publishing.

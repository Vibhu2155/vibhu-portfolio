# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start the Next.js dev server (http://localhost:3000)
- `npm run build` — production build; statically generates all routes
- `npm run start` — serve the production build
- `npm run lint` — ESLint (`next/core-web-vitals`)
- `npm run typecheck` — `tsc --noEmit`, strict mode with `noUncheckedIndexedAccess`

There is no test runner configured. Before considering a change done, run `npm run typecheck`, `npm run lint`, and `npm run build` — all three should pass clean.

## Architecture

Single-page portfolio: Next.js 14 (App Router) + TypeScript + Tailwind + Framer Motion. Deploys to Vercel with zero config — no environment variables or secrets.

**Single source of truth.** All site content (name, bio, skills, projects, certifications, contact links) lives in `src/data/profile.ts`. Every section component and the AI Assistant read from this file. To change site content, edit only this file — do not hardcode copy in components. The exported `profile` object's shape defines the `Profile` and `Project` types via `typeof`, so adding/renaming fields propagates through the type system.

**Page assembly.** `src/app/page.tsx` composes fixed-order sections: Hero → About → Skills → Projects → Certifications → AIAssistant → Contact, wrapped by Header/Footer. `src/app/layout.tsx` owns fonts (via `next/font/google`), SEO metadata, and JSON-LD `Person` structured data — all derived from `profile`.

**The "AI Assistant" is deterministic, not an LLM.** `src/lib/ai/answer.ts` is a keyword-scored lookup over `profile.ts`. `answer(question)` scores the input against each topic's keyword list (score = sum of matched keyword lengths) and returns the highest-scoring topic's response, composed only from strings already in `profile`. This is intentional: it cannot hallucinate, needs no API key, and runs entirely client-side. To add a new answerable topic, add a `Topic` to the `topics` array. If you ever wire in a real model, `answer()` is the only function to change — keep its signature.

**Directory layout under `src/`:** `app/` (routes, layout, dynamic `sitemap.ts`/`robots.ts`), `components/layout/` (Header, Footer), `components/sections/` (one per page section), `components/ui/` (Button, Card, Container, SectionHeading), `data/`, `lib/ai/`. Import via the `@/*` alias (maps to `src/*`).

## Conventions & gotchas

- **Location fields are distinct on purpose:** `hometown` (Lucknow), `location` (currently based, Ghaziabad), and `institution` are separate fields answering different questions. Do not collapse them.
- **Chat scrolling:** in `AIAssistant.tsx`, scroll the chat log by setting the container's `scrollTop = scrollHeight`. Do NOT use `element.scrollIntoView()` — with no `block` option it walks up ancestor scroll containers (including the window) and yanks the whole page. This was a fixed bug; keep it fixed.
- **Accessibility is a maintained requirement:** the chat log uses `role="log"` / `aria-live="polite"`; interactive controls carry `aria-label`/`aria-expanded`/`aria-controls`; `prefers-reduced-motion` is respected. Preserve these when editing sections.
- **Design tokens** (colors `canvas`/`ink`/`graphite`/`line`/`mist`, font families `display`/`body`/`mono`, `maxWidth.content`) are defined in `tailwind.config.ts`. Use them rather than ad-hoc values.

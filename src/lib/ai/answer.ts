/**
 * answer.ts
 * ------------------------------------------------------------------
 * The "AI Assistant" is intentionally simple: a deterministic,
 * keyword-scored lookup over `profile.ts`, the same data that powers
 * the rest of the site. There is no external LLM call, no API key,
 * and no server cost — which means:
 *
 *   1. It can never hallucinate: every answer is composed only from
 *      strings that already exist in profile.ts.
 *   2. It deploys anywhere with zero configuration (pure client-side
 *      TypeScript, runs the same in dev and on Vercel).
 *   3. Updating profile.ts automatically updates what the assistant
 *      can talk about.
 *
 * If this project ever needs true natural-language understanding,
 * this file is the only place that would change: swap `answer()`'s
 * body for a call to a hosted model, keeping the same function
 * signature so no component needs to change.
 * ------------------------------------------------------------------
 */

import { profile } from "@/data/profile";

export interface Topic {
  id: string;
  keywords: string[];
  respond: () => string;
}

const list = (items: string[]) => items.join(", ");

const topics: Topic[] = [
  {
    id: "greeting",
    keywords: ["hi", "hello", "hey", "yo", "greetings"],
    respond: () =>
      `Hi! I'm a small assistant trained only on ${profile.name}'s portfolio data. Ask me about ${profile.name}'s background, skills, projects, certifications, or how to get in touch.`,
  },
  {
    id: "who",
    keywords: ["who", "about", "yourself", "introduce", "background", "bio"],
    respond: () => profile.about.join(" "),
  },
  {
    id: "goal",
    keywords: ["goal", "career", "future", "plan", "aspire", "aspiration"],
    respond: () =>
      `${profile.name}'s career goal: ${profile.careerGoal} Currently pursuing ${profile.education} at ${profile.institution}.`,
  },
  {
    id: "education",
    keywords: ["study", "studying", "college", "university", "degree", "kiet", "institution"],
    respond: () =>
      `${profile.name} is pursuing a ${profile.education} at ${profile.institution}.`,
  },
  {
    id: "location",
    keywords: ["location", "based", "live", "city", "where", "hometown", "from", "originally"],
    respond: () =>
      `${profile.name} is originally from ${profile.hometown}, and currently based in ${profile.location} while studying at ${profile.institution}.`,
  },
  {
    id: "skills",
    keywords: ["skill", "tech", "stack", "language", "framework", "know", "expertise"],
    respond: () =>
      `Languages: ${list(profile.skills.languages)}. Frameworks: ${list(
        profile.skills.frameworks
      )}. Cloud: ${list(profile.skills.cloud)}. Databases: ${list(
        profile.skills.databases
      )}. Tools: ${list(profile.skills.tools)}. Concepts: ${list(profile.skills.concepts)}.`,
  },
  {
    id: "certifications",
    keywords: ["cert", "certification", "aws", "credential", "exam"],
    respond: () =>
      profile.certifications
        .map((c) => `${c.name} (${c.issuer}) — ${c.summary}`)
        .join(" "),
  },
  {
    id: "projects",
    keywords: ["project", "build", "built", "work", "portfolio", "app", "application"],
    respond: () =>
      profile.projects
        .map((p) => `${p.name}${p.featured ? " (featured project)" : ""}: ${p.description}`)
        .join(" "),
  },
  {
    id: "monitoring-project",
    keywords: [
      "monitoring",
      "cloud ops",
      "microservice",
      "observability",
      "featured",
      "ecs",
      "tracing",
      "trace",
      "root cause",
      "performance analysis",
      "aws",
    ],
    respond: () => {
      const p = profile.projects.find((p) => p.slug === "cloud-ops-monitoring")!;
      return `${p.name}: ${p.description} Technologies: ${list(p.technologies)}.`;
    },
  },
  {
    id: "swapsphere",
    keywords: ["swapsphere", "swap"],
    respond: () => {
      const p = profile.projects.find((p) => p.slug === "swapsphere")!;
      return `${p.name}: ${p.description} Technologies: ${list(p.technologies)}.`;
    },
  },
  {
    id: "innotech",
    keywords: ["innotech", "scholarship"],
    respond: () => {
      const p = profile.projects.find((p) => p.slug === "innotech-scholarship")!;
      return `${p.name}: ${p.description} Technologies: ${list(p.technologies)}.`;
    },
  },
  {
    id: "contact",
    keywords: ["contact", "email", "reach", "hire", "connect", "linkedin", "github"],
    respond: () =>
      `You can reach ${profile.name} at ${profile.email}, on GitHub at ${profile.github}, or on LinkedIn at ${profile.linkedin}.`,
  },
  {
    id: "interests",
    keywords: ["interest", "passion", "enjoy", "like"],
    respond: () => `${profile.name}'s professional interests: ${list(profile.interests)}.`,
  },
  {
    id: "thanks",
    keywords: ["thanks", "thank you", "cool", "nice", "great"],
    respond: () => "You're welcome! Anything else you'd like to know?",
  },
];

const FALLBACK = `I can only answer questions using ${profile.name}'s portfolio data — try asking about background, skills, projects, certifications, or how to get in touch.`;

function score(input: string, keywords: string[]): number {
  const text = input.toLowerCase();
  return keywords.reduce((acc, kw) => (text.includes(kw) ? acc + kw.length : acc), 0);
}

/**
 * Returns a deterministic answer grounded entirely in profile.ts.
 * Never calls an external service, so it can never invent facts.
 */
export function answer(question: string): string {
  if (!question.trim()) return FALLBACK;

  let best: Topic | null = null;
  let bestScore = 0;

  for (const topic of topics) {
    const s = score(question, topic.keywords);
    if (s > bestScore) {
      bestScore = s;
      best = topic;
    }
  }

  return best ? best.respond() : FALLBACK;
}

export const suggestedQuestions = [
  "What are your career goals?",
  "Tell me about your AWS certifications",
  "What is the Cloud Operations project?",
  "How can I contact you?",
];

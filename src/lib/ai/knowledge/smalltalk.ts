/**
 * knowledge/smalltalk.ts
 * ------------------------------------------------------------------
 * Greetings, thanks, and "what can you do" — the conversational glue.
 * These steer the user back toward answerable portfolio topics.
 * ------------------------------------------------------------------
 */

import { profile } from "@/data/profile";
import type { Pool } from "../types";
import { textPool } from "./authoring";

const STEER = [
  "Tell me about your projects",
  "What are your skills?",
  "How can I contact you?",
];

export const smalltalkPools: Pool[] = [
  textPool({
    id: "smalltalk.greeting",
    intent: "SMALLTALK",
    category: "greeting",
    keywords: ["hi", "hii", "hello", "hey", "yo", "greetings", "sup", "hola", "namaste"],
    suggestions: STEER,
    lines: [
      `Hey! I'm ${profile.name}'s portfolio assistant — grounded only in the data on this page, so no made-up facts. Ask me about projects, skills, certifications, or how to get in touch.`,
      `Hi there! Ask me anything about ${profile.name}'s background, projects, skills, or certifications. I stick to what's on this page.`,
      `Hello! I can walk you through ${profile.name}'s projects, skills, AWS certifications, or contact details. Where should we start?`,
      "Hey! Fire away — projects, skills, certs, career goals, or contact info are all fair game.",
    ],
  }),
  textPool({
    id: "smalltalk.thanks",
    intent: "SMALLTALK",
    category: "thanks",
    keywords: ["thanks", "thank you", "thx", "ty", "cool", "nice", "great", "awesome", "appreciate"],
    suggestions: STEER,
    lines: [
      "Anytime! Anything else you'd like to know?",
      "You're welcome — happy to keep going.",
      "Glad that helped. Want to dig into the projects or the certs next?",
      "My pleasure! Ask away if there's more.",
    ],
  }),
  textPool({
    id: "smalltalk.capabilities",
    intent: "SMALLTALK",
    category: "capabilities",
    keywords: [
      "what can you do",
      "help",
      "options",
      "topics",
      "commands",
      "what do you know",
      "how do you work",
    ],
    suggestions: STEER,
    lines: [
      "I answer questions about this portfolio — projects, skills, AWS certifications, education, career goals, interests, and contact info. I'm deterministic and grounded: I only use the data on this page, so I can't hallucinate.",
      "Ask me about the projects, the tech stack, the three AWS certs, career goals, or how to reach out. Everything I say comes straight from this page.",
      "I'm a small, no-hallucination assistant. Try: 'What are your skills?', 'Tell me about the Cloud Operations project', or 'How can I contact you?'",
    ],
  }),
  textPool({
    id: "smalltalk.identity",
    intent: "SMALLTALK",
    category: "identity",
    keywords: ["are you real", "are you ai", "are you chatgpt", "are you a bot", "who are you", "human"],
    suggestions: STEER,
    lines: [
      "I'm a deterministic assistant — no LLM, no API, just a keyword-matched lookup over this portfolio's data. That's why I never make things up.",
      "Not an LLM! I'm a lightweight, rule-based assistant running entirely in your browser, grounded in the data on this page.",
      "I'm a little client-side assistant built for this portfolio. No cloud calls, no hallucinations — just the facts on this page.",
    ],
  }),
];

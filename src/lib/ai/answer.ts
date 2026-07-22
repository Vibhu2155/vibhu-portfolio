/**
 * answer.ts
 * ------------------------------------------------------------------
 * Public API for the "AI Assistant". It is intentionally NOT an LLM:
 * a deterministic, keyword-matched lookup over a structured knowledge
 * base (see ./knowledge), which is itself grounded in profile.ts. That
 * means:
 *
 *   1. It can never hallucinate — every answer is composed only from
 *      curated data. Personal-life questions are deflected, never
 *      answered with an invented fact.
 *   2. It deploys anywhere with zero configuration (pure client-side
 *      TypeScript, identical in dev and on Vercel).
 *   3. Updating profile.ts (or adding a Pool under ./knowledge)
 *      updates what the assistant can say — data only, no logic.
 *
 * Architecture map:
 *   types.ts        — the shared contract
 *   engine.ts       — matching + weighted, no-repeat selection (logic)
 *   knowledge/*     — the responses (data)
 *   answer.ts       — this file: the surface the UI imports
 *
 * If this ever needs true NLU, `respond()` is the single seam to swap;
 * keep its shape and no component changes.
 * ------------------------------------------------------------------
 */

import { profile } from "@/data/profile";
import type { AssistantReply, ConversationContext, ReplyBlock } from "./types";
import { respond as engineRespond } from "./engine";

export type {
  AssistantReply,
  ConversationContext,
  ReplyBlock,
  ListItem,
  LinkItem,
} from "./types";

/** Fresh conversation memory. One per mounted assistant. */
export function createContext(): ConversationContext {
  return { recentVariants: {} };
}

/**
 * Primary entry point. Returns a structured reply plus the updated
 * conversation context (immutably — replace your state with `ctx`).
 */
export function respond(
  question: string,
  ctx: ConversationContext
): { reply: AssistantReply; ctx: ConversationContext } {
  return engineRespond(question, ctx);
}

/** Flattens structured blocks to plain text (used by `answer`). */
function blocksToText(blocks: ReplyBlock[]): string {
  return blocks
    .map((b) => {
      switch (b.type) {
        case "text":
        case "heading":
          return b.text;
        case "list":
          return b.items
            .map((it) => (it.label ? `${it.label}: ${it.text}` : it.text))
            .join(" ");
        case "links":
          return b.items.map((l) => `${l.label} (${l.href})`).join(", ");
      }
    })
    .join(" ");
}

/**
 * Back-compat shim. The original API was `answer(question): string`;
 * some call sites (and tests) may still rely on it, so it is preserved
 * exactly. It runs a stateless turn and flattens the reply to text.
 */
export function answer(question: string): string {
  const { reply } = engineRespond(question, createContext());
  return blocksToText(reply.blocks);
}

/** Richer, structured welcome shown when the chat first mounts. */
export const welcomeReply: AssistantReply = {
  intent: "SMALLTALK",
  category: "welcome",
  tone: "info",
  blocks: [
    {
      type: "text",
      text: `Hi — I'm ${profile.name}'s portfolio assistant. I'm grounded entirely in the data on this page, so I won't invent facts. Ask about projects, skills, certifications, or how to get in touch.`,
    },
  ],
};

/** Default suggestion chips for the empty state and the footer. */
export const baseSuggestions: string[] = [
  "What are your career goals?",
  "Tell me about your AWS certifications",
  "What is the Cloud Operations project?",
  "Does Vibhu edit videos?",
  "How can I contact you?",
];

/**
 * Preserved for backward compatibility with the previous module shape.
 * @deprecated Prefer `baseSuggestions`.
 */
export const suggestedQuestions = baseSuggestions;

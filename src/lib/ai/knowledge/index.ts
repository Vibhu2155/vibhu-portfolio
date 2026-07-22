/**
 * knowledge/index.ts
 * ------------------------------------------------------------------
 * The registry. Every pool the assistant knows about is aggregated
 * here into a single ordered array the engine iterates. To add a new
 * knowledge file, import it and spread it into `pools` — that's the
 * only wiring step.
 *
 * Ordering note: portfolio pools come first so that when scores tie
 * AND priorities tie, definition order favors grounded answers. (The
 * engine already prefers higher priority; this is a belt-and-braces
 * ordering for readability.)
 * ------------------------------------------------------------------
 */

import { profile } from "@/data/profile";
import type { AssistantReply, Pool } from "../types";
import { portfolioPools } from "./portfolio";
import { creativePools } from "./creative";
import { smalltalkPools } from "./smalltalk";
import { humorPools } from "./humor";

export const pools: Pool[] = [
  ...portfolioPools,
  ...creativePools,
  ...smalltalkPools,
  ...humorPools,
];

/**
 * The "nothing matched" reply. Distinct tone drives distinct styling,
 * and the suggestions give the user an obvious recovery path. Copy
 * lives here (data), not in the engine (logic).
 */
export function fallbackReply(): AssistantReply {
  return {
    intent: "UNKNOWN",
    tone: "fallback",
    blocks: [
      {
        type: "text",
        text: `I couldn't match that to anything in ${profile.name}'s portfolio data — and I only answer from what's on this page, so I won't guess. Try one of these:`,
      },
    ],
    suggestions: [
      "What are your skills?",
      "Tell me about your projects",
      "What certifications do you hold?",
      "How can I contact you?",
    ],
  };
}

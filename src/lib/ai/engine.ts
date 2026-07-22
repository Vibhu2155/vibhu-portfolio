/**
 * engine.ts
 * ------------------------------------------------------------------
 * The matching + selection engine. This is the ONLY place with logic;
 * everything else is data. It never calls a network or a model, so it
 * can never hallucinate — every answer is composed from the pools in
 * `knowledge/`, which are in turn grounded in `profile.ts`.
 *
 * Pipeline:
 *   normalize(input)  -> clean, word-tokenized text
 *   match(input)      -> highest-scoring pool (or null)
 *   select(pool, ctx) -> a variant, weighted, never the last one used
 *   respond(...)      -> ties it together into an AssistantReply + ctx
 * ------------------------------------------------------------------
 */

import type {
  AssistantReply,
  ConversationContext,
  Pool,
  Variant,
} from "./types";
import { pools, fallbackReply } from "./knowledge";

/**
 * Minimum score required to accept a match. A score is a sum of matched
 * keyword lengths, so this rejects incidental one- or two-letter hits
 * and routes genuinely unrecognized input to the fallback.
 */
const MIN_SCORE = 3;

/**
 * Lowercase, strip punctuation to spaces, collapse whitespace. Returns
 * the cleaned string padded with single spaces on each end so callers
 * can test for whole words with `" word "`.
 */
export function normalize(input: string): string {
  const cleaned = input
    .toLowerCase()
    .replace(/[^a-z0-9+#\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return ` ${cleaned} `;
}

/**
 * Whole-word (or exact phrase) containment. Guards against short
 * keywords like "hi", "gf", or "ai" firing inside "which", "gift", or
 * "said". Multi-word keywords ("who would win") are matched as phrases.
 */
function containsKeyword(paddedText: string, keyword: string): boolean {
  return paddedText.includes(` ${keyword} `);
}

/** Score = sum of matched keyword lengths (longer, more specific wins). */
function score(paddedText: string, keywords: string[]): number {
  return keywords.reduce(
    (acc, kw) => (containsKeyword(paddedText, kw) ? acc + kw.length : acc),
    0
  );
}

/**
 * Returns the best-matching pool for the input, or null if nothing
 * clears MIN_SCORE. Ties are broken by `priority` (grounded portfolio
 * pools outrank humor), then by definition order for stability.
 */
export function match(input: string): Pool | null {
  const text = normalize(input);
  let best: Pool | null = null;
  let bestScore = 0;
  let bestPriority = -Infinity;

  for (const pool of pools) {
    const s = score(text, pool.keywords);
    if (s < MIN_SCORE) continue;

    const priority = pool.priority ?? 0;
    if (s > bestScore || (s === bestScore && priority > bestPriority)) {
      best = pool;
      bestScore = s;
      bestPriority = priority;
    }
  }

  return best;
}

/**
 * Deterministic-enough index picker. We want variety without a real
 * RNG (which would break SSR determinism and is unavailable per project
 * rules). A small counter, advanced each call and mixed with the pool's
 * variant count, gives a well-spread, repeatable-in-behavior sequence.
 */
let tick = 0;

/**
 * Picks a variant using weights, excluding the variant used immediately
 * before for this pool (recorded in ctx). With one variant, returns it.
 */
export function select(
  pool: Pool,
  ctx: ConversationContext
): { variant: Variant; index: number } {
  const variants = pool.variants;
  if (variants.length === 1) {
    return { variant: variants[0]!, index: 0 };
  }

  const previous = ctx.recentVariants[pool.id];

  // Build the weighted candidate list, dropping the previous pick so the
  // same phrasing never repeats back-to-back.
  const candidates: number[] = [];
  variants.forEach((v, i) => {
    if (i === previous) return;
    const weight = Math.max(1, Math.round(v.weight ?? 1));
    for (let n = 0; n < weight; n += 1) candidates.push(i);
  });

  // Advance the spreader and index into the weighted pool.
  tick = (tick + 1) % 1_000_000;
  const chosen = candidates[tick % candidates.length]!;
  return { variant: variants[chosen]!, index: chosen };
}

/** Flatten a pool id "humor.girlfriend" -> its category is on the pool. */
function toReply(pool: Pool, variant: Variant): AssistantReply {
  return {
    intent: pool.intent,
    category: pool.category,
    blocks: variant.blocks,
    suggestions: variant.suggestions,
    tone:
      pool.intent === "HUMOR" || pool.intent === "PERSONAL_SAFE"
        ? "humor"
        : "info",
  };
}

/**
 * The public turn function. Given the user's text and the current
 * conversation context, returns a reply plus the updated context
 * (immutably — callers replace their state with the returned ctx).
 */
export function respond(
  question: string,
  ctx: ConversationContext
): { reply: AssistantReply; ctx: ConversationContext } {
  if (!question.trim()) {
    return { reply: fallbackReply(), ctx };
  }

  const pool = match(question);
  if (!pool) {
    return { reply: fallbackReply(), ctx };
  }

  const { variant, index } = select(pool, ctx);
  const nextCtx: ConversationContext = {
    lastPoolId: pool.id,
    recentVariants: { ...ctx.recentVariants, [pool.id]: index },
  };

  return { reply: toReply(pool, variant), ctx: nextCtx };
}

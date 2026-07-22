/**
 * types.ts
 * ------------------------------------------------------------------
 * Every type used by the assistant lives here, in one place, so the
 * data files and the engine share a single contract.
 *
 * The design goal is a knowledge base that scales to hundreds or
 * thousands of responses by editing DATA ONLY. Nothing in this file
 * (or the engine) needs to change to add a new answer — you add a
 * `Pool` (or a line to an existing pool) under `knowledge/`.
 * ------------------------------------------------------------------
 */

/**
 * Coarse-grained intent a matched pool belongs to. Intents describe
 * WHAT the user is asking about; they drive tone, grouping, and
 * (eventually) analytics. `UNKNOWN` is the "nothing matched" state —
 * there is deliberately no separate `FALLBACK` intent, because a
 * fallback is a RENDERING outcome (`tone: "fallback"`), not a thing
 * the user intended to ask.
 */
export type Intent =
  | "PORTFOLIO"
  | "PROJECTS"
  | "SKILLS"
  | "CERTIFICATIONS"
  | "EXPERIENCE"
  | "CONTACT"
  | "CAREER"
  | "EDUCATION"
  | "INTERESTS"
  | "SMALLTALK"
  | "PERSONAL_SAFE"
  | "HUMOR"
  | "FOLLOW_UP"
  | "UNKNOWN";

/** How a reply should be styled/announced. */
export type Tone = "info" | "humor" | "fallback";

/**
 * Rendering-agnostic content blocks. Answers are NOT strings — they
 * are ordered blocks, so the component can render real headings,
 * bullet lists with bold labels, spacing, and clickable links instead
 * of one giant paragraph. Add a new block type here + a branch in
 * AssistantMessage.tsx if a new layout is ever needed.
 */
export type ReplyBlock =
  | { type: "text"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; items: ListItem[] }
  | { type: "links"; items: LinkItem[] };

export interface ListItem {
  /** Optional bold lead-in, e.g. the project name. */
  label?: string;
  text: string;
}

export interface LinkItem {
  label: string;
  href: string;
  /** `email` renders a mailto:; `external` opens in a new tab. */
  kind: "email" | "external";
}

/**
 * One phrasing of an answer. A pool holds MANY variants; the engine
 * picks one (weighted, never the immediately-previous one) so the
 * assistant never feels repetitive.
 */
export interface Variant {
  /** Relative selection weight. Defaults to 1 when omitted. */
  weight?: number;
  blocks: ReplyBlock[];
  /** Contextual follow-up chips shown after THIS reply. */
  suggestions?: string[];
}

/**
 * A topic. Everything the assistant can say about one subject lives in
 * a single pool: the words that select it, and every way it can answer.
 * Adding knowledge = adding pools (or variants), never logic.
 */
export interface Pool {
  /** Stable, unique id, e.g. "humor.girlfriend" or "portfolio.projects". */
  id: string;
  intent: Intent;
  /** Fine-grained label within an intent, e.g. "girlfriend", "aws". */
  category: string;
  /** Lowercase match terms. Matched as whole words (see engine). */
  keywords: string[];
  /**
   * Tie-breaker when two pools score equally. Higher wins. Grounded
   * portfolio pools sit above humor so real questions get real answers.
   * Defaults to 0.
   */
  priority?: number;
  variants: Variant[];
}

/**
 * Conversation memory threaded through the engine. Kept in component
 * state — it is what makes "no repeats" and follow-ups work without a
 * backend.
 */
export interface ConversationContext {
  /** Last pool that answered, so "tell me more" can follow up. */
  lastPoolId?: string;
  /** poolId -> index of the variant used last, so we can avoid it. */
  recentVariants: Record<string, number>;
}

/** What the engine returns for a single turn. */
export interface AssistantReply {
  intent: Intent;
  category?: string;
  blocks: ReplyBlock[];
  suggestions?: string[];
  tone: Tone;
}

/**
 * knowledge/authoring.ts
 * ------------------------------------------------------------------
 * Authoring helpers. These keep the humor and small-talk data files
 * terse: you write plain strings, and these expand them into full
 * Pool/Variant structures. This is the ergonomics layer that makes
 * "add a response = append a string" true.
 * ------------------------------------------------------------------
 */

import type { Intent, Pool, Variant } from "../types";

/** A single line of text becomes a text-only variant. */
export function line(text: string): Variant {
  return { blocks: [{ type: "text", text }] };
}

/**
 * Shorthand for a text-pool: many string variations for one topic.
 * `lines` is the only field you edit to add more variety.
 */
export interface TextPoolSpec {
  id: string;
  intent: Intent;
  category: string;
  keywords: string[];
  priority?: number;
  lines: string[];
  /** Optional follow-up chips attached to every line in this pool. */
  suggestions?: string[];
}

/** Expands a TextPoolSpec into a full Pool (one text variant per line). */
export function textPool(spec: TextPoolSpec): Pool {
  return {
    id: spec.id,
    intent: spec.intent,
    category: spec.category,
    keywords: spec.keywords,
    priority: spec.priority,
    variants: spec.lines.map((text) => ({
      blocks: [{ type: "text", text }],
      suggestions: spec.suggestions,
    })),
  };
}

/**
 * knowledge/creative.ts
 * ------------------------------------------------------------------
 * Grounded pools for Vibhu's creative pursuits outside engineering:
 * video editing, color grading, hobbies, and guitar. Every string is
 * composed from `profile.ts` (the new videoEditing / music / hobbies
 * fields), so these are FACTS, not humor deflections.
 *
 * High `priority` (GROUNDED) ensures a real question like "does he
 * edit videos?" outranks any keyword-adjacent joke pool (e.g. music).
 * ------------------------------------------------------------------
 */

import { profile } from "@/data/profile";
import type { Pool } from "../types";

const list = (items: string[]) => items.join(", ");

/** Match grounded creative answers ahead of humor/small-talk. */
const GROUNDED = 100;

const CREATIVE_SUGGESTIONS = [
  "Does Vibhu do color grading?",
  "Does Vibhu play any instruments?",
  "What are your skills?",
];

export const creativePools: Pool[] = [
  {
    id: "creative.video-editing",
    intent: "INTERESTS",
    category: "video-editing",
    priority: GROUNDED,
    keywords: [
      "video",
      "video editing",
      "edit",
      "edits",
      "editing",
      "editor",
      "davinci",
      "davinci resolve",
      "resolve",
      "premiere",
      "premiere pro",
      "final cut",
      "cinematic",
      "filmmaking",
    ],
    variants: [
      {
        blocks: [
          { type: "heading", text: "Video Editing" },
          {
            type: "text",
            text: `Yes — video editing is one of ${profile.name}'s favorite creative hobbies. His primary workflow is built around ${profile.videoEditing.primaryTool}, and he enjoys experimenting with cinematic edits and color grading.`,
          },
          {
            type: "list",
            items: profile.videoEditing.enjoys.map((e) => ({ text: e })),
          },
          {
            type: "text",
            text: `He shares some of his color-grading experiments on ${profile.videoEditing.showcase}.`,
          },
        ],
        suggestions: CREATIVE_SUGGESTIONS,
      },
      {
        blocks: [
          { type: "heading", text: "Video Editing" },
          {
            type: "text",
            text: `${profile.name} edits primarily in ${profile.videoEditing.primaryTool}. His toolkit:`,
          },
          {
            type: "list",
            items: profile.videoEditing.toolkit.map((t) => ({ text: t })),
          },
          {
            type: "text",
            text: `Motion-based storytelling and color grading are where he spends the most time, with grading experiments shared on ${profile.videoEditing.showcase}.`,
          },
        ],
        suggestions: CREATIVE_SUGGESTIONS,
      },
    ],
  },
  {
    id: "creative.premiere-pro",
    intent: "INTERESTS",
    category: "premiere-pro",
    // Above creative.video-editing so a Premiere-specific question gets
    // the Premiere-specific answer, not the general editing overview.
    priority: GROUNDED + 10,
    keywords: ["premiere", "premiere pro", "adobe premiere"],
    variants: [
      {
        blocks: [
          {
            type: "text",
            text: `Yes — ${profile.name} has previously worked in ${profile.videoEditing.priorTools[0]} and has hands-on experience with it. These days his primary workflow is built around ${profile.videoEditing.primaryTool}.`,
          },
        ],
        suggestions: CREATIVE_SUGGESTIONS,
      },
    ],
  },
  {
    id: "creative.color-grading",
    intent: "INTERESTS",
    category: "color-grading",
    priority: GROUNDED,
    keywords: ["color grading", "color grade", "grading", "colour grading", "color"],
    variants: [
      {
        blocks: [
          { type: "heading", text: "Color Grading" },
          {
            type: "text",
            text: `Color grading is one of the areas ${profile.name} enjoys the most. He works on it in ${profile.videoEditing.primaryTool} and shares some of his grading work on ${profile.videoEditing.showcase}.`,
          },
        ],
        suggestions: CREATIVE_SUGGESTIONS,
      },
    ],
  },
  {
    id: "creative.hobbies",
    intent: "INTERESTS",
    category: "hobbies",
    priority: GROUNDED,
    keywords: [
      "hobby",
      "hobbies",
      "outside programming",
      "outside engineering",
      "outside work",
      "free time",
      "fun",
      "creative",
      "besides coding",
      "apart from coding",
    ],
    variants: [
      {
        blocks: [
          { type: "heading", text: "Hobbies" },
          {
            type: "text",
            text: `Absolutely. Besides software development, ${profile.name} enjoys:`,
          },
          {
            type: "list",
            items: profile.hobbies.map((h) => ({ text: h })),
          },
        ],
        suggestions: [
          "Does Vibhu edit videos?",
          "Does Vibhu play any instruments?",
          "Tell me about your projects",
        ],
      },
    ],
  },
  {
    id: "creative.guitar",
    intent: "INTERESTS",
    category: "guitar",
    priority: GROUNDED,
    keywords: [
      "guitar",
      "instrument",
      "instruments",
      "play music",
      "musician",
      "plays",
    ],
    variants: [
      {
        blocks: [
          {
            type: "text",
            text: `Yes — ${profile.name} plays the ${profile.music.instrument.toLowerCase()} for fun. He ${profile.music.note}.`,
          },
        ],
        suggestions: [
          "Does Vibhu edit videos?",
          "Does Vibhu have hobbies outside programming?",
          "What are your skills?",
        ],
      },
    ],
  },
];

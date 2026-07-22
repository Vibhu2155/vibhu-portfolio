/**
 * knowledge/portfolio.ts
 * ------------------------------------------------------------------
 * Grounded pools. Every string here is composed from `profile.ts`,
 * the single source of truth, so these answers can never drift from
 * the rest of the site and can never invent a fact. Update profile.ts
 * and these answers update with it.
 *
 * These pools carry a high `priority` so a real question ("what are
 * your AWS certs?") always beats a same-keyword joke ("aws vs google").
 * ------------------------------------------------------------------
 */

import { profile } from "@/data/profile";
import type { Pool, ReplyBlock } from "../types";

const list = (items: string[]) => items.join(", ");

/** Portfolio answers should win ties against humor/small-talk. */
const GROUNDED = 100;

/** Follow-ups reused across grounded answers. */
const CORE_SUGGESTIONS = [
  "Tell me about your projects",
  "What are your skills?",
  "How can I contact you?",
];

// --- Contact: rendered as real, clickable links ----------------------
const contactLinks: ReplyBlock = {
  type: "links",
  items: [
    { label: profile.email, href: `mailto:${profile.email}`, kind: "email" },
    { label: "GitHub", href: profile.github, kind: "external" },
    { label: "LinkedIn", href: profile.linkedin, kind: "external" },
    {
      label: "Portfolio",
      href: "https://vibhu-portfolio.vercel.app",
      kind: "external",
    },
  ],
};

// --- Projects as a structured bullet list ----------------------------
const projectsList: ReplyBlock = {
  type: "list",
  items: profile.projects.map((p) => ({
    label: `${p.name}${p.featured ? "  ·  featured" : ""}`,
    text: p.description,
  })),
};

export const portfolioPools: Pool[] = [
  {
    id: "portfolio.about",
    intent: "PORTFOLIO",
    category: "about",
    priority: GROUNDED,
    keywords: [
      "who",
      "about",
      "yourself",
      "introduce",
      "background",
      "bio",
      "tell me about vibhu",
      "vibhu",
    ],
    variants: [
      {
        blocks: [
          { type: "heading", text: `About ${profile.name}` },
          ...profile.about.map((t): ReplyBlock => ({ type: "text", text: t })),
        ],
        suggestions: [
          "What are your career goals?",
          "What are your skills?",
          "Tell me about your projects",
        ],
      },
    ],
  },
  {
    id: "portfolio.projects",
    intent: "PROJECTS",
    category: "projects",
    priority: GROUNDED,
    keywords: [
      "project",
      "projects",
      "build",
      "built",
      "work",
      "portfolio",
      "app",
      "application",
      "made",
    ],
    variants: [
      {
        blocks: [{ type: "heading", text: "Projects" }, projectsList],
        suggestions: [
          "What is the Cloud Operations project?",
          "Tell me about SwapSphere",
          "What tech did you use?",
        ],
      },
    ],
  },
  {
    id: "portfolio.project.cloud-ops",
    intent: "PROJECTS",
    category: "cloud-ops-monitoring",
    priority: GROUNDED + 10,
    keywords: [
      "monitoring",
      "cloud ops",
      "cloud operations",
      "microservice",
      "microservices",
      "observability",
      "featured",
      "ecs",
      "tracing",
      "trace",
      "root cause",
      "performance analysis",
    ],
    variants: [
      {
        blocks: projectDetail("cloud-ops-monitoring"),
        suggestions: [
          "What did you learn from it?",
          "Tell me about your other projects",
          "What are your skills?",
        ],
      },
    ],
  },
  {
    id: "portfolio.project.swapsphere",
    intent: "PROJECTS",
    category: "swapsphere",
    priority: GROUNDED + 10,
    keywords: ["swapsphere", "swap", "peer to peer", "exchange"],
    variants: [
      {
        blocks: projectDetail("swapsphere"),
        suggestions: [
          "Tell me about the Cloud Operations project",
          "Tell me about INNOTECH",
          "What are your skills?",
        ],
      },
    ],
  },
  {
    id: "portfolio.project.innotech",
    intent: "PROJECTS",
    category: "innotech-scholarship",
    priority: GROUNDED + 10,
    keywords: ["innotech", "scholarship"],
    variants: [
      {
        blocks: projectDetail("innotech-scholarship"),
        suggestions: [
          "Tell me about the Cloud Operations project",
          "Tell me about SwapSphere",
          "How can I contact you?",
        ],
      },
    ],
  },
  {
    id: "portfolio.skills",
    intent: "SKILLS",
    category: "skills",
    priority: GROUNDED,
    keywords: [
      "skill",
      "skills",
      "tech",
      "stack",
      "language",
      "languages",
      "framework",
      "frameworks",
      "know",
      "expertise",
      "database",
      "databases",
      "tools",
    ],
    variants: [
      {
        blocks: [
          { type: "heading", text: "Skills" },
          {
            type: "list",
            items: [
              { label: "Languages", text: list(profile.skills.languages) },
              { label: "Frameworks", text: list(profile.skills.frameworks) },
              { label: "Cloud", text: list(profile.skills.cloud) },
              { label: "Databases", text: list(profile.skills.databases) },
              { label: "Tools", text: list(profile.skills.tools) },
              { label: "Concepts", text: list(profile.skills.concepts) },
            ],
          },
        ],
        suggestions: [
          "Tell me about your projects",
          "What certifications do you hold?",
          "What are your career goals?",
        ],
      },
    ],
  },
  {
    id: "portfolio.certifications",
    intent: "CERTIFICATIONS",
    category: "certifications",
    priority: GROUNDED,
    keywords: [
      "cert",
      "certs",
      "certification",
      "certifications",
      "aws",
      "credential",
      "credentials",
      "exam",
      "certified",
    ],
    variants: [
      {
        blocks: [
          { type: "heading", text: "AWS Certifications" },
          {
            type: "list",
            items: profile.certifications.map((c) => ({
              label: `${c.name} · ${c.issuer}`,
              text: c.summary,
            })),
          },
        ],
        suggestions: [
          "What are your skills?",
          "What are your career goals?",
          "Tell me about your projects",
        ],
      },
    ],
  },
  {
    id: "portfolio.career",
    intent: "CAREER",
    category: "career",
    priority: GROUNDED,
    keywords: [
      "goal",
      "goals",
      "career",
      "future",
      "plan",
      "plans",
      "aspire",
      "aspiration",
      "ambition",
      "aim",
    ],
    variants: [
      {
        blocks: [
          { type: "heading", text: "Career Goals" },
          { type: "text", text: profile.careerGoal },
          {
            type: "text",
            text: `Currently pursuing ${profile.education} at ${profile.institution}.`,
          },
        ],
        suggestions: [
          "What certifications do you hold?",
          "What are your skills?",
          "How can I contact you?",
        ],
      },
    ],
  },
  {
    id: "portfolio.education",
    intent: "EDUCATION",
    category: "education",
    priority: GROUNDED,
    keywords: [
      "study",
      "studying",
      "college",
      "university",
      "degree",
      "kiet",
      "institution",
      "education",
      "btech",
      "b tech",
    ],
    variants: [
      {
        blocks: [
          { type: "heading", text: "Education" },
          {
            type: "text",
            text: `${profile.name} is pursuing a ${profile.education} at ${profile.institution}.`,
          },
        ],
        suggestions: CORE_SUGGESTIONS,
      },
    ],
  },
  {
    id: "portfolio.location",
    intent: "PORTFOLIO",
    category: "location",
    priority: GROUNDED,
    keywords: [
      "location",
      "based",
      "live",
      "city",
      "where",
      "hometown",
      "from",
      "originally",
    ],
    variants: [
      {
        blocks: [
          {
            type: "text",
            text: `${profile.name} is originally from ${profile.hometown}, and is currently based in ${profile.location} while studying at ${profile.institution}.`,
          },
        ],
        suggestions: CORE_SUGGESTIONS,
      },
    ],
  },
  {
    id: "portfolio.interests",
    intent: "INTERESTS",
    category: "interests",
    priority: GROUNDED,
    keywords: [
      "interest",
      "interests",
      "passion",
      "passions",
      "enjoy",
      "hobby",
      "hobbies",
    ],
    variants: [
      {
        blocks: [
          { type: "heading", text: "Interests" },
          { type: "text", text: list(profile.interests) },
        ],
        suggestions: CORE_SUGGESTIONS,
      },
    ],
  },
  {
    id: "portfolio.contact",
    intent: "CONTACT",
    category: "contact",
    priority: GROUNDED,
    keywords: [
      "contact",
      "email",
      "reach",
      "hire",
      "connect",
      "linkedin",
      "github",
      "message",
      "get in touch",
    ],
    variants: [
      {
        blocks: [
          { type: "heading", text: "Get in touch" },
          {
            type: "text",
            text: `You can reach ${profile.name} directly here:`,
          },
          contactLinks,
        ],
        suggestions: [
          "What are your career goals?",
          "Tell me about your projects",
          "What are your skills?",
        ],
      },
    ],
  },
];

/**
 * Builds a detailed, structured block list for a single project.
 * Kept here (data-shaping, not control flow) so project detail pools
 * stay one line each.
 */
function projectDetail(slug: string): ReplyBlock[] {
  const p = profile.projects.find((proj) => proj.slug === slug)!;
  return [
    { type: "heading", text: p.name },
    { type: "text", text: p.description },
    {
      type: "list",
      items: p.highlights.map((h) => ({ text: h })),
    },
    { type: "text", text: `Technologies: ${list(p.technologies)}.` },
  ];
}

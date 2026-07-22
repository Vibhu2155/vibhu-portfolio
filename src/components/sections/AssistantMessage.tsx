"use client";

import { Mail, Github, Linkedin, Globe, ArrowUpRight } from "lucide-react";
import type { LinkItem, ReplyBlock } from "@/lib/ai/answer";

/**
 * Renders an assistant reply's structured blocks to JSX. Keeping this
 * separate from AIAssistant keeps the chat container lean and makes the
 * block -> markup mapping the single place to touch when a new block
 * type is added in types.ts.
 *
 * Design intent: real headings, spaced bullet lists with bold labels,
 * and genuinely clickable contact links — never a wall of text.
 */
export function AssistantMessage({ blocks }: { blocks: ReplyBlock[] }) {
  return (
    <div className="space-y-3">
      {blocks.map((block, i) => (
        <Block key={i} block={block} />
      ))}
    </div>
  );
}

function Block({ block }: { block: ReplyBlock }) {
  switch (block.type) {
    case "heading":
      return (
        <p className="text-[0.9rem] font-semibold tracking-tight text-ink">
          {block.text}
        </p>
      );

    case "text":
      return <p className="text-sm leading-relaxed text-ink">{block.text}</p>;

    case "list":
      return (
        <ul className="space-y-2">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-2 text-sm leading-relaxed text-ink">
              <span
                className="mt-2 h-1 w-1 shrink-0 rounded-full bg-graphite/50"
                aria-hidden
              />
              <span>
                {item.label && (
                  <span className="font-semibold text-ink">{item.label}</span>
                )}
                {item.label && item.text && <span className="text-ink"> — </span>}
                {item.text && <span className="text-graphite">{item.text}</span>}
              </span>
            </li>
          ))}
        </ul>
      );

    case "links":
      return (
        <div className="flex flex-wrap gap-2">
          {block.items.map((link) => (
            <ContactLink key={link.href} link={link} />
          ))}
        </div>
      );
  }
}

const ICONS: Record<string, typeof Mail> = {
  email: Mail,
  GitHub: Github,
  LinkedIn: Linkedin,
  Portfolio: Globe,
};

function ContactLink({ link }: { link: LinkItem }) {
  const Icon = ICONS[link.label] ?? (link.kind === "email" ? Mail : Globe);
  const external = link.kind === "external";

  return (
    <a
      href={link.href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="inline-flex items-center gap-1.5 rounded-full border border-line bg-canvas px-3 py-1.5 text-xs font-medium text-ink transition-colors hover:border-ink hover:bg-mist"
    >
      <Icon size={13} aria-hidden />
      <span className="max-w-[14rem] truncate">{link.label}</span>
      {external && <ArrowUpRight size={12} className="text-graphite" aria-hidden />}
    </a>
  );
}

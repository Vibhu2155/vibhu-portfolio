"use client";

import { useState, useRef, useEffect, useMemo, FormEvent } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Bot, Send, User, RotateCcw, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AssistantMessage } from "@/components/sections/AssistantMessage";
import {
  respond,
  createContext,
  welcomeReply,
  baseSuggestions,
  type AssistantReply,
  type ConversationContext,
} from "@/lib/ai/answer";

/**
 * A rendered chat turn. `id` is a stable, monotonically increasing key
 * (never the array index) so React reconciles animations correctly.
 * User turns carry plain text; assistant turns carry a structured reply.
 */
type Message =
  | { id: number; role: "user"; text: string }
  | { id: number; role: "assistant"; reply: AssistantReply };

const welcomeMessage: Message = { id: 0, role: "assistant", reply: welcomeReply };

export function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([welcomeMessage]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Conversation memory (no-repeat + follow-ups) lives in a ref: it must
  // survive across turns but never needs to trigger a re-render itself.
  const contextRef = useRef<ConversationContext>(createContext());
  const nextId = useRef(1);

  // Honor the user's motion preference. Framer transforms are driven in
  // JS, so the global CSS reduced-motion override does NOT cover them --
  // we must branch here. When reduced, entrances are opacity-only.
  const reduceMotion = useReducedMotion();

  // We scroll THIS container directly (never the window). Using
  // element.scrollIntoView() here was the root cause of a page-level
  // "jump to bottom" bug: with no `block` option it defaults to
  // block: "start" and walks up every scrollable ancestor -- including
  // the window -- to bring the target into view, so submitting a
  // message could yank the whole page down. Setting scrollTop on the
  // known scroll container avoids touching any ancestor, including
  // the document, entirely.
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const typingTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, isTyping]);

  useEffect(() => {
    return () => {
      if (typingTimeout.current) clearTimeout(typingTimeout.current);
    };
  }, []);

  // Only the welcome message present -> show the inviting empty state.
  const isEmpty = messages.length === 1;

  // Follow-up chips: the latest assistant reply's contextual suggestions,
  // falling back to the base set. Kept stable so they don't flicker.
  const followUps = useMemo(() => {
    for (let i = messages.length - 1; i >= 0; i -= 1) {
      const m = messages[i]!;
      if (m.role === "assistant" && m.reply.suggestions?.length) {
        return m.reply.suggestions;
      }
    }
    return baseSuggestions;
  }, [messages]);

  function send(question: string) {
    const q = question.trim();
    if (!q || isTyping) return;

    const userMsg: Message = { id: nextId.current++, role: "user", text: q };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Brief, deliberate delay before the reply appears. The answer is
    // computed instantly (it's a local lookup, not a network call) --
    // this is purely a UI pacing choice so replies don't feel like
    // they're popping in mid-keystroke, not a simulated "thinking" step.
    typingTimeout.current = setTimeout(() => {
      const { reply, ctx } = respond(q, contextRef.current);
      contextRef.current = ctx;
      setMessages((prev) => [
        ...prev,
        { id: nextId.current++, role: "assistant", reply },
      ]);
      setIsTyping(false);
    }, 420);
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    send(input);
  }

  function reset() {
    contextRef.current = createContext();
    nextId.current = 1;
    setMessages([welcomeMessage]);
    setInput("");
    setIsTyping(false);
  }

  const entrance = reduceMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 } }
    : { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 } };

  return (
    <section id="assistant" className="py-24">
      <Container>
        <SectionHeading
          index="// ai-assistant"
          title="Ask my portfolio a question."
          description="Grounded entirely in the data on this page -- it won't invent facts about me. Try one of the prompts below, or type your own."
        />

        <div className="mx-auto max-w-2xl overflow-hidden rounded-3xl border border-line bg-white/80 shadow-xl shadow-ink/5 backdrop-blur">
          {/* Header */}
          <div className="flex items-center gap-2 border-b border-line px-5 py-4">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-canvas">
              <Bot size={16} aria-hidden />
            </span>
            <div className="leading-tight">
              <p className="text-sm font-medium text-ink">Portfolio Assistant</p>
              <span className="flex items-center gap-1.5 font-mono text-[10px] text-graphite/70">
                <span
                  className="h-1.5 w-1.5 rounded-full bg-emerald-500"
                  aria-hidden
                />
                grounded / no hallucinations
              </span>
            </div>
            <button
              type="button"
              onClick={reset}
              disabled={isEmpty && !isTyping}
              aria-label="Reset conversation"
              title="Reset conversation"
              className="ml-auto flex h-8 w-8 items-center justify-center rounded-full text-graphite/60 transition-colors hover:bg-mist hover:text-ink disabled:cursor-not-allowed disabled:opacity-30"
            >
              <RotateCcw size={14} />
            </button>
          </div>

          {/* Chat log */}
          <div
            ref={scrollContainerRef}
            role="log"
            aria-live="polite"
            aria-label="Conversation with the portfolio assistant"
            className="h-[26rem] space-y-4 overflow-y-auto scroll-smooth px-5 py-5 sm:h-[30rem]"
          >
            {messages.map((m) => (
              <motion.div
                key={m.id}
                initial={entrance.initial}
                animate={entrance.animate}
                transition={{ duration: reduceMotion ? 0.15 : 0.3 }}
                className={`flex gap-3 ${
                  m.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {m.role === "assistant" && (
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ink text-canvas">
                    <Bot size={13} />
                  </div>
                )}

                {m.role === "user" ? (
                  <p className="max-w-[80%] rounded-2xl rounded-tr-sm bg-ink px-4 py-2.5 text-sm leading-relaxed text-canvas">
                    {m.text}
                  </p>
                ) : (
                  <div
                    className={`max-w-[85%] rounded-2xl rounded-tl-sm px-4 py-3 ${
                      m.reply.tone === "fallback"
                        ? "border border-amber-200 bg-amber-50"
                        : "bg-mist"
                    }`}
                  >
                    <AssistantMessage blocks={m.reply.blocks} />
                  </div>
                )}

                {m.role === "user" && (
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-mist text-graphite">
                    <User size={13} />
                  </div>
                )}
              </motion.div>
            ))}

            {/* Empty state: invite the first question inside the log. */}
            {isEmpty && !isTyping && (
              <motion.div
                initial={entrance.initial}
                animate={entrance.animate}
                transition={{ duration: reduceMotion ? 0.15 : 0.35, delay: 0.05 }}
                className="pt-1"
              >
                <p className="mb-2 flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-graphite/60">
                  <Sparkles size={12} aria-hidden />
                  Try asking
                </p>
                <div className="flex flex-wrap gap-2">
                  {baseSuggestions.map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => send(q)}
                      className="rounded-full border border-line bg-canvas px-3 py-1.5 text-xs text-graphite transition-colors hover:border-ink hover:text-ink"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Typing indicator */}
            <AnimatePresence>
              {isTyping && (
                <motion.div
                  initial={entrance.initial}
                  animate={entrance.animate}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-3"
                  aria-hidden
                >
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ink text-canvas">
                    <Bot size={13} />
                  </div>
                  <div className="flex items-center gap-1 rounded-2xl rounded-tl-sm bg-mist px-4 py-3">
                    {[0, 1, 2].map((d) => (
                      <span
                        key={d}
                        className="h-1.5 w-1.5 rounded-full bg-graphite/50 animate-pulse-dot"
                        style={{ animationDelay: `${d * 0.15}s` }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer: contextual follow-ups + input */}
          <div className="border-t border-line px-5 py-4">
            {!isEmpty && (
              <div className="mb-3 flex flex-wrap gap-2">
                {followUps.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => send(q)}
                    disabled={isTyping}
                    className="rounded-full border border-line px-3 py-1.5 text-xs text-graphite transition-colors hover:border-ink hover:text-ink disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}
            <form onSubmit={onSubmit} className="flex items-center gap-2">
              <label htmlFor="assistant-input" className="sr-only">
                Ask the portfolio assistant a question
              </label>
              <input
                id="assistant-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about my skills, projects, or how to reach me..."
                autoComplete="off"
                className="flex-1 rounded-full border border-line bg-canvas px-4 py-2.5 text-sm text-ink placeholder:text-graphite/50 focus:border-ink"
              />
              <button
                type="submit"
                aria-label="Send"
                disabled={isTyping || !input.trim()}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink text-canvas transition-colors hover:bg-graphite disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Send size={15} />
              </button>
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
}

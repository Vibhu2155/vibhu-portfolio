"use client";

import { useState, useRef, useEffect, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Send, User, RotateCcw } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { answer, suggestedQuestions } from "@/lib/ai/answer";
import { profile } from "@/data/profile";

type Message = { role: "user" | "assistant"; text: string };

const WELCOME: Message = {
  role: "assistant",
  text: `Hi, I'm a small assistant trained only on ${profile.name}'s portfolio data — ask me about background, skills, projects, certifications, or how to get in touch.`,
};

export function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

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

  function send(question: string) {
    const q = question.trim();
    if (!q || isTyping) return;

    setMessages((prev) => [...prev, { role: "user", text: q }]);
    setInput("");
    setIsTyping(true);

    // Brief, deliberate delay before the reply appears. The answer is
    // computed instantly (it's a local lookup, not a network call) --
    // this is purely a UI pacing choice so replies don't feel like
    // they're popping in mid-keystroke, not a simulated "thinking" step.
    typingTimeout.current = setTimeout(() => {
      const reply = answer(q);
      setMessages((prev) => [...prev, { role: "assistant", text: reply }]);
      setIsTyping(false);
    }, 450);
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    send(input);
  }

  function reset() {
    setMessages([WELCOME]);
    setInput("");
    setIsTyping(false);
  }

  return (
    <section id="assistant" className="py-24">
      <Container>
        <SectionHeading
          index="// ai-assistant"
          title="Ask my portfolio a question."
          description="Grounded entirely in the data on this page -- it won't invent facts about me. Try one of the prompts below, or type your own."
        />

        <div className="mx-auto max-w-2xl rounded-3xl border border-line bg-white/70 overflow-hidden">
          <div className="flex items-center gap-2 border-b border-line px-5 py-4">
            <Bot size={18} className="text-graphite" aria-hidden />
            <span className="text-sm font-medium text-ink">Portfolio Assistant</span>
            <span className="ml-auto hidden items-center gap-1.5 font-mono text-[10px] text-graphite/60 sm:flex">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden />
              grounded / no hallucinations
            </span>
            <button
              type="button"
              onClick={reset}
              aria-label="Reset conversation"
              title="Reset conversation"
              className="ml-3 flex h-7 w-7 items-center justify-center rounded-full text-graphite/60 transition-colors hover:bg-mist hover:text-ink"
            >
              <RotateCcw size={13} />
            </button>
          </div>

          <div
            ref={scrollContainerRef}
            role="log"
            aria-live="polite"
            aria-label="Conversation with the portfolio assistant"
            className="h-80 overflow-y-auto scroll-smooth px-5 py-5 space-y-4"
          >
            {messages.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex gap-3 ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {m.role === "assistant" && (
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ink text-canvas">
                    <Bot size={13} />
                  </div>
                )}
                <p
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "bg-ink text-canvas rounded-tr-sm"
                      : "bg-mist text-ink rounded-tl-sm"
                  }`}
                >
                  {m.text}
                </p>
                {m.role === "user" && (
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-mist text-graphite">
                    <User size={13} />
                  </div>
                )}
              </motion.div>
            ))}

            <AnimatePresence>
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
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

          <div className="border-t border-line px-5 py-4">
            <div className="mb-3 flex flex-wrap gap-2">
              {suggestedQuestions.map((q) => (
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

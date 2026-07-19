"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Github, Linkedin, ArrowDown } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { profile } from "@/data/profile";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  }),
};

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-24 sm:pt-40">
      {/* faint background grid — a nod to dashboards/monitoring surfaces, kept very quiet */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ececec 1px, transparent 1px), linear-gradient(to bottom, #ececec 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 20%, black, transparent)",
        }}
      />

      <Container className="relative grid grid-cols-1 gap-16 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div>
          <motion.div
            custom={0}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-white/70 px-3.5 py-1.5"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-pulse-dot rounded-full bg-emerald-500" />
            </span>
            <span className="font-mono text-xs tracking-wide text-graphite">
              status: open to internships &amp; collaboration
            </span>
          </motion.div>

          <motion.h1
            custom={1}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="text-5xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-6xl lg:text-[4rem]"
          >
            {profile.name}
            <span className="block text-graphite">{profile.tagline}</span>
          </motion.h1>

          <motion.p
            custom={2}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="mt-6 max-w-xl text-lg leading-relaxed text-graphite"
          >
            {profile.about[0]}
          </motion.p>

          <motion.div
            custom={3}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Button href="#projects">View Projects</Button>
            <Button href="#contact" variant="secondary">
              Contact Me
            </Button>
            <Button href={profile.github} target="_blank" variant="ghost" icon={<Github size={16} />}>
              GitHub
            </Button>
            <Button href={profile.linkedin} target="_blank" variant="ghost" icon={<Linkedin size={16} />}>
              LinkedIn
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto w-full max-w-sm"
        >
          <div className="relative overflow-hidden rounded-3xl border border-line bg-mist">
            <Image
              src={profile.photo}
              alt={`Portrait of ${profile.name}`}
              width={900}
              height={1200}
              priority
              className="h-full w-full object-cover grayscale-[8%]"
            />
          </div>

          {/* monitoring-style status readout card — the page's signature element */}
          <div className="absolute -bottom-6 -left-6 w-52 rounded-xl border border-line bg-canvas/95 p-4 shadow-[0_12px_32px_rgba(0,0,0,0.08)] backdrop-blur">
            <p className="font-mono text-[10px] uppercase tracking-widest text-graphite/70">
              node // based in
            </p>
            <p className="mt-1 text-sm font-medium text-ink">{profile.location}</p>
            <div className="mt-3 h-px w-full bg-line" />
            <p className="mt-3 font-mono text-[10px] uppercase tracking-widest text-graphite/70">
              focus
            </p>
            <p className="mt-1 text-sm font-medium text-ink">Cloud &amp; Data Engineering</p>
          </div>
        </motion.div>
      </Container>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="mx-auto mt-20 flex w-fit items-center gap-2 text-xs text-graphite/70 hover:text-ink"
      >
        Scroll <ArrowDown size={14} />
      </motion.a>
    </section>
  );
}

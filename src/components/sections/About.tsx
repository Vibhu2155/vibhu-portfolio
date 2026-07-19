"use client";

import { motion } from "framer-motion";
import { Cloud, Database, Sparkles, Target } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { profile } from "@/data/profile";

const pillars = [
  {
    icon: Cloud,
    title: "Cloud Computing",
    text: "Three AWS certifications, applied through real project architecture.",
  },
  {
    icon: Database,
    title: "Data Engineering",
    text: "Building pipelines and systems designed to stay reliable under load.",
  },
  {
    icon: Sparkles,
    title: "Applied AI",
    text: "Using AI as a practical tool inside products, not a buzzword on top of them.",
  },
  {
    icon: Target,
    title: "Continuous Learning",
    text: "Certifying, building, and shipping in public — one project at a time.",
  },
];

export function About() {
  return (
    <section id="about" className="py-24">
      <Container>
        <SectionHeading
          index="// about-me"
          title="A systems mindset, applied to cloud and data."
          description={profile.about[1]}
        />

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-5 text-graphite leading-relaxed"
          >
            <p>{profile.about[2]}</p>
            <p>{profile.about[3]}</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pillars.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="rounded-2xl border border-line p-5"
              >
                <p.icon size={18} className="text-graphite" strokeWidth={1.75} />
                <h3 className="mt-3 text-sm font-semibold text-ink">{p.title}</h3>
                <p className="mt-1.5 text-sm text-graphite leading-relaxed">{p.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

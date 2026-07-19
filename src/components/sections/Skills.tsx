"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { profile } from "@/data/profile";

const GROUPS: { label: string; items: string[] }[] = [
  { label: "Languages", items: profile.skills.languages },
  { label: "Frameworks", items: profile.skills.frameworks },
  { label: "Cloud", items: profile.skills.cloud },
  { label: "Databases", items: profile.skills.databases },
  { label: "Developer Tools", items: profile.skills.tools },
  { label: "Concepts", items: profile.skills.concepts },
];

export function Skills() {
  return (
    <section id="skills" className="py-24 bg-mist/60">
      <Container>
        <SectionHeading
          index="// skills"
          title="What I build with."
          description="Grouped by category so it's easy to scan — not a wall of logos."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {GROUPS.map((group, i) => (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="rounded-2xl border border-line bg-canvas p-6"
            >
              <h3 className="font-mono text-xs uppercase tracking-widest text-graphite/70">
                {group.label}
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-line bg-white px-3 py-1 text-xs font-medium text-ink"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

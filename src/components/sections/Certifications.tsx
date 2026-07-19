"use client";

import { motion } from "framer-motion";
import { BadgeCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { profile } from "@/data/profile";

export function Certifications() {
  return (
    <section id="certifications" className="py-24 bg-mist/60">
      <Container>
        <SectionHeading
          index="// certifications"
          title="Validated, not just self-taught."
          description="New certifications get appended to this list — the layout scales automatically."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {profile.certifications.map((cert, i) => (
            <motion.div
              key={cert.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Card className="bg-canvas h-full">
                <BadgeCheck size={20} className="text-graphite" strokeWidth={1.75} />
                <h3 className="mt-4 text-base font-semibold text-ink leading-snug">
                  {cert.name}
                </h3>
                <p className="mt-1 text-xs font-mono uppercase tracking-wide text-graphite/60">
                  {cert.issuer}
                </p>
                <p className="mt-3 text-sm text-graphite leading-relaxed">{cert.summary}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

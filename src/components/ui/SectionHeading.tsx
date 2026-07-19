"use client";

import { motion } from "framer-motion";

export function SectionHeading({
  index,
  title,
  description,
}: {
  index: string;
  title: string;
  description?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="mb-12 flex items-start gap-4"
    >
      <span className="eyebrow pt-1 text-graphite/60">{index}</span>
      <div>
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-ink">
          {title}
        </h2>
        {description && (
          <p className="mt-3 max-w-xl text-graphite">{description}</p>
        )}
      </div>
    </motion.div>
  );
}

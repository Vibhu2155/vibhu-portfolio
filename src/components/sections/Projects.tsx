"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { profile } from "@/data/profile";

export function Projects() {
  const featured = profile.projects.find((p) => p.featured)!;
  const rest = profile.projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-24">
      <Container>
        <SectionHeading
          index="// projects"
          title="Selected work."
          description="One flagship system, plus a couple of builds exploring full-stack and applied problem-solving."
        />

        {/* Featured project */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 rounded-3xl border border-ink/10 bg-ink text-canvas p-8 sm:p-10"
        >
          <span className="eyebrow text-canvas/50">featured project</span>
          <h3 className="mt-3 text-2xl sm:text-3xl font-semibold tracking-tight">
            {featured.name}
          </h3>
          <p className="mt-4 max-w-2xl text-canvas/75 leading-relaxed">
            {featured.description}
          </p>

          <ul className="mt-6 grid gap-2 sm:grid-cols-2">
            {featured.highlights.map((h) => (
              <li key={h} className="flex gap-2 text-sm text-canvas/80">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-canvas/60" />
                {h}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap gap-2">
            {featured.technologies.map((t) => (
              <span
                key={t}
                className="rounded-full border border-canvas/20 px-3 py-1 text-xs text-canvas/80"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button
              href={featured.github}
              target="_blank"
              icon={<Github size={16} />}
              className="!bg-canvas !text-ink hover:!bg-canvas/90"
            >
              View on GitHub
            </Button>
            <span className="text-xs text-canvas/50">
              Future improvements: {featured.futureImprovements[0]}
            </span>
          </div>
        </motion.div>

        {/* Secondary projects */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {rest.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Card className="h-full flex flex-col">
                <h3 className="text-xl font-semibold text-ink">{project.name}</h3>
                <p className="mt-3 text-sm text-graphite leading-relaxed flex-1">
                  {project.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.technologies.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-mist px-3 py-1 text-xs text-graphite"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm font-medium text-ink hover:text-graphite"
                  >
                    View project <ArrowUpRight size={14} />
                  </a>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

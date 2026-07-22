/**
 * profile.ts
 * ------------------------------------------------------------------
 * Single source of truth for every piece of content on the site.
 *
 * Update your name, projects, skills, or certifications ONLY here.
 * Every section component and the AI Assistant read from this file,
 * so a single edit keeps the whole portfolio (and the assistant's
 * answers) in sync — no duplicated copy anywhere else.
 * ------------------------------------------------------------------
 */

export const profile = {
  name: "Vibhu",
  tagline: "Building AI, Cloud & Data Engineering Solutions",
  // `hometown` is where Vibhu is originally from; `location` is where he
  // currently studies/is based. Keep these separate — do not collapse
  // them into one field, since they answer different questions.
  hometown: "Lucknow, Uttar Pradesh",
  location: "Ghaziabad, Uttar Pradesh",
  institution: "KIET Group of Institutions, Ghaziabad, Uttar Pradesh",
  education: "B.Tech in Information Technology",
  careerGoal:
    "Becoming a Cloud Engineer / Data Engineer while building AI-powered applications.",
  email: "vibhustudyz@gmail.com",
  github: "https://github.com/Vibhu2155",
  linkedin: "https://www.linkedin.com/in/vibhu-759a9a31a/",
  photo: "/images/profile.jpg",

  about: [
    "I'm Vibhu, originally from Lucknow, Uttar Pradesh, and currently pursuing a B.Tech in Information Technology at KIET Group of Institutions in Ghaziabad. My focus is cloud computing, data engineering, and applied AI.",
    "I like systems that stay calm under load — pipelines that move data reliably, services that report their own health, and interfaces that make that complexity easy to reason about.",
    "I hold three AWS certifications spanning cloud fundamentals, AI, and data engineering, and I'm continuously building projects that put that knowledge into production-shaped code rather than leaving it as theory.",
    "Long term, I'm working toward a career as a Cloud Engineer / Data Engineer, with AI-powered tooling as a constant thread through everything I build.",
  ],

  interests: [
    "Cloud Computing",
    "Data Engineering",
    "Artificial Intelligence",
    "Backend Development",
    "Distributed Systems",
    "Software Engineering",
    "UI/UX",
    "Video Editing",
  ],

  // Creative pursuits outside of engineering. Kept separate from `skills`
  // (the technical/professional stack) on purpose — these are personal
  // hobbies, not job skills.
  hobbies: [
    "Video editing",
    "Color grading",
    "Playing guitar for fun",
    "Exploring AI",
    "Building software projects",
    "Learning cloud technologies",
  ],

  videoEditing: {
    primaryTool: "DaVinci Resolve",
    // Tools he has hands-on experience with beyond his primary one.
    priorTools: ["Premiere Pro"],
    enjoys: [
      "Color grading",
      "Cinematic edits",
      "Short-form content",
      "Motion-based storytelling",
      "Learning advanced editing workflows",
    ],
    toolkit: [
      "DaVinci Resolve",
      "Color grading workflows",
      "Motion graphics (basic)",
      "Audio synchronization",
      "Short-form editing",
    ],
    // Where he showcases color-grading experiments. No public handle/URL
    // is on file yet, so the assistant mentions it by name but does NOT
    // link to it — never fabricate a URL.
    showcase: "Instagram",
  },

  music: {
    instrument: "Guitar",
    note: "plays for fun and relaxation alongside his technical interests",
  },

  skills: {
    languages: ["Python", "TypeScript", "JavaScript", "SQL", "Java"],
    frameworks: ["React", "Next.js", "Node.js", "Tailwind CSS", "FastAPI"],
    cloud: ["AWS (Cloud Practitioner)", "AWS (AI Practitioner)", "AWS (Data Engineer)", "Vercel", "Docker"],
    databases: ["PostgreSQL", "MongoDB", "MySQL", "Redis"],
    tools: ["Git & GitHub", "VS Code", "Postman", "Linux CLI", "CI/CD"],
    concepts: [
      "Cloud Architecture",
      "Data Pipelines",
      "Microservices",
      "System Monitoring",
      "REST APIs",
      "Distributed Systems",
    ],
  },

  certifications: [
    {
      name: "AWS Certified Cloud Practitioner",
      issuer: "Amazon Web Services",
      summary:
        "Foundational, validated understanding of AWS Cloud concepts, core services, security, architecture, pricing, and support.",
    },
    {
      name: "AWS Certified AI Practitioner",
      issuer: "Amazon Web Services",
      summary:
        "Validated understanding of AI, machine learning, and generative AI concepts and their responsible use on AWS.",
    },
    {
      name: "AWS Certified Data Engineer – Associate",
      issuer: "Amazon Web Services",
      summary:
        "Validated skills in building, securing, and maintaining data pipelines and data stores on AWS.",
    },
  ],

  projects: [
    {
      slug: "cloud-ops-monitoring",
      name: "Cloud Operations & Microservices Monitoring System",
      featured: true,
      description:
        "A monitoring system built on AWS to give visibility into the health of distributed, ECS-based microservice applications. It centralizes service status, traces requests across service boundaries, and supports root-cause and performance analysis when something in the system misbehaves — the same operational posture cloud teams use to keep production systems observable and reliable.",
      highlights: [
        "Deployed on AWS with services running on ECS, monitored independently as a true microservices architecture",
        "End-to-end request tracing across service boundaries to make distributed behavior legible",
        "Root cause analysis workflows for isolating where and why a failure originated, not just that one occurred",
        "Performance analysis to catch latency regressions and resource bottlenecks before they become incidents",
      ],
      technologies: [
        "AWS",
        "ECS",
        "Microservices",
        "Distributed Systems",
        "Monitoring",
        "Tracing",
        "Root Cause Analysis",
        "Performance Analysis",
      ],
      learnings: [
        "How to reason about system health across multiple independent, ECS-deployed services",
        "Using distributed tracing to turn a vague incident into a specific, attributable root cause",
        "Trade-offs between monitoring granularity and operational noise",
        "Designing for observability from the start rather than bolting it on later",
      ],
      futureImprovements: [
        "Add automated alerting with configurable thresholds",
        "Introduce historical trend analysis for capacity planning",
        "Expand test coverage and add a fully documented API reference",
      ],
      github: "https://github.com/Vibhu2155",
    },
    {
      slug: "swapsphere",
      name: "SwapSphere",
      featured: false,
      description:
        "A platform concept for enabling peer-to-peer exchange, built to explore practical full-stack architecture, clean data modeling, and a straightforward user experience for matching people who want to swap items or services.",
      highlights: [
        "Full-stack application covering both client-facing UI and backend logic",
        "Focus on a simple, understandable data model for listings and matches",
      ],
      technologies: ["Full-Stack Development", "REST APIs", "Databases", "UI/UX Design"],
      learnings: [
        "Structuring a full-stack project so the frontend and backend evolve independently",
        "Designing UI flows around a real-world matching/exchange use case",
      ],
      futureImprovements: [
        "Add real-time notifications for matches",
        "Introduce a reputation/review system between users",
      ],
      github: "https://github.com/Vibhu2155",
    },
    {
      slug: "innotech-scholarship",
      name: "INNOTECH Scholarship Management System",
      featured: false,
      description:
        "A management system for organizing and tracking scholarship applications, built to streamline how applicants, criteria, and awards are handled end-to-end.",
      highlights: [
        "Structured data model for applicants, criteria, and award decisions",
        "Built with maintainability in mind so rules and criteria can evolve",
      ],
      technologies: ["Software Engineering", "Databases", "Application Logic", "UI/UX Design"],
      learnings: [
        "Translating real-world administrative workflows into clean application logic",
        "Designing systems that need to stay accurate and auditable over time",
      ],
      futureImprovements: [
        "Add role-based access for reviewers and administrators",
        "Add automated eligibility checks based on configurable criteria",
      ],
      github: "https://github.com/Vibhu2155",
    },
  ],
};

export type Profile = typeof profile;
export type Project = (typeof profile.projects)[number];

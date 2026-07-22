/**
 * knowledge/humor.ts
 * ------------------------------------------------------------------
 * The humor + privacy-safe knowledge base. Data only — no logic.
 *
 * TO ADD VARIETY: append a string to any pool's `lines`.
 * TO ADD A TOPIC: add another textPool({...}) to the array.
 *
 * Two hard rules encoded here:
 *   1. PRIVACY: pools about Vibhu's private life (relationships, money,
 *      body, etc.) NEVER assert a fact. They deflect with humor and
 *      point back at the public data (GitHub, AWS, projects). No yes/no.
 *   2. GROUNDING: humor pools carry no priority boost, so any real
 *      portfolio keyword outranks them (see portfolio.ts priorities).
 * ------------------------------------------------------------------
 */

import type { Pool } from "../types";
import { textPool } from "./authoring";

const MORE = ["What are your skills?", "Tell me about your projects", "How can I contact you?"];

export const humorPools: Pool[] = [
  // ============================================================
  // PRIVACY-SAFE: personal life. Deflect, never confirm/deny.
  // ============================================================
  textPool({
    id: "humor.girlfriend",
    intent: "PERSONAL_SAFE",
    category: "girlfriend",
    keywords: ["girlfriend", "gf", "dating", "single", "crush", "boyfriend", "bf", "partner"],
    suggestions: MORE,
    lines: [
      "I don't have data on Vibhu's private life. His GitHub contribution graph, though, has been getting far more attention lately. 😄",
      "That's classified. What I *can* confirm is a long-term, committed relationship with AWS. ☁️",
      "No records found in the portfolio dataset — only `git commit` timestamps at 2 a.m. 🌙",
      "Out of scope! I'm grounded strictly in projects, skills, and certs. Romance isn't in the schema.",
      "Can't say. The only 'match' I have logs of is a peer-to-peer matching feature in SwapSphere. 😉",
      "That field is private. His relationship with the terminal, however, is public and thriving.",
      "No comment — but the AWS certifications suggest a strong commitment to the cloud. 💍☁️",
    ],
  }),
  textPool({
    id: "humor.marriage",
    intent: "PERSONAL_SAFE",
    category: "marriage",
    keywords: ["marriage", "married", "wife", "husband", "shaadi", "wedding", "spouse"],
    suggestions: MORE,
    lines: [
      "No data on that. The only vows I can confirm are to writing clean, observable code. 💍",
      "That's private — but he did commit. To version control, at least.",
      "Out of scope. Currently he's married to the idea of becoming a Cloud/Data Engineer.",
      "I don't track personal life. I *can* tell you he's deeply devoted to well-structured data pipelines.",
      "No records. The only 'union' I know about is a SQL JOIN. 🔗",
    ],
  }),
  textPool({
    id: "humor.money",
    intent: "PERSONAL_SAFE",
    category: "money",
    keywords: ["money", "salary", "rich", "poor", "networth", "net worth", "income", "earn", "earning", "package", "lpa", "broke"],
    suggestions: MORE,
    lines: [
      "I don't have financial data — but I hear the real currency here is AWS certifications. He's got three. 💰",
      "That's private. Net worth unknown; commit streak, however, is wealthy. 📈",
      "No numbers on file. His portfolio is measured in projects shipped, not rupees.",
      "Can't disclose. Rich in cloud knowledge, though — Cloud Practitioner, AI Practitioner, and Data Engineer certified.",
      "Out of scope. But if GitHub green squares were legal tender, he'd be doing fine. 🟩",
      "No salary data here. Ask a recruiter — or better yet, use the contact links and make an offer. 😉",
    ],
  }),
  // ============================================================
  // PRIVACY-SAFE: body / age. Deflect with humor.
  // ============================================================
  textPool({
    id: "humor.age",
    intent: "PERSONAL_SAFE",
    category: "age",
    keywords: ["age", "old", "how old", "birthday", "born", "dob"],
    suggestions: MORE,
    lines: [
      "Age isn't in the dataset — but in engineer-years, each all-nighter counts double. 😅",
      "That's not public. Old enough to hold three AWS certs, young enough to keep shipping.",
      "No birthday on file. His oldest repo, though, could tell you a story.",
      "Out of scope! Measured in semesters, he's currently a B.Tech IT student.",
    ],
  }),
  textPool({
    id: "humor.height",
    intent: "PERSONAL_SAFE",
    category: "height",
    keywords: ["height", "tall", "short", "how tall"],
    suggestions: MORE,
    lines: [
      "No height data — but his ambitions are measured in cloud regions, not centimeters. ☁️",
      "That's private. Tall enough to reach the top shelf where the good coffee is. ☕",
      "Not tracked. Stack height, however: full-stack. 📚",
    ],
  }),
  textPool({
    id: "humor.weight",
    intent: "PERSONAL_SAFE",
    category: "weight",
    keywords: ["weight", "fat", "skinny", "how heavy", "kilos", "kg"],
    suggestions: MORE,
    lines: [
      "No such data — the only weight I track is on keyword matches. 😄",
      "That's private. His `node_modules` folder, however, is heavier than anything.",
      "Out of scope. Payload size is optimized; personal stats are not disclosed.",
    ],
  }),
  // ============================================================
  // LIFESTYLE
  // ============================================================
  textPool({
    id: "humor.food",
    intent: "HUMOR",
    category: "food",
    keywords: ["food", "eat", "eating", "hungry", "favourite food", "favorite food", "snack", "biryani", "pizza"],
    suggestions: MORE,
    lines: [
      "I run on electricity, not lunch — but rumor says debugging pairs well with pizza. 🍕",
      "No menu here! Though most bugs are solved somewhere between the first and second snack.",
      "Can't eat, but I appreciate the thought. Fuel of choice for engineers: caffeine and determination. ☕",
      "Food data not in scope — but a good deploy definitely tastes like victory.",
    ],
  }),
  textPool({
    id: "humor.cooking",
    intent: "HUMOR",
    category: "cooking",
    keywords: ["cook", "cooking", "recipe", "kitchen", "chef", "bake"],
    suggestions: MORE,
    lines: [
      "The only thing I know how to cook is a clean build. 🍳",
      "Recipes aren't my domain — but I can whip up a well-structured data pipeline.",
      "I don't cook, I compile. Different kind of heat. 🔥",
    ],
  }),
  textPool({
    id: "humor.sleep",
    intent: "HUMOR",
    category: "sleep",
    keywords: ["sleep", "sleeping", "tired", "insomnia", "nap", "bed", "awake"],
    suggestions: MORE,
    lines: [
      "Sleep? That's the feature engineers keep meaning to schedule but never merge. 😴",
      "I never sleep — I'm just a lookup table. The commits at 2 a.m. suggest I'm not alone.",
      "Sleep is just garbage collection for humans. Highly recommended, rarely prioritized.",
      "No sleep logs here — but 'just one more bug fix' is a documented cause of sunrise.",
    ],
  }),
  textPool({
    id: "humor.coffee",
    intent: "HUMOR",
    category: "coffee",
    keywords: ["coffee", "caffeine", "espresso", "latte"],
    suggestions: MORE,
    lines: [
      "Coffee: the true runtime dependency of every software project. ☕",
      "I don't drink it, but I hear it's what turns caffeine into code.",
      "Undefined behavior before the first cup. Fully deterministic after. ☕",
    ],
  }),
  textPool({
    id: "humor.tea",
    intent: "HUMOR",
    category: "tea",
    keywords: ["tea", "chai"],
    suggestions: MORE,
    lines: [
      "Chai and code — a timeless architecture. 🍵",
      "Tea break: the only downtime I fully endorse.",
      "I don't drink chai, but I respect the ritual. Great for uncaught exceptions in mood.",
    ],
  }),
  textPool({
    id: "humor.gym",
    intent: "HUMOR",
    category: "gym",
    keywords: ["gym", "workout", "exercise", "fitness", "muscle", "lifting", "abs"],
    suggestions: MORE,
    lines: [
      "The only reps I count are `for` loops. 🏋️",
      "My cardio is refreshing the deploy logs. Yours may vary.",
      "No gym data — but lifting a large PR out of review counts, right?",
      "I stay in shape by keeping my time complexity low. 😎",
    ],
  }),
  // ============================================================
  // ENTERTAINMENT
  // ============================================================
  textPool({
    id: "humor.gaming",
    intent: "HUMOR",
    category: "gaming",
    keywords: ["game", "gaming", "gamer", "valorant", "bgmi", "pubg", "minecraft", "xbox", "playstation", "ps5", "steam"],
    suggestions: MORE,
    lines: [
      "The only lag I fight is network latency. 🎮",
      "My favorite game is 'find the missing semicolon' — surprisingly hard mode.",
      "No K/D ratio here, just a commit ratio. Still grinding.",
      "Best boss fight I know: production on a Friday afternoon. 👾",
    ],
  }),
  textPool({
    id: "humor.movies",
    intent: "HUMOR",
    category: "movies",
    keywords: ["movie", "movies", "film", "netflix", "series", "show", "cinema", "watch"],
    suggestions: MORE,
    lines: [
      "I don't watch movies, but 'The Social Network' is basically a documentary around here. 🎬",
      "My watchlist is just build logs scrolling by. Riveting stuff.",
      "No screen time here — unless you count staring at a stack trace as a thriller.",
    ],
  }),
  textPool({
    id: "humor.music",
    intent: "HUMOR",
    category: "music",
    keywords: ["music", "song", "songs", "playlist", "spotify", "listen", "lofi"],
    suggestions: MORE,
    lines: [
      "Lo-fi beats to debug to — the unofficial soundtrack of software. 🎧",
      "My playlist is the hum of a CPU fan under load. Underrated genre.",
      "No tunes on file, but every good deploy deserves a victory track.",
    ],
  }),
  textPool({
    id: "humor.memes",
    intent: "HUMOR",
    category: "memes",
    keywords: ["meme", "memes", "funny", "lol", "lmao"],
    suggestions: MORE,
    lines: [
      "'It works on my machine' — the eternal classic. 😄",
      "99 little bugs in the code, take one down, patch it around... 127 little bugs in the code. 🐛",
      "I'd tell you a UDP joke, but you might not get it.",
      "There are 10 kinds of people: those who read binary, and those who don't.",
    ],
  }),
  // ============================================================
  // SPORTS
  // ============================================================
  textPool({
    id: "humor.cricket",
    intent: "HUMOR",
    category: "cricket",
    keywords: ["cricket", "ipl", "virat", "kohli", "dhoni", "rohit", "test match", "odi"],
    suggestions: MORE,
    lines: [
      "The only boundaries I track are service boundaries in a microservices architecture. 🏏",
      "No scorecards here — but I do appreciate a well-timed cover drive of a code review.",
      "Cricket's not in my dataset, but a clean deploy feels like a last-ball six. 🎯",
    ],
  }),
  textPool({
    id: "humor.football",
    intent: "HUMOR",
    category: "football",
    keywords: ["football", "soccer", "messi", "ronaldo", "fifa", "goal keeper", "premier league"],
    suggestions: MORE,
    lines: [
      "The only goals I track are career goals — and those point toward the cloud. ⚽",
      "Messi vs Ronaldo I can't settle, but AWS vs downtime? AWS, every time.",
      "No offside rules here, just off-by-one errors.",
    ],
  }),
  textPool({
    id: "humor.chess",
    intent: "HUMOR",
    category: "chess",
    keywords: ["chess", "checkmate", "grandmaster", "opening", "gambit"],
    suggestions: MORE,
    lines: [
      "Chess is just refactoring with a timer. Think ahead, sacrifice wisely. ♟️",
      "My favorite opening is `git init`. Strong positional play from move one.",
      "Checkmate is satisfying, but so is a green CI pipeline.",
    ],
  }),
  // ============================================================
  // TECH RIVALRIES & TOPICS
  // ============================================================
  textPool({
    id: "humor.linux",
    intent: "HUMOR",
    category: "linux",
    keywords: ["linux", "ubuntu", "arch", "debian", "kernel", "terminal", "bash"],
    suggestions: MORE,
    lines: [
      "Linux: where everything is a file and every problem is a config away from solved. 🐧",
      "I hear he lives in the terminal — Linux CLI is right there in the skills list.",
      "`sudo` fixes most things. Confidence fixes the rest.",
      "Arch users will tell you they use Arch. That's kind of the whole feature. 😄",
    ],
  }),
  textPool({
    id: "humor.windows",
    intent: "HUMOR",
    category: "windows",
    keywords: ["windows", "microsoft windows", "bsod", "blue screen"],
    suggestions: MORE,
    lines: [
      "Windows: great until it wants to update at exactly the wrong moment. 🔄",
      "It builds character (and occasionally a blue screen). 💙",
      "Reliable for gaming, spirited about restarts.",
    ],
  }),
  textPool({
    id: "humor.mac",
    intent: "HUMOR",
    category: "mac",
    keywords: ["mac", "macos", "macbook", "apple laptop"],
    suggestions: MORE,
    lines: [
      "macOS: the terminal is nice, the price is a data pipeline of its own. 🍎",
      "It just works — until you need to change one system setting.",
      "Great battery life, greater dongle collection.",
    ],
  }),
  textPool({
    id: "humor.os-war",
    intent: "HUMOR",
    category: "os-war",
    keywords: ["best os", "linux vs windows", "windows vs mac", "mac vs windows", "linux vs mac", "which os"],
    suggestions: MORE,
    lines: [
      "Linux for servers, Mac for cafés, Windows for games. Peace was never really an option, though. 🕊️",
      "The best OS is the one that's currently compiling without errors.",
      "Whichever one you don't have to reinstall this week wins.",
    ],
  }),
  textPool({
    id: "humor.claude",
    intent: "HUMOR",
    category: "claude",
    keywords: ["claude", "anthropic"],
    suggestions: MORE,
    lines: [
      "Claude's great — but I'm the budget, deterministic cousin: no API key, no hallucinations, runs right in your browser. 😄",
      "I admire Claude from afar. I'm smaller, but I never make up a fact — I literally can't.",
      "Claude thinks; I look things up. Different tools, same goal: not lying to you.",
    ],
  }),
  textPool({
    id: "humor.chatgpt",
    intent: "HUMOR",
    category: "chatgpt",
    keywords: ["chatgpt", "gpt", "openai"],
    suggestions: MORE,
    lines: [
      "ChatGPT is the big-brained one. I'm the one that fits in a portfolio and never invents facts. 🤝",
      "Unlike an LLM, I have no imagination — which is exactly why I can't hallucinate about Vibhu.",
      "I can't write your essay, but I can tell you the truth about this portfolio, every time.",
    ],
  }),
  textPool({
    id: "humor.ai",
    intent: "HUMOR",
    category: "ai",
    keywords: ["ai", "artificial intelligence", "machine learning", "ml", "neural network", "will ai take over", "agi"],
    suggestions: MORE,
    lines: [
      "AI is exciting — Vibhu's even AWS AI Practitioner certified. Me, though? I'm proudly just a lookup table. 🧠",
      "Will AI take over? Not this one. I can barely take over a keyword match. 😄",
      "The real AI here is on the certifications shelf. I'm more of a very confident `switch` statement.",
    ],
  }),
  textPool({
    id: "humor.aws-vs-google",
    intent: "HUMOR",
    category: "aws-vs-google",
    keywords: ["aws vs google", "google vs aws", "aws vs gcp", "gcp vs aws", "aws vs azure", "azure vs aws", "best cloud"],
    suggestions: MORE,
    lines: [
      "Around here it's AWS — three certifications say the debate is settled. ☁️🏆",
      "GCP and Azure are great, but this portfolio runs on AWS conviction.",
      "Best cloud? The one you're certified in. In this case: AWS, times three.",
    ],
  }),
  textPool({
    id: "humor.google",
    intent: "HUMOR",
    category: "google",
    keywords: ["google", "gcp"],
    suggestions: MORE,
    lines: [
      "Google: where every problem has 10 million results and none of them are your exact error. 🔍",
      "Great search engine, solid cloud. Still, the certs here are all AWS.",
      "I'd Google that for you, but I'm strictly a local lookup. 😄",
    ],
  }),
  textPool({
    id: "humor.microsoft",
    intent: "HUMOR",
    category: "microsoft",
    keywords: ["microsoft", "azure", "bill gates"],
    suggestions: MORE,
    lines: [
      "Microsoft: from BSODs to owning GitHub — quite the redemption arc. 💼",
      "Azure's a serious cloud, but this résumé is fluent in AWS.",
      "Respect for VS Code — it's literally in the tools list.",
    ],
  }),
  textPool({
    id: "humor.apple",
    intent: "HUMOR",
    category: "apple",
    keywords: ["apple", "iphone", "steve jobs", "tim cook"],
    suggestions: MORE,
    lines: [
      "Apple: courageously removing ports since forever. 🍎",
      "Beautiful hardware, brave pricing. The dongles are a subscription in disguise.",
      "Great ecosystem — as long as you never leave it.",
    ],
  }),
  textPool({
    id: "humor.cloud",
    intent: "HUMOR",
    category: "cloud",
    keywords: ["cloud", "serverless", "kubernetes", "k8s", "docker"],
    suggestions: MORE,
    lines: [
      "The cloud is just someone else's computer — but a very well-monitored one, ideally. ☁️",
      "This portfolio is cloud-native at heart: three AWS certs and a monitoring project to prove it.",
      "Serverless doesn't mean no servers, it means not your problem. Beautiful.",
    ],
  }),
  textPool({
    id: "humor.programming",
    intent: "HUMOR",
    category: "programming",
    keywords: ["programming", "coding", "code", "bug", "bugs", "debug", "debugging", "developer", "software"],
    suggestions: MORE,
    lines: [
      "Programming: 10% writing code, 90% wondering why it works now. 🐛",
      "Every bug is just a feature that hasn't been documented yet. 😄",
      "The code doesn't lie — but it does keep secrets. That's what debugging is for.",
      "Real talk: `console.log` has debugged more code than any fancy tool.",
    ],
  }),
  textPool({
    id: "humor.language-war",
    intent: "HUMOR",
    category: "language-war",
    keywords: ["best language", "python vs java", "javascript vs python", "which language", "best programming language", "rust", "golang"],
    suggestions: MORE,
    lines: [
      "Best language? The one that ships. Around here that's usually Python or TypeScript. 🐍",
      "Python for speed of thought, TypeScript for peace of mind. Both are in the skills list.",
      "The best language is the one your teammates won't fight you over. Good luck finding it. 😄",
    ],
  }),
  // ============================================================
  // STUDENT LIFE
  // ============================================================
  textPool({
    id: "humor.college",
    intent: "HUMOR",
    category: "college",
    keywords: ["college", "campus", "hostel", "professor", "lecture", "attendance", "assignment"],
    suggestions: MORE,
    lines: [
      "College: where attendance is mandatory but learning is a side quest. 🎓",
      "The real syllabus was the projects we built along the way.",
      "Ask about the actual degree and I'll get serious — B.Tech IT at KIET.",
    ],
  }),
  textPool({
    id: "humor.exams",
    intent: "HUMOR",
    category: "exams",
    keywords: ["exam", "exams", "test", "marks", "grades", "cgpa", "gpa", "result"],
    suggestions: MORE,
    lines: [
      "Exams: converting a semester of content into a single stressful night. 📚",
      "The only exams I celebrate are the AWS ones — three passed and counting.",
      "CGPA is temporary; a green CI badge is forever. 😄",
    ],
  }),
  textPool({
    id: "humor.placement",
    intent: "HUMOR",
    category: "placement",
    keywords: ["placement", "job", "interview", "recruiter", "offer letter", "internship", "hiring"],
    suggestions: MORE,
    lines: [
      "Hiring? You're in the right place — hit the contact links and let's talk. 😉",
      "The interview prep here is real projects and three AWS certs, not just LeetCode streaks.",
      "Placement season is basically a distributed systems problem: lots of retries, eventual consistency.",
    ],
  }),
  textPool({
    id: "humor.engineering",
    intent: "HUMOR",
    category: "engineering",
    keywords: ["engineering", "engineer", "btech life", "engineer life"],
    suggestions: MORE,
    lines: [
      "Engineering: turning caffeine and Stack Overflow into working software. ⚙️",
      "An engineer's optimism is measured in 'this'll take 5 minutes'.",
      "The dream: Cloud Engineer / Data Engineer. The path: one shipped project at a time.",
    ],
  }),
  textPool({
    id: "humor.procrastination",
    intent: "HUMOR",
    category: "procrastination",
    keywords: ["procrastinate", "procrastination", "lazy", "later", "deadline"],
    suggestions: MORE,
    lines: [
      "Procrastination is just async task scheduling with a very late callback. ⏰",
      "I'll answer that eventually — kidding, I'm instant. Unlike deadlines.",
      "The best time to start was yesterday. The second best is right after this one more video.",
    ],
  }),
  // ============================================================
  // LIFE / MOTIVATION
  // ============================================================
  textPool({
    id: "humor.life",
    intent: "HUMOR",
    category: "life",
    keywords: ["life", "meaning of life", "purpose", "existence"],
    suggestions: MORE,
    lines: [
      "The meaning of life? 42, obviously. After that, ship good software. 🌱",
      "Life is like production: undocumented, occasionally on fire, but somehow it stays up.",
      "Keep the commits small and the ambitions large. That's most of it.",
    ],
  }),
  textPool({
    id: "humor.motivation",
    intent: "HUMOR",
    category: "motivation",
    keywords: ["motivate", "motivation", "inspire", "give up", "quit", "stuck", "advice"],
    suggestions: MORE,
    lines: [
      "Every expert was once a `Hello World`. Keep going. 💪",
      "The bug you can't solve tonight is the one you'll fix in the shower tomorrow. Rest counts.",
      "Progress over perfection — commit early, commit often.",
      "You don't have to be great to start, but you have to start to be great. Now go build something. 🚀",
    ],
  }),
  // ============================================================
  // SILLY / IMPOSSIBLE / HYPOTHETICALS
  // ============================================================
  textPool({
    id: "humor.who-would-win",
    intent: "HUMOR",
    category: "who-would-win",
    keywords: ["who would win", "who wins", "vs", "versus", "fight", "beat"],
    suggestions: MORE,
    lines: [
      "In a fight between a bug and a deadline, the deadline always wins. 🥊",
      "Tabs vs spaces? Whoever configured the linter first. 😄",
      "My money's on the intern who reads the error message before pasting it into search.",
      "Coffee vs sleep is the only rivalry that truly matters, and coffee is undefeated.",
    ],
  }),
  textPool({
    id: "humor.what-if",
    intent: "HUMOR",
    category: "what-if",
    keywords: ["what if", "imagine if", "hypothetically", "suppose"],
    suggestions: MORE,
    lines: [
      "What if the code compiled on the first try? Terrifying. Nobody would trust it. 😄",
      "Hypothetically, if there were no bugs, engineers would simply invent new ones for sport.",
      "What if `git push --force` came with a mandatory 10-second countdown? Fewer incidents, probably.",
    ],
  }),
  textPool({
    id: "humor.impossible",
    intent: "HUMOR",
    category: "impossible",
    keywords: ["meaning of everything", "divide by zero", "infinity", "solve everything", "answer to everything"],
    suggestions: MORE,
    lines: [
      "Divide by zero? Bold. I admire the ambition and decline the request. ➗",
      "That question overflows my very finite stack. Let's talk projects instead. 😄",
      "Some things even a deterministic assistant leaves as an exercise for the reader.",
    ],
  }),
  textPool({
    id: "humor.joke",
    intent: "HUMOR",
    category: "joke",
    keywords: ["joke", "make me laugh", "tell me something funny", "roast", "pun"],
    suggestions: MORE,
    lines: [
      "Why do programmers prefer dark mode? Because light attracts bugs. 🐛",
      "How many programmers to change a light bulb? None — that's a hardware problem.",
      "I would tell you a Boolean joke, but it's either funny or it's not.",
      "A SQL query walks into a bar, approaches two tables, and asks: 'May I JOIN you?' 🍻",
      "I'd make a UDP joke, but you might not receive it.",
      "There are two hard things in CS: cache invalidation, naming things, and off-by-one errors.",
    ],
  }),
  textPool({
    id: "humor.how-are-you",
    intent: "HUMOR",
    category: "how-are-you",
    keywords: ["how are you", "how r u", "how do you feel", "whats up", "what's up", "hows it going"],
    suggestions: MORE,
    lines: [
      "Running at O(1) and feeling great. How can I help? 😄",
      "All systems green, zero exceptions thrown. What would you like to know?",
      "Deterministically wonderful, thanks for asking! Ask me about the projects or skills.",
    ],
  }),
];

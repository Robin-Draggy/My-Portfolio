export const SKILL_GROUPS = [
  {
    id: "lang",
    label: "Languages",
    icon: "</>",
    color: "#c8f55a",
    skills: [
      { name: "JavaScript", level: "Expert", note: "ES2023+, async patterns, closures" },
      { name: "TypeScript", level: "Advanced", note: "Generics, utility types, strict mode" },
    ],
  },
  {
    id: "frontend",
    label: "Frontend",
    icon: "[ ]",
    color: "#f55a9b",
    skills: [
      { name: "React.js", level: "Expert", note: "Hooks, context, performance patterns" },
      { name: "Next.js", level: "Advanced", note: "SSR, ISR, App Router, API routes" },
      { name: "TailwindCSS", level: "Expert", note: "Custom config, design systems" },
      { name: "HTML & CSS", level: "Expert", note: "Semantic, a11y, layout mastery" },
      { name: "Bootstrap", level: "Advanced", note: "Component customisation" },
    ],
  },
  {
    id: "motion",
    label: "Motion & UX",
    icon: "~>",
    color: "#f5a25a",
    skills: [
      { name: "GSAP", level: "Advanced", note: "ScrollTrigger, timelines, custom eases" },
      { name: "Framer Motion", level: "Advanced", note: "Variants, gestures, layout anim." },
      { name: "Lenis", level: "Comfortable", note: "Smooth scroll integration" },
      { name: "GSAP", level: "Advanced", note: "WebSocket-driven live UIs" },
    ],
  },
  {
    id: "state",
    label: "State & Data",
    icon: "[ ]",
    color: "#5ab4f5",
    skills: [
      { name: "Redux Toolkit", level: "Advanced", note: "Slices, RTK Query, middleware" },
      { name: "Zustand", level: "Advanced", note: "Lightweight, scalable stores" },
      { name: "React Hook Form", level: "Advanced", note: "Complex validation, schemas" },
      { name: "Axios", level: "Expert", note: "Interceptors, retry logic, caching" },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    icon: "{  }",
    color: "#a55af5",
    skills: [
      { name: "Node.js", level: "Comfortable", note: "Event loop, streams, modules" },
      { name: "Express.js", level: "Comfortable", note: "REST APIs, middleware chains" },
      { name: "Socket.io", level: "Comfortable", note: "Real-time bidirectional events" },
      { name: "MongoDB", level: "Comfortable", note: "Aggregation, indexing, Atlas" },
    ],
  },
  {
    id: "tools",
    label: "Tools & Workflow",
    icon: "##",
    color: "#f5d45a",
    skills: [
      { name: "Git & GitHub", level: "Expert", note: "Branching, PRs, CI workflows" },
      { name: "Figma", level: "Advanced", note: "Dev mode, component inspection" },
      { name: "Vite", level: "Advanced", note: "Plugin config, HMR, build opt." },
      { name: "Postman", level: "Advanced", note: "API testing, environments" },
      { name: "Jira / Trello", level: "Comfortable", note: "Agile sprint management" },
      { name: "Vercel", level: "Advanced", note: "Deployments, previews, env vars" },
    ],
  },
];

export const LEVEL_ORDER = ["Expert", "Advanced", "Comfortable"];
export const ORBIT_CORE = ["React", "TypeScript", "Next.js"];
export const ORBIT_RING = ["GSAP", "Redux", "Node.js", "TailwindCSS", "MongoDB", "Figma"];
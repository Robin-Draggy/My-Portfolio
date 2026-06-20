export const SKILL_GROUPS = [
  {
    id: "lang",
    label: "Programming Languages",
    icon: "</>",
    color: "#c8f55a",
    skills: [
      { name: "JavaScript", level: "Expert", note: "ES2023+, async patterns, closures" },
      { name: "TypeScript", level: "Advanced", note: "Generics, utility types, strict mode" },
    ],
  },

  {
    id: "frontend",
    label: "Front-End",
    icon: "[ ]",
    color: "#f55a9b",
    skills: [
      { name: "HTML", level: "Expert", note: "Semantic markup, accessibility" },
      { name: "CSS", level: "Expert", note: "Flexbox, Grid, responsive design" },
      { name: "TailwindCSS", level: "Expert", note: "Custom config, design systems" },
      { name: "React.js", level: "Expert", note: "Hooks, context, performance patterns" },
      { name: "Next.js", level: "Advanced", note: "SSR, ISR, App Router, API routes" },
      { name: "Vue.js", level: "Comfortable", note: "Composition API, component architecture" },
    ],
  },

  {
    id: "backend",
    label: "Backend & APIs",
    icon: "{ }",
    color: "#a55af5",
    skills: [
      { name: "Node.js", level: "Comfortable", note: "Event loop, streams, modules" },
      { name: "Express.js", level: "Comfortable", note: "REST APIs, middleware chains" },
      { name: "Socket.io", level: "Comfortable", note: "Real-time bidirectional events" },
      { name: "REST APIs", level: "Advanced", note: "Authentication, CRUD, integrations" },
      { name: "WebSocket", level: "Comfortable", note: "Real-time communication patterns" },
    ],
  },

  {
    id: "database",
    label: "Databases",
    icon: "[]",
    color: "#5ab4f5",
    skills: [
      { name: "MongoDB", level: "Comfortable", note: "Aggregation, indexing, Atlas" },
      { name: "MySQL", level: "Comfortable", note: "Relational data modeling, joins" },
    ],
  },

  {
    id: "state",
    label: "State Management",
    icon: "<>",
    color: "#49c5b6",
    skills: [
      { name: "Redux", level: "Advanced", note: "State management, middleware" },
      { name: "Zustand", level: "Advanced", note: "Lightweight scalable stores" },
      { name: "Context API", level: "Advanced", note: "Global state and data sharing" },
    ],
  },

  {
    id: "motion",
    label: "Animation & UX",
    icon: "~>",
    color: "#f5a25a",
    skills: [
      { name: "GSAP", level: "Advanced", note: "ScrollTrigger, timelines, custom eases" },
      { name: "Framer Motion", level: "Advanced", note: "Variants, gestures, layout animations" },
    ],
  },

  {
    id: "devops",
    label: "DevOps & Build Tools",
    icon: "⚙",
    color: "#ff8f5a",
    skills: [
      { name: "Docker", level: "Comfortable", note: "Containerization & deployment" },
      { name: "CI/CD", level: "Comfortable", note: "Automated build & deployment workflows" },
      { name: "Webpack", level: "Comfortable", note: "Bundling and optimization" },
      { name: "Babel", level: "Comfortable", note: "JavaScript transpilation" },
      { name: "npm", level: "Expert", note: "Package management & scripts" },
      { name: "Vite", level: "Advanced", note: "Fast builds, HMR, plugins" },
    ],
  },

  {
    id: "tools",
    label: "Tools & Workflow",
    icon: "##",
    color: "#f5d45a",
    skills: [
      { name: "Git", level: "Expert", note: "Branching, rebasing, collaboration" },
      { name: "GitHub", level: "Expert", note: "PRs, Actions, code reviews" },
      { name: "Figma", level: "Advanced", note: "Dev mode, design handoff" },
      { name: "Postman", level: "Advanced", note: "API testing and collections" },
      { name: "Jira", level: "Comfortable", note: "Agile sprint management" },
      { name: "Trello", level: "Comfortable", note: "Task and project tracking" },
      { name: "Agile / Scrum", level: "Comfortable", note: "Sprint planning & collaboration" },
      { name: "Vercel", level: "Advanced", note: "Deployments, previews, env vars" },
    ],
  },

  {
    id: "testing",
    label: "Testing",
    icon: "✓",
    color: "#7ed957",
    skills: [
      { name: "Jest", level: "Comfortable", note: "Unit and integration testing" },
      { name: "Cypress", level: "Comfortable", note: "End-to-end testing" },
    ],
  },
];

export const LEVEL_ORDER = ["Expert", "Advanced", "Comfortable"];

export const ORBIT_CORE = ["React.js", "TypeScript", "Next.js"];

export const ORBIT_RING = [
  "Node.js",
  "MongoDB",
  "GSAP",
  "Redux",
  "TailwindCSS",
  "Docker",
  "Socket.io",
  "Figma",
];
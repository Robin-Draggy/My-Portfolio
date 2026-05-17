import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ── Skills data ───────────────────────────────────────────────────────────
const SKILL_GROUPS = [
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

const LEVEL_ORDER = ["Expert", "Advanced", "Comfortable"];
const LEVEL_FILL = { Expert: "100%", Advanced: "70%", Comfortable: "45%" };

// ── Core orbit — SVG diagram ───────────────────────────────────────────────
const ORBIT_CORE = ["React", "TypeScript", "Next.js"];
const ORBIT_RING = ["GSAP", "Redux", "Node.js", "TailwindCSS", "MongoDB", "Figma"];

function OrbitDiagram() {
  const svgRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // slow ring rotation
      gsap.to(".orbit-ring-group", {
        rotation: 360,
        transformOrigin: "200px 200px",
        duration: 28,
        repeat: -1,
        ease: "none",
      });
      // counter-rotate labels so they stay upright
      gsap.to(".orbit-label", {
        rotation: -360,
        transformOrigin: "50% 50%",
        duration: 28,
        repeat: -1,
        ease: "none",
      });
      // pulse center
      gsap.to(".orbit-center-pulse", {
        scale: 1.15,
        opacity: 0.4,
        duration: 1.8,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        transformOrigin: "200px 200px",
      });
    }, svgRef);
    return () => ctx.revert();
  }, []);

  const CX = 200, CY = 200;
  const R_INNER = 58, R_OUTER = 130;

  // positions for core items (triangle)
  const corePositions = ORBIT_CORE.map((_, i) => {
    const angle = (i / ORBIT_CORE.length) * 2 * Math.PI - Math.PI / 2;
    return { x: CX + R_INNER * Math.cos(angle), y: CY + R_INNER * Math.sin(angle) };
  });

  // positions for ring items
  const ringPositions = ORBIT_RING.map((_, i) => {
    const angle = (i / ORBIT_RING.length) * 2 * Math.PI - Math.PI / 2;
    return { x: CX + R_OUTER * Math.cos(angle), y: CY + R_OUTER * Math.sin(angle) };
  });

  return (
    <svg
      ref={svgRef}
      width="400"
      height="400"
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-[320px] sm:max-w-[360px] lg:max-w-[400px] mx-auto"
    >
      {/* outer dashed orbit */}
      <circle cx={CX} cy={CY} r={R_OUTER} stroke="#1a1a1a" strokeWidth="1" strokeDasharray="4 8" />
      {/* inner orbit */}
      <circle cx={CX} cy={CY} r={R_INNER} stroke="#1e1e1e" strokeWidth="1" />

      {/* center glow */}
      <circle className="orbit-center-pulse" cx={CX} cy={CY} r={28} fill="#c8f55a" opacity="0.08" />
      <circle cx={CX} cy={CY} r={20} fill="#0f0f0f" stroke="#c8f55a" strokeWidth="1" strokeOpacity="0.4" />
      <text x={CX} y={CY + 4} textAnchor="middle" fill="#c8f55a" fontSize="9" fontFamily="monospace" opacity="0.8">CORE</text>

      {/* spoke lines from center to inner */}
      {corePositions.map((pos, i) => (
        <line key={i} x1={CX} y1={CY} x2={pos.x} y2={pos.y} stroke="#1e1e1e" strokeWidth="1" />
      ))}

      {/* inner core nodes */}
      {corePositions.map((pos, i) => (
        <g key={i}>
          <circle cx={pos.x} cy={pos.y} r={18} fill="#0d0d0d" stroke="#c8f55a" strokeWidth="1" strokeOpacity="0.5" />
          <text x={pos.x} y={pos.y + 4} textAnchor="middle" fill="#f0ece3" fontSize="7.5" fontFamily="monospace">
            {ORBIT_CORE[i]}
          </text>
        </g>
      ))}

      {/* rotating outer ring group */}
      <g className="orbit-ring-group">
        {ringPositions.map((pos, i) => (
          <g key={i}>
            <line x1={CX} y1={CY} x2={pos.x} y2={pos.y} stroke="#111" strokeWidth="1" />
            <circle cx={pos.x} cy={pos.y} r={22} fill="#0d0d0d" stroke="#2a2a2a" strokeWidth="1" />
            <text
              className="orbit-label"
              x={pos.x}
              y={pos.y + 4}
              textAnchor="middle"
              fill="#3a3a3a"
              fontSize="7"
              fontFamily="monospace"
            >
              {ORBIT_RING[i]}
            </text>
          </g>
        ))}
      </g>

      {/* decorative corner cross */}
      <line x1="10" y1="10" x2="24" y2="10" stroke="#1e1e1e" strokeWidth="1" />
      <line x1="17" y1="3" x2="17" y2="17" stroke="#1e1e1e" strokeWidth="1" />
      <line x1="376" y1="390" x2="390" y2="390" stroke="#1e1e1e" strokeWidth="1" />
      <line x1="383" y1="383" x2="383" y2="397" stroke="#1e1e1e" strokeWidth="1" />
    </svg>
  );
}

// ── Skill chip ────────────────────────────────────────────────────────────
function SkillChip({ name, level, note, color }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative cursor-default select-none transition-all duration-300"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="border px-3 py-2 transition-all duration-300 overflow-hidden"
        style={{
          borderColor: hovered ? color + "55" : "#1a1a1a",
          background: hovered ? color + "0d" : "#0d0d0d",
          maxHeight: hovered ? 120 : 44,
        }}
      >
        {/* top row */}
        <div className="flex items-center justify-between gap-3">
          <span
            className="font-mono text-[11px] tracking-[0.12em] transition-colors duration-300"
            style={{ color: hovered ? "#f0ece3" : "#3a3a3a" }}
          >
            {name}
          </span>
          <div className="flex items-center gap-2 shrink-0">
            {/* level dots */}
            <div className="flex gap-1">
              {LEVEL_ORDER.map((l, i) => (
                <div
                  key={l}
                  className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                  style={{
                    background: LEVEL_ORDER.indexOf(level) >= i
                      ? hovered ? color : "#2a2a2a"
                      : "#141414",
                  }}
                />
              ))}
            </div>
            <span
              className="font-mono text-[9px] tracking-[0.1em] uppercase transition-colors duration-300"
              style={{ color: hovered ? color : "#1e1e1e" }}
            >
              {level}
            </span>
          </div>
        </div>

        {/* expanded note */}
        <div
          className="overflow-hidden transition-all duration-300"
          style={{ maxHeight: hovered ? 60 : 0, opacity: hovered ? 1 : 0 }}
        >
          <p className="font-mono text-[10px] leading-relaxed pt-2 border-t mt-2" style={{ color: "#2a2a2a", borderColor: color + "22" }}>
            {note}
          </p>
        </div>
      </div>

      {/* accent left bar */}
      <div
        className="absolute left-0 top-0 bottom-0 w-px transition-all duration-300"
        style={{ background: hovered ? color : "transparent" }}
      />
    </div>
  );
}

// ── Skill group panel ─────────────────────────────────────────────────────
function SkillGroup({ group, index }) {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0,
          duration: 0.85,
          ease: "power3.out",
          delay: (index % 3) * 0.1,
          scrollTrigger: { trigger: ref.current, start: "top 88%" },
        }
      );
      gsap.fromTo(
        ref.current.querySelectorAll(".chip"),
        { opacity: 0, y: 16 },
        {
          opacity: 1, y: 0,
          stagger: 0.06,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: { trigger: ref.current, start: "top 85%" },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="opacity-0">
      {/* group header */}
      <div className="flex items-center gap-3 mb-4 pb-3 border-b" style={{ borderColor: "#111" }}>
        <span
          className="font-mono text-[11px] font-medium tracking-[0.1em]"
          style={{ color: group.color }}
        >
          {group.icon}
        </span>
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase" style={{ color: group.color, opacity: 0.7 }}>
          {group.label}
        </span>
        <span className="ml-auto font-mono text-[9px] text-[#1e1e1e]">{group.skills.length} skills</span>
      </div>

      {/* chips */}
      <div className="flex flex-col gap-1.5">
        {group.skills.map((skill) => (
          <div key={skill.name + skill.note} className="chip opacity-0">
            <SkillChip {...skill} color={group.color} />
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Level legend ──────────────────────────────────────────────────────────
function Legend() {
  return (
    <div className="flex items-center gap-6 flex-wrap">
      {LEVEL_ORDER.map((l, i) => (
        <div key={l} className="flex items-center gap-2">
          <div className="flex gap-1">
            {LEVEL_ORDER.map((_, j) => (
              <div key={j} className="w-1.5 h-1.5 rounded-full" style={{ background: i >= j ? "#3a3a3a" : "#141414" }} />
            ))}
          </div>
          <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-[#2a2a2a]">{l}</span>
        </div>
      ))}
      <span className="font-mono text-[10px] text-[#1a1a1a]">— hover chips for context</span>
    </div>
  );
}

// ── Summary bar ───────────────────────────────────────────────────────────
function SummaryBar() {
  const items = [
    { label: "Total Skills", value: SKILL_GROUPS.reduce((a, g) => a + g.skills.length, 0) },
    { label: "Categories", value: SKILL_GROUPS.length },
    { label: "Expert Level", value: SKILL_GROUPS.reduce((a, g) => a + g.skills.filter(s => s.level === "Expert").length, 0) },
    { label: "Yrs Experience", value: "1.5+" },
  ];
  const ref = useRef(null);
  useEffect(() => {
    gsap.fromTo(ref.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: ref.current, start: "top 90%" } });
  }, []);

  return (
    <div ref={ref} className="opacity-0 grid grid-cols-2 sm:grid-cols-4 border border-[#111] mb-16 sm:mb-20">
      {items.map((item, i) => (
        <div key={item.label} className={`px-5 py-4 flex flex-col gap-1 ${i < items.length - 1 ? "border-r border-[#111]" : ""}`}>
          <span className="font-display font-extrabold text-[#f0ece3]" style={{ fontSize: "clamp(24px, 4vw, 36px)" }}>
            {item.value}
          </span>
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#2a2a2a]">{item.label}</span>
        </div>
      ))}
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────
export default function Skills() {
  const sectionRef = useRef(null);
  const labelRef = useRef(null);
  const orbitRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(labelRef.current, { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.7, ease: "power3.out", scrollTrigger: { trigger: labelRef.current, start: "top 88%" } });
      gsap.fromTo(orbitRef.current, { opacity: 0, scale: 0.92 }, { opacity: 1, scale: 1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: orbitRef.current, start: "top 85%" } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="stack"
      ref={sectionRef}
      className="relative bg-[#0a0a0a] py-24 sm:py-36 px-5 sm:px-8 lg:px-14 overflow-hidden"
    >
      {/* dot grid background */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: "radial-gradient(circle, #1a1a1a 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          opacity: 0.5,
        }}
      />

      {/* ghost number */}
      <div
        className="pointer-events-none absolute top-10 right-4 sm:right-14 font-display font-extrabold select-none leading-none z-0"
        style={{ fontSize: "clamp(100px, 18vw, 200px)", color: "transparent", WebkitTextStroke: "1px #0d0d0d" }}
        aria-hidden
      >
        04
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* ── header ── */}
        <div ref={labelRef} className="opacity-0 flex items-center gap-3 mb-10 sm:mb-14">
          <span className="font-mono text-[10px] tracking-[0.35em] uppercase text-[#c8f55a]">Tech Stack</span>
          <span className="h-px w-10 bg-[#c8f55a] opacity-30" />
        </div>

        {/* ── top: title + orbit ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12 lg:gap-8 items-center mb-16 sm:mb-24">
          <div>
            <h2
              className="font-display font-extrabold leading-[0.9] tracking-tight mb-6"
              style={{ fontSize: "clamp(44px, 7vw, 86px)" }}
            >
              <span className="text-[#f0ece3]">Tools I</span>
              <br />
              <span style={{ color: "transparent", WebkitTextStroke: "1.5px #2a2a2a" }}>Build</span>
              <br />
              <span className="text-[#c8f55a]">With.</span>
            </h2>
            <p className="font-display text-[15px] sm:text-[16px] text-[#2e2e2e] leading-relaxed max-w-sm mb-8">
              Frontend-first, full-stack curious. My stack is carefully chosen for
              performance, DX, and the ability to ship fast without cutting corners.
            </p>
            <Legend />
          </div>

          {/* orbit diagram */}
          <div ref={orbitRef} className="opacity-0">
            <OrbitDiagram />
          </div>
        </div>

        {/* ── summary bar ── */}
        <SummaryBar />

        {/* ── skill groups grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {SKILL_GROUPS.map((group, i) => (
            <SkillGroup key={group.id} group={group} index={i} />
          ))}
        </div>

        {/* ── bottom cta ── */}
        <div className="mt-20 sm:mt-28 pt-10 border-t border-[#111] flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <p className="font-display font-semibold text-[16px] text-[#f0ece3] mb-1">
              Always learning something new.
            </p>
            <p className="font-mono text-[11px] tracking-[0.1em] text-[#2a2a2a]">
              Currently exploring: Three.js · tRPC · Bun · Astro
            </p>
          </div>
          <a
            href="https://github.com/mamun-swe"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] uppercase text-[#2a2a2a] border border-[#1a1a1a] px-6 py-3 hover:text-[#c8f55a] hover:border-[#c8f55a] transition-colors duration-300 w-fit"
          >
            See my code on GitHub ↗
          </a>
        </div>
      </div>
    </section>
  );
}
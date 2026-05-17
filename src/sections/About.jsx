import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ── Data ─────────────────────────────────────────────────────────────────
const STATS = [
  { value: "1.5+", label: "Years Experience" },
  { value: "10+", label: "Projects Shipped" },
  { value: "500K+", label: "Records Managed" },
  { value: "3", label: "Languages in UI" },
];

const TRAITS = [
  {
    index: "01",
    title: "Performance First",
    desc: "I obsess over load times, bundle sizes, and render cycles. Every millisecond matters when you're handling 500K+ records.",
  },
  {
    index: "02",
    title: "Clean Architecture",
    desc: "Reusable components, scalable state management, and readable code that teammates actually enjoy working with.",
  },
  {
    index: "03",
    title: "Full-Stack Curious",
    desc: "Rooted in frontend but expanding into Node.js and REST APIs — I want to understand the whole system, not just the surface.",
  },
];

const TIMELINE = [
  {
    period: "Nov 2024 — Now",
    role: "Junior Frontend Developer",
    company: "Visionary Tech Solution",
    type: "Full-time",
  },
  {
    period: "Aug — Oct 2024",
    role: "Frontend Developer",
    company: "GrapView",
    type: "Internship",
  },
  {
    period: "May 2019 — Jul 2024",
    role: "B.Sc Software Engineering",
    company: "Daffodil International University",
    type: "Education · CGPA 3.1",
  },
];

// ── Helpers ───────────────────────────────────────────────────────────────
function revealOnScroll(el, vars = {}) {
  gsap.fromTo(
    el,
    { opacity: 0, y: 40, ...vars.from },
    {
      opacity: 1,
      y: 0,
      duration: 0.85,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 88%",
        toggleActions: "play none none none",
      },
      ...vars.to,
    },
  );
}

// ── Sub-components ────────────────────────────────────────────────────────
function SectionLabel({ children }) {
  return (
    <div className="flex items-center gap-3 mb-10 sm:mb-14">
      <span className="font-mono text-[10px] tracking-[0.35em] uppercase text-[#c8f55a]">
        {children}
      </span>
      <span className="h-px flex-1 max-w-[40px] bg-[#c8f55a] opacity-30" />
    </div>
  );
}

function StatCard({ value, label, index }) {
  const ref = useRef(null);
  useEffect(() => {
    revealOnScroll(ref.current, {
      from: { y: 30 },
      to: { delay: index * 0.08 },
    });
  }, []);

  return (
    <div
      ref={ref}
      className="opacity-0 border border-[#1a1a1a] p-5 sm:p-6 flex flex-col gap-1 group hover:border-[#c8f55a] transition-colors duration-500"
    >
      <span
        className="font-display font-extrabold text-[#f0ece3] leading-none group-hover:text-[#c8f55a] transition-colors duration-300"
        style={{ fontSize: "clamp(32px, 5vw, 48px)" }}
      >
        {value}
      </span>
      <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#2e2e2e]">
        {label}
      </span>
    </div>
  );
}

function TraitRow({ index, title, desc, i }) {
  const ref = useRef(null);
  useEffect(() => {
    revealOnScroll(ref.current, { to: { delay: i * 0.1 } });
  }, []);

  return (
    <div
      ref={ref}
      className="opacity-0 group flex gap-5 sm:gap-8 py-6 border-b border-[#111] hover:border-[#1e1e1e] transition-colors duration-300 cursor-default"
    >
      <span className="font-mono text-[10px] text-[#1e1e1e] group-hover:text-[#c8f55a] transition-colors duration-300 pt-1 shrink-0">
        {index}
      </span>
      <div className="flex flex-col sm:flex-row sm:items-start sm:gap-10 flex-1">
        <h3 className="font-display font-semibold text-[15px] sm:text-[16px] text-[#f0ece3] mb-2 sm:mb-0 sm:w-44 shrink-0">
          {title}
        </h3>
        <p className="font-mono text-[12px] sm:text-[13px] leading-relaxed text-[#3a3a3a] group-hover:text-[#555] transition-colors duration-300">
          {desc}
        </p>
      </div>
      <span className="hidden sm:block text-[#1a1a1a] group-hover:text-[#2a2a2a] transition-colors duration-300 self-center text-sm">
        →
      </span>
    </div>
  );
}

function TimelineItem({ period, role, company, type, i }) {
  const ref = useRef(null);
  useEffect(() => {
    revealOnScroll(ref.current, {
      from: { x: -20, y: 0 },
      to: { delay: i * 0.1 },
    });
  }, []);

  return (
    <div
      ref={ref}
      className="opacity-0 relative pl-5 pb-8 last:pb-0 border-l border-[#1a1a1a] group hover:border-[#c8f55a] transition-colors duration-500"
    >
      {/* dot */}
      <div className="absolute -left-[4.5px] top-0 w-2 h-2 border border-[#2a2a2a] bg-[#0a0a0a] group-hover:bg-[#c8f55a] group-hover:border-[#c8f55a] transition-all duration-300" />

      <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-[#2a2a2a] mb-2 block">
        {period}
      </span>
      <h4 className="font-display font-semibold text-[14px] text-[#f0ece3] mb-0.5">
        {role}
      </h4>
      <div className="flex items-center gap-2 flex-wrap">
        <span className="font-mono text-[11px] text-[#3a3a3a]">{company}</span>
        <span className="text-[#1a1a1a] text-[10px]">·</span>
        <span className="font-mono text-[10px] text-[#c8f55a] opacity-70">
          {type}
        </span>
      </div>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────
export default function About() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const bioRef = useRef(null);
  const imgBlockRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // big heading word by word
      gsap.fromTo(
        headingRef.current.querySelectorAll(".word"),
        { opacity: 0, y: 50, skewY: 3 },
        {
          opacity: 1,
          y: 0,
          skewY: 0,
          stagger: 0.08,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
          },
        },
      );

      // bio text
      revealOnScroll(bioRef.current, { to: { delay: 0.2 } });

      // image block
      gsap.fromTo(
        imgBlockRef.current,
        { opacity: 0, scale: 0.96, y: 30 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: imgBlockRef.current,
            start: "top 85%",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative bg-[#0a0a0a] py-24 sm:py-36 px-5 sm:px-8 lg:px-14 overflow-hidden"
    >
      {/* background grid number */}
      <div
        className="pointer-events-none absolute top-16 right-4 sm:right-14 font-display font-extrabold select-none leading-none"
        style={{
          fontSize: "clamp(100px, 20vw, 220px)",
          color: "transparent",
          WebkitTextStroke: "1px #0f0f0f",
        }}
        aria-hidden
      >
        02
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* ── section label ── */}
        <SectionLabel>About me</SectionLabel>

        {/* ── top: heading + image ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-10 lg:gap-16 mb-16 sm:mb-24">
          <div>
            {/* big heading */}
            <div ref={headingRef} className="overflow-hidden mb-8">
              <h2
                className="font-display font-extrabold leading-[0.9] tracking-tight text-[#f0ece3]"
                style={{ fontSize: "clamp(42px, 7.5vw, 88px)" }}
              >
                {["Crafting", "Experiences,", "Not Just", "Interfaces."].map(
                  (w) => (
                    <span
                      key={w}
                      className="word inline-block opacity-0 mr-[0.2em] last:mr-0"
                    >
                      {w === "Interfaces." ? (
                        <span
                          style={{
                            color: "transparent",
                            WebkitTextStroke: "1.5px #2a2a2a",
                          }}
                        >
                          {w}
                        </span>
                      ) : (
                        w
                      )}
                    </span>
                  ),
                )}
              </h2>
            </div>

            {/* bio */}
            <div ref={bioRef} className="opacity-0 space-y-4 max-w-xl">
              <p className="font-display text-[15px] sm:text-[16px] text-[#3a3a3a] leading-relaxed">
                I'm <span className="text-[#f0ece3]">Abdullah</span> — a
                frontend-focused software engineer from{" "}
                <span className="text-[#f0ece3]">Dhaka, Bangladesh</span>, with
                1.5+ years building production-grade web apps that balance clean
                code with great UX.
              </p>
              <p className="font-display text-[15px] sm:text-[16px] text-[#3a3a3a] leading-relaxed">
                My stack is centred around{" "}
                <span className="text-[#c8f55a]">React</span>,{" "}
                <span className="text-[#c8f55a]">TypeScript</span>, and{" "}
                <span className="text-[#c8f55a]">Next.js</span> — but I care
                more about solving the right problem than defending a particular
                tool.
              </p>
              <p className="font-display text-[15px] sm:text-[16px] text-[#3a3a3a] leading-relaxed">
                Outside of code I'm drawn to motion design, design systems, and
                finding the one layout decision that makes a UI feel inevitable.
              </p>

              {/* links */}
              <div className="flex items-center gap-4 pt-2 flex-wrap">
                <a
                  href="https://mamun-swe.github.io/me"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#c8f55a] hover:opacity-70 transition-opacity duration-200"
                >
                  Portfolio ↗
                </a>
                <span className="text-[#1a1a1a]">·</span>
                <a
                  href="https://github.com/Robin-Draggy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#2a2a2a] hover:text-[#f0ece3] transition-colors duration-200"
                >
                  GitHub ↗
                </a>
                <span className="text-[#1a1a1a]">·</span>
                <a
                  href="https://www.linkedin.com/in/abdullah~webdev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#2a2a2a] hover:text-[#f0ece3] transition-colors duration-200"
                >
                  LinkedIn ↗
                </a>
              </div>
            </div>
          </div>

          {/* image / avatar block */}
          <div ref={imgBlockRef} className="opacity-0 lg:self-start">
            <div className="relative w-full max-w-[280px] mx-auto lg:mx-0">
              {/* placeholder portrait */}
              <div
                className="w-full aspect-[3/4] border border-[#1a1a1a] flex flex-col items-center justify-center gap-3 relative overflow-hidden"
                style={{ background: "#0d0d0d" }}
              >
                {/* initials */}
                <span
                  className="font-display font-extrabold text-[#111] select-none"
                  style={{
                    fontSize: "clamp(72px, 14vw, 96px)",
                    letterSpacing: "-0.05em",
                  }}
                >
                  AM
                </span>
                {/* subtle scanlines */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    backgroundImage: `url('/images/me.jpg'), repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.012) 2px, rgba(255,255,255,0.012) 4px)`,
                    backgroundSize: "cover", // or "contain" / specific size like "300px"
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                />
                {/* corner accents */}
                <div className="absolute top-3 left-3 w-5 h-5 border-t border-l border-[#c8f55a] opacity-60" />
                <div className="absolute bottom-3 right-3 w-5 h-5 border-b border-r border-[#c8f55a] opacity-60" />
              </div>

              {/* floating tag */}
              <div className="absolute -bottom-4 -right-4 bg-[#c8f55a] px-4 py-2 flex flex-col">
                <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-[#0a0a0a]">
                  Based in
                </span>
                <span className="font-display font-bold text-[13px] text-[#0a0a0a] leading-tight">
                  Dhaka, BD
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── stats grid ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-[#111] mb-20 sm:mb-28">
          {STATS.map((s, i) => (
            <div key={s.label} className="bg-[#0a0a0a]">
              <StatCard {...s} index={i} />
            </div>
          ))}
        </div>

        {/* ── bottom: traits + timeline ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-16 lg:gap-24">
          {/* traits */}
          <div>
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#2a2a2a] mb-6">
              How I work
            </p>
            <div className="border-t border-[#111]">
              {TRAITS.map((t, i) => (
                <TraitRow key={t.index} {...t} i={i} />
              ))}
            </div>
          </div>

          {/* timeline */}
          <div>
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#2a2a2a] mb-6">
              Journey
            </p>
            <div>
              {TIMELINE.map((item, i) => (
                <TimelineItem key={item.company} {...item} i={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

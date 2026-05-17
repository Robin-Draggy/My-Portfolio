// src/sections/Skills.jsx
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Legend from "../components/skills/Legend";
import OrbitDiagram from "../components/skills/OrbitDiagram";
import SummaryBar from "../components/skills/SummaryBar";
import SkillGroup from "../components/skills/SkillGroup";
import { SKILL_GROUPS } from "../components/skills/constants";

gsap.registerPlugin(ScrollTrigger);

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
      id="skills"
      ref={sectionRef}
      className="relative bg-[#0a0a0a] py-24 sm:py-36 px-5 sm:px-8 lg:px-14 overflow-hidden"
    >
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: "radial-gradient(circle, #1a1a1a 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          opacity: 0.5,
        }}
      />

      <div
        className="pointer-events-none absolute top-10 right-4 sm:right-14 font-display font-extrabold select-none leading-none z-0"
        style={{ fontSize: "clamp(100px, 18vw, 200px)", color: "transparent", WebkitTextStroke: "1px #0d0d0d" }}
        aria-hidden
      >
        04
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div ref={labelRef} className="opacity-0 flex items-center gap-3 mb-10 sm:mb-14">
          <span className="font-mono text-[10px] tracking-[0.35em] uppercase text-[#c8f55a]">Tech Stack</span>
          <span className="h-px w-10 bg-[#c8f55a] opacity-30" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12 lg:gap-8 items-center mb-16 sm:mb-24">
          <div>
            <div className="overflow-hidden mb-2">
              <h2
                className="font-display font-extrabold leading-[0.88] tracking-tight text-[#f0ece3]"
                style={{ fontSize: "clamp(52px, 9vw, 108px)" }}
              >
                TOOLS I
              </h2>
            </div>
            <div className="overflow-hidden mb-2">
              <h2
                className="font-display font-extrabold leading-[0.88] tracking-tight"
                style={{
                  fontSize: "clamp(52px, 9vw, 108px)",
                  color: "transparent",
                  WebkitTextStroke: "1.5px #2a2a2a",
                }}
              >
                BUILD
              </h2>
            </div>
            <div className="overflow-hidden mb-10">
              <h2
                className="font-display font-extrabold leading-[0.88] tracking-tight text-[#c8f55a]"
                style={{ fontSize: "clamp(52px, 9vw, 108px)" }}
              >
                WITH.
              </h2>
            </div>

            <p className="font-display text-[15px] sm:text-[16px] text-[#2e2e2e] leading-relaxed max-w-sm mb-8">
              Frontend-first, full-stack curious. My stack is carefully chosen for
              performance, DX, and the ability to ship fast without cutting corners.
            </p>
            <Legend />
          </div>

          <div ref={orbitRef} className="opacity-0">
            <OrbitDiagram />
          </div>
        </div>

        <SummaryBar />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {SKILL_GROUPS.map((group, i) => (
            <SkillGroup key={group.id} group={group} index={i} />
          ))}
        </div>

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
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SKILL_GROUPS } from "./constants";

gsap.registerPlugin(ScrollTrigger);

export default function SummaryBar() {
  const items = [
    { label: "Total Skills", value: SKILL_GROUPS.reduce((a, g) => a + g.skills.length, 0) },
    { label: "Categories", value: SKILL_GROUPS.length },
    { label: "Expert Level", value: SKILL_GROUPS.reduce((a, g) => a + g.skills.filter(s => s.level === "Expert").length, 0) },
    { label: "Yrs Experience", value: "2+" },
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
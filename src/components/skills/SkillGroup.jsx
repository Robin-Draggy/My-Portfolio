import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SkillChip from "./SkillChip";

gsap.registerPlugin(ScrollTrigger);

export default function SkillGroup({ group, index }) {
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
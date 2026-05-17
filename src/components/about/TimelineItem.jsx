import { useEffect, useRef } from "react";
import { revealOnScroll } from "./animations";

export default function TimelineItem({ period, role, company, type, i }) {
  const ref = useRef(null);
  
  useEffect(() => {
    revealOnScroll(ref.current, {
      from: { x: -20, y: 0 },
      to: { delay: i * 0.1 },
    });
  }, [i]);

  return (
    <div
      ref={ref}
      className="opacity-0 relative pl-5 pb-8 last:pb-0 border-l border-[#1a1a1a] group hover:border-[#c8f55a] transition-colors duration-500"
    >
      <div className="absolute left-[-4.5px] top-0 w-2 h-2 border border-[#2a2a2a] bg-[#0a0a0a] group-hover:bg-[#c8f55a] group-hover:border-[#c8f55a] transition-all duration-300" />
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
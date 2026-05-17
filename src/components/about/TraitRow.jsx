import { useEffect, useRef } from "react";
import { revealOnScroll } from "./animations";

export default function TraitRow({ index, title, desc, i }) {
  const ref = useRef(null);
  
  useEffect(() => {
    revealOnScroll(ref.current, { to: { delay: i * 0.1 } });
  }, [i]);

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
import { useEffect, useRef } from "react";
import { revealOnScroll } from "./animations";

export default function StatCard({ value, label, index }) {
  const ref = useRef(null);
  
  useEffect(() => {
    revealOnScroll(ref.current, {
      from: { y: 30 },
      to: { delay: index * 0.08 },
    });
  }, [index]);

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
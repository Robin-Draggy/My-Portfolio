import { SKILLS } from "./constants";

export default function Marquee() {
  const items = [...SKILLS, ...SKILLS];
  
  return (
    <div className="relative overflow-hidden border-t border-b border-[#1a1a1a] py-3">
      <div className="flex w-max animate-marquee gap-0">
        {items.map((s, i) => (
          <span key={i} className="flex items-center gap-4 px-4">
            <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#3a3a3a] hover:text-[#c8f55a] transition-colors duration-300 cursor-default whitespace-nowrap">
              {s}
            </span>
            <span className="text-[#1e1e1e] text-xs">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
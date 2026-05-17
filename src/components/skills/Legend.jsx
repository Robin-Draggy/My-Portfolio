import { LEVEL_ORDER } from "./constants";

export default function Legend() {
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
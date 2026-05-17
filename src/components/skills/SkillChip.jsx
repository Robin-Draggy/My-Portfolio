import { useState } from "react";
import { LEVEL_ORDER } from "./constants";

export default function SkillChip({ name, level, note, color }) {
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
        <div className="flex items-center justify-between gap-3">
          <span
            className="font-mono text-[11px] tracking-[0.12em] transition-colors duration-300"
            style={{ color: hovered ? "#f0ece3" : "#3a3a3a" }}
          >
            {name}
          </span>
          <div className="flex items-center gap-2 shrink-0">
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

        <div
          className="overflow-hidden transition-all duration-300"
          style={{ maxHeight: hovered ? 60 : 0, opacity: hovered ? 1 : 0 }}
        >
          <p className="font-mono text-[10px] leading-relaxed pt-2 border-t mt-2" style={{ color: "#2a2a2a", borderColor: color + "22" }}>
            {note}
          </p>
        </div>
      </div>

      <div
        className="absolute left-0 top-0 bottom-0 w-px transition-all duration-300"
        style={{ background: hovered ? color : "transparent" }}
      />
    </div>
  );
}
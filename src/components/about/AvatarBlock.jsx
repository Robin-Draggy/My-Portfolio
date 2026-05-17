import { useRef, useEffect } from "react";
import { animateImageBlock } from "./animations";

export default function AvatarBlock() {
  const imgBlockRef = useRef(null);

  useEffect(() => {
    animateImageBlock(imgBlockRef.current);
  }, []);

  return (
    <div ref={imgBlockRef} className="opacity-0 lg:self-start">
      <div className="relative w-full max-w-[280px] mx-auto lg:mx-0">
        <div
          className="w-full aspect-[3/4] border border-[#1a1a1a] flex flex-col items-center justify-center gap-3 relative overflow-hidden"
          style={{ background: "#0d0d0d" }}
        >
          <span
            className="font-display font-extrabold text-[#111] select-none"
            style={{
              fontSize: "clamp(72px, 14vw, 96px)",
              letterSpacing: "-0.05em",
            }}
          >
            AM
          </span>
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `url('/images/me.jpg'), repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.012) 2px, rgba(255,255,255,0.012) 4px)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />
          <div className="absolute top-3 left-3 w-5 h-5 border-t border-l border-[#c8f55a] opacity-60" />
          <div className="absolute bottom-3 right-3 w-5 h-5 border-b border-r border-[#c8f55a] opacity-60" />
        </div>

        <div className="absolute -bottom-4 -right-4 bg-[#c8f55a] px-4 py-2 flex flex-col">
          <h3 className="font-mono text-[9px] tracking-[0.2em] uppercase text-[#0a0a0a]">
            Based in
          </h3>
          <h3 className="font-display font-bold text-[13px] text-[#0a0a0a] leading-tight">
            Dhaka, BD
          </h3>
        </div>
      </div>
    </div>
  );
}
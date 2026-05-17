export default function WorkHeader({ description }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16 sm:mb-20">
      <div>
        <div className="flex items-center gap-3 mb-10">
          <span className="font-mono text-[10px] tracking-[0.35em] uppercase text-[#c8f55a]">
            Selected Work
          </span>
          <span className="h-px w-10 bg-[#c8f55a] opacity-30" />
        </div>

        <div className="overflow-hidden mb-2">
          <h2 className="font-display font-extrabold leading-[0.88] tracking-tight text-[#f0ece3]" style={{ fontSize: "clamp(52px, 9vw, 108px)" }}>
            THINGS I'VE
          </h2>
        </div>
        <div className="overflow-hidden mb-10">
          <h2 className="font-display font-extrabold leading-[0.88] tracking-tight" style={{ fontSize: "clamp(52px, 9vw, 108px)", color: "transparent", WebkitTextStroke: "1.5px #2a2a2a" }}>
            BUILT.
          </h2>
        </div>
      </div>
      <p className="font-mono text-[11px] text-[#1e1e1e] max-w-[200px] leading-relaxed">
        {description}
      </p>
    </div>
  );
}
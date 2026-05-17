export default function Toolbar({ active, total, onPrev, onNext, accent }) {
  return (
    <div className="flex items-center gap-3 bg-[#0c0c0c] border border-[#1a1a1a] px-5 py-3">
      <button
        onClick={onPrev}
        className="font-mono text-[10px] tracking-[0.15em] uppercase text-[#2a2a2a] hover:text-[#f0ece3] transition-colors px-2 py-1"
      >
        ← Prev
      </button>
      <div className="flex items-center gap-1.5">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className="rounded-full transition-all duration-300"
            style={{ width: i === active ? 20 : 6, height: 6, background: i === active ? accent : "#1e1e1e" }}
          />
        ))}
      </div>
      <button
        onClick={onNext}
        className="font-mono text-[10px] tracking-[0.15em] uppercase text-[#2a2a2a] hover:text-[#f0ece3] transition-colors px-2 py-1"
      >
        Next →
      </button>
    </div>
  );
}
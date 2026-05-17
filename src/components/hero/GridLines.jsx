export default function GridLines() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0" aria-hidden>
      {/* vertical lines - more density */}
      {[...Array(24)].map((_, i) => (
        <div
          key={`v-${i}`}
          className="absolute top-0 bottom-0 w-px bg-[#111]"
          style={{ left: `${(i + 1) * (100 / 25)}%` }}
        />
      ))}
      
      {/* horizontal lines - more rows */}
      {[...Array(12)].map((_, i) => (
        <div
          key={`h-${i}`}
          className="absolute left-0 right-0 h-px bg-[#111]"
          style={{ top: `${(i + 1) * (100 / 13)}%` }}
        />
      ))}
    </div>
  );
}
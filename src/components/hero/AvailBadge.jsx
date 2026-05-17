export default function AvailBadge() {
  return (
    <div className="flex items-center gap-2 border border-[#1e1e1e] px-3 py-1.5 w-fit">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c8f55a] opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#c8f55a]" />
      </span>
      <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#3a3a3a]">
        Available for work
      </span>
    </div>
  );
}
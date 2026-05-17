export default function SectionLabel({ children }) {
  return (
    <div className="flex items-center gap-3 mb-10 sm:mb-14">
      <span className="font-mono text-[10px] tracking-[0.35em] uppercase text-[#c8f55a]">
        {children}
      </span>
      <span className="h-px flex-1 max-w-[40px] bg-[#c8f55a] opacity-30" />
    </div>
  );
}
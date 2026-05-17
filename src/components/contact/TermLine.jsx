export default function TermLine({ prompt = "$", label, children, accent = "#c8f55a", dim = false }) {
  return (
    <div className="flex gap-2 font-mono text-[12px] sm:text-[13px] leading-relaxed">
      <span style={{ color: dim ? "#2a2a2a" : accent, userSelect: "none" }}>{prompt}</span>
      {label && <span className="text-[#2a2a2a]">{label}</span>}
      <span className="text-[#3a3a3a]">{children}</span>
    </div>
  );
}
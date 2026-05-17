import { PROJECTS } from "./constants";

function TabButtons({ projects, featured, setFeatured, accent }) {
  return (
    <div className="flex border-b border-[#111] overflow-x-auto">
      {projects.map((p, i) => (
        <button
          key={p.id}
          onClick={() => setFeatured(i)}
          className="flex items-center gap-2 px-5 py-3 shrink-0 border-r border-[#111] transition-all duration-300"
          style={{ background: featured === i ? p.accent + "0d" : "transparent" }}
        >
          <div className="w-1.5 h-1.5 rounded-full transition-colors duration-300" style={{ background: featured === i ? p.accent : "#1e1e1e" }} />
          <span className="font-mono text-[10px] tracking-[0.15em] uppercase transition-colors duration-300" style={{ color: featured === i ? p.accent : "#2a2a2a" }}>
            {p.id}
          </span>
        </button>
      ))}
    </div>
  );
}

export default function FeaturedStrip({ featured, setFeatured, onOpen }) {
  const project = PROJECTS[featured];
  const { accent, title, subtitle, description, highlights, tags, github } = project;

  return (
    <div className="mt-16 sm:mt-20 border border-[#111] overflow-hidden">
      <TabButtons projects={PROJECTS} featured={featured} setFeatured={setFeatured} accent={accent} />

      <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-0">
        <div className="p-6 sm:p-8 border-r border-[#111]">
          <h3 className="font-display font-extrabold tracking-tight text-[#f0ece3] mb-1" style={{ fontSize: "clamp(24px, 4vw, 40px)" }}>
            {title}
          </h3>
          <p className="font-mono text-[11px] tracking-[0.15em] uppercase mb-5" style={{ color: accent, opacity: 0.6 }}>
            {subtitle}
          </p>
          <p className="font-display text-[14px] text-[#2e2e2e] leading-relaxed max-w-lg mb-6">
            {description}
          </p>
          <div className="flex flex-wrap gap-2">
            {highlights.map((h) => (
              <span key={h} className="font-mono text-[10px] tracking-[0.12em] uppercase px-3 py-1.5 border" style={{ borderColor: accent + "30", color: accent, opacity: 0.7 }}>
                {h}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-start sm:items-end justify-between gap-4 p-6 sm:p-8">
          <div className="flex flex-col gap-2">
            {tags.map((t) => (
              <span key={t} className="font-mono text-[10px] text-[#1e1e1e]">{t}</span>
            ))}
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={() => onOpen(project)}
              className="flex items-center gap-2 font-mono text-[10px] tracking-[0.18em] uppercase px-5 py-2.5 hover:opacity-80 transition-opacity"
              style={{ background: accent, color: "#0a0a0a" }}
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10" />
                <path d="m10 8 6 4-6 4V8z" />
              </svg>
              Open
            </button>
            <a href={github} target="_blank" rel="noopener noreferrer" className="font-mono text-[10px] tracking-[0.18em] uppercase px-5 py-2.5 border border-[#1a1a1a] text-[#2a2a2a] hover:text-[#f0ece3] hover:border-[#2a2a2a] transition-colors">
              GitHub ↗
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
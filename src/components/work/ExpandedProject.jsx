import { useEffect, useRef, useState } from "react";
import IframePreview from "./IframePreview";
import { animateExpandedOverlay, closeExpandedOverlay } from "./animations";

function InfoTab({ project, accent }) {
  const { title, subtitle, description, highlights, tags, previewUrl, github } = project;
  
  return (
    <div className="flex-1 overflow-y-auto p-5 sm:p-8 lg:p-10">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8 lg:gap-12">
        <div>
          <h2
            className="font-display font-extrabold leading-none tracking-tight text-[#f0ece3] mb-2"
            style={{ fontSize: "clamp(36px, 6vw, 72px)" }}
          >
            {title}
          </h2>
          <p
            className="font-mono text-[11px] tracking-[0.2em] uppercase mb-8"
            style={{ color: accent, opacity: 0.6 }}
          >
            {subtitle}
          </p>
          <p className="font-display text-[15px] text-[#3a3a3a] leading-relaxed mb-8 max-w-lg">
            {description}
          </p>
          <div className="flex gap-3 flex-wrap">
            <a
              href={previewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-mono text-[11px] tracking-[0.18em] uppercase px-6 py-3 hover:opacity-80 transition-opacity"
              style={{ background: accent, color: "#0a0a0a" }}
            >
              Live Site ↗
            </a>
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] tracking-[0.18em] uppercase px-6 py-3 border border-[#1e1e1e] text-[#2a2a2a] hover:text-[#f0ece3] hover:border-[#2a2a2a] transition-colors"
            >
              GitHub ↗
            </a>
          </div>
        </div>
        
        <div>
          <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#1e1e1e] mb-4">
            Highlights
          </p>
          <div className="flex flex-col gap-2 mb-8">
            {highlights.map((h) => (
              <div key={h} className="flex items-center gap-3 py-2 border-b border-[#0f0f0f]">
                <div className="w-1 h-1 rounded-full shrink-0" style={{ background: accent }} />
                <span className="font-mono text-[12px] text-[#3a3a3a]">{h}</span>
              </div>
            ))}
          </div>
          <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#1e1e1e] mb-3">
            Stack
          </p>
          <div className="flex flex-wrap gap-2">
            {tags.map((t) => (
              <span
                key={t}
                className="font-mono text-[10px] tracking-[0.12em] px-2.5 py-1 border"
                style={{ borderColor: accent + "25", color: accent, opacity: 0.6 }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ExpandedProject({ project, onClose }) {
  const [tab, setTab] = useState("info");
  const overlayRef = useRef(null);
  const contentRef = useRef(null);
  const { accent, previewUrl, type, year } = project;

  useEffect(() => {
    animateExpandedOverlay(overlayRef.current, contentRef.current);
    
    const onKey = (e) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const handleClose = () => {
    closeExpandedOverlay(contentRef.current, overlayRef.current, onClose);
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
      style={{ background: "rgba(0,0,0,0.92)", backdropFilter: "blur(12px)" }}
      onClick={(e) => {
        if (e.target === overlayRef.current) handleClose();
      }}
    >
      <div
        ref={contentRef}
        className="relative w-full max-w-5xl flex flex-col border overflow-hidden"
        style={{ height: "min(88vh, 680px)", background: "#0c0c0c", borderColor: accent + "44" }}
      >
        <div className="flex items-center justify-between px-5 sm:px-8 py-4 border-b shrink-0" style={{ borderColor: "#111" }}>
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase" style={{ color: accent, opacity: 0.7 }}>
              {type}
            </span>
            <span className="text-[#1e1e1e]">·</span>
            <span className="font-mono text-[10px] text-[#2a2a2a]">{year}</span>
          </div>
          
          <div className="flex items-center gap-1">
            {["info", "preview"].map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className="font-mono text-[10px] tracking-[0.15em] uppercase px-3 py-1.5 border transition-all duration-200"
                style={{
                  borderColor: tab === t ? accent + "55" : "#1a1a1a",
                  color: tab === t ? accent : "#2a2a2a",
                  background: tab === t ? accent + "0d" : "transparent",
                }}
              >
                {t}
              </button>
            ))}
            <button
              onClick={handleClose}
              className="ml-2 w-8 h-8 flex items-center justify-center border border-[#1a1a1a] text-[#2a2a2a] hover:text-[#f0ece3] hover:border-[#2a2a2a] transition-colors font-mono text-[12px]"
            >
              ✕
            </button>
          </div>
        </div>

        {tab === "info" ? (
          <InfoTab project={project} accent={accent} />
        ) : (
          <div className="flex-1 overflow-hidden">
            <IframePreview url={previewUrl} accent={accent} />
          </div>
        )}
      </div>
    </div>
  );
}
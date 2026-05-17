import { useState } from "react";

export default function IframePreview({ url, accent }) {
  const [status, setStatus] = useState("loading"); // loading | ready | blocked

  return (
    <div className="relative w-full h-full" style={{ background: "#080808" }}>
      {status === "loading" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 z-10">
          <div
            className="w-7 h-7 rounded-full border-2 border-t-transparent animate-spin"
            style={{ borderColor: accent, borderTopColor: "transparent" }}
          />
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#2a2a2a]">
            Loading…
          </span>
        </div>
      )}
      
      {status === "blocked" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8 text-center z-10">
          <div
            className="w-12 h-12 border flex items-center justify-center"
            style={{ borderColor: accent + "44" }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke={accent}
              strokeWidth="1.5"
              opacity="0.6"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
            </svg>
          </div>
          <p className="font-display font-semibold text-[14px] text-[#f0ece3] mb-1">
            Preview blocked
          </p>
          <p className="font-mono text-[11px] text-[#2a2a2a]">
            This site doesn't allow embedding.
          </p>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[10px] tracking-[0.15em] uppercase px-5 py-2.5 hover:opacity-80"
            style={{ background: accent, color: "#0a0a0a" }}
          >
            Open in new tab ↗
          </a>
        </div>
      )}
      
      <iframe
        src={url}
        title="preview"
        className="w-full h-full border-0"
        style={{
          opacity: status === "ready" ? 1 : 0,
          transition: "opacity 0.4s",
          display: status === "blocked" ? "none" : "block",
        }}
        onLoad={() => setStatus("ready")}
        onError={() => setStatus("blocked")}
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
      />
    </div>
  );
}
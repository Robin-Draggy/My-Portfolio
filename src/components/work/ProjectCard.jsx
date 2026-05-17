import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { animateProjectCard } from "./animations";

export default function ProjectCard({ project, index, onOpen, isVisible }) {
  const cardRef = useRef(null);
  const glowRef = useRef(null);
  const { id, title, subtitle, year, type, accent, rotate, tags } = project;

  const onMouseMove = useCallback((e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(el, {
      rotateX: -y * 14,
      rotateY: x * 14,
      duration: 0.4,
      ease: "power2.out",
      transformPerspective: 800,
    });
    gsap.to(glowRef.current, {
      x: x * 60,
      y: y * 60,
      opacity: 0.6,
      duration: 0.4,
    });
  }, []);

  const onMouseLeave = useCallback(() => {
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      rotate: rotate,
      duration: 0.7,
      ease: "elastic.out(1, 0.5)",
      transformPerspective: 800,
    });
    gsap.to(glowRef.current, { opacity: 0, duration: 0.4 });
  }, [rotate]);

  const onMouseEnter = useCallback(() => {
    gsap.to(cardRef.current, {
      scale: 1.03,
      rotate: 0,
      zIndex: 20,
      duration: 0.35,
      ease: "power2.out",
    });
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    animateProjectCard(cardRef.current, rotate, index);
  }, [isVisible, rotate, index]);

  return (
    <div
      ref={cardRef}
      onClick={() => onOpen(project)}
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="relative cursor-pointer select-none opacity-0"
      style={{ rotate: `${rotate}deg`, transformStyle: "preserve-3d", width: "clamp(220px, 28vw, 300px)" }}
    >
      <div className="relative overflow-hidden border" style={{ borderColor: "#1a1a1a", background: "#0d0d0d", aspectRatio: "3/4" }}>
        <div
          ref={glowRef}
          className="absolute pointer-events-none"
          style={{
            width: 160,
            height: 160,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${accent}22, transparent 70%)`,
            transform: "translate(-50%,-50%)",
            top: "50%",
            left: "50%",
            opacity: 0,
          }}
        />
        <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: accent }} />

        <div className="relative z-10 flex flex-col h-full p-5">
          <div className="flex items-start justify-between mb-auto">
            <div>
              <p className="font-mono text-[9px] tracking-[0.25em] uppercase mb-1" style={{ color: accent, opacity: 0.7 }}>
                {type}
              </p>
              <p className="font-mono text-[9px] text-[#1e1e1e]">{year}</p>
            </div>
            <span
              className="font-display font-extrabold leading-none"
              style={{ fontSize: 40, color: "transparent", WebkitTextStroke: `1px ${accent}25` }}
            >
              {id}
            </span>
          </div>

          <div className="mb-3">
            <h3 className="font-display font-extrabold leading-none tracking-tight text-[#f0ece3]" style={{ fontSize: "clamp(22px, 3.5vw, 28px)" }}>
              {title}
            </h3>
            <p className="font-mono text-[9px] tracking-[0.15em] uppercase mt-1.5" style={{ color: accent, opacity: 0.5 }}>
              {subtitle}
            </p>
          </div>

          <div className="flex flex-wrap gap-1 mb-4">
            {tags.slice(0, 3).map((t) => (
              <span key={t} className="font-mono text-[8px] tracking-[0.1em] px-1.5 py-0.5 border" style={{ borderColor: "#1a1a1a", color: "#2a2a2a" }}>
                {t}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2 border-t pt-3" style={{ borderColor: "#111" }}>
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: accent }} />
            <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-[#1e1e1e]">Click to open</span>
          </div>
        </div>

        <div
          className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(255,255,255,0.007) 3px,rgba(255,255,255,0.007) 4px)" }}
        />
      </div>
      <div className="absolute inset-x-4 -bottom-3 -z-10 h-8 blur-xl" style={{ background: accent + "20" }} />
    </div>
  );
}
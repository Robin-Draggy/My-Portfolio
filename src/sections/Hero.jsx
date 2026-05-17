import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

// ── Skills marquee data ──────────────────────────────────────────────────
const SKILLS = [
  "React.js", "TypeScript", "Next.js", "TailwindCSS", "GSAP",
  "Node.js", "Express", "MongoDB", "Redux", "Framer Motion",
  "Socket.io", "REST APIs", "Figma", "WebSocket", "Zustand",
];

// ── Live Dhaka clock ─────────────────────────────────────────────────────
function DhakaClock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () => {
      const t = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Dhaka",
        hour: "2-digit", minute: "2-digit", second: "2-digit",
        hour12: false,
      }).format(new Date());
      setTime(t);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="flex flex-col items-end gap-1">
      <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#3a3a3a]">
        Dhaka / GMT+6
      </span>
      <span className="font-mono text-[13px] text-[#c8f55a] tabular-nums">
        {time}
      </span>
    </div>
  );
}

// ── Magnetic cursor blob ─────────────────────────────────────────────────
function CursorBlob() {
  const blobRef = useRef(null);
  const pos = useRef({ x: -200, y: -200 });
  const current = useRef({ x: -200, y: -200 });
  const rafRef = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMove);

    const loop = () => {
      current.current.x += (pos.current.x - current.current.x) * 0.09;
      current.current.y += (pos.current.y - current.current.y) * 0.09;
      if (blobRef.current) {
        blobRef.current.style.transform = `translate(${current.current.x - 200}px, ${current.current.y - 200}px)`;
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={blobRef}
      className="pointer-events-none fixed top-0 left-0 w-[400px] h-[400px] rounded-full z-0"
      style={{
        background: "radial-gradient(circle, rgba(200,245,90,0.06) 0%, transparent 70%)",
        willChange: "transform",
      }}
    />
  );
}

// ── Marquee strip ────────────────────────────────────────────────────────
function Marquee() {
  const items = [...SKILLS, ...SKILLS];
  return (
    <div className="relative overflow-hidden border-t border-b border-[#1a1a1a] py-3">
      <div className="flex w-max animate-marquee gap-0">
        {items.map((s, i) => (
          <span key={i} className="flex items-center gap-4 px-4">
            <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#3a3a3a] hover:text-[#c8f55a] transition-colors duration-300 cursor-default whitespace-nowrap">
              {s}
            </span>
            <span className="text-[#1e1e1e] text-xs">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// ── Grid lines background ────────────────────────────────────────────────
function GridLines() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0" aria-hidden>
      {/* vertical lines */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute top-0 bottom-0 w-px bg-[#111]"
          style={{ left: `${(i + 1) * (100 / 7)}%` }}
        />
      ))}
      {/* horizontal lines */}
      <div className="absolute left-0 right-0 h-px bg-[#111]" style={{ top: "33%" }} />
      <div className="absolute left-0 right-0 h-px bg-[#111]" style={{ top: "66%" }} />
    </div>
  );
}

// ── Availability badge ───────────────────────────────────────────────────
function AvailBadge() {
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

// ── Main Hero ────────────────────────────────────────────────────────────
export default function Hero() {
  const sectionRef = useRef(null);
  const tagRef = useRef(null);
  const nameTopRef = useRef(null);
  const nameBotRef = useRef(null);
  const subRef = useRef(null);
  const ctaRowRef = useRef(null);
  const lineRef = useRef(null);
  const scrollHintRef = useRef(null);
  const badgeRef = useRef(null);
  const clockRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      // top bar items
      tl.fromTo(
        [badgeRef.current, clockRef.current],
        { opacity: 0, y: -16 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.1 }
      )
        // tag line
        .fromTo(
          tagRef.current,
          { opacity: 0, x: -24 },
          { opacity: 1, x: 0, duration: 0.6 },
          "-=0.3"
        )
        // divider line grows
        .fromTo(
          lineRef.current,
          { scaleX: 0, transformOrigin: "left" },
          { scaleX: 1, duration: 0.7, ease: "power3.inOut" },
          "-=0.2"
        )
        // big name top
        .fromTo(
          nameTopRef.current,
          { opacity: 0, y: 60, skewY: 4 },
          { opacity: 1, y: 0, skewY: 0, duration: 0.9 },
          "-=0.4"
        )
        // big name bottom
        .fromTo(
          nameBotRef.current,
          { opacity: 0, y: 60, skewY: 4 },
          { opacity: 1, y: 0, skewY: 0, duration: 0.9 },
          "-=0.7"
        )
        // sub text
        .fromTo(
          subRef.current,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.4"
        )
        // cta row
        .fromTo(
          ctaRowRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.4"
        )
        // scroll hint
        .fromTo(
          scrollHintRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.8 },
          "-=0.2"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // magnetic CTA button
  const ctaBtnRef = useRef(null);
  useEffect(() => {
    const btn = ctaBtnRef.current;
    if (!btn) return;
    const onEnter = (e) => {
      const r = btn.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      gsap.to(btn, { x: x * 0.35, y: y * 0.35, duration: 0.4, ease: "power2.out" });
    };
    const onLeave = () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1,0.5)" });
    };
    btn.addEventListener("mousemove", onEnter);
    btn.addEventListener("mouseleave", onLeave);
    return () => {
      btn.removeEventListener("mousemove", onEnter);
      btn.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <>
      <CursorBlob />

      <section
        ref={sectionRef}
        className="relative min-h-screen flex flex-col bg-[#0a0a0a] overflow-hidden pt-20"
      >
        <GridLines />

        {/* ── top bar ── */}
        <div className="relative z-10 flex items-center justify-between px-5 sm:px-8 lg:px-14 pt-8 pb-4">
          <div ref={badgeRef} className="opacity-0">
            <AvailBadge />
          </div>
          <div ref={clockRef} className="opacity-0">
            <DhakaClock />
          </div>
        </div>

        {/* ── main content ── */}
        <div className="relative z-10 flex flex-col flex-1 justify-center px-5 sm:px-8 lg:px-14 pb-4">

          {/* tag */}
          <div ref={tagRef} className="opacity-0 flex items-center gap-3 mb-6 sm:mb-8">
            <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-[#c8f55a]">
              Frontend Engineer
            </span>
            <span className="h-px flex-1 max-w-[60px] bg-[#c8f55a] opacity-40" />
            <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-[#2e2e2e]">
              1.5 yrs exp
            </span>
          </div>

          {/* big name */}
          <div className="overflow-hidden mb-1 sm:mb-2">
            <h1
              ref={nameTopRef}
              className="opacity-0 font-display font-extrabold leading-[0.88] tracking-[-0.04em] text-[#f0ece3]"
              style={{ fontSize: "clamp(62px, 13vw, 148px)" }}
            >
              ABDULLAH
            </h1>
          </div>

          <div className="overflow-hidden flex items-end gap-4 sm:gap-6 mb-6 sm:mb-8">
            <h1
              ref={nameBotRef}
              className="opacity-0 font-display font-extrabold leading-[0.88] tracking-[-0.04em]"
              style={{ fontSize: "clamp(62px, 13vw, 148px)", color: "transparent", WebkitTextStroke: "1.5px #2a2a2a" }}
            >
              AL MAMUN
            </h1>
            {/* accent box beside outline name */}
            <div className="hidden sm:flex flex-col gap-1 pb-2 shrink-0">
              <div className="w-2 h-2 bg-[#c8f55a]" />
              <div className="w-2 h-2 border border-[#2a2a2a]" />
              <div className="w-2 h-2 border border-[#2a2a2a]" />
            </div>
          </div>

          {/* divider */}
          <div ref={lineRef} className="h-px bg-[#1a1a1a] mb-6 sm:mb-8 scale-x-0" />

          {/* bottom row: sub text + cta */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 sm:gap-4">

            {/* sub text */}
            <div ref={subRef} className="opacity-0 max-w-sm">
              <p className="font-display text-[15px] sm:text-[17px] text-[#3a3a3a] leading-relaxed mb-1">
                Building{" "}
                <span className="text-[#f0ece3]">scalable, user-centric</span>
                {" "}web applications with{" "}
                <span className="text-[#c8f55a]">React</span>,{" "}
                <span className="text-[#c8f55a]">TypeScript</span> &{" "}
                <span className="text-[#c8f55a]">Next.js</span>.
              </p>
            </div>

            {/* cta row */}
            <div ref={ctaRowRef} className="opacity-0 flex items-center gap-4 shrink-0">
              <button
                ref={ctaBtnRef}
                className="group relative overflow-hidden font-mono text-[11px] tracking-[0.2em] uppercase bg-[#c8f55a] text-[#0a0a0a] px-6 sm:px-8 py-4 font-medium transition-all duration-300 hover:bg-[#d4ff6a]"
              >
                <span className="relative z-10">View Work</span>
              </button>
              <a
                href="mailto:abdullahmn3399@gmail.com"
                className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#2a2a2a] border border-[#1a1a1a] px-6 sm:px-8 py-4 hover:text-[#f0ece3] hover:border-[#3a3a3a] transition-colors duration-300"
              >
                Contact
              </a>
            </div>
          </div>
        </div>

        {/* ── scroll hint ── */}
        <div
          ref={scrollHintRef}
          className="opacity-0 relative z-10 flex items-center justify-center pb-8 gap-3"
        >
          <div className="w-px h-8 bg-gradient-to-b from-transparent to-[#2a2a2a]" />
          <span className="font-mono text-[9px] tracking-[0.35em] uppercase text-[#2a2a2a]">
            Scroll
          </span>
        </div>

        {/* ── marquee ── */}
        <div className="relative z-10">
          <Marquee />
        </div>

        {/* large faded index number */}
        <div
          className="pointer-events-none absolute bottom-16 right-6 sm:right-14 font-display font-extrabold text-[120px] sm:text-[180px] leading-none select-none z-0"
          style={{ color: "transparent", WebkitTextStroke: "1px #111", opacity: 0.6 }}
          aria-hidden
        >
          01
        </div>
      </section>

      {/* marquee animation */}
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 28s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </>
  );
}
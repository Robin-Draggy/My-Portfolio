import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import DhakaClock from "../components/hero/DhakaClock";
import CursorBlob from "../components/hero/CursorBlob";
import Marquee from "../components/hero/Marquee";
import GridLines from "../components/hero/GridLines";
import AvailBadge from "../components/hero/AvailBadge";
import MagneticButton from "../components/hero/MagneticButton";

gsap.registerPlugin(SplitText);

export default function Hero() {
  const sectionRef = useRef(null);
  const tagRef = useRef(null);
  const nameTopRef = useRef(null);
  const nameBotRef = useRef(null);
  const subRef = useRef(null);
  const ctaRowRef = useRef(null);
  const lineRef = useRef(null);
  const badgeRef = useRef(null);
  const clockRef = useRef(null);
  // Removed scrollHintRef since it's not used in JSX

  // Function to handle resume download
  const handleDownloadResume = () => {
    const resumeUrl = "/resume/Abdullah_Al_Mamun.pdf"; 
    
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = "Abdullah_Al_Mamun_Resume.pdf"; 
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      // Add null checks for all elements
      if (badgeRef.current && clockRef.current) {
        tl.fromTo(
          [badgeRef.current, clockRef.current],
          { opacity: 0, y: -16 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.1 },
        );
      }

      if (tagRef.current) {
        tl.fromTo(
          tagRef.current,
          { opacity: 0, x: -24 },
          { opacity: 1, x: 0, duration: 0.6 },
          "-=0.3",
        );
      }

      if (lineRef.current) {
        tl.fromTo(
          lineRef.current,
          { scaleX: 0, transformOrigin: "left" },
          { scaleX: 1, duration: 0.7, ease: "power3.inOut" },
          "-=0.2",
        );
      }

      if (nameTopRef.current) {
        tl.fromTo(
          nameTopRef.current,
          { opacity: 0, y: 60, skewY: 4 },
          { opacity: 1, y: 0, skewY: 0, duration: 0.9 },
          "-=0.4",
        );
      }

      if (nameBotRef.current) {
        tl.fromTo(
          nameBotRef.current,
          { opacity: 0, y: 60, skewY: 4 },
          { opacity: 1, y: 0, skewY: 0, duration: 0.9 },
          "-=0.7",
        );
      }

      if (subRef.current) {
        tl.fromTo(
          subRef.current,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.4",
        );
      }

      if (ctaRowRef.current) {
        tl.fromTo(
          ctaRowRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.4",
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <CursorBlob />

      <section
        ref={sectionRef}
        className="relative min-h-screen flex flex-col bg-[#0a0a0a] overflow-hidden pt-20"
        style={{ position: "relative", zIndex: 2 }}
      >
        <GridLines />

        {/* top bar */}
        <div className="relative z-10 flex items-center justify-between px-5 sm:px-8 lg:px-14 pt-8 pb-4">
          <div ref={badgeRef} className="opacity-0">
            <AvailBadge />
          </div>
          <div ref={clockRef} className="opacity-0">
            <DhakaClock />
          </div>
        </div>

        {/* main content */}
        <div className="relative z-10 flex flex-col flex-1 justify-center px-5 sm:px-8 lg:px-14 pb-4">
          {/* tag */}
          <div
            ref={tagRef}
            className="opacity-0 flex items-center gap-3 mb-6 sm:mb-8"
          >
            <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-[#c8f55a]">
              Frontend Engineer
            </span>
            <span className="h-px flex-1 max-w-15 bg-[#c8f55a] opacity-40" />
            <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-[#2e2e2e]">
              2 yrs exp
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
              style={{
                fontSize: "clamp(62px, 13vw, 148px)",
                color: "transparent",
                WebkitTextStroke: "1.5px #2a2a2a",
              }}
            >
              AL MAMUN
            </h1>
            <div className="hidden sm:flex flex-col gap-1 pb-2 shrink-0">
              <div className="w-2 h-2 bg-[#c8f55a]" />
              <div className="w-2 h-2 border border-[#2a2a2a]" />
              <div className="w-2 h-2 border border-[#2a2a2a]" />
            </div>
          </div>

          {/* divider */}
          <div
            ref={lineRef}
            className="h-px bg-[#1a1a1a] mb-6 sm:mb-8 scale-x-0"
          />

          {/* bottom row */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 sm:gap-4">
            {/* sub text */}
            <div ref={subRef} className="opacity-0 max-w-sm">
              <p className="font-display text-[15px] sm:text-[17px] text-[#3a3a3a] leading-relaxed mb-1">
                Building{" "}
                <span className="text-[#f0ece3]">scalable, user-centric</span>{" "}
                web applications with{" "}
                <span className="text-[#c8f55a]">React</span>,{" "}
                <span className="text-[#c8f55a]">TypeScript</span> &{" "}
                <span className="text-[#c8f55a]">Next.js</span>.
              </p>
            </div>

            {/* cta row - Now with 3 buttons */}
            <div
              ref={ctaRowRef}
              className="opacity-0 flex flex-wrap items-center gap-4 shrink-0"
            >
              <MagneticButton
                className="group relative overflow-hidden font-mono text-[11px] tracking-[0.2em] uppercase bg-[#c8f55a] cursor-pointer px-6 sm:px-8 py-4 font-medium transition-all duration-300 hover:bg-[#d4ff6a]"
                style={{ color: "#000000" }}
                onClick={() =>
                  document
                    .getElementById("work")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                View Work
              </MagneticButton>
              
              {/* Download Resume Button */}
              <MagneticButton
                className="group relative overflow-hidden font-mono text-[11px] tracking-[0.2em] uppercase border border-[#c8f55a] cursor-pointer px-6 sm:px-8 py-4 font-medium transition-all duration-300 hover:bg-[#c8f55a] hover:text-black"
                style={{ color: "#c8f55a", background: "transparent" }}
                onClick={handleDownloadResume}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Download CV
                  <svg 
                    className="w-3 h-3 transition-transform duration-300 group-hover:translate-y-0.5" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </span>
              </MagneticButton>
              
              <a
                href="#contact"
                className="font-mono text-[11px] tracking-[0.2em] uppercase text-white/40 border border-white/40 px-6 sm:px-8 py-4 hover:text-white/80 hover:border-white/80 transition-colors duration-300"
              >
                Contact
              </a>
            </div>
          </div>
        </div>

        {/* marquee */}
        <div className="relative z-10">
          <Marquee />
        </div>

        {/* large faded index number */}
        <div
          className="pointer-events-none absolute bottom-16 right-6 sm:right-14 font-display font-extrabold text-[120px] sm:text-[180px] leading-none select-none z-0"
          style={{
            color: "transparent",
            WebkitTextStroke: "1px #111",
            opacity: 0.6,
          }}
          aria-hidden
        >
          01
        </div>
      </section>

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
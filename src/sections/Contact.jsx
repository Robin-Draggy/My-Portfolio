import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import InfoPanel from "../components/contact/InfoPanel";
import TerminalForm from "../components/contact/TerminalForm";

gsap.registerPlugin(ScrollTrigger);

function BackToTopButton() {
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="font-mono text-[10px] px-3 py-2 cursor-pointer tracking-[0.2em] uppercase text-white/60 hover:text-[#c8f55a] transition-colors duration-300 flex items-center justify-center gap-2"
    >
      Back to top ↑
    </button>
  );
}

export default function Contact() {
  const sectionRef = useRef(null);
  const formWrapRef = useRef(null);

  useEffect(() => {
    // Add a small delay to ensure everything is mounted and positioned correctly
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        // Refresh ScrollTrigger to recalculate positions
        ScrollTrigger.refresh();
        
        gsap.fromTo(
          formWrapRef.current,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { 
              trigger: formWrapRef.current, 
              start: "top 85%",
              // Add these to prevent unwanted triggering
              invalidateOnRefresh: true,
              once: true
            },
          },
        );
      }, sectionRef);
      
      return () => ctx.revert();
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative bg-[#0a0a0a] py-24 sm:py-36 px-5 sm:px-8 lg:px-14 overflow-hidden"
       style={{ position: 'relative', zIndex: 1 }} 
    >
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, #151515 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div
        className="pointer-events-none absolute top-10 right-4 sm:right-14 font-display font-extrabold select-none leading-none z-0"
        style={{
          fontSize: "clamp(100px, 18vw, 200px)",
          color: "transparent",
          WebkitTextStroke: "1px #0d0d0d",
        }}
        aria-hidden
      >
        05
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-start">
          <InfoPanel />
          <div ref={formWrapRef} className="opacity-0">
            <TerminalForm />
          </div>
        </div>

        <div className="mt-24 sm:mt-32 pt-8 border-t border-[#0f0f0f] flex flex-col sm:flex-row items-center md:items-start justify-between gap-4">
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#1a1a1a]">
            © 2026 Abdullah Al Mamun
          </span>
          <BackToTopButton />
        </div>
      </div>

      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </section>
  );
}
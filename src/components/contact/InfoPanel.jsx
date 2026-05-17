import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SOCIALS } from "./constants";

gsap.registerPlugin(ScrollTrigger);

function SocialLinks() {
  return (
    <div className="flex flex-wrap gap-2">
      {SOCIALS.map((s) => (
        <a
          key={s.label}
          href={s.href}
          target={s.href.startsWith("http") ? "_blank" : undefined}
          rel="noopener noreferrer"
          className="group flex items-center gap-2 border border-[#1a1a1a] px-4 py-2.5 hover:border-[#c8f55a] hover:bg-[#c8f55a0d] transition-all duration-300"
        >
          <span className="font-mono text-[10px] text-[#2a2a2a] group-hover:text-[#c8f55a] transition-colors duration-300">{s.symbol}</span>
          <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-[#1e1e1e] group-hover:text-[#f0ece3] transition-colors duration-300">{s.label}</span>
        </a>
      ))}
    </div>
  );
}

export default function InfoPanel() {
  const panelRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        panelRef.current.querySelectorAll(".reveal-item"),
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: panelRef.current, start: "top 85%" }
        }
      );
    }, panelRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={panelRef} className="flex flex-col justify-between h-full gap-12 lg:gap-0">
      <div>
        <div className="reveal-item opacity-0 flex items-center gap-3 mb-10">
          <span className="font-mono text-[10px] tracking-[0.35em] uppercase text-[#c8f55a]">Contact</span>
          <span className="h-px w-10 bg-[#c8f55a] opacity-30" />
        </div>

        <div className="reveal-item opacity-0 overflow-hidden mb-2">
          <h2 className="font-display font-extrabold leading-[0.88] tracking-tight text-[#f0ece3]" style={{ fontSize: "clamp(52px, 9vw, 108px)" }}>
            LET'S
          </h2>
        </div>
        
        <div className="reveal-item opacity-0 overflow-hidden mb-10">
          <h2 className="font-display font-extrabold leading-[0.88] tracking-tight" style={{ fontSize: "clamp(52px, 9vw, 108px)", color: "transparent", WebkitTextStroke: "1.5px #2a2a2a" }}>
            TALK.
          </h2>
        </div>

        <div className="reveal-item opacity-0 mb-10">
          <p className="font-display text-[14px] sm:text-[15px] text-[#2a2a2a] leading-relaxed max-w-xs">
            Open to freelance projects, full-time roles, and interesting conversations.
            Fill the terminal on the right — I'll get back to you within 24 hrs.
          </p>
        </div>

        <div className="reveal-item opacity-0 mb-10">
          <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#1e1e1e] mb-2">Direct mail</p>
          <a href="mailto:abdullahmn3399@gmail.com" className="group font-mono text-[12px] sm:text-[13px] text-[#3a3a3a] hover:text-[#c8f55a] transition-colors duration-300 flex items-center gap-2">
            abdullahmn3399@gmail.com
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-xs">↗</span>
          </a>
        </div>

        <div className="reveal-item opacity-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c8f55a] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#c8f55a]" />
            </span>
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#c8f55a] opacity-70">Available for work</span>
          </div>
          <p className="font-mono text-[10px] text-[#1e1e1e] ml-4">Dhaka, Bangladesh · GMT+6</p>
        </div>
      </div>

      <div className="reveal-item opacity-0">
        <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#1a1a1a] mb-4">Find me at</p>
        <SocialLinks />
      </div>
    </div>
  );
}
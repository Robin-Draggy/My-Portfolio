import { useRef, useEffect } from "react";
import { revealOnScroll } from "./animations";

function BioLinks() {
  return (
    <div className="flex items-center gap-4 pt-2 flex-wrap">
      <a
        href="https://github.com/Robin-Draggy"
        target="_blank"
        rel="noopener noreferrer"
        className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#2a2a2a] hover:text-[#f0ece3] transition-colors duration-200"
      >
        GitHub ↗
      </a>
      <span className="text-[#1a1a1a]">·</span>
      <a
        href="https://www.linkedin.com/in/abdullah~webdev"
        target="_blank"
        rel="noopener noreferrer"
        className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#2a2a2a] hover:text-[#f0ece3] transition-colors duration-200"
      >
        LinkedIn ↗
      </a>
    </div>
  );
}

export default function BioSection() {
  const bioRef = useRef(null);

  useEffect(() => {
    revealOnScroll(bioRef.current, { to: { delay: 0.2 } });
  }, []);

  return (
    <div ref={bioRef} className="opacity-0 space-y-4 max-w-xl">
      <p className="font-display text-[15px] sm:text-[16px] text-[#3a3a3a] leading-relaxed">
        I'm <span className="text-[#f0ece3]">Abdullah</span> — a
        frontend-focused software engineer from{" "}
        <span className="text-[#f0ece3]">Dhaka, Bangladesh</span>, with
        2+ years building production-grade web apps that balance clean
        code with great UX.
      </p>
      <p className="font-display text-[15px] sm:text-[16px] text-[#3a3a3a] leading-relaxed">
        My stack is centred around{" "}
        <span className="text-[#c8f55a]">React</span>,{" "}
        <span className="text-[#c8f55a]">TypeScript</span>, and{" "}
        <span className="text-[#c8f55a]">Next.js</span> — but I care
        more about solving the right problem than defending a particular
        tool.
      </p>
      <p className="font-display text-[15px] sm:text-[16px] text-[#3a3a3a] leading-relaxed">
        Outside of code I'm drawn to motion design, design systems, and
        finding the one layout decision that makes a UI feel inevitable.
      </p>
      <BioLinks />
    </div>
  );
}
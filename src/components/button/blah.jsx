import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import Lenis from "lenis";

gsap.registerPlugin(CustomEase);
CustomEase.create("expo", "M0,0 C0.16,1 0.3,1 1,1");

// ─── Lenis hook ────────────────────────────────────────────────────────────
function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.08, smoothWheel: true });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const id = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(id);
      lenis.destroy();
    };
  }, []);
}

// ─── Loader ────────────────────────────────────────────────────────────────


// ─── Hero (placeholder for next section) ──────────────────────────────────
function Hero() {
  const tagRef = useRef(null);
  const nameRef = useRef(null);
  const roleRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      [tagRef.current, nameRef.current, roleRef.current, ctaRef.current],
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.12,
        ease: "expo",
        delay: 0.1,
      }
    );
  }, []);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-[#0a0a0a]">
      <p
        ref={tagRef}
        className="font-mono text-[11px] tracking-[0.3em] uppercase text-[#c8f55a] mb-5 opacity-0"
      >
        Frontend Engineer · Dhaka, BD
      </p>
      <h1
        ref={nameRef}
        className="font-display text-[clamp(52px,10vw,100px)] font-extrabold leading-none tracking-tight text-[#f0ece3] mb-3 opacity-0"
      >
        Abdullah<br />Al Mamun
      </h1>
      <p
        ref={roleRef}
        className="font-display text-[clamp(18px,3.5vw,32px)] text-[#3a3a3a] leading-snug mb-10 opacity-0"
      >
        Building <span className="text-[#f0ece3]">scalable interfaces</span>
        <br />with React &amp; TypeScript
      </p>
      <button
        ref={ctaRef}
        className="opacity-0 font-mono text-[11px] tracking-[0.2em] uppercase text-[#f0ece3] border border-[#2a2a2a] px-7 py-4 hover:border-[#c8f55a] hover:text-[#c8f55a] transition-colors duration-300"
      >
        View Work →
      </button>
    </section>
  );
}

// ─── App ───────────────────────────────────────────────────────────────────
export default function App() {
  const [loaded, setLoaded] = useState(false);
  useLenis();

  return (
    <>
      <Loader onComplete={() => setLoaded(true)} />
      {loaded && <Hero />}
    </>
  );
}
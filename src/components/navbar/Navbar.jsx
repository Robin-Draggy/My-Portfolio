import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const navRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const hidden = useRef(false);
  const ticking = useRef(false);

  // ── mount animation ──────────────────────────────────────────────────
  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", delay: 0.2 },
    );
  }, []);

  // ── scroll hide / show ───────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        const current = window.scrollY;
        const delta = current - lastScrollY.current;

        if (current < 80) {
          // near top — always show
          if (hidden.current) {
            gsap.to(navRef.current, {
              y: 0,
              duration: 0.45,
              ease: "power3.out",
            });
            hidden.current = false;
          }
        } else if (delta > 6 && !hidden.current) {
          // scrolling down — hide
          gsap.to(navRef.current, {
            y: "-110%",
            duration: 0.4,
            ease: "power3.in",
          });
          hidden.current = true;
          setMenuOpen(false);
        } else if (delta < -6 && hidden.current) {
          // scrolling up — show
          gsap.to(navRef.current, { y: 0, duration: 0.45, ease: "power3.out" });
          hidden.current = false;
        }

        lastScrollY.current = current;
        ticking.current = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── mobile menu animation ────────────────────────────────────────────
  useEffect(() => {
    const el = mobileMenuRef.current;
    if (!el) return;
    if (menuOpen) {
      gsap.fromTo(
        el,
        { opacity: 0, y: -12, pointerEvents: "none" },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power3.out",
          pointerEvents: "auto",
        },
      );
      // stagger links
      gsap.fromTo(
        el.querySelectorAll(".mobile-link"),
        { opacity: 0, x: -16 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.07,
          duration: 0.4,
          ease: "power3.out",
          delay: 0.05,
        },
      );
    } else {
      gsap.to(el, {
        opacity: 0,
        y: -8,
        duration: 0.25,
        ease: "power2.in",
        pointerEvents: "none",
      });
    }
  }, [menuOpen]);

  // close menu on outside click
  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e) => {
      if (!navRef.current?.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen]);

  return (
    <header
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 opacity-0"
      style={{ willChange: "transform" }}
    >
      {/* glass pill wrapper */}
      <div className="mx-3 mt-3 sm:mx-6 sm:mt-4 lg:mx-auto lg:max-w-5xl">
        <nav
          className="relative flex items-center justify-between px-4 sm:px-6 h-[54px] rounded-2xl border border-[#1e1e1e]"
          style={{
            background: "rgba(10,10,10,0.75)",
            backdropFilter: "blur(20px) saturate(180%)",
            WebkitBackdropFilter: "blur(20px) saturate(180%)",
          }}
        >
          {/* logo */}
          <a
            href="#"
            className="flex items-center justify-center group shrink-0"
            aria-label="Abdullah Al Mamun — home"
          >
            <div className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center overflow-hidden">
              <img
                className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                src="/images/new.png"
                alt="Abdullah Al Mamun Logo"
              />
            </div>
          </a>

          {/* desktop links */}
          <ul className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  className="relative font-mono text-[11px] tracking-[0.15em] uppercase text-[#b9aeae] hover:text-[#f0ece3] transition-colors duration-300 px-4 py-2 group"
                >
                  {label}
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-px bg-[#c8f55a] group-hover:w-4 transition-all duration-300" />
                </a>
              </li>
            ))}
          </ul>

          {/* desktop CTA */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <a
              href="https://github.com/Robin-Draggy"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[10px] tracking-[0.15em] uppercase text-white/70 hover:text-[#c8f55a] transition-colors duration-300"
            >
              GitHub ↗
            </a>
            <a
              href="mailto:abdullahmn3399@gmail.com"
              className="font-mono text-[10px] tracking-[0.15em] uppercase bg-[#c8f55a] text-[#0a0a0a] px-4 py-2 hover:bg-[#d4ff6a] transition-colors duration-200"
            >
              Hire me
            </a>
          </div>

          {/* mobile hamburger */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-[5px] group"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <span
              className="block h-px w-5 bg-[#f0ece3] transition-all duration-300 origin-center"
              style={
                menuOpen ? { transform: "translateY(6px) rotate(45deg)" } : {}
              }
            />
            <span
              className="block h-px bg-[#f0ece3] transition-all duration-300"
              style={menuOpen ? { width: 0, opacity: 0 } : { width: "14px" }}
            />
            <span
              className="block h-px w-5 bg-[#f0ece3] transition-all duration-300 origin-center"
              style={
                menuOpen ? { transform: "translateY(-6px) rotate(-45deg)" } : {}
              }
            />
          </button>
        </nav>

        {/* mobile dropdown */}
        <div
          ref={mobileMenuRef}
          className="md:hidden opacity-0 mt-2 rounded-2xl border border-[#1e1e1e] overflow-hidden"
          style={{
            background: "rgba(10,10,10,0.92)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            pointerEvents: "none",
          }}
        >
          <ul className="flex flex-col py-2">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={label} className="mobile-link opacity-0">
                <a
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-between px-5 py-4 font-mono text-[11px] tracking-[0.2em] uppercase text-[#3a3a3a] hover:text-[#f0ece3] hover:bg-[#0f0f0f] transition-colors duration-200 border-b border-[#0f0f0f] last:border-b-0"
                >
                  {label}
                  <span className="text-[#1e1e1e]">→</span>
                </a>
              </li>
            ))}
            <li className="mobile-link opacity-0 px-4 py-3 flex gap-3">
              <a
                href="https://github.com/mamun-swe"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center font-mono text-[10px] tracking-[0.15em] uppercase text-[#2a2a2a] border border-[#1a1a1a] py-3 hover:text-[#f0ece3] hover:border-[#2a2a2a] transition-colors duration-200"
              >
                GitHub ↗
              </a>
              <a
                href="mailto:abdullahmn3399@gmail.com"
                className="flex-1 text-center font-mono text-[10px] tracking-[0.15em] uppercase bg-[#c8f55a] text-[#0a0a0a] py-3 hover:bg-[#d4ff6a] transition-colors duration-200"
              >
                Hire me
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}

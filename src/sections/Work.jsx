import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ── Projects data ─────────────────────────────────────────────────────────
const PROJECTS = [
  {
    id: "01",
    title: "Barrister Arman",
    subtitle: "Voter Record Management System",
    description:
      "Admin dashboard built to efficiently manage and process over 500,000 voter records at scale. Provides fast data access with optimized pagination, fuzzy search, and full CRUD — all without breaking a sweat on large datasets.",
    tags: ["React", "Redux Toolkit", "REST API", "Pagination", "i18n"],
    accent: "#c8f55a",
    accentDim: "#0e1300",
    type: "Web Application",
    year: "2024",
    highlights: ["500K+ records", "~30% load time reduction", "3-language UI"],
    link: "https://www.barristerarman.com/en",
    github: "#",
  },
  {
    id: "02",
    title: "Vidlist.ai",
    subtitle: "AI-Powered Video Generator",
    description:
      "AI platform that converts image collections into short-form videos and slideshows for real estate and sales pros. No-code workflow, results in under 30 seconds. Built the entire frontend from scratch.",
    tags: ["Next.js", "React Hook Form", "Axios", "Framer Motion", "React Slick"],
    accent: "#f55a9b",
    accentDim: "#1a0010",
    type: "AI Platform",
    year: "2024",
    highlights: ["< 30s generation", "No-code workflow", "Real estate focused"],
    link: "#",
    github: "#",
  },
  {
    id: "03",
    title: "RiseAtSeven",
    subtitle: "Interactive Agency Showcase",
    description:
      "A featured-works section inspired by modern creative agencies. Synchronized scroll-based animations with pinned layouts, active-state tracking, smooth image transitions, custom cursor, and hover effects that feel alive.",
    tags: ["GSAP", "ScrollTrigger", "CSS", "Custom Cursor", "Responsive"],
    accent: "#5ab4f5",
    accentDim: "#001018",
    type: "Creative UI",
    year: "2024",
    highlights: ["Pinned scroll", "Custom cursor", "Performance optimized"],
    link: "#",
    github: "#",
  },
  {
    id: "04",
    title: "Dev Portfolio",
    subtitle: "Personal Portfolio v2",
    description:
      "The very site you're looking at. Built to be a living document of craft — from the SVG loader to pinned scroll interactions. Designed with an editorial dark aesthetic, every detail intentional.",
    tags: ["React", "GSAP", "Lenis", "TailwindCSS", "Vite"],
    accent: "#f5a25a",
    accentDim: "#180e00",
    type: "Portfolio",
    year: "2025",
    highlights: ["GSAP animations", "Lenis smooth scroll", "Fully responsive"],
    link: "#",
    github: "https://github.com/mamun-swe",
  },
];

// ── Tech marquee ──────────────────────────────────────────────────────────
function CardMarquee({ tags, accent }) {
  const items = [...tags, ...tags, ...tags];
  return (
    <div className="relative overflow-hidden border-t py-3" style={{ borderColor: "#ffffff06" }}>
      <div className="flex w-max" style={{ animation: "cardmarquee 18s linear infinite" }}>
        {items.map((t, i) => (
          <span key={i} className="flex items-center gap-3 px-3">
            <span
              className="font-mono text-[10px] tracking-[0.18em] uppercase whitespace-nowrap"
              style={{ color: accent, opacity: 0.55 }}
            >
              {t}
            </span>
            <span style={{ color: accent, opacity: 0.12, fontSize: 8 }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// ── Project card ──────────────────────────────────────────────────────────
function ProjectCard({ project, isActive }) {
  const { title, subtitle, description, tags, accent, accentDim, type, year, highlights, link, github } = project;
  const [showIframe, setShowIframe] = useState(false);

  return (
    <div
      className="flex items-center justify-center w-full"
      style={{ height: "100vh" }}
      data-project-card
    >
      <div
        className="relative w-full max-w-full flex flex-col overflow-hidden border transition-all duration-700"
        style={{
          height: "calc(100vh - 80px)",
          maxHeight: 700,
          width: "100%",
          borderColor: isActive ? accent + "44" : "#1a1a1a",
          background: isActive ? accentDim : "#0c0c0c",
        }}
      >
        {/* scanlines */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(255,255,255,0.007) 3px,rgba(255,255,255,0.007) 4px)",
          }}
        />

        {/* top bar */}
        <div
          className="relative z-10 flex items-center justify-between px-6 sm:px-8 py-4 border-b shrink-0"
          style={{ borderColor: "#ffffff05" }}
        >
          <div className="flex items-center gap-3 overflow-x-auto">
            <span
              className="font-mono text-[10px] tracking-[0.3em] uppercase whitespace-nowrap"
              style={{ color: accent, opacity: 0.65 }}
            >
              {type}
            </span>
            <span style={{ color: "#1e1e1e" }}>·</span>
            <span className="font-mono text-[10px] tracking-[0.2em] text-[#252525] whitespace-nowrap">{year}</span>
          </div>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <button
              onClick={() => setShowIframe(!showIframe)}
              className="text-[10px] font-mono px-2 py-1 rounded transition-all whitespace-nowrap"
              style={{ 
                background: showIframe ? accent + "20" : "transparent",
                color: showIframe ? accent : "#2a2a2a",
                border: `1px solid ${showIframe ? accent + "40" : "#1e1e1e"}`
              }}
            >
              {showIframe ? "Hide Preview" : "Show Preview"}
            </button>
            <div className="w-2.5 h-2.5 rounded-full transition-colors duration-500" style={{ background: isActive ? accent : "#1e1e1e" }} />
            <div className="w-2.5 h-2.5 rounded-full bg-[#181818]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#141414]" />
          </div>
        </div>

        {/* Full Preview Mode */}
        {showIframe && link !== "#" ? (
          <div className="relative z-10 flex-1 w-full bg-black overflow-hidden">
            <iframe
              src={link}
              title={`${title} preview`}
              className="w-full h-full border-0"
              sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-popups-to-escape-sandbox"
              loading="lazy"
              style={{ overflow: "auto" }}
            />
            <div 
              className="absolute bottom-4 right-4 text-[10px] font-mono px-3 py-1.5 bg-black/90 rounded backdrop-blur-sm"
              style={{ color: accent, border: `1px solid ${accent}40` }}
            >
              Live Preview • {title}
            </div>
          </div>
        ) : (
          /* Normal Content Mode */
          <>
            {/* body */}
            <div className="relative z-10 flex-1 flex flex-col justify-between p-6 sm:p-8 lg:p-10 overflow-y-auto custom-scroll">
              <div>
                <div className="mb-6">
                  <h3
                    className="font-display font-extrabold leading-none tracking-tight text-[#f0ece3] mb-2 break-words"
                    style={{ fontSize: "clamp(34px, 5vw, 64px)" }}
                  >
                    {title}
                  </h3>
                  <p className="font-mono text-[11px] tracking-[0.2em] uppercase break-words" style={{ color: accent, opacity: 0.55 }}>
                    {subtitle}
                  </p>
                </div>

                <p className="font-display text-[14px] sm:text-[15px] text-[#383838] leading-relaxed max-w-lg mb-8 break-words">
                  {description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {highlights.map((h) => (
                    <span
                      key={h}
                      className="font-mono text-[10px] tracking-[0.15em] uppercase px-3 py-1.5 border whitespace-nowrap"
                      style={{ borderColor: accent + "30", color: accent, opacity: 0.75 }}
                    >
                      {h}
                    </span>
                  ))}
                </div>

                {/* tags */}
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[9px] tracking-[0.1em] px-2 py-1 whitespace-nowrap"
                      style={{ color: accent + "99", background: accent + "10" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4 mt-6 flex-wrap">
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] uppercase px-6 py-3 hover:opacity-80 transition-opacity whitespace-nowrap"
                  style={{ background: accent, color: "#0a0a0a" }}
                >
                  Live Site
                  <span className="group-hover:translate-x-1 transition-transform duration-200">↗</span>
                </a>
                <a
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] uppercase px-6 py-3 border border-[#1e1e1e] text-[#2a2a2a] hover:text-[#f0ece3] hover:border-[#2a2a2a] transition-colors duration-300 whitespace-nowrap"
                >
                  GitHub ↗
                </a>
              </div>
            </div>

            {/* marquee */}
            <div className="relative z-10 shrink-0">
              <CardMarquee tags={tags} accent={accent} />
            </div>
          </>
        )}

        {/* glow corner */}
        <div
          className="absolute bottom-0 right-0 w-32 h-32 pointer-events-none"
          style={{ background: `radial-gradient(circle at bottom right, ${accent}14, transparent 70%)` }}
        />
      </div>
    </div>
  );
}

// ── Sticky left panel ─────────────────────────────────────────────────────
function StickyPanel({ active, progress }) {
  const p = PROJECTS[active];
  return (
    <div className="sticky top-0 h-screen flex flex-col justify-between py-20">
      <div>
        {/* label */}
        <div className="flex items-center gap-3 mb-14">
          <span className="font-mono text-[10px] tracking-[0.35em] uppercase text-[#c8f55a]">
            Selected Work
          </span>
          <span className="h-px w-10 bg-[#c8f55a] opacity-30" />
        </div>

        {/* ghost index */}
        <span
          className="block font-display font-extrabold leading-none mb-2"
          style={{
            fontSize: "clamp(80px, 10vw, 130px)",
            color: "transparent",
            WebkitTextStroke: `1.5px ${p.accent}`,
            opacity: 0.2,
            transition: "all 0.5s ease",
          }}
        >
          {p.id}
        </span>

        {/* active project name */}
        <h2
          className="font-display font-extrabold tracking-tight text-[#f0ece3] leading-none mb-2 transition-all duration-400"
          style={{ fontSize: "clamp(24px, 2.8vw, 38px)" }}
        >
          {p.title}
        </h2>
        <p
          className="font-mono text-[11px] tracking-[0.2em] uppercase mb-10 transition-all duration-400"
          style={{ color: p.accent, opacity: 0.55 }}
        >
          {p.subtitle}
        </p>

        {/* nav indicators */}
        <div className="flex flex-col gap-3.5">
          {PROJECTS.map((proj, i) => (
            <div key={proj.id} className="flex items-center gap-3">
              <div
                className="h-px shrink-0 transition-all duration-500"
                style={{
                  width: i === active ? 28 : 10,
                  background: i === active ? proj.accent : "#222",
                }}
              />
              <span
                className="font-mono text-[10px] tracking-[0.15em] uppercase transition-colors duration-400"
                style={{ color: i === active ? "#f0ece3" : "#252525" }}
              >
                {proj.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* progress bar */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <span className="font-mono text-[9px] tracking-[0.25em] uppercase text-[#1a1a1a]">Progress</span>
          <span className="font-mono text-[9px] text-[#222]">{active + 1} / {PROJECTS.length}</span>
        </div>
        <div className="h-px w-full bg-[#111]">
          <div
            className="h-full transition-all duration-300"
            style={{ width: `${progress}%`, background: p.accent }}
          />
        </div>
      </div>
    </div>
  );
}

// ── Mobile layout ─────────────────────────────────────────────────────────
function MobileWork() {
  const listRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      listRef.current?.querySelectorAll("[data-mobile-card]").forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 50 },
          {
            opacity: 1, y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 85%" },
          }
        );
      });
    }, listRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={listRef} className="lg:hidden px-5 sm:px-8 py-20">
      <div className="flex items-center gap-3 mb-12">
        <span className="font-mono text-[10px] tracking-[0.35em] uppercase text-[#c8f55a]">Selected Work</span>
        <span className="h-px w-10 bg-[#c8f55a] opacity-30" />
      </div>
      <div className="space-y-6">
        {PROJECTS.map((p) => (
          <div key={p.id} data-mobile-card className="opacity-0">
            <div
              className="relative border overflow-hidden"
              style={{ borderColor: p.accent + "33", background: p.accentDim }}
            >
              <div className="flex items-center justify-between px-5 py-3 border-b" style={{ borderColor: "#ffffff05" }}>
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase" style={{ color: p.accent, opacity: 0.6 }}>{p.type}</span>
                <span className="font-mono text-[10px] text-[#252525]">{p.year}</span>
              </div>
              <div className="p-5 sm:p-6">
                <p className="font-mono text-[10px] tracking-[0.2em] uppercase mb-1" style={{ color: p.accent, opacity: 0.4 }}>{p.id}</p>
                <h3 className="font-display font-extrabold text-[28px] sm:text-[36px] leading-none tracking-tight text-[#f0ece3] mb-1">{p.title}</h3>
                <p className="font-mono text-[11px] tracking-[0.15em] uppercase mb-4" style={{ color: p.accent, opacity: 0.5 }}>{p.subtitle}</p>
                <p className="font-display text-[13px] sm:text-[14px] text-[#383838] leading-relaxed mb-5">{p.description}</p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {p.highlights.map((h) => (
                    <span key={h} className="font-mono text-[10px] tracking-[0.1em] uppercase px-2.5 py-1 border" style={{ borderColor: p.accent + "30", color: p.accent, opacity: 0.7 }}>{h}</span>
                  ))}
                </div>
                <div className="flex gap-3">
                  <a href={p.link} target="_blank" rel="noopener noreferrer" className="font-mono text-[10px] tracking-[0.15em] uppercase px-4 py-2.5 hover:opacity-80 transition-opacity" style={{ background: p.accent, color: "#0a0a0a" }}>Live ↗</a>
                  <a href={p.github} target="_blank" rel="noopener noreferrer" className="font-mono text-[10px] tracking-[0.15em] uppercase px-4 py-2.5 border border-[#1e1e1e] text-[#2a2a2a] hover:text-[#f0ece3] transition-colors">GitHub ↗</a>
                </div>
              </div>
              <CardMarquee tags={p.tags} accent={p.accent} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Root ──────────────────────────────────────────────────────────────────
export default function Work() {
  const sectionRef = useRef(null);
  const rightRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = rightRef.current?.querySelectorAll("[data-project-card]");
      if (!cards?.length) return;

      cards.forEach((card, i) => {
        ScrollTrigger.create({
          trigger: card,
          start: "top center",
          end: "bottom center",
          onEnter: () => setActiveIndex(i),
          onEnterBack: () => setActiveIndex(i),
        });
      });

      ScrollTrigger.create({
        trigger: rightRef.current,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => setProgress(Math.round(self.progress * 100)),
      });

      cards.forEach((card) => {
        gsap.fromTo(
          card.firstElementChild,
          { opacity: 0, y: 50, scale: 0.98 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 82%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="work" ref={sectionRef} className="relative bg-[#0a0a0a]">

      {/* ghost number */}
      <div
        className="pointer-events-none absolute top-10 right-5 lg:right-16 font-display font-extrabold select-none leading-none z-0"
        style={{
          fontSize: "clamp(90px, 16vw, 190px)",
          color: "transparent",
          WebkitTextStroke: "1px #0d0d0d",
        }}
        aria-hidden
      >
        03
      </div>

      {/* mobile */}
      <MobileWork />

      {/* desktop */}
      <div className="hidden lg:block">
  <div
    className="grid max-w-7xl mx-auto px-8 lg:px-14"
    style={{ gridTemplateColumns: "360px 1fr", columnGap: "4rem" }}
  >
    {/* LEFT — wrapper is tall, inner panel is sticky */}
    <div style={{ height: `${PROJECTS.length * 100}vh` }}>
      <StickyPanel active={activeIndex} progress={progress} />
    </div>

    {/* RIGHT — cards scroll naturally */}
    <div ref={rightRef} className="w-full min-w-0">
      {PROJECTS.map((project, i) => (
        <ProjectCard
          key={project.id}
          project={project}
          isActive={activeIndex === i}
        />
      ))}
    </div>
  </div>
</div>

      <style>{`
        @keyframes cardmarquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.333%); }
        }
        .custom-scroll {
    scrollbar-width: thin;
    scrollbar-color: rgba(200, 245, 90, 0.3) rgba(20, 20, 20, 0.5);
  }
  
  .custom-scroll::-webkit-scrollbar {
    width: 6px;
  }
  
  .custom-scroll::-webkit-scrollbar-track {
    background: rgba(20, 20, 20, 0.5);
    border-radius: 10px;
  }
  
  .custom-scroll::-webkit-scrollbar-thumb {
    background: rgba(200, 245, 90, 0.3);
    border-radius: 10px;
    transition: all 0.3s ease;
  }
  
  .custom-scroll::-webkit-scrollbar-thumb:hover {
    background: rgba(200, 245, 90, 0.5);
  }
  
  /* Firefox scrollbar styling */
  .custom-scroll {
    scrollbar-width: thin;
    scrollbar-color: rgba(200, 245, 90, 0.3) rgba(20, 20, 20, 0.5);
  }
  
  /* Hide scrollbar on iframe */
  iframe {
    overflow: auto;
  }
  
  iframe::-webkit-scrollbar {
    width: 6px;
  }
  
  iframe::-webkit-scrollbar-track {
    background: rgba(20, 20, 20, 0.5);
  }
  
  iframe::-webkit-scrollbar-thumb {
    background: rgba(200, 245, 90, 0.3);
    border-radius: 10px;
  }
      `}</style>
    </section>
  );
}
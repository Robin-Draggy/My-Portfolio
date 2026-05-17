import { useRef, useEffect } from "react";
import gsap from "gsap";
import SectionLabel from "../components/about/SectionLabel";
import HeadingSection from "../components/about/HeadingSection";
import BioSection from "../components/about/BioSection";
import AvatarBlock from "../components/about/AvatarBlock";
import { STATS, TIMELINE, TRAITS } from "../components/about/constants";
import StatCard from "../components/about/StatCard";
import TraitRow from "../components/about/TraitRow";
import TimelineItem from "../components/about/TimelineItem";

export default function About() {
  const sectionRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (statsRef.current) {
        gsap.fromTo(
          statsRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 85%",
            },
          },
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative bg-[#0a0a0a] py-24 sm:py-36 px-5 sm:px-8 lg:px-14 overflow-hidden"
    >
      {/* Background number */}
      <div
        className="pointer-events-none absolute top-16 right-4 sm:right-14 font-display font-extrabold select-none leading-none"
        style={{
          fontSize: "clamp(100px, 20vw, 220px)",
          color: "transparent",
          WebkitTextStroke: "1px #0f0f0f",
        }}
        aria-hidden
      >
        02
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <SectionLabel>About me</SectionLabel>

        {/* Top section: Heading + Image */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-10 lg:gap-16 mb-16 sm:mb-24">
          <div>
            <HeadingSection />
            <BioSection />
          </div>
          <AvatarBlock />
        </div>

        {/* Stats grid */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-[#111] mb-20 sm:mb-28"
        >
          {STATS.map((s, i) => (
            <div key={s.label} className="bg-[#0a0a0a]">
              <StatCard {...s} index={i} />
            </div>
          ))}
        </div>

        {/* Bottom section: Traits + Timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-16 lg:gap-24">
          <div>
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#2a2a2a] mb-6">
              How I work
            </p>
            <div className="border-t border-[#111]">
              {TRAITS.map((t, i) => (
                <TraitRow key={t.index} {...t} i={i} />
              ))}
            </div>
          </div>

          <div>
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#2a2a2a] mb-6">
              Journey
            </p>
            <div className="p-6">
              {TIMELINE.map((item, i) => (
                <TimelineItem key={item.company} {...item} i={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

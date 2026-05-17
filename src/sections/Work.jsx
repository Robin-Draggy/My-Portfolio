import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ExpandedProject from "../components/work/ExpandedProject";
import WorkHeader from "../components/work/WorkHeader";
import DesktopCardDeck from "../components/work/DesktopCardDeck";
import MobileCarousel from "../components/work/MobileCarousel";
import FeaturedStrip from "../components/work/FeaturedStrip";
import Toolbar from "../components/work/Toolbar";
import { PROJECTS } from "../components/work/constants";

gsap.registerPlugin(ScrollTrigger);

export default function Work() {
  const sectionRef = useRef(null);
  const [expanded, setExpanded] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [featured, setFeatured] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 75%",
        onEnter: () => setIsVisible(true),
        once: true,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const currentAccent = PROJECTS[featured]?.accent ?? "#c8f55a";

  return (
    <>
      {expanded && <ExpandedProject project={expanded} onClose={() => setExpanded(null)} />}

      <section id="work" ref={sectionRef} className="relative bg-[#0a0a0a] py-24 sm:py-32 px-5 sm:px-8 lg:px-14 overflow-hidden min-h-screen">
        <div className="pointer-events-none absolute inset-0" style={{ backgroundImage: "radial-gradient(circle, #151515 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        
        <div className="pointer-events-none absolute top-8 right-4 sm:right-12 font-display font-extrabold select-none leading-none" style={{ fontSize: "clamp(100px, 18vw, 200px)", color: "transparent", WebkitTextStroke: "1px #0d0d0d" }} aria-hidden>
          03
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <WorkHeader description="Click any card to explore the full project details and live preview." />
          
          <DesktopCardDeck projects={PROJECTS} onOpen={setExpanded} isVisible={isVisible} />
          <MobileCarousel projects={PROJECTS} onOpen={setExpanded} isVisible={isVisible} />

          {isVisible && (
            <>
              <FeaturedStrip featured={featured} setFeatured={setFeatured} onOpen={setExpanded} />
              <div className="mt-8 flex justify-center">
                <Toolbar
                  active={featured}
                  total={PROJECTS.length}
                  accent={currentAccent}
                  onPrev={() => setFeatured((f) => (f - 1 + PROJECTS.length) % PROJECTS.length)}
                  onNext={() => setFeatured((f) => (f + 1) % PROJECTS.length)}
                />
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
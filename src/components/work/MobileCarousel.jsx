import ProjectCard from "./ProjectCard";

export default function MobileCarousel({ projects, onOpen, isVisible }) {
  return (
    <div className="md:hidden">
      <div
        className="flex gap-5 pb-6 overflow-x-auto snap-x snap-mandatory"
        style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}
      >
        {projects.map((project, i) => (
          <div key={project.id} className="snap-center shrink-0" style={{ width: "72vw" }}>
            <ProjectCard project={project} index={i} onOpen={onOpen} isVisible={isVisible} />
          </div>
        ))}
      </div>
      <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-[#1a1a1a] text-center mt-2">
        ← swipe →
      </p>
    </div>
  );
}
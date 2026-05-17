import ProjectCard from "./ProjectCard";
import { CARD_POSITIONS } from "./constants";

export default function DesktopCardDeck({ projects, onOpen, isVisible }) {
  return (
    <div className="hidden md:block relative" style={{ height: 480, perspective: 1200 }}>
      {projects.map((project, i) => (
        <div key={project.id} className="absolute" style={{ top: CARD_POSITIONS[i].top, left: CARD_POSITIONS[i].left }}>
          <ProjectCard project={project} index={i} onOpen={onOpen} isVisible={isVisible} />
        </div>
      ))}

      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.08 }}>
        <line x1="18%" y1="30%" x2="35%" y2="45%" stroke="#c8f55a" strokeWidth="1" strokeDasharray="4 8" />
        <line x1="42%" y1="35%" x2="58%" y2="25%" stroke="#f55a9b" strokeWidth="1" strokeDasharray="4 8" />
        <line x1="62%" y1="30%" x2="76%" y2="40%" stroke="#5ab4f5" strokeWidth="1" strokeDasharray="4 8" />
      </svg>
    </div>
  );
}
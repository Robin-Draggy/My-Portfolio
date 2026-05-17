import { useRef, useEffect } from "react";
import { animateWords } from "./animations";

const HEADING_LINES = [
  { text: "CRAFTING", isStroke: false },
  { text: "EXPERIENCES,", isStroke: false },
  { text: "NOT JUST", isStroke: false },
  { text: "INTERFACES.", isStroke: true },
];

export default function HeadingSection() {
  const headingRef = useRef(null);

  useEffect(() => {
    const animation = animateWords(headingRef.current);
    return () => animation?.kill();
  }, []);

  return (
    <div ref={headingRef} className="overflow-hidden mb-10">
      {HEADING_LINES.map((line, idx) => (
        <div key={idx} className="overflow-hidden mb-2">
          <h2
            className={`font-display font-extrabold leading-[0.88] tracking-tight ${
              line.isStroke
                ? "text-transparent"
                : "text-[#f0ece3]"
            }`}
            style={{
              fontSize: "clamp(52px, 9vw, 108px)",
              ...(line.isStroke && { WebkitTextStroke: "1.5px #2a2a2a" }),
            }}
          >
            {line.text}
          </h2>
        </div>
      ))}
    </div>
  );
}
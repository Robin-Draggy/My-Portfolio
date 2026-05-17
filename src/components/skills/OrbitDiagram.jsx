import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ORBIT_CORE, ORBIT_RING } from "./constants";

export default function OrbitDiagram() {
  const svgRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".orbit-ring-group", {
        rotation: 360,
        transformOrigin: "200px 200px",
        duration: 28,
        repeat: -1,
        ease: "none",
      });
      gsap.to(".orbit-label", {
        rotation: -360,
        transformOrigin: "50% 50%",
        duration: 28,
        repeat: -1,
        ease: "none",
      });
      gsap.to(".orbit-center-pulse", {
        scale: 1.15,
        opacity: 0.4,
        duration: 1.8,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        transformOrigin: "200px 200px",
      });
    }, svgRef);
    return () => ctx.revert();
  }, []);

  const CX = 200, CY = 200;
  const R_INNER = 58, R_OUTER = 130;

  const corePositions = ORBIT_CORE.map((_, i) => {
    const angle = (i / ORBIT_CORE.length) * 2 * Math.PI - Math.PI / 2;
    return { x: CX + R_INNER * Math.cos(angle), y: CY + R_INNER * Math.sin(angle) };
  });

  const ringPositions = ORBIT_RING.map((_, i) => {
    const angle = (i / ORBIT_RING.length) * 2 * Math.PI - Math.PI / 2;
    return { x: CX + R_OUTER * Math.cos(angle), y: CY + R_OUTER * Math.sin(angle) };
  });

  return (
    <svg
      ref={svgRef}
      width="400"
      height="400"
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-[320px] sm:max-w-[360px] lg:max-w-[400px] mx-auto"
    >
      <circle cx={CX} cy={CY} r={R_OUTER} stroke="#1a1a1a" strokeWidth="1" strokeDasharray="4 8" />
      <circle cx={CX} cy={CY} r={R_INNER} stroke="#1e1e1e" strokeWidth="1" />
      <circle className="orbit-center-pulse" cx={CX} cy={CY} r={28} fill="#c8f55a" opacity="0.08" />
      <circle cx={CX} cy={CY} r={20} fill="#0f0f0f" stroke="#c8f55a" strokeWidth="1" strokeOpacity="0.4" />
      <text x={CX} y={CY + 4} textAnchor="middle" fill="#c8f55a" fontSize="9" fontFamily="monospace" opacity="0.8">CORE</text>

      {corePositions.map((pos, i) => (
        <line key={i} x1={CX} y1={CY} x2={pos.x} y2={pos.y} stroke="#1e1e1e" strokeWidth="1" />
      ))}

      {corePositions.map((pos, i) => (
        <g key={i}>
          <circle cx={pos.x} cy={pos.y} r={18} fill="#0d0d0d" stroke="#c8f55a" strokeWidth="1" strokeOpacity="0.5" />
          <text x={pos.x} y={pos.y + 4} textAnchor="middle" fill="#f0ece3" fontSize="7.5" fontFamily="monospace">
            {ORBIT_CORE[i]}
          </text>
        </g>
      ))}

      <g className="orbit-ring-group">
        {ringPositions.map((pos, i) => (
          <g key={i}>
            <line x1={CX} y1={CY} x2={pos.x} y2={pos.y} stroke="#111" strokeWidth="1" />
            <circle cx={pos.x} cy={pos.y} r={22} fill="#0d0d0d" stroke="#2a2a2a" strokeWidth="1" />
            <text
              className="orbit-label"
              x={pos.x}
              y={pos.y + 4}
              textAnchor="middle"
              fill="#3a3a3a"
              fontSize="7"
              fontFamily="monospace"
            >
              {ORBIT_RING[i]}
            </text>
          </g>
        ))}
      </g>

      <line x1="10" y1="10" x2="24" y2="10" stroke="#1e1e1e" strokeWidth="1" />
      <line x1="17" y1="3" x2="17" y2="17" stroke="#1e1e1e" strokeWidth="1" />
      <line x1="376" y1="390" x2="390" y2="390" stroke="#1e1e1e" strokeWidth="1" />
      <line x1="383" y1="383" x2="383" y2="397" stroke="#1e1e1e" strokeWidth="1" />
    </svg>
  );
}
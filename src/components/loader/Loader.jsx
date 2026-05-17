import gsap from "gsap";
import { useEffect, useRef } from "react";


function Loader({ onComplete }) {
  const loaderRef = useRef(null);
  const hexRef = useRef(null);
  const letterARef = useRef(null);
  const letterMRef = useRef(null);
  const spinRef = useRef(null);
  const dotsRef = useRef([]);
  const progressFillRef = useRef(null);
  const pctRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // hex outline draw
    tl.fromTo(
      hexRef.current,
      { strokeDashoffset: 490 },
      { strokeDashoffset: 0, duration: 0.85, ease: "power2.inOut" }
    )
      // vertex dots
      .to(dotsRef.current, {
        opacity: 1,
        stagger: 0.06,
        duration: 0.18,
      }, "-=0.25")
      // letter A draw
      .fromTo(
        letterARef.current,
        { strokeDashoffset: 200 },
        { strokeDashoffset: 0, duration: 0.55, ease: "power3.out" },
        "-=0.1"
      )
      // letter M draw
      .fromTo(
        letterMRef.current,
        { strokeDashoffset: 220 },
        { strokeDashoffset: 0, duration: 0.55, ease: "power3.out" },
        "-=0.45"
      );

    // progress counter
    gsap.to(pctRef.current, {
      innerText: 100,
      snap: { innerText: 1 },
      duration: 1.1,
      ease: "power1.inOut",
    });
    gsap.to(progressFillRef.current, {
      width: "100%",
      duration: 1.1,
      ease: "power1.inOut",
    });

    // spin ring
    gsap.to(spinRef.current, {
      rotation: 360,
      transformOrigin: "100px 100px",
      duration: 5,
      repeat: -1,
      ease: "none",
    });

    // exit
    tl.to(loaderRef.current, {
      yPercent: -100,
      duration: 0.9,
      ease: "expo",
      delay: 0.1,
      onComplete,
    });
  }, []);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0a0a0a]"
    >
      {/* SVG monogram */}
      <svg
        width="200"
        height="200"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
      >
        {/* spinning dashed ring */}
        <circle
          ref={spinRef}
          cx="100"
          cy="100"
          r="62"
          stroke="#c8f55a"
          strokeWidth="0.6"
          strokeDasharray="8 14"
          fill="none"
          opacity="0.6"
        />

        {/* inner ring */}
        <circle
          cx="100"
          cy="100"
          r="48"
          stroke="#2a2a2a"
          strokeWidth="0.8"
          fill="none"
        />

        {/* hex outline — animated */}
        <polygon
          ref={hexRef}
          points="100,10 178,55 178,145 100,190 22,145 22,55"
          stroke="#c8f55a"
          strokeWidth="1.5"
          fill="none"
          strokeDasharray="490"
          strokeDashoffset="490"
        />

        {/* vertex dots */}
        {[
          [100, 10], [178, 55], [178, 145],
          [100, 190], [22, 145], [22, 55],
        ].map(([cx, cy], i) => (
          <circle
            key={i}
            ref={(el) => (dotsRef.current[i] = el)}
            cx={cx}
            cy={cy}
            r="3"
            fill="#c8f55a"
            opacity="0"
          />
        ))}

        {/* A */}
        <path
          ref={letterARef}
          d="M72 138 L88 68 L100 103 M78 115 H94"
          stroke="#f0ece3"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="200"
          strokeDashoffset="200"
        />

        {/* M */}
        <path
          ref={letterMRef}
          d="M104 138 L104 68 L120 105 L136 68 L136 138"
          stroke="#c8f55a"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="220"
          strokeDashoffset="220"
        />
      </svg>

      {/* label */}
      <p className="mt-8 font-mono text-[11px] tracking-[0.3em] uppercase text-[#3a3a3a]">
        Loading <span className="text-[#c8f55a]" ref={pctRef}>0</span>%
      </p>

      {/* progress bar */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-40 h-px bg-[#2a2a2a]">
        <div ref={progressFillRef} className="h-full w-0 bg-[#c8f55a]" />
      </div>
    </div>
  );
}

export default Loader;
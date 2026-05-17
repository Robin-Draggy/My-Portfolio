import { useEffect, useRef } from "react";

export default function CursorBlob() {
  const blobRef = useRef(null);
  const pos = useRef({ x: -200, y: -200 });
  const current = useRef({ x: -200, y: -200 });
  const rafRef = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMove);

    const loop = () => {
      current.current.x += (pos.current.x - current.current.x) * 0.09;
      current.current.y += (pos.current.y - current.current.y) * 0.09;
      if (blobRef.current) {
        blobRef.current.style.transform = `translate(${current.current.x - 200}px, ${current.current.y - 200}px)`;
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={blobRef}
      className="pointer-events-none fixed top-0 left-0 w-[400px] h-[400px] rounded-full z-0"
      style={{
        background: "radial-gradient(circle, rgba(200,245,90,0.06) 0%, transparent 70%)",
        willChange: "transform",
      }}
    />
  );
}
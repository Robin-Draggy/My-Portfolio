import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function MagneticButton({ children, className, ...props }) {
  const btnRef = useRef(null);
  
  useEffect(() => {
    const btn = btnRef.current;
    if (!btn) return;
    
    const onEnter = (e) => {
      const r = btn.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      gsap.to(btn, { x: x * 0.35, y: y * 0.35, duration: 0.4, ease: "power2.out" });
    };
    
    const onLeave = () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1,0.5)" });
    };
    
    btn.addEventListener("mousemove", onEnter);
    btn.addEventListener("mouseleave", onLeave);
    
    return () => {
      btn.removeEventListener("mousemove", onEnter);
      btn.removeEventListener("mouseleave", onLeave);
    };
  }, []);
  
  return (
    <button ref={btnRef} className={className} {...props}>
      {children}
    </button>
  );
}
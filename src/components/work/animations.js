import gsap from "gsap";

export function animateProjectCard(cardRef, rotate, index, delay = index * 0.12) {
  gsap.fromTo(
    cardRef,
    { opacity: 0, y: 60, rotate: rotate + (index % 2 === 0 ? -8 : 8) },
    {
      opacity: 1,
      y: 0,
      rotate: rotate,
      duration: 0.9,
      delay,
      ease: "power3.out",
    },
  );
}

export function animateExpandedOverlay(overlayRef, contentRef, onComplete) {
  const tl = gsap.timeline();
  tl.fromTo(
    overlayRef,
    { opacity: 0 },
    { opacity: 1, duration: 0.3, ease: "power2.out" },
  ).fromTo(
    contentRef,
    { scale: 0.94, y: 30 },
    { scale: 1, y: 0, duration: 0.5, ease: "power3.out" },
    "-=0.1",
  );
  return tl;
}

export function closeExpandedOverlay(contentRef, overlayRef, onComplete) {
  gsap.to(contentRef, {
    scale: 0.96,
    y: 20,
    duration: 0.3,
    ease: "power2.in",
  });
  gsap.to(overlayRef, {
    opacity: 0,
    duration: 0.35,
    ease: "power2.in",
    onComplete,
  });
}
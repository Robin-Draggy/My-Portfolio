import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function revealOnScroll(el, vars = {}) {
  // Return if no element
  if (!el) return;
  
  // Handle NodeList or array of elements
  let elements = [];
  if (el.length !== undefined) {
    // It's a NodeList or array
    elements = Array.from(el);
  } else if (el.querySelectorAll) {
    // It's a single element
    elements = [el];
  } else {
    console.warn("revealOnScroll: Invalid element provided", el);
    return;
  }
  
  // Filter out null/undefined elements
  elements = elements.filter(element => element && element.nodeType);
  
  if (elements.length === 0) {
    console.warn("revealOnScroll: No valid elements found");
    return;
  }
  
  // Apply animation to each element
  elements.forEach(element => {
    gsap.fromTo(
      element,
      { opacity: 0, y: 40, ...vars.from },
      {
        opacity: 1,
        y: 0,
        duration: 0.85,
        ease: "power3.out",
        scrollTrigger: {
          trigger: element,
          start: "top 88%",
          toggleActions: "play none none none",
        },
        ...vars.to,
      },
    );
  });
}

export function animateWords(element) {
  if (!element) return;
  
  // Ensure we're working with a single element
  const targetElement = element.length !== undefined ? element[0] : element;
  
  if (!targetElement || !targetElement.querySelectorAll) {
    console.warn("animateWords: Invalid element provided", element);
    return;
  }
  
  const words = targetElement.querySelectorAll(".word");
  if (words.length === 0) return;
  
  return gsap.fromTo(
    words,
    { opacity: 0, y: 50, skewY: 3 },
    {
      opacity: 1,
      y: 0,
      skewY: 0,
      stagger: 0.08,
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: {
        trigger: targetElement,
        start: "top 85%",
      },
    },
  );
}

export function animateImageBlock(element) {
  if (!element) return;
  
  // Ensure we're working with a single element
  const targetElement = element.length !== undefined ? element[0] : element;
  
  if (!targetElement || targetElement.nodeType !== 1) {
    console.warn("animateImageBlock: Invalid element provided", element);
    return;
  }
  
  return gsap.fromTo(
    targetElement,
    { opacity: 0, scale: 0.96, y: 30 },
    {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: targetElement,
        start: "top 85%",
      },
    },
  );
}

// New utility function for animating multiple elements at once
export function revealMultipleElements(elements, vars = {}) {
  if (!elements || elements.length === 0) return;
  
  const validElements = Array.from(elements).filter(el => el && el.nodeType === 1);
  
  if (validElements.length === 0) return;
  
  validElements.forEach((el, index) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: 30, ...vars.from },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        delay: index * 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          toggleActions: "play none none none",
        },
        ...vars.to,
      },
    );
  });
}
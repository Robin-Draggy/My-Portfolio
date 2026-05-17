import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import emailjs from "@emailjs/browser";

gsap.registerPlugin(ScrollTrigger);

// ── EmailJS config — read from .env ────────────────────────
const EJS_SERVICE_ID  = import.meta.env.VITE_EJS_SERVICE_ID;
const EJS_TEMPLATE_ID = import.meta.env.VITE_EJS_TEMPLATE_ID;
const EJS_PUBLIC_KEY  = import.meta.env.VITE_EJS_PUBLIC_KEY;

// ── Social links ──────────────────────────────────────────────────────────
const SOCIALS = [
  { label: "GitHub",   href: "https://github.com/Robin-Draggy",                symbol: "GH" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/abdullah~webdev",    symbol: "LI" },
  { label: "Email",    href: "mailto:abdullahmn3399@gmail.com",             symbol: "@" },
];

// ── Terminal line component ───────────────────────────────────────────────
function TermLine({ prompt = "$", label, children, accent = "#c8f55a", dim = false }) {
  return (
    <div className="flex gap-2 font-mono text-[12px] sm:text-[13px] leading-relaxed">
      <span style={{ color: dim ? "#2a2a2a" : accent, userSelect: "none" }}>{prompt}</span>
      {label && <span className="text-[#2a2a2a]">{label}</span>}
      <span className="text-[#3a3a3a]">{children}</span>
    </div>
  );
}

// ── Cursor blink ──────────────────────────────────────────────────────────
function Cursor({ color = "#c8f55a" }) {
  return (
    <span
      className="inline-block w-2 h-[14px] ml-0.5 align-middle"
      style={{ background: color, animation: "blink 1.1s step-end infinite" }}
    />
  );
}

// ── Terminal form ─────────────────────────────────────────────────────────
function TerminalForm() {
  const STEPS = ["name", "email", "subject", "message"];
  const PROMPTS = {
    name:    { q: "What's your name?",           placeholder: "e.g. John Doe",           type: "text" },
    email:   { q: "Your email address?",          placeholder: "e.g. john@company.com",   type: "email" },
    subject: { q: "What's this about?",           placeholder: "e.g. Project Proposal",   type: "text" },
    message: { q: "Go ahead, tell me more.",      placeholder: "Type your message here…", type: "textarea" },
  };

  const [step, setStep]       = useState(0);
  const [values, setValues]   = useState({ name: "", email: "", subject: "", message: "" });
  const [current, setCurrent] = useState("");
  const [status, setStatus]   = useState("idle"); // idle | sending | success | error
  const [errors, setErrors]   = useState({});
  const inputRef              = useRef(null);
  const historyRef            = useRef(null);

  // focus input when step changes
  useEffect(() => {
    inputRef.current?.focus();
  }, [step, status]);

  // scroll history into view
  useEffect(() => {
    historyRef.current?.scrollTo({ top: historyRef.current.scrollHeight, behavior: "smooth" });
  }, [step, values, status]);

  const validate = (field, val) => {
    if (!val.trim()) return "This field cannot be empty.";
    if (field === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) return "Enter a valid email address.";
    return null;
  };

  const advance = () => {
    const field = STEPS[step];
    const err   = validate(field, current);
    if (err) { setErrors({ [field]: err }); return; }
    setErrors({});
    setValues(v => ({ ...v, [field]: current }));
    setCurrent("");
    if (step < STEPS.length - 1) {
      setStep(s => s + 1);
    } else {
      // submit
      handleSend({ ...values, [field]: current });
    }
  };

  const handleSend = async (data) => {
    setStatus("sending");
    try {
      await emailjs.send(
        EJS_SERVICE_ID,
        EJS_TEMPLATE_ID,
        {
          from_name:    data.name,
          from_email:   data.email,
          subject:      data.subject,
          message:      data.message,
          to_email:     "abdullahmn3399@gmail.com",
        },
        EJS_PUBLIC_KEY
      );
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const reset = () => {
    setStep(0);
    setValues({ name: "", email: "", subject: "", message: "" });
    setCurrent("");
    setStatus("idle");
    setErrors({});
  };

  const currentField   = STEPS[step];
  const currentPrompt  = PROMPTS[currentField];
  const isLastStep     = step === STEPS.length - 1;
  const completedSteps = status === "idle" ? step : STEPS.length;

  return (
    <div
      className="relative flex flex-col border border-[#1a1a1a] overflow-hidden"
      style={{ background: "#080808", minHeight: 480 }}
    >
      {/* title bar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#111] shrink-0">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        </div>
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#1e1e1e]">
          contact.sh
        </span>
        <span className="font-mono text-[10px] text-[#1a1a1a]">bash</span>
      </div>

      {/* scrollable history */}
      <div ref={historyRef} className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-3" style={{ maxHeight: 380 }}>
        {/* intro */}
        <TermLine prompt="~" accent="#2a2a2a">cd /contact && ./init.sh</TermLine>
        <div className="py-1">
          <p className="font-mono text-[11px] text-[#1e1e1e] leading-relaxed">
            # Initialising contact session for Abdullah Al Mamun<br/>
            # Fill each field and press Enter ↵ to continue.
          </p>
        </div>

        {/* completed steps */}
        {STEPS.slice(0, completedSteps).map((field, i) => (
          values[field] ? (
            <div key={field} className="space-y-0.5">
              <TermLine prompt=">" label={`${field}:`} accent="#c8f55a">{values[field]}</TermLine>
            </div>
          ) : null
        ))}

        {/* sending / success / error */}
        {status === "sending" && (
          <div className="space-y-1 pt-1">
            <TermLine prompt="$" accent="#f5a25a">sending message…</TermLine>
            <div className="flex items-center gap-2 pl-5">
              <div className="w-3 h-3 border border-[#c8f55a] border-t-transparent rounded-full" style={{ animation: "spin 0.7s linear infinite" }} />
              <span className="font-mono text-[11px] text-[#2a2a2a]">Connecting to mail server…</span>
            </div>
          </div>
        )}

        {status === "success" && (
          <div className="space-y-1 pt-2">
            <TermLine prompt="✓" accent="#c8f55a">Message sent successfully.</TermLine>
            <TermLine prompt="#" accent="#2a2a2a" dim>Exit code 0 — no errors.</TermLine>
            <div className="pt-3">
              <p className="font-mono text-[11px] text-[#2a2a2a] leading-relaxed mb-3">
                Thanks, <span className="text-[#c8f55a]">{values.name}</span>! I'll get back to you at{" "}
                <span className="text-[#c8f55a]">{values.email}</span> soon.
              </p>
              <button
                onClick={reset}
                className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#0a0a0a] bg-[#c8f55a] px-4 py-2 hover:opacity-80 transition-opacity"
              >
                ./init.sh again?
              </button>
            </div>
          </div>
        )}

        {status === "error" && (
          <div className="space-y-1 pt-2">
            <TermLine prompt="✗" accent="#f55a5a">Error: Failed to send. Check your keys.</TermLine>
            <button
              onClick={reset}
              className="ml-4 font-mono text-[10px] tracking-[0.2em] uppercase text-[#f55a5a] border border-[#f55a5a33] px-3 py-1.5 hover:bg-[#f55a5a11] transition-colors mt-2"
            >
              Retry?
            </button>
          </div>
        )}
      </div>

      {/* active input area */}
      {status === "idle" && (
        <div className="border-t border-[#111] p-5 sm:p-6 shrink-0">
          {/* current question */}
          <div className="mb-3">
            <span className="font-mono text-[11px] text-[#2a2a2a]"># {currentPrompt.q}</span>
            {errors[currentField] && (
              <p className="font-mono text-[10px] text-[#f55a5a] mt-0.5">! {errors[currentField]}</p>
            )}
          </div>

          {/* input row */}
          <div className="flex items-start gap-2">
            <span className="font-mono text-[13px] text-[#c8f55a] mt-0.5 shrink-0">›</span>
            {currentPrompt.type === "textarea" ? (
              <textarea
                ref={inputRef}
                value={current}
                onChange={e => setCurrent(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter" && e.metaKey) advance(); }}
                rows={4}
                placeholder={currentPrompt.placeholder}
                className="flex-1 bg-transparent font-mono text-[12px] sm:text-[13px] text-[#f0ece3] outline-none resize-none placeholder-[#1e1e1e] leading-relaxed"
              />
            ) : (
              <input
                ref={inputRef}
                value={current}
                onChange={e => setCurrent(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter") advance(); }}
                type={currentPrompt.type}
                placeholder={currentPrompt.placeholder}
                className="flex-1 bg-transparent font-mono text-[12px] sm:text-[13px] text-[#f0ece3] outline-none placeholder-[#1e1e1e]"
              />
            )}
            <Cursor />
          </div>

          {/* step + submit */}
          <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#0f0f0f]">
            {/* step pips */}
            <div className="flex items-center gap-1.5">
              {STEPS.map((_, i) => (
                <div
                  key={i}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === step ? 16 : 6,
                    height: 6,
                    background: i < step ? "#c8f55a" : i === step ? "#c8f55a" : "#1a1a1a",
                    opacity: i < step ? 0.4 : 1,
                  }}
                />
              ))}
            </div>

            <button
              onClick={advance}
              className="flex items-center gap-2 font-mono text-[10px] tracking-[0.18em] uppercase px-4 py-2 transition-all duration-200 hover:opacity-80"
              style={{ background: "#c8f55a", color: "#0a0a0a" }}
            >
              {isLastStep ? "Send ↵" : "Next ↵"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Left info panel ───────────────────────────────────────────────────────
function InfoPanel() {
  const panelRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        panelRef.current.querySelectorAll(".reveal-item"),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: panelRef.current, start: "top 85%" } }
      );
    }, panelRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={panelRef} className="flex flex-col justify-between h-full gap-12 lg:gap-0">
      <div>
        {/* label */}
        <div className="reveal-item opacity-0 flex items-center gap-3 mb-10">
          <span className="font-mono text-[10px] tracking-[0.35em] uppercase text-[#c8f55a]">Contact</span>
          <span className="h-px w-10 bg-[#c8f55a] opacity-30" />
        </div>

        {/* big heading */}
        <div className="reveal-item opacity-0 overflow-hidden mb-2">
          <h2
            className="font-display font-extrabold leading-[0.88] tracking-tight text-[#f0ece3]"
            style={{ fontSize: "clamp(52px, 9vw, 108px)" }}
          >
            LET'S
          </h2>
        </div>
        <div className="reveal-item opacity-0 overflow-hidden mb-10">
          <h2
            className="font-display font-extrabold leading-[0.88] tracking-tight"
            style={{
              fontSize: "clamp(52px, 9vw, 108px)",
              color: "transparent",
              WebkitTextStroke: "1.5px #2a2a2a",
            }}
          >
            TALK.
          </h2>
        </div>

        {/* description */}
        <div className="reveal-item opacity-0 mb-10">
          <p className="font-display text-[14px] sm:text-[15px] text-[#2a2a2a] leading-relaxed max-w-xs">
            Open to freelance projects, full-time roles, and interesting conversations.
            Fill the terminal on the right — I'll get back to you within 24 hrs.
          </p>
        </div>

        {/* direct email */}
        <div className="reveal-item opacity-0 mb-10">
          <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#1e1e1e] mb-2">Direct mail</p>
          <a
            href="mailto:abdullahmn3399@gmail.com"
            className="group font-mono text-[12px] sm:text-[13px] text-[#3a3a3a] hover:text-[#c8f55a] transition-colors duration-300 flex items-center gap-2"
          >
            abdullahmn3399@gmail.com
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-xs">↗</span>
          </a>
        </div>

        {/* availability */}
        <div className="reveal-item opacity-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c8f55a] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#c8f55a]" />
            </span>
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#c8f55a] opacity-70">Available for work</span>
          </div>
          <p className="font-mono text-[10px] text-[#1e1e1e] ml-4">Dhaka, Bangladesh · GMT+6</p>
        </div>
      </div>

      {/* socials */}
      <div className="reveal-item opacity-0">
        <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#1a1a1a] mb-4">Find me at</p>
        <div className="flex flex-wrap gap-2">
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="group flex items-center gap-2 border border-[#1a1a1a] px-4 py-2.5 hover:border-[#c8f55a] hover:bg-[#c8f55a0d] transition-all duration-300"
            >
              <span className="font-mono text-[10px] text-[#2a2a2a] group-hover:text-[#c8f55a] transition-colors duration-300">{s.symbol}</span>
              <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-[#1e1e1e] group-hover:text-[#f0ece3] transition-colors duration-300">{s.label}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────
export default function Contact() {
  const sectionRef  = useRef(null);
  const formWrapRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        formWrapRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: formWrapRef.current, start: "top 85%" } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative bg-[#0a0a0a] py-24 sm:py-36 px-5 sm:px-8 lg:px-14 overflow-hidden"
    >
      {/* dot grid */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: "radial-gradient(circle, #151515 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* ghost number */}
      <div
        className="pointer-events-none absolute top-10 right-4 sm:right-14 font-display font-extrabold select-none leading-none z-0"
        style={{ fontSize: "clamp(100px, 18vw, 200px)", color: "transparent", WebkitTextStroke: "1px #0d0d0d" }}
        aria-hidden
      >
        05
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-start">
          {/* left */}
          <InfoPanel />

          {/* right — terminal form */}
          <div ref={formWrapRef} className="opacity-0">
            <TerminalForm />
          </div>
        </div>

        {/* footer strip */}
        <div className="mt-24 sm:mt-32 pt-8 border-t border-[#0f0f0f] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#1a1a1a]">
            © 2026 Abdullah Al Mamun 
          </span>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="font-mono text-[10px] px-3 py-2 cursor-pointer tracking-[0.2em] uppercase text-white/60 hover:text-[#c8f55a] transition-colors duration-300 flex items-center gap-2"
          >
            Back to top ↑
          </button>
        </div>
      </div>

      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes spin  { to { transform: rotate(360deg); } }
      `}</style>
    </section>
  );
}
import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import TermLine from "./TermLine";
import Cursor from "./Cursor";
import { TERMINAL_STEPS, TERMINAL_PROMPTS, EMAILJS_CONFIG } from "./constants";

function TerminalFormStatus({ status, values, onReset }) {
  if (status === "sending") {
    return (
      <div className="space-y-1 pt-1">
        <TermLine prompt="$" accent="#f5a25a">sending message…</TermLine>
        <div className="flex items-center gap-2 pl-5">
          <div className="w-3 h-3 border border-[#c8f55a] border-t-transparent rounded-full" style={{ animation: "spin 0.7s linear infinite" }} />
          <span className="font-mono text-[11px] text-[#2a2a2a]">Connecting to mail server…</span>
        </div>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="space-y-1 pt-2">
        <TermLine prompt="✓" accent="#c8f55a">Message sent successfully.</TermLine>
        <TermLine prompt="#" accent="#2a2a2a" dim>Exit code 0 — no errors.</TermLine>
        <div className="pt-3">
          <p className="font-mono text-[11px] text-[#2a2a2a] leading-relaxed mb-3">
            Thanks, <span className="text-[#c8f55a]">{values.name}</span>! I'll get back to you at{" "}
            <span className="text-[#c8f55a]">{values.email}</span> soon.
          </p>
          <button
            onClick={onReset}
            className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#0a0a0a] bg-[#c8f55a] px-4 py-2 hover:opacity-80 transition-opacity"
          >
            ./init.sh again?
          </button>
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="space-y-1 pt-2">
        <TermLine prompt="✗" accent="#f55a5a">Error: Failed to send. Check your keys.</TermLine>
        <button
          onClick={onReset}
          className="ml-4 font-mono text-[10px] tracking-[0.2em] uppercase text-[#f55a5a] border border-[#f55a5a33] px-3 py-1.5 hover:bg-[#f55a5a11] transition-colors mt-2"
        >
          Retry?
        </button>
      </div>
    );
  }

  return null;
}

function TerminalInput({ field, value, onChange, onAdvance, error }) {
  const inputRef = useRef(null);
  const prompt = TERMINAL_PROMPTS[field];


  const handleKeyDown = (e) => {
    if (prompt.type === "textarea" && e.key === "Enter" && e.metaKey) onAdvance();
    if (prompt.type !== "textarea" && e.key === "Enter") onAdvance();
  };

  return (
    <div className="border-t border-[#111] p-5 sm:p-6 shrink-0">
      <div className="mb-3">
        <span className="font-mono text-[11px] text-[#2a2a2a]"># {prompt.q}</span>
        {error && <p className="font-mono text-[10px] text-[#f55a5a] mt-0.5">! {error}</p>}
      </div>

      <div className="flex items-start gap-2">
        <span className="font-mono text-[13px] text-[#c8f55a] mt-0.5 shrink-0">›</span>
        {prompt.type === "textarea" ? (
          <textarea
            ref={inputRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={4}
            placeholder={prompt.placeholder}
            className="flex-1 bg-transparent font-mono text-[12px] sm:text-[13px] text-[#f0ece3] outline-none resize-none placeholder-[#1e1e1e] leading-relaxed"
          />
        ) : (
          <input
            ref={inputRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            type={prompt.type}
            placeholder={prompt.placeholder}
            className="flex-1 bg-transparent font-mono text-[12px] sm:text-[13px] text-[#f0ece3] outline-none placeholder-[#1e1e1e]"
          />
        )}
        <Cursor />
      </div>

      <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#0f0f0f]">
        <div className="flex items-center gap-1.5">
          {TERMINAL_STEPS.map((_, i) => (
            <div
              key={i}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === TERMINAL_STEPS.indexOf(field) ? 16 : 6,
                height: 6,
                background: i < TERMINAL_STEPS.indexOf(field) ? "#c8f55a" : i === TERMINAL_STEPS.indexOf(field) ? "#c8f55a" : "#1a1a1a",
                opacity: i < TERMINAL_STEPS.indexOf(field) ? 0.4 : 1,
              }}
            />
          ))}
        </div>

        <button
          onClick={onAdvance}
          className="flex items-center gap-2 font-mono text-[10px] tracking-[0.18em] uppercase px-4 py-2 transition-all duration-200 hover:opacity-80"
          style={{ background: "#c8f55a", color: "#0a0a0a" }}
        >
          {field === "message" ? "Send ↵" : "Next ↵"}
        </button>
      </div>
    </div>
  );
}

export default function TerminalForm() {
  const [step, setStep] = useState(0);
  const [values, setValues] = useState({ name: "", email: "", subject: "", message: "" });
  const [current, setCurrent] = useState("");
  const [status, setStatus] = useState("idle");
  const [errors, setErrors] = useState({});
  const historyRef = useRef(null);

  useEffect(() => {
    historyRef.current?.scrollTo({ top: historyRef.current.scrollHeight, behavior: "smooth" });
  }, [step, values, status]);

  const validate = (field, val) => {
    if (!val.trim()) return "This field cannot be empty.";
    if (field === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) return "Enter a valid email address.";
    return null;
  };

  const advance = () => {
    const field = TERMINAL_STEPS[step];
    const err = validate(field, current);
    if (err) {
      setErrors({ [field]: err });
      return;
    }
    setErrors({});
    setValues(v => ({ ...v, [field]: current }));
    setCurrent("");
    
    if (step < TERMINAL_STEPS.length - 1) {
      setStep(s => s + 1);
    } else {
      handleSend({ ...values, [field]: current });
    }
  };

  const handleSend = async (data) => {
    setStatus("sending");
    try {
      await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        {
          from_name: data.name,
          from_email: data.email,
          subject: data.subject,
          message: data.message,
          to_email: EMAILJS_CONFIG.TO_EMAIL,
        },
        EMAILJS_CONFIG.PUBLIC_KEY
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

  const currentField = TERMINAL_STEPS[step];
  const completedSteps = status === "idle" ? step : TERMINAL_STEPS.length;

  return (
    <div className="relative flex flex-col border border-[#1a1a1a] overflow-hidden" style={{ background: "#080808", minHeight: 480 }}>
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#111] shrink-0">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        </div>
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#1e1e1e]">contact.sh</span>
        <span className="font-mono text-[10px] text-[#1a1a1a]">bash</span>
      </div>

      <div ref={historyRef} className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-3" style={{ maxHeight: 380 }}>
        <TermLine prompt="~" accent="#2a2a2a">cd /contact && ./init.sh</TermLine>
        <div className="py-1">
          <p className="font-mono text-[11px] text-[#1e1e1e] leading-relaxed">
            # Initialising contact session for Abdullah Al Mamun<br />
            # Fill each field and press Enter ↵ to continue.
          </p>
        </div>

        {TERMINAL_STEPS.slice(0, completedSteps).map((field, i) => (
          values[field] && (
            <div key={field} className="space-y-0.5">
              <TermLine prompt=">" label={`${field}:`} accent="#c8f55a">{values[field]}</TermLine>
            </div>
          )
        ))}

        <TerminalFormStatus status={status} values={values} onReset={reset} />
      </div>

      {status === "idle" && (
        <TerminalInput
          field={currentField}
          value={current}
          onChange={setCurrent}
          onAdvance={advance}
          error={errors[currentField]}
        />
      )}
    </div>
  );
}
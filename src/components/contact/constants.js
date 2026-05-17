export const SOCIALS = [
  { label: "GitHub", href: "https://github.com/Robin-Draggy", symbol: "GH" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/abdullah~webdev", symbol: "LI" },
  { label: "Email", href: "mailto:abdullahmn3399@gmail.com", symbol: "@" },
];

export const TERMINAL_STEPS = ["name", "email", "subject", "message"];

export const TERMINAL_PROMPTS = {
  name: { q: "What's your name?", placeholder: "e.g. John Doe", type: "text" },
  email: { q: "Your email address?", placeholder: "e.g. john@company.com", type: "email" },
  subject: { q: "What's this about?", placeholder: "e.g. Project Proposal", type: "text" },
  message: { q: "Go ahead, tell me more.", placeholder: "Type your message here…", type: "textarea" },
};

export const EMAILJS_CONFIG = {
  SERVICE_ID: import.meta.env.VITE_EJS_SERVICE_ID,
  TEMPLATE_ID: import.meta.env.VITE_EJS_TEMPLATE_ID,
  PUBLIC_KEY: import.meta.env.VITE_EJS_PUBLIC_KEY,
  TO_EMAIL: "abdullahmn3399@gmail.com",
};
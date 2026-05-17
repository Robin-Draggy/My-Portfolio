export default function Cursor({ color = "#c8f55a" }) {
  return (
    <span
      className="inline-block w-2 h-3.5 ml-0.5 align-middle"
      style={{ background: color, animation: "blink 1.1s step-end infinite" }}
    />
  );
}
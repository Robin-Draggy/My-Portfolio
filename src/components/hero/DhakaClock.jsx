import { useEffect, useState } from "react";

export default function DhakaClock() {
  const [time, setTime] = useState("");
  
  useEffect(() => {
    const tick = () => {
      const t = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Dhaka",
        hour: "2-digit", minute: "2-digit", second: "2-digit",
        hour12: false,
      }).format(new Date());
      setTime(t);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  
  return (
    <div className="flex flex-col items-end gap-1">
      <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#3a3a3a]">
        Dhaka / GMT+6
      </span>
      <span className="font-mono text-[13px] text-[#c8f55a] tabular-nums">
        {time}
      </span>
    </div>
  );
}
"use client";

import { useState } from "react";

export default function Reveal({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setOpen(!open)}>{open ? "Hide" : "Reveal"}</button>
      {open && children}
    </div>
  );
}

"use client";

import { useState } from "react";

// Lives in the layout, so its state persists across the tabs.
export default function Counter() {
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount(count + 1)}>Layout state: {count}</button>
  );
}

"use client";

import { useState } from "react";

const url = "/09-route-handlers/api/hello";

export default function Caller() {
  const [result, setResult] = useState("Click a button");

  async function call(init?: RequestInit) {
    const res = await fetch(init ? url : `${url}?name=Ada`, init);
    setResult(`${res.status} ${JSON.stringify(await res.json(), null, 2)}`);
  }

  return (
    <>
      <button onClick={() => call()}>GET ?name=Ada</button>{" "}
      <button
        onClick={() =>
          call({ method: "POST", body: JSON.stringify({ hello: "server" }) })
        }
      >
        POST {"{ hello: \"server\" }"}
      </button>
      <pre className="output">{result}</pre>
    </>
  );
}

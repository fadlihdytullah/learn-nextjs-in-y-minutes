"use client";

import confetti from "canvas-confetti";
import { usePathname } from "next/navigation";
import { useState, type FormEvent } from "react";
import { markComplete } from "./progress";

type Question = {
  q: string;
  options: string[];
  answer: number;
  explanation: string;
};

function Text({ children }: { children: string }) {
  return children.split("`").map((part, i) => (i % 2 ? <code key={i}>{part}</code> : part));
}

export default function Quiz({ questions }: { questions: Question[] }) {
  const slug = usePathname().split("/")[1];
  const [picks, setPicks] = useState<number[]>([]);
  const [done, setDone] = useState(false);

  const answered = questions.every((_, i) => picks[i] !== undefined);
  const score = questions.filter((q, i) => picks[i] === q.answer).length;

  function pick(i: number, j: number) {
    setPicks((p) => {
      const next = [...p];
      next[i] = j;
      return next;
    });
  }

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setDone(true);
    markComplete(slug);
    confetti({ particleCount: 140, spread: 90, origin: { y: 0.75 }, disableForReducedMotion: true });
  }

  function reset() {
    setPicks([]);
    setDone(false);
  }

  return (
    <form className="quiz" onSubmit={submit}>
      <h2>Quick quiz</h2>
      {questions.map((q, i) => (
        <fieldset key={i} disabled={done}>
          <legend>
            {i + 1}. <Text>{q.q}</Text>
          </legend>
          {q.options.map((option, j) => (
            <label
              key={j}
              data-result={
                done ? (j === q.answer ? "correct" : j === picks[i] ? "wrong" : undefined) : undefined
              }
            >
              <input
                type="radio"
                name={`q${i}`}
                checked={picks[i] === j}
                onChange={() => pick(i, j)}
              />
              <span>
                <Text>{option}</Text>
              </span>
            </label>
          ))}
          {done && (
            <p className="quiz-explanation">
              <Text>{q.explanation}</Text>
            </p>
          )}
        </fieldset>
      ))}
      <div className="quiz-actions">
        {done ? (
          <>
            <span className="pill">
              {score}/{questions.length} correct
            </span>
            <button type="button" onClick={reset}>
              Try again
            </button>
          </>
        ) : (
          <button type="submit" disabled={!answered}>
            Check answers
          </button>
        )}
      </div>
    </form>
  );
}

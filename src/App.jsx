import React, { useState, useEffect } from "react";

// Super simplified StudyTyper MVP
// - Paste notes
// - Break into sentences
// - Type them out with accuracy feedback

function splitSentences(text) {
  return text
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

export default function App() {
  const [notes, setNotes] = useState("");
  const [sentences, setSentences] = useState([]);
  const [current, setCurrent] = useState(0);
  const [typed, setTyped] = useState("");
  const [accuracy, setAccuracy] = useState(100);

  useEffect(() => {
    if (!notes.trim()) {
      setSentences([]);
      setCurrent(0);
    } else {
      setSentences(splitSentences(notes));
      setCurrent(0);
    }
  }, [notes]);

  useEffect(() => {
    const target = sentences[current] || "";
    if (!target) return;
    let correct = 0;
    for (let i = 0; i < typed.length; i++) {
      if (typed[i] === target[i]) correct++;
    }
    const acc = typed.length ? (correct / typed.length) * 100 : 100;
    setAccuracy(acc);
  }, [typed, sentences, current]);

  const target = sentences[current] || "Paste some notes above";
  const done = typed === target && target.length > 0;

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>StudyTyper (Simple)</h1>

      <textarea
        rows={6}
        placeholder="Paste your notes here..."
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        style={{ width: "100%", marginBottom: "1rem" }}
      />

      <div style={{ marginBottom: "1rem" }}>
        <strong>Target:</strong>
        <p>{target}</p>
      </div>

      <input
        type="text"
        value={typed}
        onChange={(e) => setTyped(e.target.value)}
        placeholder="Type here..."
        style={{ width: "100%", padding: "0.5rem" }}
      />

      <p>Accuracy: {accuracy.toFixed(1)}%</p>
      {done && <p style={{ color: "green" }}>✅ Correct!</p>}

      <div style={{ marginTop: "1rem" }}>
        <button
          onClick={() => {
            setTyped("");
            setCurrent(Math.max(current - 1, 0));
          }}
        >
          Prev
        </button>
        <button
          onClick={() => {
            setTyped("");
            setCurrent(Math.min(current + 1, sentences.length - 1));
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
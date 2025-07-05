import React from "react";
import "../styles/topic.css";

const StringTheory = () => {
  return (
    <div className="topic-page">
      <h2>String Theory</h2>
      <blockquote className="quote">
        “String theory is a framework where the point-like particles are replaced by strings.” — <strong>Brian Greene</strong>
      </blockquote>

      <div className="content-box">
        <h4>🔬 A Scientific Description:</h4>
        <p>
          String theory proposes that all particles are actually tiny vibrating strings. Different
          vibrations produce different particles — like different notes from a guitar string.
        </p>

        <h4>👶 A Beginner-Friendly Analogy:</h4>
        <p>
          Imagine every particle in nature is a string that plays a different note. The universe
          is like a grand cosmic orchestra!
        </p>

        <h4>🌐 Real-World Use Case:</h4>
        <p>
          String theory is still theoretical, but it's aimed at unifying all known forces in nature
          — gravity, electromagnetism, and more — into a "Theory of Everything."
        </p>

        <h4>🧠 A Fun Thought Experiment:</h4>
        <p>
          What if a tiny string you can’t even see is vibrating inside every atom of your body,
          deciding what you are made of?
        </p>

        <p className="external-link">
          📺 <a href="https://www.youtube.com/watch?v=Da-2h2B4faU" target="_blank" rel="noopener noreferrer">
            Watch a beginner-friendly String Theory explanation
          </a>
        </p>
        <p className="external-link">
          📘 <a href="https://en.wikipedia.org/wiki/String_theory" target="_blank" rel="noopener noreferrer">
            Learn more on Wikipedia
          </a>
        </p>
      </div>
    </div>
  );
};

export default StringTheory;

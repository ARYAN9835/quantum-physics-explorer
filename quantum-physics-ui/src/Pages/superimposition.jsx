import React from "react";
import "../styles/topic.css";

const Superimposition = () => {
  return (
    <div className="topic-page">
      <h2>Quantum Superposition</h2>
      <blockquote className="quote">
        “A particle can be in a combination of all possible states at once — until measured.”
      </blockquote>

      <div className="content-box">
        <h4>🔬 A Scientific Description:</h4>
        <p>
          Quantum superposition means a particle can exist in multiple states at once. Only when
          you observe or measure it does it choose one state.
        </p>

        <h4>👶 A Beginner-Friendly Analogy:</h4>
        <p>
          It’s like flipping a coin and covering it. Until you look, it’s both heads and tails
          at the same time!
        </p>

        <h4>🌐 Real-World Use Case:</h4>
        <p>
          Superposition powers quantum computers, enabling them to solve problems millions of times
          faster than classical computers.
        </p>

        <h4>🧠 A Fun Thought Experiment:</h4>
        <p>
          Imagine a superhero that can be in two places at once. But once someone spots them — they
          must choose just one spot to be in.
        </p>

        <p className="external-link">
          📺 <a href="https://www.youtube.com/watch?v=Q1YqgPAtzho" target="_blank" rel="noopener noreferrer">
            Watch superposition explained visually
          </a>
        </p>
        <p className="external-link">
          📘 <a href="https://en.wikipedia.org/wiki/Quantum_superposition" target="_blank" rel="noopener noreferrer">
            Learn more on Wikipedia
          </a>
        </p>
      </div>
    </div>
  );
};

export default Superimposition;

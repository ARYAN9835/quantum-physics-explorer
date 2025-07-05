import React from "react";
import "../styles/topic.css";

const Schrodinger = () => {
  return (
    <div className="topic-page">
      <h2>Schrödinger’s Equation</h2>
      <blockquote className="quote">
        “I don’t like it, and I’m sorry I ever had anything to do with it.” — <strong>Erwin Schrödinger</strong>
      </blockquote>

      <div className="content-box">
        <h4>🔬 A Scientific Description:</h4>
        <p>
          Schrödinger's Equation is the fundamental equation of quantum mechanics that describes
          how quantum states evolve over time. It's like Newton's laws — but for quantum particles.
        </p>

        <h4>👶 A Beginner-Friendly Analogy:</h4>
        <p>
          Think of it like a musical sheet that tells how a note (the particle's state) changes
          over time. It's a wave-equation for particles!
        </p>

        <h4>🌐 Real-World Use Case:</h4>
        <p>
          This equation is used in chemistry to predict the behavior of atoms and molecules —
          essential in drug discovery and materials science.
        </p>

        <h4>🧠 A Fun Thought Experiment:</h4>
        <p>
          Schrödinger’s Cat! A cat in a box is both alive and dead until observed — a playful
          thought to highlight quantum superpositions described by this equation.
        </p>

        <p className="external-link">
          📺 <a href="https://www.youtube.com/watch?v=3e6E1A9b1zA" target="_blank" rel="noopener noreferrer">
            Watch Schrödinger’s Equation explained...
          </a>
        </p>
        <p className="external-link">
          📘 <a href="https://en.wikipedia.org/wiki/Schr%C3%B6dinger_equation" target="_blank" rel="noopener noreferrer">
            Learn more on Wikipedia
          </a>
        </p>
      </div>
    </div>
  );
};

export default Schrodinger;
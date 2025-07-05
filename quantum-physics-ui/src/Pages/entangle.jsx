import React from "react";
import "../styles/topic.css";

const Entangle = () => {
  return (
    <div className="topic-page">
      <h2>Quantum Entanglement</h2>
      <blockquote className="quote">
        “Spooky action at a distance” — <strong>Albert Einstein</strong>
      </blockquote>

      <div className="content-box">
        <h4>🔬 A Scientific Description:</h4>
        <p>
          Quantum entanglement is a physical phenomenon where two particles become linked in such a way that the state of one instantly affects the state of the other — no matter how far apart they are.
          This is not just a theory; it has been proven in experiments and is one of the strangest features of quantum physics.
        </p>

        <h4>👶 A Beginner-Friendly Analogy:</h4>
        <p>
          Imagine you have a pair of magic dice. You roll one here on Earth and it shows a <strong>4</strong>. Instantly, the other one on Mars shows the same number, without anyone telling it what to do!
          It’s like they’re connected by an invisible secret code.
        </p>

        <h4>🌐 Real-World Use Case:</h4>
        <p>
          Quantum entanglement is the backbone of <strong>quantum cryptography</strong> — a futuristic way of securing data so that it's impossible to intercept. It’s also being explored in the development of <strong>quantum computers</strong> and even theories of teleportation!
        </p>

        <h4>🧠 A Fun Thought Experiment:</h4>
        <p>
          Imagine two friends who always wear the same clothes, even if they are on different planets. Neither friend decides what to wear until one opens their closet — the moment they do, the other friend's outfit is instantly decided too!
        </p>

        <p className="external-link">
          📺 <a
            href="https://www.youtube.com/watch?v=whIDqYMb5Yw"
            target="_blank"
            rel="noopener noreferrer"
          >
            Watch a video explaining quantum entanglement...
          </a>
        </p>

        <p className="external-link">
          📘 <a
            href="https://en.wikipedia.org/wiki/Quantum_entanglement"
            target="_blank"
            rel="noopener noreferrer"
          >
            Dive deeper on Wikipedia
          </a>
        </p>
      </div>
    </div>
  );
};

export default Entangle;

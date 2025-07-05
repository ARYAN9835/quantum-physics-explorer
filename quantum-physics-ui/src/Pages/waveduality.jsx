import React from "react";
import "../styles/topic.css";

const WaveParticleDuality = () => {
  return (
    <div className="topic-page">
      <h2>Wave–Particle Duality</h2>
      <blockquote className="quote">
        “It seems as though we must use sometimes the one theory and sometimes the other,
        while at times we may use either.” — <strong>Werner Heisenberg</strong>
      </blockquote>

      <div className="content-box">
        <h4>🔬 A Scientific Description:</h4>
        <p>
          Wave–particle duality means that quantum objects like electrons and photons exhibit
          both wave-like and particle-like properties depending on how you observe them. It’s a
          cornerstone of quantum mechanics.
        </p>

        <h4>👶 A Beginner-Friendly Analogy:</h4>
        <p>
          Imagine a cat that behaves like a wave when you’re not looking, but the moment you
          peek — it behaves like a marble! Weird, right?
        </p>

        <h4>🌐 Real-World Use Case:</h4>
        <p>
          This concept is used in <strong>electron microscopes</strong> where electrons (particles)
          behave like waves to give us extremely detailed images.
        </p>

        <h4>🧠 A Fun Thought Experiment:</h4>
        <p>
          Think of a flashlight beam — it appears smooth, but it’s actually made of many tiny
          packets (photons). They act like waves in flight and particles when hitting a wall.
        </p>

        <p className="external-link">
          📺 <a href="https://www.youtube.com/watch?v=Q1YqgPAtzho" target="_blank" rel="noopener noreferrer">
            Watch a video explaining wave–particle duality...
          </a>
        </p>
        <p className="external-link">
          📘 <a href="https://en.wikipedia.org/wiki/Wave%E2%80%93particle_duality" target="_blank" rel="noopener noreferrer">
            Learn more on Wikipedia
          </a>
        </p>
      </div>
    </div>
  );
};

export default WaveParticleDuality;
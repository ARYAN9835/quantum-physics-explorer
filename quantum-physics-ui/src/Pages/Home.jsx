import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/home.css';  // Import the home CSS

const Home = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");  // State for search term

  const topics = [
    {
      id: 1,
      title: "Wave-Particle Duality",
      path: "/waveduality",
      description: "Explores how particles like electrons exhibit both wave and particle properties.",
    },
    {
      id: 2,
      title: "Schrödinger's Equation",
      path: "/schrodinder",
      description: "A cornerstone of quantum mechanics that describes how quantum states evolve.",
    },
    {
      id: 3,
      title: "String Theory",
      path: "/string",
      description: "String theory attempts to explain all of the fundamental forces in the universe.",
    },
    {
      id: 4,
      title: "Quantum Entanglement",
      path: "/entangle",
      description: "A phenomenon where particles remain connected so that actions on one affect the other.",
    },
    {
      id: 5,
      title: "Quantum Superposition",
      path: "/superimposition",
      description: "The ability of quantum systems to be in multiple states at once.",
    },
  ];

  // Filter topics based on the search term
  const filteredTopics = topics.filter(topic =>
    topic.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Update search term on input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="home">
      <header className="hero">
        <h2>Welcome to Quantum Physics Explorer</h2>
        <p>Discover the mysteries of the quantum world.</p>
      </header>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search Topics..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      <section className="topics">
        <h3>Explore Topics</h3>
        <div className="topic-list">
          {filteredTopics.map((topic) => (
            <div
              key={topic.id}
              className="topic-card"
              onClick={() => navigate(topic.path)}
              style={{ cursor: "pointer" }}
            >
              <h4>{topic.title}</h4>
              <p>{topic.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;

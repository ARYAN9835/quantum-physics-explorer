import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./Pages/Home";
import Discussion from "./Pages/Discussion";
import WaveDuality from "./Pages/waveduality";
import Schrodinger from "./Pages/schrodinder";
import StringTheory from "./Pages/string";
import Entangle from "./Pages/entangle";
import SuperImposition from "./Pages/superimposition";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";

import "./App.css";

const App = () => {
  return ( 
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/discussion" element={<Discussion />} />
        <Route path="/waveduality" element={<WaveDuality />} />
        <Route path="/schrodinder" element={<Schrodinger />} />
        <Route path="/string" element={<StringTheory />} />
        <Route path="/entangle" element={<Entangle />} />
        <Route path="/superimposition" element={<SuperImposition />} />
      </Routes>

    </Router>
  );
};

export default App;

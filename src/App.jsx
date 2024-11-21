import React from "react";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Login from "./pages/LoginPage/Login";
import SignUp from "./pages/SignUpPage/SignUp";
import Music from "./components/Music/Music";
import Food from "./components/Food/Food";
import Sports from "./components/Sports/Sports";
import Job from "./components/Job/Job";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = (query) => {
    setSearchQuery(query);
  };
  // Create a wrapper to conditionally display the Navbar
  const Layout = ({ children }) => {
    const location = useLocation();
    const hideNavbar = location.pathname === "/" || location.pathname === "/signup";

    return (
      <>
        {!hideNavbar && <Navbar onSearch={handleSearch} />}
        {children}
      </>
    );
  };
  return (
    <>
      <Router>
        <Navbar onSearch={handleSearch} />
        <Routes>
          <Route path="/" element={<Login />} /> {/* Login Page */}
          <Route path="/signup" element={<SignUp />} /> {/* Signup Page */}
          <Route path="/music" element={<Music />} />
          <Route path="/job" element={<Job />} />
          <Route path="/sports" element={<Sports />} />
          <Route path="/food" element={<Food />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

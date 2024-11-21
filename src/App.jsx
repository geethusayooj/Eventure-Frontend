import React from "react";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Login from "./pages/LoginPage/Login";
import SignUp from "./pages/SignUpPage/SignUp";
import Music from "./components/Music/Music";
import Food from "./components/Food/Food";
import Sports from "./components/Sports/Sports";
import Job from "./components/Job/Job";
import EventListPage from "./pages/EventListPage/EventListPage";

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
        {/* <Navbar onSearch={handleSearch} /> */}
        <Routes>
        <Route
          path="/home"
          element={<Layout><EventListPage searchQuery={searchQuery} /></Layout>}
        />
          <Route path="/" element={<Login />} /> {/* Login Page */}
          <Route path="/signup" element={<SignUp />} /> {/* Signup Page */}
          <Route path="/music" element={<Layout><Music /></Layout>} />
          <Route path="/job" element={<Layout><Job /></Layout>} />
          <Route path="/sports" element={<Layout><Sports /></Layout>} />
          <Route path="/food" element={<Layout><Food /></Layout>} />
          
        </Routes>
      </Router>
    </>
  );
}

export default App;

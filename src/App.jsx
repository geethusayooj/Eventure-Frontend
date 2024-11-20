import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Login from "./pages/LoginPage/Login";
import SignUp from "./pages/SignUpPage/SignUp"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} /> {/* Login Page */}
        <Route path="/signup" element={<SignUp />} /> {/* Signup Page */}
        
      </Routes>
    </Router>
  );
}

export default App

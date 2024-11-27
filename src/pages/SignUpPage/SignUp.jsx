import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";
import coverpageimage from "../../assets/coverpageimage.jpg";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      // Send signup request to backend
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Signup successful! Redirecting to login...");
        navigate("/"); // Navigate to login page
      } else {
        alert(data.message || "Signup failed");
      }
    } catch (error) {
      console.error("Signup Error:", error);
      alert("An error occurred during signup.");
    }
  };

  return (
    <div className="signupcontainer">
      <div className="loginLeft">
        <div className="cover-image-container">
          <img className="coverImage" src={coverpageimage} />
          <div className="cover-text">
            <h1>Welcome to Eventure!</h1>
            <p>
              {" "}
              <em>
                Discover and book your favorite events with ease and and enjoy
                life’s best moments.
              </em>
            </p>
          </div>
        </div>
      </div>
      <form className="signupform" onSubmit={handleSignup}>
        <h1>Signup</h1>
        <input
          className="inputsignup"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <br />
        <input
          className="inputsignup"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />{" "}
        <br />
        <input
          className="inputsignup"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <button className="signupbutton" type="submit">
          Signup
        </button>
        <p>
          Already have an account? <a href="/">Login</a>
        </p>
      </form>
    </div>
  );
};

export default Signup;

import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import EventListPage from "../EventListPage/EventListPage";
import "./Login.css";
import coverpageimage from "../../assets/coverpageimage.jpg";
import { API_URL } from "../../config/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { authenticateUser } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("authToken", data.authToken); // Store token
        authenticateUser();
        setEmail("");
        setPassword("");
        navigate("/home");
      } else {
        alert(data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("An error occurred during login.");
    } finally {
      setEmail("");
      setPassword("");
    }
  };

  return (
    <>
      <div className="loginContainer">
        <div className="loginLeft">
          <div className="cover-image-container">
            <img className="coverImage" src={coverpageimage} />
            <div className="cover-text">
              <h1>Welcome to Eventure!</h1>
              <p>
                {" "}
                <em>
                  Discover and book your favorite events with ease and and enjoy
                  best moments.
                </em>
              </p>
            </div>
          </div>
        </div>
        <div className="loginRight">
          <div className="loginform">
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
              <input
                className="inputlogin"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <br />
              <input
                className="inputlogin"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <br />
              <button className="loginbutton" type="submit">
                Login
              </button>
            </form>
            <p>
              Don't have an account? <a href="/signup">Signup</a>
            </p>
          </div>
        </div>
      </div>
      <div className="eventListContainer">
        <EventListPage />
      </div>
    </>
  );
};

export default Login;

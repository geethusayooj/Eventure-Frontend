import { Link, useNavigate, useLocation } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import EventsByCategory from "../EventsByCategory/EventsByCategory";
import { AuthContext } from "../../context/AuthContext";

function Navbar({ onSearch }) {
  const [selectedTab, setSelectedTab] = useState("home");
  const [searchInput, setSearchInput] = useState("");
  const { isAuthenticated, logout } = useContext(AuthContext) || {};

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setSelectedTab(location.pathname);
  }, [location.pathname]);

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(searchInput);
  };

  // handleLogout function:
  const handleLogout = () => {
    logout(); // Clears token, user, and isAuthenticated from context
    navigate("/"); // Redirect to login page
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <nav className="Navbar">
      <Tabs
        defaultValue={"home"}
        value={selectedTab}
        onChange={(e, v) => {
          navigate(v);
        }}
        sx={{ height: "100%" }}
        classes={{ indicator: "indicator" }}
      >
        <Tab classes={{ root: "tab" }} value={"/home"} label="Home" />
         
        <Tab classes={{ root: "tab" }} value={"/music"} label="Music" />
         
        <Tab classes={{ root: "tab" }} value={"/job"} label="Job" />
        
        <Tab classes={{ root: "tab" }} value={"/sports"} label="Sports" />
        
        <Tab classes={{ root: "tab" }} value={"/food"} label="Food" />
        
        <Tab classes={{ root: "tab" }} value={"/events/create"} label="CREATE" />
        
        <Tab
          classes={{ root: "tab" }}
          label="Logout"
          value={"/"}
          onClick={handleLogout} />
        
        <form onSubmit={handleSearchSubmit} className="search-form">
          <input
            type="text"
            placeholder="Search products..."
            onChange={(e) => onSearch(e.target.value)} 
            className="search-input"
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </form>
      </Tabs>
    </nav>
  );
}

export default Navbar;

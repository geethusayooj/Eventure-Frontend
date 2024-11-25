import { Link, useNavigate, useLocation } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import EventsByCategory from "../EventsByCategory/EventsByCategory";
import { AuthContext } from "../../context/AuthContext";
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import HomeIcon from '@mui/icons-material/Home';
import WorkIcon from '@mui/icons-material/Work';
import SportsGymnasticsIcon from '@mui/icons-material/SportsGymnastics';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import CreateIcon from '@mui/icons-material/Create';
import LogoutIcon from '@mui/icons-material/Logout';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

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
        <Tab icon={<HomeIcon />} disableFocusRipple disableRipple classes={{ root: "tab" }} value={"/home"} label="Home" />
         
        <Tab icon={<MusicNoteIcon />} disableFocusRipple disableRipple classes={{ root: "tab" }} value={"/music"} label="Music" />
         
        <Tab icon={<WorkIcon />} disableFocusRipple disableRipple classes={{ root: "tab" }} value={"/job"} label="Job" />
        
        <Tab icon={<SportsGymnasticsIcon />} disableFocusRipple disableRipple classes={{ root: "tab" }} value={"/sports"} label="Sports" />
        
        <Tab icon={<FastfoodIcon />} disableFocusRipple disableRipple classes={{ root: "tab" }} value={"/food"} label="Food" />

        
        
        
        
        <form onSubmit={handleSearchSubmit} className="search-form">
        <input
          type="text"
          placeholder="Search event here..."
          value={searchInput}
          onChange={handleInputChange}
          className="search-input"
        />
        <button type="submit" className="search-button">Search</button>
      </form>
      <Tab icon={<BeenhereIcon />} disableFocusRipple disableRipple classes={{ root: "tab" }} value={"/events/bookings"} label="Bookings" />
      <Tab icon={<FavoriteBorderIcon />} disableFocusRipple disableRipple classes={{ root: "tab" }} value={"/favourites"} label="favourites" />
      <Tab className= "logout" icon={<LogoutIcon />}
          classes={{ root: "tab" }}
          label="Logout"
          value={"/"}
          onClick={handleLogout} />
        
      </Tabs>
    </nav>
  );
}

export default Navbar;

import React, { useEffect, useLayoutEffect, useState } from "react";
import "./Header.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import Logo from "./Site_Icon.png";
import NavModal from "./navModal/navModal";
import LoginDropDown from "./DropDown/LoginDropDown";
import { useAuth } from "../../Context/AuthProvider";

export default function Header() {
  const [windowWidth, setWindowWidth] = useState(0);
  const auth = useAuth();
  const navigate = useNavigate();
  const [dropdown, setDropdown] = useState(false);
  const [credits, setCredits] = useState(0);
  const location = useLocation();

  useLayoutEffect(() => {
    function updateSize() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const showModal = () => {
    document.querySelector(".nav-modal").classList.remove("out");
    document.querySelector(".nav-modal").classList.add("active");
  };

  const handleClick = () => {
    if (dropdown) {
      setDropdown(false);
    } else if (auth.getCurrentUser()) {
      setCredits(auth.getCurrentUser().credits);
      setDropdown(true);
    } else {
      navigate("/logIn");
    }
  };

  useEffect(() => {
    setDropdown(false);
    window.scrollTo(0, 0);
  }, [location]);

  return windowWidth > 769 ? (
    <Box component="nav" className="nav">
      <ul className="nav-list">
        <Link to="/home">Home</Link>
        <Link to="/about">Mission</Link>
        <Link to="/discover">Discover</Link>
        <Link to="/home">
          <img src={Logo} alt="site_logo" className="site_icon" />
        </Link>
        <Link to="/faq">FAQ</Link>
        <Link to="/upload-coupon">Sell your coupon</Link>
        <Button variant="span" onClick={handleClick} sx={{  
        background: 'none!important',
        border: 'none',
        padding: '0!important'}}>
          <span className="material-icons">person</span>
          {dropdown ? <span className="material-icons">expand_less</span>:<span className="material-icons">expand_more</span>}
        </Button>
      </ul>
      {dropdown ? (
        <LoginDropDown credits={credits} setDropdown={setDropdown} />
      ) : null}
    </Box>
  ) : (
    <Box component="nav" className="nav">
      <span
        className="nav-icons material-icons md-48 white hamburger"
        onClick={showModal}
      >
        menu
      </span>
      <Link to="/">
        <img src={Logo} alt="site_logo" className="site_icon" />
      </Link>
      <Typography variant="span" onClick={handleClick}>
        <span className="nav-icons material-icons md-36 white">person</span>
        {dropdown ? <span className="nav-icons material-icons md-36 white">expand_less</span>:<span className="nav-icons material-icons md-36 white">expand_more</span>}
        {dropdown ? (
          <LoginDropDown credits={credits} setDropdown={setDropdown} />
        ) : null}
      </Typography>
      <NavModal />
    </Box>
  );
}

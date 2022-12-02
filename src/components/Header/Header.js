import React, { useEffect, useLayoutEffect, useState } from "react";
import "./Header.css";
import Logo from "./Site_Icon.png"
import NavModal from './navModal/navModal'
import LoginDropDown from "./DropDown/LoginDropDown.js";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../../Context/AuthProvider';
import { Box, Typography } from "@mui/material";
import axios from "../../common/axiosInstance";

export default function Header(props) {
  
  let [windowWidth, setWindowWidth] = useState(0);
  let auth = useAuth();
  let navigate = useNavigate();
  const [dropdown, setDropdown] = useState(false);
  const [credits, setCredits] = useState(0);

  useLayoutEffect(() => {
    function updateSize() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  let showModal = (e) => {
    document.querySelector('.nav-modal').classList.remove('out');
    document.querySelector('.nav-modal').classList.add('active');
  }
  
  const handleClick = () => {
    if(dropdown) {
      setDropdown(false);
    } else {
      if(auth.getCurrentUser()) {
        setCredits(auth.getCurrentUser().credits);
        setDropdown(true);
      } else {
        navigate('/logIn')
      }
    }
  }


  return (
    <>
    {windowWidth>769? 
    <Box component='nav'  className="nav">
        <ul className="nav-list">
          <Link to="/home">Home</Link>
          <Link to="/about">Mission</Link>
          <Link to="/discover">Discover</Link>
          <Link to='/home'><img src={Logo} alt="site_logo" className='site_icon'></img></Link>
          <Link to="/faq">FAQ</Link>
          <Link to="/upload-coupon">Sell your coupon</Link>
          <Typography variant='span' onClick={handleClick}>
            <span className="material-icons">person</span>
            <span class="material-icons">expand_more</span>
          </Typography>
        </ul>
        {dropdown?<LoginDropDown credits={credits}/>:null}
      </Box>  :  <Box component='nav' className="nav">
      <span className="nav-icons material-icons md-48 white hamburger" onClick={showModal}>menu</span>
      <Link to='/'><img src={Logo} alt="site_logo" className='site_icon'></img></Link>
      <Typography variant='span' onClick={handleClick}>
            <span className="nav-icons material-icons md-36 white">person</span>
            <span class="nav-icons material-icons md-36 white">expand_more</span>
            {dropdown?<LoginDropDown credits={credits}/>:null}
      </Typography>
      <NavModal/>
      </Box>}
    </>
  );
}

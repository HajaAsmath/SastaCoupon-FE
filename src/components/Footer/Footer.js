import React from "react";
import "./Footer.css";
import Logo from "./Site_Icon.png";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Link } from "react-router-dom";

export default function Footer(props) {
  return (
    <div className="footer">
      <div className="footer-content">
        <Link to='/'><img src={Logo} alt="site_logo" className='site_icon'></img></Link>
        <span className="first-content-span">Your coupon, Your Choice</span>
        <span className="first-content-span">© 2022 | SastaCoupon.com, LLC</span>
      </div>
      <div className="footer-content">
        <span>ABOUT</span>
        <Link to="/about">About Us</Link>
        <Link to="/press">Press / Media</Link>
        <Link to="/reviews">Customer Review</Link>
        <Link to="/careers">Careers</Link>
      </div>
      <div className="footer-content">
        <span>LEGAL</span>
        <Link to="/termsofuse">Terms of Use</Link>
        <Link to="/privacypolicy">Privacy Policy</Link>
        <Link to="/cookie">Cookie Policy</Link>
        <Link to="/accessability">Accessability</Link>
      </div>
      <div className="footer-content">
        <span>SUPPORT</span>
        <Link to="/transactionhistory">Transaction History</Link>
        <Link to="/howitworks">How it works</Link>
        <Link to="/help">Help Centre</Link>
      </div>
      <div className="footer-content">
        <span>CONTACT</span>
        <Link to='/contact_us'>Contact Us</Link>
        <span className="social-icons">
          <FacebookIcon/>
          <InstagramIcon/>
          <TwitterIcon/>
        </span>
      </div>
    </div>
  );
}

import React from "react";
import "./Footer.css";
import Logo from "./Site_Icon.png";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';

export default function Footer(props) {
  return (
    <div className="footer">
      <div className="footer-content">
        <a href='/'><img src={Logo} alt="site_logo" className='site_icon'></img></a>
        <span className="first-content-span">Your coupon, Your Choice</span>
        <span className="first-content-span">© 2022 | SastaCoupon.com, LLC</span>
      </div>
      <div className="footer-content">
        <span>ABOUT</span>
        <a href="/">About Us</a>
        <a href="/">Press / Media</a>
        <a href="/">Customer Review</a>
        <a href="/">Careers</a>
      </div>
      <div className="footer-content">
        <span>LEGAL</span>
        <a href="/">Terms of Use</a>
        <a href="/">Privacy Policy</a>
        <a href="/">Cookie Policy</a>
        <a href="/">Accessability</a>
      </div>
      <div className="footer-content">
        <span>SUPPORT</span>
        <a href="/">Transaction History</a>
        <a href="/">How it works</a>
        <a href="/">Help Centre</a>
      </div>
      <div className="footer-content">
        <span>CONTACT</span>
        <a href='/'>Contact Us</a>
        <span className="social-icons">
          <FacebookIcon/>
          <InstagramIcon/>
          <TwitterIcon/>
        </span>
      </div>
    </div>
  );
}

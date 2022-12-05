import React from "react";
import "./About.css";
import Logo from "./Logo.png";

function About() {
  return (
    <div>
      <div className="content">
        <div className="content1">
          <div className="headings">About Us</div>
          <div className="data">
            Sasta Coupon.com™, the highest-ranking and most-trafficked gift card
            website on the Internet, is your one-stop shop for gift cards
            online.
          </div>
          <div className="headings">Vision</div>
          <div className="data">
            To expand the potential of prepaid possibilities by being leaders in
            the Coupon Code space.
          </div>
          <div className="headings">Mission</div>
          <div className="data">
            To be innovators in the prepaid and financial payments space.
          </div>
          <div className="headings">History</div>
          <div className="data">
            SastaCoupon.com was originally called directcertificates.com and was
            started in 1999 as a gift certificate website, selling over 150
            merchant gift certificates. In 2003 we decided to change direction
            and sell only Visa gift cards instead of merchant gift certificates.
            We were able to successfully buy the domain name www.giftcards.com
            and we began the process of converting the website to sell only Visa
            gift cards. We found a sponsor bank, a processing partner, a
            fulfillment center, and we were off selling Visa gift cards.
            Business started out pretty good, because back then (in 2003 and
            2004), Visa gift cards were not available in retail stores—only
            online—and we owned a great domain name for gift cards. We were one
            of five divisions of our parent company, and we employed only a
            handful of people.
          </div>
        </div>
        <div className="content2">
          <div className="content21">
            <img className="image" alt="logo" id="logo" src={Logo} />
          </div>
          <div className="content21">
            <h5 className="content22">Contact US </h5>
            <h5 className="content22">SastaCoupon.com</h5>
            <h5 className="content22">Blackhawk Network</h5>
            <h5 className="content22">6220 Stoneridge Mall Road</h5>
            <h5 className="content22">Pleasanton, CA 94588</h5>
            <h5 className="content22">Email Us</h5>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;

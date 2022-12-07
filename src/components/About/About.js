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
            Sasta Coupon is a platform where you can sell or donatea coupon to
            whomever in need. This prevent the couponcode from getting unused
            and it helps other who are in need of the discounts.
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
            SastaCoupon.com was originallly been done manually as agents who used to collect
            coupons of various brands and would sell or donate for better cause.
            This led to start of Sasta Coupon Website by few agents in year 2022 and is
            set to achieve to be one of the biggest platforms for selling and buying coupons.

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

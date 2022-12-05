import React from "react";
import { useLocation } from "react-router-dom";
import check1 from "./check.png";
import "./pay_succ.css";

function PaySucc() {
  const location = useLocation();
  return (
    <div className="success1">
      <div className="success11">
        {" "}
        Order Number : {location.state.order_id} is placed successfully
      </div>
      <img
        src={check1}
        alt="payment-success"
        className="success12"
        height="150"
        width="200"
      />
      <div className="success11">
        {" "}
        Enjoy your Coupon ID : {location.state.coupon_code}
      </div>
    </div>
  );
}

export default PaySucc;

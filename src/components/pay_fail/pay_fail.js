import React from "react";
import { useLocation } from "react-router-dom";
import check1 from "./fail.png";
import "./pay_fail.css";

function PayFail() {
  const location = useLocation();
  return (
    <div className="success1">
      <div className="success11">
        {" "}
        Transaction Failed for Order Number :{location.state.order_id}
      </div>
      <img
        src={check1}
        alt="payment-failed"
        className="success12"
        height="150"
        width="200"
      />
    </div>
  );
}

export default PayFail;

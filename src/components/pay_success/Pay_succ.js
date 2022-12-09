import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import check1 from "./check.png";
import "./pay_succ.css";

function PaySucc() {
  const location = useLocation();
  const [copy, setCopy] = useState(false);

  function copyTextToClipboard(text) {
    if('clipboard' in navigator) {
      return navigator.clipboard.writeText(text);
    } 
      return document.execCommand('copy', true, text);
  }

  const handleClick = (event) => {
    const link = event.currentTarget.previousSibling;
    copyTextToClipboard(link.innerText).then(() => {
      setCopy(true);
      setTimeout(() => {
        setCopy(false);
      }, 1000);
    });
  }
  return (
    <Box className="success1">
      <div className="success11">
        Order placed successfully
        <Typography>Order id: {location.state.order_id}</Typography>
      </div>
      <img
        src={check1}
        alt="payment-success"
        className="success12"
        height="170"
        width="200"
      />
      <div className="success11">
        Enjoy your Coupon
        <Typography sx={{cursor: 'pointer'}} variant='h5' className="couponCode" onClick={handleClick}>
          {location.state.coupon_code}
        </Typography> 
        {copy?<AssignmentTurnedInOutlinedIcon sx={{verticalAlign: "text-top"}}/>
        :<AssignmentOutlinedIcon sx={{verticalAlign: "text-top"}} onClick={handleClick}/>}
      </div>
    </Box>
  );
}

export default PaySucc;

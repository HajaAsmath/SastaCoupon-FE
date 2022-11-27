import React from 'react';
import { useLocation } from 'react-router-dom';
import { Box } from "@mui/material";
import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone';
import Avatar from '@mui/material/Avatar';
import check1 from './check.png';
import "./pay_succ.css";
function Pay_succ() {
  
  const location = useLocation();
  console.log(location);
  return ( 
    <div className='success1'>
        <div className='success11'> Order Number : { location.state.order_id} is placed successfully</div>
        <img src={check1} className='success12' height="150" width="200" ></img>
        <div className='success11'> Enjoy your Coupon ID : { location.state.coupon_code}</div>
    </div>
  )
}

export default Pay_succ


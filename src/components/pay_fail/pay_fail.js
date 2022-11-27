import React from 'react';
import { useLocation } from 'react-router-dom';
import { Box } from "@mui/material";
import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone';
import Avatar from '@mui/material/Avatar';
import check1 from './fail.png';
import "./pay_fail.css";
function Pay_fail() {
  
  const location = useLocation();
  console.log(location);
  return ( 
    <div className='success1'>
        <div className='success11'> Transaction Failed for Order Number :{location.state.order_id}</div>
        <img src={check1} className='success12' height="150" width="200" ></img>
    </div>
  )
}

export default Pay_fail


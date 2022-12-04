/* eslint-disable react/prop-types */
import {
    Slide
  } from '@mui/material';
  import { forwardRef } from 'react';
  import { useNavigate } from 'react-router-dom';
  import CommonDialog from './CommonDialog';
  
  const Transition = forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);
  
  export default function ContactUsDialog({
    open, setOpen, message,
  }) {
    const navigate = useNavigate();
  
    const handleClose = () => {
        setOpen(false);
        navigate('/contact_us');
    };
  
    return (
      <CommonDialog Transition={Transition} open={open} message={message} handleClose={handleClose}/>
    );
  }
  
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from "@mui/material";
import { forwardRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

export default function UploadStatusDialog({open, setOpen, message, isUploadFailed}) {

    const navigate = useNavigate();
  
    const handleClose = () => {
      setOpen(false);
      if(!isUploadFailed) {
        navigate('/')
      }
    };

    return <div>
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Ok</Button>
      </DialogActions>
    </Dialog>
  </div>
}
import { Slide } from "@mui/material";
import { forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import CommonDialog from "./CommonDialog";

const Transition = forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));

export default function UploadStatusDialog({
  open,
  setOpen,
  message,
  isUploadFailed,
}) {
  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
    if (!isUploadFailed) {
      navigate("/");
    }
  };

  return (
    <CommonDialog
      Transition={Transition}
      open={open}
      message={message}
      handleClose={handleClose}
    />
  );
}

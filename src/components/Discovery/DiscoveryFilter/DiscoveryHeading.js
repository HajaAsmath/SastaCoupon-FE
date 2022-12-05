import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Collapse } from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import React from "react";

export default function DiscoveryHeading({ children, heading }) {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItemButton onClick={handleClick}>
        <ListItemText sx={{ fontWeight: "500" }} primary={heading} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {children}
      </Collapse>
    </>
  );
}

import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth } from "../../../Context/AuthProvider";
import "./LoginDropDown.css";

export default function LogInDropDown({ credits, setDropdown }) {
  const auth = useAuth();

  const handleLogout = () => {
    auth.logOut();
  };

  const handleClick = () => {
    setDropdown(false);
  };
  return (
    <Box className="account-dropdown">
      <Typography variant="span">
        Available Credits: {credits || 0} Credits
      </Typography>
      <Link onClick={handleClick} to="/profile">
        Account Overview
      </Link>
      <Link to="/" onClick={handleLogout}>
        Logout
      </Link>
    </Box>
  );
}

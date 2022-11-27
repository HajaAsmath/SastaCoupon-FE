import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth } from "../../../Context/AuthProvider";
import './LoginDropDown.css'

export default function LogInDropDown() {

    const auth = useAuth();

    const handleLogout = () => {
        auth.logOut();
    }
    return <Box className='account-dropdown'>
        <Link to='/profile'>Account Overview</Link>
        <Link to='/' onClick={handleLogout}>Logout</Link>
    </Box>
}
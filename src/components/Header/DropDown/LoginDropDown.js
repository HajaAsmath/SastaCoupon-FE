import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth } from "../../../Context/AuthProvider";
import './LoginDropDown.css'

export default function LogInDropDown({credits}) {

    const auth = useAuth();

    const handleLogout = () => {
        auth.logOut();
    }
    return <Box className='account-dropdown'>
        <Typography variant='span'>Available Credits: {credits} Credits</Typography>
        <Link to='/profile'>Account Overview</Link>
        <Link to='/' onClick={handleLogout}>Logout</Link>
    </Box>
}
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import NotFoundImage from './error_vector.png';

export default function NotFoundPage() {
    return <Box sx={{maxWidth: '90%', margin: '0 auto', fontFamily: 'patuaOne'}}>
        <img width='100%' src={NotFoundImage} alt='Page_Not_Found'></img>
        <h1>Uh-oh, page not found</h1>
        <Button variant="outlined" className="primary-button">View More</Button>
    </Box>

}
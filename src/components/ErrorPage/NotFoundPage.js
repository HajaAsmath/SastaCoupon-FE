import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import NotFoundImage from "./error_vector.png";

export default function NotFoundPage() {
  return (
    <Box sx={{ maxWidth: "90%", margin: "0 auto", fontFamily: "patuaOne" }}>
      <img width="100%" src={NotFoundImage} alt="Page_Not_Found" />
      <h1>Uh-oh, page not found</h1>
      <Link to="/">
        <Button variant="outlined" className="primary-button">
          Go to homepage
        </Button>
      </Link>
    </Box>
  );
}

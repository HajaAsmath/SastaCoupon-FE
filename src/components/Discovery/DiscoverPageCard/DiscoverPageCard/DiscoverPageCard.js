import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import "./DiscoverPageCard.css";
import { Link } from "react-router-dom";

export default function DiscoverPageCard(props) {
  const { couponId, couponName, couponImage, couponPrice } = props;

  return (
    <Link
      state={{
        couponId,
        couponName,
        couponImage,
        couponPrice,
      }}
      to="/prod-det"
    >
      <Card
        className="discovery-card"
        sx={{
          minWidth: 209,
          maxHeight: 256,
          borderRadius: 2,
          backgroundColor: "#F7FAFC",
          boxShadow: "0px 1px 6px rgba(0, 0, 0, 0.35)",
          margin: "10px",
        }}
      >
        <CardMedia
          sx={{ height: 126, width: "inherit", margin: "0 auto" }}
          component="img"
          image={couponImage}
          alt="green iguana"
        />
        <Box className="card-content">
          <CardContent sx={{ textAlign: "left", padding: "5px 16px" }}>
            <span>{couponName}</span>
            <p>{couponPrice} Credits</p>
          </CardContent>
        </Box>
      </Card>
    </Link>
  );
}

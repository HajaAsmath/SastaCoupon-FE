import "./LandingPageStyle.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import LandingPageCard from "./LandingPageCard/LandingPageCard";
import bannerImage from "./banner_image.png";
import axios from "../../common/axiosInstance";
import LandingPageCardSkeleton from "./LandingPageSkeleton";

export default function LandingPage() {
  const [coupons, setCoupons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const couponSkeletonArray = [1, 2, 3, 4, 5, 6, 7, 8];

  useEffect(() => {
    const fetchCoupons = async () => {
      await axios.get("/recent-coupon").then((res) => {
        if (res.status === 200) {
          setCoupons(JSON.parse(res.data));
          setIsLoading(false);
        }
      });
    };

    fetchCoupons();
  }, []);

  return (
    <>
      <Box className="banner-container">
        <Box className="banner-text">
          <p>Your Coupon, Your Choice</p>
          <Typography sx={{fontFamily: 'Poppins', 
          fontSize: '22px'}}>Buy coupon codes from multiple brands</Typography>
          <Link to="/discover">
            <Button size="medium" className="primary-button">
              Buy Now
            </Button>
          </Link>
        </Box>
        <Box className="banner-image">
          <img src={bannerImage} alt="banner" />
        </Box>
      </Box>
      <Box className="featured-coupons-container">
        <p>Coupon codes you’ll love</p>
        <Box className="feature-coupons-parent">
          <Box className="featured-coupons">
            {isLoading
              ? couponSkeletonArray.map((item) => (
                  <LandingPageCardSkeleton>
                    <LandingPageCard key={item} />
                  </LandingPageCardSkeleton>
                ))
              : coupons.map((coupon) => (
                  <LandingPageCard
                    couponId={coupon.ID}
                    couponName={coupon.NAME}
                    couponImage={coupon.URL}
                    couponPrice={coupon.PRICE}
                  />
                ))}
          </Box>
        </Box>
        <Link to="/discover">
          <Button variant="outlined" className="primary-button">
            View More
          </Button>
        </Link>
        <Box className="vector-box">
          <Link to="/upload-coupon">
            <Button
              size="large"
              variant="outlined"
              className="primary-button sell"
            >
              Sell your coupon
            </Button>
          </Link>
        </Box>
      </Box>
    </>
  );
}

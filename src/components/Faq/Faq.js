import { Box, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useEffect } from "react";
import "./Faq.css";

export default function Faq() {
  useEffect(() => {
    const heading = document.querySelectorAll(".heading");
    const handleClick = (e) => {
      if (e.currentTarget.childNodes[0].classList.contains("active")) {
        e.currentTarget.childNodes[0].classList.remove("active");
      } else {
        e.currentTarget.childNodes[0].classList.add("active");
      }
      if (e.currentTarget.childNodes[1].classList.contains("active")) {
        e.currentTarget.childNodes[1].classList.remove("active");
      } else {
        e.currentTarget.childNodes[1].classList.add("active");
      }
      if (e.currentTarget.nextElementSibling.classList.contains("active")) {
        e.currentTarget.nextElementSibling.classList.remove("active");
      } else {
        e.currentTarget.nextElementSibling.classList.add("active");
      }
    };
    heading.forEach((ele) => {
      ele.addEventListener("click", handleClick);
    });

    return () => {
      const faqHeading = document.querySelectorAll(".heading");
      faqHeading.forEach((e) => {
        e.removeEventListener("click", handleClick);
      });
    };
  });

  return (
    <Box sx={{ height: 700 }}>
      <Typography
        sx={{
          color: "#3C286D",
          fontSize: 48,
          fontWeight: "bolder",
          fontFamily: "patuaOne",
          lineHeight: "138.6%",
          textAlign: "left",
          marginLeft: '5%',
          marginBottom: 3,
        }}
      >
        FAQ
      </Typography>
      <Typography
        sx={{
          color: "#3C286D",
          fontSize: 28,
          fontWeight: "bolder",
          fontFamily: "patuaOne",
          lineHeight: "138.6%",
          textAlign: "left",
          marginLeft: '5%',
          marginBottom: 3,
        }}
      >
        Top Questions
      </Typography>
      <Box sx={{ maxWidth: "90%" }}>
        <Box
          sx={{
            marginLeft: '5%',
            marginBottom: 3,
            maxWidth: 912,
            textAlign: "left",
            fontFamily: "Poppins",
          }}
        >
          <Typography
            className="heading"
            sx={{
              cursor: "pointer",
              borderRadius: "6px",
              padding: "16px 0px",
              boxShadow: "0px 1px 6px 2px rgba(0, 0, 0, 0.1)",
            }}
          >
            <ExpandMoreIcon sx={{ verticalAlign: "middle", display: "none" }} />
            <ExpandLessIcon
              className="active"
              sx={{ verticalAlign: "middle", display: "none" }}
            />
            Can I sell set any amout of price i want for my coupon?
          </Typography>
          <Typography
            sx={{
              display: "none",
              padding: "16px 15px",
              borderRadius: "6px",
              boxShadow: "0px 2px 5px -1px rgba(0, 0, 0, 0.25)",
            }}
          >
            Yes you can. But it is advised to set a resonable price inorder to
            make your coupon sell.
          </Typography>
        </Box>
        <Box
          sx={{
            marginLeft: '5%',
            marginBottom: 3,
            maxWidth: 912,
            textAlign: "left",
            fontFamily: "Poppins",
          }}
        >
          <Typography
            className="heading"
            sx={{
              cursor: "pointer",
              borderRadius: "6px",
              padding: "16px 0px",
              boxShadow: "0px 1px 6px 2px rgba(0, 0, 0, 0.1)",
            }}
          >
            <ExpandMoreIcon sx={{ verticalAlign: "middle", display: "none" }} />
            <ExpandLessIcon
              className="active"
              sx={{ verticalAlign: "middle", display: "none" }}
            />
            How to redeem my credits from my account?
          </Typography>
          <Typography
            sx={{
              display: "none",
              padding: "16px 15px",
              borderRadius: "6px",
              boxShadow: "0px 2px 5px -1px rgba(0, 0, 0, 0.25)",
            }}
          >
            You can buy coupons with the credits.
          </Typography>
        </Box>
        <Box
          sx={{
            marginLeft: '5%',
            marginBottom: 3,
            maxWidth: 912,
            textAlign: "left",
            fontFamily: "Poppins",
          }}
        >
          <Typography
            className="heading"
            sx={{
              cursor: "pointer",
              borderRadius: "6px",
              padding: "16px 0px",
              boxShadow: "0px 1px 6px 2px rgba(0, 0, 0, 0.1)",
            }}
          >
            <ExpandMoreIcon sx={{ verticalAlign: "middle", display: "none" }} />
            <ExpandLessIcon
              className="active"
              sx={{ verticalAlign: "middle", display: "none" }}
            />
            How to sell my coupons?
          </Typography>
          <Typography
            sx={{
              display: "none",
              padding: "16px 15px",
              borderRadius: "6px",
              boxShadow: "0px 2px 5px -1px rgba(0, 0, 0, 0.25)",
            }}
          >
            You can upload your coupons by creating an account.
          </Typography>
        </Box>
        <Box
          sx={{
            marginLeft: '5%',
            marginBottom: 3,
            maxWidth: 912,
            textAlign: "left",
            fontFamily: "Poppins",
          }}
        >
          <Typography
            className="heading"
            sx={{
              cursor: "pointer",
              borderRadius: "6px",
              padding: "16px 0px",
              boxShadow: "0px 1px 6px 2px rgba(0, 0, 0, 0.1)",
            }}
          >
            <ExpandMoreIcon sx={{ verticalAlign: "middle", display: "none" }} />
            <ExpandLessIcon
              className="active"
              sx={{ verticalAlign: "middle", display: "none" }}
            />
            When will I get the coupon code of the coupons which I purchased?
          </Typography>
          <Typography
            sx={{
              display: "none",
              padding: "16px 15px",
              borderRadius: "6px",
              boxShadow: "0px 2px 5px -1px rgba(0, 0, 0, 0.25)",
            }}
          >
            You coupon code will be displayed to you once you complete the
            purchase.
          </Typography>
        </Box>
        <Box
          sx={{
            marginLeft: '5%',
            marginBottom: 3,
            maxWidth: 912,
            textAlign: "left",
            fontFamily: "Poppins",
          }}
        >
          <Typography
            className="heading"
            sx={{
              cursor: "pointer",
              borderRadius: "6px",
              padding: "16px 0px",
              boxShadow: "0px 1px 6px 2px rgba(0, 0, 0, 0.1)",
            }}
          >
            <ExpandMoreIcon sx={{ verticalAlign: "middle", display: "none" }} />
            <ExpandLessIcon
              className="active"
              sx={{ verticalAlign: "middle", display: "none" }}
            />
            Whom to contact for my payment related queries?
          </Typography>
          <Typography
            sx={{
              display: "none",
              padding: "16px 15px",
              borderRadius: "6px",
              boxShadow: "0px 2px 5px -1px rgba(0, 0, 0, 0.25)",
            }}
          >
            You can use our contact us from to submit your queries.
          </Typography>
        </Box>
        <Box
          sx={{
            marginLeft: '5%',
            marginBottom: 3,
            maxWidth: 912,
            textAlign: "left",
            fontFamily: "Poppins",
          }}
        >
          <Typography
            className="heading"
            sx={{
              cursor: "pointer",
              borderRadius: "6px",
              padding: "16px 0px",
              boxShadow: "0px 1px 6px 2px rgba(0, 0, 0, 0.1)",
            }}
          >
            <ExpandMoreIcon sx={{ verticalAlign: "middle", display: "none" }} />
            <ExpandLessIcon
              className="active"
              sx={{ verticalAlign: "middle", display: "none" }}
            />
            How to see the expiry date of the coupons?
          </Typography>
          <Typography
            sx={{
              display: "none",
              padding: "16px 15px",
              borderRadius: "6px",
              boxShadow: "0px 2px 5px -1px rgba(0, 0, 0, 0.25)",
            }}
          >
            The expiry date will be visible on the product details page.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

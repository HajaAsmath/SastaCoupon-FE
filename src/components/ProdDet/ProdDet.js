/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from "react";
import "./ProdDet.css";
import { Box, Dialog, DialogContent, DialogContentText } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../Context/AuthProvider";
import {
  BACKEND_BASE_URL,
  SESSION_STORAGE_KEY,
} from "../../constants/Constants";

let seller_id;
function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

export default function ProdDet() {
  const baseURL = BACKEND_BASE_URL;


  const path = "/razorpay";
  const path1 = "/proddet";
  const path2 = "/couponsold";
  const fullUrl = baseURL.concat(path);
  const fullUrl1 = baseURL.concat(path1);
  const fullUrl2 = baseURL.concat(path2);
  const location = useLocation();
  const navigate = useNavigate();

  const navigateTosuccess = (obj) => {
    // 👇️ navigate to /contacts
    navigate("/payment-success", {
      state: obj,
    });
  };

  const navigateTofail = (obj) => {
    // 👇️ navigate to /contacts
    navigate("/payment-fail", {
      state: obj,
    });
  };

  const auth = useAuth();
  const [coupon, setcoupon] = useState({
    ID: "",
    NAME: "",
    DESCRIPTION: "",
    EXPIRY: "",
    PRICE: "",
    SELLER_ID: "",
    BUYER_ID: "",
    COUPON_CODE: "",
    SOLD: "",
  });
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  //* ********************Razorpay Integration********************************* */
  const [name] = useState("Mehul");
  async function displayRazorpay() {
    console.log(coupon);
    if (coupon.SOLD === 1) {
      console.log("Inside Sold ")
      // <Alert severity="error">Coupon Already Sold</Alert>
      handleClickOpen();
    } else if (auth.getCurrentUser()) {
        const res = await loadScript(
          "https://checkout.razorpay.com/v1/checkout.js"
        );

        if (!res) {
          alert("Razorpay SDK failed to load. Are you online?");
          return;
        }

      
        let buyerId;
        const { userId } = JSON.parse(localStorage.getItem(SESSION_STORAGE_KEY));
        console.log("Coupon Satte"+userId);
        // if (coupon.BUYER_ID == null) {
        //   buyerId = "10";
        // } else {
          buyerId = userId;
        // }
        console.log("Coupon Satte"+JSON.stringify(coupon));
        const data = await axios
          .post(fullUrl, {
            id: buyerId,
            amount: coupon.PRICE,
            coupon_id: coupon.ID,
            seller_id:coupon.SELLER_ID || seller_id,
            
          })
          .then((t) => t.data);


        const options = {
          key:"rzp_test_NpKUjWehxc13rP" ,         // need to change while deploying"
          //  key: 'rzp_live_xPxs0PPQHo3DmY',
          currency: data.currency,
          amount: data.amount.toString(),
          order_id: data.id,
          name: "SastaCoupon",
          description: "Buy and Sell Coupons",
          image: "https://i.postimg.cc/Qx7Fm4sm/Logo.png",
          handler(response) {
            axios
              .post(fullUrl2, {
                id: coupon.ID, //   change to dynamic once connection is done
              })
              .then(() => {
                alert("Bought/Sold Successfully");
              });

            const obj = {
              transaction_id: response.razorpay_payment_id,
              order_id: response.razorpay_order_id,
              signature: response.razorpay_signature,
              coupon_code: coupon.COUPON_CODE,
            };

            navigateTosuccess(obj);
          },
          prefill: {
            name,
            email: "sdfdsjfh2@ndsfdf.com",
            phone_number: "9899999999",
          },
        };
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        paymentObject.on("payment.failed", (response) => {
          alert(response.error.code);
          alert(response.error.description);
          alert(response.error.source);
          alert(response.error.step);
          alert(response.error.reason);
          alert(response.error.metadata.order_id);
          alert(response.error.metadata.payment_id);
          const obj1 = {
            transaction_id: response.error.metadata.payment_id,
            order_id: response.error.metadata.order_id,
            desc: response.error.description,
          };
          navigateTofail(obj1);
        });
      } else {
        navigate("/logIn");
      }
  } // end of display razor
  let value1 = {};
  let coupId;
  //* ********************************Fetching Coupon Details**************************************/
  if (location.state == null) {
    coupId = 1247;
  } else {
    coupId = location.state.couponId;
  }
  useEffect(() => {
      console.log(coupon);
    axios
      .get(fullUrl1, {
        params: { id: coupId },
      })
      .then((res) => {
        console.log(res.data);
        coupId = res.data.ID;
        const year = res.data.EXPIRY.substring(0, 4);
        const month = res.data.EXPIRY.substring(5, 7);
        const day = res.data.EXPIRY.substring(8, 10);
        const date = day.concat("-", month, "-", year);
        seller_id = res.data.SELLER_ID;
        value1 = {
          ID: res.data.ID,
          NAME: res.data.NAME,
          DESCRIPTION: res.data.DESCRIPTION,
          EXPIRY: date,
          PRICE: res.data.PRICE,
          SELLER_ID: res.SELLER_ID,
          BUYER_ID: res.data.BUYER_ID,
          URL: res.data.URL,
          COUPON_CODE: res.data.COUPON_CODE,
          SOLD: res.data.SOLD,
        };

        setcoupon((item1) => ({
          ...item1,
          ...value1,
        }));

      });
  }, []);

  //* *************************************************** */

  return (
    <Box className="main1">
      
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Coupon Already Sold!! Please buy other coupons !!
          </DialogContentText>
        </DialogContent>
      </Dialog>
      <div className="coupon">
        <img className="coupondesc1" alt="coupon" id="logo" src={coupon.URL} />
        {/* <div className="coupondesc2"> */}
        <Box className="desc_box" component="div" sx={{ color: "black" }}>
          <strong color="black">Description:</strong>
        </Box>
        <Box className="desc_box" sx={{ color: "black" }}>
          {coupon.DESCRIPTION}
        </Box>
        <Box
          component="div"
          sx={{ fontSize: 10, color: "black" }}
          className="desc_box"
        >
          <strong>Terms and Conditions:</strong>
          <li>
            By using this card, you agree to the Cardholder Agreement at
            SastaCoupon.com. Participating brands may have their own card
            terms, acceptance conditions and be subject to availability.
          </li>
          <li>
            {" "}
            Treat this card like cash; no replacement if lost/stolen. Not
            reloadable; no cash redemption exception as required by law.
          </li>
         
        </Box>
      </div>
      <div className="coupon">
        <div className="couponitem">
          <label className="label">Coupon Id </label>
          <label className="input">{coupon.ID} </label>
        </div>
        <div className="couponitem">
          <label className="label">Expiry Date</label>
          <label className="input">{coupon.EXPIRY} </label>
        </div>
        <div className="couponitem">
          <label className="label">Name </label>
          <label className="input">{coupon.NAME} </label>
        </div>
        <div className="couponitem">
          <label className="label">Amount </label>
          <label className="input">{coupon.PRICE} </label>
        </div>
        <button className="b2" type="button" onClick={displayRazorpay}>
          Buy
        </button>
      </div>
    </Box>
  );
}

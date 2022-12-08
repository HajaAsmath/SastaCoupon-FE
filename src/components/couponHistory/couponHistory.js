import React, { useState, useEffect } from "react";
import "./couponHistory.css";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Pagination } from "@mui/material";
import { BACKEND_BASE_URL } from "../../constants/Constants";
// import Pagination from "./Pagination"
const baseURL = BACKEND_BASE_URL;
const path = "/couponhistory";
const fullUrl = baseURL.concat(path);

function CouponHistory() {
  // let data;
  const [couponhistory, setCouponsHistory] = useState([]);

  // const [pageNumber, setPageNumber] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  const location = useLocation();
  const count = Math.ceil(couponhistory.length / postsPerPage);
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = couponhistory.slice(firstPostIndex, lastPostIndex);
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    let id1;
    const fetchHistory = async () => {
      if (location.state == null) {
        id1 = "1";
      } else {
        id1 = location.state.id;
      }

      await axios
        .get(fullUrl, {
          params: { id: id1 },
        })
        .then((res) => {
          const arr = res.data;
          setCouponsHistory(JSON.parse(arr));
        });
    };

    fetchHistory();
  }, []);
  return (
    <div>
      <ul className="nav-list1 ">
        <li>Coupon Id</li>
        <li>Coupon</li>
        <li>Bought/Sold</li>
        <li>Date </li>
      </ul>
      {/* <div class='test'> {JSON.stringify(couponhistory)} </div> */}

      {currentPosts.map((coupons) => (
        <ul className="nav-list2 ">
          <li className="coupon_id">{coupons.COUPON_ID} </li>
          <li>
            <img className="image" alt="coupon" src={coupons.URL} />
          </li>
          <li className="trans_type">{coupons.TRANSACTION_TYPE} </li>
          <li className="date">{coupons.PAYMENT_TIMESTAMP.slice(0, 10)} </li>
        </ul>
      ))}

      <Pagination
        sx={{
          padding: "20px 0px",
          "& .MuiPagination-ul": {
            justifyContent: "center",
          },
        }}
        count={count}
        variant="outlined"
        shape="rounded"
        onChange={handlePageChange}
      />

      {/* <Pagination
                totalPosts={couponhistory.length}
                postsPerPage={postsPerPage}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
            /> */}
    </div>
  );
}
export default CouponHistory;

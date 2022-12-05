/* eslint-disable no-nested-ternary */
import { Box, Button, Pagination, SwipeableDrawer } from "@mui/material";
import { useEffect, useLayoutEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "../../common/axiosInstance";
import DiscoveryCardSkeleton from "./DiscoverCardSkeleton";
import DiscoverPageCard from "./DiscoverPageCard/DiscoverPageCard/DiscoverPageCard";
import "./Discovery.css";
import DiscoveryFilter from "./DiscoveryFilter/DiscoveryFilter";

export default function Discovery() {
  const [coupons, setCoupons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [count, setCount] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const couponSkeletonArray = [1, 2, 3, 4, 5, 6, 7, 8];
  const [searchParams] = useSearchParams();
  const [windowWidth, setWindowWidth] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [denomError, setDenomError] = useState(false);
  const [expiryDateError] = useState(false);

  useLayoutEffect(() => {
    function updateSize() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const getPageCount = (length) => {
    const rounded = length - (length % 18);
    let pageCount = rounded / 18;
    if (length % 18 !== 0) {
      pageCount += 1;
    }
    return pageCount;
  };

  const fetchCoupons = async (filters) => {
    let url = `/coupon-list?itemsPerPage=18&pageNumber=${pageNumber}`;
    if (filters.min && filters.max) {
      url += `&min=${filters.min}&max=${filters.max}`;
    }
    if (filters.fromDate && filters.toDate) {
      url += `&fromDate=${filters.fromDate}&toDate=${filters.toDate}`;
    }
    await axios.get(url).then((res) => {
      if (res.status === 200) {
        // eslint-disable-next-line no-shadow
        const { couponArray, count } = JSON.parse(res.data);
        setCoupons(couponArray);
        setCount(getPageCount(count));
        setIsLoading(false);
      }
    });
  };

  useEffect(() => {
    setIsLoading(true);
    fetchCoupons({
      min: searchParams.get("Min"),
      max: searchParams.get("Max"),
      fromDate: searchParams.get("From Date"),
      toDate: searchParams.get("To Date"),
    });
  }, [pageNumber]);

  const handlePageChange = (event, page) => {
    setPageNumber(page);
  };

  const handleFilterClick = () => {
    if (searchParams.get("Min") > searchParams.get("Max")) {
      setDenomError(true);
      return;
    }
    setDenomError(false);
    setIsDrawerOpen(false);
    fetchCoupons({
      min: searchParams.get("Min"),
      max: searchParams.get("Max"),
      fromDate: searchParams.get("From Date"),
      toDate: searchParams.get("To Date"),
    });
  };

  return (
    <Box sx={windowWidth > 769 ? { display: "flex" } : { textAlign: "left" }}>
      {windowWidth > 769 ? (
        <DiscoveryFilter
          handleFilterClick={handleFilterClick}
          denomError={denomError}
        />
      ) : (
        <>
          <Button
            sx={{
              margin: "20px 55px 0px 6%",
              border: "1px solid #615E5B80",
              borderRadius: "5px",
              color: "#3C286D",
              fontSize: "20px",
            }}
            onClick={() => {
              setIsDrawerOpen(true);
            }}
          >
            Filter <span className="material-icons">filter_alt</span>
          </Button>
          <SwipeableDrawer
            open={isDrawerOpen}
            anchor="bottom"
            onClose={() => {
              setIsDrawerOpen(false);
            }}
          >
            <DiscoveryFilter
              sx={{ margin: "20px auto", width: "60%" }}
              handleFilterClick={handleFilterClick}
              denomError={denomError}
              expiryDateError={expiryDateError}
            />
          </SwipeableDrawer>
        </>
      )}
      <Box sx={{ width: "100%" }}>
        <Box className="coupon-list">
          {isLoading ? (
            couponSkeletonArray.map((item) => (
              <DiscoveryCardSkeleton key={item}>
                <DiscoverPageCard key={item} />
              </DiscoveryCardSkeleton>
            ))
          ) : coupons.length > 0 ? (
            coupons.map((coupon) => (
              <DiscoverPageCard
                key={coupon.ID}
                couponId={coupon.ID}
                couponName={coupon.NAME}
                couponImage={coupon.URL}
                couponPrice={coupon.PRICE}
              />
            ))
          ) : (
            <Box sx={{ fontSize: "20px", fontFamily: "PatuaOne" }}>
              No coupons found
            </Box>
          )}
        </Box>
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
      </Box>
    </Box>
  );
}

import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "../../common/axiosInstance";
import DiscoveryCardSkeleton from "./DiscoverCardSkeleton";
import DiscoverPageCard from "./DiscoverPageCard/DiscoverPageCard/DiscoverPageCard";
import './Discovery.css'

export default function Discovery() {

    const [searchParams, setSearchParams] = useSearchParams();
    const [coupons, setCoupons] = useState([]);
    const [lastSeenId, setLastSeenId] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const couponSkeletonArray = [1,2,3,4,5,6,7,8];


    useEffect(() => {
        const fetchCoupons = async () => {
            await axios.get(`/coupon-list?min=0&max=300&lastSeenId=${lastSeenId}`).then(res => {
                if(res.status === 200) {
                    setCoupons(JSON.parse(res.data));
                    setIsLoading(false);
                }
            })
        }

        fetchCoupons();
    }, [])
    return <Box className="coupon-list">
        {isLoading?
                couponSkeletonArray.map(item => {
                    return <DiscoveryCardSkeleton>
                                <DiscoverPageCard key={item}/>
                            </DiscoveryCardSkeleton>
                }):coupons.map((coupon, key) => 
                    <DiscoverPageCard key={key} couponName={coupon.NAME} couponImage={coupon.URL} couponPrice={coupon.PRICE}/>
                )}
    </Box>
}
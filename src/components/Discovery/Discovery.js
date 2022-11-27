import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "../../common/axiosInstance";

export default function Discovery() {

    const [searchParams, setSearchParams] = useSearchParams();
    const [result, setResult] = useState();

    useEffect(() => {
        const fetchCoupons = async () => {
            await axios.get('/coupon-list?min=20&max=30&lastSeenId=10').then(res => {
                if(res.status === 200) {
                    setResult(JSON.parse(res.data));
                }
            })
        }

        fetchCoupons();
    }, [])
    return <Box>
        <Button onClick={(e) => {
            searchParams.set('min', e.target.value);
            setSearchParams(searchParams);
        }}>10</Button>
    </Box>
}
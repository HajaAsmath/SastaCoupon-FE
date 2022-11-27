import { Route, Routes } from "react-router-dom";
import LandingPage from '../components/LandingPage/LandingPage';
import NotFoundPage from "../components/ErrorPage/NotFoundPage";
import UploadCoupon from "../components/UploadCoupon/UploadCoupon";
import LogIn from "../components/LogIn/LogIn";
import PrivateRoute from "./PrivateRoute";
import ProdDet from "../components/ProdDet/ProdDet";
import Profile from "../components/Profile/Profile";
import Pay_succ from "../components/pay_success/Pay_succ";
import Pay_fail from "../components/pay_fail/pay_fail";
import About from "../components/About/About"
import Discovery from "../components/Discovery/Discovery";

export default function RouterSwitch() {
    return <Routes>
        <Route path="/" element={<LandingPage/>}></Route>
        <Route path="/home" element={<LandingPage/>}></Route>
        <Route path="/login" element={<LogIn isLogin={true}/>}></Route>
        <Route path="/signUp" element={<LogIn isLogin={false}/>}></Route>
        <Route path="/upload-coupon" element={<PrivateRoute><UploadCoupon/></PrivateRoute>}></Route>
        <Route path='/discover' element={<Discovery/>}></Route>
        <Route path="/prod-det" element={<ProdDet/>}></Route>
        <Route path="/profile" element={<Profile/>}></Route>
        <Route path="/payment-success" element={<Pay_succ/>}></Route>
        <Route path="/payment-fail" element={<Pay_fail/>}></Route>
        <Route path="/about" element={<About/>}></Route>
        <Route path="/details">
            <Route path=":name"></Route>
        </Route>
        <Route path='*' element={<NotFoundPage/>}></Route>
    </Routes>
}
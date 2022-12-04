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
import History from "../components/couponHistory/couponHistory"
import Discovery from "../components/Discovery/Discovery";
import ComingSoon from '../components/ComingSoon'
import Faq from "../components/Faq/Faq";
import ContactUs from "../components/ContactUs/ContactUs";

export default function RouterSwitch() {
    return <Routes>
        <Route path="/" element={<LandingPage/>}></Route>
        <Route path="/home" element={<LandingPage/>}></Route>
        <Route path="/login" element={<LogIn isLogin={true}/>}></Route>
        <Route path="/signUp" element={<LogIn isLogin={false}/>}></Route>
        <Route path="/upload-coupon" element={<PrivateRoute><UploadCoupon/></PrivateRoute>}></Route>
        <Route path="/discover" element={<Discovery/>}></Route>
        <Route path="/prod-det" element={<ProdDet/>}></Route>
        <Route path="/profile" element={<Profile/>}></Route>
        <Route path="/payment-success" element={<Pay_succ/>}></Route>
        <Route path="/payment-fail" element={<Pay_fail/>}></Route>
        <Route path="/about" element={<About/>}></Route>
        <Route path="/coupon-history" element={<History/>}></Route>
        <Route path="/faq" element={<Faq/>}></Route>
        <Route path="/press" element={<ComingSoon/>}></Route>
        <Route path="/reviews" element={<ComingSoon/>}></Route>
        <Route path="/careers" element={<ComingSoon/>}></Route>
        <Route path="/termsofuse" element={<ComingSoon/>}></Route>
        <Route path="/privacypolicy" element={<ComingSoon/>}></Route>
        <Route path="/cookie" element={<ComingSoon/>}></Route>
        <Route path="/accessability" element={<ComingSoon/>}></Route>
        <Route path="/transactionhistory" element={<ComingSoon/>}></Route>
        <Route path="/howitworks" element={<ComingSoon/>}></Route>
        <Route path="/help" element={<ComingSoon/>}></Route>
        <Route path="/contact_us" element={<ContactUs/>}></Route> 
        {/* <Route path="/details">
            <Route path=":name"></Route>
        </Route> */}
        <Route path='*' element={<NotFoundPage/>}></Route>
        
    </Routes>
}
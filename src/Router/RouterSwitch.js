import { Route, Routes } from "react-router-dom";
import LandingPage from "../components/LandingPage/LandingPage";
import NotFoundPage from "../components/ErrorPage/NotFoundPage";
import UploadCoupon from "../components/UploadCoupon/UploadCoupon";
import LogIn from "../components/LogIn/LogIn";
import PrivateRoute from "./PrivateRoute";
import ProdDet from "../components/ProdDet/ProdDet";
import Profile from "../components/Profile/Profile";
import PaySucc from "../components/pay_success/Pay_succ";
import PayFail from "../components/pay_fail/pay_fail";
import About from "../components/About/About";
import History from "../components/couponHistory/couponHistory";
import Discovery from "../components/Discovery/Discovery";
import ComingSoon from "../components/ComingSoon";
import Faq from "../components/Faq/Faq";
import ContactUs from "../components/ContactUs/ContactUs";

export default function RouterSwitch() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/home" element={<LandingPage />} />
      <Route path="/login" element={<LogIn isLogin />} />
      <Route path="/signUp" element={<LogIn isLogin={false} />} />
      <Route
        path="/upload-coupon"
        element={
          <PrivateRoute>
            <UploadCoupon />
          </PrivateRoute>
        }
      />
      <Route path="/discover" element={<Discovery />} />
      <Route path="/prod-det" element={<ProdDet />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/payment-success" element={<PaySucc />} />
      <Route path="/payment-fail" element={<PayFail />} />
      <Route path="/about" element={<About />} />
      <Route path="/coupon-history" element={<History />} />
      <Route path="/faq" element={<Faq />} />
      <Route path="/press" element={<ComingSoon />} />
      <Route path="/reviews" element={<ComingSoon />} />
      <Route path="/careers" element={<ComingSoon />} />
      <Route path="/termsofuse" element={<ComingSoon />} />
      <Route path="/privacypolicy" element={<ComingSoon />} />
      <Route path="/cookie" element={<ComingSoon />} />
      <Route path="/accessability" element={<ComingSoon />} />
      <Route path="/transactionhistory" element={<ComingSoon />} />
      <Route path="/howitworks" element={<ComingSoon />} />
      <Route path="/help" element={<ComingSoon />} />
      <Route path="/contact_us" element={<ContactUs />} />
      {/* <Route path="/details">
            <Route path=":name"></Route>
        </Route> */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

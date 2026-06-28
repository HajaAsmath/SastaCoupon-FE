import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "../../common/axiosInstance";
import { useAuth } from "../../Context/AuthProvider";
import {
  BACKEND_BASE_URL,
  SESSION_STORAGE_KEY,
} from "../../constants/Constants";

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function ProdDet() {
  const location = useLocation();
  const navigate = useNavigate();
  const auth = useAuth();

  const couponIdFromNav = location.state?.couponId || 1247;

  const [coupon, setCoupon] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPaying, setIsPaying] = useState(false);
  const [soldDialog, setSoldDialog] = useState(false);

  useEffect(() => {
    axios
      .get(`${BACKEND_BASE_URL}/proddet`, { params: { id: couponIdFromNav } })
      .then((res) => {
        const d = res.data;
        const rawDate = d.EXPIRY || "";
        const expiry = rawDate
          ? `${rawDate.substring(8, 10)}-${rawDate.substring(5, 7)}-${rawDate.substring(0, 4)}`
          : "N/A";
        setCoupon({ ...d, EXPIRY_FORMATTED: expiry });
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, [couponIdFromNav]);

  const displayRazorpay = async () => {
    if (!auth.getCurrentUser()) {
      navigate("/logIn");
      return;
    }
    if (coupon?.SOLD === 1) {
      setSoldDialog(true);
      return;
    }

    setIsPaying(true);
    const loaded = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
    if (!loaded) {
      setIsPaying(false);
      return;
    }

    const { userId } = JSON.parse(localStorage.getItem(SESSION_STORAGE_KEY));
    const data = await axios
      .post(`${BACKEND_BASE_URL}/razorpay`, {
        id: userId,
        amount: coupon.PRICE,
        coupon_id: coupon.ID,
        seller_id: coupon.SELLER_ID,
      })
      .then((t) => t.data);

    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY,
      currency: data.currency,
      amount: data.amount.toString(),
      order_id: data.id,
      name: "SastaCoupon",
      description: "Buy and Sell Coupons",
      image: "https://i.postimg.cc/Qx7Fm4sm/Logo.png",
      handler(response) {
        axios.post(`${BACKEND_BASE_URL}/couponsold`, { id: coupon.ID });
        navigate("/payment-success", {
          state: {
            transaction_id: response.razorpay_payment_id,
            order_id: response.razorpay_order_id,
            signature: response.razorpay_signature,
            coupon_code: coupon.COUPON_CODE,
          },
        });
      },
      prefill: { name: "User", email: auth.getCurrentUser()?.email || "" },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
    paymentObject.on("payment.failed", (response) => {
      setIsPaying(false);
      navigate("/payment-fail", {
        state: {
          transaction_id: response.error.metadata?.payment_id,
          order_id: response.error.metadata?.order_id,
          desc: response.error.description,
        },
      });
    });

    setIsPaying(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="section-container max-w-4xl py-12 w-full">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="skeleton rounded-3xl h-96" />
            <div className="space-y-4">
              <div className="skeleton h-6 w-3/4 rounded-xl" />
              <div className="skeleton h-4 w-full rounded-xl" />
              <div className="skeleton h-4 w-2/3 rounded-xl" />
              <div className="skeleton h-12 w-40 rounded-xl mt-8" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!coupon) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-500">Coupon not found.</p>
      </div>
    );
  }

  const isSold = coupon.SOLD === 1;

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="section-container max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid md:grid-cols-2 gap-8"
        >
          {/* ── Left: Image ────────────────────────────────── */}
          <div className="space-y-4">
            <div className="bg-white rounded-3xl overflow-hidden shadow-card border border-slate-100 aspect-square flex items-center justify-center p-4">
              <img
                src={coupon.URL}
                alt={coupon.NAME}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Sold badge */}
            {isSold && (
              <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-2xl px-4 py-3">
                <svg className="w-4 h-4 text-red-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <p className="text-sm font-semibold text-red-600">This coupon has already been sold</p>
              </div>
            )}
          </div>

          {/* ── Right: Details ─────────────────────────────── */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="badge-primary">Coupon #{coupon.ID}</span>
                {!isSold && <span className="badge-cyan">Available</span>}
              </div>
              <h1 className="text-3xl font-extrabold text-slate-900 leading-tight tracking-tight">
                {coupon.NAME}
              </h1>
            </div>

            <div className="bg-white rounded-2xl shadow-card border border-slate-100 p-5 space-y-3">
              <InfoRow icon="🗓️" label="Expiry Date" value={coupon.EXPIRY_FORMATTED} />
              <InfoRow
                icon="💰"
                label="Price"
                value={
                  <span className="text-xl font-extrabold text-primary-600">
                    {coupon.PRICE} Credits
                  </span>
                }
              />
            </div>

            <div className="bg-white rounded-2xl shadow-card border border-slate-100 p-5">
              <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span>📋</span> Description
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {coupon.DESCRIPTION || "No description available for this coupon."}
              </p>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
              <h3 className="font-bold text-amber-800 mb-2 text-sm flex items-center gap-2">
                <span>⚠️</span> Terms &amp; Conditions
              </h3>
              <ul className="space-y-1.5 text-xs text-amber-700 list-disc list-inside">
                <li>By using this card, you agree to the Cardholder Agreement at SastaCoupon.com.</li>
                <li>Treat this card like cash; no replacement if lost or stolen.</li>
                <li>Not reloadable; no cash redemption except as required by law.</li>
              </ul>
            </div>

            <button
              type="button"
              onClick={displayRazorpay}
              disabled={isSold || isPaying}
              className={`w-full justify-center py-4 text-base font-bold rounded-2xl transition-all duration-200 flex items-center gap-2 ${
                isSold
                  ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                  : "btn-gradient shadow-glow hover:shadow-[0_0_30px_rgba(124,58,237,0.4)]"
              }`}
            >
              {isPaying ? (
                <>
                  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z" />
                  </svg>
                  Processing…
                </>
              ) : isSold ? (
                "Sold Out"
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                  Buy Now — {coupon.PRICE} Credits
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>

      {/* Sold Dialog */}
      <AnimatePresence>
        {soldDialog && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4"
              onClick={() => setSoldDialog(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
            >
              <div className="bg-white rounded-3xl shadow-float p-8 max-w-sm w-full text-center pointer-events-auto">
                <div className="w-16 h-16 rounded-2xl bg-red-100 flex items-center justify-center mx-auto mb-4 text-3xl">
                  😔
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Coupon Sold</h3>
                <p className="text-slate-500 text-sm mb-6">
                  This coupon has already been purchased. Explore other great deals!
                </p>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setSoldDialog(false)}
                    className="btn-ghost flex-1 justify-center"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate("/discover")}
                    className="btn-primary flex-1 justify-center"
                  >
                    Browse More
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function InfoRow({ icon, label, value }) {
  return (
    <div className="flex items-center justify-between">
      <span className="flex items-center gap-2 text-sm text-slate-500">
        <span>{icon}</span>
        {label}
      </span>
      <span className="text-sm font-semibold text-slate-900">{value}</span>
    </div>
  );
}

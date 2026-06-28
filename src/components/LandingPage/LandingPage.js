import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "../../common/axiosInstance";
import LandingPageCard from "./LandingPageCard/LandingPageCard";

const SKELETON_COUNT = 8;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.4, 0, 0.2, 1] },
  }),
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

export default function LandingPage() {
  const [coupons, setCoupons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get("/recent-coupon").then((res) => {
      if (res.status === 200) {
        setCoupons(JSON.parse(res.data));
        setIsLoading(false);
      }
    });
  }, []);

  return (
    <>
      {/* ── Hero Section ──────────────────────────────────── */}
      <section className="relative overflow-hidden bg-hero-gradient min-h-[92vh] flex items-center">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-primary-200/40 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-secondary-400/30 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-accent-400/15 blur-3xl" />
        </div>

        <div className="section-container relative py-16">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            {/* Text content */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
              className="max-w-xl"
            >
              <motion.div variants={fadeUp} className="inline-flex items-center gap-2 mb-6">
                <span className="badge-primary text-xs font-semibold uppercase tracking-widest">
                  ✨ India&apos;s Coupon Marketplace
                </span>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 leading-[1.08] tracking-tight"
              >
                Your Coupon,
                <span className="block bg-brand-gradient bg-clip-text text-transparent">
                  Your Choice.
                </span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="mt-6 text-lg text-slate-600 leading-relaxed max-w-md"
              >
                Buy and sell coupon codes from your favourite brands.
                Get the best deals without the hunt — all in one marketplace.
              </motion.p>

              <motion.div
                variants={fadeUp}
                className="mt-10 flex flex-wrap gap-4"
              >
                <Link to="/discover" className="btn-gradient text-base px-8 py-4">
                  Browse Coupons
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link to="/upload-coupon" className="btn-secondary text-base px-8 py-4">
                  Sell Yours
                </Link>
              </motion.div>

              <motion.div variants={fadeUp} className="mt-10 flex items-center gap-6">
                <Stat value="5000+" label="Coupons Listed" />
                <div className="w-px h-8 bg-slate-200" />
                <Stat value="₹2L+" label="Saved by Users" />
                <div className="w-px h-8 bg-slate-200" />
                <Stat value="50+" label="Brands" />
              </motion.div>
            </motion.div>

            {/* Hero visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              className="relative flex justify-center lg:justify-end"
            >
              <div className="relative">
                {/* Floating cards mock */}
                <motion.div
                  animate={{ y: [0, -12, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="glass-card p-4 w-64 shadow-float"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center">
                      <span className="text-xl">🎁</span>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Latest Deal</p>
                      <p className="text-sm font-bold text-slate-900">Zomato Premium</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-extrabold text-primary-600">₹120</span>
                    <span className="badge-primary">50% OFF</span>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="glass-card p-4 w-56 shadow-float mt-4 ml-auto -mr-4"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-xl bg-secondary-400/20 flex items-center justify-center">
                      <span className="text-lg">⚡</span>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Hot Deal</p>
                      <p className="text-sm font-bold text-slate-900">Amazon Gift</p>
                    </div>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-brand-gradient h-1.5 rounded-full w-3/4" />
                  </div>
                  <p className="text-xs text-slate-400 mt-1">75% claimed</p>
                </motion.div>

                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="glass-card px-4 py-3 w-52 shadow-float mt-4 -ml-4"
                >
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {["🙋", "👩", "🧑"].map((e, i) => (
                        <span key={i} className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-sm border-2 border-white">{e}</span>
                      ))}
                    </div>
                    <p className="text-xs text-slate-500">
                      <span className="font-bold text-slate-800">2.3k</span> happy buyers
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 60L60 51.4C120 43 240 25.5 360 22.5C480 19.5 600 30.5 720 33.8C840 37.3 960 33 1080 28.5C1200 24 1320 19.5 1380 17.3L1440 15V60H0Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="section-container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="text-center mb-12"
          >
            <motion.p variants={fadeUp} className="badge-primary mb-3 mx-auto">
              How It Works
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Simple. Fast. Rewarding.
            </motion.h2>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="grid sm:grid-cols-3 gap-8"
          >
            {HOW_IT_WORKS.map((step, i) => (
              <motion.div key={i} variants={fadeUp} custom={i} className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-primary-50 flex items-center justify-center mx-auto mb-4 text-3xl shadow-sm">
                  {step.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Featured Coupons ─────────────────────────────── */}
      <section className="py-16 bg-slate-50">
        <div className="section-container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="flex items-end justify-between mb-10"
          >
            <div>
              <motion.p variants={fadeUp} className="badge-cyan mb-2">
                Fresh Deals
              </motion.p>
              <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Coupon codes you&apos;ll love
              </motion.h2>
            </div>
            <motion.div variants={fadeUp}>
              <Link to="/discover" className="btn-ghost hidden sm:flex text-primary-600 font-semibold hover:bg-primary-50">
                View all
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={stagger}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6"
          >
            {isLoading
              ? Array.from({ length: SKELETON_COUNT }).map((_, i) => (
                  <CardSkeleton key={i} />
                ))
              : coupons.map((coupon, i) => (
                  <motion.div key={coupon.ID} variants={fadeUp} custom={i % 4}>
                    <LandingPageCard
                      couponId={coupon.ID}
                      couponName={coupon.NAME}
                      couponImage={coupon.URL}
                      couponPrice={coupon.PRICE}
                    />
                  </motion.div>
                ))}
          </motion.div>

          <div className="text-center mt-10">
            <Link to="/discover" className="btn-primary px-8 py-3.5 text-sm">
              Explore All Coupons
            </Link>
          </div>
        </div>
      </section>

      {/* ── Sell CTA Banner ───────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="relative overflow-hidden rounded-3xl bg-violet-gradient p-8 sm:p-12 text-center shadow-float"
          >
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/10 blur-2xl" />
              <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-cyan-400/20 blur-2xl" />
            </div>
            <div className="relative">
              <span className="badge bg-white/20 text-white mb-4 text-xs uppercase tracking-widest">
                💸 Earn Credits
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 mb-4 tracking-tight">
                Have unused coupons? Sell them.
              </h2>
              <p className="text-primary-200 text-lg mb-8 max-w-lg mx-auto">
                Turn your unused discount codes into credits. List in seconds, earn instantly.
              </p>
              <Link
                to="/upload-coupon"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-700 font-bold text-base rounded-2xl shadow-glow transition-all duration-200 hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] hover:scale-105 active:scale-95"
              >
                Start Selling
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

function Stat({ value, label }) {
  return (
    <div>
      <p className="text-2xl font-extrabold text-slate-900">{value}</p>
      <p className="text-xs text-slate-500 font-medium">{label}</p>
    </div>
  );
}

function CardSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-card border border-slate-100">
      <div className="skeleton h-40 w-full" />
      <div className="p-4 space-y-2.5">
        <div className="skeleton h-3.5 w-3/4 rounded-lg" />
        <div className="skeleton h-3 w-1/2 rounded-lg" />
        <div className="skeleton h-8 w-20 rounded-xl mt-3" />
      </div>
    </div>
  );
}

const HOW_IT_WORKS = [
  {
    icon: "🔍",
    title: "Browse",
    desc: "Explore thousands of discount codes across 50+ brands and categories.",
  },
  {
    icon: "💳",
    title: "Buy with Credits",
    desc: "Use your wallet credits to instantly purchase the coupon you want.",
  },
  {
    icon: "🎉",
    title: "Save & Earn",
    desc: "Redeem your coupon for big savings. Sell your unused ones for credits.",
  },
];

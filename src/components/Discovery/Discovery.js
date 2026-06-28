import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Pagination } from "@mui/material";
import axios from "../../common/axiosInstance";
import DiscoverPageCard from "./DiscoverPageCard/DiscoverPageCard/DiscoverPageCard";
import DiscoveryFilter from "./DiscoveryFilter/DiscoveryFilter";

const SKELETON_COUNT = 9;

const getPageCount = (length) => {
  const perPage = 18;
  return Math.ceil(length / perPage);
};

export default function Discovery() {
  const [coupons, setCoupons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [count, setCount] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [searchParams] = useSearchParams();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [denomError, setDenomError] = useState(false);

  const fetchCoupons = async (filters) => {
    let url = `/coupon-list?itemsPerPage=18&pageNumber=${pageNumber}`;
    if (filters.min && filters.max) url += `&min=${filters.min}&max=${filters.max}`;
    if (filters.fromDate && filters.toDate) url += `&fromDate=${filters.fromDate}&toDate=${filters.toDate}`;

    const res = await axios.get(url);
    if (res.status === 200) {
      const { couponArray, count: total } = JSON.parse(res.data);
      setCoupons(couponArray);
      setCount(getPageCount(total));
      setIsLoading(false);
    }
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

  const handleFilterClick = () => {
    if (Number(searchParams.get("Min")) > Number(searchParams.get("Max"))) {
      setDenomError(true);
      return;
    }
    setDenomError(false);
    setIsDrawerOpen(false);
    setIsLoading(true);
    fetchCoupons({
      min: searchParams.get("Min"),
      max: searchParams.get("Max"),
      fromDate: searchParams.get("From Date"),
      toDate: searchParams.get("To Date"),
    });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Page Header */}
      <div className="bg-white border-b border-slate-100 py-8">
        <div className="section-container">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Discover Coupons
          </h1>
          <p className="mt-1 text-slate-500">
            Browse {count * 18}+ curated discount codes across top brands.
          </p>
        </div>
      </div>

      <div className="section-container py-8">
        <div className="flex gap-8">
          {/* ── Sidebar Filter (desktop) ─────────────────────── */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-card border border-slate-100 sticky top-24">
              <div className="px-6 py-4 border-b border-slate-100">
                <h2 className="font-bold text-slate-900">Filters</h2>
              </div>
              <DiscoveryFilter
                handleFilterClick={handleFilterClick}
                denomError={denomError}
              />
            </div>
          </aside>

          {/* ── Main Content ─────────────────────────────────── */}
          <main className="flex-1 min-w-0">
            {/* Mobile filter button */}
            <div className="lg:hidden mb-4 flex items-center justify-between">
              <p className="text-sm text-slate-500">{coupons.length} results</p>
              <button
                onClick={() => setIsDrawerOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-card border border-slate-100 text-sm font-semibold text-slate-700 hover:border-primary-200 transition-colors"
              >
                <svg className="w-4 h-4 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                Filters
              </button>
            </div>

            {/* Coupon Grid */}
            {isLoading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
                {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
                  <GridSkeleton key={i} />
                ))}
              </div>
            ) : coupons.length === 0 ? (
              <EmptyState />
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4"
              >
                {coupons.map((coupon, i) => (
                  <motion.div
                    key={coupon.ID}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.35 }}
                  >
                    <DiscoverPageCard
                      couponId={coupon.ID}
                      couponName={coupon.NAME}
                      couponImage={coupon.URL}
                      couponPrice={coupon.PRICE}
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* Pagination */}
            {!isLoading && count > 1 && (
              <div className="mt-10 flex justify-center">
                <Pagination
                  count={count}
                  page={pageNumber}
                  variant="outlined"
                  shape="rounded"
                  onChange={(_, page) => { setPageNumber(page); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  sx={{
                    "& .MuiPaginationItem-root": {
                      fontFamily: "Inter",
                      fontWeight: 500,
                      borderRadius: "10px",
                      border: "1.5px solid #E2E8F0",
                      color: "#64748B",
                    },
                    "& .Mui-selected": {
                      backgroundColor: "#7C3AED !important",
                      color: "white !important",
                      borderColor: "#7C3AED !important",
                    },
                    "& .MuiPaginationItem-root:hover": {
                      borderColor: "#7C3AED",
                      color: "#7C3AED",
                    },
                  }}
                />
              </div>
            )}
          </main>
        </div>
      </div>

      {/* ── Mobile Filter Drawer ──────────────────────────── */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/40 lg:hidden"
              onClick={() => setIsDrawerOpen(false)}
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl shadow-float max-h-[85vh] overflow-y-auto lg:hidden"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                <h2 className="font-bold text-slate-900">Filters</h2>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <DiscoveryFilter
                handleFilterClick={handleFilterClick}
                denomError={denomError}
                compact
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function GridSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-card border border-slate-100">
      <div className="skeleton h-36 w-full" />
      <div className="p-4 space-y-2">
        <div className="skeleton h-3.5 w-3/4 rounded-lg" />
        <div className="skeleton h-3 w-1/2 rounded-lg" />
        <div className="skeleton h-7 w-16 rounded-xl mt-2" />
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="w-20 h-20 rounded-2xl bg-slate-100 flex items-center justify-center mb-4 text-4xl">
        🔍
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-2">No coupons found</h3>
      <p className="text-slate-500 text-sm max-w-xs">
        Try adjusting your filters or browse all categories to find great deals.
      </p>
    </div>
  );
}

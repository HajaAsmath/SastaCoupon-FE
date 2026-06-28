import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Pagination } from '@mui/material';
import { motion } from 'framer-motion';
import axios from 'axios';
import { BACKEND_BASE_URL } from '../../constants/Constants';

const fullUrl = `${BACKEND_BASE_URL}/couponhistory`;

function CouponHistory() {
  const [couponHistory, setCouponHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;
  const location = useLocation();

  const count = Math.ceil(couponHistory.length / postsPerPage);
  const currentPosts = couponHistory.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage,
  );

  useEffect(() => {
    const id = location.state?.id ?? '1';
    setLoading(true);
    axios
      .get(fullUrl, { params: { id } })
      .then((res) => {
        const parsed = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
        setCouponHistory(Array.isArray(parsed) ? parsed : []);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <section className="relative overflow-hidden py-20 px-6">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-900/30 via-slate-950 to-slate-950" />
        <div className="relative max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm font-medium mb-4"
          >
            Your Activity
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold"
          >
            Coupon{' '}
            <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              History
            </span>
          </motion.h1>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 pb-24">
        {loading && (
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="skeleton h-20 rounded-xl" />
            ))}
          </div>
        )}

        {!loading && couponHistory.length === 0 && (
          <div className="text-center py-24">
            <p className="text-slate-400 text-lg">No transactions found.</p>
          </div>
        )}

        {!loading && couponHistory.length > 0 && (
          <>
            <div className="hidden md:grid grid-cols-4 gap-4 px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              <span>Coupon</span>
              <span>ID</span>
              <span>Type</span>
              <span>Date</span>
            </div>

            <div className="space-y-3">
              {currentPosts.map((coupon, i) => (
                <motion.div
                  key={coupon.ORDER_ID}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-slate-800/60 backdrop-blur-sm rounded-xl p-5 border border-white/10 grid grid-cols-2 md:grid-cols-4 gap-4 items-center"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={coupon.URL}
                      alt="coupon"
                      className="w-12 h-12 rounded-lg object-cover bg-slate-800"
                    />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-0.5">Coupon ID</p>
                    <p className="text-sm font-medium text-slate-200">{coupon.COUPON_ID}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-0.5">Type</p>
                    <span
                      className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${
                        (coupon.TRANSACTION_TYPE || '').toLowerCase() === 'bought'
                          ? 'bg-violet-500/15 text-violet-400'
                          : 'bg-cyan-500/15 text-cyan-400'
                      }`}
                    >
                      {(coupon.TRANSACTION_TYPE || '').toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-0.5">Date</p>
                    <p className="text-sm text-slate-300">
                      {(coupon.PAYMENT_TIMESTAMP || '').slice(0, 10)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {count > 1 && (
              <div className="mt-8">
                <Pagination
                  count={count}
                  variant="outlined"
                  shape="rounded"
                  onChange={(_, page) => setCurrentPage(page)}
                  sx={{
                    '& .MuiPagination-ul': { justifyContent: 'center' },
                    '& .MuiPaginationItem-root': {
                      color: '#94a3b8',
                      borderColor: 'rgba(255,255,255,0.1)',
                    },
                    '& .Mui-selected': {
                      backgroundColor: '#7c3aed !important',
                      color: '#fff',
                      borderColor: '#7c3aed',
                    },
                  }}
                />
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}

export default CouponHistory;

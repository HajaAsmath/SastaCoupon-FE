import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function PaySucc() {
  const location = useLocation();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const state = location.state || {};
  const orderId = state.order_id;
  const couponCode = state.coupon_code;
  const transactionId = state.transaction_id;

  const handleCopy = () => {
    if (!couponCode) return;
    navigator.clipboard.writeText(couponCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-md">

        {/* Animated checkmark ring */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 18, delay: 0.1 }}
          className="mx-auto w-28 h-28 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center mb-8 shadow-[0_0_60px_rgba(124,58,237,0.5)]"
        >
          <motion.svg
            className="w-14 h-14 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5, ease: 'easeOut' }}
          >
            <motion.path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.4, duration: 0.5, ease: 'easeOut' }}
            />
          </motion.svg>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">Payment Successful!</h1>
          <p className="text-slate-400">Your coupon is ready to use.</p>
        </motion.div>

        {/* Coupon code card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="bg-slate-800/60 backdrop-blur-sm border border-white/10 rounded-2xl p-6 mb-4"
        >
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">
            Your Coupon Code
          </p>
          <div className="flex items-center gap-3">
            <div className="flex-1 bg-slate-900 border border-violet-500/30 rounded-xl px-4 py-3">
              <span className="text-violet-300 font-mono text-lg font-bold tracking-widest">
                {couponCode || '—'}
              </span>
            </div>
            <button
              type="button"
              onClick={handleCopy}
              className={`flex-shrink-0 px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${
                copied
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                  : 'bg-violet-500/20 text-violet-400 border border-violet-500/30 hover:bg-violet-500/30'
              }`}
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </motion.div>

        {/* Order details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="bg-slate-800/60 backdrop-blur-sm border border-white/10 rounded-2xl p-6 mb-8 space-y-3"
        >
          {orderId && (
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Order ID</span>
              <span className="text-slate-300 font-mono">{orderId}</span>
            </div>
          )}
          {transactionId && (
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Transaction ID</span>
              <span className="text-slate-300 font-mono text-xs">{transactionId}</span>
            </div>
          )}
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Status</span>
            <span className="text-green-400 font-semibold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-400 inline-block" />
              Completed
            </span>
          </div>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
          className="flex gap-3"
        >
          <button
            type="button"
            onClick={() => navigate('/coupon-history')}
            className="flex-1 py-3 rounded-xl font-semibold text-sm border border-white/10 text-slate-300 hover:bg-white/5 transition-colors"
          >
            View History
          </button>
          <button
            type="button"
            onClick={() => navigate('/discover')}
            className="btn-gradient flex-1 py-3 rounded-xl font-semibold text-sm text-white"
          >
            Browse More
          </button>
        </motion.div>

      </div>
    </div>
  );
}

export default PaySucc;

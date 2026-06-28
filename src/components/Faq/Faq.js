import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQS = [
  {
    q: 'Can I set any amount of price I want for my coupon?',
    a: 'Yes you can. But it is advised to set a reasonable price in order to make your coupon sell faster.',
  },
  {
    q: 'How do I redeem my credits from my account?',
    a: 'You can use your credits to buy coupons from other sellers on the platform.',
  },
  {
    q: 'How do I sell my coupons?',
    a: 'Create an account, go to Upload Coupon, and fill in the details. Your coupon will be listed on the marketplace immediately.',
  },
  {
    q: 'When will I get the coupon code of the coupons I purchased?',
    a: 'Your coupon code will be displayed to you immediately once you complete the purchase.',
  },
  {
    q: 'Whom do I contact for payment-related queries?',
    a: 'Use our Contact Us form to submit your query and our team will get back to you shortly.',
  },
  {
    q: 'How do I check the expiry date of a coupon?',
    a: 'The expiry date is visible on the product details page before you make a purchase.',
  },
];

function FaqItem({ item, isOpen, onToggle, index }) {
  return (
    <motion.div
      custom={index}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07, duration: 0.4 }}
      className="border border-white/8 rounded-xl overflow-hidden bg-slate-900/50"
    >
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between px-6 py-5 text-left gap-4 hover:bg-white/5 transition-colors"
      >
        <span className="text-white font-medium text-sm md:text-base">{item.q}</span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0 w-7 h-7 rounded-full bg-violet-500/20 text-violet-400 flex items-center justify-center text-xl font-light leading-none"
        >
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-5 text-slate-400 text-sm leading-relaxed border-t border-white/5 pt-4">
              {item.a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <section className="relative overflow-hidden py-24 px-6">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-900/30 via-slate-950 to-slate-950" />
        <div className="relative max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm font-medium mb-6"
          >
            Got questions?
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl font-bold mb-4"
          >
            Frequently Asked{' '}
            <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              Questions
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-lg"
          >
            Everything you need to know about SastaCoupon.
          </motion.p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 pb-24 space-y-3">
        {FAQS.map((item, i) => (
          <FaqItem
            key={item.q}
            item={item}
            index={i}
            isOpen={openIndex === i}
            onToggle={() => toggle(i)}
          />
        ))}
      </section>
    </div>
  );
}

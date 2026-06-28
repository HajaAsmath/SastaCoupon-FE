import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' },
  }),
};

const CARDS = [
  {
    title: 'About Us',
    text: 'Sasta Coupon is a platform where you can sell or donate a coupon to whoever is in need. This prevents coupon codes from going unused and helps those who want great deals.',
    badge: 'bg-primary/10 border-primary/20 text-primary',
  },
  {
    title: 'Vision',
    text: 'To expand the potential of prepaid possibilities by being leaders in the coupon code marketplace space.',
    badge: 'bg-secondary/10 border-secondary/20 text-secondary',
  },
  {
    title: 'Mission',
    text: 'To be innovators in the prepaid and financial payments space, making savings accessible to everyone.',
    badge: 'bg-accent/10 border-accent/20 text-accent',
  },
];

const TIMELINE = [
  { year: '2021', text: 'The idea was born — agents collected coupons manually and shared them with the community.' },
  { year: '2022', text: 'SastaCoupon.com launched, bringing the coupon marketplace online for buyers and sellers.' },
  { year: '2023', text: 'Platform grew with new features: wallet credits, Razorpay payments, and image uploads.' },
  { year: '2024+', text: 'Aiming to become one of the biggest platforms for buying and selling coupons in India.' },
];

export default function About() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <section className="relative overflow-hidden py-24 px-6">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-900/30 via-slate-950 to-slate-950" />
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm font-medium mb-6"
          >
            Our Story
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            About{' '}
            <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              SastaCoupon
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-400 text-lg max-w-2xl mx-auto"
          >
            A peer-to-peer coupon marketplace built to turn unused discount codes into real savings for everyone.
          </motion.p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-20 grid md:grid-cols-3 gap-6">
        {CARDS.map((card, i) => (
          <motion.div
            key={card.title}
            custom={i}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
          >
            <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border mb-4 ${card.badge}`}>
              {card.title}
            </div>
            <p className="text-slate-300 leading-relaxed text-sm">{card.text}</p>
          </motion.div>
        ))}
      </section>

      <section className="max-w-3xl mx-auto px-6 pb-24">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-3xl font-bold mb-12 text-center"
        >
          Our{' '}
          <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
            History
          </span>
        </motion.h2>
        <div className="relative pl-8 border-l border-violet-500/30 space-y-10">
          {TIMELINE.map((item, i) => (
            <motion.div
              key={item.year}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -left-[2.15rem] top-1 w-4 h-4 rounded-full bg-violet-500 border-2 border-slate-950 shadow-[0_0_12px_rgba(124,58,237,0.6)]" />
              <div className="text-violet-400 font-semibold text-sm mb-1">{item.year}</div>
              <p className="text-slate-300 text-sm leading-relaxed">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

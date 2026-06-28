import { useState } from 'react';
import { motion } from 'framer-motion';
import axios from '../../common/axiosInstance';
import ContactUsDialog from '../Dialog/ContactUsDialog';

export default function ContactUs() {
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [message, setMessage] = useState('');

  const [formValues, setFormValues] = useState({
    customerName: { value: '' },
    customerEmail: { value: '' },
    orderId: { value: '' },
    message: { value: '' },
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: { ...prev[name], value },
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const payload = {
      customerName: formValues.customerName.value,
      customerEmail: formValues.customerEmail.value,
      orderId: formValues.orderId.value,
      message: formValues.message.value,
    };
    axios
      .post('/contactUs', payload)
      .then((res) => {
        if (res.status === 200) {
          setMessage('Form submitted successfully. Our team will respond to your query shortly.');
          setDialogOpen(true);
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        setMessage(err.response?.data ? `Error: ${err.response.data}` : 'Error submitting form');
        setDialogOpen(true);
      });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <ContactUsDialog open={dialogOpen} setOpen={setDialogOpen} message={message} />

      <section className="relative overflow-hidden py-24 px-6">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-900/30 via-slate-950 to-slate-950" />
        <div className="relative max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm font-medium mb-6"
          >
            We&apos;re here to help
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl font-bold mb-4"
          >
            Contact{' '}
            <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              Us
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-lg"
          >
            Have a question or payment issue? Send us a message and we&apos;ll get back to you.
          </motion.p>
        </div>
      </section>

      <section className="max-w-xl mx-auto px-6 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
        >
          <form onSubmit={handleOnSubmit} className="space-y-5">
            <div>
              <label className="label-sm block mb-1.5" htmlFor="customerName">
                Name
              </label>
              <input
                id="customerName"
                className="input-field w-full"
                type="text"
                name="customerName"
                placeholder="Your full name"
                value={formValues.customerName.value}
                onChange={handleFormChange}
                required
              />
            </div>
            <div>
              <label className="label-sm block mb-1.5" htmlFor="customerEmail">
                Email
              </label>
              <input
                id="customerEmail"
                className="input-field w-full"
                type="email"
                name="customerEmail"
                placeholder="you@example.com"
                value={formValues.customerEmail.value}
                onChange={handleFormChange}
                required
              />
            </div>
            <div>
              <label className="label-sm block mb-1.5" htmlFor="orderId">
                Order ID
                <span className="text-slate-500 font-normal ml-1">(optional)</span>
              </label>
              <input
                id="orderId"
                className="input-field w-full"
                type="number"
                name="orderId"
                placeholder="e.g. 12345"
                value={formValues.orderId.value}
                onChange={handleFormChange}
              />
            </div>
            <div>
              <label className="label-sm block mb-1.5" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                className="input-field w-full resize-none"
                rows={5}
                name="message"
                placeholder="Describe your issue or question..."
                value={formValues.message.value}
                onChange={handleFormChange}
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="btn-gradient w-full py-3 rounded-xl font-semibold text-white flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Sending...
                </>
              ) : (
                'Send Message'
              )}
            </button>
          </form>
        </motion.div>
      </section>
    </div>
  );
}

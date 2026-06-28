import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "../../common/axiosInstance";
import { BACKEND_BASE_URL, SESSION_STORAGE_KEY } from "../../constants/Constants";

const AVATAR_OPTIONS = [
  { img: "https://i.postimg.cc/m2FycyHY/man.png", label: "Male" },
  { img: "https://i.postimg.cc/9fVSQczR/woman1.png", label: "Female" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.4, ease: [0.4, 0, 0.2, 1] },
  }),
};

export default function Profile() {
  const navigate = useNavigate();
  const [avatarOpen, setAvatarOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [profile, setProfile] = useState({
    ID: "",
    FIRST_NAME: "",
    LAST_NAME: "",
    EMAIL_ID: "",
    CONTACT: "",
    STREET: "",
    CITY: "",
    STATE: "",
    ZIP_CODE: "",
    COUNTRY: "",
    ADDRESS_ID: "",
  });
  const [avatarImg, setAvatarImg] = useState(null);

  useEffect(() => {
    const { userId } = JSON.parse(localStorage.getItem(SESSION_STORAGE_KEY));
    axios
      .get(`${BACKEND_BASE_URL}/profile`, { params: { id: userId } })
      .then((res) => {
        const d = res.data;
        setAvatarImg(d.PROFILE_IMG);
        setProfile({
          ID: d.ID,
          FIRST_NAME: d.FIRST_NAME || "",
          LAST_NAME: d.LAST_NAME || "",
          EMAIL_ID: d.EMAIL_ID || "",
          CONTACT: d.CONTACT || "",
          STREET: d.STREET || "",
          CITY: d.CITY || "",
          STATE: d.STATE || "",
          ZIP_CODE: d.ZIPCODE || "",
          COUNTRY: d.COUNTRY || "",
          ADDRESS_ID: d.ADDRESS_ID || "",
        });
      });
  }, []);

  const field = (key) => ({
    value: profile[key],
    onChange: (e) => setProfile((p) => ({ ...p, [key]: e.target.value })),
  });

  const handleSave = async () => {
    setSaving(true);
    await axios.post(`${BACKEND_BASE_URL}/profile`, {
      id: profile.ID,
      firstname: profile.FIRST_NAME,
      lastname: profile.LAST_NAME,
      contact: profile.CONTACT,
      street: profile.STREET,
      city: profile.CITY,
      state: profile.STATE,
      country: profile.COUNTRY,
      zipcode: profile.ZIP_CODE,
      address_id: profile.ADDRESS_ID,
      profile_img: avatarImg,
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="section-container max-w-5xl">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
        >
          {/* Header */}
          <motion.div variants={fadeUp} className="mb-8">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Account</h1>
            <p className="text-slate-500 mt-1">Manage your profile and preferences</p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* ── Left: Avatar Panel ──────────────────────────── */}
            <motion.div variants={fadeUp} className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-card border border-slate-100 overflow-hidden">
                <div className="h-24 bg-violet-gradient" />
                <div className="px-6 pb-6">
                  <div className="relative -mt-12 mb-4">
                    <div className="w-20 h-20 rounded-2xl border-4 border-white shadow-card overflow-hidden bg-slate-100">
                      {avatarImg ? (
                        <img src={avatarImg} alt="avatar" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-3xl bg-primary-50">
                          👤
                        </div>
                      )}
                    </div>
                  </div>
                  <h2 className="font-bold text-slate-900 text-lg">
                    {profile.FIRST_NAME || "Your"} {profile.LAST_NAME || "Name"}
                  </h2>
                  <p className="text-slate-500 text-sm mt-0.5">{profile.EMAIL_ID}</p>

                  <div className="mt-5 relative">
                    <button
                      onClick={() => setAvatarOpen((v) => !v)}
                      className="btn-secondary w-full justify-center text-sm"
                    >
                      Choose Avatar
                    </button>
                    {avatarOpen && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -4 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-float border border-slate-100 p-2 z-10"
                      >
                        {AVATAR_OPTIONS.map((opt) => (
                          <button
                            key={opt.label}
                            onClick={() => { setAvatarImg(opt.img); setAvatarOpen(false); }}
                            className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-primary-50 transition-colors"
                          >
                            <img src={opt.img} alt={opt.label} className="w-9 h-9 rounded-xl object-cover" />
                            <span className="text-sm font-medium text-slate-700">{opt.label}</span>
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </div>

                  <button
                    onClick={() => navigate("/coupon-history", { state: { id: profile.ID } })}
                    className="btn-ghost w-full justify-center mt-2 text-slate-600"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    View History
                  </button>
                </div>
              </div>
            </motion.div>

            {/* ── Right: Form ─────────────────────────────────── */}
            <motion.div variants={fadeUp} className="lg:col-span-2 space-y-6">
              {/* Personal Info */}
              <div className="bg-white rounded-2xl shadow-card border border-slate-100 p-6">
                <h3 className="font-bold text-slate-900 mb-5 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-primary-100 flex items-center justify-center text-primary-600 text-xs">👤</span>
                  Personal Information
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <FormField label="First Name" {...field("FIRST_NAME")} />
                  <FormField label="Last Name" {...field("LAST_NAME")} />
                  <FormField label="Email" type="email" disabled {...field("EMAIL_ID")} />
                  <FormField label="Contact" type="tel" {...field("CONTACT")} />
                </div>
              </div>

              {/* Address */}
              <div className="bg-white rounded-2xl shadow-card border border-slate-100 p-6">
                <h3 className="font-bold text-slate-900 mb-5 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-secondary-400/20 flex items-center justify-center text-secondary-600 text-xs">📍</span>
                  Address
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <FormField label="Street" {...field("STREET")} />
                  </div>
                  <FormField label="City" {...field("CITY")} />
                  <FormField label="State" {...field("STATE")} />
                  <FormField label="Zip Code" type="number" {...field("ZIP_CODE")} />
                  <FormField label="Country" {...field("COUNTRY")} />
                </div>
              </div>

              {/* Save Button */}
              <div className="flex items-center gap-3">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="btn-primary px-8 py-3 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {saving ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z" />
                      </svg>
                      Saving…
                    </>
                  ) : "Save Changes"}
                </button>
                {saved && (
                  <motion.span
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-1.5 text-sm font-medium text-emerald-600"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    Saved successfully
                  </motion.span>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function FormField({ label, disabled, type = "text", value, onChange }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`input-field ${disabled ? "opacity-60 cursor-not-allowed bg-slate-100" : ""}`}
        placeholder={label}
      />
    </div>
  );
}

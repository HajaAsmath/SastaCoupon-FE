import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../Context/AuthProvider";
import Logo from "./Site_Icon.png";

const NAV_LINKS = [
  { label: "Home", to: "/home" },
  { label: "Discover", to: "/discover" },
  { label: "Mission", to: "/about" },
  { label: "FAQ", to: "/faq" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [credits, setCredits] = useState(0);
  const dropdownRef = useRef(null);
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = auth.getCurrentUser();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setDropdownOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAccountClick = () => {
    if (isLoggedIn) {
      setCredits(isLoggedIn.credits || 0);
      setDropdownOpen((v) => !v);
    } else {
      navigate("/logIn");
    }
  };

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-[0_2px_20px_rgba(15,23,42,0.08)] border-b border-slate-100"
            : "bg-transparent"
        }`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Logo */}
            <Link to="/home" className="flex items-center gap-2.5 flex-shrink-0">
              <img src={Logo} alt="SastaCoupon" className="h-9 w-auto" />
              <span className="font-bold text-lg text-slate-900 hidden sm:block tracking-tight">
                Sasta<span className="text-primary-600">Coupon</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <NavLink key={link.to} to={link.to} label={link.label} />
              ))}
            </nav>

            {/* Desktop Right Actions */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                to="/upload-coupon"
                className="btn-secondary text-sm px-5 py-2.5"
              >
                Sell Coupon
              </Link>
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={handleAccountClick}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-primary-600 text-white text-sm font-semibold transition-all duration-200 hover:bg-primary-700 hover:shadow-glow active:scale-95"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  {isLoggedIn ? "Account" : "Sign In"}
                  {isLoggedIn && (
                    <svg className={`w-3 h-3 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </button>
                <AnimatePresence>
                  {dropdownOpen && <AccountDropdown credits={credits} setDropdown={setDropdownOpen} auth={auth} />}
                </AnimatePresence>
              </div>
            </div>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Open menu"
            >
              <div className="w-5 flex flex-col gap-1">
                <motion.span
                  animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                  className="block h-0.5 w-5 bg-slate-700 rounded-full origin-center"
                />
                <motion.span
                  animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                  className="block h-0.5 w-5 bg-slate-700 rounded-full"
                />
                <motion.span
                  animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                  className="block h-0.5 w-5 bg-slate-700 rounded-full origin-center"
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
              className="lg:hidden overflow-hidden bg-white border-t border-slate-100 shadow-float"
            >
              <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="block px-4 py-3 rounded-xl text-slate-700 font-medium hover:bg-primary-50 hover:text-primary-600 transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="pt-2 space-y-2 border-t border-slate-100 mt-2">
                  <Link to="/upload-coupon" className="btn-secondary w-full justify-center py-3">
                    Sell Coupon
                  </Link>
                  {isLoggedIn ? (
                    <>
                      <Link to="/profile" className="btn-primary w-full justify-center py-3">
                        Account
                      </Link>
                      <button
                        onClick={() => { auth.logOut(); setMobileOpen(false); }}
                        className="btn-ghost w-full justify-center text-red-500 hover:bg-red-50"
                      >
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <Link to="/logIn" className="btn-primary w-full justify-center py-3">
                      Sign In
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Spacer to offset fixed header */}
      <div className="h-16 lg:h-18" />
    </>
  );
}

function NavLink({ to, label }) {
  const location = useLocation();
  const isActive = location.pathname === to || (to === "/home" && location.pathname === "/");

  return (
    <Link
      to={to}
      className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
        isActive
          ? "text-primary-600 bg-primary-50"
          : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
      }`}
    >
      {label}
      {isActive && (
        <motion.span
          layoutId="nav-indicator"
          className="absolute inset-x-2 -bottom-0.5 h-0.5 bg-primary-600 rounded-full"
        />
      )}
    </Link>
  );
}

function AccountDropdown({ credits, setDropdown, auth }) {
  const user = auth.getCurrentUser();

  return (
    <motion.div
      initial={{ opacity: 0, y: -8, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.95 }}
      transition={{ duration: 0.15 }}
      className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-float border border-slate-100 py-2 overflow-hidden"
    >
      <div className="px-4 py-3 border-b border-slate-100 bg-primary-50">
        <p className="text-xs text-slate-500 font-medium">Signed in as</p>
        <p className="text-sm font-semibold text-slate-900 truncate">
          {user?.email || "Account"}
        </p>
        <div className="flex items-center gap-1.5 mt-1.5">
          <span className="text-2xs font-bold text-primary-600 bg-primary-100 px-2 py-0.5 rounded-full">
            {credits} Credits
          </span>
        </div>
      </div>
      <div className="py-1">
        <Link
          to="/profile"
          onClick={() => setDropdown(false)}
          className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-primary-600 transition-colors"
        >
          <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          Account Overview
        </Link>
        <Link
          to="/coupon-history"
          onClick={() => setDropdown(false)}
          className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-primary-600 transition-colors"
        >
          <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          Purchase History
        </Link>
      </div>
      <div className="border-t border-slate-100 pt-1">
        <button
          onClick={() => { auth.logOut(); setDropdown(false); }}
          className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Sign Out
        </button>
      </div>
    </motion.div>
  );
}

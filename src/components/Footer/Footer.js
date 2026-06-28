import { Link } from "react-router-dom";
import Logo from "./Site_Icon.png";

const LINKS = {
  About: [
    { label: "About Us", to: "/about" },
    { label: "Press / Media", to: "/press" },
    { label: "Customer Reviews", to: "/reviews" },
    { label: "Careers", to: "/careers" },
  ],
  Legal: [
    { label: "Terms of Use", to: "/termsofuse" },
    { label: "Privacy Policy", to: "/privacypolicy" },
    { label: "Cookie Policy", to: "/cookie" },
    { label: "Accessibility", to: "/accessability" },
  ],
  Support: [
    { label: "Transaction History", to: "/transactionhistory" },
    { label: "How it Works", to: "/howitworks" },
    { label: "Help Centre", to: "/help" },
    { label: "Contact Us", to: "/contact_us" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-dark text-slate-400">
      {/* Main Footer */}
      <div className="section-container py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4 lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <img src={Logo} alt="SastaCoupon" className="h-9 w-auto opacity-90" />
              <span className="font-bold text-lg text-white tracking-tight">
                Sasta<span className="text-primary-400">Coupon</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs text-slate-400">
              India&apos;s peer-to-peer coupon marketplace. Buy and sell discount codes from your
              favourite brands &mdash; all in one place.
            </p>
            <div className="flex items-center gap-3 mt-6">
              <SocialIcon href="#" label="Twitter">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </SocialIcon>
              <SocialIcon href="#" label="Instagram">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z" />
                </svg>
              </SocialIcon>
              <SocialIcon href="#" label="Facebook">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </SocialIcon>
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(LINKS).map(([section, links]) => (
            <div key={section}>
              <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-4">
                {section}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-sm text-slate-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="section-container py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-500">
            © 2024 SastaCoupon.com, LLC. All rights reserved.
          </p>
          <p className="text-xs text-slate-600 flex items-center gap-1.5">
            Made with
            <span className="text-accent-400">♥</span>
            in India
          </p>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ href, label, children }) {
  return (
    <a
      href={href}
      aria-label={label}
      className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 hover:bg-primary-600 hover:text-white transition-all duration-200"
    >
      {children}
    </a>
  );
}

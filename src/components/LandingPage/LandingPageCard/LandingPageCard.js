import { Link } from "react-router-dom";

export default function LandingPageCard({ couponId, couponName, couponImage, couponPrice }) {
  return (
    <Link
      to="/prod-det"
      state={{ couponId, couponName, couponImage, couponPrice }}
      className="group block"
    >
      <div className="bg-white rounded-2xl overflow-hidden shadow-card border border-slate-100 transition-all duration-300 group-hover:shadow-card-hover group-hover:-translate-y-1">
        {/* Image */}
        <div className="relative overflow-hidden bg-slate-50 h-40">
          <img
            src={couponImage}
            alt={couponName}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="text-sm font-semibold text-slate-900 line-clamp-2 leading-snug mb-1.5 group-hover:text-primary-600 transition-colors">
            {couponName}
          </h3>
          <div className="flex items-center justify-between mt-3">
            <div>
              <p className="text-xs text-slate-400 font-medium">Price</p>
              <p className="text-lg font-extrabold text-primary-600 leading-tight">
                {couponPrice}
                <span className="text-xs font-medium text-slate-500 ml-0.5">cr</span>
              </p>
            </div>
            <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-primary-600 text-white text-xs font-bold rounded-xl transition-all duration-200 group-hover:bg-primary-700 group-hover:shadow-glow">
              Buy Now
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

import { Link } from "react-router-dom";

export default function DiscoverPageCard({ couponId, couponName, couponImage, couponPrice }) {
  return (
    <Link
      to="/prod-det"
      state={{ couponId, couponName, couponImage, couponPrice }}
      className="group block"
    >
      <div className="bg-white rounded-2xl overflow-hidden shadow-card border border-slate-100 transition-all duration-300 group-hover:shadow-card-hover group-hover:-translate-y-1 h-full flex flex-col">
        <div className="relative overflow-hidden bg-slate-50 h-36 flex-shrink-0">
          <img
            src={couponImage}
            alt={couponName}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>
        <div className="p-4 flex flex-col flex-1">
          <h3 className="text-sm font-semibold text-slate-900 line-clamp-2 leading-snug mb-auto group-hover:text-primary-600 transition-colors">
            {couponName}
          </h3>
          <div className="flex items-center justify-between mt-3">
            <p className="text-base font-extrabold text-primary-600">
              {couponPrice}
              <span className="text-xs font-medium text-slate-500 ml-0.5">cr</span>
            </p>
            <span className="text-xs font-bold text-primary-600 bg-primary-50 px-2.5 py-1 rounded-lg group-hover:bg-primary-600 group-hover:text-white transition-colors">
              Buy
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

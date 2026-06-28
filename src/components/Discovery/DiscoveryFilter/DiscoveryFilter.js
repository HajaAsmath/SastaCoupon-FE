import { useSearchParams } from "react-router-dom";
import CaptureDate from "./CaptureDate";
import DiscoveryAmount from "./DiscoveryAmount";

export default function DiscoveryFilter({ handleFilterClick, denomError, compact }) {
  const [, setSearchParams] = useSearchParams();

  const handleResetClick = () => setSearchParams("");

  return (
    <div className={`${compact ? "p-4" : "p-6"} space-y-6`}>
      <div>
        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">
          Filter by Amount
        </h3>
        <div className="space-y-3">
          <DiscoveryAmount heading="Min" />
          <DiscoveryAmount heading="Max" error={denomError} />
          {denomError && (
            <p className="text-xs text-red-500 mt-1">Min must be less than Max</p>
          )}
        </div>
      </div>

      <div className="w-full h-px bg-slate-100" />

      <div>
        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">
          Filter by Expiry Date
        </h3>
        <div className="space-y-3">
          <CaptureDate heading="From Date" />
          <CaptureDate heading="To Date" />
        </div>
      </div>

      <div className="w-full h-px bg-slate-100" />

      <div className="space-y-2">
        <button onClick={handleFilterClick} className="btn-primary w-full justify-center">
          Apply Filters
        </button>
        <button onClick={handleResetClick} className="btn-ghost w-full justify-center text-slate-500">
          Reset
        </button>
      </div>
    </div>
  );
}

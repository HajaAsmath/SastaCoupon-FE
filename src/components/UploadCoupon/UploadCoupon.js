import { TextField } from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import axios from "../../common/axiosInstance";
import UploadStatusDialog from "../Dialog/UploadStatusDialog";

const DENOMINATIONS = [10, 20, 30, 50, 100];

const INITIAL_FORM = {
  couponName: { value: "", error: false },
  discription: { value: "", error: false },
  couponCode: { value: "", error: false },
  couponImage: { value: "", error: false },
  denomination: { value: "", error: false },
  expiryDate: { value: null, error: false },
};

const compressImage = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = reject;
      img.onload = () => {
        const MAX = 300;
        let { width, height } = img;
        if (width > height) {
          if (width > MAX) { height = Math.round((height * MAX) / width); width = MAX; }
        } else if (height > MAX) {
          width = Math.round((width * MAX) / height); height = MAX;
        }
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        canvas.getContext("2d").drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", 0.75));
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });

export default function UploadCoupon() {
  const [imageMap, setImageMap] = useState(new Map());
  const [category, setCategory] = useState("");
  const [imageList, setImageList] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedDenom, setSelectedDenom] = useState("");
  const [customDenom, setCustomDenom] = useState("");
  const [formValues, setFormValues] = useState(INITIAL_FORM);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isUploadFailed, setIsUploadFailed] = useState(false);

  // Custom brand state
  const [useCustomBrand, setUseCustomBrand] = useState(false);
  const [customBrandName, setCustomBrandName] = useState("");
  const [customBrandNameError, setCustomBrandNameError] = useState(false);
  const [customPreview, setCustomPreview] = useState("");
  const [customImageId, setCustomImageId] = useState(null);
  const [customBrandUploading, setCustomBrandUploading] = useState(false);
  const [customUploadError, setCustomUploadError] = useState("");

  const tomorrow = useRef(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d;
  });

  useEffect(() => {
    axios.get("/images").then((res) => {
      if (res.status === 200) {
        const parsed = typeof res.data === "string" ? JSON.parse(res.data) : res.data;
        const map = new Map(Object.entries(parsed));
        setImageMap(map);
        const defaultCat = map.has("Default") ? "Default" : [...map.keys()][0] || "";
        setCategory(defaultCat);
        setImageList(map.get(defaultCat) || []);
      }
    });
  }, []);

  const field = (name) => ({
    value: formValues[name].value,
    onChange: (e) =>
      setFormValues((prev) => ({
        ...prev,
        [name]: { ...prev[name], value: e.target.value, error: false },
      })),
    error: formValues[name].error,
    helperText: formValues[name].error
      ? `Please enter ${name === "discription" ? "a description" : name.replace(/([A-Z])/g, " $1").toLowerCase()}`
      : "",
  });

  const handleCategoryChange = (e) => {
    const cat = e.target.value;
    setCategory(cat);
    setImageList(imageMap.get(cat) || []);
    setSelectedImage("");
    setFormValues((prev) => ({ ...prev, couponImage: { value: "", error: false } }));
  };

  const handleImageSelect = (url) => {
    setSelectedImage(url);
    setFormValues((prev) => ({ ...prev, couponImage: { value: url, error: false } }));
  };

  const handleDenomSelect = (val) => {
    setSelectedDenom(val);
    setCustomDenom("");
    setFormValues((prev) => ({ ...prev, denomination: { value: String(val), error: false } }));
  };

  const handleCustomDenom = (e) => {
    const val = e.target.value;
    setCustomDenom(val);
    setSelectedDenom("");
    setFormValues((prev) => ({ ...prev, denomination: { value: val, error: false } }));
  };

  const handleToggleCustomBrand = () => {
    setUseCustomBrand((prev) => !prev);
    setCustomBrandName("");
    setCustomBrandNameError(false);
    setCustomPreview("");
    setCustomImageId(null);
    setCustomUploadError("");
    setSelectedImage("");
    setFormValues((prev) => ({ ...prev, couponImage: { value: "", error: false } }));
  };

  const handleCustomFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!customBrandName.trim()) {
      setCustomBrandNameError(true);
      return;
    }
    setCustomBrandUploading(true);
    setCustomUploadError("");
    try {
      const dataUrl = await compressImage(file);
      const res = await axios.post("/uploadBrandImage", {
        dataUrl,
        brandName: customBrandName.trim(),
      });
      setCustomPreview(dataUrl);
      setCustomImageId(res.data.imageId);
      setFormValues((prev) => ({ ...prev, couponImage: { value: "custom", error: false } }));
    } catch {
      setCustomUploadError("Upload failed. Please try again.");
      setCustomPreview("");
      setCustomImageId(null);
    } finally {
      setCustomBrandUploading(false);
    }
  };

  const validateForm = () => {
    let valid = true;
    const updated = { ...formValues };

    Object.keys(updated).forEach((key) => {
      if (key === "couponImage" && useCustomBrand) return;
      if (!updated[key].value) {
        updated[key] = { ...updated[key], error: true };
        valid = false;
      }
    });

    if (useCustomBrand) {
      if (!customBrandName.trim()) { setCustomBrandNameError(true); valid = false; }
      if (!customImageId) {
        updated.couponImage = { value: "", error: true };
        valid = false;
      }
    }

    setFormValues(updated);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!validateForm()) { setIsLoading(false); return; }

    axios
      .post("/uploadCoupon", {
        couponName: formValues.couponName.value,
        couponDiscription: formValues.discription.value,
        couponCode: formValues.couponCode.value,
        couponImage: useCustomBrand ? "custom" : formValues.couponImage.value,
        ...(useCustomBrand && { imageId: customImageId }),
        denomination: formValues.denomination.value,
        expiryDate: formValues.expiryDate.value,
      })
      .then((res) => {
        if (res.status === 200) {
          setMessage("Coupon uploaded successfully!");
          setIsUploadFailed(false);
          setDialogOpen(true);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        setMessage(
          err.response?.data ? `Error: ${err.response.data}` : "Upload failed. Please try again."
        );
        setIsUploadFailed(true);
        setDialogOpen(true);
        setIsLoading(false);
      });
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <UploadStatusDialog
        open={dialogOpen}
        setOpen={setDialogOpen}
        message={message}
        isUploadFailed={isUploadFailed}
      />

      <div className="section-container max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Sell Your Coupon</h1>
            <p className="text-slate-500 mt-1">List your unused coupons and earn credits</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            {/* Basic Info */}
            <Section icon="📝" title="Coupon Details">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="label-sm">Coupon Name</label>
                  <input
                    {...field("couponName")}
                    placeholder="e.g. Amazon Gift Card ₹500"
                    className={`input-field ${formValues.couponName.error ? "border-red-300 bg-red-50" : ""}`}
                  />
                  {formValues.couponName.error && (
                    <p className="text-xs text-red-500 mt-1">Enter a coupon name</p>
                  )}
                </div>
                <div>
                  <label className="label-sm">Coupon Code</label>
                  <input
                    {...field("couponCode")}
                    placeholder="e.g. SAVE50XYZ"
                    className={`input-field font-mono tracking-wider ${formValues.couponCode.error ? "border-red-300 bg-red-50" : ""}`}
                  />
                  {formValues.couponCode.error && (
                    <p className="text-xs text-red-500 mt-1">Enter the coupon code</p>
                  )}
                </div>
                <div className="sm:col-span-2">
                  <label className="label-sm">Description</label>
                  <textarea
                    value={formValues.discription.value}
                    onChange={(e) =>
                      setFormValues((prev) => ({
                        ...prev,
                        discription: { value: e.target.value, error: false },
                      }))
                    }
                    rows={3}
                    placeholder="Describe what this coupon can be used for..."
                    className={`input-field resize-none ${formValues.discription.error ? "border-red-300 bg-red-50" : ""}`}
                  />
                  {formValues.discription.error && (
                    <p className="text-xs text-red-500 mt-1">Enter a description</p>
                  )}
                </div>
              </div>
            </Section>

            {/* Category & Image */}
            <Section icon="🖼️" title="Select Brand Image">
              {!useCustomBrand ? (
                <>
                  <div className="mb-4">
                    <label className="label-sm">Category</label>
                    <select value={category} onChange={handleCategoryChange} className="input-field">
                      {[...imageMap.keys()].map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  {formValues.couponImage.error && (
                    <p className="text-xs text-red-500 mb-2">Please select a brand image</p>
                  )}

                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                    {imageList.map((img) => (
                      <button
                        key={img}
                        type="button"
                        onClick={() => handleImageSelect(img)}
                        className={`aspect-square rounded-xl overflow-hidden border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-400 ${
                          selectedImage === img
                            ? "border-primary-500 shadow-glow scale-105"
                            : "border-transparent hover:border-primary-200"
                        }`}
                      >
                        <img src={img} alt="brand" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="label-sm">Brand Name</label>
                    <input
                      value={customBrandName}
                      onChange={(e) => {
                        setCustomBrandName(e.target.value);
                        setCustomBrandNameError(false);
                        // reset upload if name changes after upload
                        if (customImageId) {
                          setCustomPreview("");
                          setCustomImageId(null);
                          setFormValues((prev) => ({ ...prev, couponImage: { value: "", error: false } }));
                        }
                      }}
                      placeholder="e.g. Amazon, Swiggy, Uber"
                      className={`input-field ${customBrandNameError ? "border-red-300 bg-red-50" : ""}`}
                    />
                    {customBrandNameError && (
                      <p className="text-xs text-red-500 mt-1">Enter the brand name before uploading</p>
                    )}
                  </div>

                  <div>
                    <label className="label-sm">Brand Logo</label>
                    <div className="flex items-center gap-4">
                      <label
                        className={`cursor-pointer flex items-center gap-2 px-4 py-3 rounded-xl border-2 border-dashed transition-colors text-sm ${
                          customBrandUploading
                            ? "border-slate-200 text-slate-400 cursor-not-allowed"
                            : "border-slate-300 text-slate-600 hover:border-primary-400 hover:text-primary-600"
                        }`}
                      >
                        {customBrandUploading ? (
                          <>
                            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z" />
                            </svg>
                            <span>Uploading…</span>
                          </>
                        ) : (
                          <>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                            </svg>
                            <span>{customImageId ? "Change Logo" : "Choose Image"}</span>
                          </>
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleCustomFileChange}
                          disabled={customBrandUploading}
                        />
                      </label>

                      {customPreview && (
                        <div className="relative w-16 h-16 rounded-xl overflow-hidden border-2 border-primary-500 shadow-glow flex-shrink-0">
                          <img src={customPreview} alt="logo preview" className="w-full h-full object-contain bg-white" />
                          <div className="absolute bottom-0 inset-x-0 bg-green-500 text-white text-center text-[9px] font-bold py-0.5">
                            ✓ OK
                          </div>
                        </div>
                      )}
                    </div>

                    {customUploadError && (
                      <p className="text-xs text-red-500 mt-1">{customUploadError}</p>
                    )}
                    {formValues.couponImage.error && !customImageId && (
                      <p className="text-xs text-red-500 mt-1">Please upload a brand logo</p>
                    )}
                    <p className="text-xs text-slate-400 mt-2">
                      PNG, JPG or WebP · Max 5 MB · Will be resized to 300×300
                    </p>
                  </div>
                </div>
              )}

              {/* Toggle */}
              <button
                type="button"
                onClick={handleToggleCustomBrand}
                className="mt-4 text-xs font-medium text-primary-600 hover:text-primary-800 underline underline-offset-2 transition-colors"
              >
                {useCustomBrand
                  ? "← Browse existing brand logos"
                  : "Can't find your brand? Upload a custom logo"}
              </button>
            </Section>

            {/* Denomination */}
            <Section icon="💰" title="Set Price">
              <p className="text-xs text-slate-500 mb-3">How many credits should buyers pay?</p>
              {formValues.denomination.error && (
                <p className="text-xs text-red-500 mb-2">Please select a denomination</p>
              )}
              <div className="flex flex-wrap gap-2 mb-4">
                {DENOMINATIONS.map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => handleDenomSelect(d)}
                    className={`px-5 py-2.5 rounded-xl font-bold text-sm border-2 transition-all duration-200 ${
                      selectedDenom === d
                        ? "bg-primary-600 border-primary-600 text-white shadow-glow"
                        : "border-slate-200 text-slate-700 hover:border-primary-300 hover:text-primary-600"
                    }`}
                  >
                    {d} cr
                  </button>
                ))}
              </div>
              <div>
                <label className="label-sm">Custom Amount</label>
                <input
                  type="number"
                  value={customDenom}
                  onChange={handleCustomDenom}
                  placeholder="Enter custom credits"
                  min={1}
                  className="input-field w-48"
                />
              </div>
            </Section>

            {/* Expiry Date */}
            <Section icon="📅" title="Expiry Date">
              <p className="text-xs text-slate-500 mb-3">When does this coupon expire?</p>
              {formValues.expiryDate.error && (
                <p className="text-xs text-red-500 mb-2">Please select an expiry date</p>
              )}
              <DesktopDatePicker
                disablePast
                label="Expiry Date"
                inputFormat="DD/MM/YYYY"
                value={formValues.expiryDate.value}
                minDate={tomorrow.current()}
                onChange={(newValue) => {
                  setFormValues((prev) => ({
                    ...prev,
                    expiryDate: { value: newValue, error: false },
                  }));
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
                  />
                )}
              />
            </Section>

            {/* Submit */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="btn-gradient px-10 py-4 text-base disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z" />
                    </svg>
                    Uploading…
                  </>
                ) : (
                  "List My Coupon"
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

function Section({ icon, title, children }) {
  return (
    <div className="bg-white rounded-2xl shadow-card border border-slate-100 p-6">
      <h3 className="font-bold text-slate-900 mb-5 flex items-center gap-2">
        <span className="w-7 h-7 rounded-lg bg-primary-50 flex items-center justify-center text-base">
          {icon}
        </span>
        {title}
      </h3>
      {children}
    </div>
  );
}

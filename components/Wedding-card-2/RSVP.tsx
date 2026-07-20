"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

type AttendanceState = "accept" | "decline" | null;

interface RSVPFormValues {
  name: string;
  phone: string;
  attendance: AttendanceState;
  guestsCount: number;
  dietary: string;
  wishes: string;
}

export default function RSVP() {
  const shouldReduceMotion = useReducedMotion();
  const [form, setForm] = useState<RSVPFormValues>({
    name: "",
    phone: "",
    attendance: null,
    guestsCount: 1,
    dietary: "no_preference",
    wishes: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof RSVPFormValues, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Stepper handlers
  const handleIncrement = () => {
    if (form.guestsCount < 10) {
      setForm((prev) => ({ ...prev, guestsCount: prev.guestsCount + 1 }));
    }
  };

  const handleDecrement = () => {
    if (form.guestsCount > 1) {
      setForm((prev) => ({ ...prev, guestsCount: prev.guestsCount - 1 }));
    }
  };

  // Field change handler
  const handleChange = (
    field: keyof RSVPFormValues,
    value: string | number | AttendanceState
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  // Form submission handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Partial<Record<keyof RSVPFormValues, string>> = {};
    if (!form.name.trim()) {
      newErrors.name = "Please enter your name";
    }
    if (!form.phone.trim()) {
      newErrors.phone = "Please enter your phone number";
    } else if (form.phone.replace(/\D/g, "").length < 10) {
      newErrors.phone = "Please enter a valid 10-digit number";
    }
    if (!form.attendance) {
      newErrors.attendance = "Please select your attendance status";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // Find first error and scroll to it if necessary
      return;
    }

    setIsSubmitting(true);

    // Mock API submission timeout
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <section className="relative w-full h-[150vh]  px-4 bg-[#fbf4e6] z-30 flex flex-col items-center justify-center mt-10">
      {/* RSVP Main Container */}
      <div className="w-full max-w-[400px] bg-[#FAF6EE] border-[3px] border-double border-[#A36662]/20 rounded-[32px] p-6 sm:p-7 shadow-[0_20px_50px_rgba(163,102,98,0.1)] relative overflow-hidden">
        {/* Background Sparkles Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#D4AF37]/5 via-transparent to-transparent pointer-events-none" />

        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.form
              key="rsvp-form"
              onSubmit={handleSubmit}
              initial={shouldReduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col gap-5 w-full relative z-10"
            >
              {/* Title Section */}
              <div className="text-center pb-2 select-none">
                {/* Decorative Star */}
                <div className="flex justify-center mb-2">
                  <svg className="w-5 h-5 text-[#D4AF37] fill-[#D4AF37] filter drop-shadow-[0_1px_3px_rgba(212,175,55,0.2)]" viewBox="0 0 24 24">
                    <path d="M12 2l2.4 7.2L21.6 12 14.4 14.4 12 21.6 9.6 14.4 2.4 12 9.6 9.6z" />
                  </svg>
                </div>
                <h2 className="font-alex-brush text-[3.2rem] text-[#7A1C2C] leading-none" style={{ fontFamily: "var(--font-alex-brush), cursive" }}>
                  R.S.V.P
                </h2>
                <p className="text-[0.65rem] sm:text-xs font-sans text-[#8F5E52] tracking-[0.25em] uppercase mt-2 font-bold" style={{ fontFamily: "var(--font-arimo), sans-serif" }}>
                  Kindly respond by June 15, 2028
                </p>
              </div>

              {/* 1. Name Input */}
              <div className="flex flex-col">
                <label className="font-sans text-[0.65rem] uppercase tracking-wider text-[#A36662] font-bold mb-1 select-none">
                  Full Name
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder="Enter your name"
                  className="w-full bg-transparent border-b border-[#A36662]/20 focus:border-[#7A1C2C] focus:outline-none py-1.5 font-sans text-sm text-[#2c2a29] transition-all duration-300 placeholder-[#A36662]/45"
                  style={{ fontFamily: "var(--font-arimo), sans-serif" }}
                />
                {errors.name && (
                  <span className="text-[0.65rem] text-[#7A1C2C] font-bold mt-1">
                    {errors.name}
                  </span>
                )}
              </div>

              {/* 2. Phone Input */}
              <div className="flex flex-col">
                <label className="font-sans text-[0.65rem] uppercase tracking-wider text-[#A36662] font-bold mb-1 select-none">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  placeholder="Enter phone number"
                  className="w-full bg-transparent border-b border-[#A36662]/20 focus:border-[#7A1C2C] focus:outline-none py-1.5 font-sans text-sm text-[#2c2a29] transition-all duration-300 placeholder-[#A36662]/45"
                  style={{ fontFamily: "var(--font-arimo), sans-serif" }}
                />
                {errors.phone && (
                  <span className="text-[0.65rem] text-[#7A1C2C] font-bold mt-1">
                    {errors.phone}
                  </span>
                )}
              </div>

              {/* 3. Attendance Status Toggle */}
              <div className="flex flex-col gap-2">
                <label className="font-sans text-[0.65rem] uppercase tracking-wider text-[#A36662] font-bold select-none">
                  Will You Attend?
                </label>
                <div className="grid grid-cols-2 gap-3 mt-1">
                  <button
                    type="button"
                    onClick={() => handleChange("attendance", "accept")}
                    className={`py-3 px-2 rounded-2xl border font-sans font-bold text-xs uppercase tracking-wider transition-all duration-300 select-none ${form.attendance === "accept"
                      ? "bg-[#7A1C2C] text-[#FAF6EE] border-[#7A1C2C] shadow-md shadow-[#7A1C2C]/10"
                      : "bg-white/40 text-[#8F5E52] border-[#A36662]/20 hover:border-[#7A1C2C]/50"
                      }`}
                    style={{ fontFamily: "var(--font-arimo), sans-serif" }}
                  >
                    Joyfully Accept
                  </button>

                  <button
                    type="button"
                    onClick={() => handleChange("attendance", "decline")}
                    className={`py-3 px-2 rounded-2xl border font-sans font-bold text-xs uppercase tracking-wider transition-all duration-300 select-none ${form.attendance === "decline"
                      ? "bg-[#7A1C2C] text-[#FAF6EE] border-[#7A1C2C] shadow-md shadow-[#7A1C2C]/10"
                      : "bg-white/40 text-[#8F5E52] border-[#A36662]/20 hover:border-[#7A1C2C]/50"
                      }`}
                    style={{ fontFamily: "var(--font-arimo), sans-serif" }}
                  >
                    Regretfully Decline
                  </button>
                </div>
                {errors.attendance && (
                  <span className="text-[0.65rem] text-[#7A1C2C] font-bold mt-1 text-center">
                    {errors.attendance}
                  </span>
                )}
              </div>

              {/* 4. Conditional Content: Stepper & Diet preferences */}
              <motion.div
                initial={false}
                animate={{
                  height: form.attendance === "accept" ? "auto" : 0,
                  opacity: form.attendance === "accept" ? 1 : 0,
                }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="overflow-hidden w-full flex flex-col gap-4"
              >
                {/* Stepper Count */}
                <div className="flex flex-col">
                  <label className="font-sans text-[0.65rem] uppercase tracking-wider text-[#A36662] font-bold mb-1 select-none">
                    Number of Guests
                  </label>
                  <div className="flex items-center gap-4 bg-white/40 border border-[#A36662]/20 px-3 py-1.5 rounded-xl mt-1 w-fit">
                    <button
                      type="button"
                      onClick={handleDecrement}
                      disabled={form.guestsCount <= 1}
                      className="w-6 h-6 rounded-full border border-[#A36662]/30 hover:border-[#7A1C2C] text-[#7A1C2C] disabled:opacity-40 font-bold flex items-center justify-center bg-white shadow-sm active:scale-95 transition-transform"
                    >
                      -
                    </button>
                    <span className="font-sans font-bold text-sm text-[#7A1C2C] w-6 text-center select-none">
                      {form.guestsCount}
                    </span>
                    <button
                      type="button"
                      onClick={handleIncrement}
                      disabled={form.guestsCount >= 10}
                      className="w-6 h-6 rounded-full border border-[#A36662]/30 hover:border-[#7A1C2C] text-[#7A1C2C] disabled:opacity-40 font-bold flex items-center justify-center bg-white shadow-sm active:scale-95 transition-transform"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Dietary Preference Dropdown */}
                <div className="flex flex-col">
                  <label className="font-sans text-[0.65rem] uppercase tracking-wider text-[#A36662] font-bold mb-1 select-none">
                    Dietary Preference
                  </label>
                  <select
                    value={form.dietary}
                    onChange={(e) => handleChange("dietary", e.target.value)}
                    className="w-full bg-white/50 border border-[#A36662]/25 rounded-xl px-3 py-2 font-sans text-xs text-[#2c2a29] focus:outline-none focus:border-[#7A1C2C] transition-colors"
                    style={{ fontFamily: "var(--font-arimo), sans-serif" }}
                  >
                    <option value="no_preference">No Preference</option>
                    <option value="vegetarian">Vegetarian</option>
                    <option value="non_vegetarian">Non-Vegetarian</option>
                    <option value="vegan">Vegan</option>
                    <option value="gluten_free">Gluten-Free</option>
                  </select>
                </div>
              </motion.div>

              {/* 5. Special Notes / Wishes */}
              <div className="flex flex-col">
                <label className="font-sans text-[0.65rem] uppercase tracking-wider text-[#A36662] font-bold mb-1 select-none">
                  Warm Wishes / Special Notes
                </label>
                <textarea
                  value={form.wishes}
                  onChange={(e) => handleChange("wishes", e.target.value)}
                  placeholder="Leave a message for the couple..."
                  rows={3}
                  className="w-full bg-white/50 border border-[#A36662]/20 rounded-2xl px-3 py-2 font-sans text-xs text-[#2c2a29] focus:outline-none focus:border-[#7A1C2C] transition-colors resize-none placeholder-[#A36662]/45"
                  style={{ fontFamily: "var(--font-arimo), sans-serif" }}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-[#7A1C2C] hover:bg-[#590A2E] disabled:bg-[#7A1C2C]/50 text-[#FAF6EE] font-sans font-bold uppercase tracking-[0.2em] text-[0.7rem] rounded-full shadow-lg shadow-[#7A1C2C]/15 transition-all duration-300 transform active:scale-[0.98] select-none flex items-center justify-center gap-2.5 mt-2"
                style={{ fontFamily: "var(--font-arimo), sans-serif" }}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-3.5 w-3.5 text-[#FAF6EE]" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Processing...
                  </>
                ) : (
                  "Send Response"
                )}
              </button>
            </motion.form>
          ) : (
            // Success response screen
            <motion.div
              key="rsvp-success"
              initial={shouldReduceMotion ? false : { scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="flex flex-col items-center justify-center text-center py-10 w-full relative z-10 select-none"
            >
              {/* Success Badge */}
              <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center shadow-inner mb-6">
                <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>

              <h2 className="font-alex-brush text-[3.2rem] text-[#7A1C2C] leading-none mb-3" style={{ fontFamily: "var(--font-alex-brush), cursive" }}>
                Thank You!
              </h2>

              <p className="font-sans text-xs font-bold text-[#8F5E52] tracking-wider uppercase mb-5" style={{ fontFamily: "var(--font-arimo), sans-serif" }}>
                Response Received
              </p>

              <div className="w-full border-t border-b border-[#A36662]/10 py-5 my-2 px-3">
                <p className="font-sans text-xs text-[#2c2a29] leading-relaxed" style={{ fontFamily: "var(--font-arimo), sans-serif" }}>
                  {form.attendance === "accept" ? (
                    <>
                      We are thrilled to celebrate with you!
                      <br />
                      Your seats have been joyfully reserved.
                    </>
                  ) : (
                    <>
                      We will miss you at the celebration, but thank you
                      <br />
                      for sending along your warm wishes.
                    </>
                  )}
                </p>
              </div>

              {/* Reset response button */}
              <button
                type="button"
                onClick={() => {
                  setForm({
                    name: "",
                    phone: "",
                    attendance: null,
                    guestsCount: 1,
                    dietary: "no_preference",
                    wishes: "",
                  });
                  setIsSubmitted(false);
                }}
                className="mt-6 font-sans text-[0.65rem] tracking-[0.2em] font-bold text-[#A36662] uppercase border-b border-[#A36662]/30 hover:border-[#7A1C2C] pb-0.5 hover:text-[#7A1C2C] transition-all"
                style={{ fontFamily: "var(--font-arimo), sans-serif" }}
              >
                Change Response
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

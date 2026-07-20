"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Gift, X, Loader2, CheckCircle2 } from "lucide-react";

// Import all subcomponents locally
import Hero from "./Hero";
import IntroStory from "./IntroStory";
import SaveTheDate from "./SaveTheDate";
import Countdown from "./Countdown";
import Gallery from "./Gallery";
import Venue from "./Venue";
import Festivities from "./Festivities";
import RSVP from "./RSVP";
import Footer from "./Footer";
import FloatingControls from "./FloatingControls";
import FlowerPetals from "./FlowerPetals";
import ScrollReveal from "./ScrollReveal";
import ShlokaLoader from "./ShlokaLoader";
import SmoothScroll from "./SmoothScroll";

interface WeddingCardPageProps {
  data?: any;
}

export default function WeddingCardPage({ data }: WeddingCardPageProps) {
  const [isRevealed, setIsRevealed] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const [showDahejModal, setShowDahejModal] = useState(false);

  // Shagun Form States
  const [senderName, setSenderName] = useState("");
  const [amount, setAmount] = useState("");
  const [txnId, setTxnId] = useState("");
  const [shagunMessage, setShagunMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const bride = data?.brideName || "Meenal";
  const groom = data?.groomName || "Avinash";

  const decryptedUpi = data?.raw_upi_id || "shagun@upi";
  const decryptedQr = data?.raw_qr_code_url || "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=300";

  useEffect(() => {
    if (!showLoader) return;

    // Lock scrolling initially for on-load screen
    if (typeof window !== "undefined" && (window as any).lenis) {
      (window as any).lenis.stop();
    }
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [showLoader]);

  const handleEnter = () => {
    setShowLoader(false);
    setTimeout(() => {
      if (typeof window !== "undefined" && (window as any).lenis) {
        (window as any).lenis.start();
      }
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }, 2000);
  };

  const handleShagunSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName || !amount || !txnId) {
      setError("Please fill in all required fields.");
      return;
    }

    setError("");
    setLoading(true);

    // Simulate successful submission
    setTimeout(() => {
      setSuccess(true);
      setLoading(false);
      setTimeout(() => {
        setShowDahejModal(false);
        setSuccess(false);
        setAmount("");
        setTxnId("");
        setShagunMessage("");
      }, 2000);
    }, 1000);
  };

  return (
    <SmoothScroll>
      <main className="w-full min-h-screen bg-[#FAF4EF] flex flex-col items-center justify-start overflow-y-auto">
        <div className="w-full max-w-[480px] shadow-[0_0_60px_rgba(0,0,0,0.75)] relative bg-[#FAF4EF] flex flex-col min-h-screen">
          <AnimatePresence>
            {showLoader && <ShlokaLoader onEnter={handleEnter} />}
          </AnimatePresence>

          <Hero data={data} />

          <ScrollReveal animation="fade-in" duration={1.2} className="w-full h-screen">
            <IntroStory data={data} />
          </ScrollReveal>

          <SaveTheDate onAllRevealed={() => setIsRevealed(true)} data={data} />

          <Countdown active={isRevealed} data={data} />

          <Gallery data={data} />

          <Venue data={data} />

          <Festivities data={data} />

          {/* Shagun Button (Digital Dahej) */}
          {data?.dahej_enabled !== false && (
            <section className="w-full bg-[#FAF4EF] py-16 px-6 border-t border-[#A36662]/5 flex flex-col items-center justify-center relative z-10 select-none">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="w-full max-w-[340px] sm:max-w-[380px] text-center flex flex-col items-center gap-4"
              >
                <span className="font-sans text-[0.65rem] uppercase tracking-[0.25em] text-[#D4AF37] font-bold">
                  Shagun blessings
                </span>
                <h2 className="font-distrela text-3xl sm:text-4xl text-[#7A1C2C] font-bold tracking-wide">
                  Digital Shagun
                </h2>
                <p className="font-cormorant italic text-base text-[#8F5E52] leading-relaxed mb-4">
                  If you wish to send Shagun / Blessings to the couple digitally, you can securely make a UPI transaction here.
                </p>

                <button
                  onClick={() => setShowDahejModal(true)}
                  className="w-full bg-gradient-to-r from-[#7A1C2C] to-[#A36662] hover:from-[#601220] hover:to-[#ba7a76] text-white font-sans text-xs font-bold uppercase tracking-[0.25em] py-4 px-6 rounded-xl shadow-lg flex items-center justify-center gap-2.5 transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
                >
                  <Gift className="h-4.5 w-4.5 text-[#D4AF37]" /> Pay Digital Shagun
                </button>
              </motion.div>
            </section>
          )}

          <RSVP data={data} />

          <Footer data={data} />

          <FloatingControls data={data} />

          <FlowerPetals />

          {/* Shagun Payment Modal */}
          {showDahejModal && (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-md font-sans">
              <div className="bg-[#FDFAF7] border border-[#A36662]/20 rounded-3xl w-full max-w-sm overflow-hidden shadow-[0_20px_50px_rgba(163,102,98,0.25)] relative animate-in fade-in zoom-in-95 duration-200">
                {/* Modal Header */}
                <div className="bg-[#FAF4EF] p-4.5 border-b border-[#A36662]/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Gift className="h-4.5 w-4.5 text-[#7A1C2C]" />
                    <h3 className="font-bold text-[#7A1C2C] text-sm tracking-wider uppercase">Send Shagun Blessings</h3>
                  </div>
                  <button
                    onClick={() => { setShowDahejModal(false); setError(""); }}
                    className="text-[#A36662] hover:text-[#7A1C2C] transition cursor-pointer"
                  >
                    <X className="h-4.5 w-4.5" />
                  </button>
                </div>

                {/* Success Screen */}
                {success ? (
                  <div className="p-8 text-center flex flex-col items-center justify-center space-y-4">
                    <CheckCircle2 className="h-12 w-12 text-emerald-600 animate-bounce" />
                    <h4 className="text-lg font-bold text-[#7A1C2C] font-serif">Blessings Logged</h4>
                    <p className="text-[#8F5E52] text-xs max-w-xs leading-normal italic font-serif">
                      Your mock Shagun blessing of ₹{amount || "1001"} has been simulated successfully.
                    </p>
                  </div>
                ) : (
                  <div className="p-5 overflow-y-auto max-h-[75vh] space-y-5">
                    {error && (
                      <div className="bg-rose-50 border border-rose-100 rounded-lg p-2.5 text-rose-700 text-[11px] flex gap-2">
                        <span>{error}</span>
                      </div>
                    )}

                    {/* Display Payment Info */}
                    <div className="bg-[#FAF4EF] rounded-xl p-3.5 border border-[#A36662]/10 flex flex-col items-center justify-center gap-2.5">
                      {decryptedQr ? (
                        <div className="p-1.5 bg-white rounded-lg inline-block border border-neutral-100">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={decryptedQr}
                            alt="UPI QR Code"
                            className="w-28 h-28 object-contain"
                          />
                        </div>
                      ) : (
                        <div className="w-28 h-28 bg-[#FDFAF7] rounded-lg border border-dotted border-[#A36662]/30 flex items-center justify-center text-[10px] text-[#A36662]/60 text-center p-2 font-mono">
                          No QR Code Set
                        </div>
                      )}

                      {decryptedUpi && (
                        <div className="text-center">
                          <p className="text-[10px] text-[#A36662]/65">Pay directly using UPI:</p>
                          <p className="text-xs font-semibold font-mono text-[#7A1C2C] mt-0.5 select-all">{decryptedUpi}</p>
                        </div>
                      )}
                    </div>

                    {/* Contribution Form */}
                    <form onSubmit={handleShagunSubmit} className="space-y-3.5 text-left">
                      <div>
                        <label className="block text-[10px] font-semibold text-[#A36662] uppercase tracking-wider mb-1">
                          Your Name <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={senderName}
                          onChange={(e) => setSenderName(e.target.value)}
                          placeholder="e.g. Aunt Seema & Uncle Mahesh"
                          className="w-full bg-white border border-[#A36662]/20 focus:border-[#7A1C2C] rounded-lg py-2 px-3 text-[#2c2a29] placeholder-neutral-300 text-xs outline-none transition"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-semibold text-[#A36662] uppercase tracking-wider mb-1">
                            Amount (INR) *
                          </label>
                          <input
                            type="number"
                            required
                            min="1"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="₹ 2100"
                            className="w-full bg-white border border-[#A36662]/20 focus:border-[#7A1C2C] rounded-lg py-2 px-3 text-[#2c2a29] placeholder-neutral-300 text-xs outline-none transition font-semibold"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-semibold text-[#A36662] uppercase tracking-wider mb-1">
                            Txn Ref ID *
                          </label>
                          <input
                            type="text"
                            required
                            value={txnId}
                            onChange={(e) => setTxnId(e.target.value)}
                            placeholder="e.g. 308947..."
                            className="w-full bg-white border border-[#A36662]/20 focus:border-[#7A1C2C] rounded-lg py-2 px-3 text-[#2c2a29] placeholder-neutral-300 text-xs outline-none transition font-mono"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-semibold text-[#A36662] uppercase tracking-wider mb-1">
                          Congratulatory Message
                        </label>
                        <textarea
                          rows={2}
                          value={shagunMessage}
                          onChange={(e) => setShagunMessage(e.target.value)}
                          placeholder="Wishing you a lifetime of love!"
                          className="w-full bg-white border border-[#A36662]/20 focus:border-[#7A1C2C] rounded-lg py-2 px-3 text-[#2c2a29] placeholder-neutral-300 text-xs outline-none transition resize-none text-left"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full mt-3 bg-gradient-to-r from-[#7A1C2C] to-[#A36662] text-white font-bold py-2.5 px-4 rounded-lg shadow-lg flex items-center justify-center gap-1.5 cursor-pointer text-xs tracking-wider"
                      >
                        {loading ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          "Submit Blessing Details"
                        )}
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </SmoothScroll>
  );
}

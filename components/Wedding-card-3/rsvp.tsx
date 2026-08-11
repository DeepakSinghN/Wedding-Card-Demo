"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import PhotoTopRight from "./Collage-section-resources/photo-top-right.jpg";

gsap.registerPlugin(ScrollTrigger);

export default function RSVP() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(motionQuery.matches);
    const motionListener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    motionQuery.addEventListener("change", motionListener);
    return () => motionQuery.removeEventListener("change", motionListener);
  }, []);

  useGSAP(
    () => {
      if (prefersReducedMotion) return;

      const triggerElement = sectionRef.current;
      const cardElement = cardRef.current;
      if (!triggerElement || !cardElement) return;

      const scrollerElement = triggerElement.closest("#card-scroll-container");
      if (!scrollerElement) return;

      // Set starting states
      gsap.set(cardElement, { opacity: 0, y: 40, scale: 0.96 });
      gsap.set(".rsvp-photo", { scale: 1.1 });
      gsap.set(".rsvp-animate-item", { opacity: 0, y: 15 });
      gsap.set(".rsvp-submit-btn", { opacity: 0, y: 15 });

      // Create entrance timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerElement,
          scroller: scrollerElement,
          start: "top 75%",
          toggleActions: "play none none none"
        }
      });

      // 1. Card Entrance
      tl.to(cardElement, { 
        opacity: 1, 
        y: 0, 
        scale: 1, 
        duration: 0.6, 
        ease: "power3.out" 
      })
      // 2. Photo settle (Ken Burns)
      .to(".rsvp-photo", { 
        scale: 1, 
        duration: 1.0, 
        ease: "power2.out" 
      }, 0.0) // runs in parallel with card entrance
      // 3. Staggered form fields
      .to(".rsvp-animate-item", {
        opacity: 1,
        y: 0,
        stagger: 0.08,
        duration: 0.4,
        ease: "power2.out"
      }, "-=0.4")
      // 4. Submit button slide in
      .to(".rsvp-submit-btn", {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out"
      }, "-=0.1");

      // 5. Submit Button Idle Pulse Animation
      gsap.to(".rsvp-submit-btn", {
        boxShadow: "0 4px 20px rgba(157,44,45,0.4)",
        repeat: -1,
        yoyo: true,
        duration: 1.5,
        ease: "sine.inOut",
        delay: 1.2
      });
    },
    { scope: sectionRef, dependencies: [prefersReducedMotion] }
  );

  // Success state entrance
  useGSAP(
    () => {
      if (!isSubmitted) return;
      gsap.fromTo(
        ".rsvp-success-state",
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)" }
      );
    },
    { scope: sectionRef, dependencies: [isSubmitted] }
  );

  // Input Focus Feedback
  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    gsap.to(e.target, { 
      borderColor: "rgba(157, 44, 45, 0.4)", 
      backgroundColor: "#ffffff", 
      boxShadow: "0 0 0 1px rgba(157, 44, 45, 0.2)",
      duration: 0.2 
    });
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    gsap.to(e.target, { 
      borderColor: "rgba(243, 244, 246, 1)", 
      backgroundColor: "rgba(249, 250, 251, 1)", 
      boxShadow: "none",
      duration: 0.2 
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen flex-shrink-0 bg-[#FCEDEC] select-none overflow-hidden flex flex-col items-center justify-center p-4 text-left"
    >
      {/* Elevated Card */}
      <div
        ref={cardRef}
        className="relative w-[92%] max-w-[360px] h-[92%] bg-white rounded-[24px] shadow-[0_12px_36px_rgba(155,75,50,0.12)] overflow-hidden flex flex-col z-20"
      >
        {/* Photo Zone */}
        <div className="relative w-full h-[40%] overflow-hidden">
          <Image
            src={PhotoTopRight}
            alt="Couple RSVP Header"
            fill
            priority
            className="rsvp-photo object-cover"
          />
          {/* Back Button */}
          <button 
            type="button"
            onClick={() => {
              const scroller = sectionRef.current?.closest("#card-scroll-container");
              if (scroller) {
                scroller.scrollBy({ top: -window.innerHeight, behavior: "smooth" });
              }
            }}
            className="absolute top-5 left-5 flex items-center gap-1 text-white font-semibold text-[3.8cqi] drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] active:scale-95 transition-all z-20"
          >
            <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
        </div>

        {/* White Form Zone */}
        <div className="relative w-full flex-1 bg-white rounded-t-[24px] mt-[-24px] pt-6 px-6 pb-6 flex flex-col justify-between z-10 overflow-hidden">
          {isSubmitted ? (
            /* Success state */
            <div className="rsvp-success-state absolute inset-0 bg-white flex flex-col items-center justify-center p-6 text-center z-30">
              <div className="w-16 h-16 bg-[#9D2C2D]/10 rounded-full flex items-center justify-center mb-4 text-[#9D2C2D]">
                <svg className="w-8 h-8 stroke-current stroke-2 fill-none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-[6cqi] text-[#9D2C2D] font-normal mb-2" style={{ fontFamily: "Georgia, serif" }}>
                You&apos;re in!
              </h3>
              <p className="text-[3.6cqi] text-gray-600 max-w-[80%]">
                Thank you for letting us know. We look forward to celebrating with you!
              </p>
            </div>
          ) : (
            <div className="w-full h-full flex flex-col justify-between">
              <div className="w-full h-full flex flex-col justify-between">
                <div>
                  {/* eyebrow tag */}
                  <div className="rsvp-animate-item flex items-center gap-1.5 mb-1.5">
                    <span className="w-1.5 h-1.5 bg-[#9D2C2D] rotate-45" />
                    <span className="text-[2.8cqi] tracking-wider uppercase text-[#9D2C2D]/70 font-semibold" style={{ fontFamily: "Georgia, serif" }}>
                      Wedding RSVP
                    </span>
                  </div>

                  {/* Couple Names */}
                  <h3 className="rsvp-animate-item text-[5.2cqi] text-[#9D2C2D] font-normal leading-tight mb-4" style={{ fontFamily: "Georgia, serif" }}>
                    Daniel & Maria
                  </h3>

                  {/* Form Fields */}
                  <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
                    {/* Your Name */}
                    <div className="rsvp-animate-item flex flex-col gap-1">
                      <label className="text-[3cqi] font-semibold text-gray-600 tracking-wide">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Your first & last name"
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-[3.2cqi] text-gray-800 placeholder-gray-400 focus:outline-none transition-all"
                      />
                    </div>

                    {/* Your Email */}
                    <div className="rsvp-animate-item flex flex-col gap-1">
                      <label className="text-[3cqi] font-semibold text-gray-600 tracking-wide">
                        Your Email
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="Your email address here"
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-[3.2cqi] text-gray-800 placeholder-gray-400 focus:outline-none transition-all"
                      />
                    </div>

                    {/* Double Row */}
                    <div className="rsvp-animate-item grid grid-cols-2 gap-3">
                      {/* Contact Number */}
                      <div className="flex flex-col gap-1">
                        <label className="text-[3cqi] font-semibold text-gray-600 tracking-wide">
                          Contact Number
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="(888) 888-8888"
                          onFocus={handleFocus}
                          onBlur={handleBlur}
                          className="w-full px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-[3.2cqi] text-gray-800 placeholder-gray-400 focus:outline-none transition-all"
                        />
                      </div>

                      {/* Bringing +1 */}
                      <div className="flex flex-col gap-1">
                        <label className="text-[3cqi] font-semibold text-gray-600 tracking-wide">
                          Bringing +1?
                        </label>
                        <div className="relative">
                          <select
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            className="w-full px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-[3.2cqi] text-gray-800 focus:outline-none appearance-none cursor-pointer transition-all"
                          >
                            <option value="no">No</option>
                            <option value="yes">Yes</option>
                          </select>
                          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="rsvp-submit-btn w-full mt-2 py-2.5 bg-[#9D2C2D] hover:bg-[#862425] text-white font-semibold rounded-xl text-[3.4cqi] tracking-wide transition-all active:scale-[0.98] duration-200"
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

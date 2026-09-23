"use client";

import Image from "next/image";
import OurMissionImage from "@/assets/HeroBannerSection/OurMition.jpg";

const missionPoints = [
  "Direct access to UEFA-licensed coaches",
  "Verified trials with professional clubs",
  "Comprehensive player development plans",
  "No hidden fees or fake agents",
];

const OurMission = () => {
  return (
    <section id="mission" className="relative py-16 md:py-24 bg-[#0a0a0a] text-white overflow-hidden flex items-center justify-center min-h-screen">
      <div className="w-full xl:container mx-auto px-2">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Column - Image with floating badge & red ambient glow */}
          <div className="relative w-full order-2 lg:order-1 mt-10 lg:mt-0">
            {/* Soft centered red ambient shade */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] h-[85%] bg-red-600/22 blur-[85px] rounded-full pointer-events-none" />

            {/* Floating Verified Platform badge */}
            <div className="absolute top-7 -left-4 sm:top-9 sm:-left-6 z-20 bg-[#121212] border border-zinc-800 rounded-xl px-5 py-4 shadow-[0_12px_40px_rgba(0,0,0,0.8)] flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-red-950/40 border border-red-900/50 flex items-center justify-center shrink-0">
                <svg
                  className="w-5 h-5 text-red-600"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-white text-base font-bold leading-tight">
                  Verified Platform
                </span>
                <span className="text-zinc-400 text-sm font-normal mt-0.5">
                  Trusted by 200+ Clubs
                </span>
              </div>
            </div>

            {/* Main Image */}
            <div className="relative z-10 rounded-2xl overflow-hidden border border-zinc-800/80 shadow-[0_0_45px_rgba(220,38,38,0.18),0_20px_40px_rgba(0,0,0,0.8)] bg-zinc-900">
              <Image
                src={OurMissionImage}
                alt="Football tactical analysis and scouting setup"
                className="w-full h-[470px] sm:h-[550px] lg:h-[600px] xl:h-[630px] object-cover rounded-2xl block opacity-90"
                priority
              />
            </div>
          </div>

          {/* Right Column - Mission details */}
          <div className="flex flex-col items-start space-y-6 md:space-y-7 order-1 lg:order-2">
            {/* Pill Badge */}
            <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-red-900/60 bg-transparent">
              <span className="text-red-600 text-xs font-bold tracking-widest uppercase">
                OUR MISSION
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-black text-white tracking-tight uppercase leading-[1.15]">
              WE BRIDGE THE GAP BETWEEN{" "}
              <span className="text-red-600">TALENT</span> AND{" "}
              <span className="text-red-600">OPPORTUNITY</span>
            </h2>

            {/* Description */}
            <p className="text-zinc-400 text-base md:text-lg leading-relaxed max-w-xl">
              The traditional scouting system is broken. Thousands of talented
              players slip through the cracks every year because they lack the
              right connections or geographical advantage. Evolution Hub
              democratizes professional football recruitment. We put your talent
              directly in front of the decision-makers.
            </p>

            {/* Checklist */}
            <div className="space-y-4 pt-2">
              {missionPoints.map((point, index) => (
                <div key={index} className="flex items-center gap-3.5">
                  <svg
                    className="w-[22px] h-[22px] text-red-600 shrink-0"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                  <span className="text-zinc-300 text-base font-normal">
                    {point}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <button
                type="button"
                className="bg-white hover:bg-zinc-200 text-black font-bold text-base px-8 py-3.5 rounded-md transition-colors duration-200 shadow-sm cursor-pointer"
              >
                Read Our Full Story
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default OurMission;
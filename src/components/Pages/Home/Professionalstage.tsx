"use client";

import Image from "next/image";
import ProfessionalstageImage from "@/assets/HeroBannerSection/player-action.jpg";

const steps = [
  {
    title: "Build Your Profile",
    desc: "Create a comprehensive digital CV. Add your physical metrics, playing history, position details, and most importantly, your highlight reels.",
  },
  {
    title: "Get Evaluated",
    desc: "Our network of UEFA-licensed coaches analyzes your footage, provides technical feedback, and gives you a certified rating that scouts trust.",
  },
  {
    title: "Connect & Sign",
    desc: "Your verified profile is pushed to our network of 200+ professional clubs. Engage in direct conversations with scouts and secure your trial.",
  },
];

const Professionalstage = () => {
  return (
    <section id="path" className="relative py-16 md:py-20 text-white overflow-hidden flex items-center justify-center">
      <div className="w-full xl:container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Column - Image with Match Rating badge & red ambient glow */}
          <div className="relative w-full">
            {/* Soft centered red ambient shade */}
            

            {/* Main Image */}
            <div className="relative z-10 rounded-2xl sm:rounded-3xl overflow-hidden border border-zinc-800/80 shadow-[0_0_45px_rgba(220,38,38,0.15),0_20px_40px_rgba(0,0,0,0.8)] bg-zinc-900">
              <Image
                src={ProfessionalstageImage}
                alt="Football tactical analysis and player in action"
                className="w-full h-[500px] sm:h-[600px] lg:h-[700px] object-cover rounded-2xl sm:rounded-3xl block opacity-95"
                priority
              />
            </div>

            {/* Overlapping Match Rating Badge - Bottom Right */}
            <div className="absolute -bottom-6 -right-2 sm:-bottom-8 sm:-right-6 z-20 bg-[#0e0e10]/95 backdrop-blur-md border border-zinc-800/90 rounded-2xl p-4 sm:p-5 shadow-[0_12px_40px_rgba(0,0,0,0.9)] w-[260px] sm:w-[280px]">
              <div className="flex items-center gap-3.5 mb-4">
                <div className="w-12 h-12 rounded-full bg-[#E62429] flex items-center justify-center shrink-0">
                  <span className="text-white text-lg font-extrabold">92</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-white text-[15px] font-bold leading-tight">
                    Match Rating
                  </span>
                  <span className="text-[#E62429] text-[12px] font-semibold mt-0.5">
                    Top 5% of Midfielders
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-zinc-400 text-xs sm:text-sm font-medium">Pass Accuracy</span>
                <span className="text-white text-xs sm:text-sm font-bold">88%</span>
              </div>
              <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full bg-[#E62429] rounded-full w-[88%]"></div>
              </div>
            </div>
          </div>

          {/* Right Column - Timeline Steps */}
          <div className="flex flex-col items-start mt-10 lg:mt-0 lg:pl-6">
            
            {/* Headings */}
            <h2 className="text-[32px] sm:text-[40px] lg:text-[46px] font-black tracking-tight uppercase leading-[1.08] mb-10 sm:mb-12">
              <span className="text-white block">YOUR PATH TO THE</span>
              <span className="text-[#E62429] block">PROFESSIONAL STAGE</span>
            </h2>

            {/* Steps Timeline Container */}
            <div className="flex flex-col w-full">
              {steps.map((step, index) => (
                <div key={index} className="flex gap-5 sm:gap-6 w-full">
                  
                  {/* Timeline Graphic Column */}
                  <div className="flex flex-col items-center">
                    {/* Circle */}
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center shrink-0 border border-zinc-700/80 bg-black">
                      <span className="text-zinc-400 text-xs sm:text-sm font-bold tracking-wider">
                        0{index + 1}
                      </span>
                    </div>
                    
                    {/* Connecting Straight Line matching design */}
                    {index !== steps.length - 1 && (
                      <div className="w-[1px] flex-grow bg-zinc-800 my-2" />
                    )}
                  </div>
                  
                  {/* Step Content */}
                  <div className={`pt-1.5 ${index !== steps.length - 1 ? 'pb-10 sm:pb-12' : ''}`}>
                    <h3 className="text-white text-lg sm:text-[21px] font-bold mb-2 tracking-wide">
                      {step.title}
                    </h3>
                    <p className="text-zinc-400 text-[14px] sm:text-[15px] leading-relaxed max-w-[460px]">
                      {step.desc}
                    </p>
                  </div>

                </div>
              ))}
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
};

export default Professionalstage;
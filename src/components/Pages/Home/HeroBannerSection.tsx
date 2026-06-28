"use client";
/* eslint-disable react/no-unescaped-entities */
import { Play } from "lucide-react";
import Image from "next/image";
import ImageHero from "@/assets/HeroBannerSection/hero.png";

const HeroBannerSection = () => {
  return (
    <div className="responsive-padding relative w-full min-h-[60vh] md:min-h-[80vh] lg:min-h-[95vh] xl:min-h-[100vh] overflow-hidden">
      {/* Background Image with Overlay */}
      
      <div className="absolute inset-0">
        <Image
          src={ImageHero}
          alt="Football stadium"
          fill
          className="object-fill md:animate-[kenBurns_20s_ease-in-out_infinite_alternate]"
          priority
        />
        <div className="absolute inset-0 bg-white/5 animate-[pulse_3s_ease-in-out_infinite]"></div>
      </div>

      {/* Animated Gradient Overlay */}
      {/* <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 via-transparent to-blue-600/20 animate-[gradientShift_8s_ease-in-out_infinite]"></div> */}

      {/* Floating Particles */}
      {/* <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-2 h-2 bg-red-500/30 rounded-full animate-[float1_15s_ease-in-out_infinite]" style={{top: '20%', left: '10%'}}></div>
        <div className="absolute w-3 h-3 bg-white/20 rounded-full animate-[float2_12s_ease-in-out_infinite]" style={{top: '60%', left: '80%'}}></div>
        <div className="absolute w-2 h-2 bg-blue-500/30 rounded-full animate-[float3_18s_ease-in-out_infinite]" style={{top: '40%', right: '15%'}}></div>
        <div className="absolute w-4 h-4 bg-red-500/20 rounded-full animate-[float1_20s_ease-in-out_infinite]" style={{bottom: '30%', left: '70%'}}></div>
      </div> */}

      {/* Content Container */}
      <div className="relative z-10 h-full flex items-center justify-center pt-20 md:pt-28 lg:pt-32 xl:pt-48">
        <div className="w-full md:text-left">
          {/* Small Label */}
          <div className="flex items-center justify-start gap-2 mb-4 md:mb-6 animate-[glitchSlide_0.8s_ease-out]">
            <div className="w-8 h-0.5 bg-red-500 animate-[expandWidth_1.5s_ease-out]"></div>
            <span className="text-white/80 text-sm sm:text-base font-medium tracking-wider animate-[letterSpacing_1s_ease-out]">
              LET'S GO!
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white mb-4 md:mb-6 leading-tight">
            <span className="inline-block animate-[bounceInRotate_1s_ease-out_0.1s_both]">
              VISION
            </span>{" "}
            <span className="inline-block animate-[bounceInRotate_1s_ease-out_0.2s_both]">
              STRIKER
            </span>
            <br className="hidden sm:block" />
            <span className="inline-block animate-[bounceInRotate_1s_ease-out_0.3s_both]">
              WHERE
            </span>{" "}
            <span
              className="inline-block animate-pulse text-white "
              style={{
                textShadow:
                  "0 0 10px #ff0000, 0 0 20px #ff0000, 0 0 30px #ff0000, 0 0 40px #ff0000",
                animation: "bounceInRotate 1s ease-out 0.4s both",
              }}
            >
              AMBITION
            </span>
            <br className="hidden sm:block" />
            <span className="inline-block animate-[bounceInRotate_1s_ease-out_0.5s_both]">
              MEETS
            </span>{" "}
            <span className="inline-block animate-[bounceInRotate_1s_ease-out_0.6s_both]">
              OPPORTUNITY
            </span>
          </h1>

          {/* Description */}
          <p className="text-white/90 text-xs sm:text-base md:text-lg mb-6 md:mb-8 max-w-2xl mx-auto md:mx-0 leading-relaxed animate-[typewriter_2s_ease-out_0.8s_both]">
            FootballConnect is the premier platform connecting players, coaches,
            consultants, and clubs. Upload gameplay videos, receive expert
            feedback, get career guidance, and connect with professional
            opportunities worldwide.
          </p>

          {/* CTA Buttons */}
          <div className="flex justify-start gap-4 mb-10 md:mb-16 animate-[slideUpBounce_0.8s_ease-out_1.2s_both]">
            <button className="bg-red-600 hover:bg-red-700 text-white px-3 md:px-8 py-3 rounded font-semibold transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-red-500/50 hover:-translate-y-1 hover:scale-105 text-sm sm:text-base relative overflow-hidden group">
              <span className="relative z-10">Get Started</span>
              <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-500 transform -skew-x-12 translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
            </button>
            <button className="bg-white/10 hover:bg-white/20 text-white px-3 md:px-8 py-3 rounded font-semibold backdrop-blur-sm transition-all duration-300 border border-white/20 flex items-center gap-2 hover:-translate-y-1 hover:scale-105 hover:border-red-500/50 text-sm sm:text-base group relative overflow-hidden">
              <Play className="w-4 h-4 group-hover:animate-[spin_1s_ease-in-out] transition-transform relative z-10" />
              <span className="relative z-10">Watch Demo</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </button>
          </div>

          {/* Stats Section */}
          <div className="flex justify-start gap-2 md:gap-10 lg:gap-14">
            <div className="text-center md:text-left animate-[popIn_0.6s_cubic-bezier(0.68,-0.55,0.265,1.55)_1.4s_both] hover:animate-[wiggle_0.5s_ease-in-out] cursor-pointer">
              <div className="text-xl md:text-4xl lg:text-5xl font-bold text-white mb-1 relative">
                <span className="inline-block animate-[countUp_2s_ease-out_1.6s_both]">
                  10K+
                </span>
                <div className="absolute -inset-2 bg-red-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="text-white/70 text-xs sm:text-sm font-medium">
                Active Players
              </div>
            </div>
            <div className="text-center md:text-left animate-[popIn_0.6s_cubic-bezier(0.68,-0.55,0.265,1.55)_1.6s_both] hover:animate-[wiggle_0.5s_ease-in-out] cursor-pointer">
              <div className="text-xl md:text-4xl lg:text-5xl font-bold text-white mb-1 relative">
                <span className="inline-block animate-[countUp_2s_ease-out_1.8s_both]">
                  500+
                </span>
                <div className="absolute -inset-2 bg-blue-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="text-white/70 text-xs sm:text-sm font-medium">
                Expert Coaches
              </div>
            </div>
            <div className="text-center md:text-left animate-[popIn_0.6s_cubic-bezier(0.68,-0.55,0.265,1.55)_1.8s_both] hover:animate-[wiggle_0.5s_ease-in-out] cursor-pointer">
              <div className="text-xl md:text-4xl lg:text-5xl font-bold text-white mb-1 relative">
                <span className="inline-block animate-[countUp_2s_ease-out_2s_both]">
                  200+
                </span>
                <div className="absolute -inset-2 bg-green-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="text-white/70 text-xs sm:text-sm font-medium">
                Professional Clubs
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes kenBurns {
          0%,
          100% {
            transform: scale(1) translate(0, 0);
          }
          50% {
            transform: scale(1.1) translate(-2%, -2%);
          }
        }

        @keyframes gradientShift {
          0%,
          100% {
            transform: translateX(0) rotate(0deg);
            opacity: 0.3;
          }
          50% {
            transform: translateX(20%) rotate(5deg);
            opacity: 0.6;
          }
        }

        @keyframes float1 {
          0%,
          100% {
            transform: translate(0, 0);
          }
          33% {
            transform: translate(30px, -50px);
          }
          66% {
            transform: translate(-20px, -80px);
          }
        }

        @keyframes float2 {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(-40px, 60px) scale(1.5);
          }
        }

        @keyframes float3 {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
          50% {
            transform: translate(50px, -40px) rotate(180deg);
          }
        }

        @keyframes glitchSlide {
          0% {
            opacity: 0;
            transform: translateX(-100px);
          }
          60% {
            opacity: 1;
            transform: translateX(10px);
          }
          80% {
            transform: translateX(-5px);
          }
          100% {
            transform: translateX(0);
          }
        }

        @keyframes expandWidth {
          from {
            width: 0;
          }
          to {
            width: 2rem;
          }
        }

        @keyframes letterSpacing {
          from {
            letter-spacing: 1em;
            opacity: 0;
          }
          to {
            letter-spacing: 0.1em;
            opacity: 1;
          }
        }

        @keyframes bounceInRotate {
          0% {
            opacity: 0;
            transform: translateY(-100px) rotate(-15deg) scale(0.5);
          }
          60% {
            opacity: 1;
            transform: translateY(10px) rotate(5deg) scale(1.1);
          }
          80% {
            transform: translateY(-5px) rotate(-2deg) scale(0.95);
          }
          100% {
            transform: translateY(0) rotate(0) scale(1);
          }
        }

        @keyframes typewriter {
          from {
            opacity: 0;
            max-height: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            max-height: 500px;
            transform: translateY(0);
          }
        }

        @keyframes slideUpBounce {
          0% {
            opacity: 0;
            transform: translateY(100px) scale(0.8);
          }
          70% {
            opacity: 1;
            transform: translateY(-10px) scale(1.05);
          }
          100% {
            transform: translateY(0) scale(1);
          }
        }

        @keyframes popIn {
          0% {
            opacity: 0;
            transform: scale(0) rotate(-180deg);
          }
          70% {
            transform: scale(1.2) rotate(10deg);
          }
          100% {
            opacity: 1;
            transform: scale(1) rotate(0);
          }
        }

        @keyframes wiggle {
          0%,
          100% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(-5deg) scale(1.1);
          }
          75% {
            transform: rotate(5deg) scale(1.1);
          }
        }

        @keyframes countUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default HeroBannerSection;

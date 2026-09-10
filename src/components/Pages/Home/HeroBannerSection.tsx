"use client";

import { Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ImageHero from "@/assets/HeroBannerSection/hero.png";
import { useAppDispatch } from "@/redux/hooks";
import { openAuthModal } from "@/redux/features/auth/authSlice";
import { useGetProfileQuery } from "@/redux/features/Profile/Profile";

// 1. Define routing map outside the component to avoid recreation on every render
const ROLE_ROUTES: Record<string, string> = {
  player: "/FootballPlayer",
  coach: "/Coach", // Fixed typo from "/Couch"
  club: "/Club",
  agent: "/agents",
};

// 2. Extract stats data for cleaner JSX mapping
const STAT_ITEMS = [
  {
    value: "10K+",
    label: "Active Players",
    glowColor: "bg-red-500/20",
    containerDelay: "1.4s",
    countDelay: "1.6s",
  },
  {
    value: "500+",
    label: "Expert Coaches",
    glowColor: "bg-blue-500/20",
    containerDelay: "1.6s",
    countDelay: "1.8s",
  },
  {
    value: "200+",
    label: "Professional Clubs",
    glowColor: "bg-green-500/20",
    containerDelay: "1.8s",
    countDelay: "2s",
  },
];

const HeroBannerSection = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { data } = useGetProfileQuery({});
  const user = data?.data;

  // 3. Simplified routing logic
  const handleGetStarted = () => {
    if (user?.role && ROLE_ROUTES[user.role]) {
      router.push(ROLE_ROUTES[user.role]);
    } else {
      dispatch(openAuthModal("signup"));
    }
  };

  return (
    <div className="responsive-padding relative w-full flex items-center min-h-[60vh] md:min-h-[80vh] lg:min-h-[95vh] xl:min-h-[100vh] overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src={ImageHero}
          alt="Football stadium"
          fill
          className="object-cover object-center md:animate-[kenBurns_20s_ease-in-out_infinite_alternate]"
          priority
        />
        <div className="absolute inset-0 bg-white/5 animate-[pulse_3s_ease-in-out_infinite]" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex h-full items-center justify-center pt-20 md:pt-28">
        <div className="w-full md:text-left">
          
          {/* Small Label */}
          <div className="mb-4 flex items-center justify-start gap-2 md:mb-6 animate-[glitchSlide_0.8s_ease-out]">
            <div className="h-0.5 w-8 bg-red-500 animate-[expandWidth_1.5s_ease-out]" />
            <span className="text-sm font-medium tracking-wider text-white/80 sm:text-base animate-[letterSpacing_1s_ease-out]">
              LET&apos;S GO!
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="mb-4 text-lg font-extrabold leading-tight text-white sm:text-3xl md:mb-6 md:text-3xl lg:text-5xl ">
            <span className="inline-block animate-[bounceInRotate_1s_ease-out_0.1s_both]">
              EVOLUTION
            </span>{" "}
            <span className="inline-block animate-[bounceInRotate_1s_ease-out_0.2s_both] mr-1">
              HUB
            </span>
            <br className="hidden sm:block" />
            <span className="inline-block animate-[bounceInRotate_1s_ease-out_0.3s_both]">
              Where FOOTBALL
            </span>{" "}
            <span
              className="inline-block animate-pulse text-white mr-1"
              style={{
                textShadow:
                  "0 0 10px #ff0000, 0 0 20px #ff0000, 0 0 30px #ff0000, 0 0 40px #ff0000",
                animation: "bounceInRotate 1s ease-out 0.4s both",
              }}
            >
              TALENT
            </span>
            <br className="hidden sm:block" />
            <span className="inline-block animate-[bounceInRotate_1s_ease-out_0.5s_both]">
              MEETS REAL
            </span>{" "}
            <span className="inline-block animate-[bounceInRotate_1s_ease-out_0.6s_both]">
              OPPORTUNITY
            </span>
          </h1>

          {/* Description */}
          <p className="mx-auto mb-6 max-w-3xl text-xs leading-relaxed text-white/90 sm:text-base md:mx-0 md:mb-8 md:text-lg animate-[typewriter_2s_ease-out_0.8s_both]">
            Evolution Hub is a professional platform built to empower football
            talent by connecting players with coaches, scouts, agents, clubs, and
            career opportunities worldwide. Players can showcase their skills
            through gameplay videos, receive expert feedback, develop their game,
            access career guidance, and take the next step toward professional
            football.
          </p>

          {/* CTA Buttons */}
          <div className="mb-4 xl:mb-10 flex justify-start gap-4  animate-[slideUpBounce_0.8s_ease-out_1.2s_both]">
            <button
              onClick={handleGetStarted}
              className="group relative cursor-pointer overflow-hidden rounded bg-red-600 px-3  py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-red-700 hover:shadow-2xl hover:shadow-red-500/50 sm:text-base md:px-10 lg:px-12 xl:px-16 gap-4"
            >
              <span className="relative z-10">Get Started</span>
              <div className="absolute inset-0 -skew-x-12 translate-x-full transform bg-gradient-to-r from-red-700 to-red-500 transition-transform duration-500 group-hover:translate-x-0" />
            </button>
            <Link href="/exploreplayersvideo">
              <button className="group relative flex overflow-hidden rounded border border-white/20 bg-white/10 px-3 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:border-red-500/50 hover:bg-white/20 sm:text-base md:px-8 lg:px-16 gap-2 items-center">
                <Play className="relative z-10 h-4 w-4 transition-transform group-hover:animate-[spin_1s_ease-in-out]" />
                <span className="relative z-10">Watch Demo</span>
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              </button>
            </Link>
          </div>

          {/* Stats Section mapped dynamically */}
          <div className="flex justify-start gap-2 md:gap-10 lg:gap-14">
            {STAT_ITEMS.map((stat, index) => (
              <div
                key={index}
                className="cursor-pointer text-center hover:animate-[wiggle_0.5s_ease-in-out] md:text-left"
                style={{
                  animation: `popIn 0.6s cubic-bezier(0.68,-0.55,0.265,1.55) ${stat.containerDelay} both`,
                }}
              >
                <div className="group relative mb-1 text-xl font-bold text-white md:text-2xl lg:text-3xl">
                  <span
                    className="inline-block"
                    style={{ animation: `countUp 2s ease-out ${stat.countDelay} both` }}
                  >
                    {stat.value}
                  </span>
                  <div
                    className={`absolute -inset-2 blur-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${stat.glowColor}`}
                  />
                </div>
                <div className="text-xs font-medium text-white/70 sm:text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes kenBurns {
          0%, 100% { transform: scale(1) translate(0, 0); }
          50% { transform: scale(1.1) translate(-2%, -2%); }
        }
        @keyframes glitchSlide {
          0% { opacity: 0; transform: translateX(-100px); }
          60% { opacity: 1; transform: translateX(10px); }
          80% { transform: translateX(-5px); }
          100% { transform: translateX(0); }
        }
        @keyframes expandWidth {
          from { width: 0; }
          to { width: 2rem; }
        }
        @keyframes letterSpacing {
          from { letter-spacing: 1em; opacity: 0; }
          to { letter-spacing: 0.1em; opacity: 1; }
        }
        @keyframes bounceInRotate {
          0% { opacity: 0; transform: translateY(-100px) rotate(-15deg) scale(0.5); }
          60% { opacity: 1; transform: translateY(10px) rotate(5deg) scale(1.1); }
          80% { transform: translateY(-5px) rotate(-2deg) scale(0.95); }
          100% { transform: translateY(0) rotate(0) scale(1); }
        }
        @keyframes typewriter {
          from { opacity: 0; max-height: 0; transform: translateY(20px); }
          to { opacity: 1; max-height: 500px; transform: translateY(0); }
        }
        @keyframes slideUpBounce {
          0% { opacity: 0; transform: translateY(100px) scale(0.8); }
          70% { opacity: 1; transform: translateY(-10px) scale(1.05); }
          100% { transform: translateY(0) scale(1); }
        }
        @keyframes popIn {
          0% { opacity: 0; transform: scale(0) rotate(-180deg); }
          70% { transform: scale(1.2) rotate(10deg); }
          100% { transform: scale(1) rotate(0); }
        }
        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-5deg) scale(1.1); }
          75% { transform: rotate(5deg) scale(1.1); }
        }
        @keyframes countUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default HeroBannerSection;
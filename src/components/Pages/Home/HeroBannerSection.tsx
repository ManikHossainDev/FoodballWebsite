"use client";

import { Play, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ImageHero from "@/assets/HeroBannerSection/hero.jpg";
import { useAppDispatch } from "@/redux/hooks";
import { openAuthModal } from "@/redux/features/auth/authSlice";
import { useGetProfileQuery } from "@/redux/features/Profile/Profile";

const ROLE_ROUTES: Record<string, string> = {
  player: "/FootballPlayer",
  coach: "/Coach",
  club: "/Club",
  agent: "/agents",
};

const STATS = [
  { value: "10K+", label: "ACTIVE PLAYERS" },
  { value: "500+", label: "EXPERT COACHES" },
  { value: "200+", label: "PROFESSIONAL CLUBS" },
];

const HeroBannerSection = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { data } = useGetProfileQuery({});
  const user = data?.data;

  const handleGetStarted = () => {
    if (user?.role && ROLE_ROUTES[user.role]) {
      router.push(ROLE_ROUTES[user.role]);
    } else {
      dispatch(openAuthModal("signup"));
    }
  };

  return (
    <div className="relative w-full flex flex-col justify-between min-h-[85vh] md:min-h-screen bg-black overflow-hidden pt-20 md:pt-24">
      {/* Background Image with Dark Color and Gradient Overlays */}
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src={ImageHero}
          alt="Football stadium"
          fill
          className="object-cover object-right md:object-center opacity-65"
          priority
        />
        {/* Left side dark gradient to match design */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-transparent" />
        {/* Overall subtle dark tint */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content Container */}
      <div className="w-full xl:container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-2  flex-1 flex flex-col justify-center">
        <div className="max-w-4xl">
          {/* Small Label / Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-950/30 px-3.5 py-1 text-xs font-semibold text-red-500 tracking-wider mb-2">
            <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
            LET&apos;S GO!
          </div>

          {/* Main Heading */}
          <h1 className="mb-6 text-4xl sm:text-6xl md:text-6xl lg:text-7xl xl:text-8xl font-black uppercase tracking-tight text-white leading-[1.04]">
            WHERE
            <br />
            FOOTBALL
            <br />
            TALENT <span className="text-red-600">MEETS</span>
            <br />
            REAL
            <br />
            OPPORTUNITY
          </h1>

          {/* Description */}
          <p className="mb-8 max-w-2xl text-sm sm:text-base md:text-lg xl:text-xl leading-relaxed text-gray-400">
            Evolution Hub is a professional platform built to empower football
            talent by connecting players with coaches, scouts, agents, clubs, and
            career opportunities worldwide. Showcase your skills, receive expert
            feedback, and take the next step.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={handleGetStarted}
              className="inline-flex items-center gap-2 rounded bg-red-600 px-6 py-3.5 text-sm sm:text-base font-semibold text-white shadow-lg transition-colors hover:bg-red-700 cursor-pointer"
            >
              <span>Get Started</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            <Link href="/exploreplayersvideo">
              <button className="inline-flex items-center gap-2 rounded border border-white/20 bg-black/60 px-6 py-3.5 text-sm sm:text-base font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/10 hover:border-white/40 cursor-pointer">
                <Play className="h-4 w-4 fill-white text-white" />
                <span>See How It Works</span>
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Stats Section */}
      <div className="relative z-10 w-full py-5 border-b border-gray-900 bg-gradient-to-b from-transparent via-black/80 to-black">
        <div className="w-full xl:container mx-auto px-4 sm:px-6 lg:px-8 pt-7 md:pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center justify-center py-4 md:py-1 text-center px-4"
              >
                <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                  {stat.value}
                </span>
                <span className="mt-1.5 text-xs sm:text-sm font-semibold uppercase tracking-wider text-gray-400">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBannerSection;
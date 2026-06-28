"use client";

import Link from "next/link";
import {
  FiArrowLeft,
  FiMail,
  FiPhone,
  FiMapPin,
  FiCheck,
  FiX,
  FiAward,
  FiUsers,
} from "react-icons/fi";
import { MdSportsSoccer } from "react-icons/md";
import { BsPlayCircleFill } from "react-icons/bs";
import Image from "next/image";

const coach = {
  name: "Marcus Silva",
  email: "marcussilva@example.com",
  phone: "+12345678910",
  location: "New York, USA",
  club: "FC United Academy",
  experience: "12 Years",
  players: 24,
  tag: "Match Highlights · Oct 3",
  avatar: "/coach-avatar.jpg",
};

const video = {
  title: "Shooting Practice – Match Simulation",
  description:
    "This video shows me practicing my shooting under pressure in match situations. I would like feedback on my accuracy and positioning.",
  duration: "5:32",
  thumbnail: "/soccer-thumbnail.jpg",
};

const focusAreas = [
  "Focus on shooting accuracy and positioning during breakaways.",
  "Improve first-touch control under high-pressure situations.",
  "Work on transition speed from defense to attack.",
];

const CoachDetails = () => {
  return (
    <div className="">

      {/* ── Top Nav ── */}
      <div className="">
        <Link
          href="/Couch"
          className="text-xl md:text-2xl font-bold text-white pt-3 flex items-center space-x-2"
          style={{
            textShadow:
              "0 0 10px #ff0000, 0 0 20px #ff0000, 0 0 30px #ff0000, 0 0 40px #ff0000",
          }}
        >
          <div>
            <FiArrowLeft className="w-6 h-6" />
          </div>
          <div> Video Details </div>
        </Link>
      </div>

      {/* ── Main Grid ── */}
      <div className=" py-8 grid grid-cols-12 gap-6">

        {/* ── LEFT: Coach Card — col-span-3 ── */}
        <div className="col-span-12 lg:col-span-3 bg-[#3F3F3F] rounded-xl overflow-hidden border border-white/5 flex flex-col">

          {/* Avatar */}
          <div className="relative bg-[#222] h-64">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#1a1a1a]" />
            <Image
              src={coach.avatar}
              alt={coach.name}
              fill
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
              className="object-cover opacity-60"
            />
            {/* Fallback icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <MdSportsSoccer className="w-16 h-16 text-white/10" />
            </div>
            
          </div>

          {/* Info */}
          <div className="p-5 flex flex-col gap-4 flex-1">
            <div>
              <h2 className="text-lg font-bold text-white">{coach.name}</h2>
              <p className="text-xs text-white/40 mt-0.5">{coach.club}</p>
              <div className="mt-3 flex flex-col gap-1.5 text-sm text-white/50">
                <span className="flex items-center gap-2">
                  <FiMail className="w-3.5 h-3.5 text-white/30" />
                  {coach.email}
                </span>
                <span className="flex items-center gap-2">
                  <FiPhone className="w-3.5 h-3.5 text-white/30" />
                  {coach.phone}
                </span>
                <span className="flex items-center gap-2">
                  <FiMapPin className="w-3.5 h-3.5 text-white/30" />
                  {coach.location}
                </span>
              </div>
            </div>

            {/* Stat Badges */}
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center gap-2 bg-white/5 rounded-lg px-3 py-2">
                <FiAward className="w-4 h-4 text-[#e53e3e]" />
                <div>
                  <p className="text-[10px] text-white/40 uppercase tracking-wide">Experience</p>
                  <p className="text-xs font-semibold text-white">{coach.experience}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-white/5 rounded-lg px-3 py-2">
                <FiUsers className="w-4 h-4 text-[#e53e3e]" />
                <div>
                  <p className="text-[10px] text-white/40 uppercase tracking-wide">Players</p>
                  <p className="text-xs font-semibold text-white">{coach.players} Active</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-auto flex gap-3">
              <button className="flex-1 flex items-center justify-center gap-2 bg-[#e53e3e] hover:bg-red-500 text-white text-sm font-semibold py-2.5 rounded-lg transition-colors">
                <FiCheck className="w-4 h-4" />
                Accept
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white/70 text-sm font-semibold py-2.5 rounded-lg transition-colors">
                <FiX className="w-4 h-4" />
                Decline
              </button>
            </div>
          </div>
        </div>

        {/* ── CENTER: Video Card — col-span-6 ── */}
        <div className="col-span-12 lg:col-span-6 bg-[#3F3F3F] rounded-xl overflow-hidden border border-white/5 flex flex-col">

          {/* Thumbnail */}
          <div className="relative aspect-video bg-[#222] group cursor-pointer">
            <Image
              src={video.thumbnail}
              alt={video.title}
              fill
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
            <span className="absolute top-3 left-3 bg-black/70 text-white text-xs font-mono px-2 py-0.5 rounded">
              {video.duration}
            </span>
            <div className="absolute inset-0 flex items-center justify-center">
              <BsPlayCircleFill className="w-14 h-14 text-white/80 group-hover:text-white group-hover:scale-110 transition-all drop-shadow-xl" />
            </div>
          </div>

          {/* Video Info */}
          <div className="p-5 flex flex-col gap-2">
            <h3 className="text-base font-bold text-white">{video.title}</h3>
            <p className="text-sm text-white/50 leading-relaxed">{video.description}</p>
          </div>
        </div>

        {/* ── RIGHT: Focus Panel — col-span-3 ── */}
        <div className="col-span-12 lg:col-span-3 rounded-xl   flex flex-col gap-4">
           <div className="bg-[#3F3F3F] p-2 md:p-5 rounded-lg">
            <h4 className="text-sm font-semibold text-white/80 tracking-wide uppercase">
            Areas to Focus on
          </h4>
          <ul className="flex flex-col gap-3">
            {focusAreas.map((area, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#e53e3e] flex-shrink-0" />
                <p className="text-sm text-white/50 leading-relaxed">{area}</p>
              </li>
            ))}
          </ul>
           </div>
        </div>

      </div>
    </div>
  );
};

export default CoachDetails;
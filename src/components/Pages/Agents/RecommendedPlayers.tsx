"use client";

import React from "react"
import user from '@/assets/Authentication/user.jpg'
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

// Type define করো
type PlayerItem = {
  id: number;
  name: string;
  avatar: StaticImageData | string;  
  position: string;
  experience: string;
  preferredClub: string;
};

const RecommendedPlayers = () => {
   const videoReviewData = [
    {
      id: 1,
      name: "Marcus Silva",
      avatar: user,
      position: "Forward",
      experience: "5 years",
      preferredClub: "Barcelona FC"
    },
    {
      id: 2,
      name: "Marcus Silva",
      avatar: user,
      position: "Forward",
      experience: "5 years",
      preferredClub: "Barcelona FC"
    },
    {
      id: 3,
      name: "Marcus Silva",
      avatar: user,
      position: "Forward",
      experience: "5 years",
      preferredClub: "Barcelona FC"
    },
    {
      id: 4,
      name: "Marcus Silva",
      avatar: user,
      position: "Forward",
      experience: "5 years",
      preferredClub: "Barcelona FC"
    },
    {
      id: 5,
      name: "Marcus Silva",
      avatar: user,
      position: "Forward",
      experience: "5 years",
      preferredClub: "Barcelona FC"
    }
  ];

  const consultationsData = [
    {
      id: 1,
      name: "Marcus Silva",
      avatar: user,
      position: "Forward",
      experience: "5 years",
      preferredClub: "Barcelona FC"
    },
    {
      id: 2,
      name: "Marcus Silva",
      avatar: user,
      position: "Forward",
      experience: "5 years",
      preferredClub: "Barcelona FC"
    },
    {
      id: 3,
      name: "Marcus Silva",
      avatar: user,
      position: "Forward",
      experience: "5 years",
      preferredClub: "Barcelona FC"
    },
    {
      id: 4,
      name: "Marcus Silva",
      avatar: user,
      position: "Forward",
      experience: "5 years",
      preferredClub: "Barcelona FC"
    },
    {
      id: 5,
      name: "Marcus Silva",
      avatar: user,
      position: "Forward",
      experience: "5 years",
      preferredClub: "Barcelona FC"
    }
  ];

  // PlayerCard props type
  const PlayerCard = ({ item }: { item: PlayerItem }) => (
    <Link href={`/recommendedplayers/${item.id}`}>
      <div className="bg-[#3F3F3F] rounded-lg p-3 my-5 md:flex items-center gap-3 transition cursor-pointer ">
        <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
          <Image
            width={100}
            height={100}
            src={item.avatar}
            className="rounded-md object-cover w-full h-full"
            alt="user"
          />
        </div>

        <div className="flex-1">
          <h3 className="text-white font-semibold text-sm mb-1">{item.name}</h3>
          <div className="space-y-0.5">
            <div className="flex items-center text-xs">
              <p className="text-gray-500">Position :</p>
              <p className="text-gray-400 ml-2">{item.position}</p>
            </div>
            <div className="flex items-center text-xs">
              <p className="text-gray-500">Experience :</p>
              <p className="text-gray-400 ml-2">{item.experience}</p>
            </div>
            <div className="flex items-center text-xs">
              <p className="text-gray-500">Preferred Club :</p>
              <p className="text-gray-400 ml-2">{item.preferredClub}</p>
            </div>
          </div>
        </div>

        <div
          className="flex flex-col gap-2 flex-shrink-0"
          onClick={(e) => e.preventDefault()}
        >
          <button className="bg-[#ef4444] hover:bg-[#dc2626] text-white px-4 py-1.5 rounded text-xs font-medium transition whitespace-nowrap">
            Accept Request
          </button>
          <button className="bg-[#4a4a4a] hover:bg-[#5a5a5a] text-white px-4 py-1.5 rounded text-xs font-medium transition">
            Message
          </button>
        </div>
      </div>
    </Link>
  );

  return (
    <div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 bg-[#303030] p-2 rounded-md">
        <div className="space-y-3 p-3 rounded-md">
          {videoReviewData.map((item) => (
            <PlayerCard key={item.id} item={item} />
          ))}
        </div>
        <div className="space-y-3 p-3 rounded-md">
          {consultationsData.map((item) => (
            <PlayerCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecommendedPlayers;
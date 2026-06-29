"use client";

import React from "react"
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import barcelonaLogo from '@/assets/clubs/barcelona.png'; // replace with your logo path

type ClubItem = {
  id: number;
  name: string;
  logo: StaticImageData | string;
  league: string;
  openPositions: number;
  positions: string[];
};

const ExploreclubsCard = () => {
  const clubsData: ClubItem[] = [
    {
      id: 1,
      name: "Barcelona FC",
      logo: barcelonaLogo,
      league: "La Liga",
      openPositions: 3,
      positions: ["Forward", "Midfielder"],
    },
    {
      id: 2,
      name: "Barcelona FC",
      logo: barcelonaLogo,
      league: "La Liga",
      openPositions: 3,
      positions: ["Forward", "Midfielder"],
    },
    {
      id: 3,
      name: "Barcelona FC",
      logo: barcelonaLogo,
      league: "La Liga",
      openPositions: 3,
      positions: ["Forward", "Midfielder"],
    },
    {
      id: 4,
      name: "Barcelona FC",
      logo: barcelonaLogo,
      league: "La Liga",
      openPositions: 3,
      positions: ["Forward", "Midfielder"],
    },
    {
      id: 5,
      name: "Barcelona FC",
      logo: barcelonaLogo,
      league: "La Liga",
      openPositions: 3,
      positions: ["Forward", "Midfielder"],
    },
  ];

  const ClubCard = ({ item }: { item: ClubItem }) => (
    <div className="bg-[#3a3a3a] rounded-lg p-3 my-3 flex items-center gap-4">
      {/* Club Logo */}
      <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
        <Image
          width={56}
          height={56}
          src={item.logo}
          className="rounded-md object-cover w-full h-full"
          alt={item.name}
        />
      </div>

      {/* Club Info */}
      <div className="flex-1 min-w-0">
        <h3 className="text-white font-bold text-sm mb-0.5">{item.name}</h3>
        <p className="text-gray-400 text-xs mb-1">{item.league}</p>
        <p className="text-gray-400 text-xs mb-2">
          Open Position &nbsp;:&nbsp;{" "}
          <span className="text-gray-300">
            {String(item.openPositions).padStart(2, "0")}
          </span>
        </p>
        {/* Position Tags */}
        <div className="flex gap-2 flex-wrap">
          {item.positions.map((pos) => (
            <span
              key={pos}
              className="bg-[#4a4a4a] text-gray-300 text-[10px] px-2.5 py-0.5 rounded"
            >
              {pos}
            </span>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-2 flex-shrink-0" onClick={(e) => e.stopPropagation()}>
        <button className="bg-[#ef4444] hover:bg-[#dc2626] text-white px-4 py-1.5 rounded text-xs font-medium transition whitespace-nowrap">
          Recommend
        </button>
        <Link href={`/exploreclubs/${item.id}`}>
          <button className="border border-[#ef4444] text-white hover:bg-[#ef4444]/10 px-4 py-1.5 rounded text-xs font-medium transition whitespace-nowrap w-full">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );

  return (
    <div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 bg-[#303030] p-2 rounded-md">
        <div className="space-y-1 p-3 rounded-md">
          {clubsData.map((item) => (
            <ClubCard key={item.id} item={item} />
          ))}
        </div>
        <div className="space-y-1 p-3 rounded-md">
          {clubsData.map((item) => (
            <ClubCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExploreclubsCard;
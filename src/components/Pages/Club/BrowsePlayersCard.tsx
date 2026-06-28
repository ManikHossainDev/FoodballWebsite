"use client";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import user from "@/assets/Authentication/user.jpg";
import { MessageCircle } from "lucide-react";
import { PiStarThin } from "react-icons/pi";

const BrowsePlayersCard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPosition, setSelectedPosition] = useState("Position");

  // Sample player data
  const playersData = [
    {
      id: 1,
      name: "Marcus Silva",
      age: 28,
      rating: "Brazil",
      height: "180cm",
      weight: "Right",
      position: "Foot",
      preferredFoot: "Right",
      experience: "5 Years",
      role: "Forward",
    },
    {
      id: 2,
      name: "Marcus Silva",
      age: 28,
      rating: "Brazil",
      height: "180cm",
      weight: "Right",
      position: "Foot",
      preferredFoot: "Right",
      experience: "5 Years",
      role: "Forward",
    },
    {
      id: 3,
      name: "Marcus Silva",
      age: 28,
      rating: "Brazil",
      height: "180cm",
      weight: "Right",
      position: "Foot",
      preferredFoot: "Right",
      experience: "5 Years",
      role: "Forward",
    },
    {
      id: 4,
      name: "Marcus Silva",
      age: 28,
      rating: "Brazil",
      height: "180cm",
      weight: "Right",
      position: "Foot",
      preferredFoot: "Right",
      experience: "5 Years",
      role: "Forward",
    },
    {
      id: 5,
      name: "Marcus Silva",
      age: 28,
      rating: "Brazil",
      height: "180cm",
      weight: "Right",
      position: "Foot",
      preferredFoot: "Right",
      experience: "5 Years",
      role: "Forward",
    },
    {
      id: 6,
      name: "Marcus Silva",
      age: 28,
      rating: "Brazil",
      height: "180cm",
      weight: "Right",
      position: "Foot",
      preferredFoot: "Right",
      experience: "5 Years",
      role: "Forward",
    },
    {
      id: 7,
      name: "Marcus Silva",
      age: 28,
      rating: "Brazil",
      height: "180cm",
      weight: "Right",
      position: "Foot",
      preferredFoot: "Right",
      experience: "5 Years",
      role: "Forward",
    },
    {
      id: 8,
      name: "Marcus Silva",
      age: 28,
      rating: "Brazil",
      height: "180cm",
      weight: "Right",
      position: "Foot",
      preferredFoot: "Right",
      experience: "5 Years",
      role: "Forward",
    },
    {
      id: 9,
      name: "Marcus Silva",
      age: 28,
      rating: "Brazil",
      height: "180cm",
      weight: "Right",
      position: "Foot",
      preferredFoot: "Right",
      experience: "5 Years",
      role: "Forward",
    },
    {
      id: 10,
      name: "Marcus Silva",
      age: 28,
      rating: "Brazil",
      height: "180cm",
      weight: "Right",
      position: "Foot",
      preferredFoot: "Right",
      experience: "5 Years",
      role: "Forward",
    },
  ];

  // Filter players based on search and position
  const filteredPlayers = playersData.filter((player) => {
    const matchesSearch = player.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesPosition =
      selectedPosition === "Position" || player.role === selectedPosition;
    return matchesSearch && matchesPosition;
  });

  return (
    <div className=" bg-[#303030] p-6 rounded-lg">
      {/* Header with Search and Filter */}
      <div className="mb-6 flex items-center gap-4 bg-[#3F3F3F] rounded-md p-4">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-xs">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm" />
          <input
            type="text"
            placeholder="Search players..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#696969] text-gray-300 text-sm py-3 pl-10 pr-4 rounded-lg border border-gray-700 focus:outline-none focus:border-gray-600"
          />
        </div>

        {/* Position Dropdown */}
        <select
          value={selectedPosition}
          onChange={(e) => setSelectedPosition(e.target.value)}
          className="bg-[#696969] text-gray-300 text-sm py-3 px-4 rounded-lg border border-gray-700 focus:outline-none focus:border-gray-600 cursor-pointer"
        >
          <option>Position</option>
          <option>Forward</option>
          <option>Midfielder</option>
          <option>Defender</option>
          <option>Goalkeeper</option>
        </select>
      </div>

      {/* Player Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-5 gap-4">
        {filteredPlayers.map((player) => (
          <div
            key={player.id}
            className="bg-[#3F3F3F] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
          >
            {/* Card Header */}
            <div className="p-4 pb-3">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-gray-700 rounded-md overflow-hidden relative">
                  <Image
                    src={user}
                    alt={player.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-semibold text-sm truncate">
                    {player.name}
                  </h3>
                  <p className="text-gray-400 text-xs flex items-center gap-1">
                    {player.age} · {player.rating}
                  </p>
                </div>
              </div>

              {/* Player Stats Grid */}
              <div className="grid grid-cols-2 gap-2 p-2 bg-[#303030]">
                <div>
                  <p className="text-gray-500 text-xs mb-1">Height</p>
                  <p className="text-white text-xs font-medium">
                    {player.height}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs mb-1">{player.weight}</p>
                  <p className="text-white text-xs font-medium">
                    {player.position}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs mb-1">
                    {player.experience}
                  </p>
                  <p className="text-white text-xs font-medium">
                    {player.role}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs mb-1">Defender</p>
                  <p className="text-white text-xs font-medium">Position</p>
                </div>
              </div>
            </div>

            {/* View Posts Button */}
            <div className="px-3 pb-3 flex items-center space-x-2 ">
              <Link className="w-[78%] flex justify-center  rounded-md bg-[#E43636] hover:bg-red-700" href={`/posts/${player.id}`}>
                <button className=" text-white text-sm font-medium py-3 transition-colors flex items-center justify-center gap-2">
                  <MessageCircle />
                  View Posts
                </button>
              </Link>
              <Link className="w-[20%]  rounded-md border-2 border-black flex justify-center " href={`/posts/${player.id}`}>
                <button className=" text-white text-sm font-medium py-[10px] transition-colors flex items-center justify-center gap-2">
                  <PiStarThin size={25} />
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* No Results Message */}
      {filteredPlayers.length === 0 && (
        <div className="text-center text-gray-500 mt-12">
          <p className="text-lg">No players found</p>
          <p className="text-sm mt-2">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
};

export default BrowsePlayersCard;

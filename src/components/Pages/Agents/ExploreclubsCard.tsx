"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useGetClubHiringQuery } from "@/redux/features/agents/agent";

type HiringAuthor = {
  _id: string;
  name: string;
  email: string;
  image: string;
};

type HiringPost = {
  _id: string;
  author: HiringAuthor;
  overview: string;
  requirements: string;
  facilities: string;
  openPositions: number;
  positionTitle: string;
  employmentType: string;
  salaryRange: string;
  dateLine: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  responseCount: number;
};

const ExploreclubsCard = () => {
  const { data, isLoading, isError } = useGetClubHiringQuery();

  const clubsData: HiringPost[] = data?.data?.data ?? [];

  const ClubCard = ({ item }: { item: HiringPost }) => (
    <div className="bg-[#3a3a3a] rounded-lg p-3 my-3 flex items-center gap-4">
      {/* Club Logo */}
      <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0 bg-[#4a4a4a]">
        {item.author?.image && (
          <Image
            width={56}
            height={56}
            src={item.author.image}
            className="rounded-md object-cover w-full h-full"
            alt={item.author?.name ?? "Club"}
          />
        )}
      </div>

      {/* Club Info */}
      <div className="flex-1 min-w-0">
        <h3 className="text-white font-bold text-sm mb-0.5">
          {item.author?.name ?? "Unknown Club"}
        </h3>
        <p className="text-gray-400 text-xs mb-1">{item.employmentType}</p>
        <p className="text-gray-400 text-xs mb-2">
          Open Position &nbsp;:&nbsp;{" "}
          <span className="text-gray-300">
            {String(item.openPositions).padStart(2, "0")}
          </span>
        </p>
        {/* Position Tags */}
        <div className="flex gap-2 flex-wrap">
          <span className="bg-[#4a4a4a] text-gray-300 text-[10px] px-2.5 py-0.5 rounded">
            {item.positionTitle}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div
        className="flex flex-col gap-2 flex-shrink-0"
        onClick={(e) => e.stopPropagation()}
      >
        <Link href={`/exploreclubs/${item._id}/recommendplayercf`} className="bg-[#ef4444] hover:bg-[#dc2626] text-white px-4 py-1.5 rounded text-xs font-medium transition whitespace-nowrap">
          Recommend
        </Link>
        <Link href={`/exploreclubs/${item._id}`}>
          <button className="border border-[#ef4444] text-white hover:bg-[#ef4444]/10 px-4 py-1.5 rounded text-xs font-medium transition whitespace-nowrap w-full">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="bg-[#303030] p-6 rounded-md text-gray-400 text-sm">
        Loading clubs...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-[#303030] p-6 rounded-md text-red-400 text-sm">
        Failed to load clubs.
      </div>
    );
  }

  if (clubsData.length === 0) {
    return (
      <div className="bg-[#303030] p-6 rounded-md text-gray-400 text-sm">
        No open positions available right now.
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 bg-[#303030] p-2 rounded-md">
        <div className="space-y-1 p-3 rounded-md">
          {clubsData.map((item) => (
            <ClubCard key={item._id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExploreclubsCard;
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import user from "@/assets/Authentication/user.jpg";
import { MessageCircle } from "lucide-react";
import { useGetClubAgentsConnectedQuery } from "@/redux/features/club/club";

const WorkwithAgentsCard = () => {
  const { data, isLoading, isError } = useGetClubAgentsConnectedQuery();

  const agents = data?.data?.data || [];

  return (
    <div className=" bg-[#303030] p-6 rounded-lg">
      {/* Header with Search and Filter */}
      <div className="mb-6 flex items-center gap-4 bg-[#3F3F3F] rounded-md p-4">
        <h1 className="text-[#fcf8f8]">Agents</h1>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="text-center text-gray-400 mt-12">
          <p className="text-lg">Loading agents...</p>
        </div>
      )}

      {/* Error State */}
      {isError && (
        <div className="text-center text-red-400 mt-12">
          <p className="text-lg">Failed to load agents</p>
        </div>
      )}

      {/* Agent Cards Grid */}
      {!isLoading && !isError && (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {agents.map((agent: any) => (
            <div
              key={agent._id}
              className="bg-[#3F3F3F] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              {/* Card Header */}
              <div className="p-4 pb-3">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-gray-700 rounded-md overflow-hidden relative">
                    <Image
                      src={agent.image || user}
                      alt={agent.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-semibold text-sm truncate">
                      {agent.name}
                    </h3>
                    <p className="text-gray-400 text-xs flex items-center gap-1 truncate">
                      {agent.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-center text-yellow-500 mb-2">
                  <span className="text-sm">⭐</span>
                  <span className="text-white text-sm font-medium">
                    {agent.avgRating ?? 0}
                  </span>
                  <span className="text-gray-400 text-xs">
                    ({agent.ratingCount ?? 0} reviews)
                  </span>
                </div>

                {/* Experience */}
                <p className="text-gray-400 text-xs pl-1 line-clamp-2">
                  {agent.exparience}
                </p>
              </div>

              {/* View Posts Button */}
              <div className="space-y-2 px-2 pb-3">
                <Link className="block w-full" href={`/WorkwithAgents/${agent._id}`}>
                  <button className="w-full bg-[#E43636] hover:bg-red-700 text-white text-sm font-medium py-2.5 rounded-md transition-colors flex items-center justify-center gap-2">
                    View Posts
                  </button>
                </Link>

                
                <Link className="block w-full" href={`/messaging/${agent._id}`}>
                  <button className="w-full bg-[#2A2A2A] hover:bg-[#353535] text-white text-sm font-medium py-2.5 rounded-md transition-colors flex items-center justify-center gap-2 border border-gray-600">
                    <MessageCircle size={16} />
                    Message
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* No Results Message */}
      {!isLoading && !isError && agents.length === 0 && (
        <div className="text-center text-gray-500 mt-12">
          <p className="text-lg">No agents found</p>
          <p className="text-sm mt-2">You have no connected agents yet</p>
        </div>
      )}
    </div>
  );
};

export default WorkwithAgentsCard;
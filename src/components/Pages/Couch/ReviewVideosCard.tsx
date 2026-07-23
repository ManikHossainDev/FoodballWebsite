'use client';
import { useRouter } from "next/navigation";
import React from 'react';
import image from "@/assets/Authentication/Container.png";
import Image from 'next/image';
import { VideoRequestsResponse } from "@/types/types";
import { useGetVideoRequestsQuery } from "@/redux/features/coach/coach";

const formatDuration = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

const ReviewVideosCard = () => {
  const { data: VideoRequests, isLoading } = useGetVideoRequestsQuery("accept") as {
    data?: VideoRequestsResponse;
    isLoading: boolean;
    refetch: () => void;
  };

  const requests = VideoRequests?.data ?? [];

  const router = useRouter();

  const handleReviewVideo = (id: string) => {
    router.push(`/ReviewVideos/${id}`);
  };

  const handleMessage = (id: string) => {
    console.log(`Message for video ${id}`);
  };

  if (isLoading) {
    return (
      <div className="bg-[#303030] rounded-md p-4">
        <p className="text-gray-400 text-sm">Loading video requests...</p>
      </div>
    );
  }

  if (!requests.length) {
    return (
      <div className="bg-[#303030] rounded-md p-4">
        <p className="text-gray-400 text-sm">No pending video requests.</p>
      </div>
    );
  }

  return (
    <div className="bg-[#303030] rounded-md p-4">
      <div className="space-y-4">
        {requests.map((request) => (
          <div
            key={request._id}
            className="bg-[#3F3F3F] rounded-xl p-2 lg:flex items-center justify-between hover:from-gray-750 hover:to-gray-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            {/* Thumbnail with Play Button */}
            <div className="md:flex items-center gap-4 flex-1 mb-2 md:mb-0">
              <div className="relative group cursor-pointer">
                <div className="w-36 h-24 bg-gray-700 rounded-lg overflow-hidden">
                  <Image
                    src={request.player?.image || image}
                    alt={request.title}
                    width={144}
                    height={80}
                    className="w-full h-full object-fill"
                  />
                </div>
              </div>

              {/* Video Info */}
              <div className="flex-1">
                <h3 className="text-white text-lg font-semibold mb-1">
                  {request.title}
                </h3>
                <p className="text-gray-400 text-sm">
                  Player: {request.player?.name}
                </p>
                <p className="text-gray-500 text-xs mt-1">
                  {request.description}
                </p>
                <p className="text-gray-500 text-xs mt-1">
                  Duration: {formatDuration(request.content.duration)}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-1">
              <button
                onClick={() => handleReviewVideo(request._id)}
                className="bg-red-600 hover:bg-red-700 text-white px-2 md:px-6 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-red-600/50"
              >
                Review Video
              </button>
              <button
                onClick={() => handleMessage(request._id)}
                className="border-2 border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white px-2 md:px-6 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105"
              >
                Message
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewVideosCard;
"use client"
import React from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import user from '@/assets/Authentication/user.jpg'
import { useGetConsultationsQuery, useGetVideoRequestsQuery } from "@/redux/features/coach/coach";

interface Player {
  _id: string;
  name: string;
  email: string;
  phone: string;
  image: string;
}

interface VideoContent {
  resource_type: string;
  duration: number;
  secure_url: string;
}

interface VideoRequest {
  _id: string;
  player: Player;
  title: string;
  description: string;
  areaOfFocus: string;
  status: string;
  coachFeedback: string;
  isReviewed: boolean;
  cancelledBy: string | null;
  content: VideoContent;
}

interface Consultation {
  _id: string;
  coach: string;
  player: Player;
  consultationTopic: string;
  bookingSlot: string;
  questions: string;
  status: string;
  coachFeedback: string;
  isReviewed: boolean;
}

interface VideoRequestsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: VideoRequest[];
}

interface ConsultationsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: Consultation[];
}

const ConsultationsRequest: React.FC = () => {
  const { data: VideoRequests } = useGetVideoRequestsQuery("pending") as {
    data?: VideoRequestsResponse;
  };
  const { data: Consultations } = useGetConsultationsQuery({ status: "pending" }) as {
    data?: ConsultationsResponse;
  };

  

  const videoReviewData: VideoRequest[] = VideoRequests?.data || [];
  const consultationsData: Consultation[] = Consultations?.data || [];

  const getAvatarSrc = (image?: string): string | StaticImageData => {
    return image && image.trim() !== "" ? image : user;
  };

  return (
    <div className="">
      <div className="">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Video Review Request Section */}
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2
                className="text-lg md:text-xl font-bold text-white "
                style={{
                  textShadow:
                    "0 0 10px #ff0000, 0 0 20px #ff0000, 0 0 30px #ff0000, 0 0 40px #ff0000",
                }}
              >
                Video Review Request
              </h2>
              <button className="text-gray-400 hover:text-white text-sm">
                See all
              </button>
            </div>

            <div className="space-y-3 bg-[#303030] p-3 rounded-md">
              {videoReviewData.length === 0 && (
                <p className="text-gray-400 text-sm text-center py-4">
                  No pending video review requests
                </p>
              )}

              {videoReviewData.map((item) => (
                <Link
                  href={`/Couch/${item._id}`}
                  key={item._id}
                  className="bg-[#3F3F3F] rounded-lg p-4 md:flex items-center justify-between  transition"
                >
                  <div className="flex items-center gap-3 pb-2 md:pb-0">
                    <div className="w-12 h-12 rounded-lg overflow-hidden">
                      <Image
                        width={48}
                        height={48}
                        src={getAvatarSrc(item.player?.image)}
                        className='rounded-md object-cover'
                        alt={item.player?.name || 'user'}
                      />
                    </div>
                    <div>
                      <h3 className="text-white font-medium text-sm">
                        {item.player?.name}
                      </h3>
                      <p className="text-gray-400 text-xs">{item.title}</p>
                    </div>
                  </div>

                  <div className="flex justify-between md:justify-end gap-2">
                    <button className="bg-[#ef4444] hover:bg-[#dc2626] text-white px-6 py-2 rounded-md text-sm font-medium transition">
                      Accept
                    </button>
                    <button className="bg-[#3a3a3a] hover:bg-[#4a4a4a] text-white px-6 py-2 rounded-md text-sm font-medium transition">
                      Decline
                    </button>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Consultations Request Section */}
          <div className="space-y-4 ">
            <div className="flex justify-between items-center mb-4">
              <h2
                className="text-lg md:text-xl font-bold text-white "
                style={{
                  textShadow:
                    "0 0 10px #ff0000, 0 0 20px #ff0000, 0 0 30px #ff0000, 0 0 40px #ff0000",
                }}
              >
                Consultations Request
              </h2>
              <button className="text-gray-400 hover:text-white text-sm">
                See all
              </button>
            </div>

            <div className="space-y-3 bg-[#303030] p-3 rounded-md">
              {consultationsData.length === 0 && (
                <p className="text-gray-400 text-sm text-center py-4">
                  No pending consultation requests
                </p>
              )}

              {consultationsData.map((item) => (
                <div
                  key={item._id}
                  className="bg-[#3F3F3F] rounded-lg p-4  transition"
                >
                  <div className="md:flex items-center justify-between">
                    <div className="flex items-center gap-3 mb-2 md:mb-0">
                      <div className="w-12 h-12 rounded-lg overflow-hidden">
                        <Image
                          width={48}
                          height={48}
                          src={getAvatarSrc(item.player?.image)}
                          className='rounded-md object-cover'
                          alt={item.player?.name || 'user'}
                        />
                      </div>
                      <div>
                        <h3 className="text-white font-medium text-sm">
                          {item.player?.name}
                        </h3>
                        <p className="text-gray-400 text-xs">
                          {item.consultationTopic}
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-between md:justify-end gap-2">
                      <button className="bg-[#ef4444] hover:bg-[#dc2626] text-white px-6 py-2 rounded-md text-sm font-medium transition">
                        Accept
                      </button>
                      <button className="bg-[#3a3a3a] hover:bg-[#4a4a4a] text-white px-6 py-2 rounded-md text-sm font-medium transition">
                        Decline
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultationsRequest;
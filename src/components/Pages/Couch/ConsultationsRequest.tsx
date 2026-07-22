/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import user from '@/assets/Authentication/user.jpg'
import { useActionConsultationMutation, useActionVideoReqMutation, useGetConsultationsQuery, useGetVideoRequestsQuery } from "@/redux/features/coach/coach";
import Swal from "sweetalert2";
import { Consultation, ConsultationsResponse, VideoRequest, VideoRequestsResponse } from "@/types/types";



const ConsultationsRequest: React.FC = () => {
  const { data: VideoRequests, refetch: refetchVideoRequests } = useGetVideoRequestsQuery("pending") as {
    data?: VideoRequestsResponse;
    refetch: () => void;
  };

  const [ActionVideoReq] = useActionVideoReqMutation();

  const { data: Consultations, refetch: refetchConsultations } = useGetConsultationsQuery({ status: "pending" }) as {
    data?: ConsultationsResponse;
    refetch: () => void;
  };

  const [ActionConsultation] = useActionConsultationMutation();

  // track which item is currently being actioned, so we can disable just that button
  const [processingId, setProcessingId] = useState<string | null>(null);

  const videoReviewData: VideoRequest[] = VideoRequests?.data || [];
  const consultationsData: Consultation[] = Consultations?.data || [];

  const getAvatarSrc = (image?: string): string | StaticImageData => {
    return image && image.trim() !== "" ? image : user;
  };

  const handleVideoAction = async (
  e: React.MouseEvent,
  id: string,
  status: "accept" | "decline"
) => {
  e.preventDefault();
  e.stopPropagation();

  try {
    setProcessingId(id);

    const res = await ActionVideoReq({
      id,
      data: {
        status,
      },
    }).unwrap();
    if (res?.success) {
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: res.message || "Video request updated successfully.",
        timer: 2000,
        showConfirmButton: false,
      });

      refetchVideoRequests();
    } else {
      Swal.fire({
        icon: "error",
        title: "Failed!",
        text: res.message || "Failed to update video request.",
      });
    }
  } catch (error: any) {
    Swal.fire({
      icon: "error",
      title: "Error!",
      text:
        error?.data?.message ||
        error?.message ||
        "Something went wrong.",
    });
  } finally {
    setProcessingId(null);
  }
};

  const handleConsultationAction = async (
  e: React.MouseEvent,
  id: string,
  status: "accept" | "decline"
) => {
  e.preventDefault();
  e.stopPropagation();

  try {
    setProcessingId(id);

    const res = await ActionConsultation({
      id,
      data: {
        status,
      },
    }).unwrap();
    if (res?.success) {
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: res.message || "Consultation updated successfully.",
        timer: 2000,
        showConfirmButton: false,
      });

      refetchConsultations();
    } else {
      Swal.fire({
        icon: "error",
        title: "Failed!",
        text: res.message || "Failed to update consultation.",
      });
    }
  } catch (error: any) {
    Swal.fire({
      icon: "error",
      title: "Error!",
      text:
        error?.data?.message ||
        error?.message ||
        "Something went wrong.",
    });
  } finally {
    setProcessingId(null);
  }
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
                    <button
                      disabled={processingId === item._id}
                      onClick={(e) => handleVideoAction(e, item._id, "accept")}
                      className="bg-[#ef4444] hover:bg-[#dc2626] disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-2 rounded-md text-sm font-medium transition"
                    >
                      Accept
                    </button>
                    <button
                      disabled={processingId === item._id}
                      onClick={(e) => handleVideoAction(e, item._id, "decline")}
                      className="bg-[#3a3a3a] hover:bg-[#4a4a4a] disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-2 rounded-md text-sm font-medium transition"
                    >
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
                      <button
                        disabled={processingId === item._id}
                        onClick={(e) => handleConsultationAction(e, item._id, "accept")}
                        className="bg-[#ef4444] hover:bg-[#dc2626] disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-2 rounded-md text-sm font-medium transition"
                      >
                        Accept
                      </button>
                      <button
                        disabled={processingId === item._id}
                        onClick={(e) => handleConsultationAction(e, item._id, "decline")}
                        className="bg-[#3a3a3a] hover:bg-[#4a4a4a] disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-2 rounded-md text-sm font-medium transition"
                      >
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
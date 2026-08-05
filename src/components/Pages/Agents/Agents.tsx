/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React from "react";
import user from '@/assets/Authentication/user.jpg';
import Image from "next/image";
import Swal from "sweetalert2"; 
import { useCancelRecommendationMutation, useGetClubHiringMyResponsesQuery, useGetPlayerPlacementQuery, usePlacementsActionMutation } from "@/redux/features/agents/agent";
import Link from "next/link";
import { LuMessageSquareMore } from "react-icons/lu";

const Agents = () => {
  // Player Placement Requests (from API)
  const { data: PlacementRequests, isLoading: placementsLoading } = useGetPlayerPlacementQuery();
  const placementList = PlacementRequests?.data?.data || [];
  console.log(placementList)
  const [PlacementsAction] = usePlacementsActionMutation();
  // body: { status: "accept" | "decline" }
  const handlePlacements = async (id: string, status: "accept" | "decline") => {
    const payload = {
      id,
      data: { status },
    };
    try {
      const res = await PlacementsAction(payload).unwrap();
      console.log(res);
      if (res?.success === true) {
        Swal.fire({
          title: "Good job!",
          text: status === "accept" ? "Request accepted." : "Request declined.",
          icon: "success",
        });
      }
    } catch (error:any) {
      console.log(error);
      Swal.fire({
        title: "Something went wrong",
        text: `${error?.data?.message}`,
        icon: "error",
      });
    }
  };
  const [CancelRecommendation] = useCancelRecommendationMutation();
  const handleCancel = async (id: string,) => {
    try {
      const res = await CancelRecommendation({ id }).unwrap();
      if (res?.success === true) {
        Swal.fire({
          title: "Good job!",
          text: `${res?.message}` || "cancel successful",
          icon: "success",
        });
      }
    } catch (error:any) {
      Swal.fire({
        title: "Something went wrong",
        text: `${error?.data?.message}`,
        icon: "error",
      });
    }
  };

  // Recommend Player / Club Hiring Responses (from API)
  const { data: RecommendPlayerResponses, isLoading: responsesLoading } = useGetClubHiringMyResponsesQuery();
  const recommendList = RecommendPlayerResponses?.data?.data || [];

  return (
    <div className="">
      <div className="">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Player Placements Requests Section */}
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2
                className="text-lg md:text-xl font-bold text-white "
                style={{
                  textShadow:
                    "0 0 10px #ff0000, 0 0 20px #ff0000, 0 0 30px #ff0000, 0 0 40px #ff0000",
                }}
              >
                Player Placements Requests
              </h2>
              <Link href="/PlacementsRequests" className="text-gray-400 hover:text-white text-sm">
                See all
              </Link>
            </div>

            <div className="space-y-3 bg-[#303030] p-3 rounded-md">
              {placementsLoading && (
                <p className="text-gray-400 text-sm p-3">Loading...</p>
              )}

              {!placementsLoading && placementList.length === 0 && (
                <p className="text-gray-400 text-sm p-3">No placement requests found.</p>
              )}

              {placementList.map((item: any) => (
                <div
                  key={item._id}
                  className="bg-[#3F3F3F] rounded-lg p-3 md:flex items-center gap-3 transition"
                >
                  <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                    <Image
                      width={100}
                      height={100}
                      src={item.author?.image || user}
                      className="rounded-md object-cover w-full h-full"
                      alt={item.author?.name || "agent"}
                    />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-white font-semibold text-sm mb-1">
                      {item.author?.name}
                    </h3>
                    <div className="space-y-0.5">
                      <div className="flex items-center text-xs">
                        <p className="text-gray-500">Preferred Club :</p>
                        <p className="text-gray-400 ml-2">{item.preferredClub}</p>
                      </div>
                      <div className="flex items-center text-xs">
                        <p className="text-gray-500">Preferred League :</p>
                        <p className="text-gray-400 ml-2">{item.preferredLeagues}</p>
                      </div>
                      <div className="flex items-center text-xs">
                        <p className="text-gray-500">Urgency :</p>
                        <p className="text-gray-400 ml-2 capitalize">{item.urgencyLevel}</p>
                      </div>
                      <div className="flex items-center text-xs">
                        <p className="text-gray-500">Status :</p>
                        <p className="text-gray-400 ml-2 capitalize">{item.status}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex  gap-2 items-end">
                    <Link href={`/messaging/${item?.author?._id}`} className="bg-[#4a4a4a] hover:bg-[#5a5a5a] text-white  rounded text-xs font-medium transition">
                      <LuMessageSquareMore size={40} className="text-white"/>
                    </Link>
                    <div className="flex flex-col gap-2 flex-shrink-0">
                    {item.status === "pending" && (
                      <button
                        onClick={() => handlePlacements(item._id, "accept")}
                        className="bg-[#25DD000F]  text-[#25DD00] border border-[#25DD00]  px-4 py-3 rounded text-xs font-medium transition whitespace-nowrap"
                      >
                        Accept 
                      </button>
                    )}

                    {item.status === "pending" && (
                      <button
                        onClick={() => handlePlacements(item._id, "decline")}
                        className="bg-[#ef4444] hover:bg-[#dc2626] text-white px-4 py-3 rounded text-xs font-medium transition whitespace-nowrap"
                      >
                        Decline
                      </button>
                    )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommend Player Section */}
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2
                className="text-lg md:text-xl font-bold text-white "
                style={{
                  textShadow:
                    "0 0 10px #ff0000, 0 0 20px #ff0000, 0 0 30px #ff0000, 0 0 40px #ff0000",
                }}
              >
                Recommend Player
              </h2>
              <Link href="/recommendedplayers" className="text-gray-400 hover:text-white text-sm">
                See all
              </Link>
            </div>

            <div className="space-y-3 bg-[#303030] p-3 rounded-md">
              {responsesLoading && (
                <p className="text-gray-400 text-sm p-3">Loading...</p>
              )}

              {!responsesLoading && recommendList.length === 0 && (
                <p className="text-gray-400 text-sm p-3">No responses found.</p>
              )}

              {recommendList.map((item: any) => (
                <div
                  key={item._id}
                  className="bg-[#3F3F3F] rounded-lg p-3 md:flex items-center gap-3 transition"
                >
                  <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                    <Image
                      width={100}
                      height={100}
                      src={item.player?.image || user}
                      className="rounded-md object-cover w-full h-full"
                      alt={item.player?.name || "player"}
                    />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-white font-semibold text-sm mb-1">
                      {item.player?.name}
                    </h3>
                    <div className="space-y-0.5">
                      <div className="flex items-center text-xs">
                        <p className="text-gray-500">Position :</p>
                        <p className="text-gray-400 ml-2">{item.position}</p>
                      </div>
                      <div className="flex items-center text-xs">
                        <p className="text-gray-500">Club :</p>
                        <p className="text-gray-400 ml-2">{item.clubeHiring?.author?.name}</p>
                      </div>
                      <div className="flex items-center text-xs">
                        <p className="text-gray-500">Salary Range :</p>
                        <p className="text-gray-400 ml-2">{item.clubeHiring?.salaryRange}</p>
                      </div>
                      <div className="flex items-center text-xs">
                        <p className="text-gray-500">Status :</p>
                        <p className="text-gray-400 ml-2 capitalize">{item.status}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 flex-shrink-0">
                    {/* <button onClick={() => handleCancel(item._id)} className="bg-[#ef4444] hover:bg-[#dc2626] text-white px-4 py-3 rounded text-xs font-medium transition whitespace-nowrap">
                      Cancel
                    </button> */}
                    <button
                      onClick={() => handleCancel(item._id)}
                      disabled={item?.status === "cancelled"}
                      className="flex-1 bg-[#e53935] text-white text-sm font-medium py-2 px-4 rounded-md hover:bg-[#c62828] transition-colors disabled:bg-[#8a3a38] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-[#8a3a38]"
                    >
                      {item?.status === "cancelled" ? "Cancelled" : "Cancel"}
                    </button>
                    <button className="bg-[#25DD000F]  text-[#25DD00] border border-[#25DD00] px-4 py-3 rounded text-xs font-medium transition whitespace-nowrap">
                      Hired
                    </button>
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

export default Agents;
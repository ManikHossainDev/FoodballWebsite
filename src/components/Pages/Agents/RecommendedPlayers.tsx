/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React from "react";
import user from '@/assets/Authentication/user.jpg'
import Image from "next/image";
import { useCancelRecommendationMutation, useGetClubHiringMyResponsesQuery,} from "@/redux/features/agents/agent";
import Link from "next/link";
import Swal from "sweetalert2";
const RecommendedPlayers = () => {
 
  // Recommend Player / Club Hiring Responses (from API)
  const { data: RecommendPlayerResponses} = useGetClubHiringMyResponsesQuery();
  const recommendList = RecommendPlayerResponses?.data?.data || [];

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

  return (
    <div className="">
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {recommendList.map((item: any) => (
                <Link 
                  href={`/recommendedplayers/${item._id}`}
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
                </Link>
              ))}        
        </div>
    </div>
  );
};

export default RecommendedPlayers;
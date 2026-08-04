/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import Swal from "sweetalert2";
import { useGetPlayerPlacementQuery, usePlacementsActionMutation } from "@/redux/features/agents/agent";

type Author = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  image: string;
};

type PlacementItem = {
  _id: string;
  author: Author;
  preferredClub: string;
  preferredLeagues: string;
  urgencyLevel: string;
  additionalInfo: string;
  resume: string;
  status: "placed" | "accept" | "decline" | string;
  createdAt: string;
  content: {
    resource_type: string;
    secure_url: string;
  };
};

const PlacementsRequestsCard = () => {
  const { data: PlacementRequests, isLoading: placementsLoading } = useGetPlayerPlacementQuery();
  const placementList: PlacementItem[] = PlacementRequests?.data?.data || [];
  const [PlacementsAction] = usePlacementsActionMutation();

  const handlePlacements = async (id: string, status: "accept" | "decline") => {
    const payload = { id, data: { status } };
    try {
      const res = await PlacementsAction(payload).unwrap();
      if (res?.success === true) {
        Swal.fire({
          title: "Good job!",
          text: status === "accept" ? "Request accepted." : "Request declined.",
          icon: "success",
        });
      }
    } catch (error: any) {
      Swal.fire({
        title: "Something went wrong",
        text: `${error?.data?.message}`,
        icon: "error",
      });
    }
  };

  const PlayerCard = ({ item }: { item: PlacementItem }) => (
    <Link href={`/PlacementsRequests/${item._id}`}>
      <div className="bg-[#3F3F3F] rounded-lg p-3 my-5 md:flex items-center gap-3 transition cursor-pointer">
        <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
          <Image
            width={100}
            height={100}
            src={item.author?.image}
            className="rounded-md object-cover w-full h-full"
            alt={item.author?.name || "agent"}
          />
        </div>

        <div className="flex-1">
          <h3 className="text-white font-semibold text-sm mb-1">{item.author?.name}</h3>
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
          </div>
        </div>

        <div className="flex flex-col gap-2 flex-shrink-0">
          <div className="flex flex-col gap-2 flex-shrink-0">
            {item.status === "pending" && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handlePlacements(item._id, "accept");
                }}
                className="bg-[#25DD000F] text-[#25DD00] border border-[#25DD00] px-4 py-3 rounded text-xs font-medium transition whitespace-nowrap"
              >
                Accept
              </button>
            )}
            {item.status === "pending" && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handlePlacements(item._id, "decline");
                }}
                className="bg-[#ef4444] hover:bg-[#dc2626] text-white px-4 py-3 rounded text-xs font-medium transition whitespace-nowrap"
              >
                Decline
              </button>
            )}
          </div>
              <Link href={`/messaging/${item?._id}`} className="bg-[#4a4a4a] hover:bg-[#5a5a5a] text-white px-4 py-1.5 rounded text-xs font-medium transition">
            Message
          </Link>
        </div>
      </div>
    </Link>
  );

  if (placementsLoading) {
    return <div className="text-gray-400 p-4">Loading placement requests...</div>;
  }

  const pendingRequests = placementList.filter((item) => item.status === "placed");
  const acceptedRequests = placementList.filter((item) => item.status === "accept");

  return (
    <div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 bg-[#303030] p-2 rounded-md">
        <div className="space-y-3 p-3 rounded-md">
          <h4 className="text-white text-sm font-semibold px-1">Pending Requests</h4>
          {pendingRequests.length === 0 && (
            <p className="text-gray-500 text-xs px-1">No pending requests.</p>
          )}
          {pendingRequests.map((item) => (
            <PlayerCard key={item._id} item={item} />
          ))}
        </div>
        <div className="space-y-3 p-3 rounded-md">
          <h4 className="text-white text-sm font-semibold px-1">Accepted</h4>
          {acceptedRequests.length === 0 && (
            <p className="text-gray-500 text-xs px-1">No accepted requests.</p>
          )}
          {acceptedRequests.map((item) => (
            <PlayerCard key={item._id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlacementsRequestsCard;
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useGetSinglePlayerPlacementQuery, usePlacementsActionMutation } from "@/redux/features/agents/agent";
import { useParams } from "next/navigation";
import Image from "next/image";
import { FiMail, FiPhone, FiUser } from "react-icons/fi";
import Swal from "sweetalert2";
import Link from "next/link";

const PlacementsRequestsDetails = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetSinglePlayerPlacementQuery(id as string);
  const [PlacementsAction] = usePlacementsActionMutation();
  const placement = data?.data;
  console.log(placement)
  const handlePlacements = async (placementId: string, status: "accept" | "decline") => {
    const payload = { id: placementId, data: { status } };
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

  if (isLoading) {
    return <div className="text-gray-400 p-4">Loading...</div>;
  }

  if (!placement) {
    return <div className="text-gray-400 p-4">No placement request found.</div>;
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6 md:gap-10 lg:gap-24 py-5">
      {/* Left Panel */}
      <div className="w-full lg:w-[20%] rounded-lg flex flex-col bg-[#2a2a2a]">
        {/* Avatar */}
        <div className="w-full h-54 bg-[#4a4a4a] rounded-t-lg flex items-center justify-center overflow-hidden">
          {placement.author?.image ? (
            <Image
              src={placement.author.image}
              width={500}
              height={500}
              alt={placement.author?.name || "agent"}
              className="w-full h-full object-center"
            />
          ) : (
            <svg className="opacity-50" width="80" height="80" viewBox="0 0 80 80" fill="none">
              <circle cx="40" cy="30" r="20" fill="#888" />
              <ellipse cx="40" cy="72" rx="28" ry="18" fill="#888" />
            </svg>
          )}
        </div>

        {/* Info */}
        <div className="px-4 pt-4">
          <p className="text-white text-base font-medium mb-3">{placement.author?.name}</p>

          <div className="flex items-center gap-2 mb-2">
            <FiMail className="text-[#888] w-3.5 h-3.5 shrink-0" />
            <span className="text-[#888] text-xs w-24">Email</span>
            <span className="text-[#ccc] text-xs">:</span>
            <span className="text-[#ccc] text-xs">{placement.author?.email}</span>
          </div>

          <div className="flex items-center gap-2 mb-2">
            <FiPhone className="text-[#888] w-3.5 h-3.5 shrink-0" />
            <span className="text-[#888] text-xs w-24">Phone Number</span>
            <span className="text-[#ccc] text-xs">:</span>
            <span className="text-[#ccc] text-xs">{placement.author?.phone}</span>
          </div>

          <div className="flex items-center gap-2 mb-2">
            <FiUser className="text-[#888] w-3.5 h-3.5 shrink-0" />
            <span className="text-[#888] text-xs w-24">Urgency</span>
            <span className="text-[#ccc] text-xs">:</span>
            <span className="text-[#ccc] text-xs capitalize">{placement.urgencyLevel}</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-2.5 px-4 pb-4 mt-auto">
          <div className="flex gap-2.5">
            {placement.status === "pending" && (
              <button
                onClick={() => handlePlacements(placement._id, "accept")}
                className="bg-[#25DD000F] text-[#25DD00] border border-[#25DD00] w-full px-4 py-3 rounded text-xs font-medium transition whitespace-nowrap"
              >
                Accept
              </button>
            )}
            {placement.status === "pending" && (
              <button
                onClick={() => handlePlacements(placement._id, "decline")}
                className="w-full bg-[#ef4444] hover:bg-[#dc2626] text-white px-4 py-3 rounded text-xs font-medium transition whitespace-nowrap"
              >
                Decline
              </button>
            )}
          </div>
          <button className="flex-1 bg-transparent text-[#ccc] text-sm font-medium py-2 px-4 rounded-md border border-[#666] hover:bg-[#444] transition-colors">
            Message
          </button>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-full lg:w-[65%] flex flex-col lg:flex-row gap-6 rounded-lg flex-1 bg-[#3F3F3F] px-7 py-6">
        <div className="w-full lg:w-1/2">
          <p className="text-white text-[17px] font-medium mb-5">Full Name: {placement.author?.name}</p>

          {[
            { label: "Preferred Club", value: placement.preferredClub },
            { label: "Preferred Leagues", value: placement.preferredLeagues },
            { label: "Urgency Level", value: placement.urgencyLevel },
            { label: "Created At", value: new Date(placement.createdAt).toLocaleDateString() },
            {
              label: "Additional Info",
              value: placement.additionalInfo,
              muted: true,
            },
          ].map(({ label, value, }) => (
            <div key={label} className="flex items-start gap-0 mb-3.5">
              <span className="text-[#888] text-[13px] min-w-[140px]">{label}</span>
              <span className="text-[#666] text-[13px] mr-2.5">:</span>
              <span className={`text-[13px] text-[#ccc]`}>
                {value}
              </span>
            </div>
          ))}

          {placement.resume && (
            <div className="flex items-start gap-0 mb-3.5">
              <span className="text-[#888] text-[13px] min-w-[140px]">Resume</span>
              <span className="text-[#666] text-[13px] mr-2.5">:</span>
              <Link
                href={placement.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[13px] text-blue-400 underline"
              >
                View Resume
              </Link>
            </div>
          )}
        </div>

        {placement.content?.secure_url && (
          <div className="w-full lg:w-1/2 flex items-start">
            {placement.content.resource_type === "video" ? (
              <video
                src={placement.content.secure_url}
                controls
                className="w-full h-40 sm:h-48 md:h-56 lg:h-[53vh] rounded-md object-cover"
              />
            ) : (
              <Link
                href={placement.content.secure_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[13px] text-blue-400 underline"
              >
                View Content
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PlacementsRequestsDetails;
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCancelRecommendationMutation, useGetRecommendationResponsesQuery } from "@/redux/features/agents/agent";
import { useParams } from "next/navigation";
import Image from "next/image";
import { FiMail, FiPhone, FiUser } from "react-icons/fi";
import Swal from "sweetalert2";
import Link from "next/link";

const RecommendedPlayersDetails = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetRecommendationResponsesQuery(id as string);

  const recommendation = data?.data;
  const player = recommendation?.player;
  

  const [CancelRecommendation] = useCancelRecommendationMutation();

  const handleCancel = async (id: string) => {
    try {
      const res = await CancelRecommendation({ id }).unwrap();
      if (res?.success === true) {
        Swal.fire({
          title: "Good job!",
          text: `${res?.message}` || "cancel successful",
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
    return <div className="text-white py-5">Loading...</div>;
  }

  return (
    <div className="flex space-x-4 py-5">
      {/* Left Panel */}
      <div className="w-full md:w-[30%] rounded-lg flex flex-col bg-[#2a2a2a]">
        {/* Avatar */}
        <div className="w-full h-54 bg-[#4a4a4a] rounded-t-lg flex items-center justify-center overflow-hidden">
          {player?.image ? (
            <Image
              src={player.image}
              alt={player?.name || "Player"}
              width={192}
              height={192}
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
          <p className="text-white text-base font-medium mb-3">{player?.name || "N/A"}</p>

          <div className="flex items-center gap-2 mb-2">
            <FiMail className="text-[#888] w-3.5 h-3.5 shrink-0" />
            <span className="text-[#888] text-xs w-24">Email</span>
            <span className="text-[#ccc] text-xs">:</span>
            <span className="text-[#ccc] text-xs">{player?.email || "N/A"}</span>
          </div>

          <div className="flex items-center gap-2 mb-2">
            <FiPhone className="text-[#888] w-3.5 h-3.5 shrink-0" />
            <span className="text-[#888] text-xs w-24">Phone Number</span>
            <span className="text-[#ccc] text-xs">:</span>
            <span className="text-[#ccc] text-xs">{player?.phone || "N/A"}</span>
          </div>

          <div className="flex items-center gap-2 mb-2">
            <FiUser className="text-[#888] w-3.5 h-3.5 shrink-0" />
            <span className="text-[#888] text-xs w-24">Status</span>
            <span className="text-[#ccc] text-xs">:</span>
            <span className="text-[#ccc] text-xs capitalize">{recommendation?.status || "N/A"}</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-2.5 px-4 pb-4 mt-auto">
          <button
            onClick={() => handleCancel(id as string)}
            disabled={recommendation?.status === "cancelled"}
            className="flex-1 bg-[#e53935] text-white text-sm font-medium py-2 px-4 rounded-md hover:bg-[#c62828] transition-colors disabled:bg-[#8a3a38] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-[#8a3a38]"
          >
            {recommendation?.status === "cancelled" ? "Cancelled" : "Cancel"}
          </button>
          <Link href={`/messaging/${player?._id}`} className="flex-1 bg-transparent text-[#ccc] text-sm font-medium py-2 px-4 rounded-md border border-[#666] hover:bg-[#444] transition-colors">
            Message
          </Link>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-full md:w-[65%] rounded-lg flex-1 bg-[#3F3F3F] px-7 py-6">
        <p className="text-white text-[17px] font-medium mb-5">{player?.name || "N/A"}</p>

        {[
          { label: "Position", value: recommendation?.position || "N/A" },
          { label: "Club", value: recommendation?.clubeHiring?.author?.name || "N/A" },
          { label: "Club Email", value: recommendation?.clubeHiring?.author?.email || "N/A" },
          {
            label: "Message",
            value: recommendation?.message || "N/A",
            muted: true,
          },
        ].map(({ label, value, muted }) => (
          <div key={label} className="flex items-start gap-0 mb-3.5">
            <span className="text-[#888] text-[13px] min-w-[140px]">{label}</span>
            <span className="text-[#666] text-[13px] mr-2.5">:</span>
            <span className={`text-[13px] ${muted ? "text-[#666] italic" : "text-[#ccc]"}`}>
              {value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedPlayersDetails;
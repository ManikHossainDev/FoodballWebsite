/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { useAddHiringRecommendMutation, useGetSingleClubHiringQuery, useGetSuggestionsListQuery } from "@/redux/features/agents/agent";
import { useParams } from "next/navigation";
import { useState, useMemo, useRef, useEffect } from "react";
import Image from "next/image";
import Swal from "sweetalert2";
import { FiX, FiChevronDown } from "react-icons/fi";
import { FaShieldAlt } from "react-icons/fa";

interface SuggestedPlayer {
  _id: string;
  name: string;
  email: string;
  image?: string;
  status: string;
}

const RecommendPlayerFc = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetSingleClubHiringQuery(id as string);
  const post = data?.data;
  const { data: SuggestionsList, isFetching: isSuggestionsLoading } = useGetSuggestionsListQuery();
  const players: SuggestedPlayer[] = SuggestionsList?.data ?? [];
  const [AddHiringRecommend, { isLoading: isSending }] = useAddHiringRecommendMutation();
  const [selectedPosition, setSelectedPosition] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPlayerId, setSelectedPlayerId] = useState<string>(""); // <-- this goes to backend
  const [message, setMessage] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredPlayers = useMemo(() => {
    if (!searchTerm.trim()) return players;
    return players.filter((p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [players, searchTerm]);

  if (isLoading) {
    return <div className="text-white py-10 text-center">Loading...</div>;
  }

  const isOpen = post?.status === "open";
  const positionTags = post?.positionTitle
    ? post.positionTitle.split(",").map((p: string) => p.trim())
    : [];

  const handleSelectPlayer = (player: SuggestedPlayer) => {
    setSelectedPlayerId(player._id);
    setSearchTerm(player.name);
    setShowDropdown(false);
  };

  const handleSendRecommendation = async () => {
    // Validation checks before sending
    if (!selectedPlayerId) {
      Swal.fire({
        icon: "warning",
        title: "Player Required",
        text: "Please select a player before sending the recommendation.",
        background: "#2a2a2a",
        color: "#fff",
        confirmButtonColor: "#e53935",
      });
      return;
    }

    if (!selectedPosition) {
      Swal.fire({
        icon: "warning",
        title: "Position Required",
        text: "Please select a position for this recommendation.",
        background: "#2a2a2a",
        color: "#fff",
        confirmButtonColor: "#e53935",
      });
      return;
    }

    if (!message.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Message Required",
        text: "Please write a short message to the club.",
        background: "#2a2a2a",
        color: "#fff",
        confirmButtonColor: "#e53935",
      });
      return;
    }

    const payload = {
      player: selectedPlayerId,
      position: selectedPosition,
      message: message.trim(),
    };

    try {
      const res = await AddHiringRecommend({ id: id as string, data: payload }).unwrap();
      console.log(res)
      if(res?.success ===  true){
        Swal.fire({
        icon: "success",
        title: "Recommendation Sent",
        text: res?.message || "Your recommendation has been sent to the club.",
        background: "#2a2a2a",
        color: "#fff",
        confirmButtonColor: "#e53935",
      });

      // Reset form after success
      setSelectedPlayerId("");
      setSearchTerm("");
      setSelectedPosition("");
      setMessage("");
      }
    } catch (error: any) {
      console.error("Failed to send recommendation:", error);
      Swal.fire({
        icon: "error",
        title: "Something went wrong",
        text:
          error?.data?.message ||
          "Could not send the recommendation. Please try again.",
        background: "#2a2a2a",
        color: "#fff",
        confirmButtonColor: "#e53935",
      });
    }
  };

  return (
    <div className="lg:flex space-y-2 lg:space-x-6 py-5">
      {/* Left Panel - Club Card */}
      <div className="w-full lg:w-[40%] xl:w-[20%] rounded-lg flex flex-col bg-[#2a2a2a]">
        <div className="w-full h-40 bg-gradient-to-br from-[#7a1f1f] to-[#5a1515] rounded-t-lg flex items-center justify-center relative">
          <div className="absolute top-3 right-3 flex items-center gap-1.5">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isOpen ? "bg-[#4ade80]" : "bg-[#f87171]"
              }`}
            />
            <span className="text-[#ddd] text-[11px] capitalize">
              {post?.status ?? "Unknown"}
            </span>
          </div>

          <div className="w-20 h-20 rounded-full bg-[#1b1b1b] flex items-center justify-center shadow-md overflow-hidden relative">
            {post?.author?.image ? (
              <Image
                src={post.author.image}
                alt={post.author.name}
                fill
                sizes="80px"
                className="object-cover"
              />
            ) : (
              <FaShieldAlt size={36} className="text-[#f5b942]" />
            )}
          </div>
        </div>

        <div className="px-4 pt-3">
          <p className="text-white text-base font-medium text-center mb-3">
            {post?.author?.name ?? "Unknown Club"}
          </p>

          <p className="text-[#aaa] text-xs leading-relaxed mb-4 line-clamp-3">
            {post?.overview}
          </p>

          <div className="mb-3">
            <div className="flex items-center justify-between mb-1.5">
              <p className="text-[#888] text-xs">Open Position</p>
              <p className="text-[#ccc] text-xs">
                {String(post?.openPositions ?? 0).padStart(2, "0")}
              </p>
            </div>
            <div className="flex gap-2 flex-wrap">
              {positionTags.length > 0 ? (
                positionTags.map((tag: string) => (
                  <span
                    key={tag}
                    className="text-[#ccc] text-xs border border-[#555] rounded px-3 py-1"
                  >
                    {tag}
                  </span>
                ))
              ) : (
                <span className="text-[#666] text-xs">No positions listed</span>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between mt-4 mb-1">
            <span className="text-[#888] text-xs">Type</span>
            <span className="text-[#ccc] text-xs">{post?.employmentType}</span>
          </div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-[#888] text-xs">Salary Range</span>
            <span className="text-[#ccc] text-xs">{post?.salaryRange}</span>
          </div>
        </div>
      </div>

      {/* Right Panel - Recommendation Form */}
      <div className="w-full lg:w-[55%] xl:w-[60%] rounded-lg flex-1 bg-[#2a2a2a] px-6 py-5 relative">
        <button
          type="button"
          aria-label="Close"
          className="absolute top-5 right-5 text-[#888] hover:text-white transition-colors"
        >
          <FiX size={18} />
        </button>

        <p className="text-white text-[15px] font-semibold mb-6 pr-8">
          Send player recommendations and details to the club
        </p>

        {/* Select Player - name only dropdown */}
        <div className="mb-4 relative" ref={wrapperRef}>
          <label className="block text-[#999] text-xs mb-1.5">Select Player</label>
          <div className="flex items-center justify-between bg-[#3a3a3a] border border-[#555] rounded-md px-3 py-2.5">
            <input
              type="text"
              value={searchTerm}
              onFocus={() => setShowDropdown(true)}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setSelectedPlayerId("");
                setShowDropdown(true);
              }}
              placeholder="Start typing player name..."
              className="bg-transparent text-[#ccc] text-xs placeholder-[#777] outline-none w-full"
            />
            <FiChevronDown className="text-[#888]" size={14} />
          </div>

          {showDropdown && (
            <div className="absolute z-20 mt-1 w-full bg-[#3a3a3a] border border-[#555] rounded-md shadow-lg max-h-56 overflow-y-auto">
              {isSuggestionsLoading ? (
                <div className="text-[#888] text-xs px-3 py-3 text-center">
                  Loading players...
                </div>
              ) : filteredPlayers.length > 0 ? (
                filteredPlayers.map((player) => (
                  <button
                    key={player._id}
                    type="button"
                    onClick={() => handleSelectPlayer(player)}
                    className="w-full flex items-center gap-2 text-left px-3 py-2 text-[#ccc] text-xs hover:bg-[#4a4a4a] transition-colors"
                  >
                    {player.image ? (
                      <span className="relative w-5 h-5 rounded-full overflow-hidden shrink-0">
                        <Image
                          src={player.image}
                          alt={player.name}
                          fill
                          sizes="20px"
                          className="object-cover"
                        />
                      </span>
                    ) : (
                      <span className="w-5 h-5 rounded-full bg-[#555] shrink-0" />
                    )}
                    {player.name}
                  </button>
                ))
              ) : (
                <div className="text-[#888] text-xs px-3 py-3 text-center">
                  No players found
                </div>
              )}
            </div>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-[#999] text-xs mb-1.5">Select Position</label>
          <select
            value={selectedPosition}
            onChange={(e) => setSelectedPosition(e.target.value)}
            className="w-full bg-[#3a3a3a] border border-[#555] rounded-md px-3 py-2.5 text-[#ccc] text-xs outline-none appearance-none"
          >
            <option value="" disabled>
              {positionTags.length > 0
                ? "Select a position"
                : "No open positions available"}
            </option>
            {positionTags.map((tag: string) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-[#999] text-xs mb-1.5">Message to Club</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Introduce your player and highlight their strengths..."
            rows={4}
            className="w-full bg-[#3a3a3a] border border-[#555] rounded-md px-3 py-2.5 text-[#ccc] text-xs placeholder-[#777] outline-none resize-none"
          />
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleSendRecommendation}
            disabled={!selectedPlayerId || isSending}
            className="lg:w-1/3 bg-[#e53935] text-white text-sm font-medium py-2.5 px-4 rounded-md hover:bg-[#c62828] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSending ? "Sending..." : "Send Recommendation"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecommendPlayerFc;
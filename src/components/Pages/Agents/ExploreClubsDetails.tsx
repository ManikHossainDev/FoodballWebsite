"use client"
import { useGetSingleClubHiringQuery } from "@/redux/features/agents/agent";
import Link from "next/link";
import { useParams } from "next/navigation";

// Helper to turn a sentence-style string into bullet points
const toBulletList = (text?: string) => {
  if (!text) return [];
  return text
    .split(/\.\s+|,\s+(?=[A-Z])/) // split on ". " or ", Capitalized"
    .map((s) => s.trim().replace(/\.$/, ""))
    .filter(Boolean);
};

const ExploreClubsDetails = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetSingleClubHiringQuery(id as string);

  const post = data?.data;

  if (isLoading) {
    return <div className="text-white py-10 text-center">Loading...</div>;
  }

  if (isError || !post) {
    return <div className="text-white py-10 text-center">Failed to load hiring post.</div>;
  }

  const requirementsList = toBulletList(post.requirements);
  const facilitiesList = toBulletList(post.facilities);

  return (
    <div className="lg:flex space-y-2 lg:space-x-10 py-3">
      {/* Left Panel */}
      <div className="w-full lg:w-[20%] rounded-lg flex flex-col bg-[#2a2a2a]">
        {/* Club Banner / Logo */}
        <div className="w-full h-40 bg-gradient-to-br from-[#7a1f1f] to-[#5a1515] rounded-t-lg flex items-center justify-center relative">
          <div className="absolute top-3 right-3 flex items-center gap-1.5">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                post.status === "open" ? "bg-[#4ade80]" : "bg-[#f87171]"
              }`}
            />
            <span className="text-[#ddd] text-[11px] capitalize">{post.status}</span>
          </div>

          <div className="w-20 h-20 rounded-full bg-[#1b1b1b] flex items-center justify-center shadow-md overflow-hidden">
            {post.author?.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={post.author.image}
                alt={post.author.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <path d="M24 4 L42 12 V24 C42 36 34 42 24 44 C14 42 6 36 6 24 V12 Z" fill="#f5b942" />
                <path d="M24 10 L36 16 V24 C36 32 30 37 24 39 V10 Z" fill="#2e7d32" />
                <circle cx="24" cy="22" r="6" fill="#fff" />
              </svg>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="px-4 pt-3">
          <p className="text-white text-base font-medium text-center mb-3">
            {post.author?.name}
          </p>

          <p className="text-[#aaa] text-xs leading-relaxed mb-4">
            {post.positionTitle} – &ldquo;{post.overview?.slice(0, 90)}
            {post.overview && post.overview.length > 90 ? "..." : ""}&rdquo;
          </p>

          <div className="mb-3">
            <div className="flex justify-between">
              <p className="text-[#888] text-xs mb-1.5">Open Position</p>
              <p className="text-[#ccc] text-xs mb-2">
                {String(post.openPositions).padStart(2, "0")}
              </p>
            </div>
            <div className="flex gap-2">
              <span className="text-[#ccc] text-xs border border-[#555] rounded px-3 py-1">
                {post.positionTitle}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4 mb-1">
            <span className="text-[#888] text-xs">Type</span>
            <span className="text-[#ccc] text-xs">{post.employmentType}</span>
          </div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-[#888] text-xs">Salary Range</span>
            <span className="text-[#ccc] text-xs">{post.salaryRange}</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-2.5 px-4 pb-4 mt-auto">
          <Link
            href={`/exploreclubs/${post._id}/recommendplayercf`}
            className="w-full bg-[#e53935] text-white text-sm font-medium py-2.5 px-4 rounded-md hover:bg-[#c62828] transition-colors"
          >
            Recommend Player
          </Link>
          <button className="w-full bg-transparent text-[#e57373] text-sm font-medium py-2.5 px-4 rounded-md border border-[#a33] hover:bg-[#3a2a2a] transition-colors">
            Messages
          </button>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-full lg:w-[65%] rounded-lg flex-1 bg-[#3F3F3F] px-7 py-6">
        {/* Club Overview */}
        <div className="mb-6">
          <p className="text-white text-sm font-semibold mb-2.5">Overview</p>
          <p className="text-[#bbb] text-[13px] leading-relaxed">{post.overview}</p>
        </div>

        {/* Player Requirements */}
        <div className="mb-6">
          <p className="text-white text-sm font-semibold mb-2.5">Player Requirements</p>
          <ul className="space-y-1.5">
            {requirementsList.map((item) => (
              <li key={item} className="text-[#bbb] text-[13px] leading-relaxed flex gap-2">
                <span className="text-[#888]">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Benefits & Perks */}
        <div>
          <p className="text-white text-sm font-semibold mb-2.5">Benefits & Perks</p>
          <ul className="space-y-1.5">
            {facilitiesList.map((item) => (
              <li key={item} className="text-[#bbb] text-[13px] leading-relaxed flex gap-2">
                <span className="text-[#888]">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ExploreClubsDetails;
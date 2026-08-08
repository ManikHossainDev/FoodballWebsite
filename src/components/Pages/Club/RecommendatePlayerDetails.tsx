"use client";
import { useGetUserProfileQuery } from "@/redux/features/Profile/Profile";
import { useParams } from "next/navigation";
import Image from "next/image";
import { FiMail, FiPhone, FiUser } from "react-icons/fi";
import Link from "next/link";

const RecommendatePlayerDetails = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetUserProfileQuery(id);

  const user = data?.data;
  const profile = user?.profile;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20 text-[#ccc]">
        Loading...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center py-20 text-[#ccc]">
        No profile found.
      </div>
    );
  }

  const details = [
    { label: "Position", value: profile?.position || "—" },
    { label: "Current Club", value: profile?.currentClub || "—" },
    { label: "Current Team", value: profile?.currentTeam || "—" },
    { label: "Location", value: profile?.location || "—" },
    { label: "Career Total", value: profile?.careerToal || "—" },
    {
      label: "Key Skills",
      value: profile?.keySkills?.length ? profile.keySkills.join(", ") : "—",
    },
    {
      label: "Achievements",
      value: profile?.achievements || "No achievements listed yet.",
      muted: !profile?.achievements,
    },
  ];

  return (
    <div className="flex space-x-24 py-5">
      {/* Left Panel */}
      <div className="w-full md:w-[20%] rounded-lg flex flex-col bg-[#2a2a2a]">
        {/* Avatar */}
        <div className="w-full h-48 bg-[#4a4a4a] rounded-t-lg flex items-center justify-center overflow-hidden">
          {user.image ? (
            <Image
              src={user.image}
              alt={user.name}
              width={192}
              height={192}
              className="w-full h-full object-fill object-center"
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
          <p className="text-white text-base font-medium mb-3">{user.name}</p>

          <div className="flex items-center gap-2 mb-2">
            <FiMail className="text-[#888] w-3.5 h-3.5 shrink-0" />
            <span className="text-[#888] text-xs w-24">Email</span>
            <span className="text-[#ccc] text-xs">:</span>
            <span className="text-[#ccc] text-xs truncate">{user.email}</span>
          </div>

          <div className="flex items-center gap-2 mb-2">
            <FiPhone className="text-[#888] w-3.5 h-3.5 shrink-0" />
            <span className="text-[#888] text-xs w-24">Phone Number</span>
            <span className="text-[#ccc] text-xs">:</span>
            <span className="text-[#ccc] text-xs">{user.phone || "—"}</span>
          </div>

          <div className="flex items-center gap-2 mb-2">
            <FiUser className="text-[#888] w-3.5 h-3.5 shrink-0" />
            <span className="text-[#888] text-xs w-24">Age</span>
            <span className="text-[#ccc] text-xs">:</span>
            <span className="text-[#ccc] text-xs">{profile?.age ?? "—"}</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="p-5 w-full">

          <Link href={`/messaging/${id}`} className="w-full bg-transparent text-[#ccc] text-sm font-medium py-2 px-4 rounded-md border border-[#666] hover:bg-[#444] transition-colors">
            Message
          </Link>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-full md:w-[65%] rounded-lg flex-1 bg-[#3F3F3F] px-7 py-6">
        <p className="text-white text-[17px] font-medium mb-5">{user.name}</p>

        {details.map(({ label, value, muted }) => (
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

export default RecommendatePlayerDetails;
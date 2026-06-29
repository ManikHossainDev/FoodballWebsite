import { FiMail, FiPhone, FiUser } from "react-icons/fi";

const ExploreClubsDetails = () => {
  return (
    <div className="flex  space-x-24 py-5">
      {/* Left Panel */}
      <div className="w-full md:w-[20%] rounded-lg  flex flex-col bg-[#2a2a2a]">
        {/* Avatar */}
        <div className="w-full h-48 bg-[#4a4a4a] rounded-t-lg flex items-center justify-center">
          <svg className="opacity-50" width="80" height="80" viewBox="0 0 80 80" fill="none">
            <circle cx="40" cy="30" r="20" fill="#888" />
            <ellipse cx="40" cy="72" rx="28" ry="18" fill="#888" />
          </svg>
        </div>

        {/* Info */}
        <div className="px-4 pt-4">
          <p className="text-white text-base font-medium mb-3">Marcus Silva</p>

          <div className="flex items-center gap-2 mb-2">
            <FiMail className="text-[#888] w-3.5 h-3.5 shrink-0" />
            <span className="text-[#888] text-xs w-24">Email</span>
            <span className="text-[#ccc] text-xs">:</span>
            <span className="text-[#ccc] text-xs">johnsmith@example.com</span>
          </div>

          <div className="flex items-center gap-2 mb-2">
            <FiPhone className="text-[#888] w-3.5 h-3.5 shrink-0" />
            <span className="text-[#888] text-xs w-24">Phone Number</span>
            <span className="text-[#ccc] text-xs">:</span>
            <span className="text-[#ccc] text-xs">+1234567890</span>
          </div>

          <div className="flex items-center gap-2 mb-2">
            <FiUser className="text-[#888] w-3.5 h-3.5 shrink-0" />
            <span className="text-[#888] text-xs w-24">Age</span>
            <span className="text-[#ccc] text-xs">:</span>
            <span className="text-[#ccc] text-xs">21</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-2.5 px-4 pb-4 mt-auto">
          <button className="flex-1 bg-[#e53935] text-white text-sm font-medium py-2 px-4 rounded-md hover:bg-[#c62828] transition-colors">
            Accept Request
          </button>
          <button className="flex-1 bg-transparent text-[#ccc] text-sm font-medium py-2 px-4 rounded-md border border-[#666] hover:bg-[#444] transition-colors">
            Message
          </button>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-full md:w-[65%] rounded-lg flex-1 bg-[#3F3F3F] px-7 py-6">
        <p className="text-white text-[17px] font-medium mb-5">Marcus Silva</p>

        {[
          { label: "Position", value: "Forward" },
          { label: "Experience", value: "5 years" },
          { label: "Preferred Club", value: "Barcelona FC" },
          { label: "Preferred Leagues", value: "Premier League" },
          { label: "Current Club Status", value: "Premier League" },
          {
            label: "Career Goals",
            value: "What are your short-term and long-term career objectives?",
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

export default ExploreClubsDetails; 
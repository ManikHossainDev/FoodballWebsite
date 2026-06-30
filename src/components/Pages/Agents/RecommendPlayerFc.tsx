const RecommendPlayerFc = () => {
  return (
    <div className="flex space-x-6 py-5">
      {/* Left Panel - Club Card */}
      <div className="w-full md:w-[20%] rounded-lg flex flex-col bg-[#2a2a2a]">
        <div className="w-full h-40 bg-gradient-to-br from-[#7a1f1f] to-[#5a1515] rounded-t-lg flex items-center justify-center relative">
          <div className="absolute top-3 right-3 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80]" />
            <span className="text-[#ddd] text-[11px]">Open</span>
          </div>

          <div className="w-20 h-20 rounded-full bg-[#1b1b1b] flex items-center justify-center shadow-md">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <path d="M24 4 L42 12 V24 C42 36 34 42 24 44 C14 42 6 36 6 24 V12 Z" fill="#f5b942" />
              <path d="M24 10 L36 16 V24 C36 32 30 37 24 39 V10 Z" fill="#2e7d32" />
              <circle cx="24" cy="22" r="6" fill="#fff" />
            </svg>
          </div>
        </div>

        <div className="px-4 pt-3">
          <p className="text-white text-base font-medium text-center mb-3">FC Valencia</p>

          <p className="text-[#aaa] text-xs leading-relaxed mb-4">
            Striker Coach – &ldquo;Specializing in dribbling, finishing, and attacking strategies for all levels.&rdquo;
          </p>

          <div className="mb-3">
            <div className="flex items-center justify-between mb-1.5">
              <p className="text-[#888] text-xs">Open Position</p>
              <p className="text-[#ccc] text-xs">03</p>
            </div>
            <div className="flex gap-2">
              <span className="text-[#ccc] text-xs border border-[#555] rounded px-3 py-1">
                Forward
              </span>
              <span className="text-[#ccc] text-xs border border-[#555] rounded px-3 py-1">
                Midfielder
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4 mb-1">
            <span className="text-[#888] text-xs">Type</span>
            <span className="text-[#ccc] text-xs">Full-time</span>
          </div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-[#888] text-xs">Salary Range</span>
            <span className="text-[#ccc] text-xs">$55k/year</span>
          </div>
        </div>
      </div>

      {/* Right Panel - Recommendation Form */}
      <div className="w-full md:w-[55%] rounded-lg flex-1 bg-[#2a2a2a] px-6 py-5 relative">
        <button
          type="button"
          aria-label="Close"
          className="absolute top-5 right-5 text-[#888] hover:text-white text-sm"
        >
          ✕
        </button>

        <p className="text-white text-[15px] font-semibold mb-6 pr-8">
          Send player recommendations and details to the club
        </p>

        <div className="mb-4">
          <label className="block text-[#999] text-xs mb-1.5">Select Player</label>
          <div className="flex items-center justify-between bg-[#3a3a3a] border border-[#555] rounded-md px-3 py-2.5">
            <input
              type="text"
              placeholder="Start typing player name..."
              className="bg-transparent text-[#ccc] text-xs placeholder-[#777] outline-none w-full"
            />
            <span className="text-[#888] text-xs">▾</span>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-[#999] text-xs mb-1.5">Select Position</label>
          <input
            type="text"
            placeholder="Start typing player name..."
            className="w-full bg-[#3a3a3a] border border-[#555] rounded-md px-3 py-2.5 text-[#ccc] text-xs placeholder-[#777] outline-none"
          />
        </div>

        <div className="mb-6">
          <label className="block text-[#999] text-xs mb-1.5">Message to Club</label>
          <textarea
            placeholder="Introduce your player and highlight their strengths..."
            rows={4}
            className="w-full bg-[#3a3a3a] border border-[#555] rounded-md px-3 py-2.5 text-[#ccc] text-xs placeholder-[#777] outline-none resize-none"
          />
        </div>

        <div className="flex justify-end">
          <button className="w-1/2 bg-[#e53935] text-white text-sm font-medium py-2.5 px-4 rounded-md hover:bg-[#c62828] transition-colors">
            Send Recommendation
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecommendPlayerFc;
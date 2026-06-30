import Link from "next/link";


const ExploreClubsDetails = () => {
  return (
    <div className="flex space-x-10 py-3">
      {/* Left Panel */}
      <div className="w-full md:w-[20%] rounded-lg flex flex-col bg-[#2a2a2a]">
        {/* Club Banner / Logo */}
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

        {/* Info */}
        <div className="px-4 pt-3">
          <p className="text-white text-base font-medium text-center mb-3">FC Valencia</p>

          <p className="text-[#aaa] text-xs leading-relaxed mb-4">
            Striker Coach – &ldquo;Specializing in dribbling, finishing, and attacking strategies for all levels.&rdquo;
          </p>

          <div className="mb-3">
            <div className="flex justify-between">
              <p className="text-[#888] text-xs mb-1.5">Open Position</p>
              <p className="text-[#ccc] text-xs mb-2">03</p>
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

        {/* Buttons */}
        <div className="flex flex-col gap-2.5 px-4 pb-4 mt-auto">
          <Link href={`/exploreclubs/1/recommendplayercf`} className="w-full bg-[#e53935] text-white text-sm font-medium py-2.5 px-4 rounded-md hover:bg-[#c62828] transition-colors">
            Recommend Player
          </Link>
          <button className="w-full bg-transparent text-[#e57373] text-sm font-medium py-2.5 px-4 rounded-md border border-[#a33] hover:bg-[#3a2a2a] transition-colors">
            Messages
          </button>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-full md:w-[65%] rounded-lg flex-1 bg-[#3F3F3F] px-7 py-6">
        {/* Introduction */}
        <div className="mb-6">
          <p className="text-white text-sm font-semibold mb-2.5">Introduction:</p>
          <p className="text-[#bbb] text-[13px] leading-relaxed italic">
            &ldquo;I&apos;m Coach John Doe, a former professional footballer turned coach. With over
            10 years of coaching experience, I specialize in helping strikers improve their
            attacking skills, dribbling, finishing, and overall game intelligence. My approach
            combines practical training techniques with mental conditioning, ensuring that
            players can perform under pressure.&rdquo;
          </p>
        </div>

        {/* Club Overview */}
        <div className="mb-6">
          <p className="text-white text-sm font-semibold mb-2.5">Club Overview</p>
          <p className="text-[#bbb] text-[13px] leading-relaxed">
            FC Valencia is a prestigious football club competing in La Liga. We are committed to
            developing talent and achieving excellence both on and off the pitch. Our
            state-of-the-art training facilities and experienced coaching staff provide the
            perfect environment for professional growth.
          </p>
        </div>

        {/* Player Requirements */}
        <div className="mb-6">
          <p className="text-white text-sm font-semibold mb-2.5">Player Requirements</p>
          <ul className="space-y-1.5">
            {[
              "Age: 18-28 years old",
              "Professional experience in similar competitive leagues",
              "Strong technical skills and tactical understanding",
              "Team player with excellent work ethic",
              "Available for immediate or next season start",
            ].map((item) => (
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
            {[
              "Competitive salary package with performance bonuses",
              "Access to world-class training facilities",
              "Professional development programs and mentorship",
              "Medical insurance and comprehensive healthcare",
              "Relocation assistance and housing support",
            ].map((item) => (
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
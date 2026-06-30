import { User, Mail, Phone } from "lucide-react";

const ClubDetails = () => {
  const requirements = [
    "Age: 18-28 years old",
    "Professional experience in similar competitive leagues",
    "Strong technical skills and tactical understanding",
    "Team player with excellent work ethic",
    "Available for immediate or next season start",
  ];

  const perks = [
    "Competitive salary package with performance bonuses",
    "Access to world-class training facilities",
    "Professional development programs and mentorship",
    "Medical insurance and comprehensive healthcare",
    "Relocation assistance and housing support",
  ];

  return (
    <div className=" text-[#e8e6e3] flex font-sans">
        <br />
      {/* Sidebar */}
      <div className="w-[260px] shrink-0 p-6 flex flex-col">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 to-red-600 flex items-center justify-center text-2xl mb-3 ring-1 ring-white/10">
            🦇
          </div>
          <h1 className="text-base font-semibold tracking-tight">FC Valencia</h1>
        </div>

        <div className="h-px bg-white/5 mb-6" />

        <p className="text-sm leading-relaxed text-white/70 mb-8">
          Striker Coach – Specializing in dribbling, finishing,
          and attacking strategies for all levels.
        </p>

        <div className="space-y-5 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-white/40 uppercase tracking-wide">Open Position</span>
            <span className="text-white/80 font-medium">03</span>
          </div>

          <div className="flex items-start justify-between">
            <span className="text-white/40 uppercase tracking-wide pt-1">Age</span>
            <div className="flex gap-1.5">
              <span className="px-2 py-0.5 rounded-full border border-white/15 text-white/70 text-[11px]">
                Forward
              </span>
              <span className="px-2 py-0.5 rounded-full border border-white/15 text-white/70 text-[11px]">
                Midfielder
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-white/40 uppercase tracking-wide">Type</span>
            <span className="text-white/80 font-medium">Full-time</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-white/40 uppercase tracking-wide">Salary Range</span>
            <span className="text-white/80 font-medium">$55k/year</span>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 p-10 flex flex-col">
        <div className="flex-1 space-y-8 max-w-2xl">
          <section>
            <h2 className="text-sm font-semibold mb-3 text-white/90">Introduction</h2>
            <p className="text-sm leading-relaxed text-white/60 italic">
              Im Coach John Doe, a former professional footballer turned coach. With over 10 years of coaching experience,
              I specialize in helping strikers improve their attacking skills, dribbling, finishing, and overall game intelligence.
              My approach combines practical training techniques with mental conditioning, ensuring that players can perform under pressure.
            </p>
          </section>

          <section>
            <h2 className="text-sm font-semibold mb-3 text-white/90">Club Overview</h2>
            <p className="text-sm leading-relaxed text-white/60">
              FC Valencia is a prestigious football club competing in La Liga. We are committed to developing talent and
              achieving excellence both on and off the pitch. Our state-of-the-art training facilities and experienced
              coaching staff provide the perfect environment for professional growth.
            </p>
          </section>

          <section>
            <h2 className="text-sm font-semibold mb-3 text-white/90">Player Requirements</h2>
            <ul className="space-y-1.5">
              {requirements.map((item) => (
                <li key={item} className="text-sm text-white/60 flex gap-2">
                  <span className="text-white/30">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-sm font-semibold mb-3 text-white/90">Benefits &amp; Perks</h2>
            <ul className="space-y-1.5">
              {perks.map((item) => (
                <li key={item} className="text-sm text-white/60 flex gap-2">
                  <span className="text-white/30">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-sm font-semibold mb-3 text-white/90">Contact Information</h2>
            <div className="space-y-2 text-sm text-white/60">
              <div className="flex items-center gap-2">
                <User size={14} className="text-white/40" />
                Recruitment Manager: Carlos Fernandez
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-white/40" />
                recruitment@fcvalencia.com
              </div>
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-white/40" />
                +34 123 456 789
              </div>
            </div>
          </section>
        </div>

        <div className="flex justify-end gap-3 pt-6 mt-6 border-t border-white/5">
          <button className="px-4 py-2 text-sm rounded-md border border-white/15 text-white/80 hover:bg-white/5 transition-colors">
            Edit Post
          </button>
          <button className="px-4 py-2 text-sm rounded-md bg-red-600 hover:bg-red-500 transition-colors font-medium">
            See Recommended Player
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClubDetails;
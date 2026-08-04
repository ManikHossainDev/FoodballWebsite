"use client"
import { useGetSingleClubQuery } from "@/redux/features/club/club";
import Link from "next/link";
import { useParams } from "next/navigation";

const ClubDetails = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetSingleClubQuery(id as string);
  const club = data?.data;

  if (isLoading) {
    return <div className="text-[#e8e6e3] p-10">Loading...</div>;
  }

  if (!club) {
    return <div className="text-[#e8e6e3] p-10">No club data found.</div>;
  }

  return (
    <div className="text-[#e8e6e3] flex font-sans">
      {/* Sidebar */}
      <div className="w-[260px] shrink-0 p-6 flex flex-col">
        <div className="flex flex-col items-center text-center mb-8">
          <h1 className="text-base font-semibold tracking-tight">
            {club.positionTitle}
          </h1>
        </div>

        <div className="h-px bg-white/5 mb-6" />

        <div className="space-y-5 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-white/40 uppercase tracking-wide">Open Position</span>
            <span className="text-white/80 font-medium">{club.openPositions}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-white/40 uppercase tracking-wide">Type</span>
            <span className="text-white/80 font-medium">{club.employmentType}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-white/40 uppercase tracking-wide">Salary Range</span>
            <span className="text-white/80 font-medium">${club.salaryRange}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-white/40 uppercase tracking-wide">Deadline</span>
            <span className="text-white/80 font-medium">
              {new Date(club.dateLine).toLocaleDateString()}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-white/40 uppercase tracking-wide">Status</span>
            <span className="text-white/80 font-medium capitalize">{club.status}</span>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 p-10 flex flex-col">
        <div className="flex-1 space-y-8 max-w-2xl">
          <section>
            <h2 className="text-sm font-semibold mb-3 text-white/90">Club Overview</h2>
            <p className="text-sm leading-relaxed text-white/60">{club.overview}</p>
          </section>

          <section>
            <h2 className="text-sm font-semibold mb-3 text-white/90">Player Requirements</h2>
            <p className="text-sm leading-relaxed text-white/60">{club.requirements}</p>
          </section>

          <section>
            <h2 className="text-sm font-semibold mb-3 text-white/90">Benefits &amp; Perks</h2>
            <p className="text-sm leading-relaxed text-white/60">{club.facilities}</p>
          </section>
        </div>

        <div className="flex justify-end gap-3 pt-6 mt-6 border-t border-white/5">
          <button className="px-4 py-2 text-sm rounded-md border border-white/15 text-white/80 hover:bg-white/5 transition-colors">
            Edit Post
          </button>
          <Link href={`/Club/${id}/seerecommended`} className="px-4 py-2 text-sm rounded-md bg-red-600 hover:bg-red-500 transition-colors font-medium">
            See Recommended Player
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ClubDetails;
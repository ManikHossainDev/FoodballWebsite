/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import Image from "next/image";
import { useGetClubPlayerListQuery } from "@/redux/features/club/club";
import { MessageCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Player {
  _id: string;
  name: string;
  email: string;
  image: string;
  age: number;
  position: string;
  currentClub: string;
  currentTeam: string;
  careerToal: string;
  keySkills: string[];
}

const RecommendatePlayer = () => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading, isError } = useGetClubPlayerListQuery({
    page,
    limit,
  } as any);
  const players: Player[] = data?.data?.data || [];
  const pagination = data?.data?.pagination;
  const totalPages = pagination?.totalPages ?? 1;
  const handleCardClick = (playerId: string) => {
    router.push(`/clubrecommendateplayer/${playerId}`);
  };
  return (
    <div className="bg-[#303030] rounded-lg p-5">
      {isLoading && (
        <p className="text-zinc-400 text-sm text-center py-6">Loading players...</p>
      )}

      {isError && (
        <p className="text-red-400 text-sm text-center py-6">Failed to load players</p>
      )}

      {!isLoading && !isError && (
        <>
          <div className="flex flex-col gap-3">
            {players.map((player) => {
              const initials = player.name
                .split(" ")
                .map((n: string) => n[0])
                .join("");

              return (
                <div
                  key={player._id}
                  onClick={() => handleCardClick(player._id)}
                  className="flex items-center justify-between bg-zinc-800/80 rounded-xl px-4 py-3 cursor-pointer hover:bg-zinc-800 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    {player.image ? (
                      <div className="relative w-20 h-20 rounded-md overflow-hidden shrink-0 bg-zinc-800">
                        <Image
                          src={player.image}
                          alt={player.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-20 h-20 rounded-md bg-gradient-to-br from-zinc-700 to-zinc-900 flex items-center justify-center text-zinc-300 font-semibold text-sm shrink-0">
                        {initials}
                      </div>
                    )}

                    <div>
                      <p className="text-white font-semibold text-sm leading-tight">
                        {player.name}
                      </p>
                      <div className="text-zinc-400 text-xs leading-relaxed">
                        <p>
                          <span className="text-zinc-500">Position</span>{" "}
                          <span className="text-zinc-300">{player.position}</span>
                        </p>
                        <p>
                          <span className="text-zinc-500">Current Club</span>{" "}
                          <span className="text-zinc-300">{player.currentClub}</span>
                        </p>
                        <p>
                          <span className="text-zinc-500">Career Total</span>{" "}
                          <span className="text-zinc-300">{player.careerToal}</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  <Link
                    href={`/messaging/${player?._id}`}
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-2 bg-red-600 hover:bg-red-700 transition-colors text-white text-sm font-medium px-4 py-2 rounded-full"
                  >
                    <MessageCircle size={16} />
                    Message
                  </Link>
                </div>
              );
            })}
          </div>

          {players.length === 0 && (
            <p className="text-zinc-500 text-sm text-center py-6">No players found</p>
          )}

          {/* Dynamic Pagination */}
          {pagination && totalPages > 1 && (
            <div className="flex items-center justify-between mt-5 text-sm">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="flex items-center gap-1 px-3 py-1.5 rounded-md text-zinc-300 hover:bg-zinc-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft size={16} />
                Prev
              </button>

              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`w-8 h-8 rounded-md transition-colors ${
                      p === page
                        ? "bg-red-600 text-white"
                        : "text-zinc-400 hover:bg-zinc-700"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="flex items-center gap-1 px-3 py-1.5 rounded-md text-zinc-300 hover:bg-zinc-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                Next
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default RecommendatePlayer;
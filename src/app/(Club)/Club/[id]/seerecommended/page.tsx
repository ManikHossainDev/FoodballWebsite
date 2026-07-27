/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import { useState } from "react";
import { useParams } from "next/navigation";
import Swal from "sweetalert2";
import { useGetClubRecommendationsQuery, useUpdateClubMutation } from "@/redux/features/club/club";

type Recommendation = {
  _id: string;
  clubeHiring: string;
  position: string;
  player: {
    _id: string;
    name: string;
    email: string;
    phone: string;
    image: string;
  };
  agent: {
    _id: string;
    name: string;
    email: string;
    phone: string;
    image: string;
  };
  status: "pending" | "accepted" | "rejected";
  message: string;
  createdAt: string;
  updatedAt: string;
};

const Page = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetClubRecommendationsQuery(
    id as string
  );

  const [UpdateClub] = useUpdateClubMutation();

  const [localStatus, setLocalStatus] = useState<Record<string, string>>({});
  const recommendations: Recommendation[] = data?.data?.data ?? [];

  const handleDecision = async (recId: string, decision: "accepted" | "rejected") => {
    const prevStatus = localStatus[recId];
    setLocalStatus((prev) => ({ ...prev, [recId]: decision }));

    try {
      const res = await UpdateClub({
        id: recId,
        data: { status: decision },
      }).unwrap();

      if (res?.success === true) {
        Swal.fire({
          icon: "success",
          title: decision === "accepted" ? "Player Accepted" : "Player Rejected",
          text: res?.message || "Status updated successfully.",
          timer: 5000,
          showConfirmButton: false,
        });
      } else {
        setLocalStatus((prev) => ({ ...prev, [recId]: prevStatus ?? "pending" }));
        Swal.fire({
          icon: "error",
          title: "Update Failed",
          text: res?.message || "Something went wrong.",
          timer: 5000,
          showConfirmButton: false,
        });
      }
    } catch (error: any) {
      console.log(error);
      setLocalStatus((prev) => ({ ...prev, [recId]: prevStatus ?? "pending" }));
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error?.data?.message || "Failed to update status.",
        timer: 5000,
        showConfirmButton: false,
      });
    }
  };

  return (
    <div className="p-4 md:p-6">
      <h2
        className="text-xm md:text-2xl font-bold text-white py-3"
        style={{
          textShadow:
            "0 0 10px #ff0000, 0 0 20px #ff0000, 0 0 30px #ff0000, 0 0 40px #ff0000",
        }}
      >
        Hiring Post Details
      </h2>
      <p className="text-[#8F8F8F] mb-4">
        See the hiring post details and recommended player
      </p>

      {isLoading && (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-24 rounded-xl bg-[#1a1a1a] animate-pulse"
            />
          ))}
        </div>
      )}

      {isError && (
        <p className="text-red-500 text-sm">
          Couldn&apos;t load recommendations. Try again.
        </p>
      )}

      {!isLoading && !isError && recommendations.length === 0 && (
        <p className="text-[#8F8F8F] text-sm">
          No recommended players for this post yet.
        </p>
      )}

      <div className="space-y-3">
        {recommendations.map((rec) => {
          const status = localStatus[rec._id] ?? rec.status;

          return (
            <div
              key={rec._id}
              className="flex items-center justify-between gap-4 rounded-xl bg-[#1a1a1a] border border-white/5 px-4 py-3"
            >
              <div className="flex items-center gap-4 min-w-0">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-black/40">
                  <Image
                    src={rec.player.image}
                    alt={rec.player.name}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </div>

                <div className="min-w-0">
                  <p className="text-white font-semibold truncate">
                    {rec.player.name}
                  </p>
                  <p className="text-[#8F8F8F] text-sm truncate">
                    Position: <span className="text-white/80">{rec.position}</span>
                  </p>
                  <p className="text-[#8F8F8F] text-xs truncate">
                    Recommended by{" "}
                    <span className="text-white/70">{rec.agent.name}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {status === "pending" ? (
                  <>
                    <button
                      onClick={() => handleDecision(rec._id, "rejected")}
                      className="rounded-lg border border-white/15 px-4 py-1.5 text-sm text-white/80 hover:bg-white/5 transition-colors"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => handleDecision(rec._id, "accepted")}
                      className="rounded-lg bg-red-600 px-4 py-1.5 text-sm text-white hover:bg-red-700 transition-colors"
                    >
                      Accept
                    </button>
                  </>
                ) : (
                  <span
                    className={`rounded-lg px-3 py-1.5 text-sm capitalize ${
                      status === "accepted"
                        ? "bg-green-600/20 text-green-400"
                        : "bg-red-600/20 text-red-400"
                    }`}
                  >
                    {status}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Page;
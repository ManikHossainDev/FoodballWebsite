"use client";
import { useState } from "react";
import Link from "next/link";
import Swal from "sweetalert2";
import {FiArrowLeft, FiMail, FiPhone, FiCheck, FiX, FiAward, FiUsers,} from "react-icons/fi";
import { MdSportsSoccer } from "react-icons/md";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useActionVideoReqMutation, useSingleVideoRequestQuery,} from "@/redux/features/coach/coach";

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

type RequestStatus = "pending" | "accept" | "decline" | string;

interface Player {
  _id: string;
  name: string;
  email?: string;
  phone?: string;
  image?: string;
}

interface VideoContent {
  secure_url?: string;
  public_id?: string;
  duration?: number;
}

interface VideoRequest {
  _id: string;
  title: string;
  description?: string;
  status: RequestStatus;
  isReviewed: boolean;
  areaOfFocus?: string;
  coachFeedback?: string;
  player?: Player;
  content?: VideoContent;
}

interface SingleVideoRequestResponse {
  success: boolean;
  message?: string;
  data: VideoRequest;
}

interface ActionVideoReqResponse {
  success: boolean;
  message?: string;
}

interface ActionVideoReqPayload {
  id: string;
  data: {
    status: "accept" | "decline";
  };
}

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

// Turn a single areaOfFocus string into bullet points.
// Splits on newlines, or on ". " if it's one long sentence.
const getFocusAreas = (areaOfFocus?: string): string[] => {
  if (!areaOfFocus || areaOfFocus.trim() === "" || areaOfFocus.trim() === "-") {
    return [];
  }
  const byNewline = areaOfFocus
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
  if (byNewline.length > 1) return byNewline;
  const bySentence = areaOfFocus
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
  return bySentence.length > 0 ? bySentence : [areaOfFocus];
};
// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────
const CoachDetails = () => {
  const params = useParams<{ id: string | string[] }>();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useSingleVideoRequestQuery(id as string);
  const [ActionVideoReq] = useActionVideoReqMutation();
  const [processingId, setProcessingId] = useState<string | null>(null);
  const handleVideoAction = async (
    e: React.MouseEvent<HTMLButtonElement>,
    videoId: string,
    status: "accept" | "decline"
  ): Promise<void> => {
    e.preventDefault();
    e.stopPropagation();

    try {
      setProcessingId(videoId);

      const payload: ActionVideoReqPayload = {
        id: videoId,
        data: { status },
      };

      const res: ActionVideoReqResponse = await ActionVideoReq(payload).unwrap();

      if (res?.success) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: res.message || "Video request updated successfully.",
          timer: 2000,
          showConfirmButton: false,
        });

        refetch();
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed!",
          text: res.message || "Failed to update video request.",
        });
      }
    } catch (error: unknown) {
      const err = error as { data?: { message?: string }; message?: string };
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: err?.data?.message || err?.message || "Something went wrong.",
      });
    } finally {
      setProcessingId(null);
    }
  };

  const request: VideoRequest | undefined = (
    data as SingleVideoRequestResponse | undefined
  )?.data;
  const player = request?.player;
  const content = request?.content;
  const focusAreas = getFocusAreas(request?.areaOfFocus);

  return (
    <div className="">
      {/* ── Top Nav ── */}
      <div className="">
        <Link
          href="/Couch"
          className="text-xl md:text-2xl font-bold text-white pt-3 flex items-center space-x-2"
          style={{
            textShadow:
              "0 0 10px #ff0000, 0 0 20px #ff0000, 0 0 30px #ff0000, 0 0 40px #ff0000",
          }}
        >
          <div>
            <FiArrowLeft className="w-6 h-6" />
          </div>
          <div> Video Details </div>
        </Link>
      </div>

      {isLoading && (
        <div className="py-16 text-center text-white/50 text-sm">
          Loading video request...
        </div>
      )}

      {isError && (
        <div className="py-16 text-center text-red-400 text-sm">
          Failed to load video request.
        </div>
      )}

      {!isLoading && !isError && request && (
        <div className=" py-8 grid grid-cols-12 gap-6">
          {/* ── LEFT: Player Card — col-span-3 ── */}
          <div className="col-span-12 lg:col-span-3 bg-[#3F3F3F] rounded-xl overflow-hidden border border-white/5 flex flex-col">
            {/* Avatar */}
            <div className="relative bg-[#222] h-64">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#1a1a1a]" />
              {player?.image ? (
                <Image
                  src={player.image}
                  alt={player.name}
                  fill
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                  className="object-cover opacity-60"
                />
              ) : null}
              {/* Fallback icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <MdSportsSoccer className="w-16 h-16 text-white/10" />
              </div>
            </div>

            {/* Info */}
            <div className="p-5 flex flex-col gap-4 flex-1">
              <div>
                <h2 className="text-lg font-bold text-white">
                  {player?.name || "Unknown Player"}
                </h2>
                <div className="mt-3 flex flex-col gap-1.5 text-sm text-white/50">
                  {player?.email && (
                    <span className="flex items-center gap-2">
                      <FiMail className="w-3.5 h-3.5 text-white/30" />
                      {player.email}
                    </span>
                  )}
                  {player?.phone && (
                    <span className="flex items-center gap-2">
                      <FiPhone className="w-3.5 h-3.5 text-white/30" />
                      {player.phone}
                    </span>
                  )}
                </div>
              </div>

              {/* Stat Badges */}
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center gap-2 bg-white/5 rounded-lg px-3 py-2">
                  <FiAward className="w-4 h-4 text-[#e53e3e]" />
                  <div>
                    <p className="text-[10px] text-white/40 uppercase tracking-wide">
                      Status
                    </p>
                    <p className="text-xs font-semibold text-white capitalize">
                      {request.status}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-white/5 rounded-lg px-3 py-2">
                  <FiUsers className="w-4 h-4 text-[#e53e3e]" />
                  <div>
                    <p className="text-[10px] text-white/40 uppercase tracking-wide">
                      Reviewed
                    </p>
                    <p className="text-xs font-semibold text-white">
                      {request.isReviewed ? "Yes" : "Not yet"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-auto flex gap-3">
                <button
                  disabled={processingId === request._id}
                  onClick={(e) => handleVideoAction(e, request._id, "accept")}
                  className="flex-1 flex items-center justify-center gap-2 bg-[#e53e3e] hover:bg-red-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold py-2.5 rounded-lg transition-colors"
                >
                  <FiCheck className="w-4 h-4" />
                  {processingId === request._id ? "Processing..." : "Accept"}
                </button>
                <button
                  disabled={processingId === request._id}
                  onClick={(e) => handleVideoAction(e, request._id, "decline")}
                  className="flex-1 flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 disabled:opacity-50 disabled:cursor-not-allowed text-white/70 text-sm font-semibold py-2.5 rounded-lg transition-colors"
                >
                  <FiX className="w-4 h-4" />
                  Decline
                </button>
              </div>
            </div>
          </div>

          {/* ── CENTER: Video Card — col-span-6 ── */}
          <div className="col-span-12 lg:col-span-6 bg-[#3F3F3F] rounded-xl overflow-hidden border border-white/5 flex flex-col">
            {/* Video Player */}
            <div className="relative w-full h-[45vh] bg-[#222]">
              {content?.secure_url ? (
                <video
                  src={content.secure_url}
                  controls
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <MdSportsSoccer className="w-16 h-16 text-white/10" />
                </div>
              )}
            </div>

            {/* Video Info */}
            <div className="p-5 flex flex-col gap-2">
              <h3 className="text-base font-bold text-white">{request.title}</h3>
              <p className="text-sm text-white/50 leading-relaxed">
                {request.description}
              </p>
            </div>
          </div>

          {/* ── RIGHT: Focus Panel — col-span-3 ── */}
          <div className="col-span-12 lg:col-span-3 rounded-xl flex flex-col gap-4">
            <div className="bg-[#3F3F3F] p-2 md:p-5 rounded-lg">
              <h4 className="text-sm font-semibold text-white/80 tracking-wide uppercase">
                Areas to Focus on
              </h4>
              {focusAreas.length > 0 ? (
                <ul className="flex flex-col gap-3 mt-3">
                  {focusAreas.map((area, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#e53e3e] flex-shrink-0" />
                      <p className="text-sm text-white/50 leading-relaxed">{area}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-white/40 mt-3">
                  No specific focus areas provided.
                </p>
              )}

              {request.coachFeedback && (
                <div className="mt-5 pt-4 border-t border-white/10">
                  <h4 className="text-sm font-semibold text-white/80 tracking-wide uppercase">
                    Coach Feedback
                  </h4>
                  <p className="text-sm text-white/50 leading-relaxed mt-2">
                    {request.coachFeedback}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoachDetails;
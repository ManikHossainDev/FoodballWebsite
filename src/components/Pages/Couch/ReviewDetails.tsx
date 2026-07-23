"use client";
import { useState } from "react";
import Link from "next/link";
import Swal from "sweetalert2";
import { FiArrowLeft, FiMail, FiPhone } from "react-icons/fi";
import { BsPlayCircleFill } from "react-icons/bs";
import Image from "next/image";
import { useParams } from "next/navigation";
import {
  useCompleteAcceptedOrdersMutation,
  useSingleVideoRequestQuery,
} from "@/redux/features/coach/coach";


type RequestStatus = "pending" | "accept" | "decline" | string;

interface Player {
  _id: string;
  name: string;
  email?: string;
  phone?: string;
  image?: string;
}

interface VideoContent {
  resource_type?: string;
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
  coach?: string; // just an id in this response
  player?: Player;
  content?: VideoContent;
  cancelledBy?: string | null;
}

interface SingleVideoRequestResponse {
  success: boolean;
  message?: string;
  data: VideoRequest;
}

interface SubmitReviewPayload {
  id: string;
  data: {
    coachFeedback: string;
  };
}

interface SubmitReviewResponse {
  success: boolean;
  message?: string;
}

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

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
const ReviewDetails = () => {
  const params = useParams<{ id: string | string[] }>();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const { data, isLoading, isError, refetch } = useSingleVideoRequestQuery(
    id as string
  );

  const [CompleteAcceptedOrders] = useCompleteAcceptedOrdersMutation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [review, setReview] = useState("");

  const handleSubmitReview = async (videoId: string): Promise<void> => {
    
    if (!review.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Empty review",
        text: "Please write some feedback before submitting.",
      });
      return;
    }

    try {
      setIsSubmitting(true);

      const payload: SubmitReviewPayload = {
        id: videoId,
        data: { coachFeedback: review.trim() },
      };

      const res: SubmitReviewResponse = await CompleteAcceptedOrders(payload).unwrap();

      if (res?.success) {
        Swal.fire({
          icon: "success",
          title: "Review submitted!",
          text: res.message || "Your feedback has been saved.",
          timer: 2000,
          showConfirmButton: false,
        });

        setIsOpen(false);
        setReview("");
        refetch();
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed!",
          text: res.message || "Failed to submit review.",
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
      setIsSubmitting(false);
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
          href="/ReviewVideos"
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
        <div className="py-8 grid grid-cols-12 gap-6">
          {/* ── LEFT: Player Card — col-span-3 ── */}
          <div className="col-span-12 lg:col-span-3 bg-[#3F3F3F] rounded-xl overflow-hidden border border-white/5 flex flex-col">
            {/* Avatar */}
            <div className="relative bg-[#222] h-64">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#1a1a1a]" />
              {player?.image ? (
                <Image
                  src={player.image}
                  alt={player.name || "Player"}
                  fill
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                  className="object-fill opacity-60"
                />
              ) : null}
              {/* Fallback icon */}
          
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
            </div>
          </div>

          {/* ── CENTER: Video Card — col-span-6 ── */}
          <div className="col-span-12 lg:col-span-6 bg-[#3F3F3F] rounded-xl overflow-hidden border border-white/5 flex flex-col">
            {/* Video Player */}
            <div className="relative w-full h-[45vh] bg-[#222] group">
              {content?.secure_url ? (
                <video
                  src={content.secure_url}
                  controls
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <BsPlayCircleFill className="w-14 h-14 text-white/30" />
                </div>
              )}
            </div>

            {/* Video Info */}
            <div className="p-5 flex flex-col gap-2">
              <h3 className="text-base font-bold text-white">{request.title}</h3>
              <p className="text-sm text-white/50 leading-relaxed">
                {request.description || "No description provided."}
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
                <ul className="mt-3 flex flex-col gap-3">
                  {focusAreas.map((area, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#e53e3e] flex-shrink-0" />
                      <p className="text-sm text-white/50 leading-relaxed">
                        {area}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-white/40 mt-3">
                  No focus areas provided yet.
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

            {/* Review trigger — only when not yet reviewed */}
            {!request.isReviewed && (
              <button
                onClick={() => setIsOpen(true)}
                className="bg-[#E43636] text-white rounded-lg py-2 xl:mx-2"
              >
                Review Complete &amp; Provide Review
              </button>
            )}
          </div>
        </div>
      )}

      {/* ── Review Modal ── */}
      {isOpen && request && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsOpen(false);
          }}
        >
          <div className="bg-[#1E1E1E] rounded-xl w-full max-w-md mx-4 overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="bg-[#E43636] px-6 py-3 flex items-center justify-between">
              <h2 className="text-white font-semibold text-sm tracking-wide">
                Provide Review
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white text-lg leading-none"
              >
                ✕
              </button>
            </div>

            {/* Body */}
            <div className="px-6 py-5">
              <p className="text-gray-400 text-xs mb-3">
                Share your feedback to help the player improve.
              </p>
              <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                rows={5}
                placeholder="Write your review here..."
                className="w-full bg-[#2A2A2A] text-gray-200 text-sm rounded-lg px-4 py-3 resize-none border border-[#3A3A3A] focus:outline-none focus:border-[#E43636] placeholder-gray-600 transition-colors"
              />
            </div>

            {/* Footer */}
            <div className="px-6 pb-5 flex items-center justify-end gap-3">
              <button
                onClick={() => setIsOpen(false)}
                disabled={isSubmitting}
                className="text-gray-400 text-sm px-4 py-2 rounded-lg hover:text-white hover:bg-[#2A2A2A] transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSubmitReview(request._id)}
                disabled={isSubmitting}
                className="bg-[#E43636] text-white text-sm font-medium px-5 py-2 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewDetails;
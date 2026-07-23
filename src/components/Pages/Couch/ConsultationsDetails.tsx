"use client";
import { useConsultationCompleteMutation, useSingleConsultationQuery, useStartConsultationMutation } from "@/redux/features/coach/coach";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation"; // FIX: both hooks must come from next/navigation in the App Router
import { useState } from "react";
import { FiArrowLeft, FiCalendar } from "react-icons/fi";
import Swal from "sweetalert2";

const ConsultationsDetails = () => {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id; 
  const router = useRouter();
  const { data, isLoading, isError } = useSingleConsultationQuery(id as string);
  const booking = data?.data;

  const [StartConsultation] = useStartConsultationMutation();
  const [isJoining, setIsJoining] = useState(false); 

  const handleJoinSession = async (sessionId: string) => {
    if (!sessionId || isJoining) return;
    setIsJoining(true);
    try {
      const res = await StartConsultation({ id: sessionId }).unwrap();
      console.log(res)
      if (res?.success === true) {
        Swal.fire({
          icon: "success",
          title: "Join Session",
          text: res.message || "Your Join Session has been complete",
          timer: 2000,
          showConfirmButton: false,
        });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error?.status === 400) {
        Swal.fire({
          icon: "error",
          title: "Join Session",
          text: error?.data?.message || "Meeting link has expired",
          timer: 2000,
          showConfirmButton: false,
        });
        router.push(`/BookedConsultations/reschedulebooked?id=${sessionId}&coachId=${booking?.coach}`);
      }
    } finally {
      setIsJoining(false);
    }
  };

  const [ConsultationComplete, { isLoading: isCompleting }] = useConsultationCompleteMutation();

  const [showReviewModal, setShowReviewModal] = useState(false);
  const [review, setReview] = useState("");



  if (isLoading) {
    return (
      <div className="text-white font-sans py-10 text-center">
        Loading consultation details...
      </div>
    );
  }
  if (isError || !booking) {
    return (
      <div className="text-white font-sans py-10 text-center">
        Failed to load consultation details.
      </div>
    );
  }

  const player = booking.player;
  // Format bookingSlot (ISO date) into date + time strings
  const bookingDate = new Date(booking.bookingSlot);
  const sessionDateLabel = bookingDate.toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const sessionTimeLabel = bookingDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const handleOkay = async () => {
    if (!id) return;

    if (!review.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Review required",
        text: "Please write a review before submitting.",
        timer: 2000,
        showConfirmButton: false,
      });
      return;
    }

    try {
      const res = await ConsultationComplete({
        id: id as string,
        data: { coachFeedback: review },
      }).unwrap();

      if (res?.success === true) {
        Swal.fire({
          icon: "success",
          title: "Review Submitted",
          text: res.message || "Your review has been submitted successfully",
          timer: 2000,
          showConfirmButton: false,
        });
        setShowReviewModal(false);
        setReview("");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Review Submission Failed",
        text: error?.data?.message || "Something went wrong. Please try again.",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };

  return (
    <div className="text-white font-sans">
      {/* Top Header */}
      <div className="flex items-center justify-between py-3">
        <Link href="/BookedConsultations" className="flex items-center gap-2">
          <FiArrowLeft size={26} />
          <span
            className="text-xm md:text-2xl font-bold text-white py-3"
            style={{
              textShadow:
                "0 0 10px #ff0000, 0 0 20px #ff0000, 0 0 30px #ff0000, 0 0 40px #ff0000",
            }}
          >
            {player?.name} Consultation Details
          </span>
        </Link>
        <button className="border border-[#E43636] text-white text-xs px-4 py-2 rounded hover:bg-[#E43636] transition-colors">
          Report
        </button>
      </div>

      {/* Main Content */}
      <div className="py-5">
        <div className="lg:flex gap-4">
          {/* Left Panel – Profile Card */}
          <div className="w-full lg:w-[290px] flex-shrink-0 bg-[#232323] rounded-lg overflow-hidden flex flex-col">
            {/* Profile Photo */}
            <div className="relative w-full h-[300px] lg:h-[200px]">
              <Image
                src={player?.image || "/default-avatar.png"}
                alt={player?.name || "Player"}
                fill
                className="object-center lg:object-cover lg:object-top"
                sizes="260px"
              />
            </div>

            {/* Info */}
            <div className="px-4 pt-3 pb-4 flex flex-col gap-1 flex-1">
              <h2 className="text-white font-semibold text-base leading-tight">Name: {player?.name}</h2>
              <p className="text-gray-400 text-xs">Email: {player?.email}</p>
              <p className="text-gray-400 text-xs">Phone: {player?.phone}</p>
              <p className="text-gray-400 text-xs capitalize">Status: {booking.status}</p>

              {/* Buttons */}
              <div className="flex justify-between gap-2 mt-auto pt-4">
                <button
                  onClick={() => handleJoinSession(id as string)}
                  disabled={isJoining}
                  className="bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-medium px-4 py-1.5 rounded transition-colors"
                >
                  {isJoining ? "Joining..." : "Join Session"}
                </button>
                <Link
                  href={`/BookedConsultations/reschedulebooked?id=${id}`}
                  className="border border-[#E43636] text-white text-xs font-medium px-4 py-1.5 rounded hover:bg-red-500/10 transition-colors"
                >
                  Reschedule
                </Link>
              </div>
            </div>
          </div>

          {/* Right Panel – Session Info */}
          <div className="flex-1 bg-[#232323] rounded-lg p-5 flex flex-col relative">
            <div className="flex flex-col gap-3">
              <h3 className="text-white font-semibold text-base">
                {booking.consultationTopic}
              </h3>

              {booking.questions && (
                <div className="text-sm text-gray-400">
                  <span className="text-gray-300 font-medium">Questions: </span>
                  {booking.questions}
                </div>
              )}

              {/* Badges */}
              <div className="flex flex-col gap-2">
                <div className="w-fit flex items-center gap-1.5 border border-[#E43636] text-red-400 text-[10px] px-2.5 py-2 rounded-full">
                  <FiCalendar size={10} />
                  {sessionDateLabel} at {sessionTimeLabel}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={() => setShowReviewModal(true)}
            disabled={booking.isReviewed}
            className="bg-red-600 mt-5 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium px-6 py-2 rounded transition-colors"
          >
            {booking.isReviewed ? "Review Submitted" : "Review Complete & Provide review"}
          </button>
        </div>
      </div>

      {/* ── Provide Review Modal (inline, no separate component) ── */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-[#2a2a2a] rounded-2xl w-full max-w-2xl mx-4 overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <div className="py-4 px-6 border-b border-[#3a3a3a] text-center">
              <h2
                className="text-sm md:text-2xl font-bold text-white py-3"
                style={{
                  textShadow:
                    "0 0 10px #ff0000, 0 0 20px #ff0000, 0 0 30px #ff0000, 0 0 40px #ff0000",
                }}
              >
                Provide Review
              </h2>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <label className="text-white font-semibold text-sm mb-2 block">
                Write Your review
              </label>
              <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="Focus on my shooting accuracy and positioning during breakaways."
                rows={7}
                disabled={isCompleting}
                className="w-full bg-[#1e1e1e] border border-[#3a3a3a] rounded-lg p-3 text-gray-300 placeholder-gray-600 text-sm resize-none focus:outline-none focus:border-gray-500 transition-all disabled:opacity-60"
              />
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-center gap-4 px-6 pb-6">
              <button
                onClick={() => {
                  setShowReviewModal(false);
                  setReview("");
                }}
                disabled={isCompleting}
                className="px-8 py-2.5 rounded-lg border border-red-600 text-white text-sm font-medium hover:bg-red-600/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel and go back
              </button>
              <button
                onClick={handleOkay}
                disabled={isCompleting}
                className="px-12 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isCompleting ? "Submitting..." : "Okay"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConsultationsDetails;
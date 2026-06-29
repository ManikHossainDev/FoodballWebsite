"use client"
import { useState } from "react";
import Link from "next/link";
import { FiArrowLeft, FiChevronDown } from "react-icons/fi";
const days = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thus", "Fri"];

const timeSlots = [
  "09:00AM-09:30AM",
  "09:30AM-10:00AM",
  "10:00AM-10:30AM",
  "10:30AM-11:00AM",
  "11:00AM-11:30AM",
  "11:30AM-12:00PM",
];

const RescheduleConsultations = () => {
  const [selectedDay, setSelectedDay] = useState("Mon");
  const [selectedSlot, setSelectedSlot] = useState("10:00AM-10:30AM");
  const [meetingLink, setMeetingLink] = useState("");
  const [showMoreSlots, setShowMoreSlots] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [review, setReview] = useState("");

  const visibleSlots = showMoreSlots ? timeSlots : timeSlots.slice(0, 4);

  const handleOkay = () => {
    console.log("Review submitted:", review);
    setShowReviewModal(false);
    setReview("");
    // handle submit logic here
  };

  return (
    <div className="">
      {/* Header */}
      <div className="flex items-center justify-between py-3 text-white">
        <Link href="/BookedConsultations" className="flex items-center gap-2">
          <FiArrowLeft size={26} />
          <span
            className="text-sm md:text-2xl font-bold text-white py-3"
            style={{
              textShadow:
                "0 0 10px #ff0000, 0 0 20px #ff0000, 0 0 30px #ff0000, 0 0 40px #ff0000",
            }}
          >
            Reschedule Consultations
          </span>
        </Link>
      </div>

      {/* Card */}
      <div className="bg-[#2a2a2a] rounded-2xl p-5 mt-2 w-full max-w-xl ">
        <h2 className="text-white font-semibold text-base mb-4">
          Book Your Slot From Available Slot
        </h2>

        {/* Day Selector */}
        <div className="flex flex-wrap gap-2 mb-5">
          {days.map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium border transition-all ${
                selectedDay === day
                  ? "bg-transparent border-white text-white"
                  : "bg-[#1e1e1e] border-[#3a3a3a] text-gray-400 hover:border-gray-500"
              }`}
            >
              {day}
            </button>
          ))}
        </div>

        {/* Time Slots */}
        <div className="flex flex-wrap gap-2 mb-5 items-center">
          {visibleSlots.map((slot) => (
            <button
              key={slot}
              onClick={() => setSelectedSlot(slot)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                selectedSlot === slot
                  ? "bg-transparent border-[#4ade80] text-white"
                  : "bg-[#1e1e1e] border-[#3a3a3a] text-gray-400 hover:border-gray-500"
              }`}
            >
              {slot}
            </button>
          ))}
          <button
            onClick={() => setShowMoreSlots(!showMoreSlots)}
            className="p-1.5 rounded-lg bg-[#1e1e1e] border border-[#3a3a3a] text-gray-400 hover:border-gray-500 transition-all"
          >
            <FiChevronDown
              size={16}
              className={`transition-transform ${showMoreSlots ? "rotate-180" : ""}`}
            />
          </button>
        </div>

        {/* Schedule Meeting Link */}
        <div className="mb-6">
          <label className="text-white font-semibold text-sm mb-2 block">
            Schedule meeting link
          </label>
          <textarea
            value={meetingLink}
            onChange={(e) => setMeetingLink(e.target.value)}
            placeholder="schedule meeting link here"
            rows={4}
            className="w-full bg-[#1e1e1e] border border-[#3a3a3a] rounded-lg p-3 text-gray-400 placeholder-gray-600 text-sm resize-none focus:outline-none focus:border-gray-500 transition-all"
          />
        </div>

        {/* Reschedule Button */}
        <button
          onClick={() => setShowReviewModal(true)}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition-all text-sm"
        >
          Reschedule
        </button>
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
                className="w-full bg-[#1e1e1e] border border-[#3a3a3a] rounded-lg p-3 text-gray-300 placeholder-gray-600 text-sm resize-none focus:outline-none focus:border-gray-500 transition-all"
              />
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-center gap-4 px-6 pb-6">
              <button
                onClick={() => { setShowReviewModal(false); setReview(""); }}
                className="px-8 py-2.5 rounded-lg border border-red-600 text-white text-sm font-medium hover:bg-red-600/10 transition-all"
              >
                Cancel and go back
              </button>
              <button
                onClick={handleOkay}
                className="px-12 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-medium transition-all"
              >
                Okay
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RescheduleConsultations;
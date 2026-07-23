"use client";
import { useSingleConsultationQuery } from "@/redux/features/coach/coach";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FiArrowLeft, FiCalendar,  } from "react-icons/fi";

const ConsultationsDetails = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useSingleConsultationQuery(id as string);

  const booking = data?.data;

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
            {player.name} Consultation Details
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
                src={player.image || "/default-avatar.png"}
                alt={player.name}
                fill
                className="object-center lg:object-cover lg:object-top"
                sizes="260px"
              />
            </div>

            {/* Info */}
            <div className="px-4 pt-3 pb-4 flex flex-col gap-1 flex-1">
              <h2 className="text-white font-semibold text-base leading-tight">
                Name: {player.name}
              </h2>
              <p className="text-gray-400 text-xs">Email: {player.email}</p>
              <p className="text-gray-400 text-xs">Phone: {player.phone}</p>
              <p className="text-gray-400 text-xs capitalize">
                Status: {booking.status}
              </p>

              {/* Buttons */}
              <div className="flex justify-between gap-2 mt-auto pt-4">
                <button className="bg-red-600 hover:bg-red-700 text-white text-xs font-medium px-4 py-1.5 rounded transition-colors">
                  Join Session
                </button>
                <button className="border border-[#E43636] text-white text-xs font-medium px-4 py-1.5 rounded hover:bg-red-500/10 transition-colors">
                  Reschedule
                </button>
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
                  <span className="text-gray-300 font-medium">
                    Questions:{" "}
                  </span>
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
          <button className="bg-red-600 mt-5 hover:bg-red-700 text-white text-sm font-medium px-6 py-2 rounded transition-colors">
            {booking.isReviewed
              ? "Review Submitted"
              : "Review Complete & Provide review"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConsultationsDetails;
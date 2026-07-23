'use client';

import React from 'react';
import image from "@/assets/Authentication/Container.png"
import Image from 'next/image';
import Link from 'next/link';
import { useGetConsultationsQuery, useStartConsultationMutation } from '@/redux/features/coach/coach';
import Swal from 'sweetalert2';

interface Player {
  _id: string;
  name: string;
  email: string;
  phone: string;
  image: string;
}

interface Consultation {
  _id: string;
  coach: string;
  player: Player;
  consultationTopic: string;
  bookingSlot: string;
  questions: string;
  status: string;
  coachFeedback: string;
  isReviewed: boolean;
}

const BookedConsultationscard = () => {

  const { data, isLoading, isError } = useGetConsultationsQuery({ status: "accept" });
  const consultations: Consultation[] = data?.data || [];

  
  
  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    const d = new Date(dateString);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    const time = d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    return `${day}/${month}/${year} - ${time}`;
  };

  const [StartConsultation] = useStartConsultationMutation();
  const handleJoinSession = async (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const res = await StartConsultation({ id }).unwrap();
      console.log(res);
      if(res?.success === true){
        Swal.fire({
            icon: "success",
            title: "Join Session",
            text: res.message || "Your Join Session has been complete",
            timer: 2000,
            showConfirmButton: false,
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-[#303030] rounded-md p-4">
        <p className="text-gray-400 text-sm">Loading consultations...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-[#303030] rounded-md p-4">
        <p className="text-red-400 text-sm">Failed to load consultations.</p>
      </div>
    );
  }

  if (consultations.length === 0) {
    return (
      <div className="bg-[#303030] rounded-md p-4">
        <p className="text-gray-400 text-sm">No booked consultations found.</p>
      </div>
    );
  }

  return (
    <div className="bg-[#303030] rounded-md p-4">
      <div className="space-y-4">
        {consultations.map((consultation) => (
          <Link
            href={`/BookedConsultations/${consultation._id}`}
            key={consultation._id}
            className="bg-[#3F3F3F] rounded-xl p-2 lg:flex items-center justify-between hover:from-gray-750 hover:to-gray-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            {/* Thumbnail with Play Button */}
            <div className="md:flex items-center gap-1 md:gap-4 flex-1 mb-2 md:mb-0">
              <div className="relative group cursor-pointer">
                <div className="w-full sm:w-36 md:h-24 bg-gray-700 rounded-lg overflow-hidden">
                  <Image
                    src={consultation.player?.image || image}
                    alt={consultation.consultationTopic}
                    width={144}
                    height={80}
                    className="w-full h-full object-fill"
                  />
                </div>
              </div>

              {/* Consultation Info */}
              <div className="flex-1 mt-1 sm:mt-0">
                <h3 className="text-white text-base md:text-lg font-semibold mb-1">
                  {consultation.consultationTopic}
                </h3>
                <p className="text-gray-400 text-sm">
                  Player: {consultation.player?.name}
                </p>
                <p className="text-gray-500 text-xs mt-1">
                  {formatDate(consultation.bookingSlot)}
                </p>
                <p className="text-gray-500 text-xs mt-1">
                  {consultation.status}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 mt-2 xl:mt-0">
              <button
                onClick={(e) => handleJoinSession(e, consultation._id)}
                className="bg-red-600 hover:bg-red-700 text-white px-2 md:px-6 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-red-600/50"
              >
                Join Session
              </button>
              <Link
                href={`/BookedConsultations/reschedulebooked?id=${consultation._id}`}
                className="border-2 border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white px-2 md:px-6 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105"
              >
                Reschedule
              </Link>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BookedConsultationscard;
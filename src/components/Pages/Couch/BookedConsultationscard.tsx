/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useState } from 'react';
import image from "@/assets/Authentication/Container.png";
import Image from 'next/image';
import Link from 'next/link';
import { useGetConsultationsQuery, useStartConsultationMutation } from '@/redux/features/coach/coach';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();
  const { data, isLoading, isError } = useGetConsultationsQuery({ status: "accept" });
  const consultations: Consultation[] = data?.data || [];

  // ✅ id-based state instead of storing the whole object.
  // selectedId  -> which card is currently selected/active (card click or reschedule click)
  // joiningId   -> which card's "Join Session" is currently in-flight (for loading state)
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [joiningId, setJoiningId] = useState<string | null>(null);

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

  const handleJoinSession = async (e: React.MouseEvent, consultation: Consultation) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedId(consultation._id); // ✅ mark this card active by id
    setJoiningId(consultation._id);  // ✅ mark this card's button as "in progress" by id

    try {
      const res = await StartConsultation({ id: consultation._id }).unwrap();
      console.log(res);
      if (res?.success === true) {
        Swal.fire({
          icon: "success",
          title: "Join Session",
          text: res.message || "Your Join Session has been complete",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    } catch (error: any) {
      if (error?.status === 400) {
        Swal.fire({
          icon: "error",
          title: "Join Session",
          text: error?.data?.message || "meting link expirer",
          timer: 2000,
          showConfirmButton: false,
        });
        router.push(`/BookedConsultations/reschedulebooked?id=${consultation._id}&coachId=${consultation.coach}`);
      }
    } finally {
      setJoiningId((prev) => (prev === consultation._id ? null : prev));
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
      <div className="">
        {consultations.map((consultation) => {
          const isSelected = selectedId === consultation._id; // ✅ id-based comparison
          const isJoining = joiningId === consultation._id;   // ✅ id-based comparison

          return (
            <Link
              href={`/BookedConsultations/${consultation._id}`}
              key={consultation._id}
              onClick={() => setSelectedId(consultation._id)} // ✅ set by id on card click
              className={`block w-full rounded-xl mb-2 p-2 shadow-lg hover:shadow-xl ${
                isSelected
                  ? "bg-[#4A4A4A] ring-2 ring-red-500" // ✅ active/selected styling
                  : "bg-[#3F3F3F]"
              }`}
            >
              <div className='lg:flex items-center justify-between hover:from-gray-750 hover:to-gray-700 transition-all duration-300'>
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

                <div className="flex flex-col gap-3 mt-2 xl:mt-0">
                  <button
                    onClick={(e) => handleJoinSession(e, consultation)}
                    disabled={isJoining}
                    className="bg-red-600 hover:bg-red-700 text-white px-2 md:px-6 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-red-600/50 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {isJoining ? "Joining..." : "Join Session"}
                  </button>
                  <Link
                    href={`/BookedConsultations/reschedulebooked?id=${consultation._id}&coachId=${consultation.coach}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedId(consultation._id); // ✅ set by id on reschedule click
                    }}
                    className="border-2 border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white px-2 md:px-6 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105"
                  >
                    Reschedule
                  </Link>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BookedConsultationscard;
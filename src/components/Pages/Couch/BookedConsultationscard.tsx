'use client';

import React from 'react';
import image from "@/assets/Authentication/Container.png"
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const BookedConsultationscard = () => {
  const highlights = [
    { 
      id: 1,
      title: "Match Highlights - Oct 3",
      player: "Marcus Silva",
      date: "dd/mm/yyyy",
      duration: "5:32",
      thumbnail: "/api/placeholder/150/90"
    },
    {
      id: 2,
      title: "Match Highlights - Oct 3",
      player: "Marcus Silva",
      date: "dd/mm/yyyy",
      duration: "5:32",
      thumbnail: "/api/placeholder/150/90"
    },
    {
      id: 3,
      title: "Match Highlights - Oct 3",
      player: "Marcus Silva",
      date: "dd/mm/yyyy",
      duration: "5:32",
      thumbnail: "/api/placeholder/150/90"
    },
    {
      id: 4,
      title: "Match Highlights - Oct 3",
      player: "Marcus Silva",
      date: "dd/mm/yyyy",
      duration: "5:32",
      thumbnail: "/api/placeholder/150/90"
    },
    {
      id: 5,
      title: "Match Highlights - Oct 3",
      player: "Marcus Silva",
      date: "dd/mm/yyyy",
      duration: "5:32",
      thumbnail: "/api/placeholder/150/90"
    }
  ];

  const router = useRouter();

  const handleJoinSession = (e: React.MouseEvent, id: number) => {
    e.preventDefault();      // Link navigation বন্ধ করবে
    e.stopPropagation();     // Event bubble বন্ধ করবে
    console.log(`Join session ${id}`);
    // এখানে join session এর logic দিন
  };

  const handleReschedule = (e: React.MouseEvent, id: number) => {
    router.push(`/BookedConsultations/reschedulebooked`);
  };

  return (
    <div className="bg-[#303030] rounded-md p-4">
      <div className="space-y-4">
        {highlights.map((highlight) => (
          <Link
            href={`/BookedConsultations/${highlight.id}`}
            key={highlight.id}
            className="bg-[#3F3F3F] rounded-xl p-4 lg:flex items-center justify-between hover:from-gray-750 hover:to-gray-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            {/* Thumbnail with Play Button */}
            <div className="md:flex items-center gap-1 md:gap-4 flex-1 mb-2 md:mb-0">
              <div className="relative group cursor-pointer">
                <div className="w-full sm:w-36 md:h-20 bg-gray-700 rounded-lg overflow-hidden">
                  <Image
                    src={image}
                    alt={highlight.title}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              {/* Video Info */}
              <div className="flex-1 mt-1 sm:mt-0">
                <h3 className="text-white text-base md:text-lg font-semibold mb-1">
                  {highlight.title}
                </h3>
                <p className="text-gray-400 text-sm">
                  Player: {highlight.player}
                </p>
                <p className="text-gray-500 text-xs mt-1">{highlight.date}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between lg:justify-end gap-3">
              <button
                onClick={(e) => handleJoinSession(e, highlight.id)}
                className="bg-red-600 hover:bg-red-700 text-white px-2 md:px-6 py-2.5 rounded-lg font-medium transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-red-600/50"
              >
                Join Session
              </button>
              <Link
                href={`/BookedConsultations/reschedulebooked?id=${highlight.id}`}
                className="border-2 border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white px-2 md:px-6 py-2.5 rounded-lg font-medium transition-all duration-200 hover:scale-105"
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
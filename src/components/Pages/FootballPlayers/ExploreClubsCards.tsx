import React from 'react';
import user from '@/assets/Authentication/user.jpg'
import Image from 'next/image';
const ExploreClubsCards = () => {
  const clubData = [
    {
      id: 1,
      club: "FC Valencia",
      position: "Forward",
      type: "Full-time",
      salaryRange: "$55k/year",
      status: "Open"
    },
    {
      id: 2,
      club: "FC Valencia",
      position: "Forward",
      type: "Full-time",
      salaryRange: "$55k/year",
      status: "Open"
    },
    {
      id: 3,
      club: "FC Valencia",
      position: "Forward",
      type: "Full-time",
      salaryRange: "$55k/year",
      status: "Open"
    },
    {
      id: 4,
      club: "FC Valencia",
      position: "Forward",
      type: "Full-time",
      salaryRange: "$55k/year",
      status: "Open"
    },
    {
      id: 5,
      club: "FC Valencia",
      position: "Forward",
      type: "Full-time",
      salaryRange: "$55k/year",
      status: "Open"
    },
    {
      id: 6,
      club: "FC Valencia",
      position: "Forward",
      type: "Full-time",
      salaryRange: "$55k/year",
      status: "Open"
    },
    {
      id: 7,
      club: "FC Valencia",
      position: "Forward",
      type: "Full-time",
      salaryRange: "$55k/year",
      status: "Open"
    },
    {
      id: 8,
      club: "FC Valencia",
      position: "Forward",
      type: "Full-time",
      salaryRange: "$55k/year",
      status: "Open"
    },
    {
      id: 9,
      club: "FC Valencia",
      position: "Forward",
      type: "Full-time",
      salaryRange: "$55k/year",
      status: "Open"
    },
    {
      id: 10,
      club: "FC Valencia",
      position: "Forward",
      type: "Full-time",
      salaryRange: "$55k/year",
      status: "Open"
    },
    {
      id: 11,
      club: "FC Valencia",
      position: "Forward",
      type: "Full-time",
      salaryRange: "$55k/year",
      status: "Open"
    },
    {
      id: 12,
      club: "FC Valencia",
      position: "Forward",
      type: "Full-time",
      salaryRange: "$55k/year",
      status: "Open"
    }
  ];

  return (
    <div className="h-[77vh] bg-[#303030] rounded-md p-2">
      {/* Swiper-like styling */}
      <style>{`
        /* Swiper CSS styles */
        .swiper-container {
          height: 100%;
          position: relative;
          overflow: hidden;
        }
        
        .swiper-wrapper {
          height: 100%;
          overflow-y: auto;
          overflow-x: hidden;
          scroll-behavior: smooth;
        }
        
        /* Swiper free-mode scrollbar styling */
        .swiper-wrapper::-webkit-scrollbar {
          width: 6px;
        }
        
        .swiper-wrapper::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 3px;
        }
        
        .swiper-wrapper::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 3px;
          transition: background 0.3s;
        }
        
        .swiper-wrapper::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.5);
        }
        
        /* Firefox scrollbar */
        .swiper-wrapper {
          scrollbar-width: thin;
          scrollbar-color: rgba(255, 255, 255, 0.3) rgba(255, 255, 255, 0.05);
        }
        
        .swiper-slide {
          height: auto;
        }
      `}</style>

      <div className="swiper-container">
        <div className="swiper-wrapper">
          <div className="swiper-slide">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 xx:grid-cols-5 gap-3 md:gap-5">
              {clubData.map((card) => (
                <div 
                  key={card.id}
                  className="bg-[#3F3F3F] rounded-lg p-4 shadow-lg"
                >
                  {/* Header with Logo and Status */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-12 h-12  rounded-full flex items-center justify-center text-white font-semibold">
                      <Image width={300} height={300} src={user} className='rounded-md' alt='user' />
                    </div>
                      <span className="text-white font-semibold text-sm">{card.club}</span>
                    </div>
                    <span className="bg-red-600 text-white text-xs px-2 py-1 rounded">
                      {card.status}
                    </span>
                  </div>

                  {/* Position */}
                  <div className="mb-2 flex justify-between">
                    <p className="text-gray-400 text-xs">Position</p>
                    <p className="text-white font-semibold">{card.position}</p>
                  </div>

                  {/* Type */}
                  <div className="mb-2 flex justify-between">
                    <p className="text-gray-400 text-xs">Type</p>
                    <p className="text-white font-semibold">{card.type}</p>
                  </div>

                  {/* Salary Range */}
                  <div className="mb-4 flex justify-between">
                    <p className="text-gray-400 text-xs">Salary Range</p>
                    <p className="text-white font-semibold">{card.salaryRange}</p>
                  </div>

                  {/* Buttons */}
                  <div className="space-y-2">
                    <button className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded transition">
                      Apply to Club
                    </button>
                    <button className="w-full bg-transparent border border-gray-600 hover:border-gray-500 text-white font-semibold py-2 rounded transition">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExploreClubsCards;
import React from "react";
import user from '@/assets/Authentication/user.jpg'
import Image from "next/image";

const RequestsCard = () => {
  const videoReviewData = [
    {
      id: 1,
      name: "Marcus Silva",
      avatar: user,
      specialty: "Match Highlights - Oct 3",
      type: "video"
    },
    {
      id: 2,
      name: "Marcus Silva",
      avatar: user,
      specialty: "Match Highlights - Oct 3",
      type: "video"
    },
    {
      id: 3,
      name: "Marcus Silva",
      avatar: user,
      specialty: "Match Highlights - Oct 3",
      type: "video"
    },
    {
      id: 4,
      name: "Marcus Silva",
      avatar: user,
      specialty: "Match Highlights - Oct 3",
      type: "video"
    },
    {
      id: 5,
      name: "Marcus Silva",
      avatar: user,
      specialty: "Match Highlights - Oct 3",
      type: "video"
    },
    {
      id: 6,
      name: "Marcus Silva",
      avatar: user,
      specialty: "Match Highlights - Oct 3",
      type: "video"
    },
    {
      id: 7,
      name: "Marcus Silva",
      avatar: user,
      specialty: "Match Highlights - Oct 3",
      type: "video"
    },
    {
      id: 8,
      name: "Marcus Silva",
      avatar: user,
      specialty: "Match Highlights - Oct 3",
      type: "video"
    }
  ];

  // JSON data structure for Consultations Requests
  const consultationsData = [
    {
      id: 1,
      name: "Marcus Silva",
      avatar: user,
      specialty: "Technical Skills Improvement",
    },
    {
      id: 2,
      name: "Marcus Silva",
      avatar: user,
      specialty: "Match Highlights - Oct 3",
    },
    {
      id: 3,
      name: "Marcus Silva",
      avatar: user,
      specialty: "Technical Skills Improvement",

    },
    {
      id: 4,
      name: "Marcus Silva",
      avatar: user,
      specialty: "Technical Skills Improvement",
    },
    {
      id: 5,
      name: "Marcus Silva",
      avatar: user,
      specialty: "Technical Skills Improvement",
    },
    {
      id: 6,
      name: "Marcus Silva",
      avatar: user,
      specialty: "Technical Skills Improvement",
    },
    {
      id: 7,
      name: "Marcus Silva",
      avatar: user,
      specialty: "Technical Skills Improvement",
    },
    {
      id: 8,
      name: "Marcus Silva",
      avatar: user,
      specialty: "Technical Skills Improvement",
    }
  ];

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 xl:gap-6 bg-[#303030] rounded-md">
      {/* Video Review Request Section */}
      <div className="space-y-4 lg:border-r-2 lg:border-gray-700 p-3 xl:pr-10">
        <h1 
          className="text-sm md:text-xl font-bold text-white py-1"
            style={{
              textShadow:
                "0 0 10px #ff0000, 0 0 20px #ff0000, 0 0 30px #ff0000, 0 0 40px #ff0000",
            }}
        >
          Video Review Request
        </h1>
        <div className="space-y-3">
          {videoReviewData.map((item) => (
            <div
              key={item.id}
              className="bg-[#3F3F3F] rounded-lg p-4 md:flex items-center justify-between hover:bg-[#4a4a4a] transition"
            >
              <div className="flex items-center gap-3 mb-2 md:mb-0">
                <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                  <Image 
                    width={48} 
                    height={48} 
                    src={item.avatar} 
                    className='rounded-md object-cover' 
                    alt={`${item.name} avatar`}
                  />
                </div>
                <div>
                  <h3 className="text-white font-medium text-sm">
                    {item.name}
                  </h3>
                  <p className="text-gray-400 text-xs">{item.specialty}</p>
                </div>
              </div>

              <div className="flex gap-2 justify-between md:justify-end">
                <button className="bg-[#ef4444] hover:bg-[#dc2626] text-white px-6 py-2 rounded-md text-sm font-medium transition cursor-pointer">
                  Accept
                </button>
                <button className="bg-[#3a3a3a] hover:bg-[#4a4a4a] text-white px-6 py-2 rounded-md text-sm font-medium transition cursor-pointer">
                  Decline
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Consultations Request Section */}
      <div className="space-y-4 p-3">
         <h1 
          className="text-sm md:text-xl font-bold text-white py-1"
            style={{
              textShadow:
                "0 0 10px #ff0000, 0 0 20px #ff0000, 0 0 30px #ff0000, 0 0 40px #ff0000",
            }}
        >
          Consultations Request
        </h1>
        <div className="space-y-3">
          {consultationsData.map((item) => (
            <div
              key={item.id}
              className="bg-[#3F3F3F] rounded-lg p-4 hover:bg-[#4a4a4a] transition"
            >
              <div className="md:flex items-center justify-between">
                <div className="flex items-center  gap-3 mb-2 md:mb-0">
                  <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                    <Image 
                      width={48} 
                      height={48} 
                      src={item.avatar} 
                      className='rounded-md object-cover' 
                      alt={`${item.name} avatar`}
                    />
                  </div>
                  <div>
                    <h3 className="text-white font-medium text-sm">
                      {item.name}
                    </h3>
                    <p className="text-gray-400 text-xs">{item.specialty}</p>
                    
                  </div>
                </div>

                <div className="flex gap-2 justify-between md:justify-end">
                  <button className="bg-[#ef4444] hover:bg-[#dc2626] text-white px-6 py-2 rounded-md text-sm font-medium transition cursor-pointer">
                    Accept
                  </button>
                  <button className="bg-[#3a3a3a] hover:bg-[#4a4a4a] text-white px-6 py-2 rounded-md text-sm font-medium transition cursor-pointer">
                    Decline
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RequestsCard;
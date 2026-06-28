import React from "react";
import user from '@/assets/Authentication/user.jpg'
import Image from "next/image";
import Link from "next/link";

const ConsultationsRequest = () => {
  // JSON data structure for Video Review Requests
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
    }
  ];

  // JSON data structure for Consultations Requests
  const consultationsData = [
    {
      id: 1,
      name: "Marcus Silva",
      avatar: user,
      specialty: "Technical Skills Improvement",
      badge: "197 Huq • 21 Huq"
    },
    {
      id: 2,
      name: "Marcus Silva",
      avatar: user,
      specialty: "Match Highlights - Oct 3",
      badge: "197 Huq • 21 Huq"
    },
    {
      id: 3,
      name: "Marcus Silva",
      avatar: user,
      specialty: "Technical Skills Improvement",
      badge: "197 Huq • 21 Huq"
    },
    {
      id: 4,
      name: "Marcus Silva",
      avatar: user,
      specialty: "Technical Skills Improvement",
      badge: "197 Huq • 21 Huq"
    },
    {
      id: 5,
      name: "Marcus Silva",
      avatar: user,
      specialty: "Technical Skills Improvement",
      badge: "197 Huq • 21 Huq"
    },
    {
      id: 6,
      name: "Marcus Silva",
      avatar: user,
      specialty: "Technical Skills Improvement",
      badge: "197 Huq • 21 Huq"
    }
  ];

  return (
    <div className="">
      <div className="">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Video Review Request Section */}
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg md:text-xl font-bold text-white "
              style={{
                textShadow:
                  "0 0 10px #ff0000, 0 0 20px #ff0000, 0 0 30px #ff0000, 0 0 40px #ff0000",
              }}>
                Video Review Request
              </h2>
              <button className="text-gray-400 hover:text-white text-sm">
                See all
              </button>
            </div>

            <div className="space-y-3 bg-[#303030] p-3 rounded-md">
              {videoReviewData.map((item) => (
                <Link
                   href={`/Couch/${item.id}`}
                  key={item.id}
                  className="bg-[#3F3F3F] rounded-lg p-4 md:flex items-center justify-between  transition"
                >
                  <div className="flex items-center gap-3 pb-2 md:pb-0">
                    <div className="w-12 h-12 rounded-lg overflow-hidden">
                      <Image 
                        width={48} 
                        height={48} 
                        src={item.avatar} 
                        className='rounded-md object-cover' 
                        alt='user' 
                      />
                    </div>
                    <div>
                      <h3 className="text-white font-medium text-sm">
                        {item.name}
                      </h3>
                      <p className="text-gray-400 text-xs">{item.specialty}</p>
                    </div>
                  </div>

                  <div className="flex justify-between md:justify-end gap-2">
                    <button className="bg-[#ef4444] hover:bg-[#dc2626] text-white px-6 py-2 rounded-md text-sm font-medium transition">
                      Accept
                    </button>
                    <button className="bg-[#3a3a3a] hover:bg-[#4a4a4a] text-white px-6 py-2 rounded-md text-sm font-medium transition">
                      Decline
                    </button>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Consultations Request Section */}
          <div className="space-y-4 ">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg md:text-xl font-bold text-white "
              style={{
                textShadow:
                  "0 0 10px #ff0000, 0 0 20px #ff0000, 0 0 30px #ff0000, 0 0 40px #ff0000",
              }}>
                Consultations Request
              </h2>
              <button className="text-gray-400 hover:text-white text-sm">
                See all
              </button>
            </div>

            <div className="space-y-3 bg-[#303030] p-3 rounded-md">
              {consultationsData.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#3F3F3F] rounded-lg p-4  transition"
                >
                  <div className="md:flex items-center justify-between">
                    <div className="flex items-center gap-3 mb-2 md:mb-0">
                      <div className="w-12 h-12 rounded-lg overflow-hidden">
                        <Image 
                          width={48} 
                          height={48} 
                          src={item.avatar} 
                          className='rounded-md object-cover' 
                          alt='user' 
                        />
                      </div>
                      <div>
                        <h3 className="text-white font-medium text-sm">
                          {item.name}
                        </h3>
                        <p className="text-gray-400 text-xs">
                          {item.specialty}
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-between md:justify-end gap-2">
                      <button className="bg-[#ef4444] hover:bg-[#dc2626] text-white px-6 py-2 rounded-md text-sm font-medium transition">
                        Accept
                      </button>
                      <button className="bg-[#3a3a3a] hover:bg-[#4a4a4a] text-white px-6 py-2 rounded-md text-sm font-medium transition">
                        Decline
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultationsRequest;
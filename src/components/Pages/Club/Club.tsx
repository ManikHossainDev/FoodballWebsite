"use client"

import React from "react"
import { useRouter } from "next/navigation"
import user from '@/assets/Authentication/user.jpg'
import Image from "next/image";

const Club = () => {
  const router = useRouter();

  // JSON data structure for Player Placements Requests
  const videoReviewData = [
    {
      id: 1,
      name: "Marcus Silva",
      avatar: user,
      position: "Forward",
      experience: "5 years",
      preferredClub: "Barcelona FC"
    },
    {
      id: 2,
      name: "Marcus Silva",
      avatar: user,
      position: "Forward",
      experience: "5 years",
      preferredClub: "Barcelona FC"
    },
    {
      id: 3,
      name: "Marcus Silva",
      avatar: user,
      position: "Forward",
      experience: "5 years",
      preferredClub: "Barcelona FC"
    },
    {
      id: 4,
      name: "Marcus Silva",
      avatar: user,
      position: "Forward",
      experience: "5 years",
      preferredClub: "Barcelona FC"
    },
    {
      id: 5,
      name: "Marcus Silva",
      avatar: user,
      position: "Forward",
      experience: "5 years",
      preferredClub: "Barcelona FC"
    }
  ];

  return (
    <div className="">
      <div className="">
        <div className="">
          {/* Player Placements Requests Section */}
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg md:text-xl font-bold text-white "
              style={{
                textShadow:
                  "0 0 10px #ff0000, 0 0 20px #ff0000, 0 0 30px #ff0000, 0 0 40px #ff0000",
              }}>
                Hiring Post
              </h2>
              <button
                onClick={() => router.push("/Club/recommended-player")}
                className="text-gray-400 hover:text-white text-sm"
              >
                See all
              </button>
            </div>

            <div className="space-y-3 bg-[#303030] p-3 rounded-md">
              {videoReviewData.map((item) => (
                <div
                  key={item.id}
                  onClick={() => router.push(`/Club/${item.id}`)}
                  className="bg-[#3F3F3F] rounded-lg p-3 md:flex items-center gap-3 transition cursor-pointer"
                >
                  <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                    <Image 
                      width={100} 
                      height={100} 
                      src={item.avatar} 
                      className='rounded-md object-cover w-full h-full' 
                      alt='user' 
                    />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-white font-semibold text-sm mb-1">
                      {item.name}
                    </h3>
                    <div className="space-y-0.5">
                      <div className="flex items-center text-xs">
                        <p className="text-gray-500">Position :</p>
                        <p className="text-gray-400 ml-2">{item.position}</p>
                      </div>
                      <div className="flex items-center text-xs">
                        <p className="text-gray-500">Experience :</p>
                        <p className="text-gray-400 ml-2">{item.experience}</p>
                      </div>
                      <div className="flex items-center text-xs">
                        <p className="text-gray-500">Preferred Club :</p>
                        <p className="text-gray-400 ml-2">{item.preferredClub}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 flex-shrink-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // prevents triggering the card's onClick
                        router.push(`/Club/${item.id}`);
                      }}
                      className="bg-[#ef4444] hover:bg-[#dc2626] flex items-center space-x-2 text-white px-4 py-1.5 rounded text-xs font-medium transition whitespace-nowrap"
                    >
                      View
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
};

export default Club;
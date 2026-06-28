import React from "react"
import user from '@/assets/Authentication/user.jpg'
import Image from "next/image";

const Club = () => {
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
      id: 4,
      name: "Marcus Silva",
      avatar: user,
      position: "Forward",
      experience: "5 years",
      preferredClub: "Barcelona FC"
    }
  ];

  // JSON data structure for Recommend Player
  const consultationsData = [
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
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Player Placements Requests Section */}
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg md:text-xl font-bold text-white "
              style={{
                textShadow:
                  "0 0 10px #ff0000, 0 0 20px #ff0000, 0 0 30px #ff0000, 0 0 40px #ff0000",
              }}>
                Player’s Application
              </h2>
              <button className="text-gray-400 hover:text-white text-sm">
                See all
              </button>
            </div>

            <div className="space-y-3 bg-[#303030] p-3 rounded-md">
              {videoReviewData.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#3F3F3F] rounded-lg p-3 md:flex items-center gap-3 transition"
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
                    <button className="bg-[#ef4444] hover:bg-[#dc2626] flex items-center space-x-2 text-white px-4 py-1.5 rounded text-xs font-medium transition whitespace-nowrap">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                      </svg>
                     <nav> Accept Request</nav>
                    </button>
                    <button className="bg-[#4a4a4a] flex items-center space-x-2 hover:bg-[#5a5a5a] text-white px-4 py-1.5 rounded text-xs font-medium transition whitespace-nowrap">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                      <h1>Message</h1>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommend Player Section */}
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg md:text-xl font-bold text-white "
              style={{
                textShadow:
                  "0 0 10px #ff0000, 0 0 20px #ff0000, 0 0 30px #ff0000, 0 0 40px #ff0000",
              }}>
                Recommendations
              </h2>
              <button className="text-gray-400 hover:text-white text-sm">
                See all
              </button>
            </div>

            <div className="space-y-3 bg-[#303030] p-3 rounded-md">
              {consultationsData.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#3F3F3F] rounded-lg p-3 md:flex items-center gap-3 transition"
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
                      <div className=" flex items-center text-xs">
                        <p className="text-gray-500">Position :</p>
                        <p className="text-gray-400 ml-2">{item.position}</p>
                      </div>
                      <div className=" flex items-center text-xs">
                        <p className="text-gray-500">Experience :</p>
                        <p className="text-gray-400 ml-2">{item.experience}</p>
                      </div>
                      <div className=" flex items-center text-xs">
                        <p className="text-gray-500">Preferred Club :</p>
                        <p className="text-gray-400 ml-2">{item.preferredClub}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 flex-shrink-0">
                    <button className="bg-[#ef4444] hover:bg-[#dc2626] flex items-center space-x-2 text-white px-4 py-1.5 rounded text-xs font-medium transition whitespace-nowrap">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                      </svg>
                     <nav> Message Club</nav>
                    </button>
                    <button className="bg-[#4a4a4a] flex items-center space-x-2 hover:bg-[#5a5a5a] text-white px-4 py-1.5 rounded text-xs font-medium transition whitespace-nowrap">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                      <h1>Message player</h1>
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
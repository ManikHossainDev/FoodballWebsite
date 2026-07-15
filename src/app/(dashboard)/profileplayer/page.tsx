"use client"
import { FiEdit2 } from 'react-icons/fi';
import { FaTwitter } from 'react-icons/fa';
import Image from 'next/image';
import user from '@/assets/Authentication/user.jpg';
import Link from 'next/link';
import { useGetProfileQuery } from '@/redux/features/Profile/Profile';
const Page = () => {
  const {data} = useGetProfileQuery({})
  console.log(data)
 return (
 <div>
   <h2
        className="text-xm md:text-2xl font-bold text-white py-3"
        style={{
          textShadow:
            "0 0 10px #ff0000, 0 0 20px #ff0000, 0 0 30px #ff0000, 0 0 40px #ff0000",
        }}
      >
        My Profile
      </h2>
      <p className="text-[#8F8F8F] mb-2">Edit Your Details & Upload Performance Videos</p>

      <div className="">
      <div className="w-full ">
        {/* Header Section */}
        <div className="bg-[#303030] rounded-2xl p-2 md:p-4 lg:p-6 flex items-center justify-between mb-2 ">
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16">
              <Image
                src={user}
                alt="David Martinez"
                fill
                className="rounded-full object-cover border-2 border-gray-700"
              />
              <div className="absolute bottom-0 right-0 bg-gray-700 rounded-full p-1">
                <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                </svg>
              </div>
            </div>
            <div>
              <h1 className="text-white text-xl font-semibold">David Martinez</h1>
              <p className="text-gray-400 text-sm">Forward</p>
            </div>
          </div>
          <Link href="/editprofileplayer">
            <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
            <FiEdit2 className="w-4 h-4" />
            Edit Profile
          </button>
          </Link>
        </div>

        {/* About Section */}
        <div className="bg-[#303030] px-6 py-4  rounded-2xl">
        <div className=" mb-3 md:mb-5">
          <h2 className="text-white font-semibold mb-2">About</h2>
          <p className="text-gray-400 text-sm md:text-lg leading-relaxed">
            David Martinez is a highly experienced coach specializing in technical skills. With 16 years of professional coaching experience, they have helped countless players improve their game and advance their careers. Their approach combines technical expertise with personalized feedback to help you reach your full potential.
          </p>
        </div>

        {/* Details Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
            {/* Left Column */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-gray-400 text-sm min-w-[120px]">Full Name</span>
                <span className="text-white text-sm">Marcus Silva</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-gray-400 text-sm min-w-[120px]">Age</span>
                <span className="text-white text-sm">25</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-gray-400 text-sm min-w-[120px]">Position</span>
                <span className="text-white text-sm">Forward</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-gray-400 text-sm min-w-[120px]">Location</span>
                <span className="text-white text-sm">Barcelona, Spain</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-gray-400 text-sm min-w-[120px]">Phone</span>
                <span className="text-white text-sm">+880 1000000000</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-gray-400 text-sm min-w-[120px]">Email</span>
                <span className="text-white text-sm">marcus123@gmail.com</span>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-gray-400 text-sm min-w-[120px]">Current Club</span>
                <span className="text-white text-sm">Marcus Silva</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-gray-400 text-sm min-w-[120px]">Current Team</span>
                <span className="text-white text-sm">Marcus Silva</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-gray-400 text-sm min-w-[120px]">Career Goal</span>
                <span className="text-white text-sm">Marcus Silva</span>
              </div>
              
              <div className="flex items-start gap-3">
                <span className="text-gray-400 text-sm min-w-[120px]">Key Skills</span>
                <div className="flex gap-2 flex-wrap">
                  <span className="bg-red-500 text-white text-xs px-3 py-1 rounded">Dribbling</span>
                  <span className="bg-red-500 text-white text-xs px-3 py-1 rounded">Shooting</span>
                  <span className="bg-red-500 text-white text-xs px-3 py-1 rounded">Speed</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-gray-400 text-sm min-w-[120px]">Achievements</span>
                <div className="flex items-center gap-3">
                  <span className="text-gray-400 text-sm">15 Total</span>
                </div>
                
              </div>
              <div className="flex gap-2">
                    <button className="bg-gray-700 hover:bg-gray-600 p-2 rounded transition-colors">
                      <FaTwitter className="w-4 h-4 text-gray-400" />
                    </button>
                    <button className="bg-gray-700 hover:bg-gray-600 p-2 rounded transition-colors">
                      <FaTwitter className="w-4 h-4 text-gray-400" />
                    </button>
                    <button className="bg-gray-700 hover:bg-gray-600 p-2 rounded transition-colors">
                      <FaTwitter className="w-4 h-4 text-gray-400" />
                    </button>
                    <button className="bg-gray-700 hover:bg-gray-600 p-2 rounded transition-colors">
                      <FaTwitter className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
            </div>
          </div>
        </div>
      </div>
    </div>

 </div>
 );
};
export default Page;
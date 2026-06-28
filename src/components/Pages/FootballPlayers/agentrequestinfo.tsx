import React from 'react';
import Image from 'next/image';
import { Star,  } from 'lucide-react';
import user from '@/assets/Authentication/user.jpg';
import { FaRegMessage } from 'react-icons/fa6';

const Agentrequestinfo = () => {

  return (
    <div className=" text-white">
      {/* Header */}
      <div className="bg-[#303030] px-6 py-4 lg:flex items-center justify-between rounded-lg mb-6">
        {/* Left Section - Profile Info */}
        <div className="flex items-center gap-4">
          {/* Profile Image */}
          <div className="relative w-24 h-24 rounded-lg overflow-hidden">
            <Image
              src={user}
              fill
              alt="David Martinez"
              className="object-fill"
            />
          </div>
          
          {/* Profile Details */}
          <div className="flex flex-col gap-1">
            <h2 className="text-white font-semibold text-lg">David Martinez</h2>
            
            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-white font-medium">4.9</span>
              </div>
              <span className="text-gray-400 text-sm">(120 reviews)</span>
            </div>
            
            {/* Experience Badge */}
            <button className="bg-red-500 hover:bg-red-600 text-white text-xs font-medium px-3 py-1 rounded w-fit transition-colors">
              10 years experience
            </button>
          </div>
        </div>
        
        {/* Right Section - Action Button */}
        <div>
          <div className='flex space-x-2 py-2 justify-end'>
            {/* Favorite Button */}
            <button className="w-10 h-10 bg-red-500 hover:bg-red-600 rounded flex items-center justify-center transition-colors">
              <FaRegMessage className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Personal Information section need this section  */}
      <div className="bg-[#303030] rounded-lg p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Carrier Information */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg mb-4">Carrier Information</h3>

            <div>
              <label className="text-white text-sm mb-2 block">
                Preferred Leagues<span className="text-gray-500 text-xs">(optional)</span>
              </label>
              <input
                type="text"
                placeholder="Premier League"
                className="w-full bg-[#303030] border text-gray-400 rounded px-4 py-2.5 outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div>
              <label className="text-white text-sm mb-2 block">
                Preferred Clubs<span className="text-gray-500 text-xs">(optional)</span>
              </label>
              <input
                type="text"
                placeholder="Premier League"
                className="w-full bg-[#303030] border text-gray-400 rounded px-4 py-2.5 outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>

          {/* Feedback Preferences */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg mb-4">Feedback Preferences</h3>
            
            <div>
              <label className="text-white text-sm mb-2 block">
                Urgency Level
              </label>
              <select className="w-full bg-[#303030] border text-gray-400 rounded px-4 py-2.5 outline-none focus:ring-2 focus:ring-red-500 appearance-none">
                <option>How urgent is your request?</option>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
                <option>Critical</option>
              </select>
            </div>

            <div>
              <label className="text-white text-sm mb-2 block">
                Additional Information
              </label>
              <textarea
                placeholder="What are your short-term and long-term career objectives?"
                rows={4}
                className="w-full bg-[#303030] border text-gray-400 rounded px-4 py-2.5 outline-none focus:ring-2 focus:ring-red-500 resize-none"
              />
            </div>

            <div>
              <label className="text-white text-sm mb-2 block">
                Upload CV/Resume <span className="text-gray-500 text-xs">(Optional)</span>
              </label>
              <div className="w-full bg-[#303030] border rounded px-4 py-8 text-center cursor-pointer hover:bg-[#252525] transition-colors">
                <div className="flex flex-col items-center gap-2">
                  <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p className="text-gray-400 text-sm">
                    Click to upload and drop<br />PDF or DOC
                  </p>
                </div>
              </div>
            </div>

            <div>
              <label className="text-white text-sm mb-2 block">
                Upload Highlight Video <span className="text-gray-500 text-xs">(Optional)</span>
              </label>
              <div className="w-full bg-[#303030] border rounded px-4 py-8 text-center cursor-pointer hover:bg-[#252525] transition-colors">
                <div className="flex flex-col items-center gap-2">
                  <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p className="text-gray-400 text-sm">
                    Drop your video here<br />
                    or <span className="text-red-500">Browse</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="terms"
              className="w-4 h-4 rounded border-gray-600 text-red-500 focus:ring-red-500"
            />
            <label htmlFor="terms" className="text-gray-400 text-sm">
              I agree to the <span className="text-red-500">Terms</span> and <span className="text-red-500">Conditions</span>.
            </label>
          </div>
          </div>
        </div>

        {/* Terms and Submit */}
        <div className="mt-6 space-y-4 flex justify-center">
          <button className="px-5 md:px-10  bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded transition-colors">
            Place Request
          </button>
        </div>
      </div>
 
    </div>
  );
};

export default Agentrequestinfo;
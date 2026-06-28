/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import { Star, Upload, Video } from 'lucide-react';
import user from '@/assets/Authentication/user.jpg';
import { FaRegMessage } from 'react-icons/fa6';

const RequestReviewCard = () => {
  // This would normally come from the video the user selected on the previous step
  const selectedVideo = {
    title: 'Shooting Practice – Match Simulation',
    description:
      'This video shows me practicing my shooting under pressure in match situations. I would like feedback on my accuracy and positioning.',
  };

  const [areasToFocus, setAreasToFocus] = useState(
    'Focus on my shooting accuracy and positioning during breakaways.'
  );
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  // TODO: replace with the user's real wallet balance (from props / API)
  const [walletBalance] = useState(30);
  const REVIEW_FEE = 50;

  const [activeModal, setActiveModal] = useState<'insufficient' | 'confirm' | null>(null);

  const handleNextClick = () => {
    if (walletBalance < REVIEW_FEE) {
      setActiveModal('insufficient');
    } else {
      setActiveModal('confirm');
    }
  };

  const handleCloseModal = () => setActiveModal(null);

  const handleConfirmSubmit = () => {
    setActiveModal(null);
    handleSubmit();
  };

  const handleGoToWallet = () => {
    setActiveModal(null);
    // TODO: navigate to the wallet / recharge page, e.g. router.push('/wallet')
  };

  const handleSubmit = () => {
    console.log('Form submitted:', { ...selectedVideo, areasToFocus, agreeToTerms });
  };

  return (
    <div className="text-white">
      

      {/* Profile Card */}
      <div className="relative bg-[#262626] px-5 py-4 rounded-lg mb-6">
        {/* Message Button */}
        <button className="absolute top-4 right-4 w-8 h-8 bg-red-500 hover:bg-red-600 rounded flex items-center justify-center transition-colors">
          <FaRegMessage className="w-4 h-4 text-white" />
        </button>

        <div className="flex items-center gap-4">
          {/* Profile Image */}
          <div className="relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0">
            <Image src={user} fill alt="David Martinez" className="object-cover" />
          </div>

          {/* Profile Details */}
          <div className="flex flex-col gap-1">
            <h3 className="text-white font-semibold">David Martinez</h3>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-white text-sm font-medium">4.9</span>
              </div>
              <span className="text-gray-400 text-xs">(120 reviews)</span>
            </div>

            <span className="bg-red-500 text-white text-xs font-medium px-2.5 py-1 rounded w-fit">
              15 years experience
            </span>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="bg-[#1f1f1f] rounded-lg p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Video Information */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Video Information</h3>

            <div>
              <label className="block text-sm font-medium mb-2">Video Title :</label>
              <div className="w-full bg-[#2a2a2a] border border-gray-700 rounded px-4 py-2.5 text-gray-400 text-sm">
                {selectedVideo.title}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Video Description :</label>
              <div className="w-full bg-[#2a2a2a] border border-gray-700 rounded px-4 py-3 text-gray-400 text-sm leading-relaxed min-h-[88px]">
                {selectedVideo.description}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium">
                Upload Your Video{' '}
                <span className="text-gray-500 text-xs font-normal">(You can upload one video)</span>
              </label>
              <div className="border-2 border-dashed border-gray-700 rounded-lg py-6 text-center hover:border-red-500 transition-colors cursor-pointer mt-3">
                <p className="text-gray-400 text-sm">
                  Drop your video here
                  <br />
                  or <span className="text-red-500">Browse</span>
                </p>
                <Upload className="w-5 h-5 text-gray-500 mx-auto mt-3" />
              </div>
            </div>
          </div>

          {/* Feedback Preferences */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Feedback Preferences</h3>

            <div>
              <label className="block text-sm font-medium mb-2">Areas to Focus on :</label>
              <textarea
                name="areasToFocus"
                value={areasToFocus}
                onChange={(e) => setAreasToFocus(e.target.value)}
                rows={4}
                className="w-full bg-[#2a2a2a] border border-gray-700 rounded px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-red-500 transition-colors resize-none"
              />
            </div>

            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
                className="mt-1 w-4 h-4 bg-[#2a2a2a] border border-gray-700 rounded focus:ring-2 focus:ring-red-500"
              />
              <label className="text-sm text-gray-300 mt-1">
                I agree to the <span className="text-red-500 cursor-pointer hover:underline">Terms</span> and{' '}
                <span className="text-red-500 cursor-pointer hover:underline">Conditions</span>.
              </label>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-10">
          <button
            onClick={handleNextClick}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold px-16 py-2.5 rounded transition-colors"
          >
            Next
          </button>
        </div>
      </div>

      {/* Insufficient Wallet Balance Modal */}
      {activeModal === 'insufficient' && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-[#262626] border border-[#3a3a3a] rounded-lg w-full max-w-md p-6 shadow-2xl">
            <h2
        className="text-xl md:text-2xl text-center font-bold text-white pb-3"
        style={{
          textShadow:
            "0 0 10px #ff0000, 0 0 20px #ff0000, 0 0 30px #ff0000, 0 0 40px #ff0000",
        }}
      >
        Request Video Review
      </h2>

            <p className="text-white font-semibold mb-2">Insufficient Wallet Balance</p>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              You don&apos;t have enough balance in your wallet to Request Video Review . Please recharge your
              wallet and try again to continue.
            </p>

            <div className="flex gap-3">
              <button
                onClick={handleCloseModal}
                className="flex-1 border border-gray-600 text-white rounded py-2.5 text-sm hover:bg-[#2f2f2f] transition-colors"
              >
                Cancel and go back
              </button>
              <button
                onClick={handleGoToWallet}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white rounded py-2.5 text-sm font-medium transition-colors"
              >
                Okay
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm $50 Fee Modal */}
      {activeModal === 'confirm' && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-[#262626] border border-[#3a3a3a] rounded-lg w-full max-w-md p-6 shadow-2xl">
            <h3
              className="text-center text-red-500 font-semibold text-lg mb-5"
              style={{ textShadow: '0 0 14px rgba(239,68,68,0.55)' }}
            >
              Request Video Review
            </h3>

            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              This video review request will incur a $50 fee. The amount will be automatically deducted from your
              wallet once the coach completes and submits the video review.
            </p>

            <div className="flex gap-3">
              <button
                onClick={handleCloseModal}
                className="flex-1 border border-red-500 text-red-400 rounded py-2.5 text-sm hover:bg-red-500/10 transition-colors"
              >
                Cancel and go back
              </button>
              <button
                onClick={handleConfirmSubmit}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white rounded py-2.5 text-sm font-medium transition-colors"
              >
                Okay
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestReviewCard;
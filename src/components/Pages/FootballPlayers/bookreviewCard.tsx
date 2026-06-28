/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import { Star, ChevronDown } from 'lucide-react';
import user from '@/assets/Authentication/user.jpg';
import { FaRegMessage } from 'react-icons/fa6';

const BookreviewCard = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    age: '',
    consultationTopic: '',
    areasToFocus: '',
    meetingLink: '',
    agreeToTerms: false
  });

  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleInputChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = () => {
    console.log('Form submitted:', { ...formData, selectedDate, selectedSlot });
    // TODO: replace this with your real wallet-balance check.
    // If balance is insufficient, show the modal; otherwise proceed with booking.
    setShowModal(true);
  };

  const getAvailableDates = () => {
    const days = [];
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      days.push({
        value: d.toISOString().split("T")[0],
        dayLabel: dayNames[d.getDay()],
        dateLabel: `${d.getDate()} ${monthNames[d.getMonth()]}`,
      });
    }
    return days;
  };

  const availableDates = getAvailableDates();

  const timeSlots = [
    "09:00AM-09:30AM",
    "09:30AM-10:00AM",
    "10:00AM-10:30AM",
    "10:30AM-11:00AM",
    "11:00AM-11:30AM",
    "11:30AM-12:00PM",
  ];

  return (
    <div className="text-white">
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

        {/* Right Section - Action Buttons */}
        <div>
          <div className='flex space-x-2 py-2 justify-end'>
            {/* Message Button */}
            <button className="w-10 h-10 bg-red-500 hover:bg-red-600 rounded flex items-center justify-center transition-colors">
              <FaRegMessage className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Booking Form Card */}
      <div className="bg-[#303030] rounded-lg p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Consultation Information */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Consultation Information</h3>

            <div className="space-y-4">
              <div>
                <label className="text-gray-300 text-sm mb-2 block">Consultation Topic</label>
                <input
                  type="text"
                  name="consultationTopic"
                  value={formData.consultationTopic}
                  onChange={handleInputChange}
                  placeholder="Type consultation topic"
                  className="w-full bg-[#252525] text-white px-4 py-2 rounded border border-gray-600 focus:border-red-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-gray-300 text-sm mb-2 block">Book Your Slot From Available Slot</label>

                {/* Date row */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex-1 grid grid-cols-7 gap-1.5">
                    {availableDates.map((date) => (
                      <button
                        key={date.value}
                        type="button"
                        onClick={() => setSelectedDate(date.value)}
                        className={`text-[10px] leading-tight text-center py-2 px-1 rounded border transition-colors ${
                          selectedDate === date.value
                            ? "border-green-500 text-white"
                            : "border-gray-600 text-gray-400 hover:border-gray-400"
                        }`}
                      >
                        <div>{date.dayLabel},</div>
                        <div>{date.dateLabel}</div>
                      </button>
                    ))}
                  </div>
                  <ChevronDown className="text-gray-400 shrink-0" size={16} />
                </div>

                {/* Time slot row */}
                <div className="flex items-center gap-2">
                  <div className="flex-1 grid grid-cols-4 gap-1.5">
                    {timeSlots.slice(0, 4).map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedSlot(slot)}
                        className={`text-[10px] text-center py-2 px-1 rounded border transition-colors ${
                          selectedSlot === slot
                            ? "border-green-500 text-white"
                            : "border-gray-600 text-gray-400 hover:border-gray-400"
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                  <ChevronDown className="text-gray-400 shrink-0" size={16} />
                </div>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Additional</h3>

            <div className="space-y-4">
              <div>
                <label className="text-gray-300 text-sm mb-2 block">Questions or Goals for this Session</label>
                <textarea
                  name="areasToFocus"
                  value={formData.areasToFocus}
                  onChange={handleInputChange}
                  placeholder="Focus on my shooting accuracy and positioning during breakaways."
                  rows={4}
                  className="w-full bg-[#252525] text-white px-4 py-2 rounded border border-gray-600 focus:border-red-500 focus:outline-none resize-none"
                />
              </div>

              <div>
                <label className="text-gray-300 text-sm mb-2 block">Schedule meeting link</label>
                <textarea
                  name="meetingLink"
                  value={formData.meetingLink}
                  onChange={handleInputChange}
                  placeholder="schedule meeting link here"
                  rows={3}
                  className="w-full bg-[#252525] text-white px-4 py-2 rounded border border-gray-600 focus:border-red-500 focus:outline-none resize-none"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                  className="w-4 h-4 bg-[#252525] border border-gray-600 rounded"
                />
                <label className="text-gray-300 text-sm">
                  I agree to the <span className="text-red-500">Terms</span> and <span className="text-red-500">Conditions</span>.
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={handleSubmit}
            className="bg-red-500 hover:bg-red-600 text-white font-medium px-5  py-3 rounded transition-colors"
          >
            Next
          </button>
        </div>
      </div>

      {/* Insufficient Wallet Balance Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-[#252525] border border-gray-700 rounded-xl p-8 max-w-lg w-full"
            onClick={(e) => e.stopPropagation()}
          >
             <h2
        className="text-xl md:text-2xl text-center font-bold text-white pb-3"
        style={{
          textShadow:
            "0 0 10px #ff0000, 0 0 20px #ff0000, 0 0 30px #ff0000, 0 0 40px #ff0000",
        }}
      >
        Book Consultation
      </h2>

            <h3 className="text-white font-semibold mb-3">Insufficient Wallet Balance</h3>
            <p className="text-gray-300 text-sm leading-relaxed mb-8">
              You don&apos;t have enough balance in your wallet to Book consultations . Please recharge your wallet and try again to continue.
            </p>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-6 py-3 border border-red-500 text-white rounded-lg hover:bg-red-500/10 transition-colors whitespace-nowrap"
              >
                Cancel and go back
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowModal(false);
                  // TODO: navigate to wallet recharge page
                }}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-colors"
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

export default BookreviewCard;
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import { Star, ChevronDown } from 'lucide-react';
import { FaRegMessage } from 'react-icons/fa6';
import { useGetProfileQuery } from '@/redux/features/Profile/Profile';
import { useBookConsultationMutation, useGetSingleCoachesQuery } from '@/redux/features/player/hireCoachs';
import { usePathname } from 'next/navigation';

const BookreviewCard = () => {
  const pathname = usePathname();
  const coachId = pathname.split('/')[2];

  const { data: userData } = useGetProfileQuery({});
  const walletBalance = userData?.data?.walletBalance ?? 0;

  const { data } = useGetSingleCoachesQuery(coachId);
  const consultationFee = data?.data?.profile?.consultationFee ?? 0;

  const profile = data?.data;

  const [BookConsultation, { isLoading: isBooking }] = useBookConsultationMutation();

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
  const [showInsufficientModal, setShowInsufficientModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [bookingError, setBookingError] = useState<string | null>(null);

  const handleInputChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
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

  // Converts a selected date ("YYYY-MM-DD") + slot ("09:00AM-09:30AM")
  // into a full ISO datetime string for the booking's start time.
  const buildBookingSlotISO = (dateStr: string, slotStr: string): string | null => {
    const startPart = slotStr.split('-')[0]; // e.g. "09:00AM"
    const match = startPart.match(/(\d{1,2}):(\d{2})(AM|PM)/i);
    if (!match) return null;

    let hours = parseInt(match[1], 10);
    const minutes = parseInt(match[2], 10);
    const period = match[3].toUpperCase();

    if (period === 'PM' && hours !== 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;

    const date = new Date(dateStr);
    date.setHours(hours, minutes, 0, 0);
    return date.toISOString();
  };

  const handleSubmit = async () => {
    setBookingError(null);

    if (!selectedDate || !selectedSlot) {
      setBookingError('Please select a date and time slot.');
      return;
    }
    if (!formData.agreeToTerms) {
      setBookingError('Please agree to the Terms and Conditions.');
      return;
    }

    // Wallet balance check: sufficient (>=) -> proceed & show success modal,
    // insufficient (<) -> show the insufficient balance modal.
    if (walletBalance >= consultationFee) {
      const bookingSlot = buildBookingSlotISO(selectedDate, selectedSlot);

      const payload = {
        coach: coachId,
        consultationTopic: formData.consultationTopic,
        bookingSlot,
        questions: formData.areasToFocus,
      };

      try {
        await BookConsultation(payload).unwrap();
        setShowSuccessModal(true);
      } catch (err: any) {
        console.error('Booking failed:', err);
        setBookingError(err?.data?.message || 'Something went wrong while booking. Please try again.');
      }
    } else {
      setShowInsufficientModal(true);
    }
  };

  return (
    <div className="text-white">
      {/* Header */}
      <div className="bg-[#303030] px-6 py-4 lg:flex items-center justify-between rounded-lg mb-6">
        {/* Left Section - Profile Info */}
        <div className="flex items-center gap-4">
          {/* Profile Image */}
          <div className="relative w-24 h-24 rounded-lg overflow-hidden">
            <Image
              src={profile ? profile?.image : ""}
              fill
              alt="David Martinez"
              className="object-fill"
            />
          </div>

          {/* Profile Details */}
          <div className="flex flex-col gap-1">
            <h2 className="text-white font-semibold text-lg">{profile?.name}</h2>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-white font-medium">{profile?.avgRating}</span>
              </div>
              <span className="text-gray-400 text-sm">( {profile?.totalRating} reviews )</span>
            </div>

            {/* Experience Badge */}
            <button className="bg-red-500 hover:bg-red-600 text-white text-xs font-medium px-3 py-1 rounded w-fit transition-colors">
              {profile?.profile?.coachExperiences}
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

        {bookingError && (
          <p className="text-red-500 text-sm text-center mt-4">{bookingError}</p>
        )}

        {/* Submit Button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={handleSubmit}
            disabled={isBooking}
            className="bg-red-500 hover:bg-red-600 text-white font-medium px-5 py-3 rounded transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isBooking ? 'Booking...' : 'Next'}
          </button>
        </div>
      </div>

      {/* Insufficient Wallet Balance Modal */}
      {showInsufficientModal && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4"
          onClick={() => setShowInsufficientModal(false)}
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
              You don&apos;t have enough balance in your wallet to book this consultation. Please recharge your wallet and try again to continue.
            </p>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setShowInsufficientModal(false)}
                className="px-6 py-3 border border-red-500 text-white rounded-lg hover:bg-red-500/10 transition-colors whitespace-nowrap"
              >
                Cancel and go back
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowInsufficientModal(false);
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

      {/* Booking Success Modal */}
      {showSuccessModal && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4"
          onClick={() => setShowSuccessModal(false)}
        >
          <div
            className="bg-[#252525] border border-gray-700 rounded-xl p-8 max-w-lg w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl md:text-2xl text-center font-bold text-white pb-3">
              Booking Confirmed
            </h2>

            <p className="text-gray-300 text-sm leading-relaxed mb-8 text-center">
              Your consultation has been booked successfully. The coach will confirm your session shortly.
            </p>

            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => setShowSuccessModal(false)}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg py-3 transition-colors max-w-[200px]"
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
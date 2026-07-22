/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import { Star, ChevronDown } from 'lucide-react';
import { FaRegMessage } from 'react-icons/fa6';
import { useGetProfileQuery } from '@/redux/features/Profile/Profile';
import { useBookConsultationMutation, useGetCoachesTimesLotsQuery, useGetSingleCoachesQuery } from '@/redux/features/player/hireCoachs';
import { usePathname } from 'next/navigation';

interface CoachSlot {
  _id: string;
  author: string;
  day: string;
  startTime: string; // ISO string, only the time-of-day portion is meaningful
  endTime: string;   // ISO string, only the time-of-day portion is meaningful
  __v?: number;
}

interface DaySlots {
  day: string; // e.g. "Mon", "Sun"
  slots: CoachSlot[];
}

const BookreviewCard = () => {
  const pathname = usePathname();
  const coachId = pathname.split('/')[2];

  const { data: TimesLots } = useGetCoachesTimesLotsQuery(coachId);
  const AvailableTime: DaySlots[] = TimesLots?.data ?? [];

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
  const [selectedDayLabel, setSelectedDayLabel] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<CoachSlot | null>(null);
  // Only one booking mode is active at a time: pick from the coach's listed
  // slots, or suggest a custom time. Switching modes clears the other one.
  const [bookingMode, setBookingMode] = useState<'slot' | 'custom'>('slot');
  const [customDateTime, setCustomDateTime] = useState<string>('');
  const [showInsufficientModal, setShowInsufficientModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [bookingError, setBookingError] = useState<string | null>(null);

  const handleSwitchBookingMode = (mode: 'slot' | 'custom') => {
    setBookingMode(mode);
    if (mode === 'slot') {
      setCustomDateTime('');
    } else {
      setSelectedDate(null);
      setSelectedDayLabel(null);
      setSelectedSlot(null);
    }
  };

  const handleInputChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Extracts the time-of-day (hours/minutes) from an API slot's ISO string.
  // The API encodes slot times with a placeholder date, so we read the
  // UTC hours/minutes rather than treating the date portion as meaningful.
  const getTimeParts = (iso: string) => {
    const d = new Date(iso);
    return { hours: d.getUTCHours(), minutes: d.getUTCMinutes() };
  };

  const formatTime = (iso: string) => {
    const { hours, minutes } = getTimeParts(iso);
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 === 0 ? 12 : hours % 12;
    return `${displayHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}${period}`;
  };

  const formatSlotLabel = (slot: CoachSlot) => `${formatTime(slot.startTime)}-${formatTime(slot.endTime)}`;

  const dayNameToIndex: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Finds the next real calendar date (today or later) that falls on the
  // given day-of-week name, e.g. "Mon" -> the coming Monday's Date object.
  const getNextDateForDay = (dayLabel: string) => {
    const targetIndex = dayNameToIndex[dayLabel];
    const today = new Date();
    if (targetIndex === undefined) return today;
    let diff = targetIndex - today.getDay();
    if (diff < 0) diff += 7;
    const result = new Date(today);
    result.setDate(today.getDate() + diff);
    return result;
  };

  // The picker is driven entirely by whatever days/slots the API returns —
  // only days actually present in AvailableTime show up here, each mapped
  // to the next real calendar date that falls on that day-of-week.
  const availableDates = AvailableTime.map((entry) => {
    const nextDate = getNextDateForDay(entry.day);
    return {
      value: nextDate.toISOString().split("T")[0],
      dayLabel: entry.day,
      dateLabel: `${nextDate.getDate()} ${monthNames[nextDate.getMonth()]}`,
      slots: entry.slots ?? [],
    };
  });

  const slotsForSelectedDay = selectedDayLabel
    ? availableDates.find((d) => d.dayLabel === selectedDayLabel)?.slots ?? []
    : [];

  const handleSelectDate = (dateValue: string, dayLabel: string) => {
    setSelectedDate(dateValue);
    setSelectedDayLabel(dayLabel);
    setSelectedSlot(null); // reset slot when the date changes
  };

  const handleSelectSlot = (slot: CoachSlot) => {
    setSelectedSlot(slot);
  };

  const handleCustomDateTimeChange = (value: string) => {
    setCustomDateTime(value);
  };

  // Combines the selected calendar date with the chosen slot's time-of-day
  // (from the API) into a full ISO datetime string for the booking.
  // Returns null if the slot doesn't actually belong to the selected day —
  // that mismatch should never be sent to the backend.
  const buildBookingSlotISO = (dateStr: string, dayLabel: string, slot: CoachSlot): string | null => {
    if (slot.day !== dayLabel) return null;
    const { hours, minutes } = getTimeParts(slot.startTime);
    const date = new Date(`${dateStr}T00:00:00.000Z`);
    date.setUTCHours(hours, minutes, 0, 0);
    return date.toISOString();
  };

  const handleSubmit = async () => {
    setBookingError(null);

    let bookingSlot: string | null = null;

    if (bookingMode === 'custom') {
      if (!customDateTime) {
        setBookingError('Please suggest a date and time.');
        return;
      }
      // User typed their own preferred time — trust it as-is, no slot to validate against.
      const parsed = new Date(customDateTime);
      if (isNaN(parsed.getTime())) {
        setBookingError('Please enter a valid custom date and time.');
        return;
      }
      bookingSlot = parsed.toISOString();
    } else {
      if (!selectedDate || !selectedDayLabel || !selectedSlot) {
        setBookingError('Please select a date and time slot.');
        return;
      }
      bookingSlot = buildBookingSlotISO(selectedDate, selectedDayLabel, selectedSlot);
      if (!bookingSlot) {
        setBookingError('Selected time slot does not match the selected day. Please pick again.');
        return;
      }
    }

    if (!formData.areasToFocus.trim()) {
      setBookingError('Please enter your questions or goals for this session.');
      return;
    }

    if (!formData.agreeToTerms) {
      setBookingError('Please agree to the Terms and Conditions.');
      return;
    }

    // Wallet balance check: sufficient (>=) -> proceed & show success modal,
    // insufficient (<) -> show the insufficient balance modal.
    if (walletBalance >= consultationFee) {
      const payload = {
        coach: coachId,
        consultationTopic: formData.consultationTopic,
        bookingSlot,
        questions: formData.areasToFocus.trim(),
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
                <label className="text-gray-300 text-sm mb-2 block">Book  time Slot </label>

                {/* Mode toggle - only one of "pick a slot" / "suggest your own" is active at a time */}
                <div className="flex gap-2 mb-3">
                  <button
                    type="button"
                    onClick={() => handleSwitchBookingMode('slot')}
                    className={`text-xs px-3 py-1.5 rounded border transition-colors ${
                      bookingMode === 'slot'
                        ? "border-red-500 bg-red-500/10 text-white"
                        : "border-gray-600 text-gray-400 hover:border-gray-400"
                    }`}
                  >
                    Book couch time Slot
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSwitchBookingMode('custom')}
                    className={`text-xs px-3 py-1.5 rounded border transition-colors ${
                      bookingMode === 'custom'
                        ? "border-red-500 bg-red-500/10 text-white"
                        : "border-gray-600 text-gray-400 hover:border-gray-400"
                    }`}
                  >
                    Suggest your own time
                  </button>
                </div>

                {bookingMode === 'slot' ? (
                  <>
                    {/* Date row - only dates that have slots in AvailableTime are selectable */}
                    <div className="flex items-center gap-2 mb-3">
                      {availableDates.length === 0 && (
                        <span className="text-[11px] text-gray-500">No available days for this coach yet.</span>
                      )}
                      <div className="flex-1 grid grid-cols-7 gap-1.5">
                        {availableDates.map((date) => {
                          const hasSlots = date.slots.length > 0;
                          return (
                            <button
                              key={date.value}
                              type="button"
                              disabled={!hasSlots}
                              onClick={() => handleSelectDate(date.value, date.dayLabel)}
                              className={`text-[10px] leading-tight text-center py-2 px-1 rounded border transition-colors ${
                                selectedDate === date.value
                                  ? "border-green-500 text-white"
                                  : hasSlots
                                    ? "border-gray-600 text-gray-400 hover:border-gray-400"
                                    : "border-gray-800 text-gray-600 cursor-not-allowed opacity-50"
                              }`}
                            >
                              <div>{date.dayLabel},</div>
                              <div>{date.dateLabel}</div>
                            </button>
                          );
                        })}
                      </div>
                      <ChevronDown className="text-gray-400 shrink-0" size={16} />
                    </div>

                    {/* Time slot row - populated from AvailableTime for the selected day */}
                    <div className="flex items-center gap-2">
                      <div className="flex-1 grid grid-cols-4 gap-1.5">
                        {slotsForSelectedDay.length > 0 ? (
                          slotsForSelectedDay.map((slot) => (
                            <button
                              key={slot._id}
                              type="button"
                              onClick={() => handleSelectSlot(slot)}
                              className={`text-[10px] text-center py-2 px-1 rounded border transition-colors ${
                                selectedSlot?._id === slot._id
                                  ? "border-green-500 text-white"
                                  : "border-gray-600 text-gray-400 hover:border-gray-400"
                              }`}
                            >
                              {formatSlotLabel(slot)}
                            </button>
                          ))
                        ) : (
                          <span className="col-span-4 text-[11px] text-gray-500">
                            {selectedDate ? "No slots available for this day." : "Select a date to see available time slots."}
                          </span>
                        )}
                      </div>
                      <ChevronDown className="text-gray-400 shrink-0" size={16} />
                    </div>
                  </>
                ) : (
                  /* Custom time - only shown when the user chose "Suggest your own time" */
                  <div>
                    <label className="text-gray-400 text-xs mb-1 block">
                      Pick a date and time that works for you:
                    </label>
                    <input
                      type="datetime-local"
                      value={customDateTime}
                      onChange={(e) => handleCustomDateTimeChange(e.target.value)}
                      className="w-full bg-[#252525] text-white text-xs px-3 py-2 rounded border border-gray-600 focus:border-red-500 focus:outline-none [color-scheme:dark]"
                    />
                  </div>
                )}
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
"use client"
import { useState } from "react";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import { ChevronDown } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useGetCoachesTimesLotsQuery } from "@/redux/features/player/hireCoachs";
import { useConsultationMeetingMutation } from "@/redux/features/coach/coach";

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


const RescheduleConsultations = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const coachId = searchParams.get("coachId");
  const router = useRouter();
  const [ConsultationMeeting, { isLoading: isRescheduling }] = useConsultationMeetingMutation();

  const { data: TimesLots } = useGetCoachesTimesLotsQuery(coachId);
  const AvailableTime: DaySlots[] = TimesLots?.data ?? [];

  // Only one booking mode is active at a time: pick from the coach's listed
  // slots, or suggest a custom time. Switching modes clears the other one.
  const [bookingMode, setBookingMode] = useState<'slot' | 'custom'>('slot');
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedDayLabel, setSelectedDayLabel] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<CoachSlot | null>(null);
  const [customDateTime, setCustomDateTime] = useState<string>("");
  const [meetingLink, setMeetingLink] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  const handleSwitchBookingMode = (mode: 'slot' | 'custom') => {
    setBookingMode(mode);
    setFormError(null);
    if (mode === 'slot') {
      setCustomDateTime('');
    } else {
      setSelectedDate(null);
      setSelectedDayLabel(null);
      setSelectedSlot(null);
    }
  };

  // ---- API time show করার জন্য function ----
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

  // ---- New Date বের করার function ----
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
    setFormError(null);
  };

  const handleSelectSlot = (slot: CoachSlot) => {
    setSelectedSlot(slot);
    setFormError(null);
  };

  const handleCustomDateTimeChange = (value: string) => {
    setCustomDateTime(value);
    setFormError(null);
  };

  // Combines the selected calendar date (YYYY-MM-DD) with the chosen slot's
  // time-of-day (read in UTC, since that's how the API encodes it) into a
  // single ISO datetime string suitable for the bookingSlot field.
  const buildBookingSlotFromSlot = (dateValue: string, slot: CoachSlot): string => {
    const { hours, minutes } = getTimeParts(slot.startTime);
    const [year, month, day] = dateValue.split("-").map(Number);
    const combined = new Date(Date.UTC(year, month - 1, day, hours, minutes, 0, 0));
    return combined.toISOString();
  };

  // datetime-local inputs give a value like "2025-06-11T14:00" interpreted
  // in the user's local timezone; convert that to a proper ISO string.
  const buildBookingSlotFromCustom = (value: string): string => {
    return new Date(value).toISOString();
  };

  const getBookingSlotIso = (): string | null => {
    if (bookingMode === 'slot') {
      if (!selectedDate || !selectedSlot) return null;
      return buildBookingSlotFromSlot(selectedDate, selectedSlot);
    }
    if (!customDateTime) return null;
    return buildBookingSlotFromCustom(customDateTime);
  };

  const handleReschedule = async () => {
    setFormError(null);

    if (!id) {
      setFormError("Missing consultation id.");
      return;
    }
    if (!meetingLink.trim()) {
      setFormError("Please add a meeting link.");
      return;
    }

    const bookingSlot = getBookingSlotIso();
    if (!bookingSlot) {
      setFormError(
        bookingMode === 'slot'
          ? "Please select a date and time slot."
          : "Please pick a custom date and time."
      );
      return;
    }

    try {
     const res = await ConsultationMeeting({
        id,
        data: {
          meetingLink: meetingLink.trim(),
          bookingSlot,
        },
      }).unwrap();
      if(res?.statusCode === 200) {
          router.push(`/BookedConsultations/${id}`)
      }
      // Optionally: redirect, show a toast, refetch bookings, etc.
    } catch (err) {
      console.error("Failed to reschedule consultation:", err);
      setFormError("Something went wrong while rescheduling. Please try again.");
    }
  };

  return (
    <div className="">
      {/* Header */}
      <div className="flex items-center justify-between py-3 text-white">
        <Link href="/BookedConsultations" className="flex items-center gap-2">
          <FiArrowLeft size={26} />
          <span
            className="text-sm md:text-2xl font-bold text-white py-3"
            style={{
              textShadow:
                "0 0 10px #ff0000, 0 0 20px #ff0000, 0 0 30px #ff0000, 0 0 40px #ff0000",
            }}
          >
            Reschedule Consultations
          </span>
        </Link>
      </div>

      {/* Card */}
      <div className="bg-[#2a2a2a] rounded-2xl p-5 mt-2 w-full max-w-xl ">
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

        {/* Schedule Meeting Link */}
        <div className="mb-6 mt-4">
          <label className="text-white font-semibold text-sm mb-2 block">
            Schedule meeting link
          </label>
          <textarea
            value={meetingLink}
            onChange={(e) => setMeetingLink(e.target.value)}
            placeholder="schedule meeting link here"
            rows={4}
            className="w-full bg-[#1e1e1e] border border-[#3a3a3a] rounded-lg p-3 text-gray-400 placeholder-gray-600 text-sm resize-none focus:outline-none focus:border-gray-500 transition-all"
          />
        </div>

        {formError && (
          <p className="text-red-500 text-xs mb-3">{formError}</p>
        )}

        {/* Reschedule Button */}
        <button
          type="button"
          onClick={handleReschedule}
          disabled={isRescheduling}
          className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-all text-sm"
        >
          {isRescheduling ? "Rescheduling..." : "Reschedule"}
        </button>
      </div>
    </div>
  );
};

export default RescheduleConsultations;
"use client";
import Image from "next/image";
import Link from "next/link";
import { FiArrowLeft, FiCalendar, FiClock } from "react-icons/fi";

const ConsultationsDetails = () => {

  const consultant = {
    name: "Marcus Silva",
    email: "marcussilva@example.com",
    phone: "+1234567890",
    age: 21,
    note: "Match Highlights - Oct 3",
    avatar:"https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=300&h=300&fit=crop&crop=face",
    sessionTitle: "Technical Skills Training",
    joinLink: "https://meet.google.com/awv-qeyq-gyk",
    sessionDate: "Today 10:00–04:00 PM",
    duration: "60 mins",
    hostAvatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=50&h=50&fit=crop&crop=face",
  };

  return (
    <div className=" text-white font-sans">
      {/* Top Header */}
      <div className="flex items-center justify-between  py-3 ">
        <Link href="/BookedConsultations" className="flex items-center gap-2 "> 
          <FiArrowLeft size={26} />
          <span className="text-xm md:text-2xl font-bold text-white py-3"
        style={{
          textShadow:
            "0 0 10px #ff0000, 0 0 20px #ff0000, 0 0 30px #ff0000, 0 0 40px #ff0000",
        }}>Marcus Silva Consultations Details</span>
        </Link>
        <button className="border border-[#E43636] text-white text-xs px-4 py-2 rounded hover:bg-[#E43636] transition-colors">
          Report
        </button>
      </div>

      {/* Main Content */}
      <div  className="py-5">
        <div className="lg:flex gap-4">
            {/* Left Panel – Profile Card */}
        <div className="w-full lg:w-[290px] flex-shrink-0 bg-[#232323] rounded-lg overflow-hidden flex flex-col">
          {/* Profile Photo */}
          <div className="relative w-full h-[300px] lg:h-[200px]">
            <Image
              src={consultant.avatar}
              alt={consultant.name}
              fill
              className="object-center lg:object-cover lg:object-top"
              sizes="260px"
            />
          </div>

          {/* Info */}
          <div className="px-4 pt-3 pb-4 flex flex-col gap-1 flex-1">
            <h2 className="text-white font-semibold text-base leading-tight">
              Name: {consultant.name}
            </h2>
            <p className="text-gray-400 text-xs">Email:  {consultant.email}</p>
            <p className="text-gray-400 text-xs">Phone: {consultant.phone}</p>
            <p className="text-gray-400 text-xs">Age: {consultant.age}</p>
            <p className="text-gray-400 text-xs">{consultant.note}</p>

            {/* Buttons */}
            <div className="flex justify-between gap-2 mt-auto pt-4">
              <button className="bg-red-600 hover:bg-red-700 text-white text-xs font-medium px-4 py-1.5 rounded transition-colors">
                Join Session
              </button>
              <button className="border border-[#E43636] text-white text-xs font-medium px-4 py-1.5 rounded hover:bg-red-500/10 transition-colors">
                Reschedule
              </button>
            </div>
          </div>
        </div>

        {/* Right Panel – Session Info */}
        <div className="flex-1 bg-[#232323] rounded-lg p-5 flex flex-col relative">
          <div className="flex flex-col gap-3">
            <h3 className="text-white font-semibold text-base">
              {consultant.sessionTitle}
            </h3>

            {/* Join Link */}
            <div className="lg:flex items-center gap-2 text-sm md:text-md">
              <span className="text-gray-400">Join Link :</span>
              <a
                href={consultant.joinLink}
                className="text-blue-400 underline text-xs md:text-md hover:text-blue-300 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                {consultant.joinLink}
              </a>
            </div>

            {/* Badges */}
            <div className="">
              <div className="w-[150px] flex items-center gap-1.5 border border-[#E43636] text-red-400 text-[10px] px-2.5 py-2 rounded-full">
                <FiCalendar size={10} />
                {consultant.sessionDate}
              </div>
              <br />
              <div className="w-[80px] flex items-center gap-1.5 border border-[#E43636] text-red-400 text-[10px] px-2.5 py-2 rounded-full">
                <FiClock size={10} />
                {consultant.duration}
              </div>
            </div>
          </div>
        </div>
        </div>


        <div className="flex justify-end">
            <button className="bg-red-600 mt-5  hover:bg-red-700 text-white text-sm font-medium px-6 py-2 rounded transition-colors">
                Review Complete &amp; Provide review
            </button>
        </div>
      </div>
    </div>
  );
};

export default ConsultationsDetails;
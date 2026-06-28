/* eslint-disable react/no-unescaped-entities */
import React from "react";
import Image from "next/image";
import { Star,  Check, X } from "lucide-react";
import user from "@/assets/Authentication/user.jpg";
import Link from "next/link";
import { FaRegMessage } from "react-icons/fa6";

const InstructorProfile = () => {
  const servicesOffered = [
    {
      title: "Video Review & Analysis",
      description:
        "Detailed review of your performance videos with timestamped feedback and actionable insights.",
      duration: "Deserve video 2-3 days",
      price: "$50/session",
    },
    {
      title: "Live Consultation",
      description:
        "One-on-one video call to discuss your career goals, training plans, and answer your questions.",
      duration: "60 minute session",
      price: "$50/session",
    },
  ];

  const expertise = [
    "Video Analysis",
    "Career Planning",
    "Tactical Understanding",
    "Physical Conditioning",
    "One-on-One Coaching",
    "Technical Skills",
    "Mental Preparation",
  ];

  const reviews = [
    {
      name: "Alex W",
      rating: 5,
      comment:
        "Outstanding coach! Really helped me improve my explosiveness and finisher instinct",
      date: "Oct 15, 2025",
    },
    {
      name: "Jordan P",
      rating: 5,
      comment:
        "Very detailed analysis. The coach pointed out things I never noticed before.",
      date: "Oct 15, 2025",
    },
    {
      name: "Jordan P",
      rating: 5,
      comment:
        "Very detailed analysis. The coach pointed out things I never noticed before.",
      date: "Oct 10, 2025",
    },
  ];

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

        {/* Right Section - Action Buttons */}
        <div>
          <div className="flex space-x-2 py-2 justify-end">
            {/* Favorite Button */}
            <button className="w-10 h-10 bg-red-500 hover:bg-red-600 rounded flex items-center justify-center transition-colors">
              <FaRegMessage className="w-5 h-5 text-white" />
            </button>
          </div>
          <div className="flex items-center justify-between lg:justify-end  gap-3">
            {/* Request Review Button */}
            <Link href="/HireCoach/requestreview">
              <button className="border-red-500 border text-[10px] md:text-lg hover:bg-red-600 text-white font-medium px-2 md:px-6 py-2.5 rounded transition-colors">
                Request Review
              </button>
            </Link>

            {/* Book Consultation Button */}
            <div>
              <Link href="/HireCoach/bookconsultation">
                <button className=" text-[10px] md:text-lg bg-red-500 text-white font-medium px-2 md:px-6 py-2.5 rounded border border-gray-600 transition-colors">
                  Book Consultation
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* About Section */}
          <div className="bg-[#303030] rounded-lg p-4">
            <h3 className="text-xl font-semibold mb-4">About</h3>
            <p className="text-gray-300 text-sm md:text-lg lg:text-xl leading-relaxed mb-6">
              David Martinez is a highly experienced coach specializing in
              technical skills. With 10 years of professional coaching
              experience, they have helped countless players improve their game
              and advance their careers. Their approach combines technical
              expertise with personalized feedback to help you reach your full
              potential.
            </p>

            {/* Areas of Expertise */}
            <h4 className="text-lg font-semibold mb-4">Areas of Expertise:</h4>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {expertise.map((skill, index) => (
                <div
                  key={index}
                  className=" flex bg-[#3F3F3F] rounded-md hover:shadow p-1 items-center gap-2 text-gray-300 text-sm md:text-lg lg:text-xl"
                >
                  <Check className="w-4 h-4 text-red-500 flex-shrink-0" />
                  <span>{skill}</span>
                </div>
              ))}
            </div>

            {/* Coaching Experience */}
            <h4 className="text-lg font-semibold mb-4">Coaching Experience:</h4>
            <ul className="space-y-2 text-gray-300 text-sm md:text-lg lg:text-xl list-disc list-inside mb-6">
              <li>10+ years of coaching experience in youth football</li>
              <li>Former professional striker in the national league</li>
              <li>Certified UEFA 'B' License holder</li>
              <li>
                Worked with over 100 players, from grassroots to
                semi-professional levels
              </li>
            </ul>

            {/* Coaching Philosophy */}
            <h4 className="text-lg font-semibold mb-4">Coaching Philosophy:</h4>
            <p className="text-gray-300 text-sm md:text-lg lg:text-xl leading-relaxed">
              My philosophy is centered on the idea that every player can
              improve with the right tools and mindset. I believe in
              personalized feedback and building training programs based on each
              player's unique strengths and weaknesses.
            </p>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6 ">
          <div className="bg-[#303030] rounded-lg p-6">
            {/* Services Offered */}
            <div className=" pb-4">
              <h3 className="text-xl font-semibold mb-4">Services Offered</h3>
              <div className="space-y-4">
                {servicesOffered.map((service, index) => (
                  <div
                    key={index}
                    className="bg-[#3F3F3F] rounded-md   p-2 md:p-4"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold">{service.title}</h4>
                      <span className="text-white font-semibold">
                        {service.price}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm mb-2">
                      {service.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500 text-xs flex items-center gap-1">
                        <Check className="w-3 h-3" />
                        {service.duration}
                      </span>
                      <button className="bg-red-500 hover:bg-red-600 text-white text-sm font-medium px-4 py-1.5 rounded transition-colors">
                        Book Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Reviews */}
            <div className=" pb-4">
              <h3 className="text-xl font-semibold mb-4">Recent Reviews</h3>
              <div className="space-y-4">
                {reviews.map((review, index) => (
                  <div key={index} className="bg-[#3F3F3F] p-2 rounded-md">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-semibold">{review.name}</span>
                      <span className="text-gray-500 text-xs">
                        {review.date}
                      </span>
                    </div>
                    <div className="flex gap-1 mb-2">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                    <p className="text-gray-400 text-sm">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Media Links */}
            <div className="flex justify-center gap-3 pb-2">
              {[...Array(4)].map((_, i) => (
                <button
                  key={i}
                  className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorProfile;

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import { Star, Award, TrendingUp, Users, Globe, FileText, MessageSquare } from 'lucide-react';
import userImg from '@/assets/Authentication/user.jpg';
import { FaRegMessage } from 'react-icons/fa6';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useGetSingleAgentsQuery } from '@/redux/features/player/agents';

const AgentDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useGetSingleAgentsQuery(id);

  const agent = data?.data;

  const [activeTab, setActiveTab] = useState('overview');

  // Still mocked - your API response doesn't include these yet
  const services = agent?.profile?.service
    ? [
        {
          title: agent.profile.service.serviceName,
          description: agent.profile.service.description,
        },
      ]
    : [];

  const placements = [
    { player: "Marcus Silva", position: "Forward", from: "Valencia B", to: "Athletic Bilbao", year: "2024" },
  ];

  const reviews = [
    {
      name: "Marcus Silva",
      rating: 5,
      date: "Oct 2024",
      text: "Outstanding agent! Helped me secure a contract. Very professional and always kept me informed throughout the process."
    },
  ];

  const expertiseIconMap: Record<string, { icon: React.ReactNode; color: string }> = {
    default: { icon: <Award className="w-5 h-5" />, color: "text-red-400" },
  };

  const expertiseAreas =
    agent?.profile?.areaOfExpertise?.map((label: string) => ({
      label,
      icon: expertiseIconMap[label]?.icon ?? expertiseIconMap.default.icon,
      color: expertiseIconMap[label]?.color ?? expertiseIconMap.default.color,
    })) ?? [];

  const renderRatingStars = (rating: number) => {
    return [...Array(rating)].map((_, i) => (
      <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
    ));
  };

  const socialLinks = agent?.profile?.socialMedia
    ? Object.entries(agent.profile.socialMedia).filter(([, url]) => !!url)
    : [];

  if (isLoading) {
    return <div className="p-4 text-white">Loading agent...</div>;
  }

  if (!agent) {
    return <div className="p-4 text-white">Agent not found.</div>;
  }

  return (
    <div className="p-2 md:p-4">
      <div className="">
        <div className="bg-[#303030] px-2 md:px-6 py-4 lg:flex items-center justify-between rounded-lg mb-6 relative">
          {/* Left Section - Profile Info */}
          <div className="flex items-center gap-4">
            {/* Profile Image */}
            <div className="relative w-24 h-24 rounded-lg overflow-hidden">
              <Image
                src={agent.image || userImg}
                fill
                alt={agent.name || "Agent"}
                className="object-fill"
              />
            </div>

            {/* Profile Details */}
            <div className="flex flex-col gap-1">
              <h2 className="text-white font-semibold text-lg">{agent.name}</h2>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-white font-medium">{agent.avgRating ?? 0}</span>
                </div>
                <span className="text-gray-400 text-sm">({agent.totalRating ?? 0} reviews)</span>
              </div>

              {/* Experience Badge */}
              {agent.profile?.experiences && (
                <button className="bg-red-500 hover:bg-red-600 text-white text-xs font-medium px-3 py-1 rounded w-fit transition-colors">
                  {agent.profile.experiences}
                </button>
              )}
            </div>
          </div>

          {/* Message Icon Button */}
          <button className="absolute top-4 right-6 w-8 h-8 bg-red-500 hover:bg-red-600 rounded flex items-center justify-center transition-colors">
            <FaRegMessage className="w-4 h-4 text-white" />
          </button>

          {/* Request Agent Button */}
          <div className="mt-4 ">
            <Link
              href="/ConnectwithAgent/requestagent"
              className="bg-red-500 hover:bg-red-600 text-white text-sm font-semibold px-6 py-2.5 rounded-md transition-colors"
            >
              Request Agent
            </Link>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-2 md:px-8 py-1 md:py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'overview'
                ? 'bg-[#FFFFFF] border border-red-400 text-red-400 font-semibold shadow-[0_0_20px_rgba(255,0,0,0.5)]'
                : 'bg-[#3F3F3F]'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('success')}
            className={`px-2 md:px-8 py-1 md:py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'success'
                ? 'bg-[#FFFFFF] border border-red-400 text-red-400 font-semibold shadow-[0_0_20px_rgba(255,0,0,0.5)]'
                : 'bg-[#3F3F3F]'
            }`}
          >
            Success Stories
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`px-2 md:px-8 py-1 md:py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'reviews'
                ? 'bg-[#FFFFFF] border border-red-400 text-red-400 font-semibold shadow-[0_0_20px_rgba(255,0,0,0.5)]'
                : 'bg-[#3F3F3F]'
            }`}
          >
            Reviews
          </button>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6">
            {/* About Section */}
            <div className="bg-[#303030] rounded-xl p-2 md:p-6 shadow-xl mb-4 md:mb-0">
              <h2 className="text-2xl font-bold mb-4 text-[#FFFFFF]">About</h2>
              <p className="text-gray-300 text-xs md:text-base leading-relaxed mb-6">
                {agent.profile?.about}
              </p>

              {expertiseAreas.length > 0 && (
                <>
                  <h3 className="text-xl font-bold mb-4 text-[#FFFFFF]">Areas of Expertise</h3>
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {expertiseAreas.map((area: any, index: number) => (
                      <div key={index} className="flex items-center gap-2 text-gray-300">
                        <span className={area.color}>{area.icon}</span>
                        <span className="text-xs md:text-base">{area.label}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {agent.profile?.experiences && (
                <>
                  <h3 className="text-xl font-bold mb-4 text-[#FFFFFF]">Experience:</h3>
                  <p className="text-gray-300 text-xs md:text-base">{agent.profile.experiences}</p>
                </>
              )}
            </div>

            {/* Services Section */}
            <div className="bg-[#303030] rounded-xl p-2 md:p-6 shadow-xl">
              <h2 className="text-2xl font-bold mb-4 text-[#FFFFFF]">Services Offered</h2>
              <div className="space-y-4 bg-[#3F3F3F] rounded-md">
                {services.length > 0 ? (
                  services.map((service, index) => (
                    <div key={index} className="p-4 hover:bg-gray-650 transition-colors">
                      <h3 className="font-semibold text-white mb-2 text-xs md:text-sm">{service.title}</h3>
                      <p className="text-gray-300 text-xs md:text-base">{service.description}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400 p-4 text-sm">No services listed yet.</p>
                )}
              </div>

              {/* Social Icons */}
              {socialLinks.length > 0 && (
                <div className="flex justify-center gap-4 mt-8">
                  {socialLinks.map(([platform, url]) => (
                    <Link
                      key={platform}
                      href={url as string}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-[#3F3F3F] shadow-md border rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors text-white text-xs capitalize"
                    >
                      {platform[0].toUpperCase()}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Success Stories Tab */}
        {activeTab === 'success' && (
          <div className="bg-[#303030] rounded-xl p-2 md:p-6 shadow-xl">
            <h2 className="text-2xl font-bold mb-6 text-white">Recent Successful Placements</h2>
            <div className="space-y-4">
              {placements.map((placement, index) => (
                <div
                  key={index}
                  className="bg-[#3F3F3F] rounded-lg p-2 md:p-4 flex items-center justify-between hover:bg-gray-650 transition-colors"
                >
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-white">{placement.player}</h3>
                    <p className="text-gray-400">{placement.position}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-gray-300">{placement.from}</span>
                      <span className="text-gray-500">→</span>
                      <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {placement.to}
                      </span>
                    </div>
                  </div>
                  <div className="bg-red-600 text-white px-2 py-1 -top-3 rounded-lg font-bold">
                    {placement.year}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reviews Tab */}
        {activeTab === 'reviews' && (
          <div className="bg-[#303030] rounded-xl p-2 md:p-6 shadow-xl">
            <h2 className="text-2xl font-bold mb-6 text-white">Client Reviews</h2>
            <div className="space-y-4">
              {reviews.map((review, index) => (
                <div key={index} className="bg-[#3F3F3F] rounded-lg p-2 md:p-4 hover:bg-gray-650 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-bold text-lg text-white">{review.name}</h3>
                      <div className="flex gap-1 mt-1">{renderRatingStars(review.rating)}</div>
                    </div>
                    <span className="text-gray-400 text-sm">{review.date}</span>
                  </div>
                  <p className="text-gray-300 leading-relaxed">{review.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AgentDetails;
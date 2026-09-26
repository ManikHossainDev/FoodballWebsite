import React from 'react';
import { FiVideo, FiUsers, FiTrendingUp, FiTarget, FiShield } from 'react-icons/fi';
import { BiTrophy } from 'react-icons/bi';

const GoProFeatures = () => {
  const features = [
    {
      icon: <FiVideo className="w-5 h-5" />,
      title: 'Video Analysis',
      description:
        'Upload your gameplay and get frame-by-frame breakdown from UEFA-licensed coaches.',
    },
    {
      icon: <FiUsers className="w-5 h-5" />,
      title: 'Direct Networking',
      description:
        'Connect directly with verified scouts, agents, and club representatives worldwide.',
    },
    {
      icon: <FiTrendingUp className="w-5 h-5" />,
      title: 'Career Trajectory',
      description:
        'Personalized development plans designed to get you ready for professional trials.',
    },
    {
      icon: <FiTarget className="w-5 h-5" />,
      title: 'Targeted Showcases',
      description:
        'Get your profile in front of clubs that are actively looking for your exact player profile.',
    },
    {
      icon: <FiShield className="w-5 h-5" />,
      title: 'Verified Opportunities',
      description:
        'No fake trials. Every scout and club on Evolution Hub is vetted for authenticity.',
    },
    {
      icon: <BiTrophy className="w-5 h-5" />,
      title: 'Performance Tracking',
      description:
        'Log your stats, track your physical metrics, and show your improvement over time.',
    },
  ];

  return (
    <div className="border-b border-gray-900 py-16 md:py-20 px-4 sm:px-6 lg:px-8 font-sans flex items-center justify-center">
      <div className="w-full xl:container mx-auto">
        {/* Header Section */}
        <div className="mb-14 text-center">
          <h2 className="text-3xl md:text-[40px] font-black text-white mb-4 uppercase tracking-wide">
            Everything you need to <span className="text-[#ff2a2a]">Go Pro</span>
          </h2>
          <p className="text-sm md:text-base text-gray-400 max-w-2xl mx-auto leading-relaxed">
            We&apos;ve built a comprehensive ecosystem that bridges the gap between raw talent and
            professional contracts. Stop waiting to be discovered.
          </p>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative border border-zinc-800/80 rounded-xl p-6 lg:p-8 transition-all duration-300 hover:border-red-500/80 hover:-translate-y-1 overflow-hidden flex flex-col justify-start hover:shadow-[0_10px_30px_rgba(0,0,0,0.8),0_0_25px_rgba(220,38,38,0.15)]"
            >
              {/* Red hover background with soft black shadows on left and right */}
              <div className="absolute inset-0 bg-gradient-to-r from-black via-red-600/30 to-black opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none shadow-[inset_35px_0_40px_-10px_rgba(0,0,0,0.95),inset_-35px_0_40px_-10px_rgba(0,0,0,0.95)]" />

              {/* Icon Container */}
              <div className="relative z-10 w-11 h-11 bg-red-950/20 border border-red-900/30 rounded-lg flex items-center justify-center text-[#ff3333] mb-6 group-hover:border-red-500/50 group-hover:bg-red-950/40 transition-colors duration-300">
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className="relative z-10 text-lg md:text-xl font-bold text-white mb-3 tracking-wide transition-colors duration-300">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="relative z-10 text-gray-400 text-[14px] leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GoProFeatures;
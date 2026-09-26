import React from 'react';
import Image from 'next/image';
import foundation1 from '@/assets/HeroBannerSection/foundation1.jpeg';
import foundation2 from '@/assets/HeroBannerSection/foundation2.jpeg';
import foundation3 from '@/assets/HeroBannerSection/foundation3.jpeg';

const GrowingTheGame = () => {
  return (
    <div className="relative border-b border-gray-900 py-16 md:py-20 px-4 sm:px-6 lg:px-8 font-sans flex items-center justify-center bg-black overflow-hidden">
      {/* Top-right red glow shadow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 right-0 w-[480px] h-[480px] rounded-full"
        style={{
          background:
            'radial-gradient(circle at top right, rgba(220,20,20,0.30) 0%, rgba(180,0,0,0.12) 40%, transparent 70%)',
          filter: 'blur(40px)',
          transform: 'translate(0%, 0%)',
        }}
      />
      <div className="xl:container w-full mx-auto">
        
        {/* Top Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-8">
          {/* Titles & Badge */}
          <div className="">
            <div className="inline-block border border-red-900/60 text-[#ff2a2a] rounded-full px-4 py-1 text-xs font-semibold tracking-widest uppercase mb-2">
              The Anunga Foundation
            </div>
            <h2 className="text-4xl md:text-3xl lg:text-5xl font-semibold uppercase leading-[1.1] text-white tracking-tight">
              Growing the game. <br />
              <span className="text-[#ff2a2a]">Creating opportunity.</span>
            </h2>
          </div>
          
          {/* Description Text */}
          <div className="max-w-md mt-8 lg:mt-0 lg:mb-2">
            <p className="text-gray-400 text-sm md:text-base leading-relaxed">
               The Anunga Foundation invests in the future of football in Cameroon, one child at a time, by supporting children who have the passion to play but may not have access to the equipment, encouragement, or opportunities they need.
            </p>
          </div>
        </div>

        {/* Images Grid Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 lg:h-[550px]">
          
          {/* Left Large Image */}
          <div className="lg:col-span-7 relative rounded-3xl overflow-hidden h-[400px] lg:h-full">
            <Image 
              src={foundation1} 
              alt="Investing in young players and local football communities across Cameroon." 
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            <p className="absolute bottom-6 left-6 pr-6 text-gray-200 text-sm md:text-base font-medium z-10">
              Investing in young players and local football communities across Cameroon.
            </p>
          </div>

          {/* Right Stacked Images */}
          <div className="lg:col-span-5 flex flex-col gap-4 md:gap-6 h-[500px] lg:h-full">
            
            {/* Top Right Image */}
            <div className="flex-1 relative rounded-3xl overflow-hidden">
              <Image 
                src={foundation2} 
                alt="Handing out equipment" 
                fill
                className="object-cover"
              />
            </div>
            
            {/* Bottom Right Image */}
            <div className="flex-1 relative rounded-3xl overflow-hidden">
              <Image 
                src={foundation3} 
                alt="Kids gathering around" 
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* ADDED: Feature Cards Section */}
        <div className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 1: Access to equipment */}
            <div className="bg-[#0a0a0a] border border-[#1f1f1f] rounded-2xl p-4 flex flex-col items-start">
              <div className="w-12 h-12 bg-red-950/30 border border-red-900/50 rounded-xl flex items-center justify-center mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ff2a2a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.38 3.46L16 2a8.5 8.5 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2 tracking-tight">Access to equipment</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Providing young players with football gear and training essentials so they can participate with confidence.
              </p>
            </div>

            {/* Card 2: Community development */}
            <div className="bg-[#0a0a0a] border border-[#1f1f1f] rounded-2xl p-4 flex flex-col items-start">
              <div className="w-12 h-12 bg-red-950/30 border border-red-900/50 rounded-xl flex items-center justify-center mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ff2a2a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2 tracking-tight">Community development</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Supporting local football environments where children can learn, compete, build friendships, and grow.
              </p>
            </div>

            {/* Card 3: Pathways to opportunity */}
            <div className="bg-[#0a0a0a] border border-[#1f1f1f] rounded-2xl p-4 flex flex-col items-start">
              <div className="w-12 h-12 bg-red-950/30 border border-red-900/50 rounded-xl flex items-center justify-center mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ff2a2a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2 tracking-tight">Pathways to opportunity</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Helping talented children feel seen, encouraged, and connected to possibilities beyond their circumstances.
              </p>
            </div>

          </div>

          {/* Footer Text */}
          <div className="mt-5 text-center max-w-3xl mx-auto px-4">
            <p className="text-gray-400 text-sm md:text-base leading-relaxed">
              By giving back to the communities that nurture the game, the foundation aims to help more children experience football as a source of development, belonging, and hope for the future.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default GrowingTheGame;
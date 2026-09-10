import ChooseYourPlan from "@/components/Pages/Home/ChooseYourPlan";
import ExplorePlayersVideo from "@/components/Pages/Home/ExplorePlayersVideo";
import HeroBannerSection from "@/components/Pages/Home/HeroBannerSection";
import OurMission from "@/components/Pages/Home/OurMission";
import PowerfulFeatures from "@/components/Pages/Home/PowerfulFeatures";
import WhatOurCommunitySays from "@/components/Pages/Home/WhatOurCommunitySays";
import Link from "next/link";
import React from "react";

const HomePage = () => {
  return (
    <section>
      <HeroBannerSection />
      <div id="ourmission" className="scroll-mt-24">
        <OurMission />
      </div>

      <div id='explore' className="scroll-mt-24">
        <h2
          className="text-2xl md:text-5xl font-bold text-white mb-6 text-center"
          style={{
            textShadow:
              '0 0 10px #ff0000, 0 0 20px #ff0000, 0 0 30px #ff0000, 0 0 40px #ff0000',
          }}
        >
          Explore Players Video
        </h2>
        <h1 className="text-xs md:text-base lg:text-lg text-center py-3 text-gray-300 mb-10">
          Explore players video and connect  with them if needed. <Link className="text-red-500 underline" href="/exploreplayersvideo">see more</Link>
        </h1>

        <ExplorePlayersVideo />
      </div>

      <div id='features' className="py-10 md:py-14 scroll-mt-20">
        <PowerfulFeatures />
      </div>

      <div id="communitysays" className="scroll-mt-20">
        <WhatOurCommunitySays />
      </div>
      <ChooseYourPlan />
    </section>
  );
};

export default HomePage;

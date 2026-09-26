import ChooseYourPlan from "@/components/Pages/Home/ChooseYourPlan";
import ExplorePlayersVideo from "@/components/Pages/Home/ExplorePlayersVideo";
import GrowingTheGame from "@/components/Pages/Home/GrowingTheGame";
import HeroBannerSection from "@/components/Pages/Home/HeroBannerSection";
import LivedTheJourney from "@/components/Pages/Home/livedTheJourney";
import OurMission from "@/components/Pages/Home/OurMission";
import PowerfulFeatures from "@/components/Pages/Home/PowerfulFeatures";
import Professionalstage from "@/components/Pages/Home/Professionalstage";
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

      <LivedTheJourney />

      <div id='explore' className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 scroll-mt-24 border-b border-gray-900">
        <div className="w-full xl:container mx-auto">
          <h2 className="text-2xl md:text-5xl font-bold text-white mb-3 text-center">
            Explore Players Video
          </h2>
          <p className="text-xs md:text-base lg:text-lg text-center text-gray-400 mb-8 max-w-2xl mx-auto">
            Explore players video and connect with them if needed.{" "}
            <Link className="text-red-500 hover:text-red-400 underline transition-colors" href="/exploreplayersvideo">
              see more
            </Link>
          </p>

          <ExplorePlayersVideo />
        </div>
      </div>

      <GrowingTheGame />

      <div id='features' className="scroll-mt-20">
        <PowerfulFeatures />
      </div>

      <div id="communitysays" className="scroll-mt-20">
        <WhatOurCommunitySays />
      </div>

      <Professionalstage  />
     
      <ChooseYourPlan />
    </section>
  );
};

export default HomePage;

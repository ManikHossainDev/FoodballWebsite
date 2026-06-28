
import ChooseYourPlan from "@/components/Pages/Home/ChooseYourPlan";
import HeroBannerSection from "@/components/Pages/Home/HeroBannerSection";
import OurMission from "@/components/Pages/Home/OurMission";
import PowerfulFeatures from "@/components/Pages/Home/PowerfulFeatures";
import WhatOurCommunitySays from "@/components/Pages/Home/WhatOurCommunitySays";
import React from "react";

const HomePage = () => {
  return (
    <section>
      <HeroBannerSection />
      <div id="ourmission">
        <OurMission />
      </div>
      <div id='features' className="py-10 md:py-14">
        <PowerfulFeatures />
      </div>
      <div id="communitysays">
        <WhatOurCommunitySays />
      </div>
      <ChooseYourPlan />
    </section>
  );
};

export default HomePage;

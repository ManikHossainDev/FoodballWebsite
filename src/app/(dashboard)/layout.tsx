// Dashboard.tsx
"use client";

import FootballPlayerHeader from "@/components/Header/FootballPlayerHeader";
import Sidebar from "@/components/Sidebar/Sidebar";
import React, { useState } from "react";

const Dashboard = ({ children }: { children: React.ReactNode }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleMenuClick = () => {
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
  };

  return (
    <section className="min-h-screen bg-[#1a1a1a]">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-40 pt-2 px-2">
        <FootballPlayerHeader onMenuClick={handleMenuClick} />
      </div>

      {/* Main Content Area with Fixed Sidebar */}
      <div className="pt-[90px] flex mt-[5px] md:mt-[10px]">
        {/* Fixed Sidebar - Desktop Only */}
        <div className="hidden md:block md:w-64 lg:w-72 flex-shrink-0 px-3">
          <div className="sticky top-[90px]">
            <Sidebar 
              drawerOpen={drawerOpen} 
              onCloseDrawer={handleCloseDrawer}
            />
          </div>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-x-hidden px-2 md:px-4 pb-8 pt-2">
          {children}
        </div>
      </div>

      {/* Mobile Sidebar (Drawer) */}
      <div className="md:hidden">
        <Sidebar 
          drawerOpen={drawerOpen} 
          onCloseDrawer={handleCloseDrawer}
        />
      </div>
    </section>
  );
};

export default Dashboard;
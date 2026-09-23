import React from "react";
import Navbar from "./Navbar";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 w-full z-[9999] backdrop-blur-sm bg-[#0a0a0a79] bg-opacity-10">
      <div className="w-full xl:container mx-auto px-4">
        <Navbar />
      </div>
    </header>
  );
};

export default Header;

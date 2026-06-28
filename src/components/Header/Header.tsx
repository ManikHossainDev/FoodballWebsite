import React from "react";
import Navbar from "./Navbar";

const Header = () => {
  return (
    <header className="responsive-padding fixed w-full backdrop-blur-sm bg-[#0a0a0a79] bg-opacity-10  top-0 left-0  z-[9999]">
      <Navbar />
    </header>
  );
};

export default Header;

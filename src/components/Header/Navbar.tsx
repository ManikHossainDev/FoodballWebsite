"use client";
import { useState } from "react";
import logo from "@/assets/logo/logo.png";
import Image from "next/image";
import ActiveLink from "./ActiveLink";
import Link from "next/link";
import { Button, Drawer } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { FaRegUser } from "react-icons/fa";
import AuthModal from "./Authmodal";


const navLink = [
  { href: "/", label: "Home" },
  { href: "/#ourmission", label: "About US" },
  { href: "/#features", label: "Features" },
  { href: "/#communitysays", label: "Testimonials" },
];

const Navbar = () => {
  const user = null;

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authTab, setAuthTab] = useState<"signin" | "signup">("signin");

  const showDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  const showAuthModal = (tab: "signin" | "signup" = "signin") => {
    setAuthTab(tab);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => setIsAuthModalOpen(false);

  const handleLinkClick = () => {
    closeDrawer();
  };

  return (
    <nav>
      <div className="border-b border-[#535353] flex justify-between items-center">
        {/* Logo & Desktop Nav */}
        <div className="flex items-center space-x-2">
          <Link href="/">
            <Image
              src={logo}
              width={500}
              height={500}
              alt="logo"
              className="w-16 h-12 md:w-[150px] md:h-[75px] lg:h-[85px] md:-my-5 md:-mx-3"
            />
          </Link>

          <ul className="hidden md:flex gap-1">
            {navLink.map((link) => (
              <li key={link.href}>
                <ActiveLink href={link.href} label={link.label} />
              </li>
            ))}
          </ul>
        </div>

        {/* Right Side Buttons */}
        {!user ? (
          <div className="hidden md:flex justify-between items-center md:gap-1">
            <div
              onClick={() => showAuthModal("signin")}
              className="rounded-[4px] md:px-6 px-1 md:py-5 py-2 text-white border-none flex space-x-1 items-center cursor-pointer"
            >
              <FaRegUser />
              <h1>Login</h1>
            </div>
            <button
              onClick={() => showAuthModal("signup")}
              className="bg-[#E43636] space-x-2 py-1 px-3 text-white rounded-md hover:bg-[#c92e2e] transition-colors"
            >
              Get Started
            </button>
          </div>
        ) : (
          <div>
            <Link href="/logout" className="w-full">
              <Button>Logout</Button>
            </Link>
          </div>
        )}

        {/* Mobile Drawer Button */}
        <Button
          type="text"
          className="md:hidden"
          icon={<MenuOutlined className="text-white" />}
          onClick={showDrawer}
        />

        {/* Mobile Drawer */}
        <Drawer
          title="Menu"
          placement="right"
          onClose={closeDrawer}
          open={isDrawerOpen}
          width={170}
          className="mt-10"
          styles={{
            body: { backgroundColor: "#000000", color: "#ffffff" },
            header: { backgroundColor: "#000000", color: "#ffffff", borderBottom: "1px solid #333" },
          }}
          maskClosable={true}
        >
          <ul className="flex flex-col gap-4">
            {navLink.map((link) => (
              <li key={link.href} onClick={handleLinkClick}>
                <ActiveLink href={link.href} label={link.label} />
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-4 mt-4">
            {user ? (
              <Link href="/logout" onClick={handleLinkClick}>
                <button className="text-white bg-red-500 px-10 py-3 rounded">
                  Logout
                </button>
              </Link>
            ) : (
              <>
                <button
                  onClick={() => {
                    handleLinkClick();
                    showAuthModal("signin");
                  }}
                  className="text-white bg-red-500 hover:bg-red-600 px-10 py-3 rounded transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    handleLinkClick();
                    showAuthModal("signup");
                  }}
                  className="px-8 py-3 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded transition-colors"
                >
                  Register
                </button>
              </>
            )}
          </div>
        </Drawer>
      </div>

      {/* Auth Modal (sign in / sign up / role selection) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={closeAuthModal}
        initialTab={authTab}
      />
    </nav>
  );
};

export default Navbar;
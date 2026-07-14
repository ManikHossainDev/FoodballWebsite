"use client";
import { useState } from "react";
import logo from "@/assets/logo/logo.png";
import Image from "next/image";
import ActiveLink from "./ActiveLink";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Drawer, Avatar } from "antd";
import { MenuOutlined, UserOutlined } from "@ant-design/icons";
import { FaRegUser } from "react-icons/fa";
import AuthModal from "./Authmodal";
import { useGetProfileQuery } from "@/redux/features/Profile/Profile";
import Cookies from "js-cookie"; // 1. Import Cookies library


const navLink = [
  { href: "/", label: "Home" },
  { href: "/#ourmission", label: "About US" },
  { href: "/#features", label: "Features" },
  { href: "/#communitysays", label: "Testimonials" },
];

const Navbar = () => {
  const router = useRouter();

  // 2. Destructure refetch instead of refresh (RTK Query hook name)
  const { data, refetch } = useGetProfileQuery({});
  const user = data?.data;

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

  // 3. Logout Handler
  const handleLogout = () => {
    // Remove the cookie holding your token (replace "token" with your actual cookie name)
    Cookies.remove("token");
    Cookies.remove("user");

    // Refetch profile so `user` becomes undefined after cookie is cleared
    refetch();

    // Redirect to home page or login screen
    router.push("/");
    closeDrawer();
  };

  const handleProfileRedirect = () => {
    if (!user?.role) return;
    if (user.role === "player") {
      router.push("/FootballPlayer");
    } else if (user.role === "coach") {
      router.push("/Couch");
    } else if (user.role === "club") {
      router.push("/Club");
    } else if (user.role === "agents") {
      router.push("/agents");
    }
    closeDrawer();
  };

  return (
    <nav>
      <div className="border-b border-[#535353] flex justify-between items-center px-4 md:px-8 py-1">
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
        <div className="flex items-center gap-3">
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
                className="bg-[#E43636] space-x-2 py-2 px-4 text-white rounded-md hover:bg-[#c92e2e] transition-colors"
              >
                Get Started
              </button>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-4">
              <div
                onClick={handleProfileRedirect}
                className="cursor-pointer flex items-center gap-2 hover:opacity-80 transition-opacity"
              >
                <Avatar
                  src={user?.image}
                  icon={!user?.image && <UserOutlined />}
                  className="border border-white  md:w-10 md:h-10 lg:w-12 lg:h-12"
                />
              </div>

              {/* Attached handleLogout to Desktop Button */}
              <Button size="middle" type="primary" danger onClick={handleLogout}>
                Logout
              </Button>
            </div>
          )}

          {/* Mobile Drawer Button */}
          <Button
            type="text"
            className="md:hidden"
            icon={<MenuOutlined className="text-white" />}
            onClick={showDrawer}
          />
        </div>

        {/* Mobile Drawer */}
        <Drawer
          title="Menu"
          placement="right"
          onClose={closeDrawer}
          open={isDrawerOpen}
          width={220}
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

          <div className="flex flex-col gap-4 mt-6 border-t border-[#333] pt-4">
            {user ? (
              <>
                <div
                  onClick={handleProfileRedirect}
                  className="flex items-center gap-2 mb-2 cursor-pointer  p-2 rounded"
                >
                  <Avatar src={user?.image} icon={!user?.image && <UserOutlined />} />
                  <div className="flex flex-col">
                    <span className="text-white text-sm font-medium truncate w-32">{user?.name}</span>
                    <span className="text-gray-400 text-xs capitalize">{user?.role}</span>
                  </div>
                </div>

                {/* Mobile Logout */}
                <button
                  onClick={handleLogout}
                  className="w-full text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-sm transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    handleLinkClick();
                    showAuthModal("signin");
                  }}
                  className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    handleLinkClick();
                    showAuthModal("signup");
                  }}
                  className="px-4 py-2 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded transition-colors"
                >
                  Register
                </button>
              </>
            )}
          </div>
        </Drawer>
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={closeAuthModal}
        initialTab={authTab}
      />
    </nav>
  );
};

export default Navbar;
"use client";
import { useState } from "react";
import logo from "@/assets/logo/logo.png";
import Image from "next/image";
import ActiveLink from "./ActiveLink";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Button, Drawer, Avatar } from "antd";
import { MenuOutlined, UserOutlined } from "@ant-design/icons";
import { FaRegUser } from "react-icons/fa";
import AuthModal from "./Authmodal";
import { useGetProfileQuery } from "@/redux/features/Profile/Profile";
import Cookies from "js-cookie"; // 1. Import Cookies library
import {
  logout,
  openAuthModal,
  closeAuthModal,
  selectIsAuthModalOpen,
  selectAuthModalTab,
} from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";


const navLink = [
  { href: "/", label: "Home" },
  { href: "/#explore", label: "Explore" },
  { href: "/#features", label: "Features" },
  { href: "/#communitysays", label: "Testimonials" },
];

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  // 2. Destructure refetch instead of refresh (RTK Query hook name)
  const { data, refetch } = useGetProfileQuery({});
  const user = data?.data;

  const isAuthModalOpen = useAppSelector(selectIsAuthModalOpen);
  const authTab = useAppSelector(selectAuthModalTab);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleNavLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (pathname === "/") {
      if (href === "/" || href === "/#") {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
        window.history.pushState(null, "", "/");
      } else if (href.includes("#")) {
        e.preventDefault();
        const hash = `#${href.split("#")[1]}`;
        const id = href.split("#")[1];
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
          window.history.pushState(null, "", hash);
        }
      }
    }
  };

  const showDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  const showAuthModal = (tab: "signin" | "signup" = "signin") => {
    dispatch(openAuthModal(tab));
  };

  const handleCloseAuthModal = () => {
    dispatch(closeAuthModal());
  };

  const handleLinkClick = () => {
    closeDrawer();
  };

  // 3. Logout Handler
  const handleLogout = () => {
    dispatch(logout());
    Cookies.remove("token");
    Cookies.remove("user");
    refetch();
    closeDrawer();
    window.location.href = "/";
  };

  const handleProfileRedirect = () => {
    if (!user?.role) return;
    if (user.role === "player") {
      router.push("/FootballPlayer");
    } else if (user.role === "coach") {
      router.push("/Couch");
    } else if (user.role === "club") {
      router.push("/Club");
    } else if (user.role === "agent") {
      router.push("/agents");
    }
    closeDrawer();
  };

  return (
    <nav>
      <div className="border-b border-white/10 flex justify-between items-center py-2.5 md:py-3 px-1">
        {/* Logo & Desktop Nav */}
        <div className="flex items-center space-x-6 lg:space-x-8">
          <Link href="/" className="flex items-center">
            <Image
              src={logo}
              width={160}
              height={50}
              alt="logo"
              className="h-9 md:h-11 w-auto object-contain"
              priority
            />
          </Link>

          <ul className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLink.map((link) => (
              <li key={link.href}>
                <ActiveLink
                  href={link.href}
                  label={link.label}
                  onClick={(e) => handleNavLinkClick(e, link.href)}
                />
              </li>
            ))}
          </ul>
        </div>

        {/* Right Side Buttons */}
        <div className="flex items-center gap-3">
          {!user ? (
            <div className="hidden md:flex items-center gap-2">
              <button
                type="button"
                onClick={() => showAuthModal("signin")}
                className="flex items-center gap-2 text-sm font-medium text-gray-200 hover:text-white hover:bg-white/[0.08] px-3.5 py-2 rounded-lg transition-all duration-200 cursor-pointer"
              >
                <FaRegUser className="text-[15px] text-gray-300" />
                <span>Login</span>
              </button>
              <button
                type="button"
                onClick={() => showAuthModal("signup")}
                className="bg-[#E43636] hover:bg-[#c92e2e] text-white text-sm font-semibold py-2 px-4 md:px-5 rounded-lg transition-all duration-200 shadow-md hover:shadow-red-600/25 active:scale-95 cursor-pointer"
              >
                Get Started
              </button>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-3">
              <div
                onClick={handleProfileRedirect}
                className="cursor-pointer flex items-center gap-2.5 py-1 px-2.5 rounded-lg hover:bg-white/[0.08] transition-colors"
                title="View Profile"
              >
                <Avatar
                  src={user?.image}
                  icon={!user?.image && <UserOutlined />}
                  className="border border-white/20 w-8 h-8 md:w-9 md:h-9"
                />
                <div className="flex flex-col text-left">
                  <span className="text-white text-xs font-semibold max-w-[120px] truncate leading-tight">
                    {user?.name || "My Account"}
                  </span>
                  <span className="text-gray-400 text-[11px] capitalize leading-tight">
                    {user?.role || "User"}
                  </span>
                </div>
              </div>

              {/* Desktop Logout Button */}
              <button
                type="button"
                onClick={handleLogout}
                className="text-xs font-medium px-3.5 py-1.5 rounded-lg border border-red-500/40 text-red-400 hover:bg-red-500 hover:text-white transition-all duration-200 cursor-pointer"
              >
                Logout
              </button>
            </div>
          )}

          {/* Mobile Drawer Button */}
          <Button
            type="text"
            className="md:hidden !p-2 !h-auto flex items-center justify-center text-white hover:!bg-white/10 rounded-lg border-none"
            icon={<MenuOutlined className="text-lg text-white" />}
            onClick={showDrawer}
          />
        </div>

        {/* Mobile Drawer */}
        <Drawer
          title={<span className="text-white font-semibold text-base">Menu</span>}
          placement="right"
          onClose={closeDrawer}
          open={isDrawerOpen}
          width={260}
          styles={{
            body: { backgroundColor: "#141414", color: "#ffffff", padding: "20px 16px" },
            header: { backgroundColor: "#141414", color: "#ffffff", borderBottom: "1px solid rgba(255,255,255,0.08)" },
          }}
          maskClosable={true}
        >
          <ul className="flex flex-col gap-1.5">
            {navLink.map((link) => (
              <li key={link.href}>
                <ActiveLink
                  href={link.href}
                  label={link.label}
                  onClick={(e) => {
                    handleNavLinkClick(e, link.href);
                    closeDrawer();
                  }}
                />
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-3 mt-6 border-t border-white/10 pt-5">
            {user ? (
              <>
                <div
                  onClick={handleProfileRedirect}
                  className="flex items-center gap-3 p-2.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <Avatar src={user?.image} icon={!user?.image && <UserOutlined />} className="w-9 h-9" />
                  <div className="flex flex-col min-w-0">
                    <span className="text-white text-sm font-medium truncate">{user?.name}</span>
                    <span className="text-gray-400 text-xs capitalize">{user?.role}</span>
                  </div>
                </div>

                {/* Mobile Logout */}
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full text-white bg-red-600 hover:bg-red-700 py-2.5 px-4 rounded-lg text-sm font-medium transition-all shadow-sm active:scale-95"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => {
                    handleLinkClick();
                    showAuthModal("signin");
                  }}
                  className="w-full py-2.5 px-4 rounded-lg text-sm font-medium text-gray-200 bg-white/[0.08] hover:bg-white/[0.15] transition-all"
                >
                  Login
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleLinkClick();
                    showAuthModal("signup");
                  }}
                  className="w-full py-2.5 px-4 rounded-lg text-sm font-semibold text-white bg-[#E43636] hover:bg-[#c92e2e] transition-all shadow-sm active:scale-95"
                >
                  Get Started
                </button>
              </>
            )}
          </div>
        </Drawer>
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={handleCloseAuthModal}
        initialTab={authTab}
      />
    </nav>
  );
};

export default Navbar;
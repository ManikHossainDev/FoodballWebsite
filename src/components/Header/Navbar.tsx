/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import logo from "@/assets/logo/logo.png";
import Image from "next/image";
import ActiveLink from "./ActiveLink";
import Link from "next/link";
import { Button, Input, Drawer, Checkbox } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { FaRegUser } from "react-icons/fa";

const navLink = [
  { href: "/", label: "Home" },
  { href: "/#ourmission", label: "About US" },
  { href: "/#features", label: "Features" },
  { href: "/#communitysays", label: "Testimonials" },
];

const Navbar = () => {
  const user = null;

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSignInDrawerOpen, setIsSignInDrawerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isRoleAsideVisible, setIsRoleAsideVisible] = useState(false);

  const showDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  const showSignInDrawer = (tab = "signin") => {
    setActiveTab(tab);
    setIsSignInDrawerOpen(true);
  };

  const closeSignInDrawer = () => {
    setIsSignInDrawerOpen(false);
    setEmail("");
    setPassword("");
    setFullName("");
    setSignupEmail("");
    setSignupPassword("");
    setConfirmPassword("");
  };

  const handleLinkClick = () => {
    closeDrawer();
  };

  const handleSignIn = () => {
    console.log("Sign in clicked", { email, password });
  };

  const handleContinue = () => {
    setIsSignInDrawerOpen(false);
    setIsRoleAsideVisible(true);
  };

  const handleRoleSelection = (role: string) => {
    setIsRoleAsideVisible(false);
    console.log("Selected Role: ", role);
  };

  const switchToSignUp = (e: any) => {
    e.preventDefault();
    setActiveTab("signup");
  };

  const switchToSignIn = (e: any) => {
    e.preventDefault();
    setActiveTab("signin");
  };

  const roles = [
    { value: "player", icon: "⚽", title: "Football Player", description: "Upload videos & get coaching" },
    { value: "coach", icon: "👨‍🏫", title: "Scout/ Coach", description: "Review videos & mentor players" },
    { value: "consultant", icon: "💼", title: "Scout/ Consultant", description: "Mentor clubs/academies" },
    { value: "club", icon: "🏆", title: "Scout/ Club", description: "Scout & recruit players" },
  ];

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
              onClick={() => showSignInDrawer("signin")}
              className="rounded-[4px] md:px-6 px-1 md:py-5 py-2 text-white border-none flex space-x-1 items-center cursor-pointer"
            >
              <FaRegUser />
              <h1>Login</h1>
            </div>
            <button
              onClick={() => showSignInDrawer("signup")}
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
                    showSignInDrawer("signin");
                  }}
                  className="text-white bg-red-500 hover:bg-red-600 px-10 py-3 rounded transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    handleLinkClick();
                    showSignInDrawer("signup");
                  }}
                  className="px-8 py-3 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded transition-colors"
                >
                  Register
                </button>
              </>
            )}
          </div>
        </Drawer>

        {/* Sign In / Sign Up Aside */}
        {isSignInDrawerOpen && (
          <aside
            className={`fixed top-20 right-3 w-[300px] md:w-[400px] backdrop-blur-sm bg-[#C6C6C6] rounded-md shadow-lg z-50 overflow-y-auto max-h-[calc(100vh-100px)]
            p-[15px] transition-all duration-500 ease-in-out transform
            ${isSignInDrawerOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
          >
            <button
              onClick={closeSignInDrawer}
              className="absolute top-4 right-4 text-white hover:text-white"
            >
              ✕
            </button>

            {activeTab === "signin" ? (
              <div className="space-y-4 transition-opacity duration-500 ease-in-out">
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-white mb-1">
                    Sign in to Football Connect
                  </h2>
                  <p className="text-sm text-white">
                    Enter your credentials to access your account
                  </p>
                </div>

                <div>
                  <label className="block text-sm text-white mb-2">Email</label>
                  <Input
                    placeholder="your@email.com"
                    size="large"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm text-white mb-2">Password</label>
                  <Input.Password
                    placeholder="Enter your password"
                    size="large"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="rounded-md"
                  />
                </div>

                <div className="text-left">
                  <a href="#" className="text-sm text-red-500 hover:text-red-600">
                    Forgot password?
                  </a>
                </div>

                <Button
                  type="primary"
                  size="large"
                  block
                  onClick={handleSignIn}
                  className="rounded-md font-medium"
                  style={{ backgroundColor: "#ef4444", borderColor: "#ef4444", height: "44px" }}
                >
                  Sign In
                </Button>

                <div className="text-center text-sm mt-4">
                  <span className="text-white">Don't have an account? </span>
                  <a href="#" className="text-red-500 hover:text-red-600 font-medium" onClick={switchToSignUp}>
                    Sign Up
                  </a>
                </div>
              </div>
            ) : (
              <div className="space-y-4 transition-opacity duration-500 ease-in-out">
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-white mb-1">
                    Create Your Account
                  </h2>
                  <p className="text-sm text-white">
                    Enter your credentials to create your account
                  </p>
                </div>

                <div>
                  <label className="block text-sm text-white mb-2">Full Name</label>
                  <Input
                    placeholder="Enter your name"
                    size="large"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm text-white mb-2">Email</label>
                  <Input
                    placeholder="your@email.com"
                    size="large"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    className="rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm text-white mb-2">Password</label>
                  <Input.Password
                    placeholder="Enter your password"
                    size="large"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    className="rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm text-white mb-2">Confirm Password</label>
                  <Input.Password
                    placeholder="Enter your password again"
                    size="large"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="rounded-md"
                  />
                </div>

                <Button
                  type="primary"
                  size="large"
                  block
                  onClick={handleContinue}
                  className="rounded-md font-medium mt-6"
                  style={{ backgroundColor: "#ef4444", borderColor: "#ef4444", height: "44px" }}
                >
                  Continue
                </Button>

                <div className="text-center text-sm mt-4">
                  <span className="text-white">Already have an account? </span>
                  <a href="#" className="text-red-500 hover:text-red-600 font-medium" onClick={switchToSignIn}>
                    Sign In
                  </a>
                </div>
              </div>
            )}
          </aside>
        )}

        {/* Role Selection Aside */}
        {isRoleAsideVisible && (
          <aside
            className={`fixed top-20 right-3 w-[300px] md:w-[400px] backdrop-blur-sm bg-[#C6C6C6] rounded-md shadow-lg z-50 overflow-y-auto max-h-[calc(100vh-100px)]
            p-[15px] transition-all duration-500 ease-in-out transform
            ${isRoleAsideVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
          >
            <button
              onClick={() => setIsRoleAsideVisible(false)}
              className="absolute top-4 right-4 text-white hover:text-white"
            >
              ✕
            </button>
            <h2 className="text-xl font-semibold text-white mb-4">Choose Your Role</h2>
            <p className="text-xs md:text-base lg:text-md text-white pb-2">
              Select how you want to use FootballConnect
            </p>

            <div className="space-y-4 transition-transform duration-500">
              {roles.map((role) => (
                <div
                  key={role.value}
                  onClick={() => handleRoleSelection(role.value)}
                  className="w-full text-left flex space-x-5 cursor-pointer hover:bg-[#00000040] transition-colors duration-300 rounded-md"
                  style={{ color: "white", padding: "10px", fontSize: "16px" }}
                >
                  <div className="w-8 h-8 bg-white px-2 rounded-md flex items-center justify-center">
                    <Checkbox />
                  </div>
                  <div className="bg-[#00000080] rounded-md flex justify-center items-center px-2">
                    <div>{role.icon}</div>
                  </div>
                  <div className="text-xs md:text-base">
                    <h1>{role.title}</h1>
                    <p className="text-[#8B92A8]">{role.description}</p>
                  </div>
                </div>
              ))}

              <div className="flex space-x-1 px-4 mt-4">
                <button className="py-3 w-full rounded-md text-white border border-black transition-all duration-300 hover:bg-[#00000050]">
                  Back
                </button>
                <button className="py-3 w-full bg-red-500 rounded-md text-white transition-all duration-300 hover:bg-red-600">
                  Create Account
                </button>
              </div>
            </div>
          </aside>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

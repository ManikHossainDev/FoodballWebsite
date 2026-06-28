// AgentsSidebar.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Drawer, Modal } from "antd";

import {
  UserPlus,
  Users,
  Building2,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { LuLayoutDashboard } from "react-icons/lu";
interface AgentsSidebarProps {
  drawerOpen?: boolean;
  onCloseDrawer?: () => void;
}

const AgentsSidebar = ({ drawerOpen = false, onCloseDrawer }: AgentsSidebarProps) => {
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const pathname = usePathname();
  const closeDrawer = () => {
    if (onCloseDrawer) {
      onCloseDrawer();
    }
  };

  const openLogoutModal = () => setLogoutModalVisible(true);
  const handleLogoutCancel = () => setLogoutModalVisible(false);
  const handleLogoutConfirm = () => {
    setLogoutModalVisible(false);
    console.log("User logged out");
  };

  const menuList = [
    {
      title: "Dashboard Overview",
      icon: <LuLayoutDashboard size={20} className="text-red-400" />,
      href: "/agents",
    },
    {
      title: "Placements Requests",
      icon: <UserPlus size={18} />,
      href: "/PlacementsRequests",
    },
    {
      title: "Placement Progress",
      icon: <Users size={18} />,
      href: "/PlacementProgress",
    },
    {
      title: "Connect With Club",
      icon: <Building2 size={18} />,
      href: "/ExploreClubs",
    },
  ];

  const MenuItem = ({ item }: any) => {
    const isActive = pathname === item.href;
    return (
      <Link href={item.href} onClick={closeDrawer}>
        <div
          className={`flex items-center gap-3 px-1 md:px-4 py-3 rounded-xl cursor-pointer transition-all ${
            isActive
              ? "bg-[#FFFFFF] border border-red-400 text-red-400 font-semibold shadow-[0_0_20px_rgba(255,0,0,0.5)]"
              : "text-gray-400 hover:text-white hover:bg-gray-800/50"
          }`}
        >
          {item.icon}
          <span className="text-xs md:text-sm">{item.title}</span>
          <ChevronRight
            size={18}
            className={`ml-auto ${
              isActive ? "text-red-300" : "text-gray-500"
            }`}
          />
        </div>
      </Link>
    );
  };

  return (
    <div className="w-full pt-2">
      {/* ------------ MOBILE DRAWER -------------- */}
      <Drawer
        placement="left"
        open={drawerOpen}
        onClose={closeDrawer}
        className="p-0"
        width={200}
        styles={{
          body: { backgroundColor: '#1F1F1F', padding: 0 }
        }}
      >
        <div className="h-full bg-[#1F1F1F] p-4 flex flex-col justify-between">
          <div className="flex flex-col gap-4 mt-4">
            {menuList.map((item, i) => (
              <MenuItem key={i} item={item} />
            ))}
          </div>

          {/* LOGOUT BUTTON */}
          <button
            onClick={openLogoutModal}
            className="flex items-center gap-3 text-red-400 px-4 py-3 mb-4 hover:text-red-500 transition-colors rounded-xl hover:bg-red-500/10"
          >
            <LogOut size={18} />
            <span className="text-sm">Logout</span>
          </button>
        </div>
      </Drawer>

      {/* ------------ DESKTOP AgentsSidebar -------------- */}
      <aside className="hidden md:flex flex-col justify-between h-[calc(100vh-110px)] bg-[#303030] rounded-2xl p-2 shadow-xl border border-[#333]">
        <div className="flex flex-col gap-4 mt-4 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
          {menuList.map((item, i) => (
            <MenuItem key={i} item={item} />
          ))}
        </div>

        <button
          onClick={openLogoutModal}
          className="flex items-center gap-3 text-red-400 px-4 py-3 mb-2 hover:text-red-500 transition-colors rounded-xl hover:bg-red-500/10"
        >
          <LogOut size={18} />
          <span className="text-sm">Logout</span>
        </button>
      </aside>

      {/* ------------- LOGOUT MODAL -------------- */}
      <Modal
        open={logoutModalVisible}
        onOk={handleLogoutConfirm}
        onCancel={handleLogoutCancel}
        centered
        width={300}
        footer={[
          <button
            key="cancel"
            onClick={handleLogoutCancel}
            className="border border-red-500 text-red-500 px-4 py-2 rounded hover:bg-red-50 transition-colors"
          >
            No
          </button>,
          <button
            key="yes"
            onClick={handleLogoutConfirm}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 ml-4 transition-colors"
          >
            Yes
          </button>,
        ]}
      >
        <h1 className="text-2xl font-semibold">Logout</h1>
        <p className="mt-2 text-gray-600">Are you sure you want to log out?</p>
      </Modal>
    </div>
  );
};

export default AgentsSidebar;
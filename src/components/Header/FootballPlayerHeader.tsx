"use client";
import { useState } from 'react';
import Image from 'next/image';
import { Settings, Bell, MessageSquare, Menu, MoreVertical } from 'lucide-react';
import logo from '@/assets/logo/logo.png';
import userImg from '@/assets/logo/user.jpg';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useGetProfileQuery } from '@/redux/features/Profile/Profile';

interface FootballPlayerHeaderProps {
  onMenuClick?: () => void;
}

const FootballPlayerHeader = ({ onMenuClick }: FootballPlayerHeaderProps) => {
  const router = useRouter();
  // 2. Destructure refetch instead of refresh (RTK Query hook name)
  const { data, } = useGetProfileQuery({});
  const user = data?.data;
  console.log(user?.image);

  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  const notifications = [
    { id: 1, message: "Video review request from David Martinez has been accepted", time: "2h ago" },
    { id: 2, message: "Video review request from David Martinez has been accepted", time: "2h ago" },
    { id: 3, message: "Video review request from David Martinez has been accepted", time: "2h ago" },
    { id: 4, message: "Video review request from David Martinez has been accepted", time: "2h ago" },
    { id: 5, message: "Video review request from David Martinez has been accepted", time: "2h ago" },
    { id: 6, message: "Video review request from David Martinez has been accepted", time: "2h ago" },
    { id: 7, message: "Video review request from David Martinez has been accepted", time: "2h ago" },
    { id: 8, message: "Video review request from David Martinez has been accepted", time: "2h ago" },
    { id: 9, message: "Video review request from David Martinez has been accepted", time: "2h ago" },
    { id: 10, message: "Video review request from David Martinez has been accepted", time: "2h ago" },
  ];

  // Role-based route mapping — image click korle role onujayi route hobe
  const handleProfileClick = () => {
    if (user.role === "player") {
      router.push("/profileplayer");
    } else if (user.role === "coach") {
      router.push("/couchprofile");
    } else if (user.role === "club") {
      router.push("/clubprofile");
    } else if (user.role === "agents") {
      router.push("/agentprofile");
    }
  };

  return (
    <>
      <header className="bg-[#303030] border-b border-gray-800 rounded-xl py-1 shadow-lg">
        <div className="flex items-center justify-between px-2 md:px-6 ">
          
          {/* Logo Section with Mobile Menu Button */}
          <div className="flex items-center gap-1 md:p-2">
            {/* Mobile Menu Button */}
            <button
              onClick={onMenuClick}
              className="md:hidden text-white hover:bg-gray-700/50 rounded-lg transition-colors"
              aria-label="Open Menu"
            >
              <Menu className="w-4 h-4" />
            </button>

            <Link href="/">
              <Image
                src={logo}
                alt="Logo"
                width={100}
                height={100}
                className="rounded w-[50px] h-[34px] md:w-[115px] md:h-[68px] object-cover"
              />
            </Link>
          </div>

          {/* Right Section - Icons */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Settings Icon */}
            <button 
              className="text-gray-400 flex space-x-1 items-center hover:text-white transition-colors p-2 hover:bg-gray-700/50 rounded-lg"
              aria-label="Settings"
            >
              <Settings className="w-5 h-5 md:w-8 md:h-8" />
              <h1 className='hidden md:block'>Settings</h1>
            </button>

            {/* Bell Icon with notification badge - Toggle Notification Panel */}
            <button 
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              className="relative text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-700/50 rounded-lg"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5 md:w-7 md:h-7" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            </button>

            {/* Message Icon */}
            <button 
              className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-700/50 rounded-lg"
              aria-label="Messages"
            >
              <MessageSquare className="w-5 h-5 md:w-7 md:h-7" />
            </button>

            {/* Profile Avatar - role onujayi route hobe click korle */}
            <button
              onClick={handleProfileClick}
              className="relative group"
              aria-label="Profile"
            >
              <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-sm font-semibold overflow-hidden ring-2 ring-transparent group-hover:ring-blue-400 transition-all">
                <Image
                  src={user?.image ? user.image : userImg}
                  alt="Profile"
                  width={200}
                  height={200}
                  className="w-8 h-8 md:w-[55px] md:h-[55px] object-cover"
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Overlay */}
      {isNotificationOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={() => setIsNotificationOpen(false)}
        ></div>
      )}

      {/* Notification Panel */}
      <div className={`fixed top-2 right-0 h-full w-full md:w-[500px] bg-[#2b2b2b] shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${isNotificationOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="text-xm md:text-2xl font-bold text-white py-3"
            style={{
              textShadow:
                "0 0 10px #ff0000, 0 0 20px #ff0000, 0 0 30px #ff0000, 0 0 40px #ff0000",
            }}>Notifications</h2>
          <button 
            onClick={() => setIsNotificationOpen(false)}
            className="text-gray-400 hover:text-white p-1 hover:bg-gray-700/50 rounded-lg transition-colors"
          >
            <MoreVertical className="w-6 h-6" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-700">
          <button 
            onClick={() => setActiveTab('all')}
            className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${activeTab === 'all' ? 'bg-white text-red-500 shadow-[0_0_20px_rgba(255,0,0,0.5)]' : 'text-gray-400 hover:text-white'}`}
          >
            All
          </button>
          <button 
            onClick={() => setActiveTab('unread')}
            className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${activeTab === 'unread' ? 'bg-white text-red-500 shadow-[0_0_20px_rgba(255,0,0,0.5)]' : 'text-gray-400 hover:text-white'}`}
          >
            Unread
          </button>
        </div>

        {/* Notification List */}
        <div className="overflow-y-auto h-[calc(100vh-120px)]">
          {notifications.map((notification) => (
            <div 
              key={notification.id}
              className="flex items-start gap-3 p-4 hover:bg-gray-700/30 transition-colors border-b border-gray-800 cursor-pointer"
            >
              <div className="relative flex-shrink-0">
                <Image 
                  src={userImg}
                  alt="User avatar"
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-gray-300 text-sm leading-relaxed">
                  {notification.message}
                </p>
                <p className="text-gray-500 text-xs mt-1">{notification.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FootballPlayerHeader;
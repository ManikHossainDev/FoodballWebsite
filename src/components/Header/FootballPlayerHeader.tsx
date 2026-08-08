/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import {Bell, MessageSquare, Menu, MoreVertical, X } from 'lucide-react';
import logo from '@/assets/logo/logo.png';
import userImg from '@/assets/logo/user.jpg';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  useDeleteAllNotificationsMutation,
  useGetNotificationsQuery,
  useGetProfileQuery,
  useUpdateNotificationsMutation,
} from '@/redux/features/Profile/Profile';

interface FootballPlayerHeaderProps {
  onMenuClick?: () => void;
}

const FootballPlayerHeader = ({ onMenuClick }: FootballPlayerHeaderProps) => {
  const router = useRouter();
  const { data } = useGetProfileQuery({});
  const user = data?.data;
  

  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'unviewed' | 'viewed'>('unviewed');
  const [selectedNotification, setSelectedNotification] = useState<any | null>(null);
  // bumped on every tab click (even re-clicking the same tab) to force a fresh fetch
  const [refreshTick, setRefreshTick] = useState(0);

  const [updateNotifications] = useUpdateNotificationsMutation();

  // ---- dynamic query params (infinite scroll) ----
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [allNotifications, setAllNotifications] = useState<any[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // "unviewed" -> isViewed = "unviewed", "viewed" -> isViewed = "viewed"
  const queryArgs = { isViewed: activeTab, page, limit };

  const {
    data: notificationRes,
    isLoading,
    isFetching,
    refetch: refetchNotifications,
  } = useGetNotificationsQuery(queryArgs);

  console.log(notificationRes)
  
  const [deleteAllNotifications, { isLoading: isDeleting }] = useDeleteAllNotificationsMutation();
  const fetchedNotifications = notificationRes?.data?.data ?? notificationRes?.data ?? [];
  const meta = notificationRes?.data?.meta;
  const hasMore = meta?.totalPage ? page < meta.totalPage : fetchedNotifications.length === limit;

  // reset accumulated list whenever the tab changes (page resets to 1 there)
  useEffect(() => {
    if (page === 1) {
      setAllNotifications(fetchedNotifications);
    } else {
      // append new page, avoid duplicate ids
      setAllNotifications((prev) => {
        const existingIds = new Set(prev.map((n) => n._id || n.id));
        const newOnes = fetchedNotifications.filter(
          (n: any) => !existingIds.has(n._id || n.id)
        );
        return [...prev, ...newOnes];
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notificationRes]);

  // reset to page 1 + clear list whenever tab changes / panel re-opens / user re-clicks a tab,
  // and force a fresh fetch from the server so we never show stale cached data
  useEffect(() => {
    setPage(1);
    setAllNotifications([]);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
    if (isNotificationOpen) {
      refetchNotifications();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, isNotificationOpen, refreshTick]);

  const handleScroll = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el || isLoading || isFetching || !hasMore) return;

    const { scrollTop, scrollHeight, clientHeight } = el;
    if (scrollHeight - scrollTop - clientHeight < 100) {
      setPage((p) => p + 1);
    }
  }, [isLoading, isFetching, hasMore]);

  const notifications = allNotifications;

  const handleClearAll = async () => {
    try {
      await deleteAllNotifications().unwrap();
      setAllNotifications([]);
    } catch (error) {
      console.log('Failed to clear notifications:', error);
    }
  };

  const handleTabChange = (tab: 'viewed' | 'unviewed') => {
    setActiveTab(tab);
    setRefreshTick((t) => t + 1);
  };

  const handleNotificationClick = async (notification: any) => {
    const id = notification._id || notification.id;
    if (!id) return;

    const alreadyViewed = user?._id
      ? (notification.viewedBy || []).includes(user._id)
      : (notification.viewedBy || []).length > 0;

    // open the detail modal immediately with what we have
    setSelectedNotification(notification);

    if (alreadyViewed) return;

    try {
      
      await updateNotifications(id).unwrap();
      
      const updatedViewedBy = user?._id
        ? Array.from(new Set([...(notification.viewedBy || []), user._id]))
        : notification.viewedBy;

      // keep the open modal in sync with the new viewed state
      setSelectedNotification((prev: any) =>
        prev && (prev._id || prev.id) === id ? { ...prev, viewedBy: updatedViewedBy } : prev
      );
      // Optimistically update the list so it doesn't wait for a refetch
      if (activeTab === 'unviewed') {
        // it's no longer unviewed, so drop it from this list
        setAllNotifications((prev) => prev.filter((n) => (n._id || n.id) !== id));
      } else {
        setAllNotifications((prev) =>
          prev.map((n) => ((n._id || n.id) === id ? { ...n, viewedBy: updatedViewedBy } : n))
        );
      }
    } catch (error) {
      console.log('Failed to update notification:', error);
    }
  };

  const handleCloseDetail = () => setSelectedNotification(null);

  const handleProfileClick = () => {
    if (!user) return;
    if (user.role === 'player') {
      router.push('/profileplayer');
    } else if (user.role === 'coach') {
      router.push('/couchprofile');
    } else if (user.role === 'club') {
      router.push('/clubprofile');
    } else if (user.role === 'agent') {
      router.push('/agentprofile');
    }
  };

  return (
    <>
      <header className="bg-[#303030] border-b border-gray-800 rounded-xl py-1 shadow-lg">
        <div className="flex items-center justify-between px-2 md:px-6 ">
          {/* Logo Section with Mobile Menu Button */}
          <div className="flex items-center gap-1 md:p-2">
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
            {/* <button
              className="text-gray-400 flex space-x-1 items-center hover:text-white transition-colors p-2 hover:bg-gray-700/50 rounded-lg"
              aria-label="Settings"
            >
              <Settings className="w-5 h-5 md:w-8 md:h-8" />
              <h1 className="hidden md:block">Settings</h1>
            </button> */}

            <button
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              className="relative text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-700/50 rounded-lg"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5 md:w-7 md:h-7" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            </button>

            <Link href={`/messaging/${user?._id}`}
              className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-700/50 rounded-lg"
              aria-label="Messages"
            >
              <MessageSquare className="w-5 h-5 md:w-7 md:h-7" />
            </Link>

            <button onClick={handleProfileClick} className="relative group" aria-label="Profile">
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
      <div
        className={`fixed top-2 right-0 h-full w-full md:w-[500px] bg-[#2b2b2b] shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isNotificationOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2
            className="text-xm md:text-2xl font-bold text-white py-3"
            style={{
              textShadow:
                '0 0 10px #ff0000, 0 0 20px #ff0000, 0 0 30px #ff0000, 0 0 40px #ff0000',
            }}
          >
            Notifications
          </h2>
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
            onClick={() => handleTabChange('unviewed')}
            className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === 'unviewed'
                ? 'bg-white text-red-500 shadow-[0_0_20px_rgba(255,0,0,0.5)]'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            unviewed
          </button>
          <button
            onClick={() => handleTabChange('viewed')}
            className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === 'viewed'
                ? 'bg-white text-red-500 shadow-[0_0_20px_rgba(255,0,0,0.5)]'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            viewed
          </button>
        </div>

        {/* Notification List - fully dynamic, infinite scroll */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="overflow-y-auto h-[calc(100vh-210px)]"
        >
          {isLoading && page === 1 ? (
            <p className="text-gray-400 text-sm text-center py-6">Loading...</p>
          ) : notifications.length === 0 ? (
            <p className="text-gray-400 text-sm text-center py-6">No notifications</p>
          ) : (
            <>
              {notifications.map((notification: any) => (
                <div
                  key={notification._id || notification.id}
                  onClick={() => handleNotificationClick(notification)}
                  className="flex items-start gap-3 p-4 hover:bg-gray-700/30 transition-colors border-b border-gray-800 cursor-pointer"
                >
                  <div className="relative flex-shrink-0">
                    <Image
                      src={notification?.sender?.image || userImg}
                      alt="User avatar"
                      width={40}
                      height={40}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {notification.message || notification.title}
                    </p>
                    <p className="text-gray-500 text-xs mt-1">
                      {notification.createdAt
                        ? new Date(notification.createdAt).toLocaleString()
                        : notification.time}
                    </p>
                  </div>
                </div>
              ))}

              {/* loading-more indicator while fetching next page */}
              {isFetching && page > 1 && (
                <p className="text-gray-500 text-xs text-center py-4">Loading more...</p>
              )}

              {/* end of list */}
              {!hasMore && notifications.length > 0 && (
                <p className="text-gray-600 text-xs text-center py-4">No more notifications</p>
              )}
            </>
          )}
        </div>

        {/* Clear All button - bottom of panel */}
        {notifications.length > 0 && (
          <div className="flex justify-center px-4 py-3 border-t border-gray-700 bg-[#2b2b2b]">
            <button
              onClick={handleClearAll}
              disabled={isDeleting}
              className="text-xs md:text-sm text-red-400 hover:text-red-300 transition-colors disabled:opacity-50"
            >
              {isDeleting ? 'Clearing...' : 'Clear All'}
            </button>
          </div>
        )}
      </div>

      {/* Notification Detail Modal */}
      {selectedNotification && (
        <>
          <div
            className="fixed inset-0 bg-black/60 z-[60] transition-opacity"
            onClick={handleCloseDetail}
          ></div>

          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
            <div className="bg-[#2b2b2b] w-full max-w-md rounded-xl shadow-2xl border border-gray-700 overflow-hidden">
              {/* Modal header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-700">
                <h3 className="text-lg font-bold text-white">
                  {selectedNotification.title || 'Notification'}
                </h3>
                <button
                  onClick={handleCloseDetail}
                  className="text-gray-400 hover:text-white p-1 hover:bg-gray-700/50 rounded-lg transition-colors"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal body */}
              <div className="p-4 space-y-4">
                <div className="flex items-center gap-3">
                  <Image
                    src={selectedNotification?.sender?.image || userImg}
                    alt="Sender avatar"
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-white font-medium">
                      {selectedNotification?.sender?.name || 'Unknown sender'}
                    </p>
                    {selectedNotification?.sender?.role && (
                      <p className="text-gray-400 text-xs capitalize">
                        {selectedNotification.sender.role}
                      </p>
                    )}
                  </div>
                </div>

                <p className="text-gray-300 text-sm leading-relaxed">
                  {selectedNotification.message}
                </p>

                <div className="grid grid-cols-2 gap-3 text-xs text-gray-400 pt-2 border-t border-gray-700">
                  {selectedNotification.type && (
                    <div>
                      <span className="block text-gray-500">Type</span>
                      <span className="text-gray-300 capitalize">
                        {String(selectedNotification.type).replace(/_/g, ' ')}
                      </span>
                    </div>
                  )}
                  {selectedNotification.createdAt && (
                    <div>
                      <span className="block text-gray-500">Received</span>
                      <span className="text-gray-300">
                        {new Date(selectedNotification.createdAt).toLocaleString()}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default FootballPlayerHeader;
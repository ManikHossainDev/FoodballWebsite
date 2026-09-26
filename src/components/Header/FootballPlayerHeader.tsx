/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { Bell, MessageSquare, Menu, X } from 'lucide-react';
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
    fulfilledTimeStamp,
    refetch: refetchNotifications,
  } = useGetNotificationsQuery(queryArgs);

  const [deleteAllNotifications, { isLoading: isDeleting }] = useDeleteAllNotificationsMutation();

  const fetchedNotifications = notificationRes?.data?.data ?? [];
  const meta = notificationRes?.data?.pagination;
  const hasMore = meta?.totalPages
    ? page < meta.totalPages
    : fetchedNotifications.length === limit;

  // Populate/append the list whenever a fetch completes
  useEffect(() => {
    if (!notificationRes) return;

    if (page === 1) {
      setAllNotifications(fetchedNotifications);
    } else {
      setAllNotifications((prev) => {
        const existingIds = new Set(prev.map((n) => n._id || n.id));
        const newOnes = fetchedNotifications.filter(
          (n: any) => !existingIds.has(n._id || n.id)
        );
        return [...prev, ...newOnes];
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fulfilledTimeStamp, page]);

  // reset to page 1 + clear list whenever tab changes / panel re-opens
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

    setSelectedNotification(notification);

    if (alreadyViewed) return;

    try {
      await updateNotifications(id).unwrap();

      const updatedViewedBy = user?._id
        ? Array.from(new Set([...(notification.viewedBy || []), user._id]))
        : notification.viewedBy;

      setSelectedNotification((prev: any) =>
        prev && (prev._id || prev.id) === id ? { ...prev, viewedBy: updatedViewedBy } : prev
      );

      if (activeTab === 'unviewed') {
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
      <header className="bg-[#18181b]/95 backdrop-blur-md border border-zinc-800/80 rounded-2xl shadow-xl transition-all">
        <div className="h-16 md:h-[70px] flex items-center justify-between px-3 sm:px-4 md:px-6">
          
          {/* Left Section: Mobile Menu + Logo */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onMenuClick}
              className="md:hidden w-9 h-9 rounded-xl bg-zinc-800/80 hover:bg-zinc-800 border border-zinc-700/60 text-zinc-300 hover:text-white flex items-center justify-center transition-colors"
              aria-label="Open Navigation Menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <Link href="/" className="flex items-center">
              <Image
                src={logo}
                alt="Evolution Hub"
                width={160}
                height={50}
                className="h-8 sm:h-9 md:h-10 w-auto object-contain block"
                priority
              />
            </Link>
          </div>

          {/* Right Section: Notification, Messaging, and Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Notification Button */}
            <button
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-zinc-800/80 hover:bg-zinc-800 border border-zinc-700/60 flex items-center justify-center text-zinc-300 hover:text-white transition-all cursor-pointer"
              aria-label="Notifications"
            >
              <Bell className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-600 rounded-full animate-pulse ring-2 ring-[#18181b]"></span>
            </button>

            {/* Messaging Button */}
            <Link
              href={`/messaging/${user?._id || ''}`}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-zinc-800/80 hover:bg-zinc-800 border border-zinc-700/60 flex items-center justify-center text-zinc-300 hover:text-white transition-all"
              aria-label="Messages"
            >
              <MessageSquare className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
            </Link>

            {/* User Profile */}
            <button
              onClick={handleProfileClick}
              className="flex items-center gap-2.5 sm:gap-3 pl-1 sm:pl-1.5 pr-1 py-1 rounded-full hover:bg-zinc-800/60 transition-colors group cursor-pointer text-left"
              aria-label="View Profile"
            >
              <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden ring-2 ring-zinc-700/80 group-hover:ring-red-500 transition-all shrink-0">
                <Image
                  src={user?.image ? user.image : userImg}
                  alt="Profile"
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              </div>

              {user?.name && (
                <div className="hidden lg:flex flex-col text-left pr-1.5">
                  <span className="text-white text-xs sm:text-sm font-semibold leading-tight line-clamp-1 group-hover:text-red-400 transition-colors">
                    {user.name}
                  </span>
                  <span className="text-zinc-400 text-[11px] font-medium capitalize mt-0.5">
                    {user.role || 'Member'}
                  </span>
                </div>
              )}
            </button>
          </div>

        </div>
      </header>

      {/* Overlay */}
      {isNotificationOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity"
          onClick={() => setIsNotificationOpen(false)}
        />
      )}

      {/* Notification Slide-Over Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[420px] md:w-[460px] bg-[#121214] border-l border-zinc-800/80 shadow-2xl z-50 flex flex-col transform transition-transform duration-300 ease-in-out ${
          isNotificationOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-800">
          <div className="flex items-center gap-2.5">
            <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
              Notifications
            </h2>
            {notifications.length > 0 && (
              <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-red-600/20 text-red-500 border border-red-600/30">
                {notifications.length}
              </span>
            )}
          </div>
          <button
            onClick={() => setIsNotificationOpen(false)}
            className="w-8 h-8 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close Notifications"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex px-4 pt-3 pb-2 border-b border-zinc-800 gap-2">
          <button
            onClick={() => handleTabChange('unviewed')}
            className={`flex-1 py-2 px-3 text-xs sm:text-sm font-semibold rounded-lg transition-all capitalize cursor-pointer ${
              activeTab === 'unviewed'
                ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
            }`}
          >
            Unviewed
          </button>
          <button
            onClick={() => handleTabChange('viewed')}
            className={`flex-1 py-2 px-3 text-xs sm:text-sm font-semibold rounded-lg transition-all capitalize cursor-pointer ${
              activeTab === 'viewed'
                ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
            }`}
          >
            Viewed
          </button>
        </div>

        {/* Notification List - Dynamic Infinite Scroll */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto scroll-hide divide-y divide-zinc-800/60"
        >
          {isLoading && page === 1 ? (
            <p className="text-zinc-500 text-sm text-center py-10">Loading notifications...</p>
          ) : notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
              <div className="w-12 h-12 rounded-full bg-zinc-800/60 flex items-center justify-center text-zinc-500 mb-3">
                <Bell className="w-6 h-6" />
              </div>
              <p className="text-zinc-400 text-sm font-medium">No notifications yet</p>
              <p className="text-zinc-600 text-xs mt-1 max-w-[240px]">
                You are all caught up! New updates will appear here.
              </p>
            </div>
          ) : (
            <>
              {notifications.map((notification: any) => (
                <div
                  key={notification._id || notification.id}
                  onClick={() => handleNotificationClick(notification)}
                  className="flex items-start gap-3 p-4 hover:bg-zinc-800/50 transition-colors cursor-pointer"
                >
                  <div className="relative flex-shrink-0 ">
                    <Image
                      src={notification?.sender?.image || userImg}
                      alt="Avatar"
                      width={40}
                      height={40}
                      className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover ring-1 ring-zinc-700"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-zinc-200 text-xs sm:text-sm font-medium leading-relaxed line-clamp-2">
                      {notification.message || notification.title}
                    </p>
                    <p className="text-zinc-500 text-[11px] mt-1.5 font-normal">
                      {notification.createdAt
                        ? new Date(notification.createdAt).toLocaleString(undefined, {
                            dateStyle: 'medium',
                            timeStyle: 'short',
                          })
                        : notification.time}
                    </p>
                  </div>
                </div>
              ))}

              {isFetching && page > 1 && (
                <p className="text-zinc-500 text-xs text-center py-4">Loading more...</p>
              )}

              {!hasMore && notifications.length > 0 && (
                <p className="text-zinc-600 text-xs text-center py-4">No more notifications</p>
              )}
            </>
          )}
        </div>

        {/* Clear All Footer */}
        {notifications.length > 0 && (
          <div className="p-3.5 border-t border-zinc-800 bg-[#121214] flex justify-center">
            <button
              onClick={handleClearAll}
              disabled={isDeleting}
              className="text-xs sm:text-sm font-semibold text-red-500 hover:text-red-400 transition-colors py-1.5 px-4 rounded-lg hover:bg-red-500/10 cursor-pointer disabled:opacity-50"
            >
              {isDeleting ? 'Clearing...' : 'Clear All Notifications'}
            </button>
          </div>
        )}
      </div>

      {/* Notification Detail Modal */}
      {selectedNotification && (
        <>
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[60] transition-opacity"
            onClick={handleCloseDetail}
          />

          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
            <div className="bg-[#18181b] w-full max-w-md rounded-2xl shadow-2xl border border-zinc-800 overflow-hidden">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 sm:p-5 border-b border-zinc-800">
                <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  {selectedNotification.title || 'Notification Details'}
                </h3>
                <button
                  onClick={handleCloseDetail}
                  className="w-8 h-8 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-4 sm:p-5 space-y-4">
                <div className="flex items-center gap-3">
                  <Image
                    src={selectedNotification?.sender?.image || userImg}
                    alt="Sender avatar"
                    width={48}
                    height={48}
                    className="w-11 h-11 rounded-full object-cover ring-1 ring-zinc-700"
                  />
                  <div>
                    <p className="text-white font-semibold text-sm sm:text-base">
                      {selectedNotification?.sender?.name || 'Evolution Hub'}
                    </p>
                    {selectedNotification?.sender?.role && (
                      <p className="text-zinc-400 text-xs capitalize mt-0.5">
                        {selectedNotification.sender.role}
                      </p>
                    )}
                  </div>
                </div>

                <div className="bg-zinc-900/60 rounded-xl p-3.5 border border-zinc-800">
                  <p className="text-zinc-200 text-xs sm:text-sm leading-relaxed">
                    {selectedNotification.message}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs text-zinc-400 pt-2 border-t border-zinc-800">
                  {selectedNotification.type && (
                    <div>
                      <span className="block text-zinc-500 font-medium">Type</span>
                      <span className="text-zinc-300 font-semibold capitalize mt-0.5 block">
                        {String(selectedNotification.type).replace(/_/g, ' ')}
                      </span>
                    </div>
                  )}
                  {selectedNotification.createdAt && (
                    <div>
                      <span className="block text-zinc-500 font-medium">Received</span>
                      <span className="text-zinc-300 font-semibold mt-0.5 block">
                        {new Date(selectedNotification.createdAt).toLocaleString(undefined, {
                          dateStyle: 'medium',
                          timeStyle: 'short',
                        })}
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

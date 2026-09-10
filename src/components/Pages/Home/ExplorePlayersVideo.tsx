/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useRef, useState } from "react";
import { Play, ChevronLeft, ChevronRight } from "lucide-react";
import { useGetUploadVideoQuery } from "@/redux/features/player/UploadVideo";
import Image from "next/image";

type VideoAuthor = {
  _id: string;
  name: string;
  image: string;
  role: string;
};

type VideoContent = {
  resource_type: string;
  secure_url: string;
  duration?: number;
  bytes?: number;
  width?: number;
  height?: number;
  public_id?: string;
};

type VideoItem = {
  _id: string;
  author: VideoAuthor;
  title: string;
  description: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  content: VideoContent;
};

const formatDuration = (seconds: number) => {
  if (!seconds || Number.isNaN(seconds)) return "";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${mins}:${secs}`;
};

const VideoCard = ({ video }: { video: VideoItem }) => {
  const [duration, setDuration] = useState<string>("");
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="flex w-[270px] sm:w-[330px] lg:w-[410px] shrink-0 flex-col overflow-hidden rounded-2xl bg-[#1c1c1c] border border-white/[0.08] shadow-xl transition-all duration-300 hover:border-red-500/50 hover:shadow-[0_0_25px_rgba(255,0,0,0.15)]">
      {/* Thumbnail */}
      <div className="relative h-[200px] sm:h-[260px] lg:h-[320px] w-full bg-black">
        <video
          src={video.content.secure_url}
          className="h-full w-full object-cover"
          muted
          playsInline
          controls={isPlaying}
          onLoadedMetadata={(e) =>
            setDuration(formatDuration(e.currentTarget.duration))
          }
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />

        {!isPlaying && (
          <button
            type="button"
            aria-label="Play video"
            onClick={(e) => {
              const container = e.currentTarget.parentElement;
              const videoEl = container?.querySelector("video");
              videoEl?.play();
            }}
            className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-red-600/90 text-white transition hover:bg-red-600 hover:scale-110 shadow-lg"
          >
            <Play size={20} fill="white" className="ml-0.5" />
          </button>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="mb-1 truncate text-base font-semibold text-white">
          {video.title}
        </h3>
        <p className="mb-4 line-clamp-2 text-xs md:text-sm text-gray-400">
          {video.description}
        </p>

        <div className="mt-auto flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2">
            <Image
              src={video.author?.image}
              alt={video.author?.name || "Player"}
              width={36}
              height={36}
              className="h-8 w-8 md:h-9 md:w-9 shrink-0 rounded-full object-cover border border-white/20"
            />
            <span className="truncate text-xs md:text-sm font-medium text-white">
              {video.author?.name}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ---------------- Main Component ----------------
const ExplorePlayersVideo = () => {
  const { data, isLoading, isError } = useGetUploadVideoQuery({
    page: 1,
    limit: 1000000,
  });

  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  const raw = data?.data;
  const videos: VideoItem[] = Array.isArray(raw) ? raw : raw?.data ?? [];

  // Smooth Auto-scroll
  useEffect(() => {
    const container = scrollRef.current;
    if (!container || videos.length <= 1) return;

    let intervalId: NodeJS.Timeout;

    if (!isPaused) {
      intervalId = setInterval(() => {
        if (!container) return;
        const maxScrollLeft = container.scrollWidth - container.clientWidth;

        if (container.scrollLeft >= maxScrollLeft - 20) {
          container.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          const scrollDistance = container.clientWidth < 640 ? 285 : 350;
          container.scrollBy({ left: scrollDistance, behavior: "smooth" });
        }
      }, 3500);
    }

    return () => clearInterval(intervalId);
  }, [isPaused, videos.length]);

  const scroll = (direction: "left" | "right") => {
    const container = scrollRef.current;
    if (!container) return;

    const scrollDistance = container.clientWidth < 640 ? 285 : 350 * 2;

    container.scrollBy({
      left: direction === "left" ? -scrollDistance : scrollDistance,
      behavior: "smooth",
    });
  };

  const handleManualScroll = (direction: "left" | "right") => {
    setIsPaused(true);
    scroll(direction);
    // Resume auto-scroll after 4 seconds of inactivity
    setTimeout(() => setIsPaused(false), 4000);
  };

  if (isLoading) {
    return <p className="p-6 text-white text-center">Loading videos...</p>;
  }

  if (isError) {
    return <p className="p-6 text-red-500 text-center">Failed to load videos.</p>;
  }

  if (videos.length === 0) {
    return <p className="p-6 text-gray-400 text-center">No videos uploaded yet.</p>;
  }

  return (
    <div className="relative w-full responsive-padding group/slider">
      {/* Left Arrow Button (Prominently visible on Mobile, Tablet & Desktop) */}
      <button
        type="button"
        aria-label="Scroll left"
        onClick={() => handleManualScroll("left")}
        className="absolute left-1 sm:left-2 md:left-4 top-1/2 z-30 -translate-y-1/2 flex h-9 w-9 sm:h-11 sm:w-11 md:h-12 md:w-12 items-center justify-center rounded-full bg-black/90 hover:bg-red-600 border border-white/30 text-white shadow-[0_0_15px_rgba(0,0,0,0.8)] backdrop-blur-md active:scale-95 transition-all duration-200 cursor-pointer"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Right Arrow Button (Prominently visible on Mobile, Tablet & Desktop) */}
      <button
        type="button"
        aria-label="Scroll right"
        onClick={() => handleManualScroll("right")}
        className="absolute right-1 sm:right-2 md:right-4 top-1/2 z-30 -translate-y-1/2 flex h-9 w-9 sm:h-11 sm:w-11 md:h-12 md:w-12 items-center justify-center rounded-full bg-black/90 hover:bg-red-600 border border-white/30 text-white shadow-[0_0_15px_rgba(0,0,0,0.8)] backdrop-blur-md active:scale-95 transition-all duration-200 cursor-pointer"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Horizontal Slider with Touch & Auto-scroll support */}
      <div
        ref={scrollRef}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => {
          setTimeout(() => setIsPaused(false), 3000);
        }}
        className="flex gap-4 overflow-x-auto scroll-hide scroll-smooth pb-3 px-2"
      >
        {videos.map((video) => (
          <VideoCard key={video._id} video={video} />
        ))}
      </div>
    </div>
  );
};

export default ExplorePlayersVideo;
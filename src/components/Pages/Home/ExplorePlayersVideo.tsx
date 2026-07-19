/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRef, useState } from "react";
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
    <div className="flex lg:w-[430px] shrink-0 flex-col overflow-hidden rounded-2xl bg-[#2b2b2b] shadow-lg">
      {/* Thumbnail - fixed height, video orientation যাই হোক না কেন সবসময় একই height */}
      <div className="relative h-[340px] w-full bg-black">
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

        {/* {duration && (
          <span className="absolute left-2 top-2 rounded bg-black/70 px-2 py-0.5 text-xs font-medium text-white">
            {duration}
          </span>
        )} */}

        {!isPlaying && (
          <button
            type="button"
            aria-label="Play video"
            onClick={(e) => {
              const container = e.currentTarget.parentElement;
              const videoEl = container?.querySelector("video");
              videoEl?.play();
            }}
            className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-red-600/90 text-white transition hover:bg-red-600"
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
        <p className="mb-4 line-clamp-2 text-sm text-gray-400">
          {video.description}
        </p>

        {/* Player info + Contact button - always pinned to bottom */}
        <div className="mt-auto flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2">
            <Image
              src={video.author?.image}
              alt={video.author?.name}
              width={36}
              height={36}
              className="h-9 w-9 shrink-0 rounded-full object-cover"
            />
            <span className="truncate text-sm font-medium text-white">
              {video.author?.name}
            </span>
          </div>

          <button
            type="button"
            className="shrink-0 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
          >
            Contact Player
          </button>
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

  const raw = data?.data;
  const videos: VideoItem[] = Array.isArray(raw) ? raw : raw?.data ?? [];

  const scroll = (direction: "left" | "right") => {
    const container = scrollRef.current;
    if (!container) return;

    const scrollAmount = 340 * 2;

    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  if (isLoading) {
    return <p className="p-6 text-white">Loading videos...</p>;
  }

  if (isError) {
    return <p className="p-6 text-red-500">Failed to load videos.</p>;
  }

  if (videos.length === 0) {
    return <p className="p-6 text-gray-400">No videos uploaded yet.</p>;
  }

  return (
    <div className="relative w-full responsive-padding">
      <button
        type="button"
        aria-label="Scroll left"
        onClick={() => scroll("left")}
        className="absolute left-2 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full bg-black/70 p-2 text-white transition hover:bg-black/90 md:flex"
      >
        <ChevronLeft size={22} />
      </button>

      <button
        type="button"
        aria-label="Scroll right"
        onClick={() => scroll("right")}
        className="absolute right-2 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full bg-black/70 p-2 text-white transition hover:bg-black/90 md:flex"
      >
        <ChevronRight size={22} />
      </button>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scroll-hide scroll-smooth pb-2"
      >
        {videos.map((video) => (
          // items-stretch এর জন্য parent flex row এ h-full কাজ করবে, card গুলো সমান height হবে
          <div key={video._id} className="flex">
            <VideoCard video={video} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExplorePlayersVideo;
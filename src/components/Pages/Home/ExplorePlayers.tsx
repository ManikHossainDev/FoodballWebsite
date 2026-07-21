// app/explore-players/page.tsx
"use client";
import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { useGetUploadVideoQuery } from "@/redux/features/player/UploadVideo";

type TVideo = {
  _id: string;
  title: string;
  description: string;
  content: { secure_url: string };
  author?: { name?: string; image?: string };
};

// ---------- VideoCard ----------
const VideoCard = ({ video }: { video: TVideo }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="flex w-full flex-col overflow-hidden rounded-2xl bg-[#2b2b2b] shadow-lg">
      {/* Thumbnail */}
      <div className="relative h-56 sm:h-64 lg:h-72 w-full bg-black">
        <video
          src={video.content?.secure_url}
          className="h-full w-full object-cover"
          muted
          playsInline
          controls={isPlaying}
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

        <div className="mt-auto flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2">
            <Image
              src={video.author?.image || "/default-avatar.png"}
              alt={video.author?.name || "author"}
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

// ---------- ExplorePlayers ----------
const ExplorePlayers = () => {
  const { data, isLoading, isError } = useGetUploadVideoQuery({
    page: 1,
    limit: 1000, // large limit to fetch all data at once
  });

  const videos: TVideo[] = data?.data?.data ?? [];

  if (isLoading) {
    return <div className="p-6 text-white">Loading...</div>;
  }

  if (isError) {
    return <div className="p-6 text-red-500">Something went wrong!</div>;
  }

  return (
    <div className="py-6 mt-16 responsive-padding">
      
      <h2
        className="text-xl md:text-3xl font-bold text-white my-6 "
        style={{
          textShadow:
            "0 0 10px #ff0000, 0 0 20px #ff0000, 0 0 30px #ff0000, 0 0 40px #ff0000",
        }}
      >
        Explore Players
      </h2>

      {videos.length === 0 ? (
        <p className="mt-10 text-center text-gray-400">No videos found.</p>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6">
          {videos.map((video) => (
            <VideoCard key={video._id} video={video} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ExplorePlayers;
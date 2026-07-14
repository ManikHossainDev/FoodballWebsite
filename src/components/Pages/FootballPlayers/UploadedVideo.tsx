import { useEffect, useRef, useState } from "react";
import Image, { ImageLoaderProps } from "next/image";
import { Play, Trash2, Pencil } from "lucide-react";

const TITLES: string[] = [
  "Shooting Practice – Match Simulation",
  "Dribbling Drills – Cone Sprint",
  "Defensive Positioning – 1v1",
  "Passing Accuracy – Short Range",
  "Sprint Conditioning – Field Run",
  "Set Piece Practice – Free Kicks",
];

const DESCRIPTIONS: string[] = [
  "This video shows me practicing my shooting under pressure in match situations. I would like feedback on my accuracy and positioning.",
  "Working on close ball control while weaving through cones at speed. Looking for tips on footwork.",
  "One-on-one defensive drills focusing on body positioning and timing the tackle.",
  "Short passing sequences to improve first-touch and accuracy under pressure.",
  "Sprint intervals across the field to build match fitness and recovery speed.",
  "Practicing free kicks from various angles, focused on curl and placement.",
];

interface Video {
  id: number;
  title: string;
  description: string;
  duration: string;
  thumbnail: string;
}

const imageLoader = ({ src }: ImageLoaderProps): string => src;

// Generates a randomized list of video items
const generateVideos = (count: number): Video[] =>
  Array.from({ length: count }, (_, i) => {
    const idx = Math.floor(Math.random() * TITLES.length);
    const minutes = Math.floor(Math.random() * 9) + 1;
    const seconds = Math.floor(Math.random() * 60);
    return {
      id: i,
      title: TITLES[idx],
      description: DESCRIPTIONS[idx],
      duration: `${minutes}:${seconds.toString().padStart(2, "0")}`,
      thumbnail: `https://picsum.photos/seed/video${i}-${Date.now()}/400/240`,
    };
  });

const VideoCard = ({ video }: { video: Video }) => (
  <div className="min-w-[280px] max-w-[280px] bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg overflow-hidden flex-shrink-0">
    {/* Thumbnail */}
    <div className="relative h-[160px] w-full group cursor-pointer">
      <Image
        loader={imageLoader}
        src={video.thumbnail}
        alt={video.title}
        fill
        className="object-cover"
      />
      <span className="absolute top-2 left-2 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">
        {video.duration}
      </span>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-red-600/90 group-hover:bg-red-600 transition-colors rounded-full p-3">
          <Play className="w-5 h-5 text-white fill-white" />
        </div>
      </div>
    </div>

    {/* Info */}
    <div className="p-3">
      <h3 className="text-white text-sm font-semibold truncate">
        {video.title}
      </h3>
      <p className="text-[#9a9a9a] text-xs mt-1 line-clamp-2 leading-relaxed">
        {video.description}
      </p>

      <div className="flex gap-2 mt-3">
        <button className="flex-1 flex items-center justify-center gap-1.5 border border-[#3a3a3a] text-white text-xs font-medium rounded-md py-2 hover:bg-[#242424] transition-colors">
          <Trash2 className="w-3.5 h-3.5" />
          Delete Video
        </button>
        <button className="flex-1 flex items-center justify-center gap-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-medium rounded-md py-2 transition-colors">
          <Pencil className="w-3.5 h-3.5" />
          Edit video
        </button>
      </div>
    </div>
  </div>
);

const UploadedVideo = () => {
  const [videos] = useState<Video[]>(() => generateVideos(8));
  const scrollRef = useRef<HTMLDivElement>(null);
  const isHovered = useRef<boolean>(false);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let animationFrame: number;
    const speed = 0.6; // px per frame

    const step = () => {
      if (container && !isHovered.current) {
        container.scrollLeft += speed;
        // Loop back to start seamlessly
        if (
          container.scrollLeft >=
          container.scrollWidth - container.clientWidth - 1
        ) {
          container.scrollLeft = 0;
        }
      }
      animationFrame = requestAnimationFrame(step);
    };

    animationFrame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <div className="bg-black min-h-screen py-8 px-4">
      <h2
        className="text-xm md:text-2xl font-bold text-white py-3"
        style={{
          textShadow:
            "0 0 10px #ff0000, 0 0 20px #ff0000, 0 0 30px #ff0000, 0 0 40px #ff0000",
        }}
      >
        Your Uploaded Videos
      </h2>
      <p className="text-[#8F8F8F] mb-4">
        Track performance and manage your uploaded videos
      </p>

      <div
        ref={scrollRef}
        onMouseEnter={() => (isHovered.current = true)}
        onMouseLeave={() => (isHovered.current = false)}
        className="flex gap-4 overflow-x-auto scroll-smooth pb-2 [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: "none" }}
      >
        {/* Duplicate list once for seamless loop illusion */}
        {[...videos, ...videos].map((video, idx) => (
          <VideoCard key={`${video.id}-${idx}`} video={video} />
        ))}
      </div>
    </div>
  );
};

export default UploadedVideo;
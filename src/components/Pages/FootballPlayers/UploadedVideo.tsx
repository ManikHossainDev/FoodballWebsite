/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRef, useState } from "react";
import { Play, ChevronLeft, ChevronRight, X } from "lucide-react";
import {
  useDeleteUploadVideoMutation,
  useGetUploadVideoQuery,
  useUpdateUploadVideoMutation,
} from "@/redux/features/player/UploadVideo";
import Swal from "sweetalert2";
import { useGetFileUploadSignatureQuery } from "@/redux/features/fileUpload/fileUpload";

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

interface SignatureData {
  folder: string;
  timestamp: number;
  api_key: string;
  signature: string;
  cloud_name: string;
}

interface CloudinaryUploadResponse {
  resource_type: string;
  duration: number;
  bytes: number;
  width: number;
  height: number;
  secure_url: string;
  public_id: string;
}

const formatDuration = (seconds: number) => {
  if (!seconds || Number.isNaN(seconds)) return "";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${mins}:${secs}`;
};

const VideoCard = ({
  video,
  onDelete,
  onEdit,
}: {
  video: VideoItem;
  onDelete: (id: string) => void;
  onEdit: (video: VideoItem) => void;
}) => {
  const [duration, setDuration] = useState<string>("");
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="w-[320px] shrink-0 overflow-hidden rounded-2xl bg-[#2b2b2b] shadow-lg">
      {/* Thumbnail */}
      <div className="relative aspect-video w-full bg-black">
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

        {duration && (
          <span className="absolute left-2 top-2 rounded bg-black/70 px-2 py-0.5 text-xs font-medium text-white">
            {duration}
          </span>
        )}

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
      <div className="p-4">
        <h3 className="mb-1 truncate text-base font-semibold text-white">
          {video.title}
        </h3>
        <p className="mb-4 line-clamp-2 text-sm text-gray-400">
          {video.description}
        </p>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => onDelete(video._id)}
            className="flex-1 rounded-lg border border-gray-500 bg-transparent py-2 text-sm font-medium text-white transition hover:bg-gray-700"
          >
            Delete Video
          </button>
          <button
            type="button"
            onClick={() => onEdit(video)}
            className="flex-1 rounded-lg bg-red-600 py-2 text-sm font-medium text-white transition hover:bg-red-700"
          >
            Edit video
          </button>
        </div>
      </div>
    </div>
  );
};

// ---------------- Edit Modal ----------------

const EditVideoModal = ({
  video,
  onClose,
  onSave,
  isSaving,
}: {
  video: VideoItem;
  onClose: () => void;
  onSave: (payload: {
    title: string;
    description: string;
    file: File | null;
  }) => void;
  isSaving: boolean;
}) => {
  const [title, setTitle] = useState(video.title);
  const [description, setDescription] = useState(video.description);
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragover" || e.type === "dragenter");
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="w-full max-w-md rounded-2xl bg-[#1a1a1a] p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">Edit Video</h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-white"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Title */}
        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium text-white">
            Video Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-md border border-[#2A2A2A] bg-[#0A0A0A] px-4 py-2.5 text-sm text-white focus:border-[#ff0000] focus:outline-none"
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium text-white">
            Video Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full resize-none rounded-md border border-[#2A2A2A] bg-[#0A0A0A] px-4 py-3 text-sm text-white focus:border-[#ff0000] focus:outline-none"
          />
        </div>

        {/* Replace video (optional) */}
        <div className="mb-5">
          <label className="mb-2 block text-sm font-medium text-white">
            Replace Video{" "}
            <span className="font-normal text-[#8F8F8F]">(optional)</span>
          </label>

          <div
            onDragOver={handleDrag}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
            className={`flex w-full cursor-pointer flex-col items-center justify-center rounded-md border border-dashed py-6 transition-colors ${
              dragActive
                ? "border-[#ff0000] bg-[#1a0000]"
                : "border-[#3a3a3a] bg-[#0A0A0A]"
            }`}
          >
            <input
              ref={inputRef}
              type="file"
              accept="video/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files?.[0]) setFile(e.target.files[0]);
              }}
            />
            {file ? (
              <p className="text-sm text-white">{file.name}</p>
            ) : (
              <p className="text-center text-sm text-[#B0B0B0]">
                Current video will be kept
                <br />
                or{" "}
                <span className="cursor-pointer text-[#ff2b2b] hover:underline">
                  Browse to replace
                </span>
              </p>
            )}
          </div>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isSaving}
            className="flex-1 rounded-lg border border-gray-500 bg-transparent py-2.5 text-sm font-medium text-white transition hover:bg-gray-700 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onSave({ title, description, file })}
            disabled={isSaving}
            className="flex-1 rounded-lg bg-red-600 py-2.5 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

// ---------------- Main Component ----------------

const UploadedVideo = () => {
  const { data, isLoading, isError } = useGetUploadVideoQuery({
    page: 1,
    limit: 1000000,
  });
  const [DeleteUploadVideo] = useDeleteUploadVideoMutation();
  const [updateUploadVideo] = useUpdateUploadVideoMutation();
  const { data: signatureResponse } = useGetFileUploadSignatureQuery(
    "placementReq"
  );

  const [editingVideo, setEditingVideo] = useState<VideoItem | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  const raw = data?.data;
  const videos: VideoItem[] = Array.isArray(raw) ? raw : raw?.data ?? [];

  const uploadVideoToCloudinary = async (
    fileToUpload: File,
    signature: SignatureData
  ): Promise<CloudinaryUploadResponse> => {
    const { folder, timestamp, api_key, signature: sig, cloud_name } =
      signature;

    const formData = new FormData();
    formData.append("folder", folder);
    formData.append("timestamp", String(timestamp));
    formData.append("api_key", api_key);
    formData.append("signature", sig);
    formData.append("file", fileToUpload);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloud_name}/auto/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Cloudinary upload failed: ${errText}`);
    }

    return res.json();
  };

  const handleDelete = async (id: string) => {
    try {
      const res = (await DeleteUploadVideo(id).unwrap()) as any;
      if (res?.success === true) {
        Swal.fire({
          title: "Delete Videos",
          text: "Video has been deleted.",
          icon: "success",
        });
      }
    } catch (error) {
      console.error("Failed to delete video:", error);
      Swal.fire({
        title: "Error",
        text: "Something went wrong while deleting.",
        icon: "error",
      });
    }
  };

  const handleEditClick = (video: VideoItem) => {
    setEditingVideo(video);
  };

  const handleSaveEdit = async (payload: {
    title: string;
    description: string;
    file: File | null;
  }) => {
    if (!editingVideo) return;

    try {
      setIsSaving(true);

      let content = editingVideo.content;

      // If a new file was chosen, upload it to Cloudinary first
      if (payload.file) {
        if (!signatureResponse?.data) {
          throw new Error("Upload signature not ready yet, try again");
        }
        const cloudinaryResult = await uploadVideoToCloudinary(
          payload.file,
          signatureResponse.data as SignatureData
        );

        content = {
          resource_type: cloudinaryResult.resource_type,
          duration: cloudinaryResult.duration,
          bytes: cloudinaryResult.bytes,
          width: cloudinaryResult.width,
          height: cloudinaryResult.height,
          secure_url: cloudinaryResult.secure_url,
          public_id: cloudinaryResult.public_id,
        };
      }

      // 👇 FIX: mutation expects { id, data }, so wrap everything inside "data"
      const res = (await updateUploadVideo({
        id: editingVideo._id,
        data: {
          title: payload.title,
          description: payload.description,
          content,
        },
      }).unwrap()) as any;

      if (res?.success === true || res?.statusCode === 200) {
        Swal.fire({
          title: "Video Updated",
          text: "Video has been updated successfully.",
          icon: "success",
        });
        setEditingVideo(null);
      }
    } catch (error) {
      console.error("Failed to update video:", error);
      Swal.fire({
        title: "Error",
        text: "Something went wrong while updating.",
        icon: "error",
      });
    } finally {
      setIsSaving(false);
    }
  };

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
    <div className="relative w-full">
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
          <VideoCard
            key={video._id}
            video={video}
            onDelete={handleDelete}
            onEdit={handleEditClick}
          />
        ))}
      </div>

      {editingVideo && (
        <EditVideoModal
          video={editingVideo}
          onClose={() => setEditingVideo(null)}
          onSave={handleSaveEdit}
          isSaving={isSaving}
        />
      )}
    </div>
  );
};

export default UploadedVideo;
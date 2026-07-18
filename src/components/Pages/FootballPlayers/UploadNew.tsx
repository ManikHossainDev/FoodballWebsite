"use client"

import { useGetFileUploadSignatureQuery } from "@/redux/features/fileUpload/fileUpload";
import { useAddUploadVideoMutation } from "@/redux/features/player/UploadVideo";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";

interface CloudinaryUploadResponse {
  resource_type: string;
  duration: number;
  bytes: number;
  width: number;
  height: number;
  secure_url: string;
  public_id: string;
}

interface SignatureData {
  folder: string;
  timestamp: number;
  api_key: string;
  signature: string;
  cloud_name: string;
}

const UploadNew = () => {
  const { data: signatureResponse } = useGetFileUploadSignatureQuery('placementReq');
  const [AddUploadVideo] = useAddUploadVideoMutation();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string>("");
  const [error, setError] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const uploadVideoToCloudinary = async (
    fileToUpload: File,
    signature: SignatureData
  ): Promise<CloudinaryUploadResponse> => {
    const { folder, timestamp, api_key, signature: sig, cloud_name } = signature;

    const formData = new FormData();
    formData.append('folder', folder);
    formData.append('timestamp', String(timestamp));
    formData.append('api_key', api_key);
    formData.append('signature', sig);
    formData.append('file', fileToUpload);

    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/auto/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Cloudinary upload failed: ${errText}`);
    }

    return res.json();
  };

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

  const handleBrowseClick = () => {
    inputRef.current?.click();
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setFile(null);
    setUploadProgress("");
  };

  const handleSubmit = async () => {
    setError("");

    if (!title.trim()) {
      setError("Please enter a video title");
      return;
    }
    if (!description.trim()) {
      setError("Please enter a video Description");
      return;
    }
    if (!file) {
      setError("Please select a video file");
      return;
    }
    if (!signatureResponse?.data) {
      setError("Upload signature not ready yet, try again in a moment");
      return;
    }

    try {
      setIsUploading(true);

      // Step 1: upload the raw file to Cloudinary using the signed data
      setUploadProgress("Uploading video to Cloudinary...");
      const cloudinaryResult = await uploadVideoToCloudinary(
        file,
        signatureResponse.data as SignatureData
      );

      // Step 2: save the returned metadata to your backend
      setUploadProgress("Saving video info...");

      const payload = {
        title,
        description,
        content: {
          resource_type: cloudinaryResult.resource_type,
          duration: cloudinaryResult.duration,
          bytes: cloudinaryResult.bytes,
          width: cloudinaryResult.width,
          height: cloudinaryResult.height,
          secure_url: cloudinaryResult.secure_url,
          public_id: cloudinaryResult.public_id,
        },
      };

      // 🔍 Debug: check the Network tab too, confirm this payload
      // actually matches what's sent as the request body
      console.log("Submitting payload:", payload);

    const res = await AddUploadVideo(payload).unwrap();
    console.log(res);
    if(res?.statusCode === 201){
        setUploadProgress("Upload successful!");
        resetForm();
        router.push("/uploadedvideo");
    }

    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Upload failed, please try again");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <h2
        className="text-xm md:text-2xl font-bold text-white py-3"
        style={{
          textShadow:
            "0 0 10px #ff0000, 0 0 20px #ff0000, 0 0 30px #ff0000, 0 0 40px #ff0000",
        }}
      >
        Upload your videos
      </h2>
      <p className="text-[#8F8F8F] mb-2">
        Upload video to get more insight & reach
      </p>

      <div className="bg-black rounded-xl p-6 mt-4">
        <h3 className="text-white text-lg font-semibold mb-4">
          Video Information
        </h3>

        {/* Video Title */}
        <div className="mb-5">
          <label className="text-white text-sm font-medium block mb-2">
            Video Title :
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter video title"
            className="w-full bg-[#0A0A0A] border border-[#2A2A2A] rounded-md px-4 py-2.5 text-sm text-white placeholder-[#6b6b6b] focus:outline-none focus:border-[#ff0000] transition-colors"
          />
        </div>

        {/* Video Description */}
        <div className="mb-5">
          <label className="text-white text-sm font-medium block mb-2">
            Video Description: :
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter video description"
            rows={4}
            className="w-full bg-[#0A0A0A] border border-[#2A2A2A] rounded-md px-4 py-3 text-sm text-white placeholder-[#6b6b6b] resize-none focus:outline-none focus:border-[#ff0000] transition-colors"
          />
        </div>

        {/* Upload Video */}
        <div>
          <label className="text-white text-sm font-medium block mb-2">
            Upload Your Video{" "}
            <span className="text-[#8F8F8F] font-normal">
              (You Can upload one video)
            </span>
          </label>

          <div
            onDragOver={handleDrag}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            onClick={handleBrowseClick}
            className={`w-full border border-dashed rounded-md flex flex-col items-center justify-center py-8 cursor-pointer transition-colors ${
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
              <>
                <p className="text-sm text-[#B0B0B0] text-center">
                  Drop your video here
                  <br />
                  or{" "}
                  <span
                    className="text-[#ff2b2b] cursor-pointer hover:underline"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBrowseClick();
                    }}
                  >
                    Browse
                  </span>
                </p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 mt-3 text-[#8F8F8F]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 15a4 4 0 004 4h9a5 5 0 001.7-9.71A5.5 5.5 0 007.1 7.5 4.5 4.5 0 003 15z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 10v7m0-7l-3 3m3-3l3 3"
                  />
                </svg>
              </>
            )}
          </div>
        </div>

        {error && (
          <p className="text-[#ff4d4d] text-sm mt-3">{error}</p>
        )}
        {uploadProgress && !error && (
          <p className="text-[#8F8F8F] text-sm mt-3">{uploadProgress}</p>
        )}

        <button
          onClick={handleSubmit}
          disabled={isUploading}
          className="mt-5 w-full bg-[#ff0000] hover:bg-[#cc0000] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-md py-2.5 text-sm transition-colors"
        >
          {isUploading ? "Uploading..." : "Upload Video"}
        </button>
      </div>
    </div>
  );
};

export default UploadNew;
"use client"
import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { Star } from 'lucide-react';
import { FaRegMessage } from 'react-icons/fa6';
import { useSearchParams } from "next/navigation";
import { useAddAgentsMutation, useGetSingleAgentsQuery } from '@/redux/features/player/agents';
import { useGetFileUploadSignatureQuery } from '@/redux/features/fileUpload/fileUpload';

interface CloudinaryVideoContent {
  resource_type: string;
  duration: number;
  bytes: number;
  width: number;
  height: number;
  secure_url: string;
  public_id: string;
}

interface SignatureData {
  timestamp: number;
  signature: string;
  cloud_name: string;
  api_key: string;
  folder: string;
}

const uploadVideoToCloudinary = async (
  file: File,
  signature: SignatureData
): Promise<CloudinaryVideoContent> => {
  const { folder, timestamp, api_key, signature: sig, cloud_name } = signature;

  const formData = new FormData();
  formData.append('folder', folder);
  formData.append('timestamp', String(timestamp));
  formData.append('api_key', api_key);
  formData.append('signature', sig);
  formData.append('file', file);

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

const URGENCY_OPTIONS = [
  { label: 'Low', value: 'low' },
  { label: 'Medium', value: 'medium' },
  { label: 'High', value: 'high' },
  { label: 'Critical', value: 'critical' },
];

const Agentrequestinfo = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { data } = useGetSingleAgentsQuery(id ?? "");
  const agent = data?.data;

  const { data: signatureResponse } = useGetFileUploadSignatureQuery('placementReq');
  const [AddAgents, { isLoading: isSubmitting }] = useAddAgentsMutation();

  const videoInputRef = useRef<HTMLInputElement>(null);

  const [preferredLeagues, setPreferredLeagues] = useState('');
  const [preferredClub, setPreferredClub] = useState('');
  const [urgencyLevel, setUrgencyLevel] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [resumeLink, setResumeLink] = useState('');
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [isUploadingVideo, setIsUploadingVideo] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleVideoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setVideoFile(file);
  };

  const handleVideoDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) setVideoFile(file);
  };

  const handleSubmit = async () => {
    setError(null);

    if (!id) {
      setError('Missing agent id.');
      return;
    }
    if (!agreedTerms) {
      setError('Please agree to the Terms and Conditions.');
      return;
    }

    try {
      let content: CloudinaryVideoContent | undefined;

      if (videoFile) {
        if (!signatureResponse?.data) {
          setError('Upload signature not ready yet, please try again in a moment.');
          return;
        }
        setIsUploadingVideo(true);
        content = await uploadVideoToCloudinary(videoFile, signatureResponse.data);
        setIsUploadingVideo(false);
      }

      const payload = {
        agentId: id,
        additionalInfo,
        urgencyLevel,
        preferredLeagues,
        preferredClub,
        ...(content ? { content } : {}),
        ...(resumeLink ? { resume: resumeLink } : {}),
      };

      await AddAgents(payload).unwrap();

      // reset form on success
      setPreferredLeagues('');
      setPreferredClub('');
      setUrgencyLevel('');
      setAdditionalInfo('');
      setResumeLink('');
      setVideoFile(null);
      setAgreedTerms(false);
    } catch (err) {
      setIsUploadingVideo(false);
      setError(err instanceof Error ? err.message : 'Something went wrong while submitting your request.');
    }
  };

  const isBusy = isSubmitting || isUploadingVideo;

  return (
    <div className=" text-white">
      {/* Header */}
      <div className="bg-[#303030] px-6 py-4 lg:flex items-center justify-between rounded-lg mb-6">
        {/* Left Section - Profile Info */}
        <div className="flex items-center gap-4">
          {/* Profile Image */}
          <div className="relative w-24 h-24 rounded-lg overflow-hidden">
            <Image
              src={agent?.image}
              fill
              alt="David Martinez"
              className="object-fill"
            />
          </div>

          {/* Profile Details */}
          <div className="flex flex-col gap-1">
            <h2 className="text-white font-semibold text-lg">{agent?.name}</h2>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-white font-medium">{agent?.avgRating}</span>
              </div>
              <span className="text-gray-400 text-sm">({agent?.totalRating} reviews)</span>
            </div>

            {/* Experience Badge */}
            <button className="bg-red-500 hover:bg-red-600 text-white text-xs font-medium px-3 py-1 rounded w-fit transition-colors">
              {agent?.profile?.experiences?.slice(0, 25)}
              {agent?.profile?.experiences &&
                agent.profile.experiences.length > 25 &&
                ".."}
            </button>
          </div>
        </div>

        {/* Right Section - Action Button */}
        <div>
          <div className='flex space-x-2 py-2 justify-end'>
            {/* Favorite Button */}
            <button className="w-10 h-10 bg-red-500 hover:bg-red-600 rounded flex items-center justify-center transition-colors">
              <FaRegMessage className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Personal Information section */}
      <div className="bg-[#303030] rounded-lg p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Carrier Information */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg mb-4">Carrier Information</h3>

            <div>
              <label className="text-white text-sm mb-2 block">
                Preferred Leagues<span className="text-gray-500 text-xs">(optional)</span>
              </label>
              <input
                type="text"
                value={preferredLeagues}
                onChange={(e) => setPreferredLeagues(e.target.value)}
                placeholder="Premier League"
                className="w-full bg-[#303030] border text-gray-400 rounded px-4 py-2.5 outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div>
              <label className="text-white text-sm mb-2 block">
                Preferred Clubs<span className="text-gray-500 text-xs">(optional)</span>
              </label>
              <input
                type="text"
                value={preferredClub}
                onChange={(e) => setPreferredClub(e.target.value)}
                placeholder="Real Madrid"
                className="w-full bg-[#303030] border text-gray-400 rounded px-4 py-2.5 outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>

          {/* Feedback Preferences */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg mb-4">Feedback Preferences</h3>

            <div>
              <label className="text-white text-sm mb-2 block">
                Urgency Level
              </label>
              <select
                value={urgencyLevel}
                onChange={(e) => setUrgencyLevel(e.target.value)}
                className="w-full bg-[#303030] border text-gray-400 rounded px-4 py-2.5 outline-none focus:ring-2 focus:ring-red-500 appearance-none"
              >
                <option value="">How urgent is your request?</option>
                {URGENCY_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-white text-sm mb-2 block">
                Additional Information
              </label>
              <textarea
                value={additionalInfo}
                onChange={(e) => setAdditionalInfo(e.target.value)}
                placeholder="What are your short-term and long-term career objectives?"
                rows={4}
                className="w-full bg-[#303030] border text-gray-400 rounded px-4 py-2.5 outline-none focus:ring-2 focus:ring-red-500 resize-none"
              />
            </div>

            {/* Resume: plain link input, not a file upload */}
            <div>
              <label className="text-white text-sm mb-2 block">
                Resume Link <span className="text-gray-500 text-xs">(Optional)</span>
              </label>
              <input
                type="url"
                value={resumeLink}
                onChange={(e) => setResumeLink(e.target.value)}
                placeholder="Paste a link to your resume"
                className="w-full bg-[#303030] border text-gray-400 rounded px-4 py-2.5 outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            {/* Video: real Cloudinary file upload */}
            <div>
              <label className="text-white text-sm mb-2 block">
                Upload Highlight Video <span className="text-gray-500 text-xs">(Optional)</span>
              </label>
              <input
                ref={videoInputRef}
                type="file"
                accept="video/*"
                onChange={handleVideoSelect}
                className="hidden"
              />
              <div
                onClick={() => videoInputRef.current?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleVideoDrop}
                className="w-full bg-[#303030] border rounded px-4 py-8 text-center cursor-pointer hover:bg-[#252525] transition-colors"
              >
                <div className="flex flex-col items-center gap-2">
                  <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p className="text-gray-400 text-sm">
                    {videoFile ? (
                      <span className="text-white">{videoFile.name}</span>
                    ) : (
                      <>
                        Drop your video here<br />
                        or <span className="text-red-500">Browse</span>
                      </>
                    )}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="terms"
                checked={agreedTerms}
                onChange={(e) => setAgreedTerms(e.target.checked)}
                className="w-4 h-4 rounded border-gray-600 text-red-500 focus:ring-red-500"
              />
              <label htmlFor="terms" className="text-gray-400 text-sm">
                I agree to the <span className="text-red-500">Terms</span> and <span className="text-red-500">Conditions</span>.
              </label>
            </div>
          </div>
        </div>

        {error && (
          <p className="mt-4 text-center text-red-500 text-sm">{error}</p>
        )}

        {/* Terms and Submit */}
        <div className="mt-6 space-y-4 flex justify-center">
          <button
            onClick={handleSubmit}
            disabled={isBusy}
            className="px-5 md:px-10 bg-red-500 hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded transition-colors"
          >
            {isUploadingVideo ? 'Uploading video...' : isSubmitting ? 'Submitting...' : 'Place Request'}
          </button>
        </div>
      </div>

    </div>
  );
};

export default Agentrequestinfo;
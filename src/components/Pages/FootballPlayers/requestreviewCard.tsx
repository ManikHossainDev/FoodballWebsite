"use client"
import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { Star, Upload, X, Loader2 } from 'lucide-react';
// import user from '@/assets/Authentication/user.jpg';
import { FaRegMessage } from 'react-icons/fa6';
import { usePathname } from 'next/navigation';
import { useGetFileUploadSignatureQuery } from '@/redux/features/fileUpload/fileUpload';
import { useAddVideoRequestsMutation, useGetSingleCoachesQuery } from '@/redux/features/player/hireCoachs';
import { useGetProfileQuery } from '@/redux/features/Profile/Profile';
import Swal from 'sweetalert2';

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

type ModalState = 'insufficient' | 'confirm' | null;
const MAX_VIDEO_DURATION_SECONDS = 30;

const RequestReviewCard = () => {
  const pathname = usePathname();
  const coachId = pathname.split('/')[2];
  const { data: userData } = useGetProfileQuery({});
  const walletBalance = userData?.data?.walletBalance ?? 0;

  const { data } = useGetSingleCoachesQuery(coachId);
  const videoReviewFee = data?.data?.profile?.videoReviewFee ?? 0;
  const profile = data?.data;
  console.log(profile);

  // Step 1: signature data (folder, timestamp, api_key, signature, cloud_name)
  const { data: signatureResponse } = useGetFileUploadSignatureQuery('placementReq');
  const [addVideoRequest] = useAddVideoRequestsMutation();

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [fileError, setFileError] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const [activeModal, setActiveModal] = useState<ModalState>(null);

  // User-entered video title & description (typed in, not dummy/hardcoded data)
  const [videoTitle, setVideoTitle] = useState('');
  const [videoDescription, setVideoDescription] = useState('');
  const [titleError, setTitleError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');

  const [areasToFocus, setAreasToFocus] = useState(
    'Focus on my shooting accuracy and positioning during breakaways.'
  );
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const validateVideoDuration = (file: File): Promise<true> => {
    return new Promise((resolve, reject) => {
      const video = document.createElement('video');
      video.preload = 'metadata';

      video.onloadedmetadata = () => {
        URL.revokeObjectURL(video.src);
        if (video.duration > MAX_VIDEO_DURATION_SECONDS) {
          reject(new Error(`Video must be less than ${MAX_VIDEO_DURATION_SECONDS} seconds`));
        } else {
          resolve(true);
        }
      };

      video.onerror = () => reject(new Error('Invalid video file'));
      video.src = URL.createObjectURL(file);
    });
  };

  const handleFileSelected = async (file: File | undefined | null) => {
    setFileError('');
    if (!file) return;

    if (!file.type.startsWith('video/')) {
      setFileError('Please upload a valid video file');
      return;
    }

    try {
      await validateVideoDuration(file);
      setSelectedFile(file);
    } catch (err) {
      setFileError(err instanceof Error ? err.message : 'Invalid video file');
      setSelectedFile(null);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileSelected(e.target.files?.[0]);
    e.target.value = '';
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelected(e.dataTransfer.files?.[0]);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setFileError('');
  };

  const uploadVideoToCloudinary = async (
    file: File,
    signature: SignatureData
  ): Promise<CloudinaryUploadResponse> => {
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

  const handleVideoRequestSubmit = async () => {
    setSubmitError('');

    if (!selectedFile) {
      setSubmitError('Please select a video to upload');
      return;
    }
    if (!agreeToTerms) {
      setSubmitError('Please agree to the Terms and Conditions');
      return;
    }
    if (!signatureResponse?.data) {
      setSubmitError('Upload is not ready yet, please try again in a moment');
      return;
    }

    setSubmitting(true);
    try {
      const cloudinaryData = await uploadVideoToCloudinary(selectedFile, signatureResponse.data);

      const payload = {
        coach: coachId,
        title: videoTitle,
        description: videoDescription,
        content: {
          resource_type: cloudinaryData.resource_type,
          duration: cloudinaryData.duration,
          bytes: cloudinaryData.bytes,
          width: cloudinaryData.width,
          height: cloudinaryData.height,
          secure_url: cloudinaryData.secure_url,
          public_id: cloudinaryData.public_id,
        },
        areaOfFocus: areasToFocus || '-',
      };

    const res =  await addVideoRequest(payload).unwrap();
    console.log(res)
      if(res?.success === true){
         setActiveModal(null);
         Swal.fire({
          title: "video Requests",
          text: "send video requests successful",
          icon: "success"
        });
      }
    } catch (err) {
      setSubmitError(
        typeof err === 'string' ? err : (err as Error)?.message || 'Something went wrong'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleNextClick = () => {
    setSubmitError('');
    setTitleError('');
    setDescriptionError('');

    let hasError = false;

    if (!videoTitle.trim()) {
      setTitleError('Please enter a video title');
      hasError = true;
    }
    if (!videoDescription.trim()) {
      setDescriptionError('Please enter a video description');
      hasError = true;
    }
    if (!selectedFile) {
      setFileError('Please upload a video before continuing');
      hasError = true;
    }
    if (!agreeToTerms) {
      setSubmitError('Please agree to the Terms and Conditions before continuing');
      hasError = true;
    }

    if (hasError) return;

    // If wallet balance is less than the coach's video review fee -> insufficient balance modal
    // If wallet balance is greater than or equal to the fee -> confirm modal, submit runs from there
    if (walletBalance < videoReviewFee) {
      setActiveModal('insufficient');
    } else {
      setActiveModal('confirm');
    }
  };

  const handleCloseModal = () => {
    if (submitting) return;
    setActiveModal(null);
  };

  const handleGoToWallet = () => {
    setActiveModal(null);
    // TODO: navigate to the wallet / recharge page, e.g. router.push('/wallet')
  };

  const amountNeeded = Math.max(videoReviewFee - walletBalance, 0);

  return (
    <div className="text-white">
      {/* Profile Card */}
      <div className="relative bg-[#262626] px-5 py-4 rounded-lg mb-6">
        <button className="absolute top-4 right-4 w-8 h-8 bg-red-500 hover:bg-red-600 rounded flex items-center justify-center transition-colors">
          <FaRegMessage className="w-4 h-4 text-white" />
        </button>

        <div className="flex items-center gap-4">
          <div className="relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0">
            <Image src={profile ? profile?.image : ""} fill alt="David Martinez" className="object-cover" />
          </div>

          <div className="flex flex-col gap-1">
            <h3 className="text-white font-semibold">{profile?.name}</h3>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-white text-sm font-medium">{profile?.avgRating}</span>
              </div>
              <span className="text-white text-xs">({profile?.totalRating} reviews)</span>
            </div>

            <span className="bg-red-500 text-white text-xs font-medium px-2.5 py-1 rounded w-fit">
              {profile?.profile?.coachExperiences}
            </span>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="bg-[#1f1f1f] rounded-lg p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Video Information</h3>

            <div>
              <label className="block text-sm font-medium mb-2">Video Title :</label>
              <input
                type="text"
                name="videoTitle"
                value={videoTitle}
                onChange={(e) => setVideoTitle(e.target.value)}
                placeholder="Enter a title for your video"
                className="w-full bg-[#2a2a2a] border border-gray-700 rounded px-4 py-2.5 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-red-500 transition-colors"
              />
              {titleError && <p className="text-red-500 text-xs mt-2">{titleError}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Video Description :</label>
              <textarea
                name="videoDescription"
                value={videoDescription}
                onChange={(e) => setVideoDescription(e.target.value)}
                rows={4}
                placeholder="Describe what you'd like feedback on"
                className="w-full bg-[#2a2a2a] border border-gray-700 rounded px-4 py-3 text-white placeholder-gray-500 text-sm leading-relaxed focus:outline-none focus:border-red-500 transition-colors resize-none min-h-[88px]"
              />
              {descriptionError && <p className="text-red-500 text-xs mt-2">{descriptionError}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium">
                Upload Your Video{' '}
                <span className="text-gray-500 text-xs font-normal">(You can upload one video)</span>
              </label>

              <input
                ref={fileInputRef}
                type="file"
                accept="video/*"
                className="hidden"
                onChange={handleFileInputChange}
              />

              {selectedFile ? (
                <div className="flex items-center justify-between bg-[#2a2a2a] border border-gray-700 rounded-lg px-4 py-3 mt-3">
                  <span className="text-sm text-gray-300 truncate pr-3">{selectedFile.name}</span>
                  <button
                    type="button"
                    onClick={handleRemoveFile}
                    className="text-gray-400 hover:text-red-500 transition-colors flex-shrink-0"
                    aria-label="Remove video"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-lg py-6 text-center transition-colors cursor-pointer mt-3 ${
                    isDragging ? 'border-red-500 bg-red-500/5' : 'border-gray-700 hover:border-red-500'
                  }`}
                >
                  <p className="text-gray-400 text-sm">
                    Drop your video here
                    <br />
                    or <span className="text-red-500">Browse</span>
                  </p>
                  <Upload className="w-5 h-5 text-gray-500 mx-auto mt-3" />
                </div>
              )}

              {fileError && <p className="text-red-500 text-xs mt-2">{fileError}</p>}
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Feedback Preferences</h3>

            <div>
              <label className="block text-sm font-medium mb-2">Areas to Focus on :</label>
              <textarea
                name="areasToFocus"
                value={areasToFocus}
                onChange={(e) => setAreasToFocus(e.target.value)}
                rows={4}
                className="w-full bg-[#2a2a2a] border border-gray-700 rounded px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-red-500 transition-colors resize-none"
              />
            </div>

            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
                className="mt-1 w-4 h-4 bg-[#2a2a2a] border border-gray-700 rounded focus:ring-2 focus:ring-red-500"
              />
              <label className="text-sm text-gray-300 mt-1">
                I agree to the <span className="text-red-500 cursor-pointer hover:underline">Terms</span> and{' '}
                <span className="text-red-500 cursor-pointer hover:underline">Conditions</span>.
              </label>
            </div>
          </div>
        </div>

        {submitError && <p className="text-red-500 text-sm text-center mt-6">{submitError}</p>}

        <div className="flex justify-center mt-10">
          <button
            onClick={handleNextClick}
            disabled={submitting}
            className="bg-red-500 hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold px-16 py-2.5 rounded transition-colors"
          >
            Next
          </button>
        </div>
      </div>

      {/* Insufficient Wallet Balance Modal */}
      {activeModal === 'insufficient' && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-[#262626] border border-[#3a3a3a] rounded-lg w-full max-w-md p-6 shadow-2xl">
            <h2
              className="text-xl md:text-2xl text-center font-bold text-white pb-3"
              style={{
                textShadow: '0 0 10px #ff0000, 0 0 20px #ff0000, 0 0 30px #ff0000, 0 0 40px #ff0000',
              }}
            >
              Request Video Review
            </h2>

            <p className="text-white font-semibold mb-2">Insufficient Wallet Balance</p>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              You don&apos;t have enough balance in your wallet to Request Video Review. This review costs{' '}
              <span className="text-white font-semibold">${videoReviewFee}</span>, and you need{' '}
              <span className="text-white font-semibold">${amountNeeded}</span> more. Please recharge your wallet
              and try again to continue.
            </p>

            <div className="flex gap-3">
              <button
                onClick={handleCloseModal}
                className="flex-1 border border-gray-600 text-white rounded py-2.5 text-sm hover:bg-[#2f2f2f] transition-colors"
              >
                Cancel and go back
              </button>
              <button
                onClick={handleGoToWallet}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white rounded py-2.5 text-sm font-medium transition-colors"
              >
                Okay
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Fee Modal */}
      {activeModal === 'confirm' && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-[#262626] border border-[#3a3a3a] rounded-lg w-full max-w-md p-6 shadow-2xl">
            <h3
              className="text-center text-red-500 font-semibold text-lg mb-5"
              style={{ textShadow: '0 0 14px rgba(239,68,68,0.55)' }}
            >
              Request Video Review
            </h3>

            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              This video review request will incur a <span className="text-white font-semibold">${videoReviewFee}</span> fee.
              The amount will be automatically deducted from your wallet once the coach completes and submits the
              video review.
            </p>

            {submitError && <p className="text-red-500 text-sm mb-4">{submitError}</p>}

            <div className="flex gap-3">
              <button
                onClick={handleCloseModal}
                disabled={submitting}
                className="flex-1 border border-red-500 text-red-400 rounded py-2.5 text-sm hover:bg-red-500/10 disabled:opacity-50 transition-colors"
              >
                Cancel and go back
              </button>
              <button
                onClick={handleVideoRequestSubmit}
                disabled={submitting}
                className="flex-1 bg-red-500 hover:bg-red-600 disabled:opacity-70 text-white rounded py-2.5 text-sm font-medium transition-colors flex items-center justify-center gap-2"
              >
                {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                {submitting ? 'Uploading…' : 'Okay'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestReviewCard;

// "use client"
// import React, { useRef, useState } from 'react';
// import Image from 'next/image';
// import { Star, Upload, X, Loader2 } from 'lucide-react';
// // import user from '@/assets/Authentication/user.jpg';
// import { FaRegMessage } from 'react-icons/fa6';
// import { usePathname } from 'next/navigation';
// import { useGetFileUploadSignatureQuery } from '@/redux/features/fileUpload/fileUpload';
// import { useAddVideoRequestsMutation, useGetSingleCoachesQuery } from '@/redux/features/player/hireCoachs';
// import { useGetProfileQuery } from '@/redux/features/Profile/Profile';

// interface CloudinaryUploadResponse {
//   resource_type: string;
//   duration: number;
//   bytes: number;
//   width: number;
//   height: number;
//   secure_url: string;
//   public_id: string;
// }

// interface SignatureData {
//   folder: string;
//   timestamp: number;
//   api_key: string;
//   signature: string;
//   cloud_name: string;
// }

// type ModalState = 'insufficient' | 'confirm' | null;
// const MAX_VIDEO_DURATION_SECONDS = 30;

// const RequestReviewCard = () => {
//   const pathname = usePathname();
//   const coachId = pathname.split('/')[2];
//   const { data: userData } = useGetProfileQuery({});
//   const walletBalance = userData?.data?.walletBalance ?? 0;

//   const { data } = useGetSingleCoachesQuery(coachId);
//   const videoReviewFee = data?.data?.profile?.videoReviewFee ?? 0;
//   const profile = data?.data;
//   console.log(profile);

//   // Step 1: signature data (folder, timestamp, api_key, signature, cloud_name)
//   const { data: signatureResponse } = useGetFileUploadSignatureQuery('placementReq');
//   const [addVideoRequest] = useAddVideoRequestsMutation();

//   const fileInputRef = useRef<HTMLInputElement | null>(null);

//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [isDragging, setIsDragging] = useState(false);
//   const [fileError, setFileError] = useState('');

//   const [submitting, setSubmitting] = useState(false);
//   const [submitError, setSubmitError] = useState('');

//   const [activeModal, setActiveModal] = useState<ModalState>(null);

//   // This would normally come from the video the user selected on the previous step
//   const selectedVideo = {
//     title: 'Shooting Practice – Match Simulation',
//     description:
//       'This video shows me practicing my shooting under pressure in match situations. I would like feedback on my accuracy and positioning.',
//   };

//   const [areasToFocus, setAreasToFocus] = useState(
//     'Focus on my shooting accuracy and positioning during breakaways.'
//   );
//   const [agreeToTerms, setAgreeToTerms] = useState(false);

//   const validateVideoDuration = (file: File): Promise<true> => {
//     return new Promise((resolve, reject) => {
//       const video = document.createElement('video');
//       video.preload = 'metadata';

//       video.onloadedmetadata = () => {
//         URL.revokeObjectURL(video.src);
//         if (video.duration > MAX_VIDEO_DURATION_SECONDS) {
//           reject(new Error(`Video must be less than ${MAX_VIDEO_DURATION_SECONDS} seconds`));
//         } else {
//           resolve(true);
//         }
//       };

//       video.onerror = () => reject(new Error('Invalid video file'));
//       video.src = URL.createObjectURL(file);
//     });
//   };

//   const handleFileSelected = async (file: File | undefined | null) => {
//     setFileError('');
//     if (!file) return;

//     if (!file.type.startsWith('video/')) {
//       setFileError('Please upload a valid video file');
//       return;
//     }

//     try {
//       await validateVideoDuration(file);
//       setSelectedFile(file);
//     } catch (err) {
//       setFileError(err instanceof Error ? err.message : 'Invalid video file');
//       setSelectedFile(null);
//     }
//   };

//   const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     handleFileSelected(e.target.files?.[0]);
//     e.target.value = '';
//   };

//   const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     setIsDragging(false);
//     handleFileSelected(e.dataTransfer.files?.[0]);
//   };

//   const handleRemoveFile = () => {
//     setSelectedFile(null);
//     setFileError('');
//   };

//   const uploadVideoToCloudinary = async (
//     file: File,
//     signature: SignatureData
//   ): Promise<CloudinaryUploadResponse> => {
//     const { folder, timestamp, api_key, signature: sig, cloud_name } = signature;

//     const formData = new FormData();
//     formData.append('folder', folder);
//     formData.append('timestamp', String(timestamp));
//     formData.append('api_key', api_key);
//     formData.append('signature', sig);
//     formData.append('file', file);

//     const res = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/auto/upload`, {
//       method: 'POST',
//       body: formData,
//     });

//     if (!res.ok) {
//       const errText = await res.text();
//       throw new Error(`Cloudinary upload failed: ${errText}`);
//     }

//     return res.json();
//   };

//   const handleVideoRequestSubmit = async () => {
//     setSubmitError('');

//     if (!selectedFile) {
//       setSubmitError('Please select a video to upload');
//       return;
//     }
//     if (!agreeToTerms) {
//       setSubmitError('Please agree to the Terms and Conditions');
//       return;
//     }
//     if (!signatureResponse?.data) {
//       setSubmitError('Upload is not ready yet, please try again in a moment');
//       return;
//     }

//     setSubmitting(true);
//     try {
//       const cloudinaryData = await uploadVideoToCloudinary(selectedFile, signatureResponse.data);

//       const payload = {
//         coach: coachId,
//         title: selectedVideo.title,
//         description: selectedVideo.description,
//         content: {
//           resource_type: cloudinaryData.resource_type,
//           duration: cloudinaryData.duration,
//           bytes: cloudinaryData.bytes,
//           width: cloudinaryData.width,
//           height: cloudinaryData.height,
//           secure_url: cloudinaryData.secure_url,
//           public_id: cloudinaryData.public_id,
//         },
//         areaOfFocus: areasToFocus || '-',
//       };

//       await addVideoRequest(payload).unwrap();
//       setActiveModal(null);
//     } catch (err) {
//       setSubmitError(
//         typeof err === 'string' ? err : (err as Error)?.message || 'Something went wrong'
//       );
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const handleNextClick = () => {
//     setSubmitError('');

//     if (!selectedFile) {
//       setFileError('Please upload a video before continuing');
//       return;
//     }
//     if (!agreeToTerms) {
//       setSubmitError('Please agree to the Terms and Conditions before continuing');
//       return;
//     }

//     // If wallet balance is less than the coach's video review fee -> insufficient balance modal
//     // If wallet balance is greater than or equal to the fee -> confirm modal, submit runs from there
//     if (walletBalance < videoReviewFee) {
//       setActiveModal('insufficient');
//     } else {
//       setActiveModal('confirm');
//     }
//   };

//   const handleCloseModal = () => {
//     if (submitting) return;
//     setActiveModal(null);
//   };

//   const handleGoToWallet = () => {
//     setActiveModal(null);
//     // TODO: navigate to the wallet / recharge page, e.g. router.push('/wallet')
//   };

//   const amountNeeded = Math.max(videoReviewFee - walletBalance, 0);

//   return (
//     <div className="text-white">
//       {/* Profile Card */}
//       <div className="relative bg-[#262626] px-5 py-4 rounded-lg mb-6">
//         <button className="absolute top-4 right-4 w-8 h-8 bg-red-500 hover:bg-red-600 rounded flex items-center justify-center transition-colors">
//           <FaRegMessage className="w-4 h-4 text-white" />
//         </button>

//         <div className="flex items-center gap-4">
//           <div className="relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0">
//             <Image src={profile ? profile?.image : ""} fill alt="David Martinez" className="object-cover" />
//           </div>

//           <div className="flex flex-col gap-1">
//             <h3 className="text-white font-semibold">{profile?.name}</h3>

//             <div className="flex items-center gap-2">
//               <div className="flex items-center gap-1">
//                 <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
//                 <span className="text-white text-sm font-medium">{profile?.avgRating}</span>
//               </div>
//               <span className="text-white text-xs">({profile?.totalRating} reviews)</span>
//             </div>

//             <span className="bg-red-500 text-white text-xs font-medium px-2.5 py-1 rounded w-fit">
//               {profile?.profile?.coachExperiences}
//             </span>
//           </div>
//         </div>
//       </div>

//       {/* Form Section */}
//       <div className="bg-[#1f1f1f] rounded-lg p-6">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
//           <div className="space-y-6">
//             <h3 className="text-lg font-semibold">Video Information</h3>

//             <div>
//               <label className="block text-sm font-medium mb-2">Video Title :</label>
//               <div className="w-full bg-[#2a2a2a] border border-gray-700 rounded px-4 py-2.5 text-gray-400 text-sm">
//                 {selectedVideo.title}
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium mb-2">Video Description :</label>
//               <div className="w-full bg-[#2a2a2a] border border-gray-700 rounded px-4 py-3 text-gray-400 text-sm leading-relaxed min-h-[88px]">
//                 {selectedVideo.description}
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium">
//                 Upload Your Video{' '}
//                 <span className="text-gray-500 text-xs font-normal">(You can upload one video)</span>
//               </label>

//               <input
//                 ref={fileInputRef}
//                 type="file"
//                 accept="video/*"
//                 className="hidden"
//                 onChange={handleFileInputChange}
//               />

//               {selectedFile ? (
//                 <div className="flex items-center justify-between bg-[#2a2a2a] border border-gray-700 rounded-lg px-4 py-3 mt-3">
//                   <span className="text-sm text-gray-300 truncate pr-3">{selectedFile.name}</span>
//                   <button
//                     type="button"
//                     onClick={handleRemoveFile}
//                     className="text-gray-400 hover:text-red-500 transition-colors flex-shrink-0"
//                     aria-label="Remove video"
//                   >
//                     <X className="w-4 h-4" />
//                   </button>
//                 </div>
//               ) : (
//                 <div
//                   onClick={() => fileInputRef.current?.click()}
//                   onDragOver={(e) => {
//                     e.preventDefault();
//                     setIsDragging(true);
//                   }}
//                   onDragLeave={() => setIsDragging(false)}
//                   onDrop={handleDrop}
//                   className={`border-2 border-dashed rounded-lg py-6 text-center transition-colors cursor-pointer mt-3 ${
//                     isDragging ? 'border-red-500 bg-red-500/5' : 'border-gray-700 hover:border-red-500'
//                   }`}
//                 >
//                   <p className="text-gray-400 text-sm">
//                     Drop your video here
//                     <br />
//                     or <span className="text-red-500">Browse</span>
//                   </p>
//                   <Upload className="w-5 h-5 text-gray-500 mx-auto mt-3" />
//                 </div>
//               )}

//               {fileError && <p className="text-red-500 text-xs mt-2">{fileError}</p>}
//             </div>
//           </div>

//           <div className="space-y-6">
//             <h3 className="text-lg font-semibold">Feedback Preferences</h3>

//             <div>
//               <label className="block text-sm font-medium mb-2">Areas to Focus on :</label>
//               <textarea
//                 name="areasToFocus"
//                 value={areasToFocus}
//                 onChange={(e) => setAreasToFocus(e.target.value)}
//                 rows={4}
//                 className="w-full bg-[#2a2a2a] border border-gray-700 rounded px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-red-500 transition-colors resize-none"
//               />
//             </div>

//             <div className="flex items-start gap-2">
//               <input
//                 type="checkbox"
//                 name="agreeToTerms"
//                 checked={agreeToTerms}
//                 onChange={(e) => setAgreeToTerms(e.target.checked)}
//                 className="mt-1 w-4 h-4 bg-[#2a2a2a] border border-gray-700 rounded focus:ring-2 focus:ring-red-500"
//               />
//               <label className="text-sm text-gray-300 mt-1">
//                 I agree to the <span className="text-red-500 cursor-pointer hover:underline">Terms</span> and{' '}
//                 <span className="text-red-500 cursor-pointer hover:underline">Conditions</span>.
//               </label>
//             </div>
//           </div>
//         </div>

//         {submitError && <p className="text-red-500 text-sm text-center mt-6">{submitError}</p>}

//         <div className="flex justify-center mt-10">
//           <button
//             onClick={handleNextClick}
//             disabled={submitting}
//             className="bg-red-500 hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold px-16 py-2.5 rounded transition-colors"
//           >
//             Next
//           </button>
//         </div>
//       </div>

//       {/* Insufficient Wallet Balance Modal */}
//       {activeModal === 'insufficient' && (
//         <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
//           <div className="bg-[#262626] border border-[#3a3a3a] rounded-lg w-full max-w-md p-6 shadow-2xl">
//             <h2
//               className="text-xl md:text-2xl text-center font-bold text-white pb-3"
//               style={{
//                 textShadow: '0 0 10px #ff0000, 0 0 20px #ff0000, 0 0 30px #ff0000, 0 0 40px #ff0000',
//               }}
//             >
//               Request Video Review
//             </h2>

//             <p className="text-white font-semibold mb-2">Insufficient Wallet Balance</p>
//             <p className="text-gray-300 text-sm leading-relaxed mb-6">
//               You don&apos;t have enough balance in your wallet to Request Video Review. This review costs{' '}
//               <span className="text-white font-semibold">${videoReviewFee}</span>, and you need{' '}
//               <span className="text-white font-semibold">${amountNeeded}</span> more. Please recharge your wallet
//               and try again to continue.
//             </p>

//             <div className="flex gap-3">
//               <button
//                 onClick={handleCloseModal}
//                 className="flex-1 border border-gray-600 text-white rounded py-2.5 text-sm hover:bg-[#2f2f2f] transition-colors"
//               >
//                 Cancel and go back
//               </button>
//               <button
//                 onClick={handleGoToWallet}
//                 className="flex-1 bg-red-500 hover:bg-red-600 text-white rounded py-2.5 text-sm font-medium transition-colors"
//               >
//                 Okay
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Confirm Fee Modal */}
//       {activeModal === 'confirm' && (
//         <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
//           <div className="bg-[#262626] border border-[#3a3a3a] rounded-lg w-full max-w-md p-6 shadow-2xl">
//             <h3
//               className="text-center text-red-500 font-semibold text-lg mb-5"
//               style={{ textShadow: '0 0 14px rgba(239,68,68,0.55)' }}
//             >
//               Request Video Review
//             </h3>

//             <p className="text-gray-300 text-sm leading-relaxed mb-6">
//               This video review request will incur a <span className="text-white font-semibold">${videoReviewFee}</span> fee.
//               The amount will be automatically deducted from your wallet once the coach completes and submits the
//               video review.
//             </p>

//             {submitError && <p className="text-red-500 text-sm mb-4">{submitError}</p>}

//             <div className="flex gap-3">
//               <button
//                 onClick={handleCloseModal}
//                 disabled={submitting}
//                 className="flex-1 border border-red-500 text-red-400 rounded py-2.5 text-sm hover:bg-red-500/10 disabled:opacity-50 transition-colors"
//               >
//                 Cancel and go back
//               </button>
//               <button
//                 onClick={handleVideoRequestSubmit}
//                 disabled={submitting}
//                 className="flex-1 bg-red-500 hover:bg-red-600 disabled:opacity-70 text-white rounded py-2.5 text-sm font-medium transition-colors flex items-center justify-center gap-2"
//               >
//                 {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
//                 {submitting ? 'Uploading…' : 'Okay'}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default RequestReviewCard;
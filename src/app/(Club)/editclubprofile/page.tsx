/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import defaultUser from "@/assets/Authentication/user.jpg";
import { Camera } from "lucide-react";
import { getFromCookies } from "@/utils/cookies-storage";
import {
  useGetUserProfileQuery,
  useUpdateProfileImageMutation,
  useUpdateProfileMutation,
} from "@/redux/features/Profile/Profile";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

interface FormData {
  name: string;
  email: string;
  phone: string;
  about: string;
  location: string;
  clubOverview: string;
  playersResponded: string;
  successTransfers: string;
  facebook: string;
  instagram: string;
  linkedin: string;
  x: string;
  isAvailable: boolean;
}

const emptyForm: FormData = {
  name: "",
  email: "",
  phone: "",
  about: "",
  location: "",
  clubOverview: "",
  playersResponded: "",
  successTransfers: "",
  facebook: "",
  instagram: "",
  linkedin: "",
  x: "",
  isAvailable: true,
};

const Page = () => {
  const userCookie = getFromCookies("user");
  const currentUser = userCookie ? JSON.parse(userCookie) : null;
  const id = currentUser?._id || currentUser?.id;

  const { data, isLoading: isProfileLoading } = useGetUserProfileQuery(id, {
    skip: !id,
  });
  const [updateProfileImage, { isLoading: isImageUploading }] =
    useUpdateProfileImageMutation();
  const [updateProfile, { isLoading: isSaving }] = useUpdateProfileMutation();
  const router = useRouter();
  const profile = data?.data;
  const [formData, setFormData] = useState<FormData>(emptyForm);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  // Populate local editable state once the API data arrives
  useEffect(() => {
    if (!profile) return;
    setFormData({
      name: profile.name ?? "",
      email: profile.email ?? "",
      phone: profile.phone ?? "",
      about: profile.profile?.about ?? "",
      // Backend returns location as a plain address string (e.g. "Sylhet, Bangladesh")
      location: profile.profile?.location ?? "",
      clubOverview: profile.profile?.clubOverview ?? "",
      playersResponded:
        profile.profile?.playersResponded?.toString() ?? "",
      successTransfers:
        profile.profile?.successTransfers?.toString() ?? "",
      facebook: profile.profile?.socialMedia?.facebook ?? "",
      instagram: profile.profile?.socialMedia?.instagram ?? "",
      linkedin: profile.profile?.socialMedia?.linkedin ?? "",
      x: profile.profile?.socialMedia?.x ?? "",
      isAvailable: profile.profile?.isAvailable ?? true,
    });
  }, [profile]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageError(null);

    const localUrl = URL.createObjectURL(file);
    setPreviewImage(localUrl);

    try {
      const body = new FormData();
      body.append("image", file);
      await updateProfileImage(body).unwrap();
    } catch (err) {
      console.error("Failed to update profile image:", err);
      setImageError("Failed to update image. Please try again.");
      setPreviewImage(null);
    } finally {
      e.target.value = "";
    }
  };

  const handleSave = async () => {
    setSaveError(null);
    setSaveSuccess(false);

    // Only send social links that have actual content
    const socialMedia: Record<string, string> = {};
    if (formData.facebook.trim()) socialMedia.facebook = formData.facebook.trim();
    if (formData.instagram.trim()) socialMedia.instagram = formData.instagram.trim();
    if (formData.linkedin.trim()) socialMedia.linkedin = formData.linkedin.trim();
    if (formData.x.trim()) socialMedia.x = formData.x.trim();

    const payload = {
      user: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
      },
      profile: {
        about: formData.about,
        location: formData.location.trim(),
        clubOverview: formData.clubOverview.trim(),
        playersResponded: Number(formData.playersResponded) || 0,
        successTransfers: Number(formData.successTransfers) || 0,
        isAvailable: formData.isAvailable,
        ...(Object.keys(socialMedia).length > 0 && { socialMedia }),
      },
    };

    try {
      const res = await updateProfile(payload).unwrap();
      if (res?.success === true) {
        setSaveSuccess(true);
        router.push("/clubprofile");
      }
    } catch (err: any) {
      Swal.fire({
        title: "Something went wrong",
        text: `${err?.data?.message ?? "Failed to update profile."}`,
        icon: "error",
      });
      console.error("Failed to update profile:", err);
      setSaveError("Failed to save changes. Please try again.");
    }
  };

  if (isProfileLoading) {
    return <p className="text-white p-6">Loading profile...</p>;
  }

  return (
    <div>
      <h2
        className="text-xm md:text-2xl font-bold text-white py-3"
        style={{
          textShadow:
            "0 0 10px #ff0000, 0 0 20px #ff0000, 0 0 30px #ff0000, 0 0 40px #ff0000",
        }}
      >
        Edit Profile
      </h2>
      <p className="text-[#8F8F8F] mb-2">
        Edit Your Details & Upload Performance Videos
      </p>

      <div className="">
        <div className="w-full ">
          {/* Header Section */}
          <div className="bg-[#303030] rounded-2xl p-6 flex items-center justify-between mb-2 ">
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16">
                <Image
                  src={previewImage || profile?.image || defaultUser}
                  alt={profile?.name || "Profile"}
                  fill
                  className="rounded-full object-cover border-2 border-[#FFFFFF]"
                />
                <label className="absolute bottom-0 right-0 bg-[#FFFFFF] rounded-full p-1 cursor-pointer">
                  <Camera className="w-4 h-4 text-gray-400" />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                    disabled={isImageUploading}
                  />
                </label>
              </div>
              <div>
                <h1 className="text-white text-xl font-semibold">
                  {profile?.name}
                </h1>
                <p className="text-gray-400 text-sm capitalize">
                  {profile?.role}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={formData.isAvailable}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      isAvailable: e.target.checked,
                    }))
                  }
                  className="accent-red-500 w-4 h-4"
                />
                Available for booking
              </label>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="bg-red-500 hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                {isSaving ? "Saving..." : "Save"}
              </button>
            </div>
          </div>

          {imageError && (
            <p className="text-red-500 text-sm mb-2">{imageError}</p>
          )}
          {saveError && (
            <p className="text-red-500 text-sm mb-2">{saveError}</p>
          )}
          {saveSuccess && (
            <p className="text-green-500 text-sm mb-2">
              Profile updated successfully.
            </p>
          )}

          {/* About Section */}
          <div className="bg-[#303030] px-6 py-4 rounded-2xl">
            <div className="mb-3 md:mb-5">
              <h2 className="text-white font-semibold mb-2">About</h2>
              <textarea
                name="about"
                value={formData.about}
                onChange={handleChange}
                rows={3}
                className="w-full bg-[#525252] border border-[#FFFFFF] text-gray-300 px-4 py-3 rounded text-sm leading-relaxed focus:outline-none focus:border-gray-600 resize-none"
              />
            </div>
            <div>
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Left Column - Personal Info */}
                  <div className="space-y-6">
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-[#525252] border border-[#FFFFFF] text-gray-300 px-4 py-3 rounded text-sm focus:outline-none focus:border-gray-600"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-400 text-sm mb-2">
                        Location
                      </label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="e.g. Sylhet, Bangladesh"
                        className="w-full bg-[#525252] border border-[#FFFFFF] text-gray-300 px-4 py-3 rounded text-sm focus:outline-none focus:border-gray-600"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-400 text-sm mb-2">
                        Phone
                      </label>
                      <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full bg-[#525252] border border-[#FFFFFF] text-gray-300 px-4 py-3 rounded text-sm focus:outline-none focus:border-gray-600"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-400 text-sm mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-[#525252] border border-[#FFFFFF] text-gray-300 px-4 py-3 rounded text-sm focus:outline-none focus:border-gray-600"
                      />
                    </div>
                  </div>

                  {/* Right Column - Club Info */}
                  <div className="space-y-6">
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">
                        Club Overview
                      </label>
                      <textarea
                        name="clubOverview"
                        value={formData.clubOverview}
                        onChange={handleChange}
                        rows={3}
                        className="w-full bg-[#525252] border border-[#FFFFFF] text-gray-300 px-4 py-3 rounded text-sm focus:outline-none focus:border-gray-600 resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-400 text-sm mb-2">
                        Players Responded
                      </label>
                      <input
                        type="number"
                        name="playersResponded"
                        value={formData.playersResponded}
                        onChange={handleChange}
                        min={0}
                        className="w-full bg-[#525252] border border-[#FFFFFF] text-gray-300 px-4 py-3 rounded text-sm focus:outline-none focus:border-gray-600"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-400 text-sm mb-2">
                        Successful Transfers
                      </label>
                      <input
                        type="number"
                        name="successTransfers"
                        value={formData.successTransfers}
                        onChange={handleChange}
                        min={0}
                        className="w-full bg-[#525252] border border-[#FFFFFF] text-gray-300 px-4 py-3 rounded text-sm focus:outline-none focus:border-gray-600"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-400 text-sm mb-2">
                        Facebook
                      </label>
                      <input
                        type="url"
                        name="facebook"
                        value={formData.facebook}
                        onChange={handleChange}
                        className="w-full bg-[#525252] border border-[#FFFFFF] text-gray-300 px-4 py-3 rounded text-sm focus:outline-none focus:border-gray-600"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-400 text-sm mb-2">
                        Instagram
                      </label>
                      <input
                        type="url"
                        name="instagram"
                        value={formData.instagram}
                        onChange={handleChange}
                        className="w-full bg-[#525252] border border-[#FFFFFF] text-gray-300 px-4 py-3 rounded text-sm focus:outline-none focus:border-gray-600"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-400 text-sm mb-2">
                        LinkedIn
                      </label>
                      <input
                        type="url"
                        name="linkedin"
                        value={formData.linkedin}
                        onChange={handleChange}
                        className="w-full bg-[#525252] border border-[#FFFFFF] text-gray-300 px-4 py-3 rounded text-sm focus:outline-none focus:border-gray-600"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-400 text-sm mb-2">
                        X
                      </label>
                      <input
                        type="url"
                        name="x"
                        value={formData.x}
                        onChange={handleChange}
                        className="w-full bg-[#525252] border border-[#FFFFFF] text-gray-300 px-4 py-3 rounded text-sm focus:outline-none focus:border-gray-600"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
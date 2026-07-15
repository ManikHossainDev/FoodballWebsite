"use client"
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Plus, X, Camera } from 'lucide-react';
import { useGetUserProfileQuery, useUpdateProfileImageMutation, useUpdateProfileMutation } from '@/redux/features/Profile/Profile';
import { getFromCookies } from '@/utils/cookies-storage';

interface FormData {
  fullName: string;
  age: string;
  position: string;
  location: string;
  phone: string;
  email: string;
  currentClub: string;
  currentTeam: string;
  careerGoal: string;
  achievements: string;
  facebook: string;
  instagram: string;
  linkedin: string;
  twitter: string;
}

const emptyForm: FormData = {
  fullName: '',
  age: '',
  position: '',
  location: '',
  phone: '',
  email: '',
  currentClub: '',
  currentTeam: '',
  careerGoal: '',
  achievements: '',
  facebook: '',
  instagram: '',
  linkedin: '',
  twitter: '',
};

const Page = () => {
  const userCookie = getFromCookies('user');
  const currentUser = userCookie ? JSON.parse(userCookie) : null;
  const id = currentUser?._id || currentUser?.id;

  const { data, isLoading, isError } = useGetUserProfileQuery(id);
  const [ProfileImage, { isLoading: isImageUploading }] = useUpdateProfileImageMutation();
  const [UpdateProfile, { isLoading: isSaving }] = useUpdateProfileMutation();

  const apiUser = data?.data;
  const profile = apiUser?.profile;
  const social = profile?.socialMedia;

  const [formData, setFormData] = useState<FormData>(emptyForm);
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState<string>('');
  const [showSkillInput, setShowSkillInput] = useState<boolean>(false);

  // Image upload state
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);

  // Save state
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  // Populate form once the API data arrives
  useEffect(() => {
    if (!apiUser) return;

    setFormData({
      fullName: apiUser.name || '',
      age: profile?.age?.toString() || '',
      position: profile?.position || '',
      location: profile?.location || '',
      phone: apiUser.phone || '',
      email: apiUser.email || '',
      currentClub: profile?.currentClub || '',
      currentTeam: profile?.currentTeam || '',
      careerGoal: profile?.careerToal || '', // API field is spelled "careerToal"
      achievements: profile?.achievements || '',
      facebook: social?.facebook || '',
      instagram: social?.instagram || '',
      linkedin: social?.linkedin || '',
      twitter: social?.x || '', // API field is "x", not "twitter"
    });

    setSkills(profile?.keySkills || []);
  }, [apiUser, profile, social]);

  // Clean up the local object URL when it's replaced or on unmount
  useEffect(() => {
    return () => {
      if (previewImage) URL.revokeObjectURL(previewImage);
    };
  }, [previewImage]);

  // Auto-hide the success message after a few seconds
  useEffect(() => {
    if (!saveSuccess) return;
    const t = setTimeout(() => setSaveSuccess(false), 3000);
    return () => clearTimeout(t);
  }, [saveSuccess]);

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const addSkill = () => {
    if (newSkill.trim()) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
      setShowSkillInput(false);
    }
  };

  const removeSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const handleCameraClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageError(null);

    // Show an instant local preview while the upload is in flight
    const localUrl = URL.createObjectURL(file);
    setPreviewImage(localUrl);

    try {
      const body = new FormData();
      body.append('image', file);
      await ProfileImage(body).unwrap();
      // If your API returns the new image URL, you could swap the preview
      // for it here instead of relying on the local object URL, e.g.:
      // setPreviewImage(result?.data?.image ?? localUrl);
    } catch (err) {
      console.error('Failed to update profile image:', err);
      setImageError('Failed to update image. Please try again.');
      setPreviewImage(null);
    } finally {
      // Allow re-selecting the same file again later
      e.target.value = '';
    }
  };

  const handleSave = async () => {
    setSaveError(null);
    setSaveSuccess(false);

    // Build payload matching your API's nested shape.
    // NOTE: API uses "careerToal" (not "careerGoal") and "x" (not "twitter") — typos kept intentionally to match backend.
    const body = {
      id, 
      name: formData.fullName,
      phone: formData.phone,
      email: formData.email,
      profile: {
        age: formData.age ? Number(formData.age) : undefined,
        position: formData.position,
        location: formData.location,
        currentClub: formData.currentClub,
        currentTeam: formData.currentTeam,
        careerToal: formData.careerGoal,
        keySkills: skills,
        achievements: formData.achievements,
        socialMedia: {
          facebook: formData.facebook,
          instagram: formData.instagram,
          linkedin: formData.linkedin,
          x: formData.twitter,
        },
      },
    };

    try {
      // If your mutation only expects the body (id comes from auth/cookie on the backend),
      // change this to: await UpdateProfile(body).unwrap();
      await UpdateProfile(body).unwrap();
      setSaveSuccess(true);
    } catch (err) {
      console.error('Failed to update profile:', err);
      setSaveError('Failed to save profile. Please try again.');
    }
  };

  if (isLoading) {
    return <p className="text-white p-6">Loading profile...</p>;
  }

  if (isError || !apiUser) {
    return <p className="text-red-400 p-6">Failed to load profile.</p>;
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
      <p className="text-[#8F8F8F] mb-2">Edit Your Details & Upload Performance Videos</p>

      <div className="">
        <div className="w-full ">
          {/* Header Section */}
          <div className="bg-[#303030] rounded-2xl p-6 flex items-center justify-between mb-2 ">
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16">
                <Image
                  src={previewImage || apiUser.image}
                  alt={apiUser.name}
                  fill
                  className={`rounded-full object-cover border-2 border-[#FFFFFF] ${isImageUploading ? 'opacity-50' : ''}`}
                />
                <button
                  type="button"
                  onClick={handleCameraClick}
                  disabled={isImageUploading}
                  className="absolute bottom-0 right-0 bg-[#FFFFFF] rounded-full p-1 disabled:cursor-not-allowed"
                  aria-label="Change profile photo"
                >
                  <Camera className="w-4 h-4 text-gray-400" />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
              <div>
                <h1 className="text-white text-xl font-semibold">{apiUser.name}</h1>
                <p className="text-gray-400 text-sm">{profile?.position}</p>
                {isImageUploading && (
                  <p className="text-gray-400 text-xs mt-1">Uploading photo...</p>
                )}
                {imageError && (
                  <p className="text-red-400 text-xs mt-1">{imageError}</p>
                )}
              </div>
            </div>

            <div className="flex flex-col items-end gap-1">
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaving ? 'Saving...' : 'Save'}
              </button>
              {saveError && <p className="text-red-400 text-xs">{saveError}</p>}
              {saveSuccess && <p className="text-green-400 text-xs">Profile updated!</p>}
            </div>
          </div>

          {/* About Section */}
          <div className="bg-[#303030] px-6 py-4  rounded-2xl">
            <div className="">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* Left Column - Personal Info */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={(e) => handleChange('fullName', e.target.value)}
                      className="w-full bg-[#525252] border border-[#FFFFFF] text-gray-300 px-4 py-3 rounded text-sm focus:outline-none focus:border-gray-600"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Age</label>
                    <input
                      type="text"
                      name="age"
                      value={formData.age}
                      onChange={(e) => handleChange('age', e.target.value)}
                      className="w-full bg-[#525252] border border-[#FFFFFF] text-gray-300 px-4 py-3 rounded text-sm focus:outline-none focus:border-gray-600"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Position</label>
                    <input
                      type="text"
                      name="position"
                      value={formData.position}
                      onChange={(e) => handleChange('position', e.target.value)}
                      className="w-full bg-[#525252] border border-[#FFFFFF] text-gray-300 px-4 py-3 rounded text-sm focus:outline-none focus:border-gray-600"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Location</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={(e) => handleChange('location', e.target.value)}
                      className="w-full bg-[#525252] border border-[#FFFFFF] text-gray-300 px-4 py-3 rounded text-sm focus:outline-none focus:border-gray-600"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Phone</label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      className="w-full bg-[#525252] border border-[#FFFFFF] text-gray-300 px-4 py-3 rounded text-sm focus:outline-none focus:border-gray-600"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      className="w-full bg-[#525252] border border-[#FFFFFF] text-gray-300 px-4 py-3 rounded text-sm focus:outline-none focus:border-gray-600"
                    />
                  </div>
                </div>

                {/* Right Column - Professional Info */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Current Club</label>
                    <input
                      type="text"
                      name="currentClub"
                      value={formData.currentClub}
                      onChange={(e) => handleChange('currentClub', e.target.value)}
                      className="w-full bg-[#525252] border border-[#FFFFFF] text-gray-300 px-4 py-3 rounded text-sm focus:outline-none focus:border-gray-600"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Current Team</label>
                    <input
                      type="text"
                      name="currentTeam"
                      value={formData.currentTeam}
                      onChange={(e) => handleChange('currentTeam', e.target.value)}
                      className="w-full bg-[#525252] border border-[#FFFFFF] text-gray-300 px-4 py-3 rounded text-sm focus:outline-none focus:border-gray-600"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Career Goal</label>
                    <input
                      type="text"
                      name="careerGoal"
                      value={formData.careerGoal}
                      onChange={(e) => handleChange('careerGoal', e.target.value)}
                      className="w-full bg-[#525252] border border-[#FFFFFF] text-gray-300 px-4 py-3 rounded text-sm focus:outline-none focus:border-gray-600"
                    />
                  </div>

                  {/* Key Skills */}
                  <div>
                    <label className="block text-gray-400 text-sm mb-3">Key Skills</label>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded text-sm font-medium"
                        >
                          {skill}
                          <button
                            onClick={() => removeSkill(index)}
                            className="hover:bg-red-700 rounded-full p-0.5 transition-colors"
                          >
                            <X size={14} />
                          </button>
                        </span>
                      ))}

                      {showSkillInput ? (
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={newSkill}
                            onChange={(e) => setNewSkill(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && addSkill()}
                            placeholder="New skill"
                            className="bg-[#FFFFFF] text-black px-3 py-2 rounded text-sm outline-none focus:ring-2 focus:ring-red-500"
                            autoFocus
                          />
                          <button
                            onClick={addSkill}
                            className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded text-sm transition-colors"
                          >
                            Add
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setShowSkillInput(true)}
                          className="inline-flex items-center justify-center w-10 h-10 bg-[#525252] hover:bg-gray-600 text-white rounded transition-colors"
                        >
                          <Plus size={20} />
                        </button>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Achievements</label>
                    <input
                      type="text"
                      name="achievements"
                      value={formData.achievements}
                      onChange={(e) => handleChange('achievements', e.target.value)}
                      className="w-full bg-[#525252] border border-[#FFFFFF] text-gray-300 px-4 py-3 rounded text-sm focus:outline-none focus:border-gray-600"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Facebook</label>
                    <input
                      type="url"
                      name="facebook"
                      value={formData.facebook}
                      onChange={(e) => handleChange('facebook', e.target.value)}
                      className="w-full bg-[#525252] border border-[#FFFFFF] text-gray-300 px-4 py-3 rounded text-sm focus:outline-none focus:border-gray-600"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Instagram</label>
                    <input
                      type="url"
                      name="instagram"
                      value={formData.instagram}
                      onChange={(e) => handleChange('instagram', e.target.value)}
                      className="w-full bg-[#525252] border border-[#FFFFFF] text-gray-300 px-4 py-3 rounded text-sm focus:outline-none focus:border-gray-600"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Linked In</label>
                    <input
                      type="url"
                      name="linkedin"
                      value={formData.linkedin}
                      onChange={(e) => handleChange('linkedin', e.target.value)}
                      className="w-full bg-[#525252] border border-[#FFFFFF] text-gray-300 px-4 py-3 rounded text-sm focus:outline-none focus:border-gray-600"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 text-sm mb-2">X</label>
                    <input
                      type="url"
                      name="twitter"
                      value={formData.twitter}
                      onChange={(e) => handleChange('twitter', e.target.value)}
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
  );
};

export default Page;
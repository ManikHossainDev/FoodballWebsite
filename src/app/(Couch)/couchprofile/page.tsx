/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { FiEdit2 } from 'react-icons/fi';
import { FaFacebook, FaXTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa6';
import Image from 'next/image';
import userPlaceholder from '@/assets/Authentication/user.jpg';
import Link from 'next/link';
import { useGetUserProfileQuery } from '@/redux/features/Profile/Profile';
import { getFromCookies } from '@/utils/cookies-storage';

const Page = () => {
  const userCookie = getFromCookies('user');
  const currentUser = userCookie ? JSON.parse(userCookie) : null;
  const id = currentUser?._id || currentUser?.id;
  const { data, isLoading, isError } = useGetUserProfileQuery(id);

  const user = data?.data;

  if (isLoading) {
    return <p className="text-white py-6">Loading profile...</p>;
  }

  if (isError || !user) {
    return <p className="text-white py-6">Failed to load profile.</p>;
  }

  const profile = user.profile || {};
  const social = profile.socialMedia || {};

  const socialLinks = [
    { key: 'facebook', url: social.facebook, Icon: FaFacebook },
    { key: 'x', url: social.x, Icon: FaXTwitter },
    { key: 'instagram', url: social.instagram, Icon: FaInstagram },
    { key: 'linkedin', url: social.linkedin, Icon: FaLinkedin },
  ].filter((s) => s.url);

  return (
    <div>
      <h2
        className="text-xm md:text-2xl font-bold text-white py-3"
        style={{
          textShadow:
            "0 0 10px #ff0000, 0 0 20px #ff0000, 0 0 30px #ff0000, 0 0 40px #ff0000",
        }}
      >
        My Profile
      </h2>
      <p className="text-[#8F8F8F] mb-2">Edit Your Details & Upload Performance Videos</p>

      <div className="">
        <div className="w-full ">
          {/* Header Section */}
          <div className="bg-[#303030] rounded-2xl p-2 md:p-4 lg:p-6 flex items-center justify-between mb-2 ">
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16">
                <Image
                  src={user.image || userPlaceholder}
                  alt={user.name || 'Profile picture'}
                  fill
                  className="rounded-full object-cover border-2 border-gray-700"
                />
              </div>
              <div>
                <h1 className="text-white text-xl font-semibold">{user.name}</h1>
                <p className="text-gray-400 text-sm capitalize">{user.role}</p>
              </div>
            </div>
            <Link href="/editcouchprofile">
              <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
                <FiEdit2 className="w-4 h-4" />
                Edit Profile
              </button>
            </Link>
          </div>

          {/* About Section */}
          <div className="bg-[#303030] px-6 py-4  rounded-2xl">
            <div className=" mb-3 md:mb-5">
              <h2 className="text-white font-semibold mb-2">About</h2>
              <p className="text-gray-400 text-sm md:text-lg leading-relaxed">
                {profile.about || 'No description added yet.'}
              </p>
            </div>

            {/* Details Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
              {/* Left Column */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-gray-400 text-sm min-w-[120px]">Full Name</span>
                  <span className="text-white text-sm">{user.name}</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-gray-400 text-sm min-w-[120px]">Location</span>
                  <span className="text-white text-sm">{profile.location || '—'}</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-gray-400 text-sm min-w-[120px]">Phone</span>
                  <span className="text-white text-sm">{user.phone || '—'}</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-gray-400 text-sm min-w-[120px]">Email</span>
                  <span className="text-white text-sm">{user.email || '—'}</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-gray-400 text-sm min-w-[120px]">Experience</span>
                  <span className="text-white text-sm">{profile.coachExperiences || '—'}</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-gray-400 text-sm min-w-[120px]">Rating</span>
                  <span className="text-white text-sm">
                    {user.avgRating ?? '—'} ({user.totalRating ?? 0} reviews)
                  </span>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-gray-400 text-sm min-w-[120px]">Service</span>
                  <span className="text-white text-sm">{profile.service?.title || '—'}</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-gray-400 text-sm min-w-[120px]">Consultation Fee</span>
                  <span className="text-white text-sm">
                    {profile.consultationFee != null ? `$${profile.consultationFee}` : '—'}
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-gray-400 text-sm min-w-[120px]">Video Review Fee</span>
                  <span className="text-white text-sm">
                    {profile.videoReviewFee != null ? `$${profile.videoReviewFee}` : '—'}
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-gray-400 text-sm min-w-[120px]">Coaching Philosophy</span>
                  <span className="text-white text-sm">{profile.coachingPhilosophy || '—'}</span>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-gray-400 text-sm min-w-[120px]">Area of Expertise</span>
                  <div className="flex gap-2 flex-wrap">
                    {profile.areaOfExpertise?.length ? (
                      profile.areaOfExpertise.map((skill:any) => (
                        <span
                          key={skill}
                          className="bg-red-500 text-white text-xs px-3 py-1 rounded"
                        >
                          {skill}
                        </span>
                      ))
                    ) : (
                      <span className="text-white text-sm">—</span>
                    )}
                  </div>
                </div>

                {socialLinks.length > 0 && (
                  <div className="flex gap-2">
                    {socialLinks.map(({ key, url, Icon }) => (
                      <a
                        key={key}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gray-700 hover:bg-gray-600 p-2 rounded transition-colors"
                      >
                        <Icon className="w-4 h-4 text-gray-400" />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
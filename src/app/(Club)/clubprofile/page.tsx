"use client"
import { FiEdit2 } from 'react-icons/fi';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import Image from 'next/image';
import userFallback from '@/assets/Authentication/user.jpg';
import Link from 'next/link';
import { getFromCookies } from '@/utils/cookies-storage';
import { useGetUserProfileQuery } from '@/redux/features/Profile/Profile';

const Page = () => {
  const userCookie = getFromCookies('user');
  const currentUser = userCookie ? JSON.parse(userCookie) : null;
  const id = currentUser?._id || currentUser?.id;
  const { data, isLoading } = useGetUserProfileQuery(id);

  const users = data?.data;
  console.log(users)
  const profile = users?.profile;
  const socials = profile?.socialMedia || {};

  // Only keep socials that actually have a value
  const socialLinks = [
    { key: 'facebook', url: socials.facebook, Icon: FaFacebook },
    { key: 'x', url: socials.x, Icon: FaTwitter },
    { key: 'instagram', url: socials.instagram, Icon: FaInstagram },
    { key: 'linkedin', url: socials.linkedin, Icon: FaLinkedin },
  ].filter((s) => s.url);

  if (isLoading) {
    return (
      <div className="text-white text-center py-10">Loading profile...</div>
    );
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
        My Profile
      </h2>
      <p className="text-[#8F8F8F] mb-2">Edit Your Details & Upload Performance Videos</p>

      <div className="">
        <div className="w-full">
          {/* Header Section */}
          <div className="bg-[#303030] rounded-2xl p-2 md:p-4 lg:p-6 flex items-center justify-between mb-2">
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16">
                <Image
                  src={users?.image || userFallback}
                  alt={users?.name || "User"}
                  fill
                  className="rounded-full object-cover border-2 border-gray-700"
                />
                <div className="absolute bottom-0 right-0 bg-gray-700 rounded-full p-1">
                  <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                  </svg>
                </div>
              </div>
              <div>
                <h1 className="text-white text-xl font-semibold">{users?.name || "N/A"}</h1>
                {users?.role && (
                  <p className="text-gray-400 text-sm capitalize">{users.role}</p>
                )}
              </div>
            </div>
            <Link href="/editclubprofile">
              <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
                <FiEdit2 className="w-4 h-4" />
                Edit Profile
              </button>
            </Link>
          </div>

          {/* About Section */}
          <div className="bg-[#303030] px-6 py-4 rounded-2xl">
            <div className="mb-3 md:mb-5">
              <h2 className="text-white font-semibold mb-2">About</h2>
              <p className="text-gray-400 text-sm md:text-lg leading-relaxed">
                {profile?.about || "No description provided yet."}
              </p>
            </div>

            {/* Details Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
              {/* Left Column */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-gray-400 text-sm min-w-[120px]">Full Name</span>
                  <span className="text-white text-sm">{users?.name || "N/A"}</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-gray-400 text-sm min-w-[120px]">Location</span>
                  <span className="text-white text-sm">{profile?.location || "N/A"}</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-gray-400 text-sm min-w-[120px]">Email</span>
                  <span className="text-white text-sm">{users?.email || "N/A"}</span>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                {socialLinks.length > 0 && (
                  <div className="flex items-start gap-3">
                    <span className="text-gray-400 text-sm min-w-[120px]">Social Media</span>
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
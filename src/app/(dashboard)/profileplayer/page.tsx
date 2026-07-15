"use client"
import { FiEdit2 } from 'react-icons/fi';
import { FaTwitter, FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { IconType } from 'react-icons';
import Image from 'next/image';
import userPlaceholder from '@/assets/Authentication/user.jpg';
import Link from 'next/link';
import { getFromCookies } from '@/utils/cookies-storage';
import { useGetUserProfileQuery } from '@/redux/features/Profile/Profile';

interface SocialMedia {
  facebook?: string;
  x?: string;
  instagram?: string;
  linkedin?: string;
}

interface Profile {
  position?: string;
  about?: string;
  age?: number;
  location?: string;
  currentClub?: string;
  currentTeam?: string;
  careerToal?: string;
  keySkills?: string[];
  achievements?: string;
  socialMedia?: SocialMedia;
}

interface User {
  _id?: string;
  id?: string;
  name?: string;
  image?: string;
  email?: string;
  phone?: string;
  profile?: Profile;
}

interface UserProfileResponse {
  data?: {
    data?: User;
  };
}

// Small helper: only render a row if the value actually exists
const DetailRow = ({ label, value }: { label: string; value?: string | number | null }) => {
  if (value === undefined || value === null || value === '') return null;
  return (
    <div className="flex items-start gap-3">
      <span className="text-gray-400 text-sm min-w-[120px]">{label}</span>
      <span className="text-white text-sm">{value}</span>
    </div>
  );
};

const Page = () => {
  const userCookie = getFromCookies('user');
  const currentUser = userCookie ? JSON.parse(userCookie) : null;
  const id = currentUser?._id || currentUser?.id;

  const { data, isLoading, isError } = useGetUserProfileQuery(id);

  const user: User | undefined = data?.data;
  const profile = user?.profile;
  const social = profile?.socialMedia;

  if (isLoading) {
    return <div className="text-white p-6">Loading profile...</div>;
  }

  if (isError || !user) {
    return <div className="text-white p-6">Failed to load profile. Please try again.</div>;
  }

  // Only keep social links that have a non-empty url
  const socialLinks: { key: string; url: string; icon: IconType }[] = [
    { key: 'facebook', url: social?.facebook, icon: FaFacebook },
    { key: 'x', url: social?.x, icon: FaTwitter },
    { key: 'instagram', url: social?.instagram, icon: FaInstagram },
    { key: 'linkedin', url: social?.linkedin, icon: FaLinkedin },
  ].filter((s): s is { key: string; url: string; icon: IconType } => !!s.url);

  const keySkills: string[] = Array.isArray(profile?.keySkills) ? profile.keySkills : [];

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

      <div>
        <div className="w-full">
          {/* Header Section */}
          <div className="bg-[#303030] rounded-2xl p-2 md:p-4 lg:p-6 flex items-center justify-between mb-2">
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16">
                <Image
                  src={user?.image || userPlaceholder}
                  alt={user?.name || "User"}
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
                {user?.name && <h1 className="text-white text-xl font-semibold">{user.name}</h1>}
                {profile?.position && <p className="text-gray-400 text-sm">{profile.position}</p>}
              </div>
            </div>
            <Link href="/editprofileplayer">
              <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
                <FiEdit2 className="w-4 h-4" />
                Edit Profile
              </button>
            </Link>
          </div>

          {/* About Section */}
          <div className="bg-[#303030] px-6 py-4 rounded-2xl">
            {profile?.about && (
              <div className="mb-3 md:mb-5">
                <h2 className="text-white font-semibold mb-2">About</h2>
                <p className="text-gray-400 text-sm md:text-lg leading-relaxed">
                  {profile.about}
                </p>
              </div>
            )}

            {/* Details Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
              {/* Left Column */}
              <div className="space-y-4">
                <DetailRow label="Full Name" value={user?.name} />
                <DetailRow label="Age" value={profile?.age} />
                <DetailRow label="Position" value={profile?.position} />
                <DetailRow label="Location" value={profile?.location} />
                <DetailRow label="Phone" value={user?.phone} />
                <DetailRow label="Email" value={user?.email} />
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                <DetailRow label="Current Club" value={profile?.currentClub} />
                <DetailRow label="Current Team" value={profile?.currentTeam} />
                <DetailRow label="Career Goal" value={profile?.careerToal} />

                {keySkills.length > 0 && (
                  <div className="flex items-start gap-3">
                    <span className="text-gray-400 text-sm min-w-[120px]">Key Skills</span>
                    <div className="flex gap-2 flex-wrap">
                      {keySkills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="bg-red-500 text-white text-xs px-3 py-1 rounded"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <DetailRow label="Achievements" value={profile?.achievements} />

                {socialLinks.length > 0 && (
                  <div className="flex gap-2">
                    {socialLinks.map(({ key, url, icon: Icon }) => (
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
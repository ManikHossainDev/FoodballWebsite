/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useGetClubAgentsStatisticsQuery } from "@/redux/features/club/club";
import { useGetUserProfileQuery } from "@/redux/features/Profile/Profile";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  FiMail,
  FiPhone,
  FiUser,
  FiMessageSquare,
} from "react-icons/fi";

const WorkwithAgentsCardDetails = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetUserProfileQuery(id);
  const {data:AgentsStatistics} = useGetClubAgentsStatisticsQuery({ id: id as string, page: 1, limit: 10 })
  const agent = data?.data;
  const profile = agent?.profile;

  if (isLoading) {
    return (
      <div className="py-6 text-center text-gray-400">
        <p>Loading agent profile...</p>
      </div>
    );
  }

  if (isError || !agent) {
    return (
      <div className="py-6 text-center text-red-400">
        <p>Failed to load agent profile</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6 py-6">
      {/* LEFT CARD */}
      <div className="w-full lg:w-[320px] self-start rounded-lg bg-[#353535] overflow-hidden flex flex-col">
        <div className="relative w-full h-48">
          <Image
            src={agent.image}
            alt={agent.name}
            fill
            className="object-fill object-center"
            priority
          />
        </div>

        <div className="p-4 flex-1">
          <h2 className="text-white text-lg font-semibold mb-4">
            {agent.name}
          </h2>

          <div className="space-y-3 text-xs">
            <div className="flex items-center">
              <FiMail className="text-gray-400 mr-2" />
              <span className="text-gray-500 w-24">Email</span>
              <span className="text-gray-500 mr-2">:</span>
              <span className="text-gray-300">{agent.email}</span>
            </div>

            <div className="flex items-center">
              <FiPhone className="text-gray-400 mr-2" />
              <span className="text-gray-500 w-24">Phone Number</span>
              <span className="text-gray-500 mr-2">:</span>
              <span className="text-gray-300">{agent.phone}</span>
            </div>

            <div className="flex items-center">
              <FiUser className="text-gray-400 mr-2" />
              <span className="text-gray-500 w-24">Role</span>
              <span className="text-gray-500 mr-2">:</span>
              <span className="text-gray-300 capitalize">{agent.role}</span>
            </div>
          </div>
        </div>

        <div className="p-4 flex gap-3">
          <Link 
            href={`/messaging/${id}`}
            type="button"
            className="flex-1 h-10 rounded border border-[#ef4444] bg-[#ef4444] text-white text-sm flex items-center justify-center gap-2 transition-colors hover:bg-[#dc2626] hover:border-[#dc2626] cursor-pointer"
          >
            <FiMessageSquare size={14} />
            Message Agent
          </Link>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex-1 rounded-lg bg-[#3b3b3b] p-6">
        <h2 className="text-white text-lg font-semibold mb-6">
          {agent.name}
        </h2>

        <div className="space-y-4 text-sm">
          <div className="flex">
            <span className="w-40 text-gray-500">Rating</span>
            <span className="text-gray-500 mr-3">:</span>
            <span className="text-gray-300">
              {agent.avgRating ?? 0} ({agent.totalRating ?? 0} reviews)
            </span>
          </div>

          <div className="flex">
            <span className="w-40 text-gray-500">Experience</span>
            <span className="text-gray-500 mr-3">:</span>
            <span className="text-gray-300">{profile?.experiences}</span>
          </div>

          <div className="flex">
            <span className="w-40 text-gray-500">About</span>
            <span className="text-gray-500 mr-3">:</span>
            <span className="text-gray-300">{profile?.about}</span>
          </div>

          {profile?.service && (
            <div className="flex">
              <span className="w-40 text-gray-500">Service</span>
              <span className="text-gray-500 mr-3">:</span>
              <span className="text-gray-300">
                {profile.service.title} — {profile.service.description}
              </span>
            </div>
          )}

          <div className="flex items-start">
            <span className="w-40 text-gray-500">Area of Expertise</span>
            <span className="text-gray-500 mr-3">:</span>

            <div className="flex gap-2 flex-wrap">
              {profile?.areaOfExpertise?.map((skill: string) => (
                <span
                  key={skill}
                  className="bg-red-500 text-white text-[11px] px-3 py-1 rounded"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {profile?.socialMedia && (
            <div className="flex items-start">
              <span className="w-40 text-gray-500">Social</span>
              <span className="text-gray-500 mr-3">:</span>
              <div className="flex gap-3 flex-wrap text-gray-300 text-xs">
                {Object.entries(profile.socialMedia).map(
                  ([platform, url]) =>
                    url ? (
                      <Link
                        key={platform}
                        href={url as string}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="capitalize underline hover:text-red-400"
                      >
                        {platform}
                      </Link>
                    ) : null
                )}
              </div>
            </div>
          )}
        </div>

        <div className="mt-8">
  <h3 className="text-white font-medium mb-4">
    Recommended Players
  </h3>

  <div className="space-y-3">
    {AgentsStatistics?.data?.data?.map((item: any) => (
      <div
        key={item._id}
        className="bg-[#474747] rounded-lg px-4 py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
      >
        <div className="flex items-center gap-4">
          <div className="relative w-14 h-14 shrink-0">
            <Image
              src={item.player.image}
              alt={item.player.name}
              fill
              sizes="56px"
              className="object-cover rounded-full"
            />
          </div>

          <div className="text-xs space-y-0.5">
            <div className="flex gap-2">
              <p className="text-gray-500 w-28">Name:</p>
              <p className="text-gray-300">{item.player.name}</p>
            </div>
            <div className="flex gap-2">
              <p className="text-gray-500 w-28">Email:</p>
              <p className="text-gray-300">{item.player.email}</p>
            </div>
            <div className="flex gap-2">
              <p className="text-gray-500 w-28">Position:</p>
              <p className="text-gray-300">{item.position}</p>
            </div>
            <div className="flex gap-2">
              <p className="text-gray-500 w-28">Status:</p>
              <p
                className={`capitalize ${
                  item.status === "accepted"
                    ? "text-green-400"
                    : item.status === "pending"
                    ? "text-yellow-400"
                    : "text-red-400"
                }`}
              >
                {item.status}
              </p>
            </div>
          </div>
        </div>

        <Link
         href={`/messaging/${item?.player?._id}`}
          type="button"
          className="border border-red-500 text-white rounded px-5 h-10 text-sm flex items-center gap-2 transition-colors hover:bg-red-500 cursor-pointer"
        >
          <FiMessageSquare />
          Message player
        </Link>
      </div>
    ))}

    {AgentsStatistics?.data?.data?.length === 0 && (
      <p className="text-gray-500 text-sm">No recommended players yet</p>
    )}
  </div>
</div>
      </div>
    </div>
  );
};

export default WorkwithAgentsCardDetails;
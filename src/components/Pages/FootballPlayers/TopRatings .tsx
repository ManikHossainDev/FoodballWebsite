"use client";
import React from "react";
import { Star } from "lucide-react";
import Image from "next/image";
import {
  useGetTopRatedClubsQuery,
  useGetTopRatedCoachesQuery,
} from "@/redux/features/player/player";

const FALLBACK_AVATAR = "/assets/Authentication/user.jpg";

interface Profile {
  experiences?: string;
  areaOfExpertise?: string[];
  consultationFee?: string | number;
}

interface RatedPerson {
  _id: string;
  name: string;
  email?: string;
  phone?: string;
  image?: string;
  role?: string;
  profile?: Profile;
  totalRating?: number;
  avgRating?: number;
  isAvailable?: boolean;
}


interface RatingRowProps {
  rating?: number;
  reviews?: number;
}

const RatingRow = ({ rating, reviews }: RatingRowProps) => (
  <div className="flex items-center md:justify-center gap-1 mb-1">
    <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
    <span className="text-white font-medium">{rating ?? "N/A"}</span>
    <span className="text-gray-500 text-sm">({reviews ?? 0} reviews)</span>
  </div>
);

interface SectionHeaderProps {
  title: string;
}

const SectionHeader = ({ title }: SectionHeaderProps) => (
  <div className="flex justify-between items-center mb-4">
    <h2
      className="text-lg md:text-xl font-bold text-white "
      style={{
        textShadow:
          "0 0 10px #ff0000, 0 0 20px #ff0000, 0 0 30px #ff0000, 0 0 40px #ff0000",
      }}
    >
      {title}
    </h2>
    <button className="text-gray-400 hover:text-white text-sm">See all</button>
  </div>
);

interface EmptyStateProps {
  label: string;
}

const EmptyState = ({ label }: EmptyStateProps) => (
  <div className="bg-[#3F3F3F] rounded-lg p-6 text-center text-gray-400 text-sm">
    No {label} to show yet.
  </div>
);

const TopRatings = () => {
  const { data: coachesRes, isLoading: coachesLoading } = useGetTopRatedCoachesQuery({});
  const { data: clubsRes, isLoading: clubsLoading } = useGetTopRatedClubsQuery({});

  console.log(clubsRes)
  const coaches: RatedPerson[] = coachesRes?.data?.data ?? [];
  console.log("coaches", coaches)
  const clubs: RatedPerson[] = clubsRes?.data?.data ?? [];
  console.log('clubs', clubs)

  return (
    <div className="">
      <div className="w-full grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Top rated Coach */}
        <div className="space-y-4">
          <SectionHeader title="Top rated Coach" />

          <div className="space-y-3 bg-[#303030] rounded-md p-2">
            {coachesLoading && (
              <div className="text-gray-400 text-sm p-4">Loading coaches...</div>
            )}

            {!coachesLoading && coaches.length === 0 && (
              <EmptyState label="coaches" />
            )}

            {coaches.map((coach: RatedPerson) => {
              const specialty = coach?.profile?.areaOfExpertise?.length
                ? coach.profile.areaOfExpertise.join(", ")
                : "General Coaching";

              return (
                <div
                  key={coach._id}
                  className="bg-[#3F3F3F] rounded-lg p-2 lg:p-4 hover:bg-gray-750 transition"
                >
                  <div className="grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-1 xl:gap-4 items-center">
                    {/* Left - Avatar and Name */}
                    <div className="flex md:items-center gap-4">
                      <div className="w-12 h-12 rounded-lg overflow-hidden">
                        <Image
                          width={48}
                          height={48}
                          src={coach?.image ? coach?.image : FALLBACK_AVATAR}
                          className="rounded-md object-cover"
                          alt={coach.name || "coach"}
                        />
                      </div>
                      <div>
                        <h3 className="text-white font-medium">
                          {coach.name}
                        </h3>
                        <p className="text-gray-400 text-sm">{specialty ? specialty.slice(0, 25) : ""}</p>
                      </div>
                    </div>

                    {/* Center - Rating and Experience */}
                    <div className="md:text-center">
                      <RatingRow
                        rating={coach.avgRating}
                        reviews={coach.totalRating}
                      />
                      <p className="text-gray-400 text-xs">
                        {coach?.profile?.experiences ? coach?.profile?.experiences.slice(0, 20) : "Experience not listed"}
                      </p>
                    </div>

                    {/* Right - Availability (no price field in API) */}
                    <div className="md:text-right">
                      <p className="text-white text-xs lg:text-lg">
                        $ {coach?.profile?.consultationFee} / session
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Rated Club */}
        <div className="space-y-4">
          <SectionHeader title="Top Rated Agents" />

          <div className="space-y-3 bg-[#303030] rounded-md p-2">
            {clubsLoading && (
              <div className="text-gray-400 text-sm p-4">Loading...</div>
            )}

            {!clubsLoading && clubs.length === 0 && <EmptyState label="entries" />}

            {clubs.map((entry: RatedPerson) => {
              const specialty = entry?.profile?.areaOfExpertise?.length
                ? entry.profile.areaOfExpertise.join(", ")
                : entry.role || "N/A";

              return (
                <div
                  key={entry._id}
                  className="bg-[#3F3F3F] rounded-lg p-4 hover:bg-gray-750 transition"
                >
                  <div className="grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-4 items-center">
                    {/* Left - Avatar and Name */}
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg overflow-hidden">
                        <Image
                          width={48}
                          height={48}
                          src={entry?.image ? entry?.image : FALLBACK_AVATAR}
                          className="rounded-md object-cover"
                          alt={entry.name}
                        />
                      </div>
                      <div>
                        <h3 className="text-white font-medium">
                          {entry.name}
                        </h3>
                        <p className="text-gray-400 text-sm">{specialty ? specialty.slice(0, 25) : ""}</p>
                      </div>
                    </div>

                    {/* Center - Rating and Experience */}
                    <div className="md:text-center">
                      <RatingRow
                        rating={entry.avgRating}
                        reviews={entry.totalRating}
                      />
                      <p className="text-gray-400 text-xs">
                        {entry?.profile?.experiences
                          ? entry.profile.experiences.slice(0, 20)
                          : ""}
                      </p>
                    </div>

                    {/* Right - no league/salary fields available from API */}
                    <div className="md:text-right">
                      <p className="text-gray-400 text-xs capitalize">
                        {entry.role || ""}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopRatings;
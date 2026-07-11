import React from "react";
import { Star } from "lucide-react";
import user from "@/assets/Authentication/user.jpg";
import Image from "next/image";
const TopRatings = () => {
  // JSON data structure
  const coachesData = [
    {
      id: 1,
      name: "David Martinez",
      avatar: user,
      specialty: "Beginner Skills",
      rating: 4.9,
      reviews: 120,
      experience: "15 years experience",
      price: "$50/session",
    },
    {
      id: 2,
      name: "David Martinez",
      avatar: user,
      specialty: "Tactical Intelligence",
      rating: 4.9,
      reviews: 120,
      experience: "15 years experience",
      price: "$50/session",
    },
    {
      id: 3,
      name: "David Martinez",
      avatar: user,
      specialty: "Technical Skills",
      rating: 4.9,
      reviews: 120,
      experience: "15 years experience",
      price: "$50/session",
    },
    {
      id: 4,
      name: "David Martinez",
      avatar: user,
      specialty: "Technical Skills",
      rating: 4.9,
      reviews: 120,
      experience: "15 years experience",
      price: "$50/session",
    },
    {
      id: 5,
      name: "David Martinez",
      avatar: user,
      specialty: "Technical Skills",
      rating: 4.9,
      reviews: 120,
      experience: "15 years experience",
      price: "$50/session",
    },
    {
      id: 6,
      name: "David Martinez",
      avatar: user,
      specialty: "Technical Skills",
      rating: 4.9,
      reviews: 120,
      experience: "15 years experience",
      price: "$50/session",
    },
  ];

  const clubsData = [
    {
      id: 1,
      name: "FC Valencia",
      logo: "⚽",
      league: "La Liga",
      rating: 4.9,
      reviews: 120,
      experience: "15 years experience",
      salaryRange: "€80k-120k/year",
    },
    {
      id: 2,
      name: "FC Valencia",
      logo: "⚽",
      league: "La Liga",
      rating: 4.9,
      reviews: 120,
      experience: "15 years experience",
      salaryRange: "€80k-120k/year",
    },
    {
      id: 3,
      name: "FC Valencia",
      logo: "⚽",
      league: "La Liga",
      rating: 4.9,
      reviews: 120,
      experience: "15 years experience",
      salaryRange: "€80k-120k/year",
    },
    {
      id: 4,
      name: "FC Valencia",
      logo: "⚽",
      league: "La Liga",
      rating: 4.9,
      reviews: 120,
      experience: "15 years experience",
      salaryRange: "€80k-120k/year",
    },
    {
      id: 5,
      name: "FC Valencia",
      logo: "⚽",
      league: "La Liga",
      rating: 4.9,
      reviews: 120,
      experience: "15 years experience",
      salaryRange: "€80k-120k/year",
    },
    {
      id: 6,
      name: "FC Valencia",
      logo: "⚽",
      league: "La Liga",
      rating: 4.9,
      reviews: 120,
      experience: "15 years experience",
      salaryRange: "€80k-120k/year",
    },
  ];

  return (
    <div className="">
      <div className="w-full grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Top rated Coach */}
        <div className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h2
              className="text-lg md:text-xl font-bold text-white "
              style={{
                textShadow:
                  "0 0 10px #ff0000, 0 0 20px #ff0000, 0 0 30px #ff0000, 0 0 40px #ff0000",
              }}
            >
              Top rated Coach
            </h2>
            <button className="text-gray-400 hover:text-white text-sm">
              See all
            </button>
          </div>

          <div className="space-y-3 bg-[#303030] rounded-md p-2">
            {coachesData.map((coach) => (
              <div
                key={coach.id}
                className="bg-[#3F3F3F] rounded-lg p-4 hover:bg-gray-750 transition"
              >
                <div className="grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-4 items-center">
                  {/* Left - Avatar and Name */}
                  <div className="flex md:items-center gap-4">
                    <div className="w-12 h-12 rounded-lg overflow-hidden">
                      <Image
                        width={48}
                        height={48}
                        src={coach.avatar}
                        className="rounded-md object-cover"
                        alt="user"
                      />
                    </div>
                    <div>
                      <h3 className="text-white font-medium">{coach.name}</h3>
                      <p className="text-gray-400 text-sm">{coach.specialty}</p>
                    </div>
                  </div>

                  {/* Center - Rating and Experience */}
                  <div className="md:text-center">
                    <div className="flex items-center md:justify-center gap-1 mb-1">
                      <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                      <span className="text-white font-medium">
                        {coach.rating}
                      </span>
                      <span className="text-gray-500 text-sm">
                        ({coach.reviews} reviews)
                      </span>
                    </div>
                    <p className="text-gray-400 text-xs">{coach.experience}</p>
                  </div>

                  {/* Right - Price */}
                  <div className="md:text-right">
                    <p className="text-white font-semibold">{coach.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Rated Club */}
        <div className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h2
              className="text-lg md:text-xl font-bold text-white "
              style={{
                textShadow:
                  "0 0 10px #ff0000, 0 0 20px #ff0000, 0 0 30px #ff0000, 0 0 40px #ff0000",
              }}
            >
              Top Rated Club
            </h2>
            <button className="text-gray-400 hover:text-white text-sm">
              See all
            </button>
          </div>

          <div className="space-y-3 bg-[#303030] rounded-md p-2">
            {clubsData.map((club) => (
              <div
                key={club.id}
                className="bg-[#3F3F3F] rounded-lg p-4 hover:bg-gray-750 transition"
              >
                <div className="grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-4 items-center">
                  {/* Left - Logo and Name */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-900 rounded-lg flex items-center justify-center text-2xl">
                      {club.logo}
                    </div>
                    <div>
                      <h3 className="text-white font-medium">{club.name}</h3>
                      <p className="text-gray-400 text-sm">{club.league}</p>
                    </div>
                  </div>

                  {/* Center - Rating and Experience */}
                  <div className="md:text-center">
                    <div className="flex items-center md:justify-center gap-1 mb-1">
                      <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                      <span className="text-white font-medium">
                        {club.rating}
                      </span>
                      <span className="text-gray-500 text-sm">
                        ({club.reviews} reviews)
                      </span>
                    </div>
                    <p className="text-gray-400 text-xs">{club.experience}</p>
                  </div>

                  {/* Right - Salary Range */}
                  <div className="md:text-right">
                    <p className="text-gray-400 text-xs">Salary Range</p>
                    <p className="text-white font-semibold">
                      {club.salaryRange}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopRatings;

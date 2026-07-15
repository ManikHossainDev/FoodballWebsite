"use client";
import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { Pagination } from 'antd';
import user from '@/assets/Authentication/user.jpg';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useGetCoachesQuery } from '@/redux/features/player/hireCoachs';
import { TCoach } from '@/types/types';

const HireCoachProfileCards = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const router = useRouter();
  const { data, isLoading, isError } = useGetCoachesQuery({ page, limit });
  const coaches: TCoach[] = data?.data?.data ?? [];
  const pagination = data?.data?.pagination;
  const total: number = pagination?.total ?? 0;

  return (
    <div className=" ">
      <style>{`
        .swiper-container {
          height: 100%;
          position: relative;
          overflow: hidden;
        }

        .swiper-wrapper {
          height: 100%;
          overflow-y: auto;
          overflow-x: hidden;
          scroll-behavior: smooth;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .swiper-wrapper::-webkit-scrollbar {
          display: none;
        }

        .swiper-slide {
          height: auto;
        }


        /* Prev/Next arrow icon color */
        .ant-pagination .ant-pagination-prev .ant-pagination-item-link,
        .ant-pagination .ant-pagination-next .ant-pagination-item-link {
          color: #ffffff;
       
          border-color: #4a4a4a;
        }





      `}</style>

      <div className="swiper-container bg-[#303030] rounded-md p-2">
        <div className="swiper-wrapper">
          <div className="swiper-slide">
            {isLoading ? (
              <p className="text-gray-400 text-center py-10">Loading coaches...</p>
            ) : isError ? (
              <p className="text-red-400 text-center py-10">Failed to load coaches.</p>
            ) : coaches.length === 0 ? (
              <p className="text-gray-400 text-center py-10">No coaches found.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 xx:grid-cols-5 gap-3 md:gap-5">
                {coaches.map((coach) => (
                  <div
                    key={coach._id}
                    onClick={() => router.push(`/HireCoach/${coach._id}`)}
                    className="bg-[#3F3F3F] rounded-lg p-4 shadow-lg cursor-pointer hover:bg-[#454545] transition"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold">
                        <Image
                          width={300}
                          height={300}
                          src={coach.image || user}
                          className="rounded-md"
                          alt={coach.name}
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-white font-semibold">{coach.name}</h3>
                        <p className="text-gray-400 text-sm">{coach.email}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 mb-2">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-white font-semibold">{coach.avgRating}</span>
                      <span className="text-gray-400 text-sm">({coach.totalRating} reviews)</span>
                    </div>

                    <p className="text-gray-400 text-sm mb-3">{coach.profile?.experiences}</p>
                    <p
                      className={`font-bold text-sm mb-4 ${
                        coach.isAvailable ? 'text-green-400' : 'text-red-400'
                      }`}
                    >
                      {coach.isAvailable ? 'Available' : 'Unavailable'}
                    </p>

                    <div className="space-y-2" onClick={(e) => e.stopPropagation()}>
                      <Link href={`/HireCoach/${coach._id}/requestreview`}>
                        <button className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded transition">
                          Request Review
                        </button>
                      </Link>
                       <div className='py-[2p1]'></div>
                      <Link href={`/HireCoach/${coach._id}/bookconsultation`}>
                        <button className="w-full bg-transparent border border-gray-600 hover:border-gray-500 text-white font-semibold py-2 rounded transition">
                          Book Consultation
                        </button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}

            
          </div>
        </div>
      </div>
      {!isLoading && !isError && total > 0 && (
              <div className="flex items-center justify-end py-6">
                <Pagination
                  current={page}
                  pageSize={limit}
                  total={total}
                  onChange={(newPage, newPageSize) => {
                    setPage(newPage);
                    setLimit(newPageSize);
                  }}
                  // showSizeChanger
                  responsive
                />
              </div>
            )}
    </div>
  );
};

export default HireCoachProfileCards;
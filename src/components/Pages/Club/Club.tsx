/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React, { useState } from "react"
import { Pagination, Spin, Empty } from "antd";
import { useGetClubHiringsQuery } from "@/redux/features/club/club";
import Link from "next/link";
const Club = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const { data: clubHiringRes, isLoading, isFetching } =   useGetClubHiringsQuery({page, limit});
  const hiringPosts = clubHiringRes?.data?.data ?? [];
  const pagination = clubHiringRes?.data?.pagination;
  const handlePageChange = (newPage: number, newPageSize: number) => {
    setPage(newPage);
    setLimit(newPageSize);
  };

  return (
    <div className="">
      <div className="">
        <div className="">
          {/* Player Placements Requests Section */}
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2
                className="text-lg md:text-xl font-bold text-white"
                style={{
                  textShadow:
                    "0 0 10px #ff0000, 0 0 20px #ff0000, 0 0 30px #ff0000, 0 0 40px #ff0000",
                }}
              >
                Hiring Post
              </h2>
              <Link
                href={`/hirerplayers`}
                className="text-gray-400 hover:text-white text-sm"
              >
                See all
              </Link>
            </div>

            <div className="space-y-3 bg-[#303030] p-3 rounded-md min-h-[200px]">
              {isLoading || isFetching ? (
                <div className="flex justify-center items-center py-10">
                  <Spin size="large" />
                </div>
              ) : hiringPosts.length === 0 ? (
                <div className="py-10">
                  <Empty
                    description={<span className="text-gray-400">No hiring posts found</span>}
                  />
                </div>
              ) : (
                hiringPosts.map((item: any) => (
                  <Link
                    key={item._id}
                    href={`/Club/${item._id}`}
                    className="md:bg-[#3F3F3F]   rounded-lg p-3 md:flex md:items-center gap-3 transition cursor-pointer"
                  >
                    

                    <div className="md:flex-1">
                      <h3 className="text-white font-semibold text-sm mb-1">
                        {item.positionTitle}
                      </h3>
                      <div className="space-y-0.5">
                        <div className="flex items-center text-xs">
                          <p className="text-gray-500">Employment Type :</p>
                          <p className="text-gray-400 ml-2">{item.employmentType}</p>
                        </div>
                        <div className="flex items-center text-xs">
                          <p className="text-gray-500">Open Positions :</p>
                          <p className="text-gray-400 ml-2">{item.openPositions}</p>
                        </div>
                        <div className="flex items-center text-xs">
                          <p className="text-gray-500">Salary Range :</p>
                          <p className="text-gray-400 ml-2">{item.salaryRange}</p>
                        </div>
                        <div className="flex items-center text-xs">
                          <p className="text-gray-500">Status :</p>
                          <p className="text-gray-400 ml-2 capitalize">{item.status}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 flex-shrink-0 mt-2 md:mt-0">
                      <Link
                        href={`/Club/${item._id}/seerecommended`}
                        className="bg-[#ef4444] hover:bg-[#dc2626] flex items-center space-x-2 text-white px-4 py-1.5 rounded text-xs font-medium transition whitespace-nowrap"
                      >
                        See Recommended Player
                      </Link>
                    </div>
                  </Link>
                ))
              )}
               {/* Ant Design Pagination */}
            {pagination && pagination.total > 0 && (
              <div className="flex justify-end pt-2 ">
                <Pagination
                  current={pagination.page}
                  pageSize={pagination.limit}
                  total={pagination.total}
                  onChange={handlePageChange}
                  className="ant-pagination-dark"
                />
              </div>
            )}
            </div>

           
          </div>
        </div>
      </div>
    </div>
  );
};

export default Club;
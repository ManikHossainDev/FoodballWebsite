/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useState } from 'react';
import user from '@/assets/Authentication/user.jpg';
import Image from 'next/image';
import { useGetClubHiringMyResponseQuery } from '@/redux/features/agents/agent';
import Link from 'next/link';

type OrderCategory = 'Profile Recommended' | 'Placement Completed';

interface Tab {
  id: OrderCategory;
  label: string;
}

// Map UI tab -> actual API status value
const statusMap: Record<OrderCategory, string> = {
  'Profile Recommended': 'pending',
  'Placement Completed': 'accepted',
};

const tabs: Tab[] = [
  { id: 'Profile Recommended', label: 'Profile Recommended' },
  { id: 'Placement Completed', label: 'Placement Completed' },
];

const PlacementProgressCard = () => {
  const [activeTab, setActiveTab] = useState<OrderCategory>('Profile Recommended');
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const { data: response, isLoading, isFetching } = useGetClubHiringMyResponseQuery({
    page,
    limit,
    status: statusMap[activeTab],
  });

  

  // Real data from API, no mock fallback
  const recommendList = response?.data?.data ?? [];
 console.log(recommendList)
  // Actual response shape uses `pagination`, not `meta`
  // const totalItems: number = response?.data?.pagination?.total ?? 0;
  const totalPages: number = response?.data?.pagination?.totalPages ?? 1;

  const handleTabChange = (tabId: OrderCategory) => {
    setActiveTab(tabId);
    setPage(1);
  };

  const handlePrevPage = () => setPage((prev) => Math.max(1, prev - 1));
  const handleNextPage = () => setPage((prev) => Math.min(totalPages, prev + 1));
  const handlePageClick = (pageNum: number) => setPage(pageNum);

  const getPageNumbers = (): (number | 'ellipsis')[] => {
    const pages: (number | 'ellipsis')[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }

    pages.push(1);
    if (page > 3) pages.push('ellipsis');

    const start = Math.max(2, page - 1);
    const end = Math.min(totalPages - 1, page + 1);
    for (let i = start; i <= end; i++) pages.push(i);

    if (page < totalPages - 2) pages.push('ellipsis');
    pages.push(totalPages);

    return pages;
  };

  return (
    <div className="bg-[#303030] p-1 md:p-4 rounded-lg">
      <div>
        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6 bg-[#3F3F3F] py-3 px-1 md:px-3 rounded-lg">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`px-2 md:px-6 py-2.5 rounded-lg text-[11px] font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-[#FFFFFF] border border-red-400 text-red-400 font-semibold shadow-[0_0_20px_rgba(255,0,0,0.5)]'
                  : 'bg-transparent text-gray-400 hover:bg-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Loading state */}
        {(isLoading || isFetching) && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-sm">Loading...</p>
          </div>
        )}

        {/* Orders Grid */}
        {!isLoading && !isFetching && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {recommendList.map((item: any) => (
              <div key={item._id} className="bg-[#3F3F3F] rounded-lg overflow-hidden border border-gray-700 p-4">
                <div className="xl:flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 rounded-md overflow-hidden">
                      <Image
                        width={100}
                        height={100}
                        src={item.player?.image || user}
                        className="rounded-md object-cover w-full h-full"
                        alt={item.player?.name || 'Player'}
                      />
                    </div>
                  </div>

                  <div className="flex-1 text-xs">
                    <h3 className="text-white font-semibold text-base">
                      {item.player?.name}
                    </h3>

                    <div className="flex space-x-2 text-sm">
                      <p className="text-[#737373]">Position :</p>
                      <p className="text-[#BFBFBF]">{item.position}</p>
                    </div>
                    <div className="flex space-x-2 text-sm">
                      <p className="text-[#737373]">Employment Type :</p>
                      <p className="text-[#BFBFBF]">{item.clubeHiring?.employmentType}</p>
                    </div>
                    <div className="flex space-x-2 text-sm">
                      <p className="text-[#737373]">Club :</p>
                      <p className="text-[#BFBFBF]">{item.clubeHiring?.author?.name}</p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 justify-center">
                    <Link href={`/messaging/${item?.player?._id}`} className="bg-[#2C2C2C] hover:bg-[#3C3C3C] border border-[#E43636] text-white px-4 py-2 rounded text-sm font-medium transition-colors whitespace-nowrap flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                      </svg>
                      Message Player
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!isLoading && !isFetching && recommendList.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No players in this category</p>
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-6">
            <button
              onClick={handlePrevPage}
              disabled={page === 1}
              className="px-3 py-2 rounded-md text-sm font-medium bg-[#3F3F3F] text-gray-300 hover:bg-[#4A4A4A] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Prev
            </button>

            {getPageNumbers().map((p, idx) =>
              p === 'ellipsis' ? (
                <span key={`ellipsis-${idx}`} className="px-2 text-gray-500">
                  ...
                </span>
              ) : (
                <button
                  key={p}
                  onClick={() => handlePageClick(p)}
                  className={`w-9 h-9 rounded-md text-sm font-medium transition-colors ${
                    page === p
                      ? 'bg-[#FFFFFF] border border-red-400 text-red-400 font-semibold shadow-[0_0_20px_rgba(255,0,0,0.5)]'
                      : 'bg-[#3F3F3F] text-gray-300 hover:bg-[#4A4A4A]'
                  }`}
                >
                  {p}
                </button>
              )
            )}

            <button
              onClick={handleNextPage}
              disabled={page === totalPages}
              className="px-3 py-2 rounded-md text-sm font-medium bg-[#3F3F3F] text-gray-300 hover:bg-[#4A4A4A] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlacementProgressCard;
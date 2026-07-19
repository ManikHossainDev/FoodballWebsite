"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Star } from 'lucide-react';
import { Pagination, Spin, Empty } from 'antd';
import user from '@/assets/Authentication/user.jpg'
import Image from 'next/image';
import Link from 'next/link';
import { useGetAgentsQuery } from '@/redux/features/player/agents';

interface AgentProfile {
  experiences?: string;
  areaOfExpertise?: string[];
}

interface Agent {
  _id: string;
  image?: string;
  name?: string;
  email?: string;
  avgRating?: number;
  totalRating?: number;
  profile?: AgentProfile;
}

interface AgentsPagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}





const ConnectwithAgentCards = () => {
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const router = useRouter();

  const { data, isLoading, isFetching } = useGetAgentsQuery({ page, limit });

  const agents: Agent[] = data?.data?.data || [];
  const pagination: AgentsPagination = data?.data?.pagination || { total: 0, page: 1, limit: 10, totalPages: 1 };

  const handlePageChange = (newPage: number, newPageSize: number): void => {
    setPage(newPage);
    setLimit(newPageSize);
  };

  const handleRequestAgent = (e: React.MouseEvent, agentId: string): void => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/ConnectwithAgent/requestagent?id=${agentId}`);
  };

  const handleMessage = (e: React.MouseEvent, agentId: string): void => {
    e.preventDefault();
    e.stopPropagation();
    // TODO: wire up real messaging navigation / modal here
    router.push(`/ConnectwithAgent/${agentId}/message`);
  };

  return (
    <div className="min-h-[77vh] bg-[#303030] rounded-md p-2 flex flex-col">
      {/* Swiper-like styling */}
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
        }

        .swiper-wrapper::-webkit-scrollbar {
          width: 6px;
        }

        .swiper-wrapper::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 3px;
        }

        .swiper-wrapper::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 3px;
          transition: background 0.3s;
        }

        .swiper-wrapper::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.5);
        }

        .swiper-wrapper {
          scrollbar-width: thin;
          scrollbar-color: rgba(255, 255, 255, 0.3) rgba(255, 255, 255, 0.05);
        }

        .swiper-slide {
          height: auto;
        }

        /* Dark-theme override for Ant Design Pagination */
.agent-pagination .ant-pagination-item {
  background-color: #3F3F3F;
  border-color: #555;
}
.agent-pagination .ant-pagination-item a {
  color: #fff;
}

.agent-pagination .ant-pagination-item-active a {
  color: #fff;
}
.agent-pagination .ant-pagination-prev button,
.agent-pagination .ant-pagination-next button {
  background-color: #3F3F3F;
  border-color: #555;
  color: #fff;
}

/* Arrow icon color fix */
.agent-pagination .ant-pagination-prev .ant-pagination-item-link,
.agent-pagination .ant-pagination-next .ant-pagination-item-link {
  color: #ffffff !important;
}
.agent-pagination .ant-pagination-prev .ant-pagination-item-link svg,
.agent-pagination .ant-pagination-next .ant-pagination-item-link svg {
  fill: #ffffff !important;
}
.agent-pagination .ant-pagination-item-link .anticon {
  color: #ffffff !important;
}
        }
      `}</style>

      <div className="swiper-container flex-1">
        <div className="swiper-wrapper">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <Spin size="large" />
            </div>
          ) : agents.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <Empty description={<span className="text-gray-300">No agents found</span>} />
            </div>
          ) : (
            <div className="swiper-slide">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 xx:grid-cols-5 gap-3 md:gap-5">
                {agents.map((agent) => (
                  <div
                    key={agent._id}
                    className="bg-[#3F3F3F] rounded-lg p-4 shadow-lg"
                  >
                    {/* Only the profile header area is a link to the agent's page */}
                    <Link
                      href={`/ConnectwithAgent/${agent._id}`}
                      className="flex items-start gap-3 mb-3"
                    >
                      <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold overflow-hidden">
                        <Image
                          width={300}
                          height={300}
                          src={agent.image || user}
                          className="rounded-md object-cover w-12 h-12"
                          alt={agent.name || 'agent'}
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-white font-semibold">{agent.name}</h3>
                        <p className="text-gray-400 text-sm">{agent.email}</p>
                      </div>
                    </Link>

                    <Link href={`/ConnectwithAgent/${agent._id}`} className="block">
                      <div className="flex items-center gap-1 mb-2">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-white font-semibold">
                          {agent.avgRating?.toFixed ? agent.avgRating.toFixed(1) : agent.avgRating || 0}
                        </span>
                        <span className="text-gray-400 text-sm">
                          ({agent.totalRating || 0} reviews)
                        </span>
                      </div>

                      <p className="text-gray-400 text-sm mb-2 line-clamp-2">
                        {agent.profile?.experiences || 'No experience info provided'}
                      </p>

                      {agent.profile?.areaOfExpertise?.length ? (
                        <div className="flex flex-wrap gap-1 mb-4">
                          {agent.profile.areaOfExpertise.map((tag, idx) => (
                            <span
                              key={idx}
                              className="text-xs bg-[#4a4a4a] text-gray-200 px-2 py-1 rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      ) : null}
                    </Link>

                    <div className="space-y-2">
                      <button
                        type="button"
                        onClick={(e) => handleRequestAgent(e, agent._id)}
                        className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded transition"
                      >
                        Request Agent
                      </button>
                      <button
                        type="button"
                        onClick={(e) => handleMessage(e, agent._id)}
                        className="w-full bg-transparent border border-gray-600 hover:border-gray-500 text-white font-semibold py-2 rounded transition"
                      >
                        Message
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {pagination.total > 0 && (
        <div className="flex justify-end pt-4 pb-1">
          <Pagination
            className="agent-pagination"
            current={pagination.page}
            pageSize={pagination.limit}
            total={pagination.total}
            onChange={handlePageChange}
            // showSizeChanger
            disabled={isFetching}
          />
        </div>
      )}
    </div>
  );
}

export default ConnectwithAgentCards;
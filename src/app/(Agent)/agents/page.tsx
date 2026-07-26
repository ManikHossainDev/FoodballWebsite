"use client"
import Agents from "@/components/Pages/Agents/Agents";
import { useGetAgentsDashboardQuery } from "@/redux/features/agents/agent";

const Page = () => {
  const { data } = useGetAgentsDashboardQuery();
  const stats = data?.data;

  return (
    <div>
      <h2
        className="text-xm md:text-2xl font-bold text-white py-3"
        style={{
          textShadow:
            "0 0 10px #ff0000, 0 0 20px #ff0000, 0 0 30px #ff0000, 0 0 40px #ff0000",
        }}
      >
        Welcome, Agent – Your Agent Hub
      </h2>
      <p className="text-[#8F8F8F]">
        Manage Player Placements, Connect with Clubs, and Track Your Deals
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-8 my-5">
        <div className="bg-[#303030] p-3 rounded-lg w-full text-white font-semibold">
          <h1 className="text-xl">{stats?.activeCount ?? 0}</h1>
          <p>Active Deals</p>
        </div>
        <div className="bg-[#303030] p-3 rounded-lg w-full text-white font-semibold">
          <h1 className="text-xl">{stats?.placementRequest ?? 0}</h1>
          <p>Player Placements Requests</p>
        </div>
        <div className="bg-[#303030] p-3 rounded-lg w-full text-white font-semibold">
          <h1 className="text-xl">{stats?.totalRecommendedPlayer ?? 0}</h1>
          <p>Total Recommended Player</p>
        </div>
      </div>
      <Agents />
    </div>
  );
};

export default Page;
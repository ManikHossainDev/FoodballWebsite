"use client";

import { useGetPlayersStatisticsQuery } from "@/redux/features/player/player";

const TopStatistics = () => {
  const { data } = useGetPlayersStatisticsQuery();
  console.log(data);

  return (
    <div>
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-5 md:gap-8 my-5">
        <div className="bg-[#303030] p-3 rounded-lg w-full text-white font-semibold">
          <h1 className="text-xl">{data?.data?.active}</h1>
          <p className="text-sm md:text-base lg:text-lg">Active Orders</p>
        </div>
        <div className="bg-[#303030] p-3 rounded-lg w-full text-white font-semibold">
          <h1 className="text-xl">{data?.data?.pending}</h1>
          <p className="text-sm md:text-base lg:text-lg">Pending Order</p>
        </div>
        <div className="bg-[#303030] p-3 rounded-lg w-full text-white font-semibold">
          <h1 className="text-xl">{data?.data?.completed}</h1>
          <p className="text-sm md:text-base lg:text-lg">Completed Order</p>
        </div>
        <div className="bg-[#303030] p-3 rounded-lg w-full text-white font-semibold">
          <h1 className="text-xl">{data?.data?.cancelled}</h1>
          <p className="text-sm md:text-base lg:text-lg">Total Canceled</p>
        </div>
      </div>
    </div>
  );
};

export default TopStatistics;

import TopRatings from "@/components/Pages/FootballPlayers/TopRatings ";

const Page = () => {
  return (
    <div>
      <h2
        className="text-xl md:text-2xl font-bold text-white py-3"
        style={{
          textShadow:
            "0 0 10px #ff0000, 0 0 20px #ff0000, 0 0 30px #ff0000, 0 0 40px #ff0000",
        }}
      >
        Welcome, Marcus Silva – Your Football Evolution hub.
      </h2>
      <p className="text-[#8F8F8F]">Manage Your Progress, Connect with Experts, and Advance Your Career</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-8 my-5">
          <div className="bg-[#303030] p-3 rounded-lg w-full text-white font-semibold">
            <h1 className="text-xl">16</h1>
            <p>Total Active Orders</p>
          </div>
          <div className="bg-[#303030] p-3 rounded-lg w-full text-white font-semibold">
            <h1 className="text-xl">16</h1>
            <p>Pending Order</p>
          </div>
          <div className="bg-[#303030] p-3 rounded-lg w-full text-white font-semibold">
            <h1 className="text-xl">16</h1>
            <p>Completed Order </p>
          </div>
          <div className="bg-[#303030] p-3 rounded-lg w-full text-white font-semibold">
            <h1 className="text-xl">16</h1>
            <p>Total Canceled</p>
          </div>
      </div>
      <TopRatings />
    </div>
  );
};

export default Page;

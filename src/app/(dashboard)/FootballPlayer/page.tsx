import TopRatings from "@/components/Pages/FootballPlayers/TopRatings ";
import TopStatistics from "@/components/Pages/FootballPlayers/TopStatistics";


const Page = () => {
  return (
    <div>
      <h2
        className="text-xm xl:text-2xl font-bold text-white py-3"
        style={{
          textShadow:
            "0 0 10px #ff0000, 0 0 20px #ff0000, 0 0 30px #ff0000, 0 0 40px #ff0000",
        }}
      >
        Welcome, Marcus Silva – Your Football Evolution hub.
      </h2>
      <p className="text-[#8F8F8F]">Manage Your Progress, Connect with Experts, and Advance Your Career</p>
      <TopStatistics />
      <TopRatings />
    </div>
  );
};

export default Page;

import PlacementProgressCard from "@/components/Pages/Agents/PlacementProgressCard";

const Page = () => {
  return (
    <div>
      <h2
        className="text-xm md:text-2xl font-bold text-white py-3"
        style={{
          textShadow:
            "0 0 10px #ff0000, 0 0 20px #ff0000, 0 0 30px #ff0000, 0 0 40px #ff0000",
        }}
      >
        Browse and Manage Player Requests
      </h2>
      <p className="text-[#8F8F8F] mb-5">Help Footballers Find the Best Opportunities</p>
      <PlacementProgressCard />
    </div>
  );
};
export default Page;


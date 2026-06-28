
import WorkwithAgentsCard from "@/components/Pages/Club/WorkwithAgentsCard";
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
        Welcome, Club – Your Recruitment Hub
      </h2>
      <p className="text-[#8F8F8F] mb-5">Find Top Talent, Manage Players, and Connect with Agents</p>
      <WorkwithAgentsCard />
    </div>
  );
};

export default Page;
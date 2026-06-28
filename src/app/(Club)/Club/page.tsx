
import Club from "@/components/Pages/Club/Club";
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
        Welcome, Club – Your Recruitment Hub
      </h2>
      <p className="text-[#8F8F8F]">Find Top Talent, Manage Players, and Connect with Agents</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5 md:gap-8 my-5">
          <div className="bg-[#303030] p-3 rounded-lg w-full text-white font-semibold">
            <h1 className="text-xl">16</h1>
            <p>Open Positions</p>
          </div>
          <div className="bg-[#303030] p-3 rounded-lg w-full text-white font-semibold">
            <h1 className="text-xl">16</h1>
            <p>Applications </p>
          </div>
          <div className="bg-[#303030] p-3 rounded-lg w-full text-white font-semibold">
            <h1 className="text-xl">16</h1>
            <p>Total Recommendation</p>
          </div>
      </div>
      < Club />
    </div>
  );
};

export default Page;
import RecommendedPlayers from "@/components/Pages/Agents/RecommendedPlayers";

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
        Recommended Players
      </h2>
      <p className="text-[#8F8F8F] mb-5"> 
        Discover shortlisted players matched to your criteria, performance needs, and recruitment preferences. 
      </p>

     <RecommendedPlayers />
 </div>
 );
};

export default Page;
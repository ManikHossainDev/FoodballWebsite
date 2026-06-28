import HireCoachProfileCards from "@/components/Pages/FootballPlayers/HireCoachProfileCards";
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
        Hire a Coach to Improve Your Skills
      </h2>
      <p className="text-[#8F8F8F] mb-2">Get Expert Feedback on Your Gameplay and Career Advice</p>
      <HireCoachProfileCards  />
 </div>
 );
};
export default Page;
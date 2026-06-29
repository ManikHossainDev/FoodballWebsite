import ExploreClubsDetails from "@/components/Pages/Agents/ExploreClubsDetails";

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
            Club Details
        </h2>
        <ExploreClubsDetails />
 </div>
 );
};
  
export default Page;
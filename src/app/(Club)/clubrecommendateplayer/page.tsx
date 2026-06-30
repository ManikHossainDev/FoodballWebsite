import RecommendatePlayer from "@/components/Pages/Club/RecommendatePlayer";

const Page = () => {
 return (
 <div>
    <h2 className="text-xm md:text-2xl font-bold text-white py-3"
        style={{
            textShadow:"0 0 10px #ff0000, 0 0 20px #ff0000, 0 0 30px #ff0000, 0 0 40px #ff0000",
          }}
        >
            Recommendations
    </h2>
      <p className="text-[#8F8F8F] mb-5">Get matched with the right players.</p>
      
      <RecommendatePlayer />
 </div>
 );
};

export default Page; 
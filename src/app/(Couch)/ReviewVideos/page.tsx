import ReviewVideosCard from "@/components/Pages/Couch/ReviewVideosCard";

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
        Welcome, Coach – Your Coaching Hub
      </h2>
      <p className="text-[#8F8F8F] mb-5">Manage Your Progress, Connect with Experts, and Advance Your Careerr</p>
      <ReviewVideosCard />
    </div>
  );
};

export default Page;
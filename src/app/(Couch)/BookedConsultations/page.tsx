import BookedConsultationscard from "@/components/Pages/Couch/BookedConsultationscard";

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
       Schedule Consultations with Footballers
      </h2>
      <p className="text-[#8F8F8F] mb-5">Offer One-on-One Career Guidance, Mental Coaching, or Technical Sessions</p>
      <BookedConsultationscard />
    </div>
  );
};

export default Page;
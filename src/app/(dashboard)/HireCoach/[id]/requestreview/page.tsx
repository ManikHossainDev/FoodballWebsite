
import icon from '@/assets/HeroBannerSection/Icon.png'
import RequestReviewCard from '@/components/Pages/FootballPlayers/requestreviewCard';
import Image from 'next/image';
import Link from 'next/link';
const Page = () => {
 return (
 <div>
   <h2
        className="text-xl md:text-2xl font-bold text-white pt-1 py-3"
        style={{
          textShadow:
            "0 0 10px #ff0000, 0 0 20px #ff0000, 0 0 30px #ff0000, 0 0 40px #ff0000",
        }}
      >
       <Link className="flex items-center space-x-1" href="/HireCoach">
          <Image className="w-[80px] h-[50px] object-cove -ml-5"  width={100} height={100} alt="image" src={icon} />
        Request Video Review 
       </Link>
      </h2>
      <p className="text-[#8F8F8F] mb-2">Select a video from your uploaded videos and add any specific areas you{"'"}d like the coach to focus on.</p>
      <RequestReviewCard />
 </div>
 );
};
export default Page;
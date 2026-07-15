import icon from '@/assets/HeroBannerSection/Icon.png'
import Image from 'next/image';
import Link from 'next/link';
import BookreviewCard from '@/components/Pages/FootballPlayers/bookreviewCard';
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
       <Link className='flex items-center space-x-1' href="/HireCoach">
          <Image className='w-[80px] h-[50px] object-cove -ml-5'  width={100} height={100} alt='image' src={icon} />
           Book Consultation with David Martinez
       </Link>
      </h2>
      <p className="text-[#8F8F8F] mb-2">Schedule a one-on-one consultation session to discuss your football career, training, or any specific questions.</p>
      <BookreviewCard />
 </div>
 );
};
export default Page;
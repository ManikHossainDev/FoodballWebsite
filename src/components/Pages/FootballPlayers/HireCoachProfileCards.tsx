import React from 'react';
import { Star } from 'lucide-react';
import user from '@/assets/Authentication/user.jpg'
import Image from 'next/image';
import Link from 'next/link';
const HireCoachProfileCards = () => {
  const profilesData = [
    {
      id: 1,
      name: "David Martinez",
      location: "New York, NY",
      rating: 4.9,
      reviews: 87,
      experience: "18 years experience",
      price: "$55/session"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      location: "Los Angeles, CA",
      rating: 4.8,
      reviews: 92,
      experience: "15 years experience",
      price: "$60/session"
    },
    {
      id: 3,
      name: "Michael Chen",
      location: "Chicago, IL",
      rating: 4.9,
      reviews: 78,
      experience: "20 years experience",
      price: "$65/session"
    },
    {
      id: 4,
      name: "Emily Rodriguez",
      location: "Houston, TX",
      rating: 4.7,
      reviews: 65,
      experience: "12 years experience",
      price: "$50/session"
    },
    {
      id: 5,
      name: "James Wilson",
      location: "Phoenix, AZ",
      rating: 4.9,
      reviews: 104,
      experience: "22 years experience",
      price: "$70/session"
    },
    {
      id: 6,
      name: "Amanda Foster",
      location: "Philadelphia, PA",
      rating: 4.8,
      reviews: 89,
      experience: "16 years experience",
      price: "$58/session"
    },
    {
      id: 7,
      name: "Robert Taylor",
      location: "San Antonio, TX",
      rating: 4.6,
      reviews: 71,
      experience: "14 years experience",
      price: "$52/session"
    },
    {
      id: 8,
      name: "Lisa Anderson",
      location: "San Diego, CA",
      rating: 4.9,
      reviews: 96,
      experience: "19 years experience",
      price: "$62/session"
    },
    {
      id: 9,
      name: "Kevin Park",
      location: "Dallas, TX",
      rating: 4.8,
      reviews: 83,
      experience: "17 years experience",
      price: "$56/session"
    },
    {
      id: 10,
      name: "Jennifer Lee",
      location: "San Jose, CA",
      rating: 4.9,
      reviews: 110,
      experience: "21 years experience",
      price: "$68/session"
    },
    {
      id: 11,
      name: "Daniel Brown",
      location: "Austin, TX",
      rating: 4.7,
      reviews: 74,
      experience: "13 years experience",
      price: "$54/session"
    },
    {
      id: 12,
      name: "Maria Garcia",
      location: "Miami, FL",
      rating: 4.9,
      reviews: 101,
      experience: "18 years experience",
      price: "$59/session"
    }
  ];

  return (
    <div className="h-[77vh] bg-[#303030] rounded-md p-2">
      {/* Swiper-like styling */}
      <style>{`
        /* Swiper CSS styles */
        .swiper-container {
          height: 100%;
          position: relative;
          overflow: hidden;
        }
        
        .swiper-wrapper {
          height: 100%;
          overflow-y: auto;
          overflow-x: hidden;
          scroll-behavior: smooth;
        }
        
        /* Swiper free-mode scrollbar styling */
        .swiper-wrapper::-webkit-scrollbar {
          width: 6px;
        }
        
        .swiper-wrapper::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 3px;
        }
        
        .swiper-wrapper::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 3px;
          transition: background 0.3s;
        }
        
        .swiper-wrapper::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.5);
        }
        
        /* Firefox scrollbar */
        .swiper-wrapper {
          scrollbar-width: thin;
          scrollbar-color: rgba(255, 255, 255, 0.3) rgba(255, 255, 255, 0.05);
        }
        
        .swiper-slide {
          height: auto;
        }

        .swiper-wrapper {
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  scroll-behavior: smooth;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.swiper-wrapper::-webkit-scrollbar {
  display: none;
}
      `}</style>

      <div className="swiper-container">
        <div className="swiper-wrapper">
          <div className="swiper-slide">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 xx:grid-cols-5 gap-3 md:gap-5">
              {profilesData.map((profile) => (
                <Link href={`/HireCoach/${1}`}
                  key={profile.id}
                  className="bg-[#3F3F3F] rounded-lg p-4 shadow-lg"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-12 h-12  rounded-full flex items-center justify-center text-white font-semibold">
                      <Image width={300} height={300} src={user} className='rounded-md' alt='user' />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-semibold">{profile.name}</h3>
                      <p className="text-gray-400 text-sm">{profile.location}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 mb-2">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-white font-semibold">{profile.rating}</span>
                    <span className="text-gray-400 text-sm">({profile.reviews} reviews)</span>
                  </div>

                  <p className="text-gray-400 text-sm mb-3">{profile.experience}</p>
                  <p className="text-white font-bold text-lg mb-4">{profile.price}</p>

                  <div className="space-y-2">
                    <Link className='' href={`/HireCoach/requestreview`}>
                      <button className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded transition">
                       Request Review
                      </button>
                    </Link>
                  
                      <div>
                         <Link href={`/HireCoach/bookconsultation`}>
                    <button className="w-full bg-transparent border border-gray-600 hover:border-gray-500 text-white font-semibold py-2 rounded transition">
                      Book Consultation
                    </button>
                 </Link>
                      </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HireCoachProfileCards;
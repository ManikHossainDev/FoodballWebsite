import TestimonialCard from "./TestimonialCard";

const WhatOurCommunitySays = () => {
   const testimonials = [
    {
      id: 1,
      name: "Marcus Silva",
      role: "Professional Player",
      rating: 5,
      text: "FootballConnect transformed my career. The feedback from coaches helped me identify and fix weaknesses I didn't even know I had. Within 6 months, I signed with a professional club!"
    },
    {
      id: 2,
      name: "Marcus Silva",
      role: "Professional Player",
      rating: 5,
      text: "FootballConnect transformed my career. The feedback from coaches helped me identify and fix weaknesses I didn't even know I had. Within 6 months, I signed with a professional club!"
    },
    {
      id: 3,
      name: "Marcus Silva",
      role: "Professional Player",
      rating: 5,
      text: "FootballConnect transformed my career. The feedback from coaches helped me identify and fix weaknesses I didn't even know I had. Within 6 months, I signed with a professional club!"
    }
  ];
 return (
 <div className="responsive-padding py-10 lg:py-20">
     <h2
        className="text-2xl md:text-5xl font-bold text-white mb-6 text-center"
        style={{
          textShadow:
            '0 0 10px #ff0000, 0 0 20px #ff0000, 0 0 30px #ff0000, 0 0 40px #ff0000',
        }}
      >
        What Our Community Says
      </h2>

      <div className="flex justify-center ">
        <h1 className="text-center text-xs  lg:max-w-lg md:text-base lg:text-lg  py-3 text-gray-300 mb-10">
          Join thousands of satisfied users who have advanced their football careers with VISION STRIKER
      </h1>
      </div>

       <div className="w-full bg-black  overflow-hidden">
      {/* Top Row - Left to Right */}
      <div className="mb-8 relative">
        <div className="flex animate-marquee-left hover-pause">
          {[...testimonials, ...testimonials, ...testimonials].map((testimonial, index) => (
            <TestimonialCard key={`top-${index}`} testimonial={testimonial} />
          ))}
        </div>
      </div>
      
      {/* Bottom Row - Right to Left */}
      <div className="relative">
        <div className="flex animate-marquee-right hover-pause">
          {[...testimonials, ...testimonials, ...testimonials].map((testimonial, index) => (
            <TestimonialCard key={`bottom-${index}`} testimonial={testimonial} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
        
        @keyframes marquee-right {
          0% {
            transform: translateX(-33.333%);
          }
          100% {
            transform: translateX(0);
          }
        }
        
        .animate-marquee-left {
          animation: marquee-left 60s linear infinite;
          width: max-content;
        }
        
        .animate-marquee-right {
          animation: marquee-right 30s linear infinite;
          width: max-content;
        }
        
        .hover-pause:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
 </div>
 );
};

export default WhatOurCommunitySays;
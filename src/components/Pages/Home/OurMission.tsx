"use client";
import OurMissionImage from "@/assets/HeroBannerSection/OurMition.png";
import Image from "next/image";
import VisionCards from "./VisionCards";

const OurMission = () => {
  return (
    <div className=" text-white py-16 px-4 lg:pt-20 ">
      <div className="xl:container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 items-center">
          {/* Left side - Image */}
          <div className=" order-2 lg:order-1 relative overflow-hidden">
            <div className="relative group perspective-container">
              {/* Animated border effect */}
              <div className="absolute inset-0 rounded-lg animate-border-glow"></div>

              {/* Player image with unique 3D tilt animation */}
              <div className=" relative animate-tilt-shake">
                <Image
                  src={OurMissionImage}
                  alt="Football player in action with glowing effects"
                  className="relative z-10 w-full h-auto object-cover transform transition-all duration-700 group-hover:scale-110 "
                />
              </div>

              {/* Animated orbiting glow effects */}
              <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-red-500 opacity-20 blur-2xl rounded-full animate-orbit"></div>
              <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-orange-500 opacity-30 blur-2xl rounded-full animate-orbit-reverse"></div>
              <div className="absolute top-1/2 left-1/2 w-20 h-20 bg-yellow-500 opacity-25 blur-xl rounded-full animate-orbit-slow"></div>
            </div>
          </div>

          {/* Right side - Content */}
          <div className="order-1 lg:order-2 space-y-6">
            <h2
              className="text-2xl md:text-5xl font-bold text-white mb-6"
              style={{
                textShadow:
                  "0 0 10px #ff0000, 0 0 20px #ff0000, 0 0 30px #ff0000, 0 0 40px #ff0000",
              }}
            >
              Our Mission
            </h2>

            <p className="text-gray-300 text-xs sm:text-lg leading-relaxed">
              FootballConnect is dedicated to bridging the gap between aspiring
              football players and the resources they need to succeed. We
              provide a comprehensive platform where players can showcase their
              talent, receive expert coaching, get career guidance, and connect
              with clubs looking for new talent.
            </p>

            <p className="text-gray-300 text-xs sm:text-lg leading-relaxed">
              Our platform serves four key communities: players seeking to
              improve, coaches sharing their expertise, career consultants
              guiding futures, and clubs discovering the next generation of
              talent.
            </p>
          </div>
        </div>
        <VisionCards />
      </div>

      <style jsx>{`
        .perspective-container {
          perspective: 1000px;
        }

        @keyframes tilt-shake {
          0%,
          100% {
            transform: perspective(1000px) rotateX(0deg) rotateY(0deg);
          }
          25% {
            transform: perspective(1000px) rotateX(10deg) rotateY(-5deg);
          }
          50% {
            transform: perspective(1000px) rotateX(-5deg) rotateY(5deg);
          }
          75% {
            transform: perspective(1000px) rotateX(5deg) rotateY(0deg);
          }
        }

        @keyframes orbit {
          0% {
            transform: translate(-50%, -50%) rotate(0deg) translateX(100px)
              rotate(0deg);
          }
          100% {
            transform: translate(-50%, -50%) rotate(360deg) translateX(100px)
              rotate(-360deg);
          }
        }

        @keyframes orbit-reverse {
          0% {
            transform: translate(-50%, -50%) rotate(0deg) translateX(80px)
              rotate(0deg);
          }
          100% {
            transform: translate(-50%, -50%) rotate(-360deg) translateX(80px)
              rotate(360deg);
          }
        }

        @keyframes orbit-slow {
          0% {
            transform: translate(-50%, -50%) rotate(0deg) translateX(120px)
              rotate(0deg);
          }
          100% {
            transform: translate(-50%, -50%) rotate(360deg) translateX(120px)
              rotate(-360deg);
          }
        }

        @keyframes border-glow {
          0%,
          100% {
            box-shadow: 0 0 20px rgba(255, 0, 0, 0.5);
          }
          50% {
            box-shadow: 0 0 40px rgba(255, 0, 0, 0.8);
          }
        }

        .animate-tilt-shake {
          animation: tilt-shake 8s ease-in-out infinite;
        }

        .animate-border-glow {
          animation: border-glow 3s ease-in-out infinite;
        }

        .animate-orbit {
          animation: orbit 8s linear infinite;
        }

        .animate-orbit-reverse {
          animation: orbit-reverse 6s linear infinite;
        }

        .animate-orbit-slow {
          animation: orbit-slow 10s linear infinite;
        }
      `}</style>
      
    </div>
  );
};

export default OurMission;
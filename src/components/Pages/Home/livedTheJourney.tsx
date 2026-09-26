import Image from "next/image";
import brianAnunga from "@/assets/HeroBannerSection/brian-anunga.jpeg";

const timelineData = [
  {
    year: "2015",
    title: "Professional beginning",
    description: "Started his professional career with the Wilmington Hammerheads.",
  },
  {
    year: "2017–2019",
    title: "Charleston breakthrough",
    description: "Established himself in the Charleston Battery midfield and earned the club's 2018 Most Valuable Player award.",
  },
  {
    year: "2020–2024",
    title: "Major League Soccer",
    description: "Joined Nashville SC for its inaugural MLS season and brought tenacity, versatility, and defensive presence to the midfield.",
  },
  {
    year: "Today",
    title: "FC Cincinnati",
    description: "Continues competing at the highest level of the American game as a midfielder for FC Cincinnati.",
  },
];

const tags = [
  "DISCIPLINE",
  "RESILIENCE",
  "LEADERSHIP",
  "ADAPTABILITY",
  "CONSISTENCY",
  "OPPORTUNITY",
];

const LivedTheJourney = () => {
  return (
    <section className="relative bg-[#050505] py-16 md:py-20 px-4 sm:px-6 lg:px-8 font-sans border-b border-gray-900 overflow-hidden">
      {/* Background Red Glow - left center */}
      <div className="absolute top-1/4 -left-32 w-[600px] h-[600px] bg-red-900/10 rounded-full blur-[150px] pointer-events-none"></div>
      {/* Top-left red glow shadow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 w-[400px] h-[400px] rounded-full"
        style={{
          background:
            'radial-gradient(circle at top left, rgba(220,20,20,0.30) 0%, rgba(180,0,0,0.12) 45%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      <div className="w-full xl:container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Left Side: Image Section */}
        <div className="relative p-2 rounded-[2.5rem]">
          <div className="relative h-[480px] sm:h-[580px] lg:h-[750px] w-full rounded-[2rem] overflow-hidden border border-red-500">
            <Image
              src={brianAnunga}
              alt="Brian Anunga sitting in a chair"
              fill
              className="object-cover "
              sizes="(max-width: 924px) 100vw, 50vw"
            />
            {/* Image Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
            
            {/* Image Text Overlay */}
            <div className="absolute bottom-8 left-8 right-8">
              <span className="text-red-500 text-xs font-bold tracking-widest uppercase mb-2 block">
                Founder
              </span>
              <h3 className="text-white text-3xl font-bold mb-1">
                Brian Anunga
              </h3>
              <p className="text-gray-400 text-sm">
                Professional footballer • Midfielder
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Content Section */}
        <div className="flex flex-col gap-4">
          
          {/* Eyebrow Tag */}
          <div className="w-max px-4 py-1.5 rounded-full border border-red-900/50 bg-red-950/10">
            <span className="text-red-600 text-[10px] font-bold tracking-widest uppercase">
              The Story Behind The Mission
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-4xl md:text-3xl lg:text-4xl font-black uppercase leading-tight tracking-tight">
            <span className="text-white block">Built by someone who</span>
            <span className="text-red-600 block">Lived the journey</span>
          </h2>

          {/* Paragraphs */}
          <div className="text-gray-400 space-y-4 text-sm leading-relaxed max-w-2xl">
            <p>
              Born in Yaoundé, Cameroon, Brian Anunga progressed from Cameroon&apos;s youth national teams—captaining the U20 side—to the professional game in the United States. His path was not built on one moment. It was built through years of discipline, consistent work, adaptability, and the resilience to keep earning the next opportunity.
            </p>
            <p>
              That experience inspired Evolution Hub: a platform designed to help talented players gain the visibility, guidance, honest feedback, and professional connections that can change a career.
            </p>
          </div>

          {/* Core Values Tags */}
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-2 rounded-full border border-gray-800 bg-[#111] text-gray-300 text-[10px] font-bold tracking-wider uppercase"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Timeline Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            {timelineData.map((item, index) => (
              <div
                key={index}
                className="relative p-6 rounded-2xl border border-gray-800 bg-[#0a0a0a] hover:border-gray-600 transition-colors group"
              >
                {/* Top Right Arrow Icon */}
                <span className="absolute top-5 right-5 text-gray-600 group-hover:text-gray-300 transition-colors">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                </span>
                
                <h4 className="text-red-500 font-bold mb-2 text-sm">{item.year}</h4>
                <h5 className="text-white font-bold mb-3">{item.title}</h5>
                <p className="text-gray-400 text-xs leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default LivedTheJourney;
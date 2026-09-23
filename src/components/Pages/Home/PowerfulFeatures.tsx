import { HiHomeModern } from 'react-icons/hi2';
import { MdVideoLibrary, MdPerson, MdForum, MdAnalytics } from 'react-icons/md';

const PowerfulFeatures = () => {
  const features = [
    {
      icon: <MdVideoLibrary className="w-6 h-6" />,
      title: 'Scouting Video Upload & Review',
      description:
        'Players can upload high-quality gameplay videos, match highlights, and training clips to receive comprehensive frame-by-frame analysis and detailed tactical feedback from verified expert coaches.',
      iconBg: 'bg-blue-500/10',
      iconColor: 'text-blue-500',
    },
    {
      icon: <MdPerson className="w-6 h-6" />,
      title: 'Expert Mentorship',
      description:
        'Connect with experienced professional coaches who provide personalized 1-on-1 guidance, customized training plans, and tactical development strategies to accelerate your football growth.',
      iconBg: 'bg-green-500/10',
      iconColor: 'text-green-500',
    },
    {
      icon: <MdForum className="w-6 h-6" />,
      title: 'Career Consultation',
      description:
        'Get professional advice on your career pathway, contract reviews, and trial preparations from licensed agents and industry consultants through direct messaging and consultations.',
      iconBg: 'bg-purple-500/10',
      iconColor: 'text-purple-500',
    },
    {
      icon: <HiHomeModern className="w-6 h-6" />,
      title: 'Club Recruitment',
      description:
        'Clubs and professional scouts can seamlessly browse verified player profiles, review match statistics, evaluate scouting footage, and directly connect with talent that matches their roster requirements.',
      iconBg: 'bg-orange-500/10',
      iconColor: 'text-orange-500',
    },
    {
      icon: <MdAnalytics className="w-6 h-6" />,
      title: 'Performance & Stats Analytics',
      description:
        'Track your in-game performance, match ratings, physical milestones, and tactical benchmarks with comprehensive data analytics to constantly measure and prove your career progress.',
      iconBg: 'bg-emerald-500/10',
      iconColor: 'text-emerald-500',
    },
  ];

  return (
    <div className="xl:container w-full mx-auto py-10 lg:pb-20">
      <h2
        className="text-2xl md:text-5xl font-bold text-white mb-6 text-center"
        style={{
          textShadow:
            '0 0 10px #ff0000, 0 0 20px #ff0000, 0 0 30px #ff0000, 0 0 40px #ff0000',
        }}
      >
        Powerful Features
      </h2>

      <h1 className="text-xs md:text-base lg:text-lg text-center py-3 text-gray-300 mb-10">
        Everything you need to develop your football career and connect with opportunities
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 md:gap-6">
        {features.map((feature, index) => {
          // Top 3 cards span 2 columns on desktop (2 + 2 + 2 = 6)
          // Bottom 2 cards span 3 columns on desktop (3 + 3 = 6)
          const colClass =
            index < 3
              ? 'col-span-1 md:col-span-1 lg:col-span-2'
              : 'col-span-1 md:col-span-1 lg:col-span-3';

          return (
            <div
              key={index}
              className={`bg-zinc-950 border ${colClass} border-zinc-900 rounded-xl p-4 md:p-6 lg:p-7 transition-all duration-300 hover:border-zinc-700 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/50 flex flex-col justify-start`}
            >
              <div
                className={`w-12 h-12 ${feature.iconBg} rounded-lg flex items-center justify-center mb-5 ${feature.iconColor}`}
              >
                {feature.icon}
              </div>

              <h3 className="text-base md:text-xl font-semibold text-white mb-3">
                {feature.title}
              </h3>

              <p className="text-gray-400 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PowerfulFeatures;

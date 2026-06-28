import { HiHomeModern } from 'react-icons/hi2';
import { MdVideoLibrary, MdPerson, MdForum,  } from 'react-icons/md';

const PowerfulFeatures = () => {
  const features = [
    {
      icon: <MdVideoLibrary className="w-6 h-6" />,
      title: 'Scouting Video Upload & Review',
      description: 'Players can upload gameplay videos and receive detailed feedback from expert coaches.',
      iconBg: 'bg-blue-500/10',
      iconColor: 'text-blue-500',
    },
    {
      icon: <MdPerson className="w-6 h-6" />,
      title: 'Expert Mentorship',
      description: 'Connect with experienced coaches who provide personalized guidance and training plans.',
      iconBg: 'bg-green-500/10',
      iconColor: 'text-green-500',
    },
    {
      icon: <MdForum className="w-6 h-6" />,
      title: 'Career Consultation',
      description: 'Get professional advice on your career path from industry experts through messaging and calls.',
      iconBg: 'bg-purple-500/10',
      iconColor: 'text-purple-500',
    },
    {
      icon: <HiHomeModern className="w-6 h-6" />,
      title: 'Club Recruitment',
      description: 'Clubs can browse player profiles and connect with talent that matches their needs.',
      iconBg: 'bg-orange-500/10',
      iconColor: 'text-orange-500',
    },
  ];

  return (
    <div  className="responsive-padding py-10 lg:pb-20">
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

      <div  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 md:gap-6">
        {features.map((feature, index) => {
          const isLast = index === features.length - 1;
          const isSpecial = index === 0 || index === 2;

          const colClass = isSpecial
            ? 'col-span-1  lg:col-span-1' // balance better across screens
            : isLast
            ? 'col-span-1 lg:col-span-3'
            : 'col-span-1';

          return (
            <div
              key={index}
              className={`bg-zinc-950 border ${colClass} border-zinc-900 rounded-xl p-2 md:p-5 lg:p-8 transition-all duration-300 hover:border-zinc-700 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/50`}
            >
              <div
                className={`w-12 h-12 ${feature.iconBg} rounded-lg flex items-center justify-center mb-6 ${feature.iconColor}`}
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

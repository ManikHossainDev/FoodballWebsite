import { Target, Users, Trophy } from 'lucide-react';

const VisionCards = () => {
  const cards = [
    {
      icon: Target,
      title: "Our Vision",
      description: "To become the world's leading platform for football talent development and recruitment."
    },
    {
      icon: Users,
      title: "Our Community",
      description: "A global network of players, coaches, consultants, and clubs working together."
    },
    {
      icon: Trophy,
      title: "Our Impact",
      description: "Helping thousands of players achieve their dreams and advance their careers."
    }
  ];

  return (
    <div className="flex items-center justify-center lg:p-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-1 lg:gap-8 w-full">
        {cards.map((card, index) => (
          <div 
            key={index}
            className="relative flex flex-col items-center text-center space-y-4 p-4 px-5 lg:px-10 rounded-md border border-gray-900 backdrop-blur-md bg-gray-900/30 transition-all duration-300 hover:border-red-600 hover:shadow-lg hover:shadow-red-600/20 hover:-translate-y-2 hover:backdrop-blur-xl hover:bg-gray-900/50 group"
          >
            <div className="rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
              <card.icon className="w-8 h-8 text-red-600 transition-colors duration-300 group-hover:text-red-500" />
            </div>
            <h3 className="text-red-600 text-lg font-semibold transition-colors duration-300 group-hover:text-red-500">
              {card.title}
            </h3>
            <p className="text-gray-300 text-xs md:text-sm lg:text-[16px] leading-relaxed transition-colors duration-300 group-hover:text-white">
              {card.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VisionCards;
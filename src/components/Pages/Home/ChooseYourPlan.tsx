import { FiCheck } from "react-icons/fi";

const ChooseYourPlan = () => {
    const plans = [
    {
      name: 'Player Basic',
      price: 29,
      description: 'Perfect for aspiring players starting their journey',
      features: [
        'Upload up to 5 videos/month',
        '2 coach reviews/month',
        'Basic performance analytics',
        'Text messaging with coaches',
        'Profile visible to clubs'
      ],
      popular: false
    },
    {
      name: 'Player Pro',
      price: 29,
      description: 'For serious players ready to advance their career',
      features: [
        'Upload up to 5 videos/month',
        'Upload up to 5 videos/month',
        'Upload up to 5 videos/month',
        'Upload up to 5 videos/month',
        'Upload up to 5 videos/month'
      ],
      popular: true
    },
    {
      name: 'Mentor Couch',
      price: 29,
      description: 'Perfect for aspiring players starting their journey',
      features: [
        'Upload up to 5 videos/month',
        '2 coach reviews/month',
        'Basic performance analytics',
        'Text messaging with coaches',
        'Profile visible to clubs'
      ],
      popular: false
    },
    {
      name: 'Consultation expert',
      price: 29,
      description: 'Perfect for aspiring players starting their journey',
      features: [
        'Upload up to 5 videos/month',
        '2 coach reviews/month',
        'Basic performance analytics',
        'Text messaging with coaches',
        'Profile visible to clubs'
      ],
      popular: false
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
        Choose Your Plan
      </h2>

      <div className="flex justify-center ">
        <h1 className="text-center text-xs  lg:max-w-md md:text-base lg:text-lg  py-3 text-gray-300 mb-10">
          Select the perfect plan for your needs. All plans include a
14-day free trial.
        </h1>
      </div>

       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-neutral-950 border-2 rounded-xl p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-red-500/20 cursor-pointer group ${
                plan.popular 
                  ? 'border-red-500' 
                  : 'border-neutral-900 hover:border-red-500'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-black border border-red-500 text-white text-xs font-semibold px-4 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="mb-6">
                <h3 className="text-white text-lg font-semibold mb-2">
                  {plan.name}
                </h3>
                <div className="flex items-baseline mb-3">
                  <span className="text-white text-3xl font-bold">
                    ${plan.price}
                  </span>
                  <span className="text-neutral-400 text-sm ml-1">
                    /month
                  </span>
                </div>
                <p className="text-neutral-400 text-sm leading-relaxed">
                  {plan.description}
                </p>
              <hr className="border-b border-neutral-700 mt-5" />
              </div>


              <div className="space-y-3 mb-8">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <FiCheck className="text-neutral-400 flex-shrink-0 mt-0.5" size={18} />
                    <span className="text-neutral-300 text-sm">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <button className="w-full bg-neutral-900/50 hover:bg-neutral-800 text-white font-medium py-3 rounded-lg transition-colors duration-200 border border-neutral-800 ">
                Get Started
              </button>
            </div>
          ))}
        </div>
 </div>
 );
};

export default ChooseYourPlan;
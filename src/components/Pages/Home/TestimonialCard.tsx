import { Star, User } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  rating: number;
  text: string;
}

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => (
    <div className="bg-zinc-900/50 rounded-lg p-5 lg:p-5 mx-2 md:mx-4 w-60 md:w-96 flex-shrink-0 border border-zinc-900">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-zinc-800 rounded-full p-2">
          <User className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-white font-semibold">{testimonial.name}</h3>
          <p className="text-zinc-400 text-sm">{testimonial.role}</p>
        </div>
      </div>
      
      <div className="flex gap-1 mb-4">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
        ))}
      </div>
      
      <p className="text-zinc-300 text-xs md:text-sm leading-relaxed">{testimonial.text}</p>
    </div>
  );

  export default TestimonialCard

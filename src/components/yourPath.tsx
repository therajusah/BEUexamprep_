import Image from "next/image";
import { ArrowRight } from "lucide-react";

interface YourPathProps {
  className?: string;
}

const YourPath: React.FC<YourPathProps> = ({ className }) => {
  return (
    <div className={`relative py-24 text-white  ${className}`}>
      <div className="absolute inset-0 opacity-10"></div>
      <div className="relative">
        <div className="absolute top-1/4 w-full h-[500px] bg-blue-500 opacity-25 blur-[150px]"></div>
        <div className="absolute bottom-1/4 w-full h-[400px] bg-indigo-500 opacity-25 blur-[120px]"></div>
        <div className="absolute top-0 left-0 w-full h-[300px] bg-teal-500 opacity-15 blur-[100px]"></div>
      </div>
      <div className="relative container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center bg-gradient-to-r from-blue-400 to-teal-300 text-transparent bg-clip-text">
            Your Path to Success
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative rounded-xl overflow-hidden shadow-2xl transition-transform duration-500 hover:scale-105 hover:shadow-blue-500/40">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10"></div>
              <Image
                src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80"
                alt="Students studying"
                className="rounded-xl"
                width={500}
                height={400}
              />
            </div>
            <div className="relative bg-white/10 border border-white/10 backdrop-blur-2xl shadow-xl rounded-2xl p-8 space-y-6 transition-all duration-500 hover:bg-white/5 hover:shadow-lg">
              {[
                "Access comprehensive study materials",
                "Practice with previous year papers",
                "Learn coding through interactive exercises",
                "Track your progress with analytics",
                "Get personalized study recommendations",
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <ArrowRight className="w-6 h-6 text-blue-400 flex-shrink-0 transition-transform duration-300 hover:translate-x-1" />
                  <span className="text-lg text-gray-300">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YourPath;

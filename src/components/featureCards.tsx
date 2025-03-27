import React from "react";
import { BookOpen, Code, FileText } from "lucide-react";

const FeatureCards: React.FC = () => {
  const features = [
    {
      icon: <BookOpen className="w-16 h-16 text-white drop-shadow-lg" />,
      title: "Previous Year Papers",
      description:
        "Access a vast collection of past exam papers with solutions. Prepare effectively with solved papers from previous years.",
    },
    {
      icon: <Code className="w-16 h-16 text-white drop-shadow-lg" />,
      title: "Coding Practice",
      description:
        "Sharpen your programming skills with interactive challenges, real-world projects, and coding competitions designed for all levels.",
    },
    {
      icon: <FileText className="w-16 h-16 text-white drop-shadow-lg" />,
      title: "Study Notes",
      description:
        "Comprehensive study materials prepared by experts to help you understand complex topics in an easy and structured manner.",
    },
  ];

  return (
    <div className="py-20  min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative w-[320px] h-[380px] bg-white/10 border border-white/20 shadow-xl backdrop-blur-lg rounded-3xl flex flex-col items-center text-center font-bold text-white cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-2xl group p-8 hover:border-purple-400"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-30 blur-3xl scale-150 transition-all duration-700 group-hover:opacity-50"></div>

              <div className="relative z-10 flex items-center justify-center mb-6">
                {feature.icon}
              </div>

              <h3 className="text-2xl font-semibold mb-3 tracking-wide">
                {feature.title}
              </h3>
              <p className="text-lg text-gray-300 leading-relaxed px-6">
                {feature.description}
              </p>

              <div className="absolute inset-0 bg-white/5 blur-lg opacity-20 rounded-3xl group-hover:opacity-40"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureCards;

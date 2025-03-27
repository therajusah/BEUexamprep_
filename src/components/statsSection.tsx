"use client";
import React from "react";
import { Users, BookCheck, CheckCircle } from "lucide-react";

const StatsSection: React.FC = () => {
  const stats = [
    {
      number: "10,000+",
      label: "Active Students",
      icon: <Users className="w-12 h-12 text-white drop-shadow-md transition-transform duration-300 hover:scale-105" />,
    },
    {
      number: "1,000+",
      label: "Practice Questions",
      icon: <BookCheck className="w-12 h-12 text-white drop-shadow-md transition-transform duration-300 hover:scale-105" />,
    },
    {
      number: "95%",
      label: "Success Rate",
      icon: <CheckCircle className="w-12 h-12 text-white drop-shadow-md transition-transform duration-300 hover:scale-105" />,
    },
  ];

  return (
    <div className="transition-all duration-1000 ease-in-out bg-gradient-to-br from-slate-700 to-gray-900 py-12 rounded-3xl shadow-lg">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto text-center text-white">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center space-y-3">
              {stat.icon}
              <div className="text-3xl font-extrabold tracking-wide text-white/90 drop-shadow-sm">{stat.number}</div>
              <div className="text-md text-white/80">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsSection;

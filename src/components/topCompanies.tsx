import { Briefcase, Building2, CheckCircle } from "lucide-react";

const topCompanies = () => {
  return (
    <div className="relative py-24 text-white ">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 w-full h-[500px] bg-blue-500 opacity-20 blur-[150px]"></div>
        <div className="absolute bottom-1/4 right-1/3 w-full h-[400px] bg-indigo-500 opacity-20 blur-[120px]"></div>
      </div>

      <div className="relative container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center bg-gradient-to-r from-blue-400 to-teal-300 text-transparent bg-clip-text">
            Prepare for Top Companies
          </h2>

          <div className="grid md:grid-cols-2 gap-12">
            {[
              {
                icon: <Briefcase className="w-8 h-8 text-blue-400" />,
                title: "Technical Interview Prep",
                items: [
                  "Data Structures & Algorithms",
                  "System Design",
                  "Object-Oriented Programming",
                  "Database Management",
                  "Operating Systems",
                ],
              },
              {
                icon: <Building2 className="w-8 h-8 text-blue-400" />,
                title: "Company-Specific Prep",
                items: [
                  "Company-specific question banks",
                  "Interview experiences",
                  "Placement preparation guides",
                  "Mock interviews",
                  "Resume building tips",
                ],
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="relative p-8 rounded-2xl bg-white/8 border border-white/8 backdrop-blur-md shadow-lg transition-transform duration-300 hover:scale-105 hover:bg-white/5"
              >
                <div className="flex items-center mb-6">
                  <div className="p-3 rounded-lg bg-blue-500/20 text-blue-300">
                    {feature.icon}
                  </div>
                  <h3 className="ml-4 text-2xl font-semibold text-white">
                    {feature.title}
                  </h3>
                </div>
                <div className="space-y-4">
                  {feature.items.map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="text-gray-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default topCompanies;

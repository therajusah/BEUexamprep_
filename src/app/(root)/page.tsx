import FeatureCards from "@/components/featureCards";
import StatsSection from "@/components/statsSection";
import YourPath from "@/components/yourPath";
import TopCompanies from "@/components/topCompanies";
import { Search } from "lucide-react";

function App() {
  return (
    <div className="min-h-screen text-white transition-colors duration-300">
      <main className="container mx-auto px-4 pt-10 text-center relative h-screen">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in text-white">
          Welcome to <span className="text-blue-500">BEUexamprep</span>
        </h1>
        <h2 className="text-4xl md:text-5xl font-bold mb-8 animate-fade-in delay-100 text-white">
          Prepare for Your{" "}
          <span className="text-blue-500">University Exams</span>
        </h2>
        <p className="text-xl mb-12 max-w-3xl mx-auto animate-fade-in delay-200 text-white">
          Access notes, previous year questions, and coding practice all in one
          place.
        </p>
        <div className="relative max-w-md mx-auto">
          <input
            type="text"
            placeholder="Search topics, questions..."
            aria-label="Search input"
            className="w-full px-6 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pl-10 bg-white text-gray-800 placeholder-gray-500 text-sm shadow-sm transition-all duration-300 ease-in-out hover:border-blue-400"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 transition-colors duration-300 ease-in-out hover:text-blue-500" />
        </div>
      </main>
      <FeatureCards />
      <StatsSection />
      <YourPath className="pt-20" />
      <TopCompanies />
    </div>
  );
}

export default App;

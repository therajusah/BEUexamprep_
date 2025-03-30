import { Github, GraduationCap, Heart, Linkedin, Mail, X } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative bg-gray-900 text-white py-16 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 w-[40] h-[400px] bg-blue-500 opacity-20 blur-[150px]"></div>
        <div className="absolute bottom-1/4 right-1/3 w-[40%] h-[300px] bg-indigo-500 opacity-20 blur-[120px]"></div>
      </div>

      <div className="relative container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <GraduationCap className="w-8 h-8 text-blue-400" />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-teal-300 text-transparent bg-clip-text">
                BEUexamprep
              </span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Empowering students to achieve their academic and career goals
              through comprehensive study resources.
            </p>
            <div className="flex space-x-4">
              {[
                {
                  icon: Github,
                  href: "https://github.com/therajusah/BEUexamprep_",
                },
                {
                  icon: Linkedin,
                  href: "https://www.linkedin.com/in/therajusah",
                },
                { icon: X, href: "https://x.com/therajusah" },
                { icon: Mail, href: "mailto:devraju0808@gmail.com" },
              ].map(({ icon: Icon, href }, index) => (
                <Link key={index} href={href} className="group">
                  <Icon className="w-5 h-5 text-gray-400 group-hover:text-white transition duration-300 transform group-hover:scale-110" />
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">
              Study Resources
            </h3>
            <ul className="space-y-3">
              {[
                { text: "Notes Library", href: "/notes" },
                { text: "Previous Year Papers", href: "/pyqs" },
                { text: "Coding Practice", href: "/coding-practice" },
                { text: "AI Interview", href: "https://you-prep.vercel.app/" },
                { text: "Blogs", href: "/blogs" },
              ].map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    {item.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { text: "About Us", href: "/about" },
                { text: "Contact", href: "/contact" },
                { text: "FAQs", href: "/faqs" },
                { text: "Privacy Policy", href: "/privacy" },

              ].map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    {item.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">
              Newsletter
            </h3>
            <p className="text-gray-400 mb-4">
              Stay updated with our latest resources and exam tips.
            </p>
            <div className="space-y-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              />
              <button className="w-full bg-gradient-to-r from-blue-500 to-teal-400 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-teal-500 transition-all duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 BEUexamprep. Made with{" "}
            <Heart className="w-4 h-4 inline-block text-red-500" /> for students
          </p>
        </div>
      </div>
    </footer>
  );
}

"use client";

import { HeroSection } from "@/components/ui/hero-section-dark";
import { FeatureCard } from "@/components/ui/grid-feature-cards";
import { BrandsGrid } from "@/components/ui/brands";
import { CTASection } from "@/components/ui/cta-with-rectangle";
import { BookOpen, FileText, Code, Brain, Users, Target, Trophy, TrendingUp, GraduationCap } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

const features = [
  {
    title: 'Previous Year Papers',
    icon: FileText,
    description: 'Access a vast collection of past exam papers with solutions. Prepare effectively with solved papers from previous years.',
  },
  {
    title: 'Coding Practice',
    icon: Code,
    description: 'Sharpen your programming skills with interactive challenges, real-world projects, and coding competitions designed for all levels.',
  },
  {
    title: 'Study Notes',
    icon: BookOpen,
    description: 'Comprehensive study materials prepared by experts to help you understand complex topics in an easy and structured manner.',
  },
  {
    title: 'AI Interview Prep',
    icon: Brain,
    description: 'Practice with AI-powered mock interviews and get personalized feedback to improve your performance.',
  },
  {
    title: 'Progress Tracking',
    icon: TrendingUp,
    description: 'Track your learning progress with detailed analytics and get personalized study recommendations.',
  },
  {
    title: 'Expert Guidance',
    icon: GraduationCap,
    description: 'Learn from experienced faculty and industry experts with proven teaching methodologies.',
  },
];

const stats = [
  {
    name: "Active Students",
    value: "10,000+",
    icon: Users,
  },
  {
    name: "Practice Questions",
    value: "1,000+",
    icon: Target,
  },
  {
    name: "Success Rate",
    value: "95%",
    icon: Trophy,
  },
];

const universities = [
  {
    name: "Delhi University",
    logo: "https://images.unsplash.com/photo-1562774053-701939374585?w=200&h=100&fit=crop",
  },
  {
    name: "Mumbai University",
    logo: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=200&h=100&fit=crop",
  },
  {
    name: "Bangalore University",
    logo: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=200&h=100&fit=crop",
  },
  {
    name: "Pune University",
    logo: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=200&h=100&fit=crop",
  },
  {
    name: "Kolkata University",
    logo: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=200&h=100&fit=crop",
  },
  {
    name: "Chennai University",
    logo: "https://images.unsplash.com/photo-1576495199011-eb94736d05d6?w=200&h=100&fit=crop",
  },
];

type ViewAnimationProps = {
  delay?: number;
  className?: React.ComponentProps<typeof motion.div>['className'];
  children: React.ReactNode;
};

function AnimatedContainer({ className, delay = 0.1, children }: ViewAnimationProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ filter: 'blur(4px)', y: -8, opacity: 0 }}
      whileInView={{ filter: 'blur(0px)', y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function App() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection
        title="Welcome to BEUexamprep"
        subtitle={{
          regular: "Prepare for Your ",
          gradient: "University Exams",
        }}
        description="Access notes, previous year questions, and coding practice all in one place. Your path to academic excellence starts here."
        ctaText="Start Learning"
        ctaHref="#features"
        bottomImage={{
          light: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=800&fit=crop",
          dark: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=800&fit=crop",
        }}
        gridOptions={{
          angle: 65,
          opacity: 0.4,
          cellSize: 50,
          lightLineColor: "#4a4a4a",
          darkLineColor: "#2a2a2a",
        }}
      />

      

      {/* Features Section */}
      <section id="features" className="py-16 md:py-32 relative">
        <div className="absolute top-0 z-[0] h-full w-full bg-blue-50/20 dark:bg-purple-950/10 bg-[radial-gradient(ellipse_20%_80%_at_50%_-20%,rgba(59,130,246,0.06),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_20%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
        
        <div className="mx-auto w-full max-w-5xl space-y-8 px-4 relative z-10">
          <AnimatedContainer className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-wide text-balance md:text-4xl lg:text-5xl xl:font-extrabold">
              Everything You Need to Excel
        </h2>
            <p className="text-muted-foreground mt-4 text-sm tracking-wide text-balance md:text-base">
              Comprehensive resources to help you succeed in your university examinations.
            </p>
          </AnimatedContainer>

          <AnimatedContainer
            delay={0.4}
            className="grid grid-cols-1 divide-x divide-y divide-dashed border border-dashed sm:grid-cols-2 md:grid-cols-3"
          >
            {features.map((feature, i) => (
              <FeatureCard key={i} feature={feature} />
            ))}
          </AnimatedContainer>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 relative">
        <div className="mx-auto w-full max-w-5xl px-4 relative z-10">
          <AnimatedContainer
            delay={0.2}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
                         {stats.map((stat, i) => (
               <div key={i} className="text-center p-6 bg-white/70 dark:bg-background/5 border border-gray-200 dark:border-border backdrop-blur-lg rounded-2xl shadow-lg">
                 <stat.icon className="w-8 h-8 mx-auto mb-4 text-primary" />
                 <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                 <div className="text-muted-foreground">{stat.name}</div>
               </div>
             ))}
          </AnimatedContainer>
        </div>
      </section>

      {/* Universities Section */}
      <BrandsGrid
        brands={universities}
        title="Trusted by students from top universities"
      />

      {/* CTA Section */}
      <CTASection
        badge={{
          text: "Join thousands of successful students"
        }}
        title="Start your exam preparation today"
        description="Access comprehensive study materials, practice questions, and expert guidance to excel in your university exams."
        action={{
          text: "Begin Learning",
          href: "#features",
          variant: "default"
        }}
      />
    </div>
  );
}

export default App;

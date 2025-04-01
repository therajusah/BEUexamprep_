import { motion } from "framer-motion";
import { Button } from "./button";

interface CTASectionProps {
  badge?: {
    text: string;
  };
  title: string;
  description: string;
  action: {
    text: string;
    href: string;
    variant?: "default" | "secondary" | "outline";
  };
}

export const CTASection = ({ badge, title, description, action }: CTASectionProps) => {
  return (
    <section className="py-16 md:py-24 relative">
      <div className="absolute top-0 z-[0] h-full w-full bg-blue-50/20 dark:bg-blue-950/10 bg-[radial-gradient(ellipse_20%_80%_at_50%_-20%,rgba(59,130,246,0.08),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_20%_80%_at_50%_-20%,rgba(59,130,246,0.3),rgba(255,255,255,0))]" />
      
      <div className="mx-auto w-full max-w-4xl px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-8"
        >
          {badge && (
            <div className="inline-flex items-center rounded-full border border-gray-200 dark:border-border bg-white/70 dark:bg-background/50 backdrop-blur-sm px-4 py-2">
              <span className="text-sm text-muted-foreground">{badge.text}</span>
            </div>
          )}
          
          <h2 className="text-3xl font-bold tracking-wide text-balance md:text-4xl lg:text-5xl">
            {title}
          </h2>
          
          <p className="text-muted-foreground text-lg text-balance max-w-2xl mx-auto">
            {description}
          </p>
          
          <div className="flex items-center justify-center">
            <Button 
              asChild 
              variant={action.variant || "default"}
              size="lg"
              className="rounded-full px-8 py-6 text-base font-medium"
            >
              <a href={action.href}>
                {action.text}
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}; 
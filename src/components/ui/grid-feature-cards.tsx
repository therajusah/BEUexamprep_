import { LucideIcon } from "lucide-react";

interface Feature {
  title: string;
  icon: LucideIcon;
  description: string;
}

interface FeatureCardProps {
  feature: Feature;
}

export const FeatureCard = ({ feature }: FeatureCardProps) => {
  const { title, icon: Icon, description } = feature;

  return (
    <div className="group relative overflow-hidden p-8 hover:bg-blue-50/50 dark:hover:bg-accent/5 transition-all duration-300">
      <div className="relative z-10 space-y-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-primary/10 text-blue-600 dark:text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
          <Icon className="h-6 w-6" />
        </div>
        <div className="space-y-3">
          <h3 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-foreground">
            {title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>
      </div>
      <div className="absolute inset-0 border-dashed border-gray-200 dark:border-border opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </div>
  );
}; 
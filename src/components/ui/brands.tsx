import { motion } from "framer-motion";

interface Brand {
  name: string;
  logo: string;
}

interface BrandsGridProps {
  brands: Brand[];
  title?: string;
  description?: string;
}

export const BrandsGrid = ({ 
  brands, 
  title = "Trusted by students from top universities",
  description 
}: BrandsGridProps) => {
  return (
    <section className="py-16 relative">
      <div className="mx-auto w-full max-w-6xl px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-wide text-balance md:text-4xl">
            {title}
          </h2>
          {description && (
            <p className="text-muted-foreground mt-4 text-sm tracking-wide text-balance md:text-base">
              {description}
            </p>
          )}
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {brands.map((brand, index) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="flex items-center justify-center p-4 rounded-lg bg-white/70 dark:bg-background/50 border border-gray-200 dark:border-border hover:bg-blue-50 dark:hover:bg-accent/50 transition-colors duration-300"
            >
              <img
                src={brand.logo}
                alt={brand.name}
                className="h-12 w-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}; 
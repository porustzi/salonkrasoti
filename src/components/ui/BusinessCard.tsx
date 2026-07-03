import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export function Card({ children, className = '', hover = true, onClick }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={hover ? { y: -4 } : undefined}
      onClick={onClick}
      className={`
        rounded-2xl bg-white shadow-soft
        transition-all duration-300
        ${hover ? 'hover:shadow-medium cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}

interface ServiceCardProps {
  image: string;
  title: string;
  description: string;
  duration?: string;
  priceFrom?: string;
  onBook?: () => void;
}

export function ServiceCard({
  image,
  title,
  description,
  duration,
  priceFrom,
  onBook,
}: ServiceCardProps) {
  return (
    <Card className="overflow-hidden group">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-heading font-semibold text-neutral-900 mb-2">{title}</h3>
        <p className="text-neutral-600 text-sm mb-4 line-clamp-2">{description}</p>
        {(duration || priceFrom) && (
          <div className="flex items-center gap-4 text-sm text-neutral-500 mb-4">
            {duration && <span>{duration}</span>}
            {priceFrom && <span className="text-champagne font-semibold"> від {priceFrom}</span>}
          </div>
        )}
        {onBook && (
          <button
            onClick={onBook}
            className="w-full btn-primary text-xs py-3"
          >
            Записатися
          </button>
        )}
      </div>
    </Card>
  );
}

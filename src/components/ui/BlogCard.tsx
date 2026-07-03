import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight } from 'lucide-react';

interface BlogCardProps {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  category?: string;
}

export function BlogCard({
  slug,
  title,
  excerpt,
  image,
  date,
  category,
}: BlogCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group bg-white rounded-2xl shadow-soft overflow-hidden hover:shadow-medium transition-all duration-300"
    >
      <Link to={`/blog/${slug}`}>
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {category && (
            <span className="absolute top-4 left-4 bg-champagne/90 text-neutral-900 text-xs font-medium px-3 py-1 rounded-full">
              {category}
            </span>
          )}
        </div>

        <div className="p-6">
          <div className="flex items-center gap-2 text-sm text-neutral-500 mb-3">
            <Calendar className="w-4 h-4" />
            <time dateTime={date}>{date}</time>
          </div>

          <h3 className="text-xl font-heading font-semibold text-neutral-900 mb-2 group-hover:text-champagne transition-colors">
            {title}
          </h3>

          <p className="text-neutral-600 text-sm mb-4 line-clamp-2">
            {excerpt}
          </p>

          <span className="inline-flex items-center gap-2 text-sm font-medium text-neutral-900 group-hover:text-champagne transition-colors">
            Читати далі
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </motion.article>
  );
}

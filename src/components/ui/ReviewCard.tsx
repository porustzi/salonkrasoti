import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

interface ReviewCardProps {
  author: string;
  rating: number;
  text: string;
  date?: string;
  source?: 'google' | 'instagram';
  avatar?: string;
}

export function ReviewCard({
  author,
  rating,
  text,
  date,
  source = 'google',
}: ReviewCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl p-6 shadow-soft hover:shadow-medium transition-shadow"
    >
      <div className="flex items-center gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-5 h-5 ${
              i < rating ? 'text-champagne fill-champagne' : 'text-neutral-200'
            }`}
          />
        ))}
      </div>

      <p className="text-neutral-700 mb-6 line-clamp-4">{text}</p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-beige flex items-center justify-center text-neutral-600 font-medium">
            {author.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-medium text-neutral-900">{author}</p>
            {date && (
              <p className="text-xs text-neutral-500">{date}</p>
            )}
          </div>
        </div>

        {source === 'google' && (
          <span className="text-xs text-neutral-500 bg-cream px-3 py-1 rounded-full">
            Google
          </span>
        )}
      </div>
    </motion.div>
  );
}

import { motion } from 'framer-motion';
import { Instagram, Award } from 'lucide-react';
import { Button } from './Button';
import { useBooking } from '../../context/BookingContext';

interface TeamCardProps {
  name: string;
  position: string;
  experience?: string;
  specializations?: string[];
  certificates?: string[];
  instagram?: string;
  image: string;
}

export function TeamCard({
  name,
  position,
  experience,
  specializations = [],
  certificates = [],
  instagram,
  image,
}: TeamCardProps) {
  const { openBooking } = useBooking();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group bg-white rounded-2xl shadow-soft overflow-hidden hover:shadow-medium transition-all duration-300"
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {instagram && (
          <a
            href={instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-4 left-4 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center text-neutral-900 hover:bg-white transition-all opacity-0 group-hover:opacity-100"
          >
            <Instagram className="w-5 h-5" />
          </a>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-xl font-heading font-semibold text-neutral-900 mb-1">
          {name}
        </h3>
        <p className="text-champagne font-medium mb-3">{position}</p>

        {experience && (
          <p className="text-sm text-neutral-600 mb-3">
            Досвід: {experience}
          </p>
        )}

        {specializations.length > 0 && (
          <div className="mb-4">
            <p className="text-xs text-neutral-500 mb-2">Спеціалізація:</p>
            <div className="flex flex-wrap gap-2">
              {specializations.map((spec, index) => (
                <span
                  key={index}
                  className="text-xs bg-cream text-neutral-700 px-2 py-1 rounded"
                >
                  {spec}
                </span>
              ))}
            </div>
          </div>
        )}

        {certificates.length > 0 && (
          <div className="flex items-center gap-2 text-sm text-neutral-500 mb-4">
            <Award className="w-4 h-4" />
            <span>{certificates.length} сертифікатів</span>
          </div>
        )}

        <Button onClick={openBooking} size="sm" className="w-full">
          Записатися
        </Button>
      </div>
    </motion.div>
  );
}

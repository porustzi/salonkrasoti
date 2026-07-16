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
      <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.style.display = 'none'
            const parent = e.currentTarget.parentElement
            if (parent) {
              const fallback = parent.querySelector('.team-fallback') as HTMLElement
              if (fallback) fallback.style.display = 'flex'
            }
          }}
        />
        <div className="team-fallback hidden absolute inset-0 items-center justify-center text-neutral-400">
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-neutral-200 flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <span className="text-xs">{name}</span>
          </div>
        </div>
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

        <Button onClick={openBooking} className="w-full">
          Записатися
        </Button>
      </div>
    </motion.div>
  );
}

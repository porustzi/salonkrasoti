import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const CATEGORY_LABELS: Record<string, string> = {
  'all': 'Всі',
  'coloring': 'Фарбування',
  'blonde': 'Блонд',
  'haircuts': 'Стрижки',
  'styling': 'Укладки',
  'long-hair': 'Довге волосся',
  'short-hair': 'Коротке волосся',
  'balayage': 'Баяж',
  'airtouch': 'AirTouch',
  'manicure': 'Манікюр',
  'pedicure': 'Педикюр',
  'makeup': 'Візаж',
  'massage': 'Масаж',
  'laminating': 'Ламінування',
  'keratin': 'Кератин',
  'nail-extensions': 'Наращування нігтів',
  'eyelashes': 'Вії',
  'brows': 'Брови',
  'wedding': 'Весільні зачіски',
  'evening': 'Вечірні зачіски',
  'children': 'Дитячі',
  'other': 'Інше',
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: string;
  width?: number;
  height?: number;
}

interface GalleryGridProps {
  images: GalleryImage[];
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export function GalleryGrid({
  images,
  categories,
  activeCategory,
  onCategoryChange,
}: GalleryGridProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const filteredImages =
    activeCategory === 'all'
      ? images
      : images.filter((img) => img.category === activeCategory);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  const navigate = (direction: 'prev' | 'next') => {
    setCurrentIndex((prev) => {
      if (direction === 'prev') {
        return prev === 0 ? filteredImages.length - 1 : prev - 1;
      }
      return prev === filteredImages.length - 1 ? 0 : prev + 1;
    });
  };

  return (
    <>
      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`
              px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
              ${
                activeCategory === category
                  ? 'bg-neutral-900 text-white'
                  : 'bg-cream text-neutral-700 hover:bg-neutral-200'
              }
            `}
          >
            {CATEGORY_LABELS[category] || category}
          </button>
        ))}
      </div>

      {/* Masonry Grid */}
      <motion.div
        layout
        className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4"
      >
        <AnimatePresence mode="popLayout">
          {filteredImages.map((image, index) => (
            <motion.div
              key={image.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="break-inside-avoid mb-4 group cursor-pointer"
              onClick={() => openLightbox(index)}
            >
              <div className="relative overflow-hidden rounded-xl">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.currentTarget
                    target.style.display = 'none'
                    const parent = target.parentElement
                    if (parent) {
                      const fallback = parent.querySelector('.gallery-fallback') as HTMLElement
                      if (fallback) fallback.style.display = 'flex'
                    }
                  }}
                />
                <div className="gallery-fallback hidden absolute inset-0 bg-neutral-100 rounded-xl items-center justify-center text-neutral-400 text-sm">
                  {image.alt || 'Фото'}
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white p-2 hover:bg-white/10 rounded-full transition-colors z-10"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Navigation */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate('prev');
              }}
              className="absolute left-4 text-white p-3 hover:bg-white/10 rounded-full transition-colors"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate('next');
              }}
              className="absolute right-4 text-white p-3 hover:bg-white/10 rounded-full transition-colors"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            {/* Image */}
            <motion.img
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              src={filteredImages[currentIndex]?.src}
              alt={filteredImages[currentIndex]?.alt}
              className="max-w-[90vw] max-h-[90vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/70 text-sm">
              {currentIndex + 1} / {filteredImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

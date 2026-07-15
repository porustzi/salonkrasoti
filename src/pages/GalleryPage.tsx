import { useState } from 'react';
import { motion } from 'framer-motion';
import { SEO } from '../components/SEO';
import { GalleryGrid, PageHero } from '../components/ui';
import { galleryImages, galleryCategories } from '../data/services';
import { Images } from 'lucide-react';

export function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('all');

  return (
    <>
      <SEO
        title="Галерея"
        description="Галерея робіт салону краси Майстерня Краси в Чернігові. Портфоліо наших майстрів: фарбування, блонд, стрижки, укладки."
      />

      <PageHero
        title="Галерея робіт"
        subtitle="Портфоліо наших майстрів — кожна робота унікальна"
        image="https://images.pexels.com/photos/3622615/pexels-photo-3622615.jpeg?auto=compress&cs=tinysrgb&w=1920"
        icon={Images}
      />

      <section className="section-padding bg-white">
        <div className="container-custom">
          <GalleryGrid
            images={galleryImages}
            categories={galleryCategories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        </div>
      </section>

      {/* Instagram CTA */}
      <section className="py-16 bg-champagne">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="text-neutral-900 text-lg mb-4">
              Ще більше робіт дивіться в нашому Instagram
            </p>
            <a
              href="https://instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-neutral-900 text-white rounded-full font-medium uppercase tracking-wider hover:bg-neutral-800 transition-colors"
            >
              Підписатися
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}

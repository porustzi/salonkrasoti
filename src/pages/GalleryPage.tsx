import { useState } from 'react';
import { motion } from 'framer-motion';
import { SEO } from '../components/SEO';
import { GalleryGrid, PageHero } from '../components/ui';
import { useData } from '../context/DataContext';
import { Images } from 'lucide-react';

export function GalleryPage() {
  const { data } = useData();
  const [activeCategory, setActiveCategory] = useState('all');
  const pg = data.content.pages.gallery;

  return (
    <>
      <SEO
        title="Галерея"
        description="Галерея робіт салону краси Майстерня Краси в Чернігові. Портфоліо наших майстрів: фарбування, блонд, стрижки, укладки."
      />

      <PageHero
        title={pg.title || "Галерея робіт"}
        subtitle={pg.subtitle}
        image={pg.image}
        eyebrow={pg.eyebrow}
        icon={Images}
      />

      <section className="section-padding bg-white">
        <div className="container-custom">
          <GalleryGrid
            images={data.gallery}
            categories={['all', ...new Set(data.gallery.map(i => i.category))]}
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
              {pg.instagramHeading}
            </p>
            <a
              href={data.content.businessInfo.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-neutral-900 text-white rounded-full font-medium uppercase tracking-wider hover:bg-neutral-800 transition-colors"
            >
              {pg.instagramCtaText} {pg.instagramHandle}
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}

import { useState } from 'react';
import { motion } from 'framer-motion';
import { SEO, LocalBusinessSchema } from '../components/SEO';
import { ReviewCard, Button, PageHero } from '../components/ui';
import { useBooking } from '../context/BookingContext';
import { useData } from '../context/DataContext';
import { Star } from 'lucide-react';

const filterOptions = [
  { value: 'all', label: 'Всі відгуки' },
  { value: '5', label: '5 зірок' },
  { value: '4', label: '4 зірки' },
];

export function ReviewsPage() {
  const { openBooking } = useBooking();
  const { data } = useData();
  const [activeFilter, setActiveFilter] = useState('all');
  const bi = data.content.businessInfo;
  const rs = data.content.reviewsSection;

  const filteredReviews =
    activeFilter === 'all'
      ? data.reviews
      : data.reviews.filter((r) => r.rating === parseInt(activeFilter));

  return (
    <>
      <SEO
        title="Відгуки клієнтів — салон краси Майстерня Краси, Чернігів"
        description="Реальні відгуки клієнтів про салон краси Майстерня Краси в Чернігові (ЦУМ). Рейтинг 4.4 на Google за 76 відгуками, рекомендують 86%."
      />
      <LocalBusinessSchema />

      <PageHero
        title={data.content.pages.reviews.title || rs.heading}
        subtitle={data.content.pages.reviews.subtitle || rs.subtitle}
        image={data.content.pages.reviews.image}
        eyebrow={data.content.pages.reviews.eyebrow}
        icon={Star}
      />

      {/* Rating Summary */}
      <section className="py-12 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-cream rounded-2xl p-8 md:p-12 max-w-4xl mx-auto"
          >
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="flex items-center justify-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-8 h-8 ${
                        i < Math.floor(Number(bi.googleRating))
                          ? 'text-champagne fill-champagne'
                          : 'text-neutral-200'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-4xl sm:text-5xl font-heading font-bold text-neutral-900">
                  {bi.googleRating}
                </p>
                <p className="text-neutral-600 mt-1">{data.content.pages.reviews.statRatingLabel || "Середній рейтинг"}</p>
              </div>
              <div className="md:border-l md:border-r border-neutral-200">
                <p className="text-4xl sm:text-5xl font-heading font-bold text-champagne mb-2">
                  {bi.reviewCount}+
                </p>
                <p className="text-neutral-600">{data.content.pages.reviews.statReviewsLabel || "Відгуків на Google"}</p>
              </div>
              <div>
                <p className="text-4xl sm:text-5xl font-heading font-bold text-neutral-900 mb-2">{bi.recommendPercent}</p>
                <p className="text-neutral-600">{data.content.pages.reviews.statRecommendLabel || "Рекомендують нас"}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-cream">
        <div className="container-custom">
          <div className="flex justify-center gap-3">
            {filterOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setActiveFilter(option.value)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeFilter === option.value
                    ? 'bg-neutral-900 text-white'
                    : 'bg-white text-neutral-600 hover:bg-neutral-100'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="section-padding bg-cream">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReviews.map((review) => (
              <ReviewCard
                key={review.id}
                author={review.author}
                rating={review.rating}
                text={review.text}
                date={review.date}
                source={review.source}
              />
            ))}
          </div>

          {filteredReviews.length === 0 && (
            <p className="text-center text-neutral-600 py-12">
              Відгуків з таким рейтингом поки немає
            </p>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-champagne">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-neutral-900 mb-4">
              {rs.ctaHeading}
            </h2>
            <p className="text-neutral-700 mb-6 max-w-md mx-auto">
              {rs.ctaSubtext}
            </p>
            <Button onClick={openBooking} variant="primary" showArrow>
              Записатися на послугу
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
}

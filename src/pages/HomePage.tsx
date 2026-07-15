import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Instagram, MapPin } from 'lucide-react';
import { SEO, LocalBusinessSchema } from '../components/SEO';
import { Button, SectionHeading } from '../components/ui';
import { BUSINESS_INFO } from '../config/constants';
import { useBooking } from '../context/BookingContext';
import { serviceCategories, galleryImages, reviews } from '../data/services';

export function HomePage() {
  const { openBooking } = useBooking();
  const popularServices = serviceCategories.slice(0, 4);
  const previewImages = galleryImages.slice(0, 8);
  const previewReviews = reviews.slice(0, 3);

  return (
    <>
      <SEO />
      <LocalBusinessSchema />

      {/* Hero Section */}
      <section className="relative min-h-[85vh] md:min-h-screen flex items-center overflow-hidden bg-neutral-900">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.pexels.com/photos/2552130/pexels-photo-2552130.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-900/90 via-neutral-900/60 to-neutral-900/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 via-transparent to-neutral-900/40" />
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full border border-champagne/20 z-0 hidden md:block" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full border border-champagne/10 z-0 hidden md:block" />
        <div className="absolute top-1/3 right-1/4 w-48 h-48 rounded-full border border-champagne/15 z-0 hidden md:block" />

        <div className="container-custom relative z-20 pt-16 pb-12 md:pt-24 md:pb-20">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Eyebrow */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex items-center gap-3 mb-6"
              >
                <div className="h-px w-12 bg-champagne" />
                <span className="text-champagne text-sm font-medium tracking-[0.25em] uppercase">
                  Преміум салон краси в Чернігові
                </span>
              </motion.div>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold text-white mb-6 leading-[1.05] tracking-tight"
              >
                {BUSINESS_INFO.name}
              </motion.h1>

              {/* Gold divider */}
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="h-1 w-20 bg-gradient-to-r from-champagne to-transparent rounded-full mb-6 origin-left"
              />

              {/* Tagline */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6 }}
                className="text-xl text-white/70 mb-10 max-w-xl leading-relaxed"
              >
                {BUSINESS_INFO.tagline}. Професійні майстри, преміум матеріали,
                індивідуальний підхід до кожного клієнта.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="flex flex-wrap gap-4"
              >
                <Button onClick={openBooking} showArrow>
                  Записатися онлайн
                </Button>
                <Button to="/pricing" variant="secondary" className="!border-white/40 !text-white hover:!bg-white hover:!text-neutral-900">
                  Наші послуги
                </Button>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
                className="flex flex-wrap items-center gap-8 mt-14"
              >
                <div className="flex items-center gap-2 text-white/70">
                  <MapPin className="w-4 h-4 text-champagne" />
                  <span className="text-sm">{BUSINESS_INFO.address}, {BUSINESS_INFO.city}</span>
                </div>
                <div className="w-px h-4 bg-white/20" />
                <div className="flex items-center gap-1.5 text-white/70">
                  <Star className="w-4 h-4 text-champagne fill-champagne" />
                  <span className="text-sm font-semibold text-white">{BUSINESS_INFO.googleRating}</span>
                  <span className="text-sm">({BUSINESS_INFO.reviewCount}+ відгуків)</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center"
          >
            <div className="w-1.5 h-2 bg-champagne rounded-full mt-2" />
          </motion.div>
        </motion.div>
      </section>

      {/* About Preview */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-large">
                <img
                  src="https://images.pexels.com/photos/3993444/pexels-photo-3993444.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Our salon interior"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative Card */}
              <div className="absolute -bottom-6 -right-6 bg-champagne rounded-2xl p-6 shadow-lg hidden sm:block">
                <p className="text-3xl font-heading font-bold text-neutral-900">15+</p>
                <p className="text-sm text-neutral-700">років досвіду</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-champagne text-sm font-medium tracking-widest uppercase">
                Про наш салон
              </span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-neutral-900 mt-4 mb-6">
                Створюємо красу з 2010 року
              </h2>
              <p className="text-neutral-600 mb-6">
                Майстерня Краси — це преміум салон краси в Чернігові, де кожна клієнтка
                отримує персональну увагу та професійний догляд. Ми використовуємо тільки
                якісні матеріали від провідних світових брендів.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'Професійні майстри з міжнародною підготовкою',
                  'Преміум косметика для волосся',
                  'Сучайне обладнання та затишна атмосфера',
                  'Гарантія якості на всі послуги',
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3 text-neutral-700">
                    <div className="w-2 h-2 rounded-full bg-champagne" />
                    {item}
                  </li>
                ))}
              </ul>
              <Button to="/about" variant="secondary" showArrow>
                Дізнатися більше
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Popular Services */}
      <section className="section-padding bg-cream">
        <div className="container-custom">
          <SectionHeading
            title="Популярні послуги"
            subtitle="Професійні послуги від наших досвідчених майстрів"
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularServices.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  to={`/pricing#${category.id}`}
                  className="group block bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-medium transition-all duration-300"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-heading font-semibold text-lg text-neutral-900 mb-2 group-hover:text-champagne transition-colors">
                      {category.title}
                    </h3>
                    <p className="text-sm text-neutral-600 mb-3 line-clamp-2">
                      {category.description}
                    </p>
                    <span className="text-sm font-medium text-champagne flex items-center gap-1">
                      Детальніше <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button to="/pricing" showArrow>
              Всі послуги
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeading
            title="Наше портфоліо"
            subtitle="Роботи наших майстрів говорять самі за себе"
          />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {previewImages.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className={`relative overflow-hidden rounded-xl ${
                  index === 0 || index === 5 ? 'row-span-2' : ''
                }`}
              >
                <Link to="/gallery">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover aspect-square transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors duration-300" />
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button to="/gallery" variant="secondary" showArrow>
              Дивитися галерею
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Reviews Preview */}
      <section className="section-padding bg-beige">
        <div className="container-custom">
          <SectionHeading
            title="Відгуки клієнтів"
            subtitle={`Більше ${BUSINESS_INFO.reviewCount} задоволених клієнтів`}
          />

          {/* Google Rating Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 shadow-soft mb-8 max-w-md mx-auto text-center"
          >
            <div className="flex items-center justify-center gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-8 h-8 ${
                    i < Math.floor(BUSINESS_INFO.googleRating)
                      ? 'text-champagne fill-champagne'
                      : 'text-neutral-200'
                  }`}
                />
              ))}
            </div>
            <p className="text-4xl font-heading font-bold text-neutral-900">
              {BUSINESS_INFO.googleRating}
            </p>
            <p className="text-neutral-600">
              на основі {BUSINESS_INFO.reviewCount}+ відгуків
            </p>
            <p className="text-sm text-neutral-500 mt-2">Google Reviews</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {previewReviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-soft"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating ? 'text-champagne fill-champagne' : 'text-neutral-200'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-neutral-700 mb-4 line-clamp-4">{review.text}</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-champagne/20 flex items-center justify-center text-champagne font-medium">
                    {review.author.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-neutral-900">{review.author}</p>
                    <p className="text-xs text-neutral-500">{review.date}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button to="/reviews" showArrow>
              Всі відгуки
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Instagram Preview */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeading
            title="Ми в Instagram"
            subtitle="Слідкуйте за нашими роботами та новинами"
          />

          <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
            {galleryImages.slice(0, 6).map((image, index) => (
              <motion.a
                key={image.id}
                href={BUSINESS_INFO.instagram}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="aspect-square overflow-hidden rounded-lg group relative"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Instagram className="w-8 h-8 text-white" />
                </div>
              </motion.a>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-10"
          >
            <Button
              href={BUSINESS_INFO.instagram}
              external
              variant="secondary"
            >
              <Instagram className="w-4 h-4" />
              Підписатися
            </Button>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-neutral-900 text-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
              Готові до перетворення?
            </h2>
            <p className="text-neutral-400 mb-8">
              Запишіться на консультацію або послугу прямо зараз.
              Наші майстри допоможуть створити ваш ідеальний образ.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button onClick={openBooking} variant="gold" showArrow>
                Записатися онлайн
              </Button>
              <Button to="/contacts" variant="ghost">
                Контакти
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

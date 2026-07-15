import { motion } from 'framer-motion';
import { SEO, LocalBusinessSchema } from '../components/SEO';
import { Button, PageHero } from '../components/ui';
import { BOOKING_URL } from '../config/constants';
import { serviceCategories } from '../data/services';
import { Clock, Tag, Info } from 'lucide-react';

export function PricingPage() {
  return (
    <>
      <SEO
        title="Ціни"
        description="Ціни на послуги салону краси Майстерня Краси в Чернігові. Жіночі та чоловічі стрижки, фарбування, блонд, balayage, airtouch, догляд за волоссям."
      />
      <LocalBusinessSchema />

      <PageHero
        title="Ціни на послуги"
        subtitle="Прозорі ціни на всі наші послуги. Ціна залежить від довжини та складності роботи."
        image="https://images.pexels.com/photos/3622614/pexels-photo-3622614.jpeg?auto=compress&cs=tinysrgb&w=1920"
        icon={Tag}
      />

      {/* Quick Navigation */}
      <section className="bg-cream border-b border-neutral-100">
        <div className="container-custom py-8">
          <nav className="flex flex-wrap justify-center gap-2.5">
            {serviceCategories.map((cat) => (
              <a
                key={cat.id}
                href={`#${cat.id}`}
                className="px-4 py-2 text-sm font-medium text-neutral-600 bg-white rounded-full hover:bg-champagne hover:text-neutral-900 transition-all duration-200 shadow-sm"
              >
                {cat.title}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* Service Categories with Prices */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          {serviceCategories.map((category, catIndex) => (
            <motion.section
              key={category.id}
              id={category.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`py-10 md:py-16 ${catIndex > 0 ? 'border-t border-neutral-100' : ''}`}
            >
              <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-start">
                {/* Category Image */}
                <div className={`relative ${catIndex % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-medium lg:sticky lg:top-28">
                    <img
                      src={category.image}
                      alt={category.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6">
                      <h2 className="text-3xl font-heading font-bold text-white mb-2">
                        {category.title}
                      </h2>
                      <p className="text-white/80 text-sm">{category.description}</p>
                    </div>
                  </div>
                </div>

                {/* Services List */}
                <div className="space-y-4">
                  {category.services.map((service, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.08 }}
                      className="group relative bg-white rounded-2xl p-6 shadow-soft hover:shadow-large transition-all duration-300 border border-neutral-100 hover:border-champagne/40 overflow-hidden"
                    >
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-champagne scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-300" />

                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                        <div className="flex-grow">
                          <h3 className="text-lg font-semibold text-neutral-900 mb-2 group-hover:text-champagne transition-colors">
                            {service.name}
                          </h3>
                          <p className="text-neutral-600 text-sm mb-3">
                            {service.description}
                          </p>
                          <div className="flex items-center gap-4 text-sm text-neutral-500">
                            {service.duration && (
                              <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4 text-champagne" />
                                {service.duration}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col items-start sm:items-end gap-2 sm:min-w-[120px]">
                          <div className="flex items-baseline gap-1">
                            <span className="text-3xl font-heading font-bold text-champagne">
                              {service.price}
                            </span>
                            <span className="text-neutral-400 text-sm">грн</span>
                          </div>
                          <Button
                            href={BOOKING_URL}
                            external
                            size="sm"
                            variant="primary"
                          >
                            Записатися
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.section>
          ))}
        </div>
      </section>

      {/* Important Note */}
      <section className="py-16 bg-cream">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 shadow-soft max-w-3xl mx-auto border border-neutral-100"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-champagne/15 flex items-center justify-center">
                <Info className="w-5 h-5 text-champagne" />
              </div>
              <h3 className="font-heading font-semibold text-xl text-neutral-900">
                Важливо знати
              </h3>
            </div>
            <ul className="space-y-3 text-sm text-neutral-600">
              <li className="flex items-start gap-3">
                <span className="text-champagne mt-0.5">•</span>
                Ціни вказані за стандартні послуги та можуть змінюватися залежно від складності
              </li>
              <li className="flex items-start gap-3">
                <span className="text-champagne mt-0.5">•</span>
                Попередній запис на консультацію безкоштовний
              </li>
              <li className="flex items-start gap-3">
                <span className="text-champagne mt-0.5">•</span>
                При собі необхідно мати 50% передоплати для складних процедур
              </li>
              <li className="flex items-start gap-3">
                <span className="text-champagne mt-0.5">•</span>
                Для нових клієнтів діє знижка 10% на перший візит
              </li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-champagne">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-neutral-900 mb-4">
              Не знаєте, що обрати?
            </h2>
            <p className="text-neutral-700 mb-6 max-w-md mx-auto">
              Запишіться на безкоштовну консультацію, і наш майстер допоможе визначитися
            </p>
            <Button href={BOOKING_URL} external variant="primary" showArrow>
              Записатися на консультацію
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
}

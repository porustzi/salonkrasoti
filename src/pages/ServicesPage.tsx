import { motion } from 'framer-motion';
import { SEO, LocalBusinessSchema } from '../components/SEO';
import { Breadcrumbs, SectionHeading, Button } from '../components/ui';
import { BOOKING_URL } from '../config/constants';
import { serviceCategories } from '../data/services';
import { Clock, Tag } from 'lucide-react';

export function ServicesPage() {
  return (
    <>
      <SEO
        title="Послуги"
        description="Послуги салону краси Майстерня Краси в Чернігові: жіночі та чоловічі стрижки, фарбування, блонд, balayage, airtouch, догляд за волоссям."
      />
      <LocalBusinessSchema />

      <div className="pt-28 pb-16 bg-cream">
        <div className="container-custom">
          <Breadcrumbs />
          <SectionHeading
            title="Наші послуги"
            subtitle="Професійні послуги від досвідчених майстрів з використанням преміум матеріалів"
          />
        </div>
      </div>

      {/* Categories Grid */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          {/* Quick Navigation */}
          <nav className="flex flex-wrap justify-center gap-3 mb-16">
            {serviceCategories.map((cat) => (
              <a
                key={cat.id}
                href={`#${cat.id}`}
                className="px-4 py-2 text-sm font-medium text-neutral-600 bg-cream rounded-full hover:bg-champagne hover:text-neutral-900 transition-colors"
              >
                {cat.title}
              </a>
            ))}
          </nav>

          {/* Service Categories */}
          {serviceCategories.map((category, catIndex) => (
            <motion.section
              key={category.id}
              id={category.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`py-16 ${catIndex > 0 ? 'border-t border-neutral-100' : ''}`}
            >
              <div className="grid lg:grid-cols-2 gap-12 items-start">
                {/* Category Image */}
                <div className="relative">
                  <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-medium sticky top-28">
                    <img
                      src={category.image}
                      alt={category.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
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
                      transition={{ delay: index * 0.1 }}
                      className="bg-cream rounded-2xl p-6 hover:shadow-medium transition-all duration-300"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                        <div className="flex-grow">
                          <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                            {service.name}
                          </h3>
                          <p className="text-neutral-600 text-sm mb-3">
                            {service.description}
                          </p>
                          <div className="flex items-center gap-4 text-sm text-neutral-500">
                            {service.duration && (
                              <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {service.duration}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col items-start sm:items-end gap-2">
                          <div className="flex items-center gap-1">
                            <Tag className="w-4 h-4 text-champagne" />
                            <span className="text-2xl font-heading font-bold text-champagne">
                              {service.price}
                            </span>
                            <span className="text-neutral-500 text-sm">грн</span>
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

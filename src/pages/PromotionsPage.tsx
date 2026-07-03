import { motion } from 'framer-motion';
import { SEO } from '../components/SEO';
import { Breadcrumbs, SectionHeading, Button } from '../components/ui';
import { BOOKING_URL } from '../config/constants';
import { promotions } from '../data/services';
import { Tag, Gift, Percent } from 'lucide-react';

export function PromotionsPage() {
  return (
    <>
      <SEO
        title="Акції"
        description="Акції та спеціальні пропозиції від салону краси Майстерня Краси в Чернігові. Знижки, подарункові сертифікати."
      />

      <div className="pt-28 pb-16 bg-cream">
        <div className="container-custom">
          <Breadcrumbs />
          <SectionHeading
            title="Акції та пропозиції"
            subtitle="Спеціальні умови для наших клієнтів"
          />
        </div>
      </div>

      {/* Gift Certificates */}
      <section className="py-12 bg-champagne">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row items-center justify-between gap-6"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-white/30 flex items-center justify-center">
                <Gift className="w-7 h-7 text-neutral-900" />
              </div>
              <div>
                <h2 className="text-2xl font-heading font-bold text-neutral-900">
                  Подарункові сертифікати
                </h2>
                <p className="text-neutral-700">
                  Ідеальний подарунок для близьких на будь-яку суму
                </p>
              </div>
            </div>
            <Button href={BOOKING_URL} external variant="primary">
              Замовити сертифікат
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Promotions Grid */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-6">
            {promotions.map((promo, index) => (
              <motion.div
                key={promo.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-cream rounded-2xl overflow-hidden group hover:shadow-medium transition-all duration-300"
              >
                <div className="aspect-[16/9] overflow-hidden">
                  <img
                    src={promo.image}
                    alt={promo.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Tag className="w-4 h-4 text-champagne" />
                    <span className="text-xs font-medium text-champagne uppercase">
                      Акція
                    </span>
                  </div>
                  <h3 className="text-xl font-heading font-semibold text-neutral-900 mb-2">
                    {promo.title}
                  </h3>
                  <p className="text-neutral-600 text-sm mb-4">{promo.description}</p>
                  <Button href={BOOKING_URL} external size="sm">
                    Скористатися
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Loyalty Program */}
      <section className="section-padding bg-cream">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 md:p-12 max-w-3xl mx-auto"
          >
            <div className="text-center mb-8">
              <Percent className="w-12 h-12 text-champagne mx-auto mb-4" />
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-neutral-900 mb-4">
                Програма лояльності
              </h2>
              <p className="text-neutral-600">
                Постійні клієнти отримують додаткові бонуси
              </p>
            </div>

            <div className="space-y-4">
              {[
                { visits: '5-й візит', discount: '5%', bonus: 'Знижка на будь-яку послугу' },
                { visits: '10-й візит', discount: '10%', bonus: 'Знижка на будь-яку послугу' },
                { visits: '15-й візит', discount: '15%', bonus: 'Знижка + SPA-догляд у подарунок' },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-cream rounded-xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-champagne/10 flex items-center justify-center">
                      <span className="text-champagne font-bold text-sm">{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium text-neutral-900">{item.visits}</p>
                      <p className="text-xs text-neutral-500">{item.bonus}</p>
                    </div>
                  </div>
                  <span className="text-xl font-heading font-bold text-champagne">
                    {item.discount}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

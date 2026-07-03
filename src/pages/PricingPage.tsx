import { motion } from 'framer-motion';
import { SEO, LocalBusinessSchema } from '../components/SEO';
import { Breadcrumbs, SectionHeading, PricingTable } from '../components/ui';
import { serviceCategories } from '../data/services';

export function PricingPage() {
  return (
    <>
      <SEO
        title="Ціни"
        description="Ціни на послуги салону краси Майстерня Краси в Чернігові. Жіночі та чоловічі стрижки, фарбування, блонд, balayage, airtouch, догляд за волоссям."
      />
      <LocalBusinessSchema />

      <div className="pt-28 pb-16 bg-cream">
        <div className="container-custom">
          <Breadcrumbs />
          <SectionHeading
            title="Ціни на послуги"
            subtitle="Прозорі ціни на всі наші послуги. Ціна залежить від довжини та складності роботи."
          />
        </div>
      </div>

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

          {/* Pricing Tables */}
          <div className="max-w-4xl mx-auto space-y-16">
            {serviceCategories.map((category) => (
              <div key={category.id} id={category.id}>
                <PricingTable
                  title={category.title}
                  description={category.description}
                  items={category.services.map((service) => ({
                    service: service.name,
                    duration: service.duration,
                    price: `${service.price} грн`,
                    note: service.description,
                  }))}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Note */}
      <section className="py-12 bg-cream">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 shadow-soft max-w-3xl mx-auto"
          >
            <h3 className="font-heading font-semibold text-lg text-neutral-900 mb-4">
              Важливо знати
            </h3>
            <ul className="space-y-2 text-sm text-neutral-600">
              <li>• Ціни вказані за стандартні послуги та можуть змінюватися залежно від складності</li>
              <li>• Попередній запис на консультацію безкоштовний</li>
              <li>• При собі необхідно мати 50% передоплати для складних процедур</li>
              <li>• Для нових клієнтів діє знижка 10% на перший візит</li>
            </ul>
          </motion.div>
        </div>
      </section>
    </>
  );
}

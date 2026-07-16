import { motion } from 'framer-motion';
import { SEO, LocalBusinessSchema } from '../components/SEO';
import { SectionHeading, Button, PageHero } from '../components/ui';
import { useData } from '../context/DataContext';
import { useBooking } from '../context/BookingContext';
import { Sparkles } from 'lucide-react';

export function AboutPage() {
  const { openBooking } = useBooking();
  const { data } = useData();
  const c = data.content.about;

  return (
    <>
      <SEO title="Про салон" description="Майстерня Краси - преміум салон краси в Чернігові. Історія, місія, цінності, команда професіоналів." />
      <LocalBusinessSchema />

      <PageHero title="Про нашу майстерню" subtitle="Створюємо красу та задоволення вже понад 14 років" image={c.story.image} icon={Sparkles} />

      {/* Main Story */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[3/4] rounded-3xl overflow-hidden">
                <img src={c.story.image} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-champagne rounded-2xl p-6 shadow-lg">
                <p className="text-4xl font-heading font-bold text-neutral-900">{c.story.statNumber}</p>
                <p className="text-sm text-neutral-700">{c.story.statLabel}</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            >
              <span className="text-champagne text-sm font-medium tracking-widest uppercase">{c.story.label}</span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-neutral-900 mt-4 mb-6">{c.story.heading}</h2>
              <div className="space-y-4 text-neutral-600">
                {c.story.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-cream">
        <div className="container-custom">
          <SectionHeading title="Наші цінності" subtitle="Те, що робить нас особливими" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {c.values.map((value, index) => (
              <motion.div
                key={value.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 text-center shadow-soft hover:shadow-medium transition-all"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-champagne/10 flex items-center justify-center">
                  <Sparkles className="w-7 h-7 text-champagne" />
                </div>
                <h3 className="font-heading font-semibold text-lg text-neutral-900 mb-2">{value.title}</h3>
                <p className="text-sm text-neutral-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeading title="Етапи розвитку" subtitle="Наш шлях до досконалості" />
          <div className="max-w-3xl mx-auto">
            {c.timeline.map((item, index) => (
              <motion.div
                key={item.year} initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                className="flex gap-6 mb-8 last:mb-0"
              >
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-champagne flex items-center justify-center text-neutral-900 font-bold text-sm">{item.year}</div>
                  {index < c.timeline.length - 1 && <div className="w-0.5 h-16 bg-neutral-200 mt-2" />}
                </div>
                <div className="bg-cream rounded-xl p-5 flex-grow">
                  <h3 className="font-heading font-semibold text-neutral-900 mb-1">{item.title}</h3>
                  <p className="text-sm text-neutral-600">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section-padding bg-cream">
        <div className="container-custom">
          <SectionHeading title="Чому обирають нас" subtitle="Сучасне обладнання та преміум сервіс" />
          <div className="grid lg:grid-cols-3 gap-8">
            {c.features.map((item, index) => (
              <motion.div
                key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-soft"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="font-heading font-semibold text-lg text-neutral-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-neutral-600">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-neutral-900 text-white">
        <div className="container-custom text-center">
          <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">{c.cta.heading}</h2>
          <p className="text-neutral-400 mb-6 max-w-md mx-auto">{c.cta.text}</p>
          <Button onClick={openBooking} variant="gold" showArrow>{c.cta.ctaText}</Button>
        </div>
      </section>
    </>
  );
}

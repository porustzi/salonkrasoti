import { motion } from 'framer-motion';
import { SEO, LocalBusinessSchema } from '../components/SEO';
import { Breadcrumbs, SectionHeading, Button } from '../components/ui';
import { BOOKING_URL, BUSINESS_INFO } from '../config/constants';
import { Heart, Award, Sparkles, Users } from 'lucide-react';

const timeline = [
  { year: '2010', title: 'Заснування', description: 'Відкриття першого салону в Чернігові' },
  { year: '2014', title: 'Розширення', description: 'Розширення спектру послуг та команди майстрів' },
  { year: '2018', title: 'Новий рівень', description: 'Впровадження нових технік: airtouch, blondage' },
  { year: '2021', title: 'Ребрединг', description: 'Оновлення інтер\'єру та сервісу' },
  { year: '2024', title: 'Сьогодення', description: 'Лідер premium-сегменту в Чернігові' },
];

const values = [
  {
    icon: Heart,
    title: 'Індивідуальний підхід',
    description: 'Кожна клієнтка унікальна. Ми слухаємо ваші побажання та пропонуємо найкращі рішення.',
  },
  {
    icon: Award,
    title: 'Професіоналізм',
    description: 'Наші майстри постійно навчаються та підвищують кваліфікацію.',
  },
  {
    icon: Sparkles,
    title: 'Якість',
    description: 'Преміум матеріали від провідних брендів: Wella, L\'Oreal, Olaplex.',
  },
  {
    icon: Users,
    title: 'Комфорт',
    description: 'Затишна атмосфера, приємний сервіс, напої для клієнтів.',
  },
];

export function AboutPage() {
  return (
    <>
      <SEO
        title="Про салон"
        description="Майстерня Краси - преміум салон краси в Чернігові. Історія, місія, цінності, команда професіоналів."
      />
      <LocalBusinessSchema />

      <div className="pt-28 pb-16 bg-cream">
        <div className="container-custom">
          <Breadcrumbs />
          <SectionHeading
            title="Про нашу майстерню"
            subtitle="Створюємо красу та задоволення вже понад 14 років"
          />
        </div>
      </div>

      {/* Main Story */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[3/4] rounded-3xl overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Salon interior"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-champagne rounded-2xl p-6 shadow-lg">
                <p className="text-4xl font-heading font-bold text-neutral-900">14+</p>
                <p className="text-sm text-neutral-700">років роботи</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-champagne text-sm font-medium tracking-widest uppercase">
                Наша історія
              </span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-neutral-900 mt-4 mb-6">
                {BUSINESS_INFO.name}
              </h2>
              <div className="space-y-4 text-neutral-600">
                <p>
                  Майстерня Краси— це преміум салон краси в Чернігові, який працює з 2010 року.
                  За цей час ми обслугували тисячі клієнток та створили безліч прекрасних образів.
                </p>
                <p>
                  Наша місія — допомогти кожній жінці відчути себе прекрасною. Ми віримо, що
                  краса починається з турботи про себе, і ми раді бути частиною цього процесу.
                </p>
                <p>
                  У нашій команді — професійні майстри, які постійно вдосконалюють свої навички
                  та слідкують за світовими тенденціями. Ми використовуємо тільки преміум
                  матеріали від провідних брендів: Wella, L\'Oreal, Olapex, Schwarzkopf.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-cream">
        <div className="container-custom">
          <SectionHeading
            title="Наші цінності"
            subtitle="Те, що робить нас особливими"
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 text-center shadow-soft hover:shadow-medium transition-all"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-champagne/10 flex items-center justify-center">
                  <value.icon className="w-7 h-7 text-champagne" />
                </div>
                <h3 className="font-heading font-semibold text-lg text-neutral-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-neutral-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeading
            title="Етапи розвитку"
            subtitle="Наш шлях до досконалості"
          />

          <div className="max-w-3xl mx-auto">
            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex gap-6 mb-8 last:mb-0"
              >
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-champagne flex items-center justify-center text-neutral-900 font-bold text-sm">
                    {item.year}
                  </div>
                  {index < timeline.length - 1 && (
                    <div className="w-0.5 h-16 bg-neutral-200 mt-2" />
                  )}
                </div>
                <div className="bg-cream rounded-xl p-5 flex-grow">
                  <h3 className="font-heading font-semibold text-neutral-900 mb-1">
                    {item.title}
                  </h3>
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
          <SectionHeading
            title="Чому обирають нас"
            subtitle="Сучасне обладнання та преміум сервіс"
          />

          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Сучасне обладнання',
                description: 'Ми використовуємо професійне обладнання від провідних виробників. Ультрасучасні фени, стайлери, крісла.',
                image: 'https://images.pexels.com/photos/3293148/pexels-photo-3293148.jpeg?auto=compress&cs=tinysrgb&w=600',
              },
              {
                title: 'Преміум продукція',
                description: 'Тільки якісні фарби та доглядові засоби від Wella, L\'Oreal, Olapex, Schwarzkopf.',
                image: 'https://images.pexels.com/photos/5632406/pexels-photo-5632406.jpeg?auto=compress&cs=tinysrgb&w=600',
              },
              {
                title: 'Професійне навчання',
                description: 'Наші майстри постійно навчаються, відвідують майстер-класи та семінари.',
                image: 'https://images.pexels.com/photos/1522394/pexels-photo-1522394.jpeg?auto=compress&cs=tinysrgb&w=600',
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-soft"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-heading font-semibold text-lg text-neutral-900 mb-2">
                    {item.title}
                  </h3>
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
          <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">
            Запрошуємо на візит
          </h2>
          <p className="text-neutral-400 mb-6 max-w-md mx-auto">
            Переконайтеся особисто в якості нашого сервісу
          </p>
          <Button href={BOOKING_URL} external variant="gold" showArrow>
            Записатися онлайн
          </Button>
        </div>
      </section>
    </>
  );
}

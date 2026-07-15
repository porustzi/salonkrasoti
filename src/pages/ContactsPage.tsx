import { motion } from 'framer-motion';
import { SEO, LocalBusinessSchema } from '../components/SEO';
import { SectionHeading, Button, PageHero } from '../components/ui';
import { BUSINESS_INFO, BOOKING_URL } from '../config/constants';
import { MapPin, Phone, Mail, Clock, Instagram, Navigation } from 'lucide-react';

export function ContactsPage() {
  return (
    <>
      <SEO
        title="Контакти"
        description="Контакти салону краси Майстерня Краси в Чернігові. Адреса, телефон, години роботи, карта проїзду."
      />
      <LocalBusinessSchema />

      <PageHero
        title="Контакти"
        subtitle="Зв'яжіться з нами або відвідайте наш салон"
        image="https://images.pexels.com/photos/8107441/pexels-photo-8107441.jpeg?auto=compress&cs=tinysrgb&w=1920"
        icon={MapPin}
      />

      {/* Contact Info */}
      <section className="section-padding bg-white">
        <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-20">
            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="space-y-8">
                {/* Address */}
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-champagne/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-champagne" />
                  </div>
                  <div>
                    <h3 className="font-medium text-neutral-900 mb-1">Адреса</h3>
                    <p className="text-neutral-600">
                      {BUSINESS_INFO.address}<br />
                      {BUSINESS_INFO.city}, {BUSINESS_INFO.country}<br />
                      <span className="text-champagne">{BUSINESS_INFO.location}</span>
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-champagne/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-champagne" />
                  </div>
                  <div>
                    <h3 className="font-medium text-neutral-900 mb-1">Телефон</h3>
                    <a
                      href={`tel:${BUSINESS_INFO.phone}`}
                      className="text-neutral-600 hover:text-champagne transition-colors"
                    >
                      {BUSINESS_INFO.phone}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-champagne/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-champagne" />
                  </div>
                  <div>
                    <h3 className="font-medium text-neutral-900 mb-1">Email</h3>
                    <a
                      href={`mailto:${BUSINESS_INFO.email}`}
                      className="text-neutral-600 hover:text-champagne transition-colors"
                    >
                      {BUSINESS_INFO.email}
                    </a>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-champagne/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-champagne" />
                  </div>
                  <div>
                    <h3 className="font-medium text-neutral-900 mb-3">Години роботи</h3>
                    <ul className="space-y-1 text-sm">
                      {BUSINESS_INFO.workingHours.map((wh) => (
                        <li key={wh.day} className="flex gap-8">
                          <span className="text-neutral-500 w-24">{wh.day}</span>
                          <span className="text-neutral-700">{wh.hours}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Instagram */}
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-champagne/10 flex items-center justify-center flex-shrink-0">
                    <Instagram className="w-5 h-5 text-champagne" />
                  </div>
                  <div>
                    <h3 className="font-medium text-neutral-900 mb-1">Instagram</h3>
                    <a
                      href={BUSINESS_INFO.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neutral-600 hover:text-champagne transition-colors"
                    >
                      @{BUSINESS_INFO.name.replace(/\s+/g, '_').toLowerCase()}
                    </a>
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-wrap gap-4 mt-10">
                <Button href={BOOKING_URL} external showArrow>
                  Записатися онлайн
                </Button>
                <Button
                  href={BUSINESS_INFO.googleMapsUrl}
                  external
                  variant="secondary"
                >
                  <Navigation className="w-4 h-4" />
                  Прокласти маршрут
                </Button>
              </div>
            </motion.div>

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="h-[300px] sm:h-[400px] lg:h-full min-h-[300px] rounded-2xl overflow-hidden shadow-medium bg-neutral-100"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2427.5!2d31.3!3d51.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTHCsDMwJzAwLjAiTiMzMcKwMTgnMDAuMCJF!5e0!3m2!1sen!2sua!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Майстерня Краси на карті"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-cream">
        <div className="container-custom">
          <SectionHeading
            title="Часті питання"
            subtitle="Відповіді на популярні запитання"
          />

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                q: 'Як записатися на процедуру?',
                a: 'Ви можете записатися онлайн через наш сайт або зателефонувати за номером телефону салону.',
              },
              {
                q: 'Чи працюєте ви у вихідні?',
                a: 'Ми працюємо з понеділка по суботу з 9:00 до 19:00. Неділя — вихідний день.',
              },
              {
                q: 'Чи потрібна передоплата?',
                a: 'Для складних процедур (blondage, airtouch) необхідна передоплата 50%.',
              },
              {
                q: 'Які бренди косметики ви використовуєте?',
                a: 'Ми використовуємо преміум матеріали від Wella, L\'Oreal, Olaplex, Schwarzkopf Professional.',
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6"
              >
                <h3 className="font-medium text-neutral-900 mb-2">{faq.q}</h3>
                <p className="text-sm text-neutral-600">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

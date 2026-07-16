import { motion } from 'framer-motion';
import { SEO, LocalBusinessSchema } from '../components/SEO';
import { SectionHeading, Button, PageHero } from '../components/ui';
import { useBooking } from '../context/BookingContext';
import { useData } from '../context/DataContext';
import { MapPin, Phone, Mail, Clock, Instagram, Navigation } from 'lucide-react';

export function ContactsPage() {
  const { openBooking } = useBooking();
  const { data } = useData();
  const c = data.content.businessInfo;
  const pc = data.content.pages.contacts;
  const faq = data.content.faq;
  return (
    <>
      <SEO
        title="Контакти"
        description="Контакти салону краси Майстерня Краси в Чернігові. Адреса, телефон, години роботи, карта проїзду."
      />
      <LocalBusinessSchema />

      <PageHero
        title={pc.title || "Контакти"}
        subtitle={pc.subtitle}
        image={pc.image}
        eyebrow={pc.eyebrow}
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
                      {c.address}<br />
                      {c.city}, {c.country}<br />
                      <span className="text-champagne">{c.location}</span>
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
                      href={`tel:${c.phone}`}
                      className="text-neutral-600 hover:text-champagne transition-colors"
                    >
                      {c.phone}
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
                      href={`mailto:${c.email}`}
                      className="text-neutral-600 hover:text-champagne transition-colors"
                    >
                      {c.email}
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
                      <li className="text-neutral-700">{c.workingHours}</li>
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
                      href={c.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neutral-600 hover:text-champagne transition-colors"
                    >
                      {c.instagramUsername}
                    </a>
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-wrap gap-4 mt-10">
                <Button onClick={openBooking} showArrow>
                  Записатися онлайн
                </Button>
                <Button
                  href={c.googleMapsUrl}
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
                src={c.googleMapsUrl || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2428.3037495782415!2d31.293044077279!3d51.49787561060903!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x412a6cfd2d0c7c17%3A0xd4a5c0a5c5a5c5a5!2z0KbQo9CcICLQp9C10YDQvdGW0LPRltCyIg!5e0!3m2!1suk!2sua!4v1"}
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
            title={pc.faqHeading || "Часті питання"}
            subtitle="Відповіді на популярні запитання"
          />

          <div className="max-w-3xl mx-auto space-y-4">
            {faq.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6"
              >
                <h3 className="font-medium text-neutral-900 mb-2">{item.question}</h3>
                <p className="text-sm text-neutral-600">{item.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

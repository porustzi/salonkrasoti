import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Instagram, MapPin, Phone, Mail, Clock, ArrowRight } from 'lucide-react';
import { BUSINESS_INFO, BOOKING_URL, SOCIAL_LINKS } from '../../config/constants';

const quickLinks = [
  { path: '/services', label: 'Послуги' },
  { path: '/pricing', label: 'Ціни' },
  { path: '/gallery', label: 'Галерея' },
  { path: '/about', label: 'Про салон' },
  { path: '/team', label: 'Команда' },
  { path: '/reviews', label: 'Відгуки' },
];

const serviceLinks = [
  { path: '/services#womens-haircuts', label: "Жіночі стрижки" },
  { path: '/services#mens-haircuts', label: "Чоловічі стрижки" },
  { path: '/services#coloring', label: "Фарбування" },
  { path: '/services#blonde', label: "Блонд" },
  { path: '/services#balayage', label: "Balayage" },
  { path: '/services#airtouch', label: "Airtouch" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-900 text-white">
      {/* CTA Section */}
      <div className="bg-champagne">
        <div className="container-custom py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row items-center justify-between gap-6"
          >
            <div>
              <h3 className="text-2xl font-heading font-bold text-neutral-900">
                Готові до перетворення?
              </h3>
              <p className="text-neutral-700 mt-1">
                Запишіться на консультацію вже сьогодні
              </p>
            </div>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2"
            >
              Записатися онлайн
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-6">
              <span className="font-heading text-2xl font-bold">
                {BUSINESS_INFO.name}
              </span>
              <span className="block text-xs tracking-widest uppercase text-neutral-400 mt-1">
                Салон краси
              </span>
            </Link>
            <p className="text-neutral-400 text-sm mb-6">
              {BUSINESS_INFO.tagline}
            </p>
            <div className="flex items-center gap-4">
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center hover:bg-champagne transition-colors group"
              >
                <Instagram className="w-5 h-5 text-neutral-400 group-hover:text-neutral-900" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-6">
              Швидкі посилання
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-neutral-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-6">
              Послуги
            </h4>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-neutral-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-6">
              Контакти
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href={BUSINESS_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-neutral-400 hover:text-white transition-colors"
                >
                  <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">
                    {BUSINESS_INFO.address}<br />
                    {BUSINESS_INFO.city}, {BUSINESS_INFO.country}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${BUSINESS_INFO.phone}`}
                  className="flex items-center gap-3 text-neutral-400 hover:text-white transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  <span className="text-sm">{BUSINESS_INFO.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${BUSINESS_INFO.email}`}
                  className="flex items-center gap-3 text-neutral-400 hover:text-white transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  <span className="text-sm">{BUSINESS_INFO.email}</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-neutral-400">
                  <Clock className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">
                    Пн-Пт: 9:00-19:00<br />
                    Сб: 10:00-18:00
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-neutral-800">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-neutral-500 text-sm">
              © {currentYear} {BUSINESS_INFO.name}. Всі права захищені.
            </p>
            <div className="flex items-center gap-6">
              <Link
                to="/privacy"
                className="text-neutral-500 hover:text-white transition-colors text-sm"
              >
                Політика конфіденційності
              </Link>
              <Link
                to="/terms"
                className="text-neutral-500 hover:text-white transition-colors text-sm"
              >
                Умови використання
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

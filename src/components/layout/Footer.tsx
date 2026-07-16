import { Link } from 'react-router-dom';
import { Instagram, MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useBusinessInfo } from '../../lib/businessStore';

const quickLinks = [
  { path: '/pricing', label: 'Ціни' },
  { path: '/gallery', label: 'Галерея' },
  { path: '/about', label: 'Про салон' },
  { path: '/contacts', label: 'Контакти' },
];

const moreLinks = [
  { path: '/team', label: 'Команда' },
  { path: '/reviews', label: 'Відгуки' },
];

const serviceLinks = [
  { path: '/pricing#womens-haircuts', label: "Жіночі стрижки" },
  { path: '/pricing#mens-haircuts', label: "Чоловічі стрижки" },
  { path: '/pricing#coloring', label: "Фарбування" },
  { path: '/pricing#blonde', label: "Блонд" },
  { path: '/pricing#balayage', label: "Balayage" },
  { path: '/pricing#airtouch', label: "Airtouch" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();
  const bi = useBusinessInfo();

  return (
    <footer className="bg-neutral-900 text-white">
      {/* Main Footer */}
      <div className="container-custom py-10 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-6">
              <span className="font-heading text-2xl font-bold">
                {bi.name}
              </span>
              <span className="block text-xs tracking-widest uppercase text-neutral-400 mt-1">
                Салон краси
              </span>
            </Link>
            <p className="text-neutral-400 text-sm mb-6">
              {bi.tagline}
            </p>
            <div className="flex items-center gap-4">
              <a
                href={bi.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center hover:bg-champagne transition-colors group"
              >
                <Instagram className="w-5 h-5 text-neutral-400 group-hover:text-neutral-900" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-6">
              Навігація
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
            <h4 className="text-sm font-semibold uppercase tracking-wider mt-8 mb-4">
              Більше
            </h4>
            <ul className="space-y-3">
              {moreLinks.map((link) => (
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
                  href={bi.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-neutral-400 hover:text-white transition-colors"
                >
                  <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">
                    {bi.address}<br />
                    {bi.city}, {bi.country}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${bi.phone}`}
                  className="flex items-center gap-3 text-neutral-400 hover:text-white transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  <span className="text-sm">{bi.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${bi.email}`}
                  className="flex items-center gap-3 text-neutral-400 hover:text-white transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  <span className="text-sm">{bi.email}</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-neutral-400">
                  <Clock className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">
                    Щодня: 10:00 – 21:00
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Credits badge */}
      <div className="flex justify-center mt-4 mb-8 px-4">
        <div className="relative overflow-hidden rounded-full w-full md:w-auto max-w-xs md:max-w-none mx-auto px-5 py-3 md:py-2.5 bg-white shadow-lg">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-4 -right-3 w-16 h-16 bg-rose-300/50 rounded-full blur-xl" />
            <div className="absolute -bottom-4 -left-3 w-12 h-12 bg-rose-400/40 rounded-full blur-lg" />
            <div className="absolute top-1/4 left-1/3 w-8 h-8 bg-rose-200/30 rounded-full blur-md" />
          </div>
          <a
            href="https://krvtsv.netlify.app"
            target="_blank"
            rel="noopener noreferrer"
            className="relative block text-center text-rose-600 font-bold text-[11px] md:text-[10px] uppercase tracking-widest whitespace-nowrap hover:text-rose-500 hover:scale-105 transition-all duration-200"
          >
            РОЗРОБЛЕНО KRVTSV CORP
          </a>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-neutral-800">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-neutral-500 text-sm">
              © {currentYear} {bi.name}. Всі права захищені.
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

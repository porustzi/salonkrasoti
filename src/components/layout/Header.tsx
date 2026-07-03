import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, Calendar } from 'lucide-react';
import { BUSINESS_INFO, BOOKING_URL } from '../../config/constants';

const navLinks = [
  { path: '/', label: 'Головна' },
  { path: '/services', label: 'Послуги' },
  { path: '/pricing', label: 'Ціни' },
  { path: '/gallery', label: 'Галерея' },
  { path: '/about', label: 'Про салон' },
  { path: '/team', label: 'Команда' },
  { path: '/reviews', label: 'Відгуки' },
  { path: '/blog', label: 'Блог' },
  { path: '/promotions', label: 'Акції' },
  { path: '/contacts', label: 'Контакти' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        className={`
          fixed top-0 left-0 right-0 z-50 transition-all duration-300
          ${isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-soft' : 'bg-transparent'}
        `}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-20 lg:h-24">
            {/* Logo */}
            <Link to="/" className="relative z-10">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col"
              >
                <span className={`font-heading text-2xl font-bold tracking-tight ${
                  isScrolled ? 'text-neutral-900' : 'text-neutral-900'
                }`}>
                  {BUSINESS_INFO.name}
                </span>
                <span className={`text-xs tracking-widest uppercase ${
                  isScrolled ? 'text-neutral-500' : 'text-neutral-600'
                }`}>
                  Салон краси
                </span>
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`
                    text-sm font-medium transition-colors duration-200 relative
                    ${location.pathname === link.path
                      ? 'text-champagne'
                      : isScrolled
                        ? 'text-neutral-700 hover:text-neutral-900'
                        : 'text-neutral-700 hover:text-neutral-900'
                    }
                  `}
                >
                  {link.label}
                  {location.pathname === link.path && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-champagne rounded-full"
                    />
                  )}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href={`tel:${BUSINESS_INFO.phone}`}
                className="flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>{BUSINESS_INFO.phone}</span>
              </a>
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-xs py-3"
              >
                <Calendar className="w-4 h-4" />
                Запис онлайн
              </a>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 relative z-10"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className={`w-6 h-6 ${isScrolled ? 'text-neutral-900' : 'text-neutral-900'}`} />
              ) : (
                <Menu className={`w-6 h-6 ${isScrolled ? 'text-neutral-900' : 'text-neutral-900'}`} />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-white lg:hidden"
          >
            <div className="flex flex-col h-full pt-24 pb-8 px-6 overflow-y-auto">
              <nav className="flex flex-col gap-1">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      to={link.path}
                      className={`
                        block py-3 text-lg font-medium transition-colors
                        ${location.pathname === link.path
                          ? 'text-champagne'
                          : 'text-neutral-700'
                        }
                      `}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="mt-auto space-y-4">
                <a
                  href={`tel:${BUSINESS_INFO.phone}`}
                  className="flex items-center gap-2 text-neutral-600"
                >
                  <Phone className="w-5 h-5" />
                  <span>{BUSINESS_INFO.phone}</span>
                </a>

                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full justify-center"
                >
                  <Calendar className="w-4 h-4" />
                  Записатися онлайн
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, Calendar, ChevronDown } from 'lucide-react';
import { useBusinessInfo } from '../../lib/businessStore';
import { useBooking } from '../../context/BookingContext';

interface NavItem {
  path: string;
  label: string;
}

interface NavGroup {
  label: string;
  children: NavItem[];
}

type NavEntry = NavItem | NavGroup;

const isGroup = (e: NavEntry): e is NavGroup => 'children' in e;

const navEntries: NavEntry[] = [
  { path: '/', label: 'Р“РѕР»РѕРІРЅР°' },
  { path: '/pricing', label: 'Р¦С–РЅРё' },
  { path: '/gallery', label: 'Р“Р°Р»РµСЂРµСЏ' },
  {
    label: 'РџСЂРѕ РЅР°СЃ',
    children: [
      { path: '/about', label: 'РџСЂРѕ СЃР°Р»РѕРЅ' },
      { path: '/team', label: 'РљРѕРјР°РЅРґР°' },
      { path: '/reviews', label: 'Р’С–РґРіСѓРєРё' },
    ],
  },
  { path: '/contacts', label: 'РљРѕРЅС‚Р°РєС‚Рё' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const { openBooking } = useBooking();
  const bi = useBusinessInfo();
  const location = useLocation();
  const dropdownTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
  }, [location.pathname]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isMobileMenuOpen]);

  const isActive = (path: string) => location.pathname === path;

  const isGroupActive = (group: NavGroup) =>
    group.children.some((c) => isActive(c.path));

  const handleDropdownEnter = (label: string) => {
    if (dropdownTimer.current) clearTimeout(dropdownTimer.current);
    setOpenDropdown(label);
  };

  const handleDropdownLeave = () => {
    if (dropdownTimer.current) clearTimeout(dropdownTimer.current);
    dropdownTimer.current = setTimeout(() => setOpenDropdown(null), 150);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-soft'
            : 'bg-white/80 backdrop-blur-sm'
        }`}
      >
        {/* Top accent line */}
        <div className="h-0.5 bg-gradient-to-r from-transparent via-champagne/60 to-transparent" />

        <div className="container-custom">
          <div className="flex items-center justify-between h-20 lg:h-24">
            {/* Logo */}
            <Link to="/" className="relative z-10 group">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col"
              >
                <span className="font-heading text-2xl font-bold tracking-tight text-neutral-900 leading-none">
                  {bi.name}
                </span>
                <span className="text-[0.65rem] tracking-[0.25em] uppercase text-champagne mt-1.5 font-medium">
                  РЎР°Р»РѕРЅ РєСЂР°СЃРё
                </span>
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-7">
              {navEntries.map((entry) => {
                if (isGroup(entry)) {
                  const active = isGroupActive(entry);
                  return (
                    <div
                      key={entry.label}
                      className="relative"
                      onMouseEnter={() => handleDropdownEnter(entry.label)}
                      onMouseLeave={handleDropdownLeave}
                    >
                      <button
                        className={`flex items-center gap-1 text-sm font-medium transition-colors duration-200 py-2 ${
                          active
                            ? 'text-champagne'
                            : 'text-neutral-700 hover:text-neutral-900'
                        }`}
                      >
                        {entry.label}
                        <ChevronDown
                          className={`w-3.5 h-3.5 transition-transform duration-200 ${
                            openDropdown === entry.label ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      <AnimatePresence>
                        {openDropdown === entry.label && (
                          <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 8 }}
                            transition={{ duration: 0.18 }}
                            className="absolute top-full left-1/2 -translate-x-1/2 pt-2"
                          >
                            <div className="bg-white rounded-xl shadow-large border border-neutral-100 overflow-hidden min-w-[180px] py-2">
                              {entry.children.map((child) => (
                                <Link
                                  key={child.path}
                                  to={child.path}
                                  className={`block px-5 py-2.5 text-sm transition-colors duration-150 ${
                                    isActive(child.path)
                                      ? 'text-champagne bg-cream'
                                      : 'text-neutral-700 hover:text-champagne hover:bg-cream'
                                  }`}
                                >
                                  {child.label}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                      {active && (
                        <motion.div
                          layoutId="nav-indicator"
                          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-champagne rounded-full"
                        />
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={entry.path}
                    to={entry.path}
                    className={`text-sm font-medium transition-colors duration-200 relative py-2 ${
                      isActive(entry.path)
                        ? 'text-champagne'
                        : 'text-neutral-700 hover:text-neutral-900'
                    }`}
                  >
                    {entry.label}
                    {isActive(entry.path) && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-champagne rounded-full"
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Actions */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href={`tel:${bi.phone}`}
                className="flex items-center gap-2 text-sm text-neutral-600 hover:text-champagne transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>{bi.phone}</span>
              </a>
              <button
                onClick={openBooking}
                className="btn-primary text-sm py-3.5"
              >
                <Calendar className="w-4 h-4" />
                Р—Р°РїРёСЃ РѕРЅР»Р°Р№РЅ
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-3 relative z-10"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-neutral-900" />
              ) : (
                <Menu className="w-6 h-6 text-neutral-900" />
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
            className="fixed inset-0 z-40 bg-white lg:hidden overflow-y-auto"
          >
            <div className="flex flex-col min-h-full pt-24 pb-8 px-6">
              <nav className="flex flex-col">
                {navEntries.map((entry, index) => {
                  if (isGroup(entry)) {
                    return (
                      <div key={entry.label}>
                        <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400 pt-5 pb-2">
                          {entry.label}
                        </p>
                        {entry.children.map((child, ci) => (
                          <motion.div
                            key={child.path}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.04 + ci * 0.04 }}
                          >
                            <Link
                              to={child.path}
                              className={`block py-3.5 text-base font-medium transition-colors ${
                                isActive(child.path)
                                  ? 'text-champagne'
                                  : 'text-neutral-700'
                              }`}
                            >
                              {child.label}
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    );
                  }
                  return (
                    <motion.div
                      key={entry.path}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.04 }}
                    >
                      <Link
                        to={entry.path}
                          className={`block py-4 text-lg font-medium transition-colors ${
                          isActive(entry.path)
                            ? 'text-champagne'
                            : 'text-neutral-700'
                        }`}
                      >
                        {entry.label}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              <div className="mt-auto space-y-4 pt-8">
                <a
                  href={`tel:${bi.phone}`}
                  className="flex items-center gap-2 text-neutral-600 py-3"
                >
                  <Phone className="w-5 h-5" />
                  <span>{bi.phone}</span>
                </a>

                <button
                  onClick={() => { openBooking(); setIsMobileMenuOpen(false); }}
                  className="btn-primary w-full justify-center"
                >
                  <Calendar className="w-4 h-4" />
                  Р—Р°РїРёСЃР°С‚РёСЃСЏ РѕРЅР»Р°Р№РЅ
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </>
  );
}


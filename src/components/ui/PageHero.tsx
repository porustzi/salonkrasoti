import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useBusinessInfo } from '../../lib/businessStore';

const routeLabels: Record<string, string> = {
  '/services': 'Послуги',
  '/pricing': 'Ціни',
  '/gallery': 'Галерея',
  '/about': 'Про салон',
  '/team': 'Наша команда',
  '/reviews': 'Відгуки',

  '/contacts': 'Контакти',
  '/book': 'Онлайн запис',
  '/privacy': 'Політика конфіденційності',
  '/terms': 'Умови використання',
};

interface PageHeroProps {
  title: string;
  subtitle?: string;
  image?: string;
  eyebrow?: string;
  icon?: LucideIcon;
}

interface BreadcrumbItem {
  label: string;
  path?: string;
}

export function PageHero({ title, subtitle, image, eyebrow, icon: Icon }: PageHeroProps) {
  const bi = useBusinessInfo();
  const pathnames = window.location.pathname.split('/').filter((x) => x);

  const breadcrumbs: BreadcrumbItem[] = [
    { label: bi.name, path: '/' },
  ];
  let currentPath = '';
  pathnames.forEach((pathname) => {
    currentPath += `/${pathname}`;
    const label = routeLabels[currentPath] || decodeURIComponent(pathname);
    breadcrumbs.push({ label, path: currentPath });
  });

  return (
    <section className="relative overflow-hidden bg-neutral-900">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src={image || 'https://images.pexels.com/photos/2552130/pexels-photo-2552130.jpeg?auto=compress&cs=tinysrgb&w=1920'}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/80 via-neutral-900/70 to-neutral-900/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-900/70 to-transparent" />
      </div>

      {/* Decorative gold orbs */}
      <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full border border-champagne/15 z-0" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full border border-champagne/10 z-0" />

      <div className="container-custom relative z-10 pt-32 pb-20 md:pt-40 md:pb-28">
        {/* Breadcrumbs (light) */}
        <motion.nav
          aria-label="Breadcrumb"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <ol className="flex items-center gap-2 text-sm">
            {breadcrumbs.map((item, index) => {
              const isLast = index === breadcrumbs.length - 1;
              return (
                <li key={item.path || index} className="flex items-center gap-2">
                  {index > 0 && (
                    <ChevronRight className="w-4 h-4 text-white/40" />
                  )}
                  {index === 0 && <Home className="w-4 h-4 text-white/60" />}
                  {!isLast && item.path ? (
                    <Link
                      to={item.path}
                      className="text-white/60 hover:text-white transition-colors"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span className="text-champagne font-medium">
                      {item.label}
                    </span>
                  )}
                </li>
              );
            })}
          </ol>
        </motion.nav>

        <div className="max-w-2xl">
          {/* Icon badge */}
          {Icon && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-2xl border border-champagne/30 bg-champagne/10 backdrop-blur-sm"
            >
              <Icon className="w-7 h-7 text-champagne" />
            </motion.div>
          )}

          {/* Eyebrow */}
          {eyebrow && (
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-sm font-medium uppercase tracking-[0.2em] text-champagne mb-4"
            >
              {eyebrow}
            </motion.p>
          )}

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white leading-[1.1] tracking-tight"
          >
            {title}
          </motion.h1>

          {/* Gold divider */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="h-px w-24 bg-gradient-to-r from-champagne to-transparent my-6"
          />

          {/* Subtitle */}
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-lg text-white/70 max-w-xl"
            >
              {subtitle}
            </motion.p>
          )}
        </div>
      </div>
    </section>
  );
}

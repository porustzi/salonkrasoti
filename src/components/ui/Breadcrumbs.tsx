import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { BUSINESS_INFO } from '../../config/constants';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

const routeLabels: Record<string, string> = {
  '/services': 'Послуги',
  '/pricing': 'Ціни',
  '/gallery': 'Галерея',
  '/about': 'Про салон',
  '/team': 'Наша команда',
  '/reviews': 'Відгуки',
  '/blog': 'Блог',
  '/promotions': 'Акції',
  '/contacts': 'Контакти',
  '/book': 'Онлайн запис',
  '/privacy': 'Політика конфіденційності',
  '/terms': 'Умови використання',
};

export function Breadcrumbs({ variant = 'dark' }: { variant?: 'dark' | 'light' }) {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const breadcrumbs: BreadcrumbItem[] = [
    { label: BUSINESS_INFO.name, path: '/' },
  ];

  let currentPath = '';
  pathnames.forEach((pathname) => {
    currentPath += `/${pathname}`;
    const label = routeLabels[currentPath] || decodeURIComponent(pathname);
    breadcrumbs.push({ label, path: currentPath });
  });

  if (breadcrumbs.length <= 1) return null;

  const muted = variant === 'light' ? 'text-white/60' : 'text-neutral-400';
  const dim = variant === 'light' ? 'text-white/80' : 'text-neutral-500';
  const active = variant === 'light' ? 'text-white' : 'text-neutral-900';
  const hover = variant === 'light' ? 'hover:text-white' : 'hover:text-neutral-900';

  return (
    <nav aria-label="Breadcrumb" className="py-4">
      <ol className="flex items-center gap-2 text-sm">
        {breadcrumbs.map((item, index) => {
          const isLast = index === breadcrumbs.length - 1;

          return (
            <li key={item.path || index} className="flex items-center gap-2">
              {index > 0 && (
                <ChevronRight className={`w-4 h-4 ${muted}`} />
              )}
              {index === 0 && (
                <Home className={`w-4 h-4 ${dim}`} />
              )}
              {!isLast && item.path ? (
                <Link
                  to={item.path}
                  className={`${dim} ${hover} transition-colors`}
                >
                  {item.label}
                </Link>
              ) : (
                <span className={`${active} font-medium`}>
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

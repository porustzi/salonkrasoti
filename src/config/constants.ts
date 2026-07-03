// Global configuration for the salon website

export const BUSINESS_INFO = {
  name: 'Майстерня Краси',
  tagline: 'Створюємо красу, цінуємо індивідуальність',
  address: 'Проспект Миру 49',
  city: 'Чернігів',
  country: 'Україна',
  location: 'ЦУМ Чернігів',
  phone: '+380 (XX) XXX-XX-XX',
  email: 'info@maisternya-krasy.ua',
  instagram: 'https://instagram.com/maisternya_krasy',
  workingHours: [
    { day: 'Понеділок', hours: '09:00 - 19:00' },
    { day: 'Вівторок', hours: '09:00 - 19:00' },
    { day: 'Середа', hours: '09:00 - 19:00' },
    { day: 'Четвер', hours: '09:00 - 19:00' },
    { day: 'П\'ятниця', hours: '09:00 - 20:00' },
    { day: 'Субота', hours: '10:00 - 18:00' },
    { day: 'Неділя', hours: 'Вихідний' },
  ],
  googleMapsUrl: 'https://maps.google.com/?q=Проспект+Миру+49,+Чернігів',
  googleRating: 4.8,
  reviewCount: 409,
} as const;

// Booking URL - redirects to Beauty Pro Software
export const BOOKING_URL = 'https://YOUR-BEAUTY-PRO-SOFTWARE-LINK';

// Social media links
export const SOCIAL_LINKS = {
  instagram: BUSINESS_INFO.instagram,
} as const;

// SEO defaults
export const SEO_DEFAULTS = {
  siteName: BUSINESS_INFO.name,
  siteUrl: 'https://maisternya-krasy.ua',
  defaultTitle: 'Майстерня Краси - Преміум салон краси в Чернігові',
  defaultDescription: 'Майстерня Краси - преміум салон краси в Чернігові. Професійні послуги: стрижки, фарбування, блонд, balayage, airtouch. Запишіться онлайн!',
  defaultImage: '/images/og-image.jpg',
} as const;

// Animation durations
export const ANIMATION = {
  fast: 0.2,
  normal: 0.3,
  slow: 0.5,
  verySlow: 0.8,
} as const;

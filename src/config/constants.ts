// Global configuration for the salon website

export const BUSINESS_INFO = {
  name: 'Майстерня Краси',
  tagline: 'Салон краси без стереотипів',
  address: 'Проспект Миру 49',
  city: 'Чернігів',
  country: 'Україна',
  location: 'ЦУМ "Чернігів", 2 поверх',
  phone: '+380 (63) 844-77-25',
  email: 'maysternya.krasy@gmail.com',
  instagram: 'https://instagram.com/maysternya_krasy1',
  workingHours: [
    { day: 'Понеділок', hours: '10:00 - 21:00' },
    { day: 'Вівторок', hours: '10:00 - 21:00' },
    { day: 'Середа', hours: '10:00 - 21:00' },
    { day: 'Четвер', hours: '10:00 - 21:00' },
    { day: 'П\'ятниця', hours: '10:00 - 21:00' },
    { day: 'Субота', hours: '10:00 - 21:00' },
    { day: 'Неділя', hours: '10:00 - 21:00' },
  ],
  googleMapsUrl: 'https://maps.google.com/?q=ЦУМ+Чернігів,+проспект+Миру+49,+Чернігів',
  googleRating: 4.4,
  reviewCount: 76,
} as const;

// Booking URL - redirects to Instagram Direct
export const BOOKING_URL = 'https://instagram.com/maysternya_krasy1';

// Social media links
export const SOCIAL_LINKS = {
  instagram: BUSINESS_INFO.instagram,
} as const;

// SEO defaults
export const SEO_DEFAULTS = {
  siteName: BUSINESS_INFO.name,
  siteUrl: 'https://salonkrasoti.pages.dev',
  defaultTitle: 'Майстерня Краси - Салон краси в Чернігові | Стрижки, фарбування, манікюр',
  defaultDescription: 'Майстерня Краси - салон краси в Чернігові. 14 майстрів, 10 років досвіду. Професійні послуги: стрижки, фарбування, манікюр, педикюр, візаж, масаж. Запишіться онлайн!',
  defaultImage: '/images/og-image.jpg',
} as const;

// Animation durations
export const ANIMATION = {
  fast: 0.2,
  normal: 0.3,
  slow: 0.5,
  verySlow: 0.8,
} as const;

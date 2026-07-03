import { GalleryImage } from '../components/ui/GalleryGrid';

// Service Categories and Items
export const serviceCategories = [
  {
    id: 'womens-haircuts',
    title: 'Жіночі стрижки',
    icon: 'scissors',
    description: 'Професійні жіночі стрижки від майстрів з багаторічним досвідом',
    image: 'https://images.pexels.com/photos/1522394/pexels-photo-1522394.jpeg?auto=compress&cs=tinysrgb&w=800',
    services: [
      {
        name: 'Жіноча стрижка короткі волосся',
        duration: '45-60 хв',
        price: '450',
        description: 'Стрижка короткого волосся з моделюванням та укладкою',
      },
      {
        name: 'Жіноча стрижка середні волосся',
        duration: '60-90 хв',
        price: '550',
        description: 'Стрижка середнього волосся з моделюванням та укладкою',
      },
      {
        name: 'Жіноча стрижка довге волосся',
        duration: '90-120 хв',
        price: '650',
        description: 'Стрижка довгого волосся з моделюванням та укладкою',
      },
      {
        name: 'Моделювання стрижки',
        duration: '30-45 хв',
        price: '300',
        description: 'Коригування та моделювання існуючої стрижки',
      },
      {
        name: 'Чіпка стрижка',
        duration: '45-60 хв',
        price: '350',
        description: 'Чіпка стрижка з моделюванням',
      },
    ],
  },
  {
    id: 'mens-haircuts',
    title: 'Чоловічі стрижки',
    icon: 'scissors',
    description: 'Чоловічі стрижки в актуальних техніках',
    image: 'https://images.pexels.com/photos/1644888/pexels-photo-1644888.jpeg?auto=compress&cs=tinysrgb&w=800',
    services: [
      {
        name: 'Чоловіча стрижка',
        duration: '30-45 хв',
        price: '350',
        description: 'Класична або сучасна чоловіча стрижка з укладкою',
      },
      {
        name: 'Fade стрижка',
        duration: '45-60 хв',
        price: '400',
        description: 'Стрижка в техніці fade з плавним переходом',
      },
      {
        name: 'Чоловіча стрижка з бородою',
        duration: '60-75 хв',
        price: '500',
        description: 'Комплексна стрижка з оформленням бороди',
      },
    ],
  },
  {
    id: 'coloring',
    title: 'Фарбування',
    icon: 'palette',
    description: 'Професійне фарбування волосся преміум матеріалами',
    image: 'https://images.pexels.com/photos/3293148/pexels-photo-3293148.jpeg?auto=compress&cs=tinysrgb&w=800',
    services: [
      {
        name: 'Однократне нанесення фарби',
        duration: '60-90 хв',
        price: '800',
        description: 'Фарбування в один тон з використанням преміум фарби',
      },
      {
        name: 'Фарбування кореневої зони',
        duration: '45-60 хв',
        price: '500',
        description: 'Корекція кореневої зони',
      },
      {
        name: 'Фарбування в два тони',
        duration: '90-120 хв',
        price: '1200',
        description: 'Багатовидне фарбування в два тони',
      },
      {
        name: 'Тонування',
        duration: '30-45 хв',
        price: '400',
        description: 'Зняття тони, тонування після освітлення',
      },
    ],
  },
  {
    id: 'blonde',
    title: 'Блонд',
    icon: 'sparkles',
    description: 'Створення ідеального блонду в техніках blondage',
    image: 'https://images.pexels.com/photos/2866931/pexels-photo-2866931.jpeg?auto=compress&cs=tinysrgb&w=800',
    services: [
      {
        name: 'Блондаж (короткі волосся)',
        duration: '120-150 хв',
        price: '1800',
        description: 'Освітлення та тонування короткого волосся',
      },
      {
        name: 'Блондаж (середні волосся)',
        duration: '150-180 хв',
        price: '2400',
        description: 'Освітлення та тонування середнього волосся',
      },
      {
        name: 'Блондаж (довге волосся)',
        duration: '180-240 хв',
        price: '3200',
        description: 'Освітлення та тонування довгого волосся',
      },
      {
        name: 'Корекція блонд',
        duration: '60-90 хв',
        price: '600',
        description: 'Підтримання блонду, корекція відтінку',
      },
    ],
  },
  {
    id: 'balayage',
    title: 'Balayage',
    icon: 'brush',
    description: 'Елегантний balayage - плавні переходи та природний ефект',
    image: 'https://images.pexels.com/photos/5990645/pexels-photo-5990645.jpeg?auto=compress&cs=tinysrgb&w=800',
    services: [
      {
        name: 'Balayage на коротке волосся',
        duration: '120-150 хв',
        price: '1600',
        description: 'Balayage техніка на коротке волосся',
      },
      {
        name: 'Balayage на середні волосся',
        duration: '150-180 хв',
        price: '2200',
        description: 'Balayage техніка на середні волосся',
      },
      {
        name: 'Balayage на довге волосся',
        duration: '180-240 хв',
        price: '3000',
        description: 'Balayage техніка на довге волосся',
      },
      {
        name: 'Корекція balayage',
        duration: '90-120 хв',
        price: '1200',
        description: 'Оновлення balayage, підмалювання',
      },
    ],
  },
  {
    id: 'airtouch',
    title: 'Airtouch',
    icon: 'wind',
    description: 'Воздушная техника airtouch для безпроблемного виростання',
    image: 'https://images.pexels.com/photos/3993329/pexels-photo-3993329.jpeg?auto=compress&cs=tinysrgb&w=800',
    services: [
      {
        name: 'Airtouch (коротке волосся)',
        duration: '180-240 хв',
        price: '2400',
        description: 'Airtouch техніка на коротке волосся',
      },
      {
        name: 'Airtouch (середні волосся)',
        duration: '240-300 хв',
        price: '3200',
        description: 'Airtouch техніка на середні волосся',
      },
      {
        name: 'Airtouch (довге волосся)',
        duration: '300-360 хв',
        price: '4200',
        description: 'Airtouch техніка на довге волосся',
      },
      {
        name: 'Корекція airtouch',
        duration: '120-150 хв',
        price: '1600',
        description: 'Оновлення airtouch',
      },
    ],
  },
  {
    id: 'complex-coloring',
    title: 'Комплексне фарбування',
    icon: 'gem',
    description: 'Складні техніки фарбування для унікальних ефектів',
    image: 'https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=800',
    services: [
      {
        name: 'Шатуш',
        duration: '120-180 хв',
        price: 'від 1800',
        description: 'Техніка шатуш з ефектом випаленого сонцем волосся',
      },
      {
        name: 'Омбре',
        duration: '120-180 хв',
        price: 'від 1600',
        description: 'Ефект градієнта від темного до світлого',
      },
      {
        name: 'Мелірування',
        duration: '90-150 хв',
        price: 'від 1200',
        description: 'Класичне мелірування',
      },
      {
        name: 'Бейбілайтс',
        duration: '120-180 хв',
        price: 'від 1800',
        description: 'Делікатне освітлення створююче натуральний ефект',
      },
    ],
  },
  {
    id: 'hair-care',
    title: 'Догляд за волоссям',
    icon: 'heart',
    description: 'Професійний догляд та відновлення волосся',
    image: 'https://images.pexels.com/photos/3293128/pexels-photo-3293128.jpeg?auto=compress&cs=tinysrgb&w=800',
    services: [
      {
        name: 'Botox для волосся',
        duration: '60-90 хв',
        price: '800',
        description: 'Відновлення та випрямлення botox',
      },
      {
        name: 'Кератинове вирівнювання',
        duration: '90-120 хв',
        price: '1200',
        description: 'Кератиновий варіант випрямлення',
      },
      {
        name: 'Ламірування волосся',
        duration: '45-60 хв',
        price: '600',
        description: 'Ущільнення волосся ламінуванням',
      },
      {
        name: 'SPAC-догляд для волосся',
        duration: '30-45 хв',
        price: '400',
        description: 'SPA-догляд, массаж голови, маски',
      },
    ],
  },
  {
    id: 'hair-restoration',
    title: 'Відновлення волосся',
    icon: 'leaf',
    description: 'Процедури для відновлення пошкодженого волосся',
    image: 'https://images.pexels.com/photos/5632406/pexels-photo-5632406.jpeg?auto=compress&cs=tinysrgb&w=800',
    services: [
      {
        name: 'Абсорбуючий догляд',
        duration: '60 хв',
        price: '500',
        description: 'Deep recovery для пошкодженого волосся',
      },
      {
        name: 'Гіалуроновий догляд',
        duration: '60 хв',
        price: '600',
        description: 'Зволоження гіалуроновою кислотою',
      },
      {
        name: 'Протеїновий догляд',
        duration: '60 хв',
        price: '550',
        description: 'Насичення протеїнами для сили волосся',
      },
    ],
  },
  {
    id: 'styling',
    title: 'Укладка',
    icon: 'sparkle',
    description: 'Праздничная та вечірня укладка',
    image: 'https://images.pexels.com/photos/1522394/pexels-photo-1522394.jpeg?auto=compress&cs=tinysrgb&w=800',
    services: [
      {
        name: 'Укладка волосся',
        duration: '30-45 хв',
        price: '350',
        description: 'Класична укладка феном',
      },
      {
        name: 'Вечірня укладка',
        duration: '45-60 хв',
        price: '500',
        description: 'Елегантна вечеря укладка',
      },
      {
        name: 'Стайлинг',
        duration: '15-30 хв',
        price: '200',
        description: 'Швидкий стайлинг',
      },
      {
        name: 'Локони',
        duration: '45-60 хв',
        price: '450',
        description: 'Створення локонів плойкою або стайлером',
      },
    ],
  },
  {
    id: 'hairdresser-school',
    title: 'Школа перукарів',
    icon: 'graduation',
    description: 'Професійне навчання перукарській справі',
    image: 'https://images.pexels.com/photos/3293148/pexels-photo-3293148.jpeg?auto=compress&cs=tinysrgb&w=800',
    services: [
      {
        name: 'Базовий курс',
        duration: '3 місяці',
        price: '15000',
        description: 'Повний курс перукарської майстерності для початківців',
      },
      {
        name: 'Підвищення кваліфікації',
        duration: '2 тижні',
        price: '5000',
        description: 'Курс для діючих перукарів',
      },
      {
        name: 'Майстер-клас',
        duration: '1 день',
        price: '1500',
        description: 'Одноденний майстер-клас від провідних майстрів',
      },
      {
        name: 'Індивідуальне навчання',
        duration: 'за домовленістю',
        price: 'за домовленістю',
        description: 'Персональне навчання з майстром',
      },
    ],
  },
];

// Gallery Images
export const galleryImages: GalleryImage[] = [
  { id: '1', src: 'https://images.pexels.com/photos/2866931/pexels-photo-2866931.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Blonde coloring result', category: 'blonde' },
  { id: '2', src: 'https://images.pexels.com/photos/1522394/pexels-photo-1522394.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Women haircut', category: 'haircuts' },
  { id: '3', src: 'https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Beautiful coloring', category: 'coloring' },
  { id: '4', src: 'https://images.pexels.com/photos/1644888/pexels-photo-1644888.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Men haircut', category: 'haircuts' },
  { id: '5', src: 'https://images.pexels.com/photos/3293148/pexels-photo-3293148.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Hair styling', category: 'styling' },
  { id: '6', src: 'https://images.pexels.com/photos/3993329/pexels-photo-3993329.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Airtouch technique', category: 'blonde' },
  { id: '7', src: 'https://images.pexels.com/photos/5990645/pexels-photo-5990645.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Balayage masterpiece', category: 'coloring' },
  { id: '8', src: 'https://images.pexels.com/photos/5632406/pexels-photo-5632406.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Long hair styling', category: 'styling' },
  { id: '9', src: 'https://images.pexels.com/photos/2866931/pexels-photo-2866931.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Blonde hair long', category: 'long-hair' },
  { id: '10', src: 'https://images.pexels.com/photos/3293128/pexels-photo-3293128.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Short hair styling', category: 'short-hair' },
  { id: '11', src: 'https://images.pexels.com/photos/2529307/pexels-photo-2529307.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Long haircut', category: 'long-hair' },
  { id: '12', src: 'https://images.pexels.com/photos/3765174/pexels-photo-3765174.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Short blonde', category: 'short-hair' },
];

export const galleryCategories = ['all', 'coloring', 'blonde', 'haircuts', 'styling', 'long-hair', 'short-hair'];

// Team Members
export const teamMembers = [
  {
    id: '1',
    name: 'Олена Коваленко',
    position: 'Топ-стиліст, Засновниця',
    experience: '15 років',
    specializations: ['Blonde', 'Balayage', 'Airtouch'],
    certificates: ['Wella Professionals', 'L\'Oreal Professionnel', 'Redken'],
    instagram: 'https://instagram.com/',
    image: 'https://images.pexels.com/photos/3765174/pexels-photo-3765174.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: '2',
    name: 'Марія Петренко',
    position: 'Майстер-колорист',
    experience: '10 років',
    specializations: ['Фарбування', 'Корекція кольору', 'Blonde'],
    certificates: ['Olaplex', 'Schwarzkopf Professional'],
    instagram: 'https://instagram.com/',
    image: 'https://images.pexels.com/photos/2866931/pexels-photo-2866931.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: '3',
    name: 'Анна Сидоренко',
    position: 'Майстер-перукар',
    experience: '8 років',
    specializations: ['Жіночі стрижки', 'Укладки', 'Догляд'],
    certificates: ['Vidal Sassoon', 'Paul Mitchell'],
    instagram: 'https://instagram.com/',
    image: 'https://images.pexels.com/photos/3293148/pexels-photo-3293148.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: '4',
    name: 'Ігор Бондаренко',
    position: 'Барбер',
    experience: '6 років',
    specializations: ['Чоловічі стрижки', 'Fade', 'Борода'],
    certificates: ['American Crew', 'Baxter of California'],
    instagram: 'https://instagram.com/',
    image: 'https://images.pexels.com/photos/1644888/pexels-photo-1644888.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
];

// Reviews
export const reviews = [
  {
    id: '1',
    author: 'Ольга М.',
    rating: 5,
    text: 'Неймовірний салон! Олена зробила ідеальний блонд, якого я хотіла роками. Вони справді розуміють, що хоче клієнт. Рекомендую всім!',
    date: '2 тижні тому',
    source: 'google' as const,
  },
  {
    id: '2',
    author: 'Наталія Р.',
    rating: 5,
    text: 'Найкращий салон у Чернігові! Зробила тут balayage і просто в захваті. Майстри дуже професійні, атмосфера приємна. Однозначно повертаюсь!',
    date: '1 місяць тому',
    source: 'google' as const,
  },
  {
    id: '3',
    author: 'Анна К.',
    rating: 5,
    text: 'Другий раз прихожу до Марії - вона чарівниця! Моє волосся після airtouch виглядає неймовірно. Дякую за вашу працю!',
    date: '3 тижні тому',
    source: 'google' as const,
  },
  {
    id: '4',
    author: 'Тетяна С.',
    rating: 5,
    text: 'Роблю стрижку у Анни вже давно. Завжди ідеально! Атмосфера салону розслабляє, персонал привітний. Це мій улюбленний салон.',
    date: '2 місяці тому',
    source: 'google' as const,
  },
  {
    id: '5',
    author: 'Катерина В.',
    rating: 5,
    text: 'Вперше спробувала keratin - результат перевершив очікування! Волосся шовковисте, легко розчісуються. Великі дяки!',
    date: '1 місяць тому',
    source: 'google' as const,
  },
  {
    id: '6',
    author: 'Аліна Д.',
    rating: 5,
    text: 'Прийшла на корекцію блонд і залишилась дуже задоволеною. Кольористика тут на високому рівні. Рекомендую!',
    date: '3 тижні тому',
    source: 'google' as const,
  },
];

// Blog Posts
export const blogPosts = [
  {
    id: '1',
    slug: 'yak-pidgotuvatisya-do-farbovannya',
    title: 'Як підготуватися до фарбування волосся',
    excerpt: 'Поради від майстрів про те, як правильно підготуватися до фарбування, щоб отримати ідеальний результат.',
    image: 'https://images.pexels.com/photos/3293148/pexels-photo-3293148.jpeg?auto=compress&cs=tinysrgb&w=800',
    date: '2024-01-15',
    category: 'Фарбування',
    content: 'Підготовка до фарбування волосся - важливий процес, який впливає на кінцевий результат...',
  },
  {
    id: '2',
    slug: 'blond-proti-balayage-shcho-obraty',
    title: 'Blond проти Balayage: що обрати?',
    excerpt: 'Порівнюємо дві популярні техніки освітлення та допомагаємо обрати ідеальний варіант для вашого типу волосся.',
    image: 'https://images.pexels.com/photos/2866931/pexels-photo-2866931.jpeg?auto=compress&cs=tinysrgb&w=800',
    date: '2024-01-10',
    category: 'Blonde',
    content: 'Blond та Balayage - дві найпопулярніші техніки освітлення...',
  },
  {
    id: '3',
    slug: 'doglyad-za-farbovanym-volosyam',
    title: 'Догляд за фарбованим волоссям',
    excerpt: 'Дізнайтеся, як правильно доглядати за фарбованим волоссям, щоб зберегти насичений колір та здоров\'я.',
    image: 'https://images.pexels.com/photos/5632406/pexels-photo-5632406.jpeg?auto=compress&cs=tinysrgb&w=800',
    date: '2024-01-05',
    category: 'Догляд',
    content: 'Фарбоване волосся потребує особливого догляду...',
  },
  {
    id: '4',
    slug: 'trendy-strizhok-2024',
    title: 'Тренди стрижок 2024',
    excerpt: 'Головні тенденції у стрижках цього року: що модно, що актуально, як обрати свій стиль.',
    image: 'https://images.pexels.com/photos/1522394/pexels-photo-1522394.jpeg?auto=compress&cs=tinysrgb&w=800',
    date: '2023-12-28',
    category: 'Стрижки',
    content: '2024 рік приносить нові тенденції у стрижках...',
  },
];

// Promotions
export const promotions = [
  {
    id: '1',
    title: 'Подарункові сертифікати',
    description: 'Ідеальний подарунок для близьких! Сертифікати на будь-яку суму від 500 грн.',
    image: 'https://images.pexels.com/photos/1666071/pexels-photo-1666071.jpeg?auto=compress&cs=tinysrgb&w=800',
    isActive: true,
  },
  {
    id: '2',
    title: '-10% на перший візит',
    description: 'Знижка для нових клієнтів на будь-які послуги салону. Діє при записі через сайт.',
    image: 'https://images.pexels.com/photos/3293128/pexels-photo-3293128.jpeg?auto=compress&cs=tinysrgb&w=800',
    isActive: true,
  },
  {
    id: '3',
    title: 'Комплекс: Стрижка + Фарбування',
    description: 'Економте 300 грн при замові стрижки та фарбування в один день.',
    image: 'https://images.pexels.com/photos/3293148/pexels-photo-3293148.jpeg?auto=compress&cs=tinysrgb&w=800',
    isActive: true,
  },
  {
    id: '4',
    title: 'SPAC-догляд у подарунок',
    description: 'При записі на Balayage або Airtouch отримайте SPA-догляд безкоштовно.',
    image: 'https://images.pexels.com/photos/5632406/pexels-photo-5632406.jpeg?auto=compress&cs=tinysrgb&w=800',
    isActive: true,
  },
];

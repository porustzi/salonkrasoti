import siteContent from '../../content/site-content.json'

export interface HeroContent {
  eyebrow: string
  title: string
  tagline: string
  ctaText: string
  ctaLink: string
  secondaryCtaText: string
  secondaryCtaLink: string
  backgroundImage: string
}

export interface AboutPreviewContent {
  label: string
  heading: string
  text: string
  features: string[]
  statNumber: string
  statLabel: string
  image: string
  ctaText: string
  ctaLink: string
}

export interface CTASectionContent {
  heading: string
  text: string
  ctaText: string
  ctaLink: string
  secondaryCtaText: string
  secondaryCtaLink: string
}

export interface HomeContent {
  hero: HeroContent
  aboutPreview: AboutPreviewContent
  cta: CTASectionContent
}

export interface AboutStoryContent {
  label: string
  heading: string
  paragraphs: string[]
  image: string
  statNumber: string
  statLabel: string
}

export interface ValueContent {
  title: string
  description: string
}

export interface TimelineContent {
  year: string
  title: string
  description: string
}

export interface FeatureContent {
  title: string
  description: string
  image: string
}

export interface AboutContent {
  story: AboutStoryContent
  values: ValueContent[]
  timeline: TimelineContent[]
  features: FeatureContent[]
  cta: CTASectionContent
}

export interface BusinessInfoContent {
  address: string
  city: string
  location: string
  phone: string
  email: string
  instagram: string
  instagramUsername: string
  workingHours: string
  country: string
  googleMapsUrl: string
  googleRating: string
  reviewCount: string
  recommendPercent: string
}

export interface ReviewsSectionContent {
  heading: string
  subheading: string
  googleRatingText: string
  ctaText: string
  ctaHeading: string
  ctaSubtext: string
}

export interface PricingNotesContent {
  heading: string
  items: string[]
  ctaHeading: string
  ctaText: string
  ctaSubtext: string
}

export interface FaqItemContent {
  question: string
  answer: string
}

export interface PageHeroContent {
  eyebrow: string
  title: string
  subtitle: string
  image: string
  storyHeading?: string
  valuesHeading?: string
  timelineHeading?: string
  featuresHeading?: string
  joinHeading?: string
  joinText?: string
  joinCtaText?: string
  joinEmail?: string
  instagramHeading?: string
  instagramHandle?: string
  instagramCtaText?: string
  faqHeading?: string
}

export interface PagesContent {
  about: PageHeroContent
  team: PageHeroContent
  gallery: PageHeroContent
  pricing: PageHeroContent
  reviews: PageHeroContent
  contacts: PageHeroContent
}

export interface HomeSectionsContent {
  servicesLabel: string
  servicesHeading: string
  galleryLabel: string
  galleryHeading: string
  reviewsLabel: string
  reviewsHeading: string
  instagramHeading: string
}

export interface SiteContent {
  home: HomeContent
  about: AboutContent
  businessInfo: BusinessInfoContent
  reviewsSection: ReviewsSectionContent
  pricingNotes: PricingNotesContent
  faq: FaqItemContent[]
  pages: PagesContent
  homeSections: HomeSectionsContent
}

export const defaultSiteContent: SiteContent = siteContent

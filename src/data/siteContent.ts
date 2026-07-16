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
  workingHours: string
  country: string
  googleMapsUrl: string
}

export interface SiteContent {
  home: HomeContent
  about: AboutContent
  businessInfo: BusinessInfoContent
}

export const defaultSiteContent: SiteContent = siteContent

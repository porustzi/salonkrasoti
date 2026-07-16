import services from '../../content/services.json'
import gallery from '../../content/gallery.json'
import team from '../../content/team.json'
import reviewsData from '../../content/reviews.json'

export const serviceCategories = services
export const galleryImages = gallery
export const teamMembers = team
export const reviews = reviewsData as Review[]

export interface GalleryImage {
  id: string
  src: string
  alt: string
  category: string
}

export interface ServiceItem {
  name: string
  duration: string
  price: string
  description: string
}

export interface ServiceCategory {
  id: string
  title: string
  icon: string
  description: string
  image: string
  services: ServiceItem[]
}

export interface TeamMember {
  id: string
  name: string
  position: string
  experience: string
  specializations: string[]
  certificates: string[]
  instagram: string
  image: string
}

export interface Review {
  id: string
  author: string
  rating: number
  text: string
  date: string
  source: string
}

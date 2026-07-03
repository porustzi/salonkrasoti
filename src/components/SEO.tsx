import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SEO_DEFAULTS, BUSINESS_INFO } from '../config/constants';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
}

export function SEO({
  title,
  description,
  image,
  url,
  type = 'website',
}: SEOProps) {
  const location = useLocation();
  const pageTitle = title
    ? `${title} | ${SEO_DEFAULTS.siteName}`
    : SEO_DEFAULTS.defaultTitle;
  const pageDescription = description || SEO_DEFAULTS.defaultDescription;
  const pageImage = image || SEO_DEFAULTS.defaultImage;
  const pageUrl = url || `${SEO_DEFAULTS.siteUrl}${location.pathname}`;

  useEffect(() => {
    document.title = pageTitle;

    const updateMeta = (name: string, content: string) => {
      let element = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
      if (element) {
        element.content = content;
      } else {
        element = document.createElement('meta');
        element.name = name;
        element.content = content;
        document.head.appendChild(element);
      }
    };

    const updateProperty = (property: string, content: string) => {
      let element = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;
      if (element) {
        element.content = content;
      } else {
        element = document.createElement('meta');
        element.setAttribute('property', property);
        element.content = content;
        document.head.appendChild(element);
      }
    };

    // Standard meta
    updateMeta('description', pageDescription);
    updateMeta('canonical', pageUrl);

    // Open Graph
    updateProperty('og:title', pageTitle);
    updateProperty('og:description', pageDescription);
    updateProperty('og:image', pageImage);
    updateProperty('og:url', pageUrl);
    updateProperty('og:type', type);
    updateProperty('og:site_name', SEO_DEFAULTS.siteName);
    updateProperty('og:locale', 'uk_UA');

    // Twitter Cards
    updateMeta('twitter:card', 'summary_large_image');
    updateMeta('twitter:title', pageTitle);
    updateMeta('twitter:description', pageDescription);
    updateMeta('twitter:image', pageImage);

  }, [pageTitle, pageDescription, pageImage, pageUrl, type]);

  return null;
}

// Schema.org LocalBusiness
export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    "name": BUSINESS_INFO.name,
    "description": BUSINESS_INFO.tagline,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": BUSINESS_INFO.address,
      "addressLocality": BUSINESS_INFO.city,
      "addressCountry": BUSINESS_INFO.country
    },
    "telephone": BUSINESS_INFO.phone,
    "email": BUSINESS_INFO.email,
    "url": SEO_DEFAULTS.siteUrl,
    "priceRange": "$$",
    "openingHoursSpecification": BUSINESS_INFO.workingHours.map(wh => ({
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": wh.day,
      "opens": wh.hours !== 'Вихідний' ? wh.hours.split(' - ')[0] : undefined,
      "closes": wh.hours !== 'Вихідний' ? wh.hours.split(' - ')[1] : undefined
    })),
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": BUSINESS_INFO.googleRating,
      "reviewCount": BUSINESS_INFO.reviewCount
    },
    "sameAs": [
      BUSINESS_INFO.instagram
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SEO_DEFAULTS } from '../config/constants';
import { useBusinessInfo } from '../lib/businessStore';

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
  const bi = useBusinessInfo();
  const schema = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    "name": bi.name,
    "description": bi.tagline,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": bi.address,
      "addressLocality": bi.city,
      "addressCountry": bi.country
    },
    "telephone": bi.phone,
    "email": bi.email,
    "url": SEO_DEFAULTS.siteUrl,
    "priceRange": "$$",
    "openingHours": bi.workingHours,
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "10:00",
        "closes": "21:00"
      }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": bi.googleRating,
      "reviewCount": bi.reviewCount
    },
    "sameAs": [
      bi.instagram
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

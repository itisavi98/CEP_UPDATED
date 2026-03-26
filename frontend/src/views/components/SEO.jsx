import { useEffect } from 'react';

const SEO = ({
  title = "Premium Real Estate Properties | DreamLand Realty",
  description = "Discover luxury residential and commercial properties with world-class amenities. Trusted real estate developer with 25+ years of experience. RERA approved projects.",
  keywords = "real estate, properties, luxury homes, residential projects, commercial properties, apartments, villas, plots, ongoing projects, completed projects, RERA approved, home loan, EMI calculator",
  image = "https://your-website.com/og-image.jpg",
  url = "https://your-website.com",
  type = "website",
}) => {
  useEffect(() => {
    // Set document title
    document.title = title;

    // Update or create meta tags
    const updateMetaTag = (property, content, isProperty = true) => {
      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${property}"]`);
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, property);
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', content);
    };

    // Standard Meta Tags
    updateMetaTag('description', description, false);
    updateMetaTag('keywords', keywords, false);
    updateMetaTag('author', 'DreamLand Realty', false);
    updateMetaTag('viewport', 'width=device-width, initial-scale=1.0', false);

    // Open Graph / Facebook
    updateMetaTag('og:type', type);
    updateMetaTag('og:title', title);
    updateMetaTag('og:description', description);
    updateMetaTag('og:image', image);
    updateMetaTag('og:url', url);
    updateMetaTag('og:site_name', 'DreamLand Realty');

    // Twitter Card
    updateMetaTag('twitter:card', 'summary_large_image', false);
    updateMetaTag('twitter:title', title, false);
    updateMetaTag('twitter:description', description, false);
    updateMetaTag('twitter:image', image, false);

    // Additional SEO Tags
    updateMetaTag('robots', 'index, follow', false);
    updateMetaTag('language', 'English', false);
    updateMetaTag('revisit-after', '7 days', false);

  }, [title, description, keywords, image, url, type]);

  return null;
};

export default SEO;

// Structured Data / Schema.org JSON-LD
export const StructuredData = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "RealEstateAgent",
      "name": "DreamLand Realty",
      "description": "Premium real estate developer specializing in luxury residential and commercial properties",
      "url": "https://your-website.com",
      "logo": "https://your-website.com/logo.png",
      "image": "https://your-website.com/og-image.jpg",
      "telephone": "+91-98765-43210",
      "email": "info@dreamland.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "123 Main Street",
        "addressLocality": "Mumbai",
        "addressRegion": "Maharashtra",
        "postalCode": "400001",
        "addressCountry": "IN"
      },
      "areaServed": [
        {
          "@type": "City",
          "name": "Mumbai"
        },
        {
          "@type": "City",
          "name": "Navi Mumbai"
        },
        {
          "@type": "City",
          "name": "Pune"
        }
      ],
      "sameAs": [
        "https://www.facebook.com/dreamlandrealty",
        "https://www.instagram.com/dreamlandrealty",
        "https://www.linkedin.com/company/dreamlandrealty",
        "https://twitter.com/dreamlandrealty"
      ],
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "500"
      }
    });
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return null;
};

// Breadcrumb Schema
export const BreadcrumbSchema = ({ items }) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.name,
        "item": item.url
      }))
    });
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [items]);

  return null;
};
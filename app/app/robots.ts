import { MetadataRoute } from 'next';

/**
 * robots.txt
 * 
 * Indique aux crawlers (Google, Bing, etc.) ce qu'ils peuvent indexer
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/_next/'], // Bloquer dossiers privés
      },
    ],
    sitemap: 'https://vtcrachel.fr/sitemap.xml',
  };
}

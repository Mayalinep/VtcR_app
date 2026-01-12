/**
 * StructuredData Component
 * 
 * Injecte Schema.org JSON-LD dans le <head> pour SEO
 */

export default function StructuredData({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

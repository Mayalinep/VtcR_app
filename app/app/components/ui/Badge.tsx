/**
 * Badge - Composant badge réutilisable
 * 
 * Badge avec style cohérent (fond doré clair, texte vert forêt)
 * Utilisé pour les labels, catégories, tags, etc.
 * 
 * @param children - Contenu du badge (texte)
 * @param className - Classes CSS additionnelles (optionnel)
 * 
 * @example
 * <Badge>Service Premium</Badge>
 * <Badge className="mb-8">Nouveau</Badge>
 */

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export default function Badge({ children, className = '' }: BadgeProps) {
  return (
    <div 
      className={`inline-block px-4 py-1.5 rounded-full text-sm font-medium ${className}`}
      style={{ 
        backgroundColor: 'var(--gold-light)',
        color: 'var(--forest-green)'
      }}
    >
      {children}
    </div>
  );
}

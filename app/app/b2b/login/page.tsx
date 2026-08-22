import { redirect } from 'next/navigation';

/** Ancienne URL — redirige vers la page partenaires (sans espace hôtel actif). */
export default function B2BLoginRedirect() {
  redirect('/partenaires');
}

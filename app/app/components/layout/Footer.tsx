/**
 * Footer - Pied de page réutilisable
 * 
 * Contient la navigation, les liens légaux et les informations de contact.
 * Utilisé sur toutes les pages du site pour maintenir une cohérence.
 * 
 * @example
 * <Footer />
 */
export default function Footer() {
  return (
    <footer className="border-t border-gray-100 py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-2 md:col-span-1">
            <div className="text-2xl font-semibold mb-3" style={{ color: 'var(--forest-green)', fontFamily: 'var(--font-playfair)' }}>
              VTC Rachel
            </div>
            <p className="text-sm text-gray-600">
              Service VTC premium en Île-de-France
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-3 text-sm sm:text-base">Navigation</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="/" className="hover:text-gray-900 inline-block py-0.5">Accueil</a></li>
              <li><a href="/a-propos" className="hover:text-gray-900 inline-block py-0.5">À propos</a></li>
              <li><a href="/tarifs" className="hover:text-gray-900 inline-block py-0.5">Tarifs</a></li>
              <li><a href="/faq" className="hover:text-gray-900 inline-block py-0.5">FAQ</a></li>
              <li><a href="/contact" className="hover:text-gray-900 inline-block py-0.5">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-3 text-sm sm:text-base">Légal</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="/cgv" className="hover:text-gray-900 inline-block py-0.5">CGV</a></li>
              <li><a href="/mentions-legales" className="hover:text-gray-900 inline-block py-0.5">Mentions légales</a></li>
              <li><a href="/confidentialite" className="hover:text-gray-900 inline-block py-0.5">Confidentialité</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-3 text-sm sm:text-base">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="py-0.5">contact@vtc-rachel.fr</li>
              <li className="py-0.5">+33 6 XX XX XX XX</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-100 pt-6 text-center text-sm text-gray-500">
          © 2026 VTC Rachel. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}

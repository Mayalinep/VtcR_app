import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Note: la clé `i18n` du config n'est PAS supportée par l'App Router.
  // Le routage par langue est géré via le segment dynamique `app/[locale]/...`.
  images: {
    qualities: [75, 85, 90],
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Configurer les qualités d'image autorisées (Hero premium)
    qualities: [75, 90],
  },
};

export default nextConfig;

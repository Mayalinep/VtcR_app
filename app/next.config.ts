import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Configurer les qualités d'image autorisées (Hero + backgrounds)
    qualities: [75, 85, 90],
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Formats modernes pour réduire la taille des images
    formats: ['image/avif', 'image/webp'],
    // Qualités d'image (75 = léger, 90 = haute qualité)
    qualities: [75, 85, 90],
    // Tailles d'images optimisées
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Domaine externe autorisé (si besoin d'images externes)
    remotePatterns: [],
  },
};

export default nextConfig;

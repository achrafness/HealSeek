import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
const withNextIntl = createNextIntlPlugin('i18n/i18n.ts');
const nextConfig: NextConfig = {
  images: {
    domains: ["res.cloudinary.com"], // Add your domain(s) here
  },
  eslint: {
    ignoreDuringBuilds: true, // Disable ESLint during builds
  },
  typescript: {
    ignoreBuildErrors: true, // Skip TypeScript validation during build
  },
};

export default withNextIntl(nextConfig);

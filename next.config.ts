import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      { hostname: 'api.dicebear.com' },
      { hostname: 'images.unsplash.com' },
    ],
  },
};

export default nextConfig;


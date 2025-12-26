import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; " +
              "connect-src 'self' https://*.googleapis.com https://*.firebaseio.com https://*.google-analytics.com; " +
              "img-src 'self' data: https://res.cloudinary.com https://www.google-analytics.com https://www.googletagmanager.com; " +
              "script-src 'self' 'unsafe-inline' https://apis.google.com https://www.googletagmanager.com https://www.google-analytics.com; " +
              "frame-src 'self' https://*.firebaseapp.com; " +
              "style-src 'self' 'unsafe-inline'; " +
              "font-src 'self' data:;",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ];
  },

  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
};

export default nextConfig;

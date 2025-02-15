import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Image optimization configuration
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
        port: "",
      },
    ],
  },

  // CORS headers configuration
  async headers() {
    return [
      {
        // Apply these headers to all API routes
        source: "/api/:path*", // Match all API routes
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "https://next-social-media-ebon.vercel.app,http://localhost:3000", // Allow all origins (replace with specific domains if needed)
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE, OPTIONS", // Allowed HTTP methods
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version", // Allowed headers
          },
          {
            key: "Access-Control-Allow-Credentials",
            value: "true", // Allow credentials (e.g., cookies)
          },
        ],
      },
    ];
  },
};

export default nextConfig;
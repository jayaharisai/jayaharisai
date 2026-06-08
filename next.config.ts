import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  // Only apply basePath for production builds (GitHub Pages deployment).
  // In local dev (`pnpm dev`), the site is served from `/`, so no prefix is needed
  // and assets like `/myimage.jpg` resolve correctly.
  ...(isProd ? { basePath: "/jayaharisai" } : {}),
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

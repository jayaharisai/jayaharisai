import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  // Only apply basePath for production builds (GitHub Pages deployment).
  ...(isProd ? { basePath: "/jayaharisai" } : {}),

  // Static export only for production builds.
  // In dev mode, API routes work for the editor.
  ...(isProd ? { output: "export" as const } : {}),

  // Trailing slash is required for static hosting on GitHub Pages
  trailingSlash: true,

  images: {
    unoptimized: true,
  },
};

export default nextConfig;
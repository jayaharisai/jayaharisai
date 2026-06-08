import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // No basePath: site is served at the root of the user site
  // (https://jayaharisai.github.io/) once the repo is renamed to
  // `jayaharisai.github.io` in GitHub repo settings.
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

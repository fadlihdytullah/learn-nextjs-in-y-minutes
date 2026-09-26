import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Opt into Cache Components: `"use cache"`, `cacheLife`, and Partial Prerendering.
  // It is the caching model this whole project is built on (see lesson 08).
  cacheComponents: true,
};

export default nextConfig;

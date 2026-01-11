import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  reactCompiler: true,
  reactStrictMode: false,
  typedRoutes: true,
  serverExternalPackages: ["pino"],
  turbopack: {
    root: path.join(__dirname),
  },
  experimental: {
    typedEnv: true,
    turbopackFileSystemCacheForDev: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "token-logos.family.co",
      },
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
      },
    ],
  },
};

export default nextConfig;

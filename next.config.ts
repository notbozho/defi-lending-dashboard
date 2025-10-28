import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  reactCompiler: false,
  reactStrictMode: false,
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [{ source: "/llmx.txt", destination: "/llms.txt" }];
  },
};

export default nextConfig;

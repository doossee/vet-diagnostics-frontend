import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  rewrites(): any {
    return [
      {
        source: "/api/:path*",
        destination: process.env.BASE_URL + "/:path*",
      },
    ];
  },
};

export default nextConfig;

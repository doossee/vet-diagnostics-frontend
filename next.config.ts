import type { NextConfig } from "next"
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/shared/i18n/request.ts')

const nextConfig: NextConfig = {
  // Produce a self-contained .next/standalone server for a slim Docker image
  output: "standalone",
  reactStrictMode: true,
  rewrites(): any {
    return [
      {
        source: "/api/:path*",
        destination: process.env.BASE_URL + "/:path*",
      },
    ]
  },
  typescript: { ignoreBuildErrors: true },
  experimental: {
    optimizePackageImports: ['lucide-react']
  }
}

export default withNextIntl(nextConfig)

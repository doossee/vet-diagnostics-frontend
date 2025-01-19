import type { NextConfig } from "next"
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()

const nextConfig: NextConfig = {
  reactStrictMode: true,
  rewrites(): any {
    return [
      {
        source: "/api/:path*",
        destination: process.env.BASE_URL + "/:path*",
      },
    ]
  },
}

export default withNextIntl(nextConfig)

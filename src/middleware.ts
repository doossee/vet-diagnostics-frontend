import { routing } from '@/shared/i18n/routing'
import createMiddleware from 'next-intl/middleware'

export default createMiddleware(routing)

export const config = {
    matcher: ['/', '/(uz|ru)/:path*']
}
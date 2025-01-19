import { UserData } from '~/lib/type'
import { cookies } from 'next/headers'
import { redirect } from '~/i18n/routing'
import { getLocale } from 'next-intl/server'
import { navLinksVariant } from '~/constants'

export default async function Index() {
    const locale = await getLocale()
    const cookie = await cookies()
    const user: null | UserData = JSON.parse(cookie.get('USER_DATA')?.value||'null')
    if(!user) return redirect({ href: '/login', locale })

    return redirect({ href: navLinksVariant[user.userRole]?.[0]?.items?.[0]?.url, locale })
}
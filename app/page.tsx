import { UserData } from '~/lib/type'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { navLinksVariant } from '~/constants'

export default async function Index() {
    const cookie = await cookies()
    const user: null | UserData = JSON.parse(cookie.get('USER_DATA')?.value||'null')
    if(!user) return redirect('/login')
    
    return redirect(navLinksVariant[user.userRole]?.[0]?.items?.[0]?.url)
}
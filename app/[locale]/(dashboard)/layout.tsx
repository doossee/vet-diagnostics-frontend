import { ReactNode } from "react"
import { cookies } from 'next/headers'
import { redirect } from '~/i18n/routing'
import { getLocale } from 'next-intl/server'
import { ModeToggle } from "~/components/theme-toggler"
import { ToggleLocale } from '~/components/toggle-locale'
import { LogoutButton } from "~/components/logout-button"
import { AppSidebar } from '~/components/nav-drawer-variant'
import { SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar"

export default async function Page({children}: {children: ReactNode}) {
  const cookie = await cookies()
  const locale = await getLocale()
  if(!cookie.get('ACCESS_TOKEN')?.value) return redirect({ href: '/login', locale })

  return (
    <div className="flex h-screen relative">
      <SidebarProvider>
        <AppSidebar />
        <main className="flex-1 p-4 h-screen overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2 w-fit">
              <SidebarTrigger />
              <ModeToggle />
            </div>
            <div className="flex items-center gap-2">
              <div id="top-bar-teleport" className="flex items-center gap-2"></div>
              <LogoutButton />
              <ToggleLocale />
            </div>
          </div>

          {children}
        </main>
      </SidebarProvider>
    </div>
  )
}

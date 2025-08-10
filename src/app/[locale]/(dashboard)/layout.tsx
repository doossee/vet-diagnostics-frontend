import { ReactNode } from "react"
import { cookies } from 'next/headers'
import { getLocale } from 'next-intl/server'
import { redirect } from '@/shared/i18n/routing'
import { ModeToggle } from "@/shared/components/theme-toggler"
import { ToggleLocale } from '@/shared/components/toggle-locale'
import { LogoutButton } from "@/shared/components/logout-button"
import { AppSidebar } from '@/shared/components/nav-drawer-variant'
import { SidebarProvider, SidebarTrigger } from "@/shared/components/ui/sidebar"
import { AppBreadcrumb } from "@/shared/components/elements/app-breadcrumb"

export default async function Page({children}: {children: ReactNode}) {
  const cookie = await cookies()
  const locale = await getLocale()
  if(!cookie.get('ACCESS_TOKEN')?.value) return redirect({ href: '/login', locale })

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1 p-4 min-h-screen overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2 w-fit">
            <SidebarTrigger />
            <AppBreadcrumb />
          </div>
          <div className="flex items-center gap-2">
            <div id="top-bar-teleport" className="flex items-center gap-2"></div>
            <LogoutButton />
            <ModeToggle />
            <ToggleLocale />
          </div>
        </div>
        {children}
      </main>
    </SidebarProvider>
  )
}

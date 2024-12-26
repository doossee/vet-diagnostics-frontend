import { ReactNode } from "react"
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { NavDrawer } from '~/components/nav-drawer'
import { ModeToggle } from "~/components/theme-toggler"
import { SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar"

import { AppSidebar } from '~/components/nav-drawer-variant'

export default async function Page({children}: {children: ReactNode}) {
  const cookie = await cookies()
  if(!cookie.get('ACCESS_TOKEN')?.value) return redirect('/login')

  return (
    <div className="flex h-screen relative">
      <SidebarProvider>
        <AppSidebar />
        <main className="flex-1 p-4 h-full overflow-y-auto pl-[calc(57px+1rem)] md:pl-4">
          <div className="mb-4 flex items-center gap-2 w-fit">
            <SidebarTrigger />
            <ModeToggle />
          </div>
          {children}
        </main>
      </SidebarProvider>
    </div>
  )
}

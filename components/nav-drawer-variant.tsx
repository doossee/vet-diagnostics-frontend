'use client'

import Link from "next/link"
import { cn } from "~/lib/utils"
import { useEffect, useState } from "react"
import { ChevronRight } from "lucide-react"
import { navLinksVariant } from '~/constants'
import { usePathname } from "next/navigation"
import { useAuthData } from "~/hooks/use-auth-data"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@radix-ui/react-collapsible"
import { Sidebar, SidebarContent, SidebarGroup, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, useSidebar } from "~/components/ui/sidebar"

export function AppSidebar() {
    const pathname = usePathname()
    const { userData } = useAuthData()
    const [links, setLinks] = useState<any[]>([])
    const { toggleSidebar, isMobile } = useSidebar()
    
    useEffect(() => {
        setLinks(navLinksVariant[userData?.userRole!]||[])
    }, [])

    return(
        <Sidebar collapsible="icon" className="bg-card">
            <SidebarContent className="bg-card h-screen">
                <SidebarGroup>
                    <SidebarMenu>
                        {links.map((item) => (
                            <Collapsible asChild
                                key={item.title}
                                defaultOpen={item?.isActive}
                                className="group/collapsible">
                                <SidebarMenuItem>
                                    <CollapsibleTrigger asChild>
                                        <SidebarMenuButton tooltip={item.title}>
                                            {item.icon && <item.icon className="!size-[1.1rem] mr-2" />}
                                            <span>{item.title}</span>
                                            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                        </SidebarMenuButton>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                        <SidebarMenuSub>
                                            {item.items?.map((subItem: any, i: number) => (
                                                <SidebarMenuSubItem key={i}>
                                                    <SidebarMenuSubButton asChild>
                                                        <Link href={subItem.url} className={cn("text-nowrap p-2 overflow-hidden flex gap-3 items-center rounded-sm cursor-pointer transition-colors",
                                                            pathname === subItem.url ? "bg-primary hover:!bg-primary/80 text-white hover:text-white dark:text-background hover:dark:text-background" : "text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-500/40 dark:text-gray-300"
                                                        )} onClick={() => isMobile && toggleSidebar()}>
                                                            <div>
                                                                {subItem.icon && <subItem.icon className="size-[1.1rem]" />}
                                                            </div>
                                                            <span className="text-sm">{subItem.title}</span>
                                                        </Link>
                                                    </SidebarMenuSubButton>
                                                </SidebarMenuSubItem>
                                            ))}
                                        </SidebarMenuSub>
                                    </CollapsibleContent>
                                </SidebarMenuItem>
                            </Collapsible>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar >
    )
}
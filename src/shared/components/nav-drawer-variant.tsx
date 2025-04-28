'use client'

import { Animal } from '@/shared/types'
import { cn } from "@/shared/lib/utils"
import { useEffect, useState } from "react"
import { useTranslations } from "next-intl"
import { ChevronRight } from "lucide-react"
import { navLinksVariant } from '@/shared/constants'
// import { animalsControllerFindAll } from '@/shared/api'
import { usePathname, Link } from "@/shared/i18n/routing"
import { useAuthData } from "@/shared/hooks/use-auth-data"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@radix-ui/react-collapsible"
import { Sidebar, SidebarContent, SidebarGroup, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, useSidebar } from "@/shared/components/ui/sidebar"

export function AppSidebar() {
    const t = useTranslations()
    const pathname = usePathname()
    const { userData } = useAuthData()
    const [links, setLinks] = useState<any[]>([])
    const { toggleSidebar, isMobile } = useSidebar()
    // const [animals, setAnimals] = useState<Animal[]>([])
    
    useEffect(() => {
        setLinks(navLinksVariant[userData?.userRole!]||[])

        // if(userData?.userRole === "VETERINARIAN") {
        //     getAnimals()
        // }
    }, [])

    // const getAnimals = async () => {
    //     const data: any = await animalsControllerFindAll({ page: 1, perPage: 1000 })
    //     setAnimals(data.data)
    // }

    return(
        <Sidebar collapsible="icon" className="bg-card">
            <SidebarContent className="bg-card h-screen">
                <SidebarGroup>
                    <SidebarMenu>
                        {links.map((item) => (
                            // userData?.userRole === 'VETERINARIAN' && item.title === "nav.animals" ?
                            // (
                                // <Collapsible asChild
                                //     key={item.title}
                                //     defaultOpen={item?.isActive}
                                //     className="group/collapsible">
                                //     <SidebarMenuItem>
                                //         <CollapsibleTrigger asChild>
                                //             <SidebarMenuButton tooltip={item.title}>
                                //                 {item.icon && <item.icon className="size-[1.1rem]! mr-2" />}
                                //                 <span>{t(item.title)}</span>
                                //                 <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                //             </SidebarMenuButton>
                                //         </CollapsibleTrigger>
                                //         <CollapsibleContent>
                                //             <SidebarMenuSub>
                                //                 <SidebarMenuSubItem>
                                //                     <SidebarMenuSubButton asChild>
                                //                         <Link href={'/animals-create'} className={cn("text-nowrap p-2 overflow-hidden flex gap-3 items-center rounded-sm cursor-pointer transition-colors",
                                //                             pathname === ('/animals-create') ? "bg-primary hover:bg-primary/80! text-white hover:text-white dark:text-background dark:hover:text-background" : "text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-500/40 dark:text-gray-300"
                                //                         )} onClick={() => isMobile && toggleSidebar()}>
                                //                             <div>
                                //                                 <CirclePlus className="size-[1.1rem]" />
                                //                             </div>
                                //                             <span className="text-sm">{t('animals.createAnimal')}</span>
                                //                         </Link>
                                //                     </SidebarMenuSubButton>
                                //                 </SidebarMenuSubItem>
                                //                 {animals?.map((animal, i: number) => (
                                //                     <SidebarMenuSubItem key={i}>
                                //                         <SidebarMenuSubButton asChild>
                                //                             <Link href={'/animals/'+animal.id} className={cn("text-nowrap p-2 overflow-hidden flex gap-3 items-center rounded-sm cursor-pointer transition-colors",
                                //                                 pathname === ('/animals/'+animal.id) ? "bg-primary hover:bg-primary/80! text-white hover:text-white dark:text-background dark:hover:text-background" : "text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-500/40 dark:text-gray-300"
                                //                             )} onClick={() => isMobile && toggleSidebar()}>
                                //                                 <div>
                                //                                     <PawPrint className="size-[1.1rem]" />
                                //                                 </div>
                                //                                 <span className="text-sm">{animal.nameOrCode}</span>
                                //                             </Link>
                                //                         </SidebarMenuSubButton>
                                //                     </SidebarMenuSubItem>
                                //                 ))}
                                //             </SidebarMenuSub>
                                //         </CollapsibleContent>
                                //     </SidebarMenuItem>
                                // </Collapsible>
                            // ):
                            (<Collapsible asChild
                                key={item.title}
                                defaultOpen={item?.isActive}
                                className="group/collapsible">
                                <SidebarMenuItem>
                                    <CollapsibleTrigger asChild>
                                        <SidebarMenuButton tooltip={item.title}>
                                            {item.icon && <item.icon className="size-[1.1rem]! mr-2" />}
                                            <span>{t(item.title)}</span>
                                            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                        </SidebarMenuButton>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                        <SidebarMenuSub>
                                            {item.items?.map((subItem: any, i: number) => (
                                                <SidebarMenuSubItem key={i}>
                                                    <SidebarMenuSubButton asChild>
                                                        <Link href={subItem.url} className={cn("text-nowrap p-2 overflow-hidden flex gap-3 items-center rounded-sm cursor-pointer transition-colors",
                                                            pathname === subItem.url ? "bg-primary hover:bg-primary/80! text-white hover:text-white dark:text-background dark:hover:text-background" : "text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-500/40 dark:text-gray-300"
                                                        )} onClick={() => isMobile && toggleSidebar()}>
                                                            <div>
                                                                {subItem.icon && <subItem.icon className="size-[1.1rem]" />}
                                                            </div>
                                                            <span className="text-sm">{t(subItem.title)}</span>
                                                        </Link>
                                                    </SidebarMenuSubButton>
                                                </SidebarMenuSubItem>
                                            ))}
                                        </SidebarMenuSub>
                                    </CollapsibleContent>
                                </SidebarMenuItem>
                            </Collapsible>)
                            
                            
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar >
    )
}
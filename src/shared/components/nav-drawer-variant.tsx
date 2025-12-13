"use client";

import { useCallback } from "react";
import { cn } from "@/shared/lib/utils";
import { useTranslations } from "next-intl";
import { usePathname, Link } from "@/shared/i18n/routing";
import { useAuthData } from "@/shared/hooks/use-auth-data";
import { ChevronRight, SquareActivity } from "lucide-react";
import { NavLink, navLinksVariant } from "@/shared/constants";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@radix-ui/react-collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/shared/components/ui/sidebar";
import { useIsClient } from "../hooks/use-client";
import { Divider } from "./divider";

export function AppSidebar() {
  const t = useTranslations();
  const pathname = usePathname();
  const isClient = useIsClient();
  const { userData } = useAuthData();
  const { toggleSidebar, isMobile } = useSidebar();

  const links = useCallback(() => {
    return navLinksVariant?.[userData?.role!] || []
  }, [userData]);

  const isOpen = useCallback(
    (link: NavLink) => {
      if (!userData) return false;

      if (link.url && pathname.startsWith(link.url)) return true;

      if (link.items?.some(item => pathname.startsWith(item.url ?? '')))
        return true;

      return false;
    },
  [pathname, userData]);

  return (
    <Sidebar collapsible="icon" className="bg-card">
      <SidebarHeader className="bg-card">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <div className="flex items-center gap-2">
                <div className="bg-primary text-primary-foreground flex aspect-square size-8 items-center justify-center rounded">
                  <SquareActivity className="size-5" />
                </div>
                <div className="pt-1 flex flex-col gap-0.5 leading-none text-nowrap">
                  <span className="font-medium">VET-CRM</span>
                  <span className="text-xs">Платформа ветеринарии</span>
                </div>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="bg-card h-screen border-t">
        <SidebarGroup>
          {isClient && <SidebarMenu>
            {links().map((item, j) => (
              item.items ? <Collapsible asChild key={j} defaultOpen={isOpen(item)} className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={t(item.title)}>
                      {item.icon && <item.icon className="size-[1.1rem]! mr-2" />}
                      <span>{t(item.title)}</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items?.map((subItem: any, i: number) => (
                        subItem.groupTitle ? <Divider label={subItem.groupTitle} key={`divider-${i}`} /> :
                        <SidebarMenuSubItem key={`${subItem.url}-${i}-${j}`}>
                          <SidebarMenuSubButton asChild>
                            <Link
                              href={subItem.url}
                              className={cn(
                                "text-nowrap p-2 overflow-hidden flex gap-3 items-center rounded-sm cursor-pointer transition-colors",
                                pathname === subItem.url
                                  ? "bg-primary hover:bg-primary/80! text-white hover:text-white"
                                  : "text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-500/40 dark:text-gray-300",
                              )}
                              onClick={() => isMobile && toggleSidebar()}>
                              <div>{subItem.icon && <subItem.icon className="size-[1.1rem]" />}</div>
                              <span className="text-sm">{t(subItem.title)}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
              : <SidebarMenuItem key={j}>
                <SidebarMenuButton tooltip={t(item.title)} asChild>
                  <Link href={item.url!} className={cn(
                      "text-nowrap p-2 overflow-hidden flex gap-3 items-center rounded-sm cursor-pointer transition-colors", pathname === item.url
                        ? "bg-primary hover:bg-primary/80! text-white dark:text-white! hover:text-white"
                        : "hover:bg-gray-200 dark:hover:bg-gray-500/40 dark:text-gray-300!",)}
                    onClick={() => isMobile && toggleSidebar()}>
                    <div>{item.icon && <item.icon className="size-[1.1rem]" />}</div>
                    <span className="text-sm ml-1">{t(item.title)}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>}
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

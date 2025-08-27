'use client'

import Link from "next/link"
import { useTranslations } from "next-intl"
import { ChevronsRight, Home } from "lucide-react"
import { usePathname } from "@/shared/i18n/routing"
import { navLinksVariant } from "@/shared/constants"
import { useIsClient } from "@/shared/hooks/use-client"
import { Fragment, ReactNode, useCallback } from "react"
import { useAuthData } from "@/shared/hooks/use-auth-data"
import { splitPathParam } from "@/shared/helpers/split-path-params"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator} from "@/shared/components/ui/breadcrumb"

export function AppBreadcrumb() {
  const t = useTranslations()
  const isClient = useIsClient()
  const pathname = usePathname()
  const { userData } = useAuthData()

  const rootLinks = useCallback(() => {
    if(!userData) return []

    return navLinksVariant[userData.userRole].map(i => i.items).flat(1)
  }, [userData])

  const links = useCallback(() => {
    const paths: {root: ReactNode, link?: string}[] = [
      { root: <Home size={18} className="text-card-foreground" />, link: "/" },
    ]

    const [path, param] = splitPathParam(pathname)
    const page = rootLinks().find(l => l.url === path)

    paths.push({
      root: <span className="text-sm flex items-center gap-2 text-card-foreground">
        {page?.icon && <page.icon size={18} />}
        {page?.title && t(page.title)}
      </span>,
      ...(page?.url && {link: page?.url})
    })

    if(param) paths.push({
      root: <>{param}</>,
      link: ''
    })

    return paths
  }, [pathname, rootLinks])

  const items = links()

  if (!isClient || !userData) return null

  return (
    <Breadcrumb className="bg-card py-1.5 px-3 border rounded">
      <BreadcrumbList>
        {
          items.map((path, index) => <Fragment key={index}>
            <BreadcrumbItem>
              {
                items.length == index + 1
                ? <BreadcrumbPage className="text-sidebar-accent">{path.root}</BreadcrumbPage>
                : path.link && <BreadcrumbLink asChild>
                    <Link href={path.link} className="text-[13px] text-card-foreground flex items-center gap-2">{path.root}</Link>
                  </BreadcrumbLink>
              }
            </BreadcrumbItem>
            {items.length !== index + 1 && <BreadcrumbSeparator>
              <ChevronsRight />
            </BreadcrumbSeparator>}
          </Fragment>)
        }
      </BreadcrumbList>
    </Breadcrumb>
  );
};
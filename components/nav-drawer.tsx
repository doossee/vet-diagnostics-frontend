'use client'

import Link from "next/link"
import { cn } from '~/lib/utils'
import { navLinks } from '~/constants'
import { createPortal } from 'react-dom'
import { useEffect, useState } from "react"
import { AlignJustify } from 'lucide-react'
import { usePathname } from "next/navigation"
import { Button } from "~/components/ui/button"
import { useAuthData } from "~/hooks/use-auth-data"

export function NavDrawer() {
    const pathname = usePathname()
    const { userData } = useAuthData()    
    const [isOpen, setIsOpen] = useState(false)
    const [links, setLinks] = useState<any[]>([])
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
        setLinks(navLinks[userData?.userRole!]||[])
    }, [])

    return (
        <div className={cn("absolute md:sticky z-40 h-full bg-card border border-l transition-all", isOpen?'w-[250px]':'w-[57px]')}>
            <div className="p-2 space-y-2 overflow-y-auto h-full">
                { links.map((link, i) =>
                    <Link key={i} href={link.url} className={cn("text-nowrap py-2 px-2 overflow-hidden flex gap-6 items-center rounded cursor-pointer transition-colors dark:text-gray-300",
                        pathname === link.url ? "bg-primary hover:bg-primary/80 text-white dark:text-background" : "text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-500/40"
                    )}>
                        <div>
                            <link.icon />
                        </div>
                        <span className="text-sm">{link.title}</span>
                    </Link>
                ) }
                {
                    isClient && createPortal(
                        <Button variant="outline" className={cn(isOpen?'ml-[190px] md:ml-0':'')} size="icon" onClick={() => setIsOpen(p => !p)}>
                            <AlignJustify className="h-[1.2rem] w-[1.2rem]" />
                            <span className="sr-only">toggle nav drawer</span>
                        </Button>,
                        document.getElementById('top-bar')!
                    )
                }
            </div>
        </div>
    )
}
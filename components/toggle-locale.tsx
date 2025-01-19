'use client'

import { useLocale } from 'next-intl'
import { Button } from '~/components/ui/button'
import { usePathname, useRouter } from "next/navigation"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '~/components/ui/dropdown-menu'

export function ToggleLocale() {
    const router = useRouter()
    const pathname = usePathname()
    const locale = useLocale()
    const locales = [
        { name: "O'zbek", locale: 'uz' },
        { name: 'Русский', locale: 'ru' },
    ]

    const changeLocale = (lang: string) => {
        const newpath = pathname.replace('/'+locale, '')
        router.replace(`/${lang}${newpath}`)
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className='uppercase'>
                    { locales.find(l => l.locale === locale)?.locale }
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {
                    locales.map(l => 
                        <DropdownMenuItem key={l.locale} onClick={() => changeLocale(l.locale)}>
                            {l.name}
                        </DropdownMenuItem>
                    )
                }
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
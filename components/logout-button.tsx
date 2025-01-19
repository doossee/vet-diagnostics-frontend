'use client'

import { Button } from "./ui/button"
import { LogOut } from 'lucide-react'
import { useRouter } from "~/i18n/routing"
import { useAuthData } from "~/hooks/use-auth-data"


export function LogoutButton() {
    const router = useRouter()
    const { setAuthData } = useAuthData()

    const handleLogout = () => {
        if(!confirm('Hisobingizdan chiqishni hohlaysizmi?')) return

        setAuthData(null, "ACCESS_TOKEN")
        setAuthData(null, "REFRESH_TOKEN")
        setAuthData(null, "USER_DATA")
        
        router.push('/login')
    }

    return (
        <Button onClick={() => handleLogout()} variant="outline" size="icon">
          <LogOut />
        </Button>
    )
}
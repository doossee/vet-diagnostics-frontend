"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import { Button } from "~/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "~/components/ui/dropdown-menu"

export function ModeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <div className="flex justify-center items-center">
            <Sun className="h-[1.2rem] w-[1.2rem] block dark:hidden" />
            <Moon className="h-[1.2rem] w-[1.2rem] hidden dark:block" />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Yorug'
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Qorong'u
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          Tizim
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

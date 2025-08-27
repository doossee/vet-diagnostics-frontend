"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { THEMES } from "@/shared/constants"
import { useTranslations } from "next-intl"
import { Button } from "@/shared/components/ui/button"

export function ModeToggle() {
  const t = useTranslations()
  const { theme, setTheme } = useTheme()

  return (
    <div className="grid gap-2 grid-cols-3">
      {
        THEMES.map((t, i) =>
        <Button variant={t.name === theme ? "outline" : "ghost"} key={i} size={"sm"} onClick={() => setTheme(t.name)}>
          <t.icon className="h-[1.2rem] w-[1.2rem]" />
        </Button>)
      }
    </div>
  )
}

'use client'

import { LucideFile } from "lucide-react"
import { type PropsWithChildren } from "react"

export function EmptyState ({ children }: PropsWithChildren) {
  return (
    <div className="flex items-center justify-center p-4">
      <div className="flex w-full flex-col items-center gap-4 text-center">
        <div className="bg-muted flex items-center justify-center rounded-full p-4">
          <LucideFile className="size-6" />
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-lg font-bold">Данные не найдены</h1>
          <p className="text-muted-foreground text-sm">
            Похоже, на этой странице нет данных. Вы можете создать новую
            или обновить страницу. 
          </p>
        </div>
        <div className="flex items-center gap-2">
          {children}
        </div>
      </div>
    </div>
  )
}
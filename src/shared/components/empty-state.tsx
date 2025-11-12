"use client";

import { LucideFile } from "lucide-react";
import { useI18n } from "../hooks/use-i18n";
import { type PropsWithChildren } from "react";

export function EmptyState({ children }: PropsWithChildren) {
  const { t } = useI18n();
 
  return (
    <div className="flex items-center justify-center p-4">
      <div className="flex w-full flex-col items-center gap-4 text-center">
        <div className="bg-muted flex items-center justify-center rounded-full p-4">
          <LucideFile className="size-6" />
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-lg font-bold">{t('noData.title')}</h1>
          <p className="text-muted-foreground text-sm">{t('noData.description')}</p>
        </div>
        <div className="flex items-center gap-2">{children}</div>
      </div>
    </div>
  );
}

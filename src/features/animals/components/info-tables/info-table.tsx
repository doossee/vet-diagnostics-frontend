"use client";

import { ExternalLink, Pencil, Plus } from "lucide-react";
import { ReactNode, useMemo } from "react";

import { useI18n } from "@/shared/hooks/use-i18n";
import { LanguageLocales } from "@/shared/types";
import { Button } from "@/shared/components/ui/button";
import { UseQueryResult } from "@tanstack/react-query";
import { EmptyState } from "@/shared/components/empty-state";
import { SkeletonWrapper } from "@/shared/components/elements/skeleton-wrapper";
import { Table, TableBody, TableCell, TableRow } from "@/shared/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";

type Props<T> = {
  data?: T | null
  icon: ReactNode
  isLoading?: boolean
  localeTitle: string
  sessionLabel?: string
  hideCreateButton?: boolean
  onCreate?: (createNew?: boolean) => void
  onAdd?: () => void
  onEdit?: () => void
  queryFn?: () => UseQueryResult<T | null, any>
  createColumns: (fn1: any, fn2: any, t: any, locale: LanguageLocales) => any[],
}

export function InfoTable<T>({ localeTitle, icon, hideCreateButton, createColumns, data, isLoading, onCreate, onAdd, onEdit, sessionLabel }: Props<T>) {
  const { t, locale } = useI18n();

  const columns = useMemo(() =>
    createColumns(()=>{}, ()=>{}, t, locale)
    .filter(col => !col.hideInInfoTable)
  , [t, locale])

  const showEmptyState = useMemo(() =>
    !data && !isLoading
  , [data, isLoading])

  return (<Card className="shadow-none rounded">
    <CardHeader>
      <div className="flex items-center justify-between gap-4">
        <CardTitle className="flex items-center gap-2 text-sm md:text-base">
          <div>
            {icon}
          </div>
          <div>
            {t(localeTitle)}
            {sessionLabel && (
              <p className="text-xs font-normal text-muted-foreground mt-0.5">{sessionLabel}</p>
            )}
          </div>
        </CardTitle>

        <div className="flex items-center gap-2 shrink-0">
          {data && onEdit && (
            <Button size="sm" variant="outline" onClick={onEdit}>
              <Pencil className="size-4" />
            </Button>
          )}
          {!hideCreateButton && (
            <Button size={'sm'} onClick={() => onCreate?.()}>
              <ExternalLink />
              <span className="hidden md:inline">{t("show")}</span>
            </Button>
          )}
        </div>
      </div>
    </CardHeader>
    <CardContent className="px-4 max-h-[630px] overflow-auto">
      {(showEmptyState && !hideCreateButton) ? (
        <EmptyState>
          <Button onClick={() => onAdd ? onAdd() : onCreate?.(true)}>
            <Plus />
            {t("form.add")}
          </Button>
        </EmptyState>
      ) : <Table>
        <TableBody>
          {
            columns.map((row) =>
              <TableRow key={row.key}>
                <TableCell>
                  <b className="whitespace-pre-line text-left">{row.title}</b>
                </TableCell>
                <TableCell>
                  <SkeletonWrapper loading={isLoading}>
                    <div className="text-right whitespace-pre-line ">
                      {
                        data && (row.render ? row.render(data) : String(data?.[row.key as keyof T]))
                      }
                    </div>
                  </SkeletonWrapper>
                </TableCell>
              </TableRow>
            )
          }
        </TableBody>
      </Table>}
    </CardContent>
  </Card>)
}
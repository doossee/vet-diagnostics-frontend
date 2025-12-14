"use client";

import { ExternalLink, Plus } from "lucide-react";
import { JSX, ReactNode, useMemo } from "react";

import { useI18n } from "@/shared/hooks/use-i18n";
import { LanguageLocales } from "@/shared/types";
import { Button } from "@/shared/components/ui/button";
import { UseQueryResult } from "@tanstack/react-query";
import { EmptyState } from "@/shared/components/empty-state";
import { SkeletonWrapper } from "@/shared/components/elements/skeleton-wrapper";
import { Table, TableBody, TableCell, TableRow } from "@/shared/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";

type Props<T> = {
  icon: ReactNode
  localeTitle: string
  hideCreateButton?: boolean
  onCreate?: (createNew?: boolean) => void
  queryFn: () => UseQueryResult<T | null, any>
  createColumns: (fn1: any, fn2: any, t: any, locale: LanguageLocales) => any[],
}

export function InfoTable<T>({ localeTitle, icon, hideCreateButton, createColumns, queryFn, onCreate }: Props<T>) {
  const { t, locale } = useI18n();
  const { data, isLoading } = queryFn();

  const columns = useMemo(() =>
    createColumns(()=>{}, ()=>{}, t, locale)
    .filter(col => !col.hideInInfoTable)
  , [t, locale])

  const showEmptyState = useMemo(() =>
    !data && !isLoading
  , [data, isLoading])

  return (<Card className="shadow-none rounded">
    <CardHeader>
      <div className="flex items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          {icon}
          {t(localeTitle)}
        </CardTitle>

        {!hideCreateButton && <Button onClick={() => onCreate?.()}>
          <ExternalLink />
          {t("show")}
        </Button>}
      </div>
    </CardHeader>
    <CardContent className="px-4 max-h-[630px] overflow-auto">
      {(showEmptyState && !hideCreateButton) ? (
        <EmptyState>
          <Button onClick={() => onCreate?.(true)}>
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
                  <b>{row.title}</b>
                </TableCell>
                <TableCell>
                  <SkeletonWrapper loading={isLoading}>
                    {
                      data && (row.render ? row.render(data) : String(data?.[row.key as keyof T]))
                    }
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
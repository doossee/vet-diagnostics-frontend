"use client";

import { Shovel } from "lucide-react";

import { FecesExam } from "@/shared/types";
import { routes } from "@/shared/constants/routes";
import { createDungTestColumns } from "@/entities/dung-tests";

import { InfoTable } from "./info-table";

type Props = {
  isLoading?: boolean
  data?: FecesExam | null
  onCreate?: (route: string, createNew?: boolean) => void
}

export function FecesExamInfoTable({ data, isLoading, onCreate }: Props) {
  const handleOpen = (createNew?: boolean) => {
    onCreate?.(routes.DUNG_TESTS, createNew)
  }
  
  return <InfoTable
    data={data}
    onCreate={handleOpen}
    isLoading={isLoading}
    localeTitle="nav.dungTests"
    createColumns={createDungTestColumns}
    icon={<Shovel className="size-5 md:size-6" />}
  />
}
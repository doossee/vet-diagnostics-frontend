"use client";

import { Beaker } from "lucide-react";

import { UrineExam } from "@/shared/types";
import { routes } from "@/shared/constants/routes";
import { createUrineTestColumns } from "@/entities/urine-tests";

import { InfoTable } from "./info-table";

type Props = {
  isLoading?: boolean
  data?: UrineExam | null
  onCreate?: (route: string, createNew?: boolean) => void
}

export function UrineExamInfoTable({ data, isLoading, onCreate }: Props) {
  const handleOpen = (createNew?: boolean) => {
    onCreate?.(routes.URINE_TESTS, createNew)
  }
  
  return <InfoTable
    data={data}
    onCreate={handleOpen}
    isLoading={isLoading}
    localeTitle="nav.urineTests"
    createColumns={createUrineTestColumns}
    icon={<Beaker className="size-5 md:size-6" />}
  />
}
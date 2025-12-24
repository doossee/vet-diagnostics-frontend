"use client";

import { Beaker } from "lucide-react";

import { InfoTable } from "./info-table";
import { routes } from "@/shared/constants/routes";
import { createUrineTestColumns } from "@/entities/urine-tests";
import { useGetLastUrineTestByAnimal } from "@/entities/urine-tests/services/queries";

type Props = {
  id: string
  onCreate?: (route: string, createNew?: boolean) => void
}

export function UrineExamInfoTable({ id, onCreate }: Props) {
  const handleOpen = (createNew?: boolean) => {
    onCreate?.(routes.URINE_TESTS, createNew)
  }
  
  return <InfoTable
    onCreate={handleOpen}
    icon={<Beaker className="size-5 md:size-6" />}
    localeTitle="nav.urineTests"
    createColumns={createUrineTestColumns}
    queryFn={() => useGetLastUrineTestByAnimal(id)}
  />
}
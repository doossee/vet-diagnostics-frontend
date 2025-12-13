"use client";

import { Shovel } from "lucide-react";

import { InfoTable } from "./info-table";
import { routes } from "@/shared/constants/routes";
import { createDungTestColumns } from "@/entities/dung-tests";
import { useGetLastDungTestByAnimal } from "@/entities/dung-tests/services/queries";

type Props = {
  id: string
  onCreate?: (route: string, createNew?: boolean) => void
}

export function FecesExamInfoTable({ id, onCreate }: Props) {
  const handleOpen = (createNew?: boolean) => {
    onCreate?.(routes.DUNG_TESTS, createNew)
  }
  
  return <InfoTable
    onCreate={handleOpen}
    icon={<Shovel />}
    localeTitle="nav.dungTests"
    createColumns={createDungTestColumns}
    queryFn={() => useGetLastDungTestByAnimal(id)}
  />
}
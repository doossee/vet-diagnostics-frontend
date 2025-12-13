"use client";

import { ScanEye } from "lucide-react";

import { InfoTable } from "./info-table";
import { routes } from "@/shared/constants/routes";
import { createMucosaExamColumns } from "@/entities/mucosa-exams";
import { useGetLastMucosaExamByAnimal } from "@/entities/mucosa-exams/services/queries";

type Props = {
  id: string
  onCreate?: (route: string, createNew?: boolean) => void
}

export function MucosaExamInfoTable({ id, onCreate }: Props) {
  const handleOpen = (createNew?: boolean) => {
    onCreate?.(routes.MUCOSA_EXAMS, createNew)
  }
  
  return <InfoTable
    onCreate={handleOpen}
    icon={<ScanEye />}
    localeTitle="nav.mucosaExams"
    createColumns={createMucosaExamColumns}
    queryFn={() => useGetLastMucosaExamByAnimal(id)}
  />
}
"use client";

import { ScanHeart } from "lucide-react";

import { InfoTable } from "./info-table";
import { routes } from "@/shared/constants/routes";
import { createDiseaseColumns } from "@/entities/diseases";
import { useGetLastDisease } from "@/entities/diseases/services/queries";

type Props = {
  id: string
  onCreate?: (route: string, createNew?: boolean) => void
}

export function DiseaseInfoTable({ id, onCreate }: Props) {
  const handleOpen = (createNew?: boolean) => {
    onCreate?.(routes.DISEASES, createNew)
  }

  return <InfoTable
    onCreate={handleOpen}
    icon={<ScanHeart />}
    localeTitle="nav.diseases"
    createColumns={createDiseaseColumns}
    queryFn={() => useGetLastDisease(id)}
  />
}
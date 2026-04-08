"use client";

import { ScanHeart } from "lucide-react";

import { Disease } from "@/shared/types";
import { routes } from "@/shared/constants/routes";
import { createDiseaseColumns } from "@/entities/diseases";

import { InfoTable } from "./info-table";

type Props = {
  data?: Disease
  isLoading?: boolean
  onCreate?: (route: string, createNew?: boolean) => void
}

export function DiseaseInfoTable({ data, isLoading, onCreate }: Props) {
  const handleOpen = (createNew?: boolean) => {
    onCreate?.(routes.DISEASES, createNew)
  }

  return <InfoTable
    data={data}
    onCreate={handleOpen}
    isLoading={isLoading}
    localeTitle="nav.diseases"
    createColumns={createDiseaseColumns}
    icon={<ScanHeart className="size-5 md:size-6" />}
    // queryFn={() => useGetLastDisease(id)}
  />
}
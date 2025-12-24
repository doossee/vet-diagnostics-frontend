"use client";

import { Stethoscope } from "lucide-react";

import { InfoTable } from "./info-table";
import { createGeneralInspectionColumns } from "@/entities/general-inspections";
import { useGetLastGeneralInspection } from "@/entities/general-inspections/services/queries";
import { routes } from "@/shared/constants/routes";

type Props = {
  id: string
  onCreate?: (route: string, createNew?: boolean) => void
}

export function ClinicExamInfoTable({ id, onCreate }: Props) {
  const handleOpen = (createNew?: boolean) => {
    onCreate?.(routes.GENERAL_INSPECTIONS, createNew)
  }

  return <InfoTable
    onCreate={handleOpen}
    icon={<Stethoscope className="size-5 md:size-6" />}
    localeTitle="animals.generalInspection"
    createColumns={createGeneralInspectionColumns}
    queryFn={() => useGetLastGeneralInspection(id)}
  />
}
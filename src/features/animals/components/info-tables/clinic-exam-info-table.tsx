"use client";

import { Stethoscope } from "lucide-react";

import { ClinicalExam } from "@/shared/types";
import { routes } from "@/shared/constants/routes";
import { createGeneralInspectionColumns } from "@/entities/general-inspections";

import { InfoTable } from "./info-table";

type Props = {
  isLoading?: boolean
  data?: ClinicalExam | null
  sessionLabel?: string
  onAdd?: () => void
  onEdit?: () => void
  onCreate?: (route: string, createNew?: boolean) => void
}

export function ClinicExamInfoTable({ data, isLoading, onCreate, onAdd, onEdit, sessionLabel }: Props) {
  const handleOpen = (createNew?: boolean) => {
    onCreate?.(routes.GENERAL_INSPECTIONS, createNew)
  }

  return <InfoTable
    data={data}
    onCreate={handleOpen}
    isLoading={isLoading}
    onAdd={onAdd}
    onEdit={onEdit}
    sessionLabel={sessionLabel}
    localeTitle="animals.generalInspection"
    createColumns={createGeneralInspectionColumns}
    icon={<Stethoscope className="size-5 md:size-6" />}
  />
}
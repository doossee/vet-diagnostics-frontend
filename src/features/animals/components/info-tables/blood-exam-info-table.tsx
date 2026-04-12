"use client";

import { Syringe } from "lucide-react";

import { BloodExam } from "@/shared/types";
import { routes } from "@/shared/constants/routes";
import { createGeneralBloodTestColumns } from "@/entities/general-blood-tests";

import { InfoTable } from "./info-table";

type Props = {
  isLoading?: boolean
  data?: BloodExam | null
  sessionLabel?: string
  onAdd?: () => void
  onEdit?: () => void
  onCreate?: (route: string, createNew?: boolean) => void
}

export function BloodExamInfoTable({ data, isLoading, onCreate, onAdd, onEdit, sessionLabel }: Props) {
  const handleOpen = (createNew?: boolean) => {
    onCreate?.(routes.GENERAL_BLOOD_TESTS, createNew)
  }

  return <InfoTable
    data={data}
    onCreate={handleOpen}
    isLoading={isLoading}
    onAdd={onAdd}
    onEdit={onEdit}
    sessionLabel={sessionLabel}
    localeTitle="nav.generalBloodTests"
    createColumns={createGeneralBloodTestColumns}
    icon={<Syringe className="size-5 md:size-6" />}
  />
}
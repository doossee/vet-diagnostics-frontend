"use client";

import { Syringe } from "lucide-react";

import { BloodExam } from "@/shared/types";
import { routes } from "@/shared/constants/routes";
import { createGeneralBloodTestColumns } from "@/entities/general-blood-tests";

import { InfoTable } from "./info-table";

type Props = {
  isLoading?: boolean
  data?: BloodExam | null
  onCreate?: (route: string, createNew?: boolean) => void
}

export function BloodExamInfoTable({ data, isLoading, onCreate }: Props) {
  const handleOpen = (createNew?: boolean) => {
    onCreate?.(routes.GENERAL_BLOOD_TESTS, createNew)
  }

  return <InfoTable
    data={data}
    onCreate={handleOpen}
    isLoading={isLoading}
    localeTitle="nav.generalBloodTests"
    createColumns={createGeneralBloodTestColumns}
    icon={<Syringe className="size-5 md:size-6" />}
  />
}
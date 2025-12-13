"use client";

import { Syringe } from "lucide-react";

import { InfoTable } from "./info-table";
import { createGeneralBloodTestColumns } from "@/entities/general-blood-tests";
import { useGetLastGeneralBloodTest } from "@/entities/general-blood-tests/services/queries";
import { routes } from "@/shared/constants/routes";

type Props = {
  id: string
  onCreate?: (route: string, createNew?: boolean) => void
}

export function BloodExamInfoTable({ id, onCreate }: Props) {
  const handleOpen = (createNew?: boolean) => {
    onCreate?.(routes.GENERAL_BLOOD_TESTS, createNew)
  }

  return <InfoTable
    onCreate={handleOpen}
    icon={<Syringe />}
    localeTitle="nav.generalBloodTests"
    createColumns={createGeneralBloodTestColumns}
    queryFn={() => useGetLastGeneralBloodTest(id)}
  />
}
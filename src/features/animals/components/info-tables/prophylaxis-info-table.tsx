"use client";

import { Activity } from "lucide-react";

import { InfoTable } from "./info-table";
import { routes } from "@/shared/constants/routes";
import { createProphylaxisColumns } from "@/entities/prophylaxis";
import { useGetLastProphylaxisByAnimal } from "@/entities/prophylaxis/services/prophylaxis-queries";

type Props = {
  id: string
  onCreate?: (route: string, createNew?: boolean) => void
}

export function ProphylaxisInfoTable({ id, onCreate }: Props) {
  const { data, isLoading } = useGetLastProphylaxisByAnimal(id, !!id)

  const handleOpen = (createNew?: boolean) => {
    onCreate?.(routes.PROPHYLAXIS, createNew)
  }

  return <InfoTable
    data={data}
    isLoading={isLoading}
    onCreate={handleOpen}
    icon={<Activity className="size-5 md:size-6" />}
    localeTitle="nav.prophylaxis"
    createColumns={createProphylaxisColumns}
  />
}
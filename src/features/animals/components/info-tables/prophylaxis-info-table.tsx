"use client";

import { useState } from "react";
import { Activity } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog";

import { useQueryClient } from "@tanstack/react-query";

import { InfoTable } from "./info-table";
import { routes } from "@/shared/constants/routes";
import { createProphylaxisColumns } from "@/entities/prophylaxis";
import { ProphylaxisQueryKeys } from "@/entities/prophylaxis/utils/constants/query-keys";
import { useGetLastProphylaxisByAnimal } from "@/entities/prophylaxis/services/prophylaxis-queries";
import { useCreateProphylaxis } from "@/entities/prophylaxis/services/prophylaxis-mutations";
import { ProphylaxisForm } from "@/features/prophylaxis/form";
import { prophylaxisValues } from "@/features/prophylaxis/prophylaxis.model";
import { useI18n } from "@/shared/hooks/use-i18n";
import { ProphylaxisSchema } from "@/features/prophylaxis";

type Props = {
  id: string
  onCreate?: (route: string, createNew?: boolean) => void
}

export function ProphylaxisInfoTable({ id, onCreate }: Props) {
  const { data, isLoading } = useGetLastProphylaxisByAnimal(id, !!id)
  const [dialogOpen, setDialogOpen] = useState(false)
  const { mutateAsync: create } = useCreateProphylaxis()
  const queryClient = useQueryClient()
  const { t } = useI18n()

  const handleOpen = (createNew?: boolean) => {
    onCreate?.(routes.PROPHYLAXIS, createNew)
  }

  const handleSubmit = async (values: ProphylaxisSchema) => {
    await create(values)
    queryClient.invalidateQueries({ queryKey: [ProphylaxisQueryKeys.PROPHYLAXIS_LAST_BY_ANIMAL, id] })
    setDialogOpen(false)
  }

  return (
    <>
      <InfoTable
        data={data}
        isLoading={isLoading}
        onCreate={handleOpen}
        onAdd={() => setDialogOpen(true)}
        icon={<Activity className="size-5 md:size-6" />}
        localeTitle="nav.prophylaxis"
        createColumns={createProphylaxisColumns}
      />

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("pages.createProphylaxisMeasures")}</DialogTitle>
          </DialogHeader>
          <ProphylaxisForm
            defaultValues={{ ...prophylaxisValues, animalId: id } as unknown as ProphylaxisSchema}
            onSubmit={handleSubmit}
          />
        </DialogContent>
      </Dialog>
    </>
  )
}

"use client";

import { useMemo } from "react";
import type { VetStation } from "@/shared/types";
import { useI18n } from "@/shared/hooks/use-i18n";
import { useCrud } from "@/shared/hooks/use-crud";
import { DataTable } from "@/shared/components/data-table";
import { Modal } from "@/shared/components/elements/modal";
import { createVetStationColumns } from "@/entities/vetstations";
import { VetStationForm, VetStationSchema } from "@/features/vetstations";
import { useGetVetStations } from "@/entities/vetstations/services/queries";
import { useCreateVetStation, useDeleteVetStation, useUpdateVetStation } from "@/entities/vetstations/services/mutations";

export default function VetStations() {
  const { t } = useI18n();

  const { dialog, editedItem, createButton, handleClose, handleDelete, handleEditItem, onSubmit } = useCrud<VetStation, VetStationSchema, VetStationSchema>({
    createMutation: useCreateVetStation,
    updateMutation: useUpdateVetStation,
    removeMutation: useDeleteVetStation,
  });

  const columns = useMemo(() => createVetStationColumns(handleEditItem, handleDelete, t), [handleEditItem, handleDelete]);

  return (
    <div>
      <DataTable columns={columns} queryFunction={useGetVetStations} topSlot={createButton(t("regions.createVetStation"))} />

      <Modal open={dialog} onClose={handleClose} title={t(editedItem ? "regions.editVetStation" : "regions.createVetStation")}>
        <VetStationForm onSubmit={onSubmit} defaultValues={editedItem ? editedItem : undefined} />
      </Modal>
    </div>
  );
}

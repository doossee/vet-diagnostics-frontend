"use client";

import { useMemo } from "react";
import { Region } from "@/shared/types";
import { useI18n } from "@/shared/hooks/use-i18n";
import { useCrud } from "@/shared/hooks/use-crud";
import { createRegionColums } from "@/entities/regions";
import { DataTable } from "@/shared/components/data-table";
import { Modal } from "@/shared/components/elements/modal";
import { RegionForm, RegionSchema } from "@/features/regions";
import { useCreateRegions, useDeleteRegions, useUpdateRegions } from "@/entities/regions/services/mutations";
import { useGetRegions } from "@/entities/regions/services/queries";

export default function Regions() {
  const { t } = useI18n();
  const { dialog, editedItem, createButton, handleClose, handleDelete, handleEditItem, onSubmit } = useCrud<Region, RegionSchema, RegionSchema>({
    createMutation: useCreateRegions,
    updateMutation: useUpdateRegions,
    removeMutation: useDeleteRegions,
  });

  const columns = useMemo(() => createRegionColums(handleEditItem, handleDelete, t), [handleEditItem, handleDelete]);

  return (
    <div>
      <DataTable columns={columns} queryFunction={useGetRegions} topSlot={createButton(t("regions.createRegion"))} />

      <Modal open={dialog} onClose={handleClose} title={t(editedItem ? "regions.editRegion" : "regions.createRegion")}>
        <RegionForm onSubmit={onSubmit} defaultValues={editedItem ? editedItem : undefined} />
      </Modal>
    </div>
  );
}

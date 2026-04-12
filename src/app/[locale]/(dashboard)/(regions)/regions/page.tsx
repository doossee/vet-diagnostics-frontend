"use client";

import { useMemo } from "react";
import { Region } from "@/shared/types";
import { useI18n } from "@/shared/hooks/use-i18n";
import { useCrud } from "@/shared/hooks/use-crud";
import { createRegionColumns } from "@/entities/regions";
import { DataTable } from "@/shared/components/data-table";
import { Modal } from "@/shared/components/elements/modal";
import { ExcelDownloadButton } from "@/shared/components/excel-download-button";
import { RegionForm, RegionSchema } from "@/features/regions";
import { useCreateRegions, useDeleteRegions, useUpdateRegions } from "@/entities/regions/services/mutations";
import { useGetRegions } from "@/entities/regions/services/queries";

export default function Regions() {
  const { t, locale } = useI18n();
  const { dialog, editedItem, createButton, handleClose, handleDelete, handleEditItem, onSubmit } = useCrud<Region, RegionSchema, RegionSchema>({
    createMutation: useCreateRegions,
    updateMutation: useUpdateRegions,
    removeMutation: useDeleteRegions,
  });

  const columns = useMemo(() => createRegionColumns(handleEditItem, handleDelete, t, locale), [handleEditItem, handleDelete, locale]);

  return (
    <div>
      <DataTable columns={columns} queryFunction={useGetRegions} topSlot={<div className="flex gap-2"><ExcelDownloadButton importUrl="/regions/import" />{createButton(t("regions.createRegion"))}</div>} />

      <Modal open={dialog} onClose={handleClose} title={t(editedItem ? "regions.editRegion" : "regions.createRegion")}>
        <RegionForm onSubmit={onSubmit} defaultValues={editedItem ? editedItem : undefined} />
      </Modal>
    </div>
  );
}

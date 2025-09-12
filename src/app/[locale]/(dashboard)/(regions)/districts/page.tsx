"use client";

import { useMemo } from "react";
import type { District } from "@/shared/types";
import { useI18n } from "@/shared/hooks/use-i18n";
import { useCrud } from "@/shared/hooks/use-crud";
import { DataTable } from "@/shared/components/data-table";
import { Modal } from "@/shared/components/elements/modal";
import { createDistrictColums } from "@/entities/districts";
import { DistrictForm, DistrictSchema } from "@/features/districts";
import { useGetDistricts } from "@/entities/districts/services/queries";
import { useCreateDistrict, useDeleteDistrict, useUpdateDistrict } from "@/entities/districts/services/mutations";

export default function Districts() {
  const { t } = useI18n();

  const { dialog, editedItem, createButton, handleClose, handleDelete, handleEditItem, onSubmit } = useCrud<District, DistrictSchema, DistrictSchema>({
    createMutation: useCreateDistrict,
    updateMutation: useUpdateDistrict,
    removeMutation: useDeleteDistrict,
  });

  const columns = useMemo(() => createDistrictColums(handleEditItem, handleDelete, t), [handleEditItem, handleDelete]);

  return (
    <div>
      <DataTable columns={columns} queryFunction={useGetDistricts} topSlot={createButton(t("regions.createDistrict"))} />

      <Modal open={dialog} onClose={handleClose} title={t(editedItem ? "regions.editDistrict" : "regions.createDistrict")}>
        <DistrictForm onSubmit={onSubmit} defaultValues={editedItem ? editedItem : undefined} />
      </Modal>
    </div>
  );
}

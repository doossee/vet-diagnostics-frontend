"use client";

import { useMemo } from "react";
import type { VaccineType } from "@/shared/types";
import { useI18n } from "@/shared/hooks/use-i18n";
import { useCrud } from "@/shared/hooks/use-crud";
import { Modal } from "@/shared/components/elements/modal";
import { DataTable } from "@/shared/components/data-table";
import { createVaccineTypeColums } from "@/entities/vaccine-types";
import { VaccineTypeForm, VaccineTypeSchema } from "@/features/vaccine-types";
import { useGetVaccineTypes } from "@/entities/vaccine-types/services/vaccine-type-queries";
import { useCreateVaccineType, useDeleteVaccineType, useUpdateVaccineType } from "@/entities/vaccine-types/services/vaccine-type-mutations";

export default function VaccineTypes() {
  const { t } = useI18n();

  const { dialog, editedItem, createButton, handleClose, handleDelete, handleEditItem, onSubmit, setDialog } = useCrud<VaccineType, VaccineTypeSchema, VaccineTypeSchema>({
    createMutation: useCreateVaccineType,
    updateMutation: useUpdateVaccineType,
    removeMutation: useDeleteVaccineType,
  });

  const columns = useMemo(() => createVaccineTypeColums(handleEditItem, handleDelete, t), [handleEditItem, handleDelete]);

  return (
    <div>
      <DataTable columns={columns} queryFunction={useGetVaccineTypes} topSlot={createButton(t("management.vaccineTypeCreate"))} />

      <Modal open={dialog} onClose={handleClose} title={t(editedItem ? "management.editType" : "management.createType")}>
        <VaccineTypeForm onSubmit={onSubmit} defaultValues={editedItem ? editedItem : (undefined as any)} />
      </Modal>
    </div>
  );
}

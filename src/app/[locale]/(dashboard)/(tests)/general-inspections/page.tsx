"use client";

import { useMemo } from "react";
import { useI18n } from "@/shared/hooks/use-i18n";
import { useCrud } from "@/shared/hooks/use-crud";
import { GeneralInspection } from "@/shared/types";
import { DataTable } from "@/shared/components/data-table";
import { Modal } from "@/shared/components/elements/modal";
import { createGeneralInspectionColums } from "@/entities/general-inspections";
import { useGetGeneralInspections } from "@/entities/general-inspections/services/queries";
import { GeneralInspectionForm, GeneralInspectionSchema } from "@/features/general-inspections";
import { useCreateGeneralInspection, useDeleteGeneralInspection, useUpdateGeneralInspection } from "@/entities/general-inspections/services/mutations";

export default function GeneralInspections() {
  const { t, locale } = useI18n();

  const { dialog, editedItem, createButton, handleClose, handleDelete, handleEditItem, onSubmit } = useCrud<GeneralInspection, GeneralInspectionSchema, GeneralInspectionSchema>({
    createMutation: useCreateGeneralInspection,
    updateMutation: useUpdateGeneralInspection,
    removeMutation: useDeleteGeneralInspection,
  });

  const columns = useMemo(() => createGeneralInspectionColums(handleEditItem, handleDelete, t, locale), [handleEditItem, handleDelete]);

  return (
    <div>
      <DataTable columns={columns} queryFunction={useGetGeneralInspections} topSlot={createButton(t("inspections.createGeneralInspections"))} />

      <Modal open={dialog} onClose={handleClose} widthClassName="bg-card max-w-[600px]!" title={t(editedItem ? "inspections.editGeneralInspections" : "inspections.createGeneralInspections")}>
        <GeneralInspectionForm onSubmit={onSubmit} defaultValues={editedItem ? editedItem : (undefined as any)} />
      </Modal>
    </div>
  );
}

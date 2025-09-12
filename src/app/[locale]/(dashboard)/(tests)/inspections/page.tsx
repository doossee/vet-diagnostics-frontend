"use client";

import { useMemo } from "react";
import type { Inspection } from "@/shared/types";
import { useI18n } from "@/shared/hooks/use-i18n";
import { useCrud } from "@/shared/hooks/use-crud";
import { DataTable } from "@/shared/components/data-table";
import { Modal } from "@/shared/components/elements/modal";
import { createInspectionColums } from "@/entities/inspections";
import { InspectionForm, InspectionSchema } from "@/features/inspections";
import { useGetInspections } from "@/entities/inspections/services/queries";
import { useCreateInspection, useDeleteInspection, useUpdateInspection } from "@/entities/inspections/services/mutations";

export default function Inspections() {
  const { t, locale } = useI18n();

  const { dialog, editedItem, createButton, handleClose, handleDelete, handleEditItem, onSubmit } = useCrud<Inspection, InspectionSchema, InspectionSchema>({
    createMutation: useCreateInspection,
    updateMutation: useUpdateInspection,
    removeMutation: useDeleteInspection,
  });

  const columns = useMemo(() => createInspectionColums(handleEditItem, handleDelete, t, locale), [handleEditItem, handleDelete]);

  return (
    <div>
      <DataTable columns={columns} queryFunction={useGetInspections} topSlot={createButton(t("inspections.createInspection"))} />

      <Modal open={dialog} onClose={handleClose} title={t(editedItem ? "inspections.editInspection" : "inspections.createInspection")}>
        <InspectionForm type="MORNING" onSubmit={onSubmit} defaultValues={editedItem ? editedItem : (undefined as any)} />
      </Modal>
    </div>
  );
}

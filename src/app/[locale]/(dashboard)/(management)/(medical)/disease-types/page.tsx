"use client";

import { useMemo } from "react";
import { useCrud } from "@/shared/hooks/use-crud";
import { useI18n } from "@/shared/hooks/use-i18n";
import type { DiseaseCategory } from "@/shared/types";
import { DataTable } from "@/shared/components/data-table";
import { Modal } from "@/shared/components/elements/modal";
import { createDiseaseTypeColumns } from "@/entities/disease-types";
import { DiseaseTypeForm, DiseaseTypeSchema } from "@/features/disease-types";
import { useGetDiseaseTypes } from "@/entities/disease-types/services/queries";
import { useCreateDiseaseType, useDeleteDiseaseType, useUpdateDiseaseType } from "@/entities/disease-types/services/mutations";

export default function DiseaseTypes() {
  const { t, locale } = useI18n();

  const { dialog, editedItem, createButton, handleClose, handleDelete, handleEditItem, onSubmit } = useCrud<DiseaseCategory, DiseaseTypeSchema, DiseaseTypeSchema>({
    createMutation: useCreateDiseaseType,
    updateMutation: useUpdateDiseaseType,
    removeMutation: useDeleteDiseaseType,
  });

  const columns = useMemo(() => createDiseaseTypeColumns(handleEditItem, handleDelete, t, locale), [handleEditItem, handleDelete, locale]);

  return (
    <div>
      <DataTable columns={columns} queryFunction={useGetDiseaseTypes} topSlot={createButton(t("pages.createDiseaseType"))} />

      <Modal open={dialog} onClose={handleClose} title={editedItem ? t("pages.editDiseaseType") : t("pages.createDiseaseType")}>
        <DiseaseTypeForm onSubmit={onSubmit} defaultValues={editedItem ? editedItem : (undefined as any)} />
      </Modal>
    </div>
  );
}

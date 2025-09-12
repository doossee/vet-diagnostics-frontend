"use client";

import { useMemo } from "react";
import type { DiseaseType } from "@/shared/types";
import { useCrud } from "@/shared/hooks/use-crud";
import { useI18n } from "@/shared/hooks/use-i18n";
import { DataTable } from "@/shared/components/data-table";
import { Modal } from "@/shared/components/elements/modal";
import { createDiseaseTypeColums } from "@/entities/disease-types";
import { DiseaseTypeForm, DiseaseTypeSchema } from "@/features/disease-types";
import { useGetDiseaseTypes } from "@/entities/disease-types/services/queries";
import { useCreateDiseaseType, useDeleteDiseaseType, useUpdateDiseaseType } from "@/entities/disease-types/services/mutations";

export default function DiseaseTypes() {
  const { t } = useI18n();

  const { dialog, editedItem, createButton, handleClose, handleDelete, handleEditItem, onSubmit } = useCrud<DiseaseType, DiseaseTypeSchema, DiseaseTypeSchema>({
    createMutation: useCreateDiseaseType,
    updateMutation: useUpdateDiseaseType,
    removeMutation: useDeleteDiseaseType,
  });

  const columns = useMemo(() => createDiseaseTypeColums(handleEditItem, handleDelete, t), [handleEditItem, handleDelete]);

  return (
    <div>
      <DataTable columns={columns} queryFunction={useGetDiseaseTypes} topSlot={createButton(t("management.diseaseTypeCreate"))} />

      <Modal open={dialog} onClose={handleClose} title={t(editedItem ? "management.editType" : "management.createType")}>
        <DiseaseTypeForm onSubmit={onSubmit} defaultValues={editedItem ? editedItem : (undefined as any)} />
      </Modal>
    </div>
  );
}

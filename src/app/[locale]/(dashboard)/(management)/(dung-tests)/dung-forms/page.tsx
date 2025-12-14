"use client";

import { useMemo } from "react";
import { useCrud } from "@/shared/hooks/use-crud";
import { useI18n } from "@/shared/hooks/use-i18n";
import type { AdditionalCrudModel } from "@/shared/types";
import { DataTable } from "@/shared/components/data-table";
import { Modal } from "@/shared/components/elements/modal";
import { createAdditionalCrudColumns } from "@/entities/additional-crud";
import { AdditionalCrudForm, AdditionalCrudSchema } from "@/features/additional-crud";
import { useGetDungForms } from "@/entities/additional-crud/services/queries";
import { useCreateDungForms, useDeleteDungForms, useUpdateDungForms } from "@/entities/additional-crud/services/mutations";

export default function DungForms() {
  const { t, locale } = useI18n();

  const { dialog, editedItem, createButton, handleClose, handleDelete, handleEditItem, onSubmit } = useCrud<AdditionalCrudModel, AdditionalCrudSchema, AdditionalCrudSchema>({
    createMutation: useCreateDungForms,
    updateMutation: useUpdateDungForms,
    removeMutation: useDeleteDungForms,
  });

  const columns = useMemo(() => createAdditionalCrudColumns(handleEditItem, handleDelete, t, locale), [handleEditItem, handleDelete, locale]);

  return (
    <div>
      <DataTable columns={columns} queryFunction={useGetDungForms} topSlot={createButton("Создать формы кала")} />

      <Modal open={dialog} onClose={handleClose} title={editedItem ? "Изменить формы кала" : "Создать формы кала"}>
        <AdditionalCrudForm onSubmit={onSubmit} defaultValues={editedItem ? editedItem : (undefined as any)} />
      </Modal>
    </div>
  );
}

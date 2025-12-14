"use client";

import { useMemo } from "react";
import { useCrud } from "@/shared/hooks/use-crud";
import { useI18n } from "@/shared/hooks/use-i18n";
import type { AdditionalCrudModel } from "@/shared/types";
import { DataTable } from "@/shared/components/data-table";
import { Modal } from "@/shared/components/elements/modal";
import { createAdditionalCrudColumns } from "@/entities/additional-crud";
import { AdditionalCrudForm, AdditionalCrudSchema } from "@/features/additional-crud";
import { useGetUrineClarities } from "@/entities/additional-crud/services/queries";
import { useCreateUrineClarities, useDeleteUrineClarities, useUpdateUrineClarities } from "@/entities/additional-crud/services/mutations";

export default function UrineClarities() {
  const { t, locale } = useI18n();

  const { dialog, editedItem, createButton, handleClose, handleDelete, handleEditItem, onSubmit } = useCrud<AdditionalCrudModel, AdditionalCrudSchema, AdditionalCrudSchema>({
    createMutation: useCreateUrineClarities,
    updateMutation: useUpdateUrineClarities,
    removeMutation: useDeleteUrineClarities,
  });

  const columns = useMemo(() => createAdditionalCrudColumns(handleEditItem, handleDelete, t, locale), [handleEditItem, handleDelete, locale]);

  return (
    <div>
      <DataTable columns={columns} queryFunction={useGetUrineClarities} topSlot={createButton("Создать прозрачность мочи")} />

      <Modal open={dialog} onClose={handleClose} title={editedItem ? "Изменить прозрачность мочи" : "Создать прозрачность мочи"}>
        <AdditionalCrudForm
          onSubmit={onSubmit}
          nameTitle="Называние прозрачность мочи"
          defaultValues={editedItem ? editedItem : (undefined as any)} />
      </Modal>
    </div>
  );
}

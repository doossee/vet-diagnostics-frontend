"use client";

import { useMemo } from "react";
import { useCrud } from "@/shared/hooks/use-crud";
import { useI18n } from "@/shared/hooks/use-i18n";
import type { AdditionalCrudModel } from "@/shared/types";
import { DataTable } from "@/shared/components/data-table";
import { Modal } from "@/shared/components/elements/modal";
import { ExcelDownloadButton } from "@/shared/components/excel-download-button";
import { createAdditionalCrudColumns } from "@/entities/additional-crud";
import { AdditionalCrudForm, AdditionalCrudSchema } from "@/features/additional-crud";
import { useGetDungConsistencies } from "@/entities/additional-crud/services/queries";
import { useCreateDungConsistencies, useDeleteDungConsistencies, useUpdateDungConsistencies } from "@/entities/additional-crud/services/mutations";

export default function DungConsistencies() {
  const { t, locale } = useI18n();

  const { dialog, editedItem, createButton, handleClose, handleDelete, handleEditItem, onSubmit } = useCrud<AdditionalCrudModel, AdditionalCrudSchema, AdditionalCrudSchema>({
    createMutation: useCreateDungConsistencies,
    updateMutation: useUpdateDungConsistencies,
    removeMutation: useDeleteDungConsistencies,
  });

  const columns = useMemo(() => createAdditionalCrudColumns(handleEditItem, handleDelete, t, locale), [handleEditItem, handleDelete, locale]);

  return (
    <div>
      <DataTable columns={columns} queryFunction={useGetDungConsistencies} topSlot={<div className="grid gap-2 grid-cols-[50px_auto] w-full md:grid-cols-2 md:w-fit"><ExcelDownloadButton importUrl="/feces-consistencies/import" />{createButton(t("pages.createDungConsistency"))}</div>} />

      <Modal open={dialog} onClose={handleClose} title={editedItem ? t("pages.editDungConsistency") : t("pages.createDungConsistency")}>
        <AdditionalCrudForm onSubmit={onSubmit} defaultValues={editedItem ? editedItem : (undefined as any)} />
      </Modal>
    </div>
  );
}

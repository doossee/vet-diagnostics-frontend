"use client";

import { useMemo } from "react";
import { useCrud } from "@/shared/hooks/use-crud";
import { useI18n } from "@/shared/hooks/use-i18n";
import type { AdditionalCrudModel } from "@/shared/types";
import { DataTable } from "@/shared/components/data-table";
import { Modal } from "@/shared/components/elements/modal";
import { ExcelDownloadButton } from "@/shared/components/excel-download-button";
import { createAdditionalCrudColumns } from "@/entities/additional-crud";
import { useGetUrineSmells } from "@/entities/additional-crud/services/queries";
import { AdditionalCrudForm, AdditionalCrudSchema } from "@/features/additional-crud";
import { useCreateUrineSmells, useDeleteUrineSmells, useUpdateUrineSmells } from "@/entities/additional-crud/services/mutations";

export default function UrineSmells() {
  const { t, locale } = useI18n();

  const { dialog, editedItem, createButton, handleClose, handleDelete, handleEditItem, onSubmit } = useCrud<AdditionalCrudModel, AdditionalCrudSchema, AdditionalCrudSchema>({
    createMutation: useCreateUrineSmells,
    updateMutation: useUpdateUrineSmells,
    removeMutation: useDeleteUrineSmells,
  });

  const columns = useMemo(() => createAdditionalCrudColumns(handleEditItem, handleDelete, t, locale), [handleEditItem, handleDelete, locale]);

  return (
    <div>
      <DataTable columns={columns} queryFunction={useGetUrineSmells} topSlot={<div className="flex gap-2"><ExcelDownloadButton importUrl="/urine-smells/import" />{createButton(t("pages.createUrineSmell"))}</div>} />

      <Modal open={dialog} onClose={handleClose} title={editedItem ? t("pages.editUrineSmell") : t("pages.createUrineSmell")}>
        <AdditionalCrudForm onSubmit={onSubmit} defaultValues={editedItem ? editedItem : (undefined as any)} />
      </Modal>
    </div>
  );
}

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
import { useGetUrineConsistencies } from "@/entities/additional-crud/services/queries";
import { useCreateUrineConsistencies, useDeleteUrineConsistencies, useUpdateUrineConsistencies } from "@/entities/additional-crud/services/mutations";

export default function UrineConsistencies() {
  const { t, locale } = useI18n();

  const { dialog, editedItem, createButton, handleClose, handleDelete, handleEditItem, onSubmit } = useCrud<AdditionalCrudModel, AdditionalCrudSchema, AdditionalCrudSchema>({
    createMutation: useCreateUrineConsistencies,
    updateMutation: useUpdateUrineConsistencies,
    removeMutation: useDeleteUrineConsistencies,
  });

  const columns = useMemo(() => createAdditionalCrudColumns(handleEditItem, handleDelete, t, locale), [handleEditItem, handleDelete, locale]);

  return (
    <div>
      <DataTable columns={columns} queryFunction={useGetUrineConsistencies} topSlot={<div className="flex gap-2"><ExcelDownloadButton importUrl="/urine-consistencies/import" />{createButton(t("pages.createUrineConsistency"))}</div>} />

      <Modal open={dialog} onClose={handleClose} title={editedItem ? t("pages.editUrineConsistency") : t("pages.createUrineConsistency")}>
        <AdditionalCrudForm
          onSubmit={onSubmit}
          defaultValues={editedItem ? editedItem : (undefined as any)} />
      </Modal>
    </div>
  );
}

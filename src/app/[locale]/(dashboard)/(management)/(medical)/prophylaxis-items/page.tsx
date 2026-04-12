"use client";

import { useMemo } from "react";
import { useCrud } from "@/shared/hooks/use-crud";
import { useI18n } from "@/shared/hooks/use-i18n";
import type { ProphylaxisItem } from "@/shared/types";
import { DataTable } from "@/shared/components/data-table";
import { Modal } from "@/shared/components/elements/modal";
import { ExcelDownloadButton } from "@/shared/components/excel-download-button";
import { createProphylaxisItemsColumns } from "@/entities/prophylaxis-items";
import { ProphylaxisItemSchema, ProphylaxisItemsForm } from "@/features/prophylaxis-items";
import { useGetProphylaxisItems } from "@/entities/prophylaxis-items/services/prophylaxis-items-queries";
import { useCreateProphylaxisItem, useDeleteProphylaxisItem, useUpdateProphylaxisItem } from "@/entities/prophylaxis-items/services/prophylaxis-items-mutations";

export default function ProphylaxisItems() {
  const { t, locale } = useI18n();

  const { dialog, editedItem, createButton, handleClose, handleDelete, handleEditItem, onSubmit } = useCrud<ProphylaxisItem, ProphylaxisItemSchema, ProphylaxisItemSchema>({
    createMutation: useCreateProphylaxisItem,
    updateMutation: useUpdateProphylaxisItem,
    removeMutation: useDeleteProphylaxisItem,
  });

  const columns = useMemo(() => createProphylaxisItemsColumns(handleEditItem, handleDelete, t, locale), [handleEditItem, handleDelete, locale]);

  return (
    <div>
      <DataTable columns={columns} queryFunction={useGetProphylaxisItems} topSlot={<div className="flex gap-2"><ExcelDownloadButton importUrl="/prophylaxis-items/import" />{createButton(t("pages.createProphylaxisItem"))}</div>} />

      <Modal open={dialog} onClose={handleClose} title={editedItem ? t("pages.editProphylaxisItem") : t("pages.createProphylaxisItem")}>
        <ProphylaxisItemsForm onSubmit={onSubmit} defaultValues={editedItem ? editedItem : (undefined as any)} />
      </Modal>
    </div>
  );
}

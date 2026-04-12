"use client";

import { useMemo } from "react";
import type { UrineColor } from "@/shared/types";
import { useI18n } from "@/shared/hooks/use-i18n";
import { useCrud } from "@/shared/hooks/use-crud";
import { DataTable } from "@/shared/components/data-table";
import { Modal } from "@/shared/components/elements/modal";
import { ExcelDownloadButton } from "@/shared/components/excel-download-button";
import { createUrineColorColumns } from "@/entities/urine-colors";
import { UrineColorForm, UrineColorSchema } from "@/features/urine-colors";
import { useGetUrineColors } from "@/entities/urine-colors/services/queries";
import { useCreateUrineColor, useDeleteUrineColor, useUpdateUrineColor } from "@/entities/urine-colors/services/mutations";

export default function UrineColors() {
  const { t, locale } = useI18n();

  const { dialog, editedItem, createButton, handleClose, handleDelete, handleEditItem, onSubmit } = useCrud<UrineColor, UrineColorSchema, UrineColorSchema>({
    createMutation: useCreateUrineColor,
    updateMutation: useUpdateUrineColor,
    removeMutation: useDeleteUrineColor,
  });

  const columns = useMemo(() => createUrineColorColumns(handleEditItem, handleDelete, t, locale), [handleEditItem, handleDelete, locale]);

  return (
    <div>
      <DataTable columns={columns} queryFunction={useGetUrineColors} topSlot={<div className="flex gap-2"><ExcelDownloadButton importUrl="/urine-colors/import" />{createButton(t("management.urineColorCreate"))}</div>} />

      <Modal open={dialog} onClose={handleClose} title={t(editedItem ? "management.editColor" : "management.createColor")}>
        <UrineColorForm onSubmit={onSubmit} defaultValues={editedItem ? editedItem : (undefined as any)} />
      </Modal>
    </div>
  );
}

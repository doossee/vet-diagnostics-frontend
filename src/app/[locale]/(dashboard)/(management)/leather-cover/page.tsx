"use client";

import { useMemo } from "react";
import { useI18n } from "@/shared/hooks/use-i18n";
import { useCrud } from "@/shared/hooks/use-crud";
import type { LeatherCover } from "@/shared/types";
import { DataTable } from "@/shared/components/data-table";
import { Modal } from "@/shared/components/elements/modal";
import { createLeatherCoverColumns } from "@/entities/leather-cover";
import { LeatherCoverForm, LeatherCoverSchema } from "@/features/leather-cover";
import { useGetLeatherCover } from "@/entities/leather-cover/services/queries";
import { useCreateLeatgerCover, useDeleteLeatgerCover, useUpdateLeatgerCover } from "@/entities/leather-cover/services/mutations";

export default function LeatherCovers() {
  const { t } = useI18n();

  const { dialog, editedItem, createButton, handleClose, handleDelete, handleEditItem, onSubmit } = useCrud<LeatherCover, LeatherCoverSchema, LeatherCoverSchema>({
    createMutation: useCreateLeatgerCover,
    updateMutation: useUpdateLeatgerCover,
    removeMutation: useDeleteLeatgerCover,
  });

  const columns = useMemo(() => createLeatherCoverColumns(handleEditItem, handleDelete, t), [handleEditItem, handleDelete]);

  return (
    <div>
      <DataTable columns={columns} queryFunction={useGetLeatherCover} topSlot={createButton(t("management.createLeatherCover"))} />

      <Modal open={dialog} onClose={handleClose} title={t(editedItem ? "management.editLeatherCover" : "management.createLeatherCover")}>
        <LeatherCoverForm onSubmit={onSubmit} defaultValues={editedItem ? editedItem : (undefined as any)} />
      </Modal>
    </div>
  );
}

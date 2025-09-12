"use client";

import { useMemo } from "react";
import type { UrineColor } from "@/shared/types";
import { useI18n } from "@/shared/hooks/use-i18n";
import { useCrud } from "@/shared/hooks/use-crud";
import { DataTable } from "@/shared/components/data-table";
import { Drawer } from "@/shared/components/elements/drawer";
import { createUrineColorColums } from "@/entities/urine-colors";
import { UrineColorForm, UrineColorSchema } from "@/features/urine-colors";
import { useGetUrineColors } from "@/entities/urine-colors/services/queries";
import { useCreateUrineColor, useDeleteUrineColor, useUpdateUrineColor } from "@/entities/urine-colors/services/mutations";
import { Modal } from "@/shared/components/elements/modal";

export default function UrineColors() {
  const { t } = useI18n();

  const { dialog, editedItem, createButton, handleClose, handleDelete, handleEditItem, onSubmit } = useCrud<UrineColor, UrineColorSchema, UrineColorSchema>({
    createMutation: useCreateUrineColor,
    updateMutation: useUpdateUrineColor,
    removeMutation: useDeleteUrineColor,
  });

  const columns = useMemo(() => createUrineColorColums(handleEditItem, handleDelete, t), [handleEditItem, handleDelete]);

  return (
    <div>
      <DataTable columns={columns} queryFunction={useGetUrineColors} topSlot={createButton(t("management.urineColorCreate"))} />

      <Modal open={dialog} onClose={handleClose} title={t(editedItem ? "management.editColor" : "management.createColor")}>
        <UrineColorForm onSubmit={onSubmit} defaultValues={editedItem ? editedItem : (undefined as any)} />
      </Modal>
    </div>
  );
}

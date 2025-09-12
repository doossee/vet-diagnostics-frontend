"use client";

import { useMemo } from "react";
import type { Eyelid } from "@/shared/types";
import { useI18n } from "@/shared/hooks/use-i18n";
import { useCrud } from "@/shared/hooks/use-crud";
import { createEyeLidColums } from "@/entities/eye-lid";
import { DataTable } from "@/shared/components/data-table";
import { EyeLidForm, EyeLidSchema } from "@/features/eye-lid";
import { useGetEyeLids } from "@/entities/eye-lid/services/queries";
import { useCreateEyeLid, useDeleteEyeLid, useUpdateEyeLid } from "@/entities/eye-lid/services/mutations";
import { Modal } from "@/shared/components/elements/modal";

export default function EyeLid() {
  const { t } = useI18n();

  const { dialog, editedItem, createButton, handleClose, handleDelete, handleEditItem, onSubmit } = useCrud<Eyelid, EyeLidSchema, EyeLidSchema>({
    createMutation: useCreateEyeLid,
    updateMutation: useUpdateEyeLid,
    removeMutation: useDeleteEyeLid,
  });

  const columns = useMemo(() => createEyeLidColums(handleEditItem, handleDelete, t), [handleEditItem, handleDelete]);

  return (
    <div>
      <DataTable columns={columns} queryFunction={useGetEyeLids} topSlot={createButton(t("management.createEyeLid"))} />

      <Modal open={dialog} onClose={handleClose} title={t(editedItem ? "management.editEyeLid" : "management.createEyeLid")}>
        <EyeLidForm onSubmit={onSubmit} defaultValues={editedItem ? editedItem : (undefined as any)} />
      </Modal>
    </div>
  );
}

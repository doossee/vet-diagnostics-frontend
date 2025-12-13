"use client";

import { useMemo } from "react";
import { useCrud } from "@/shared/hooks/use-crud";
import { useI18n } from "@/shared/hooks/use-i18n";
import type { ProphylaxisDetail } from "@/shared/types";
import { DataTable } from "@/shared/components/data-table";
import { Modal } from "@/shared/components/elements/modal";
import { createProphylaxisDetailsColumns } from "@/entities/prophylaxis-details";
import { ProphylaxisDetailSchema, ProphylaxisDetailsForm } from "@/features/prophylaxis-details";
import { useGetProphylaxisDetails } from "@/entities/prophylaxis-details/services/queries";
import { useCreateProphylaxisDetail, useDeleteProphylaxisDetail, useUpdateProphylaxisDetail } from "@/entities/prophylaxis-details/services/mutations";

export default function ProphylaxisDetails() {
  const { t, locale } = useI18n();

  const { dialog, editedItem, createButton, handleClose, handleDelete, handleEditItem, onSubmit } = useCrud<ProphylaxisDetail, ProphylaxisDetailSchema, ProphylaxisDetailSchema>({
    createMutation: useCreateProphylaxisDetail,
    updateMutation: useUpdateProphylaxisDetail,
    removeMutation: useDeleteProphylaxisDetail,
  });

  const columns = useMemo(() => createProphylaxisDetailsColumns(handleEditItem, handleDelete, t, locale), [handleEditItem, handleDelete, locale]);

  return (
    <div>
      <DataTable columns={columns} queryFunction={useGetProphylaxisDetails} topSlot={createButton(t("management.urineColorCreate"))} />

      <Modal open={dialog} onClose={handleClose} title={t(editedItem ? "management.editColor" : "management.createColor")}>
        <ProphylaxisDetailsForm onSubmit={onSubmit} defaultValues={editedItem ? editedItem : (undefined as any)} />
      </Modal>
    </div>
  );
}

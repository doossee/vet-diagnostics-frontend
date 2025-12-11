"use client";

import { useMemo } from "react";
import type { Prophylaxis } from "@/shared/types";
import { useI18n } from "@/shared/hooks/use-i18n";
import { useCrud } from "@/shared/hooks/use-crud";
import { Modal } from "@/shared/components/elements/modal";
import { DataTable } from "@/shared/components/data-table";
import { createProphylaxisColumns } from "@/entities/prophylaxis";
import { ProphylaxisForm, ProphylaxisSchema } from "@/features/prophylaxis";
import { useGetProphylaxis } from "@/entities/prophylaxis/services/prophylaxis-queries";
import { useCreateProphylaxis, useDeleteProphylaxis, useUpdateProphylaxis } from "@/entities/prophylaxis/services/prophylaxis-mutations";
import { ProphylaxisSegmented } from "@/features/prophylaxis/components/prophylaxis-segmented";
import { PROPHYLAXIS_QUERY_PARAM_KEYS } from "@/entities/prophylaxis/utils/constants/query-param-keys";

export default function Prophylaxis() {
  const { t } = useI18n();

  const { dialog, editedItem, createButton, handleClose, handleDelete, handleEditItem, onSubmit } = useCrud<Prophylaxis, ProphylaxisSchema, ProphylaxisSchema>({
    createMutation: useCreateProphylaxis,
    updateMutation: useUpdateProphylaxis,
    removeMutation: useDeleteProphylaxis,
  });

  const columns = useMemo(() => createProphylaxisColumns(handleEditItem, handleDelete, t), [handleEditItem, handleDelete]);

  return (
    <div>
      <ProphylaxisSegmented />

      <DataTable
        columns={columns}
        queryFunction={useGetProphylaxis}
        filterQueryParamKeys={PROPHYLAXIS_QUERY_PARAM_KEYS}
        topSlot={createButton(t("management.vaccineTypeCreate"))} />

      <Modal open={dialog} onClose={handleClose} title={t(editedItem ? "management.editType" : "management.createType")}>
        <ProphylaxisForm onSubmit={onSubmit} defaultValues={editedItem ? editedItem : (undefined as any)} />
      </Modal>
    </div>
  );
}

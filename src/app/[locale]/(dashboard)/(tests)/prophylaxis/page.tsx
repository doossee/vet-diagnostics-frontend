"use client";

import { useMemo } from "react";
import type { Prophylaxis } from "@/shared/types";
import { useI18n } from "@/shared/hooks/use-i18n";
import { useCrud } from "@/shared/hooks/use-crud";
import { QUERY_PARAM_KEYS } from "@/shared/constants";
import { Modal } from "@/shared/components/elements/modal";
import { DataTable } from "@/shared/components/data-table";
import { createProphylaxisColumns } from "@/entities/prophylaxis";
import { ProphylaxisForm, ProphylaxisSchema, prophylaxisValues } from "@/features/prophylaxis";
import { useGetProphylaxis } from "@/entities/prophylaxis/services/prophylaxis-queries";
import { useCreateProphylaxis, useDeleteProphylaxis, useUpdateProphylaxis } from "@/entities/prophylaxis/services/prophylaxis-mutations";
import { ProphylaxisSegmented } from "@/features/prophylaxis/components/prophylaxis-segmented";
import { PROPHYLAXIS_QUERY_PARAM_KEYS } from "@/entities/prophylaxis/utils/constants/query-param-keys";
import { useSearchQueryParams } from "@/shared/hooks/use-query-params";

export default function Prophylaxis() {
  const { t, locale } = useI18n();
  const { get } = useSearchQueryParams();

  const animalId = get(QUERY_PARAM_KEYS.ANIMAL_ID);

  const { dialog, editedItem, createButton, handleClose, handleDelete, handleEditItem, onSubmit } = useCrud<Prophylaxis, ProphylaxisSchema, ProphylaxisSchema>({
    createMutation: useCreateProphylaxis,
    updateMutation: useUpdateProphylaxis,
    removeMutation: useDeleteProphylaxis,
  });

  const columns = useMemo(() => createProphylaxisColumns(handleEditItem, handleDelete, t, locale), [handleEditItem, handleDelete, locale]);

  return (
    <div>
      <ProphylaxisSegmented />

      <DataTable
        columns={columns}
        queryFunction={useGetProphylaxis}
        filterQueryParamKeys={PROPHYLAXIS_QUERY_PARAM_KEYS}
        topSlot={createButton(t("management.vaccineTypeCreate"))} />

      <Modal open={dialog} onClose={handleClose} title={t(editedItem ? "management.editType" : "management.createType")}>
        <ProphylaxisForm onSubmit={onSubmit} defaultValues={editedItem ? editedItem as any : animalId ? { ...prophylaxisValues, animalId: String(animalId) } : undefined} />
      </Modal>
    </div>
  );
}

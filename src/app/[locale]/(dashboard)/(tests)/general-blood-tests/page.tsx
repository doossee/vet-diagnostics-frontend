"use client";

import { useMemo } from "react";
import { useI18n } from "@/shared/hooks/use-i18n";
import { useCrud } from "@/shared/hooks/use-crud";
import { QUERY_PARAM_KEYS } from "@/shared/constants";
import type { GeneralBloodTest } from "@/shared/types";
import { DataTable } from "@/shared/components/data-table";
import { Modal } from "@/shared/components/elements/modal";
import { useSearchQueryParams } from "@/shared/hooks/use-query-params";
import { createGeneralBloodTestColums } from "@/entities/general-blood-tests";
import { useGetGeneralBloodTests } from "@/entities/general-blood-tests/services/queries";
import { GeneralBloodTestForm, GeneralBloodTestSchema, generalBloodTestValues } from "@/features/general-blood-tests";
import { useCreateGeneralBloodTest, useDeleteGeneralBloodTest, useUpdateGeneralBloodTest } from "@/entities/general-blood-tests/services/mutations";

export default function GeneralBloodTests() {
  const { t, locale } = useI18n();
  const { get, set, remove } = useSearchQueryParams();

  const newAnimal = get(QUERY_PARAM_KEYS.NEW);
  const animalId = get(QUERY_PARAM_KEYS.ANIMAL_ID, true);

  const { dialog, editedItem, createButton, handleClose, handleDelete, handleEditItem, onSubmit } = useCrud<GeneralBloodTest, GeneralBloodTestSchema, GeneralBloodTestSchema>({
    dialogValue: !!newAnimal,
    createMutation: useCreateGeneralBloodTest,
    updateMutation: useUpdateGeneralBloodTest,
    removeMutation: useDeleteGeneralBloodTest,
    extraOnClose: () => {
      if(!newAnimal) return
      // TODO: check
      remove(QUERY_PARAM_KEYS.NEW)

      if(animalId) set(QUERY_PARAM_KEYS.ANIMAL_ID, animalId)

      else remove(QUERY_PARAM_KEYS.ANIMAL_ID)
    }
  });

  const columns = useMemo(() => createGeneralBloodTestColums(handleEditItem, handleDelete, t, locale), [handleEditItem, handleDelete]);

  return (
    <div>
      <DataTable columns={columns} queryFunction={useGetGeneralBloodTests} topSlot={createButton(t("inspections.createBloodTest"))} />

      <Modal open={dialog} onClose={handleClose} widthClassName="max-w-[650px]!" title={t(editedItem ? "inspections.editBloodTest" : "inspections.createBloodTest")}>
        <GeneralBloodTestForm onSubmit={onSubmit} animalId={animalId as number} defaultValues={editedItem ? editedItem : animalId ? generalBloodTestValues(animalId as number) : undefined} />
      </Modal>
    </div>
  );
}

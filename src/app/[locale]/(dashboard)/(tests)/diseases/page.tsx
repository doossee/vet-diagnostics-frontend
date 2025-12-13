"use client";

import { useMemo } from "react";
import type { Disease } from "@/shared/types";
import { useI18n } from "@/shared/hooks/use-i18n";
import { useCrud } from "@/shared/hooks/use-crud";
import { QUERY_PARAM_KEYS } from "@/shared/constants";
import { createDiseaseColumns } from "@/entities/diseases";
import { DataTable } from "@/shared/components/data-table";
import { Modal } from "@/shared/components/elements/modal";
import { useGetDiseases } from "@/entities/diseases/services/queries";
import { useSearchQueryParams } from "@/shared/hooks/use-query-params";
import { DiseaseForm, DiseaseSchema, diseaseValues } from "@/features/diseases";
import { useCreateDisease, useDeleteDisease, useUpdateDisease } from "@/entities/diseases/services/mutations";

export default function Diseases() {
  const { t, locale } = useI18n();
  const { get, setMany } = useSearchQueryParams();
  
  const newAnimal = get(QUERY_PARAM_KEYS.NEW);
  const queryAnimalId = get(QUERY_PARAM_KEYS.ANIMAL_ID);

  const { dialog, editedItem, createButton, handleClose, handleDelete, handleEditItem, onSubmit } = useCrud<Disease, DiseaseSchema, DiseaseSchema>({
    // dialogValue: !!newAnimal,
    createMutation: useCreateDisease,
    updateMutation: useUpdateDisease,
    removeMutation: useDeleteDisease,
    // extraOnClose: () => {
    //   if(!newAnimal) return

    //   setMany({
    //     [QUERY_PARAM_KEYS.NEW]: null,
    //     [QUERY_PARAM_KEYS.ANIMAL_ID]: queryAnimalId || null
    //   })
    // }
  });

  // const defaultValues: any = editedItem ?? (queryAnimalId ? { ...diseaseValues, animalId: queryAnimalId } : undefined);
  const defaultValues: any = editedItem ?? diseaseValues;

  const columns = useMemo(() => createDiseaseColumns(handleEditItem, handleDelete, t, locale), [handleEditItem, handleDelete, t, locale]);

  return (
    <div>
      <DataTable
        columns={columns}
        queryFunction={useGetDiseases}
        topSlot={createButton(t("inspections.createDisease"))} />

      <Modal
        open={dialog}
        onClose={handleClose}
        title={t(editedItem ? "inspections.editDisease" : "inspections.createDisease")}>
        <DiseaseForm
          onSubmit={onSubmit}
          defaultValues={defaultValues} />
      </Modal>
    </div>
  );
}

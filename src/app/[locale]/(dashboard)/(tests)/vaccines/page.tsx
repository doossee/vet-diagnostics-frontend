"use client";

import { useMemo } from "react";
import type { Vaccine } from "@/shared/types";
import { useI18n } from "@/shared/hooks/use-i18n";
import { useCrud } from "@/shared/hooks/use-crud";
import { QUERY_PARAM_KEYS } from "@/shared/constants";
import { DataTable } from "@/shared/components/data-table";
import { Modal } from "@/shared/components/elements/modal";
import { useGetVaccines } from "@/entities/vaccines/services/queries";
import { useSearchQueryParams } from "@/shared/hooks/use-query-params";
import { VaccineFilters, createVaccineColumns } from "@/entities/vaccines";
import { VaccineForm, VaccineSchema, vaccineValues } from "@/features/vaccines";
import { VaccineQueryParamKeys } from "@/entities/vaccines/utils/constants/vaccine-query-param-keys";
import { useCreateVaccine, useDeleteVaccine, useUpdateVaccine } from "@/entities/vaccines/services/mutations";

export default function Vaccines() {
  const { t, locale } = useI18n();
  const { get, setMany } = useSearchQueryParams();

  const newAnimal = get(QUERY_PARAM_KEYS.NEW);
  const animalId = get(QUERY_PARAM_KEYS.ANIMAL_ID, true);

  const { dialog, editedItem, createButton, handleClose, handleDelete, handleEditItem, onSubmit } = useCrud<Vaccine, VaccineSchema, VaccineSchema>({
    dialogValue: !!newAnimal,
    createMutation: useCreateVaccine,
    removeMutation: useDeleteVaccine,
    updateMutation: useUpdateVaccine,
    extraOnClose: () => {
      if(!newAnimal) return

      setMany({
        [QUERY_PARAM_KEYS.NEW]: null,
        [QUERY_PARAM_KEYS.ANIMAL_ID]: animalId || null
      })
    }
  });

  const columns = useMemo(() => createVaccineColumns(handleEditItem, handleDelete, t, locale), [handleEditItem, handleDelete]);

  return (
    <div>
      <VaccineFilters />

      <DataTable
        hideSearch
        columns={columns}
        queryFunction={useGetVaccines}
        filterQueryParamKeys={VaccineQueryParamKeys}
        topSlot={createButton(t("inspections.createVaccine"))}
      />

      <Modal open={dialog} onClose={handleClose} title={t(editedItem ? "inspections.editVaccine" : "inspections.createVaccine")}>
        <VaccineForm onSubmit={onSubmit} defaultValues={editedItem ? editedItem : animalId ? { ...vaccineValues, animalId, date: new Date() } as any : undefined} />
      </Modal>
    </div>
  );
}

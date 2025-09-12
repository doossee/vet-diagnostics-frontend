"use client";

import { useMemo } from "react";
import type { Vaccine } from "@/shared/types";
import { useI18n } from "@/shared/hooks/use-i18n";
import { useCrud } from "@/shared/hooks/use-crud";
import { DataTable } from "@/shared/components/data-table";
import { Modal } from "@/shared/components/elements/modal";
import { VaccineForm, VaccineSchema } from "@/features/vaccines";
import { useGetVaccines } from "@/entities/vaccines/services/queries";
import { VaccineFilters, createVaccineColums } from "@/entities/vaccines";
import { useCreateVaccine, useDeleteVaccine, useUpdateVaccine } from "@/entities/vaccines/services/mutations";
import { VaccineQueryParamKeys } from "@/entities/vaccines/utils/constants/vaccine-query-param-keys";

export default function Vaccines() {
  const { t, locale } = useI18n();

  const { dialog, editedItem, createButton, handleClose, handleDelete, handleEditItem, onSubmit } = useCrud<Vaccine, VaccineSchema, VaccineSchema>({
    createMutation: useCreateVaccine,
    removeMutation: useDeleteVaccine,
    updateMutation: useUpdateVaccine,
  });

  const columns = useMemo(() => createVaccineColums(handleEditItem, handleDelete, t, locale), [handleEditItem, handleDelete]);

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
        <VaccineForm onSubmit={onSubmit} defaultValues={editedItem ? editedItem : undefined} />
      </Modal>
    </div>
  );
}

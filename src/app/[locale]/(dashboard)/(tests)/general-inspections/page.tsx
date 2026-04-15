"use client";

import { useMemo } from "react";
import { useI18n } from "@/shared/hooks/use-i18n";
import { useCrud } from "@/shared/hooks/use-crud";
import { ClinicalExam } from "@/shared/types";
import { QUERY_PARAM_KEYS } from "@/shared/constants";
import { DataTable } from "@/shared/components/data-table";
import { Modal } from "@/shared/components/elements/modal";
import { useSearchQueryParams } from "@/shared/hooks/use-query-params";
import { createGeneralInspectionColumns } from "@/entities/general-inspections";
import { useGetGeneralInspections } from "@/entities/general-inspections/services/queries";
// import { queryParamKeys } from "@/entities/general-inspections/utils/constants/query-param-keys";
import { GeneralInspectionForm, GeneralInspectionSchema, generalInspectionValues } from "@/features/general-inspections";
import { useCreateGeneralInspection, useDeleteGeneralInspection, useUpdateGeneralInspection } from "@/entities/general-inspections/services/mutations";
import { ExcelDownloadButton } from "@/shared/components/excel-download-button";
import { queryParamKeys } from "@/entities/general-inspections/utils/constants/query-param-keys";

export default function GeneralInspections() {
  const { t, locale } = useI18n();
  const { get, setMany } = useSearchQueryParams();

  const newAnimal = get(QUERY_PARAM_KEYS.NEW);
  const animalId = get(QUERY_PARAM_KEYS.ANIMAL_ID);
  const sessionId = get(QUERY_PARAM_KEYS.SESSION_ID);

  const { dialog, editedItem, createButton, handleClose, handleDelete, handleEditItem, onSubmit } = useCrud<ClinicalExam, GeneralInspectionSchema, GeneralInspectionSchema>({
    dialogValue: !!newAnimal,
    createMutation: useCreateGeneralInspection,
    updateMutation: useUpdateGeneralInspection,
    removeMutation: useDeleteGeneralInspection,
    extraOnClose: () => {
      if(!newAnimal) return

      setMany({
        [QUERY_PARAM_KEYS.NEW]: null,
      })
    }
  });

  const columns = useMemo(() => createGeneralInspectionColumns(handleEditItem, handleDelete, t, locale), [handleEditItem, handleDelete]);

  return (
    <div>
      <DataTable
        columns={columns}
        filterQueryParamKeys={queryParamKeys} // TODO: backend api add filter animalId, ... field
        queryFunction={useGetGeneralInspections}
        topSlot={<div className="grid gap-2 grid-cols-[50px_auto] w-full md:grid-cols-2 md:w-fit"><ExcelDownloadButton importUrl="/clinical-exams/import" />{createButton(t("inspections.createGeneralInspections"))}</div>} />

      <Modal open={dialog} onClose={handleClose} widthClassName="bg-card max-w-[900px]!" title={t(editedItem ? "inspections.editGeneralInspections" : "inspections.createGeneralInspections")}>
        <GeneralInspectionForm onSubmit={onSubmit} defaultValues={editedItem ? editedItem : animalId ? { ...generalInspectionValues, sessionId, animalId } as any : undefined} />
      </Modal>
    </div>
  );
}

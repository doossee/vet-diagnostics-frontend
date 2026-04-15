"use client";

import { useMemo } from "react";
import { useI18n } from "@/shared/hooks/use-i18n";
import { useCrud } from "@/shared/hooks/use-crud";
import { QUERY_PARAM_KEYS } from "@/shared/constants";
import type { BloodExam } from "@/shared/types";
import { DataTable } from "@/shared/components/data-table";
import { Modal } from "@/shared/components/elements/modal";
import { useSearchQueryParams } from "@/shared/hooks/use-query-params";
import { createGeneralBloodTestColumns } from "@/entities/general-blood-tests";
import { useGetGeneralBloodTests } from "@/entities/general-blood-tests/services/queries";
import { queryParamKeys } from '@/entities/general-blood-tests/utils/constants/query-param-keys';
import { GeneralBloodTestForm, GeneralBloodTestSchema, generalBloodTestValues } from "@/features/general-blood-tests";
import { useCreateGeneralBloodTest, useDeleteGeneralBloodTest, useUpdateGeneralBloodTest } from "@/entities/general-blood-tests/services/mutations";
import { ExcelDownloadButton } from "@/shared/components/excel-download-button";

export default function GeneralBloodTests() {
  const { t, locale } = useI18n();
  const { get, setMany } = useSearchQueryParams();

  const newAnimal = get(QUERY_PARAM_KEYS.NEW);
  const animalId = get(QUERY_PARAM_KEYS.ANIMAL_ID);
  const sessionId = get(QUERY_PARAM_KEYS.SESSION_ID);

  const { dialog, editedItem, createButton, handleClose, handleDelete, handleEditItem, onSubmit } = useCrud<BloodExam, GeneralBloodTestSchema, GeneralBloodTestSchema>({
    dialogValue: !!newAnimal,
    createMutation: useCreateGeneralBloodTest,
    updateMutation: useUpdateGeneralBloodTest,
    removeMutation: useDeleteGeneralBloodTest,
    extraOnClose: () => {
      if(!newAnimal) return

      setMany({
        [QUERY_PARAM_KEYS.NEW]: null
      })
    }
  });

  const columns = useMemo(() => createGeneralBloodTestColumns(handleEditItem, handleDelete, t, locale), [handleEditItem, handleDelete]);

  return (
    <div>
      <DataTable
        columns={columns}
        filterQueryParamKeys={queryParamKeys}
        queryFunction={useGetGeneralBloodTests}
        topSlot={<div className="grid gap-2 grid-cols-[50px_auto] w-full md:grid-cols-2 md:w-fit"><ExcelDownloadButton importUrl="/blood-exams/import" />{createButton(t("inspections.createBloodTest"))}</div>} />

      <Modal
        open={dialog}
        onClose={handleClose}
        widthClassName="max-w-[850px]!"
        title={t(editedItem ? "inspections.editBloodTest" : "inspections.createBloodTest")}>
        <GeneralBloodTestForm
          onSubmit={onSubmit}
          animalId={animalId as string}
          defaultValues={editedItem ? editedItem : animalId ?
            {...generalBloodTestValues(String(animalId), String(sessionId)), date: new Date()}
          : undefined} />
      </Modal>
    </div>
  );
}

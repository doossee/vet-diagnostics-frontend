"use client";

import { useMemo } from "react";
import { UrineExam } from "@/shared/types";
import { useI18n } from "@/shared/hooks/use-i18n";
import { useCrud } from "@/shared/hooks/use-crud";
import { QUERY_PARAM_KEYS } from "@/shared/constants";
import { DataTable } from "@/shared/components/data-table";
import { Modal } from "@/shared/components/elements/modal";
import { createUrineTestColumns } from "@/entities/urine-tests";
import { useSearchQueryParams } from "@/shared/hooks/use-query-params";
import { useGetUrineTests } from "@/entities/urine-tests/services/queries";
import { queryParamKeys } from "@/entities/urine-tests/utils/constants/query-param-keys";
import { UrineTestForm, UrineTestSchema, urineTestValues } from "@/features/urine-tests";
import { useCreateUrineTest, useDeleteUrineTest, useUpdateUrineTest } from "@/entities/urine-tests/services/mutations";

export default function UrineTests() {
  const { t, locale } = useI18n();
  const { get, setMany } = useSearchQueryParams();

  const newAnimal = get(QUERY_PARAM_KEYS.NEW);
  const animalId = get(QUERY_PARAM_KEYS.ANIMAL_ID);
  const sessionId = get(QUERY_PARAM_KEYS.SESSION_ID);

  const { dialog, editedItem, createButton, handleClose, handleDelete, handleEditItem, onSubmit } = useCrud<UrineExam, UrineTestSchema, UrineTestSchema>({
    dialogValue: !!newAnimal,
    createMutation: useCreateUrineTest,
    updateMutation: useUpdateUrineTest,
    removeMutation: useDeleteUrineTest,
    extraOnClose: () => {
      if(!newAnimal) return

      setMany({
        [QUERY_PARAM_KEYS.NEW]: null
      })
    },
  });

  const columns = useMemo(() => createUrineTestColumns(handleEditItem, handleDelete, t, locale), [handleEditItem, handleDelete]);

  return (
    <div>
      <DataTable
        columns={columns}
        filterQueryParamKeys={queryParamKeys}
        queryFunction={useGetUrineTests}
        topSlot={createButton(t("inspections.createUrineTest"))}
      />

      <Modal
        open={dialog}
        onClose={handleClose}
        widthClassName="max-w-[650px]!"
        title={t(editedItem ? "inspections.editUrineTest" : "inspections.createUrineTest")}>
        <UrineTestForm
          onSubmit={onSubmit}
          defaultValues={editedItem ? editedItem as any : animalId ? {...urineTestValues, sessionId, animalId: String(animalId)} : undefined}
        />
      </Modal>
    </div>
  );
}

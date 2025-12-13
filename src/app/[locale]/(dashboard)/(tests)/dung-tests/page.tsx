"use client";

import { useMemo } from "react";
import type { FecesExam } from "@/shared/types";
import { useI18n } from "@/shared/hooks/use-i18n";
import { useCrud } from "@/shared/hooks/use-crud";
import { QUERY_PARAM_KEYS } from "@/shared/constants";
import { DataTable } from "@/shared/components/data-table";
import { Modal } from "@/shared/components/elements/modal";
import { createDungTestColumns } from "@/entities/dung-tests";
import { useSearchQueryParams } from "@/shared/hooks/use-query-params";
import { useGetDungTests } from "@/entities/dung-tests/services/queries";
import { queryParamKeys } from "@/entities/dung-tests/utils/constants/query-param-keys";
import { DungTestForm, DungTestSchema, dungTestValues } from "@/features/dung-tests";
import { useCreateDungTest, useDeleteDungTest, useUpdateDungTest } from "@/entities/dung-tests/services/mutations";

export default function DungTests() {
  const { t, locale } = useI18n();
  const { get, setMany } = useSearchQueryParams();
  const newAnimal = get(QUERY_PARAM_KEYS.NEW);
  const animalId = get(QUERY_PARAM_KEYS.ANIMAL_ID);

  const { dialog, createButton, editedItem, handleClose, handleDelete, handleEditItem, onSubmit } = useCrud<FecesExam, DungTestSchema, DungTestSchema>({
    dialogValue: !!newAnimal,
    createMutation: useCreateDungTest,
    removeMutation: useDeleteDungTest,
    updateMutation: useUpdateDungTest,
    extraOnClose: () => {
      if(!newAnimal) return

      setMany({
        [QUERY_PARAM_KEYS.NEW]: null
      })
    },
  });

  const columns = useMemo(() => createDungTestColumns(handleEditItem, handleDelete, t, locale), [handleEditItem, handleDelete]);

  return (
    <div>
      <DataTable
        columns={columns}
        filterQueryParamKeys={queryParamKeys}
        queryFunction={useGetDungTests}
        topSlot={createButton(t("inspections.createDungTest"))} />

      <Modal
        open={dialog}
        onClose={handleClose}
        widthClassName="max-w-[650px]!"
        title={t(editedItem ? "inspections.editDungTest" : "inspections.createDungTest")}>
        <DungTestForm
          onSubmit={onSubmit}
          defaultValues={editedItem ? editedItem as any : animalId ? {...dungTestValues, animalId: String(animalId)} : undefined}
        />
      </Modal>
    </div>
  );
}

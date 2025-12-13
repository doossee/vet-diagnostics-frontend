"use client";

import { useMemo } from "react";
import type { FecesExam } from "@/shared/types";
import { useI18n } from "@/shared/hooks/use-i18n";
import { useCrud } from "@/shared/hooks/use-crud";
import { DataTable } from "@/shared/components/data-table";
import { Modal } from "@/shared/components/elements/modal";
import { createDungTestColumns } from "@/entities/dung-tests";
import { useSearchQueryParams } from "@/shared/hooks/use-query-params";
import { useGetDungTests } from "@/entities/dung-tests/services/queries";
import { DungTestForm, DungTestSchema, dungTestValues } from "@/features/dung-tests";
import { useCreateDungTest, useDeleteDungTest, useUpdateDungTest } from "@/entities/dung-tests/services/mutations";

export default function DungTests() {
  const { t, locale } = useI18n();
  const { get, set, remove } = useSearchQueryParams();
  const newAnimal = get("new");
  const animalId = get("animalId");

  const { dialog, createButton, editedItem, handleClose, handleDelete, handleEditItem, onSubmit } = useCrud<FecesExam, DungTestSchema, DungTestSchema>({
    dialogValue: !!newAnimal,
    createMutation: useCreateDungTest,
    removeMutation: useDeleteDungTest,
    updateMutation: useUpdateDungTest,
    extraOnClose: () => newAnimal && (animalId ? set("animalId", animalId) : remove("animalId")),
  });

  const columns = useMemo(() => createDungTestColumns(handleEditItem, handleDelete, t, locale), [handleEditItem, handleDelete]);

  return (
    <div>
      <DataTable
        columns={columns}
        queryFunction={useGetDungTests}
        topSlot={createButton(t("inspections.createDungTest"))} />

      <Modal
        open={dialog}
        onClose={handleClose}
        widthClassName="max-w-[650px]!"
        title={t(editedItem ? "inspections.editDungTest" : "inspections.createDungTest")}>
        <DungTestForm
          onSubmit={onSubmit}
          defaultValues={editedItem ?? ((animalId ? { ...dungTestValues, animalId } : undefined) as any)}
        />
      </Modal>
    </div>
  );
}

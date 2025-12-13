"use client";

import { useMemo } from "react";
import { UrineExam } from "@/shared/types";
import { useI18n } from "@/shared/hooks/use-i18n";
import { useCrud } from "@/shared/hooks/use-crud";
import { DataTable } from "@/shared/components/data-table";
import { Modal } from "@/shared/components/elements/modal";
import { createUrineTestColumns } from "@/entities/urine-tests";
import { useSearchQueryParams } from "@/shared/hooks/use-query-params";
import { useGetUrineTests } from "@/entities/urine-tests/services/queries";
import { UrineTestForm, UrineTestSchema, urineTestValues } from "@/features/urine-tests";
import { useCreateUrineTest, useDeleteUrineTest, useUpdateUrineTest } from "@/entities/urine-tests/services/mutations";

export default function UrineTests() {
  const { t, locale } = useI18n();
  const { get, set, remove } = useSearchQueryParams();

  const newAnimal = get("new");
  const animalId = get("animalId");

  const { dialog, editedItem, createButton, handleClose, handleDelete, handleEditItem, onSubmit } = useCrud<UrineExam, UrineTestSchema, UrineTestSchema>({
    dialogValue: !!newAnimal,
    createMutation: useCreateUrineTest,
    updateMutation: useUpdateUrineTest,
    removeMutation: useDeleteUrineTest,
    extraOnClose: () => newAnimal && (animalId ? set("animalId", animalId) : remove("animalId")),
  });

  const columns = useMemo(() => createUrineTestColumns(handleEditItem, handleDelete, t, locale), [handleEditItem, handleDelete]);

  return (
    <div>
      <DataTable
        columns={columns}
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
          defaultValues={editedItem ?? ((animalId ? { ...urineTestValues, animalId } : undefined) as any)}
        />
      </Modal>
    </div>
  );
}

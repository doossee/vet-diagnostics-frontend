"use client";

import { useMemo } from "react";
import { useI18n } from "@/shared/hooks/use-i18n";
import { useCrud } from "@/shared/hooks/use-crud";
import type { BloodSerumTest } from "@/shared/types";
import { DataTable } from "@/shared/components/data-table";
import { Modal } from "@/shared/components/elements/modal";
import { useSearchQueryParams } from "@/shared/hooks/use-query-params";
import { createBloodSerumTestColums } from "@/entities/blood-serum-tests";
import { BloodSerumTestForm, BloodSerumTestSchema } from "@/features/blood-serum-tests";
import { useGetBloodSerumTests } from "@/entities/blood-serum-tests/services/queries";
import { useCreateBloodSerumTest, useDeleteBloodSerumTest, useUpdateBloodSerumTest } from "@/entities/blood-serum-tests/services/mutations";

export default function BloodSerumTests() {
  const { t, locale } = useI18n();
  const { get, set, remove } = useSearchQueryParams();
  const newAnimal = get("new");
  const animalId = get("animalId", true);

  const { dialog, editedItem, createButton, handleClose, handleDelete, handleEditItem, onSubmit } = useCrud<BloodSerumTest, BloodSerumTestSchema, BloodSerumTestSchema>({
    dialogValue: !!newAnimal,
    createMutation: useCreateBloodSerumTest,
    updateMutation: useUpdateBloodSerumTest,
    removeMutation: useDeleteBloodSerumTest,
    extraOnClose: () => newAnimal && (animalId ? set("animalId", animalId) : remove("animalId")),
  });

  const columns = useMemo(() => createBloodSerumTestColums(handleEditItem, handleDelete, t, locale), [handleEditItem, handleDelete]);

  return (
    <div>
      <DataTable columns={columns} queryFunction={useGetBloodSerumTests} topSlot={createButton(t("inspections.createBloodSerumTest"))} />

      <Modal open={dialog} onClose={handleClose} widthClassName="max-w-[600px]!" title={t(editedItem ? "inspections.editBloodSerumTest" : "inspections.createBloodSerumTest")}>
        <BloodSerumTestForm onSubmit={onSubmit} animalId={animalId as number} defaultValues={editedItem ? editedItem : undefined} />
      </Modal>
    </div>
  );
}

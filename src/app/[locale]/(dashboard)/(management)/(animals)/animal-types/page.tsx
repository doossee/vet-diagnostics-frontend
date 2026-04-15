"use client";

import { useMemo } from "react";
import type { AnimalType } from "@/shared/types";
import { useCrud } from "@/shared/hooks/use-crud";
import { useI18n } from "@/shared/hooks/use-i18n";
import { DataTable } from "@/shared/components/data-table";
import { createAnimalTypeColumns } from "@/entities/animal-types";
import { AnimalTypeSchema, AnimalTypeForm } from "@/features/animal-types";
import { useGetAnimalTypes } from "@/entities/animal-types/services/animal-type-queries";
import { useCreateAnimalType, useDeleteAnimalType, useUpdateAnimalType } from "@/entities/animal-types/services/animal-type-mutations";
import { Modal } from "@/shared/components/elements/modal";
import { ExcelDownloadButton } from "@/shared/components/excel-download-button";

export default function AnimalTypes() {
  const { t, locale } = useI18n();

  const { dialog, editedItem, onSubmit, handleClose, handleDelete, createButton, handleEditItem } = useCrud<AnimalType, AnimalTypeSchema, AnimalTypeSchema>({
    createMutation: useCreateAnimalType,
    updateMutation: useUpdateAnimalType,
    removeMutation: useDeleteAnimalType,
  });

  const columns = useMemo(() => createAnimalTypeColumns(handleEditItem, handleDelete, t, locale), [handleEditItem, handleDelete, locale]);

  return (
    <div>
      <DataTable columns={columns} queryFunction={useGetAnimalTypes} topSlot={<div className="grid gap-2 grid-cols-[50px_auto] w-full md:grid-cols-2 md:w-fit"><ExcelDownloadButton importUrl="/animal-types/import" />{createButton(t("animalTypes.createButton"))}</div>} />

      <Modal open={dialog} onClose={handleClose} title={t(editedItem ? "animalTypes.editAnimalType" : "animalTypes.createAnimalType")}>
        <AnimalTypeForm onSubmit={onSubmit} defaultValues={editedItem !== null ? editedItem : undefined} />
      </Modal>
    </div>
  );
}

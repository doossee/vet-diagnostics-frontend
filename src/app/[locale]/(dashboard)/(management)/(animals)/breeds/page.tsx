"use client";

import { useMemo } from "react";
import type { Breed } from "@/shared/types";
import { useCrud } from "@/shared/hooks/use-crud";
import { useI18n } from "@/shared/hooks/use-i18n";
import { createBreedColumns } from "@/entities/breeds";
import { DataTable } from "@/shared/components/data-table";
import { BreedForm, BreedSchema } from "@/features/breeds";
import { Modal } from "@/shared/components/elements/modal";
import { ExcelDownloadButton } from "@/shared/components/excel-download-button";
import { useGetBreeds } from "@/entities/breeds/services/breed-queries";
import { useCreateBreed, useDeleteBreed, useUpdateBreed } from "@/entities/breeds/services/breed-mutations";

export default function Breeds() {
  const { t, locale } = useI18n();

  const { dialog, editedItem, createButton, handleClose, handleDelete, handleEditItem, onSubmit } = useCrud<Breed, BreedSchema, BreedSchema>({
    createMutation: useCreateBreed,
    updateMutation: useUpdateBreed,
    removeMutation: useDeleteBreed,
  });

  const columns = useMemo(() => createBreedColumns(handleEditItem, handleDelete, t, locale), [handleEditItem, handleDelete, locale]);

  return (
    <div>
      <DataTable columns={columns} queryFunction={useGetBreeds} topSlot={<div className="flex gap-2"><ExcelDownloadButton importUrl="/breeds/import" />{createButton(t("management.createBreed"))}</div>} />

      <Modal open={dialog} title={t(editedItem ? "management.editBreed" : "management.createBreed")} onClose={handleClose}>
        <BreedForm onSubmit={onSubmit} defaultValues={editedItem ? editedItem : (undefined as any)} />
      </Modal>
    </div>
  );
}

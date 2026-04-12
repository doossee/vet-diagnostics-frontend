"use client";

import { useMemo } from "react";
import type { Color } from "@/shared/types";
import { useI18n } from "@/shared/hooks/use-i18n";
import { useCrud } from "@/shared/hooks/use-crud";
import { DataTable } from "@/shared/components/data-table";
import { Modal } from "@/shared/components/elements/modal";
import { ExcelDownloadButton } from "@/shared/components/excel-download-button";
import { createAnimalColorColumns } from "@/entities/animal-colors";
import { AnimalColorForm, AnimalColorSchema } from "@/features/animal-colors";
import { useGetAnimalColors } from "@/entities/animal-colors/services/animal-color-queries";
import { useCreateAnimalColor, useDeleteAnimalColor, useUpdateAnimalColor } from "@/entities/animal-colors/services/animal-color-mutations";

export default function AnimalColors() {
  const { t, locale } = useI18n();

  const { dialog, editedItem, createButton, handleClose, handleDelete, handleEditItem, onSubmit } = useCrud<Color, AnimalColorSchema, AnimalColorSchema>({
    createMutation: useCreateAnimalColor,
    updateMutation: useUpdateAnimalColor,
    removeMutation: useDeleteAnimalColor,
  });

  const columns = useMemo(() => createAnimalColorColumns(handleEditItem, handleDelete, t, locale), [handleEditItem, handleDelete, locale]);

  return (
    <div>
      <DataTable columns={columns} queryFunction={useGetAnimalColors} topSlot={<div className="flex gap-2"><ExcelDownloadButton importUrl="/colors/import" />{createButton(t("management.createColor"))}</div>} />

      <Modal open={dialog} onClose={handleClose} title={t(editedItem ? "management.editColor" : "management.createColor")}>
        <AnimalColorForm onSubmit={onSubmit} defaultValues={editedItem ? editedItem : (undefined as any)} />
      </Modal>
    </div>
  );
}

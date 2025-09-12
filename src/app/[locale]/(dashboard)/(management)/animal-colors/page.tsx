"use client";

import { useMemo } from "react";
import type { Color } from "@/shared/types";
import { useI18n } from "@/shared/hooks/use-i18n";
import { useCrud } from "@/shared/hooks/use-crud";
import { DataTable } from "@/shared/components/data-table";
import { Modal } from "@/shared/components/elements/modal";
import { createAnimalColorColums } from "@/entities/animal-colors";
import { AnimalColorForm, AnimalColorSchema } from "@/features/animal-colors";
import { useGetAnimalColors } from "@/entities/animal-colors/services/animal-color-queries";
import { useCreateAnimalColor, useDeleteAnimalColor, useUpdateAnimalColor } from "@/entities/animal-colors/services/animal-color-mutations";

export default function AnimalColors() {
  const { t } = useI18n();

  const { dialog, editedItem, createButton, handleClose, handleDelete, handleEditItem, onSubmit } = useCrud<Color, AnimalColorSchema, AnimalColorSchema>({
    createMutation: useCreateAnimalColor,
    updateMutation: useUpdateAnimalColor,
    removeMutation: useDeleteAnimalColor,
  });

  const columns = useMemo(() => createAnimalColorColums(handleEditItem, handleDelete, t), [handleEditItem, handleDelete]);

  return (
    <div>
      <DataTable columns={columns} queryFunction={useGetAnimalColors} topSlot={createButton(t("management.createColor"))} />

      <Modal open={dialog} onClose={handleClose} title={t(editedItem ? "management.editColor" : "management.createColor")}>
        <AnimalColorForm onSubmit={onSubmit} defaultValues={editedItem ? editedItem : (undefined as any)} />
      </Modal>
    </div>
  );
}

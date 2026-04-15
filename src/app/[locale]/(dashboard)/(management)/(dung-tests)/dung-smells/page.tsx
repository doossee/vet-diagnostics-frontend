"use client";

import { useMemo } from "react";
import { useCrud } from "@/shared/hooks/use-crud";
import { useI18n } from "@/shared/hooks/use-i18n";
import type { AdditionalCrudModel } from "@/shared/types";
import { DataTable } from "@/shared/components/data-table";
import { Modal } from "@/shared/components/elements/modal";
import { ExcelDownloadButton } from "@/shared/components/excel-download-button";
import { createAdditionalCrudColumns } from "@/entities/additional-crud";
import { AdditionalCrudForm, AdditionalCrudSchema } from "@/features/additional-crud";
import { useGetDungSmells } from "@/entities/additional-crud/services/queries";
import { useCreateDungSmells, useDeleteDungSmells, useUpdateDungSmells } from "@/entities/additional-crud/services/mutations";

export default function DungSmells() {
  const { t, locale } = useI18n();

  const { dialog, editedItem, createButton, handleClose, handleDelete, handleEditItem, onSubmit } = useCrud<AdditionalCrudModel, AdditionalCrudSchema, AdditionalCrudSchema>({
    createMutation: useCreateDungSmells,
    updateMutation: useUpdateDungSmells,
    removeMutation: useDeleteDungSmells,
  });

  const columns = useMemo(() => createAdditionalCrudColumns(handleEditItem, handleDelete, t, locale), [handleEditItem, handleDelete, locale]);

  return (
    <div>
      <DataTable columns={columns} queryFunction={useGetDungSmells} topSlot={<div className="grid gap-2 grid-cols-[50px_auto] w-full md:grid-cols-2 md:w-fit"><ExcelDownloadButton importUrl="/feces-smells/import" />{createButton(t("pages.createDungSmell"))}</div>} />

      <Modal open={dialog} onClose={handleClose} title={editedItem ? t("pages.editDungSmell") : t("pages.createDungSmell")}>
        <AdditionalCrudForm onSubmit={onSubmit} defaultValues={editedItem ? editedItem : (undefined as any)} />
      </Modal>
    </div>
  );
}

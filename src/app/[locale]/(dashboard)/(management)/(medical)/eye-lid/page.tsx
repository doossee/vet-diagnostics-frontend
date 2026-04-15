"use client";

import { useMemo } from "react";
import { useI18n } from "@/shared/hooks/use-i18n";
import { useCrud } from "@/shared/hooks/use-crud";
import type { MucosaAppearance } from "@/shared/types";
import { createEyeLidColumns } from "@/entities/eye-lid";
import { DataTable } from "@/shared/components/data-table";
import { ExcelDownloadButton } from "@/shared/components/excel-download-button";
import { EyeLidForm, EyeLidSchema } from "@/features/eye-lid";
import { useGetEyeLids } from "@/entities/eye-lid/services/queries";
import { useCreateEyeLid, useDeleteEyeLid, useUpdateEyeLid } from "@/entities/eye-lid/services/mutations";
import { Modal } from "@/shared/components/elements/modal";

export default function EyeLid() {
  const { t, locale } = useI18n();

  const { dialog, editedItem, createButton, handleClose, handleDelete, handleEditItem, onSubmit } = useCrud<MucosaAppearance, EyeLidSchema, EyeLidSchema>({
    createMutation: useCreateEyeLid,
    updateMutation: useUpdateEyeLid,
    removeMutation: useDeleteEyeLid,
  });

  const columns = useMemo(() => createEyeLidColumns(handleEditItem, handleDelete, t, locale), [handleEditItem, handleDelete, locale]);

  return (
    <div>
      <DataTable columns={columns} queryFunction={useGetEyeLids} topSlot={<div className="grid gap-2 grid-cols-[50px_auto] w-full md:grid-cols-2 md:w-fit"><ExcelDownloadButton importUrl="/mucosa-appearances/import" />{createButton(t("management.createEyeLid"))}</div>} />

      <Modal open={dialog} onClose={handleClose} title={t(editedItem ? "management.editEyeLid" : "management.createEyeLid")}>
        <EyeLidForm onSubmit={onSubmit} defaultValues={editedItem ? editedItem : (undefined as any)} />
      </Modal>
    </div>
  );
}

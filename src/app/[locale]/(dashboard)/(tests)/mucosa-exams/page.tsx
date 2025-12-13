"use client";

import { useMemo } from "react";
import type { MucosaExam } from "@/shared/types";
import { useI18n } from "@/shared/hooks/use-i18n";
import { useCrud } from "@/shared/hooks/use-crud";
import { DataTable } from "@/shared/components/data-table";
import { Modal } from "@/shared/components/elements/modal";
import { createMucosaExamColumns } from "@/entities/mucosa-exams";
import { MucosaExamForm, MucosaExamSchema } from "@/features/mucosa-exams";
import { useGetMucosaExams } from "@/entities/mucosa-exams/services/queries";
import { useCreateMucosaExam, useDeleteMucosaExam, useUpdateMucosaExam } from "@/entities/mucosa-exams/services/mutations";
import { useSearchQueryParams } from "@/shared/hooks/use-query-params";
import { QUERY_PARAM_KEYS } from "@/shared/constants";

export default function MucosaExams() {
  const { t, locale } = useI18n();
  const { get, setMany } = useSearchQueryParams();

  const newAnimal = get(QUERY_PARAM_KEYS.NEW);
  const animalId = get(QUERY_PARAM_KEYS.ANIMAL_ID);

  const { dialog, editedItem, createButton, handleClose, handleDelete, handleEditItem, onSubmit } = useCrud<MucosaExam, MucosaExamSchema, MucosaExamSchema>({
    createMutation: useCreateMucosaExam,
    updateMutation: useUpdateMucosaExam,
    removeMutation: useDeleteMucosaExam,
    extraOnClose: () => {
      if(!newAnimal) return

      setMany({
        [QUERY_PARAM_KEYS.NEW]: null,
      })
    }
  });

  const columns = useMemo(() => createMucosaExamColumns(handleEditItem, handleDelete, t, locale), [handleEditItem, handleDelete, locale]);

  return (
    <div>
      <DataTable
        columns={columns}
        queryFunction={useGetMucosaExams}
        topSlot={createButton(t("management.createEyeLid"))} />

      <Modal
        open={dialog}
        onClose={handleClose}
        title={t(editedItem ? "management.editEyeLid" : "management.createEyeLid")}>
        <MucosaExamForm
          onSubmit={onSubmit}
          hideAnimals={!!animalId}
          defaultValues={editedItem ? {...editedItem, animalId } : (undefined as any)} />
      </Modal>
    </div>
  );
}

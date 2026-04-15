"use client";

import { useMemo } from "react";
import type { MucosaExam } from "@/shared/types";
import { useI18n } from "@/shared/hooks/use-i18n";
import { useCrud } from "@/shared/hooks/use-crud";
import { DataTable } from "@/shared/components/data-table";
import { Modal } from "@/shared/components/elements/modal";
import { createMucosaExamColumns } from "@/entities/mucosa-exams";
import { queryParamKeys } from "@/entities/mucosa-exams/utils/constants/query-param-keys";
import { MucosaExamForm, MucosaExamSchema } from "@/features/mucosa-exams";
import { useGetMucosaExams } from "@/entities/mucosa-exams/services/queries";
import { useCreateMucosaExam, useDeleteMucosaExam, useUpdateMucosaExam } from "@/entities/mucosa-exams/services/mutations";
import { useSearchQueryParams } from "@/shared/hooks/use-query-params";
import { ExcelDownloadButton } from "@/shared/components/excel-download-button";
import { Button } from "@/shared/components/ui/button";
import { Plus } from "lucide-react";

interface MucosaExamsTableProps {
  className?: string;
  animalId?: string;
  sessionId?: string;
  existingMucosaExams?: MucosaExam[];
  canEdit?: boolean;
}

export function MucosaExamsTable({ animalId, className, sessionId, existingMucosaExams, canEdit = true }: MucosaExamsTableProps) {
  const { t, locale } = useI18n();
  const { get, setMany } = useSearchQueryParams();

  const { dialog, editedItem, setDialog, handleClose, handleDelete, handleEditItem, onSubmit } = useCrud<MucosaExam, MucosaExamSchema, MucosaExamSchema>({
    createMutation: useCreateMucosaExam,
    updateMutation: useUpdateMucosaExam,
    removeMutation: useDeleteMucosaExam,
  });

  // Types already used in this session, excluding the one being edited
  const excludeTypeIds = useMemo(() => {
    if (!existingMucosaExams?.length) return undefined;
    const editedTypeId = (editedItem as MucosaExam | null)?.mucosaTypeId;
    return existingMucosaExams
      .map(e => e.mucosaTypeId)
      .filter((id): id is string => !!id && id !== editedTypeId);
  }, [existingMucosaExams, editedItem]);

  const columns = useMemo(() => createMucosaExamColumns(handleEditItem, handleDelete, t, locale, canEdit), [handleEditItem, handleDelete, locale, canEdit]);

  return (
    <div className={className}>
      <DataTable
        columns={columns}
        filterQueryParamKeys={queryParamKeys}
        queryFunction={useGetMucosaExams}
        customFilters={{ sessionId: sessionId! }}
        topSlot={
          <div className="flex gap-2">
            <ExcelDownloadButton importUrl="/mucosa-exams/import" disabled={!canEdit} />
            <Button
              size="default"
              className="mt-0! w-full sm:w-fit"
              disabled={!canEdit || (!!sessionId && (existingMucosaExams?.length ?? 0) >= 4)}
              onClick={() => setDialog(true)}
            >
              <Plus /> {t("management.createEyeLid")}
            </Button>
          </div>
        } />

      <Modal
        open={dialog}
        onClose={handleClose}
        title={t(editedItem ? "management.editEyeLid" : "management.createEyeLid")}>
        <MucosaExamForm
          onSubmit={onSubmit}
          excludeTypeIds={excludeTypeIds}
          defaultValues={editedItem ? editedItem as any : animalId ? { animalId: String(animalId), sessionId } : undefined} />
      </Modal>
    </div>
  );
}

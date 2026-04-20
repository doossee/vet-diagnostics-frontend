"use client";

import { useMemo } from "react";
import type { MedicalSession } from "@/shared/types";
import { useI18n } from "@/shared/hooks/use-i18n";
import { useCrud } from "@/shared/hooks/use-crud";
// import { QUERY_PARAM_KEYS } from "@/shared/constants";
import { createMedicalSessionsColumns } from "@/entities/sessions";
import { DataTable } from "@/shared/components/data-table";
import { Modal } from "@/shared/components/elements/modal";
import { useGetMedicalSessions } from "@/entities/sessions/services/queries";
// import { useSearchQueryParams } from "@/shared/hooks/use-query-params";
import { MedicalSessionForm, MedicalSessionSchema, medicalSessionValues } from "@/features/sessions";
import { useCreateMedicalSession, useDeleteMedicalSession, useSubmitMedicalSession, useUpdateMedicalSession } from "@/entities/sessions/services/mutations";
import { useRouter } from "@/shared/i18n/routing";
import { routes } from "@/shared/constants/routes";

interface SessionsTableProps {
  className?: string
  animalId?: string
}

export default function SessionsTable({ animalId, className }: SessionsTableProps) {
  const router = useRouter();
  const { t, locale } = useI18n();
  // const { get, setMany } = useSearchQueryParams();
  const submitSession = useSubmitMedicalSession();

  // const newAnimal = get(QUERY_PARAM_KEYS.NEW);
  // const queryAnimalId = get(QUERY_PARAM_KEYS.ANIMAL_ID);

  const { dialog, editedItem, createButton, handleClose, handleDelete, handleEditItem, onSubmit } = useCrud<MedicalSession, MedicalSessionSchema, MedicalSessionSchema>({
    // dialogValue: !!newAnimal,
    createMutation: useCreateMedicalSession,
    updateMutation: useUpdateMedicalSession,
    removeMutation: useDeleteMedicalSession,
    // extraOnClose: () => {
    //   if(!newAnimal) return

    //   setMany({
    //     [QUERY_PARAM_KEYS.NEW]: null,
    //     [QUERY_PARAM_KEYS.ANIMAL_ID]: queryAnimalId || null
    //   })
    // }
  });

  // const defaultValues: any = editedItem ?? (queryAnimalId ? { ...diseaseValues, animalId: queryAnimalId } : undefined);
  const defaultValues: any = editedItem ?? medicalSessionValues;

  const handleSubmitSession = (id: string | number) => {
    if(!confirm(t("sessions.confirmSubmit"))) return

    submitSession.mutate(id)
  }

  const columns = useMemo(() => createMedicalSessionsColumns(handleEditItem, handleDelete, handleSubmitSession, t, locale), [handleEditItem, handleDelete, handleSubmitSession, t, locale])
  
  const handleNavigate = (item: MedicalSession) => {
    router.push(routes.SESSIONS.ID(item.id))
  }

  return (
    <div className={className}>
      <DataTable
        columns={columns}
        onRowClick={handleNavigate}
        queryFunction={useGetMedicalSessions}
        customFilters={animalId ? { animalId } : {}}
        topSlot={createButton(t("sessions.create"))} />

      <Modal
        open={dialog}
        onClose={handleClose}
        title={(editedItem ? t("sessions.edit") : t("sessions.create"))}>
        <MedicalSessionForm
          onSubmit={onSubmit}
          defaultValues={{...defaultValues, animalId}} />
      </Modal>
    </div>
  );
}

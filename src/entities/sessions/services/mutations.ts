import { UpdateBody, MedicalSession } from "@/shared/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SessionsQueryKeys } from "../utils/constants/query-keys";
import { createQueryData, removeQueryData, updateQueryData } from "@/shared/helpers/query-updater";
import { medicalSessionControllerCreate, medicalSessionControllerDelete, medicalSessionControllerUpdate, medicalSessionControllerSubmit } from "@/shared/api/api-new";
import { MedicalSessionSchema } from "@/features/sessions";

export function useCreateMedicalSession() {
  const client = useQueryClient();

  return useMutation<any, any, MedicalSessionSchema>({
    mutationFn: medicalSessionControllerCreate,
    onSuccess: (data) => {
      createQueryData<MedicalSession>(client, [SessionsQueryKeys.SESSIONS], data);
      client.invalidateQueries({
        queryKey: [SessionsQueryKeys.SESSIONS_SELECT],
      });
      client.invalidateQueries({
        queryKey: [SessionsQueryKeys.SESSIONS_BY_ID],
      });
      if (data?.animalId) {
        client.invalidateQueries({
          queryKey: [SessionsQueryKeys.SESSIONS_LAST_BY_ANIMAL, data.animalId],
        });
      }
    },
  });
}

export function useUpdateMedicalSession() {
  const client = useQueryClient();

  return useMutation<any, any, UpdateBody<MedicalSessionSchema>>({
    mutationFn: async ({ id, body }) => medicalSessionControllerUpdate(String(id), body),
    onSuccess: (data) => {
      updateQueryData<MedicalSession>(client, [SessionsQueryKeys.SESSIONS], data);
      client.invalidateQueries({
        queryKey: [SessionsQueryKeys.SESSIONS_SELECT],
      });
      client.invalidateQueries({
        queryKey: [SessionsQueryKeys.SESSIONS_BY_ID],
      });
      if (data?.animalId) {
        client.invalidateQueries({
          queryKey: [SessionsQueryKeys.SESSIONS_LAST_BY_ANIMAL, data.animalId],
        });
      }
    },
  });
}

export function useDeleteMedicalSession() {
  const client = useQueryClient();

  return useMutation<any, any, number | string>({
    mutationFn: id => medicalSessionControllerDelete(String(id)),
    onSuccess: (data) => {
      removeQueryData<MedicalSession>(client, [SessionsQueryKeys.SESSIONS], data.id);
      client.invalidateQueries({
        queryKey: [SessionsQueryKeys.SESSIONS_SELECT],
      });
      client.invalidateQueries({
        queryKey: [SessionsQueryKeys.SESSIONS_BY_ID],
      });
      if (data?.animalId) {
        client.invalidateQueries({
          queryKey: [SessionsQueryKeys.SESSIONS_LAST_BY_ANIMAL, data.animalId],
        });
      }
    },
  });
}

export function useSubmitMedicalSession() {
  const client = useQueryClient();

  return useMutation<any, any, number | string>({
    mutationFn: id => medicalSessionControllerSubmit(String(id)),
    onSuccess: (data) => {
      client.invalidateQueries({
        queryKey: [SessionsQueryKeys.SESSIONS],
      });
      client.invalidateQueries({
        queryKey: [SessionsQueryKeys.SESSIONS_SELECT],
      });
      client.invalidateQueries({
        queryKey: [SessionsQueryKeys.SESSIONS_BY_ID],
      });
      if (data?.animalId) {
        client.invalidateQueries({
          queryKey: [SessionsQueryKeys.SESSIONS_LAST_BY_ANIMAL, data.animalId],
        });
      }
    },
  });
}
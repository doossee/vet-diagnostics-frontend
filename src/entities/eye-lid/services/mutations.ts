import { EyeLidSchema } from "@/features/eye-lid";
import { Eyelid, UpdateBody } from "@/shared/types";
import { EyeLidQueryKeys } from "../utils/constants/query-keys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createQueryData, removeQueryData, updateQueryData } from "@/shared/helpers/query-updater";
import { eyelidsControllerCreate, eyelidsControllerRemove, eyelidsControllerUpdate } from "@/shared/api";

export function useCreateEyeLid() {
  const client = useQueryClient();

  return useMutation<any, any, EyeLidSchema>({
    mutationFn: eyelidsControllerCreate,
    onSuccess: (data) => {
      createQueryData<Eyelid>(client, [EyeLidQueryKeys.EYE_LIDS], data);
      client.invalidateQueries({ queryKey: [EyeLidQueryKeys.EYE_LIDS] });
    },
  });
}

export function useUpdateEyeLid() {
  const client = useQueryClient();

  return useMutation<any, any, UpdateBody<EyeLidSchema>>({
    mutationFn: async ({ id, body }) => eyelidsControllerUpdate(+id, body),
    onSuccess: (data) => {
      updateQueryData<Eyelid>(client, [EyeLidQueryKeys.EYE_LIDS], data);
      client.invalidateQueries({ queryKey: [EyeLidQueryKeys.EYE_LIDS] });
    },
  });
}

export function useDeleteEyeLid() {
  const client = useQueryClient();

  return useMutation<any, any, number | string>({
    mutationFn: eyelidsControllerRemove,
    onSuccess: (data) => {
      removeQueryData<Eyelid>(client, [EyeLidQueryKeys.EYE_LIDS], data.id);
      client.invalidateQueries({ queryKey: [EyeLidQueryKeys.EYE_LIDS] });
    },
  });
}

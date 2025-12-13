import { EyeLidSchema } from "@/features/eye-lid";
import { MucosaAppearance, UpdateBody } from "@/shared/types";
import { EyeLidQueryKeys } from "../utils/constants/query-keys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createQueryData, removeQueryData, updateQueryData } from "@/shared/helpers/query-updater";
import { mucosaAppearanceControllerCreate, mucosaAppearanceControllerDelete, mucosaAppearanceControllerUpdate } from "@/shared/api/api-new";

export function useCreateEyeLid() {
  const client = useQueryClient();

  return useMutation<any, any, EyeLidSchema>({
    mutationFn: mucosaAppearanceControllerCreate,
    onSuccess: (data) => {
      createQueryData<MucosaAppearance>(client, [EyeLidQueryKeys.EYE_LIDS], data);
      client.invalidateQueries({ queryKey: [EyeLidQueryKeys.EYE_LIDS] });
    },
  });
}

export function useUpdateEyeLid() {
  const client = useQueryClient();

  return useMutation<any, any, UpdateBody<EyeLidSchema>>({
    mutationFn: async ({ id, body }) => mucosaAppearanceControllerUpdate(id as string, body),
    onSuccess: (data) => {
      updateQueryData<MucosaAppearance>(client, [EyeLidQueryKeys.EYE_LIDS], data);
      client.invalidateQueries({ queryKey: [EyeLidQueryKeys.EYE_LIDS] });
    },
  });
}

export function useDeleteEyeLid() {
  const client = useQueryClient();

  return useMutation<any, any, number | string>({
    mutationFn: id => mucosaAppearanceControllerDelete(id as string),
    onSuccess: (data) => {
      removeQueryData<MucosaAppearance>(client, [EyeLidQueryKeys.EYE_LIDS], data.id);
      client.invalidateQueries({ queryKey: [EyeLidQueryKeys.EYE_LIDS] });
    },
  });
}

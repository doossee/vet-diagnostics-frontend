import { MucosaExam, UpdateBody } from "@/shared/types";
import { MucosaExamSchema } from "@/features/mucosa-exams";
import { MUCOSA_EXAMS_QUERY_KEYS } from "../utils/constants/query-keys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createQueryData, removeQueryData, updateQueryData } from "@/shared/helpers/query-updater";
import { mucosaExamControllerCreate, mucosaExamControllerDelete, mucosaExamControllerUpdate } from "@/shared/api/api-new";

export function useCreateMucosaExam() {
  const client = useQueryClient();

  return useMutation<any, any, MucosaExamSchema>({
    mutationFn: mucosaExamControllerCreate,
    onSuccess: (data) => {
      createQueryData<MucosaExam>(client, [MUCOSA_EXAMS_QUERY_KEYS.MUCOSA_EXAMS], data);
      client.invalidateQueries({ queryKey: [MUCOSA_EXAMS_QUERY_KEYS.MUCOSA_EXAMS_SELECT] });
    },
  });
}

export function useUpdateMucosaExam() {
  const client = useQueryClient();

  return useMutation<any, any, UpdateBody<MucosaExamSchema>>({
    mutationFn: async ({ id, body }) => mucosaExamControllerUpdate(id as string, body),
    onSuccess: (data) => {
      updateQueryData<MucosaExam>(client, [MUCOSA_EXAMS_QUERY_KEYS.MUCOSA_EXAMS], data);
      client.invalidateQueries({ queryKey: [MUCOSA_EXAMS_QUERY_KEYS.MUCOSA_EXAMS_SELECT] });
    },
  });
}

export function useDeleteMucosaExam() {
  const client = useQueryClient();

  return useMutation<any, any, number | string>({
    mutationFn: id => mucosaExamControllerDelete(id as string),
    onSuccess: (data) => {
      removeQueryData<MucosaExam>(client, [MUCOSA_EXAMS_QUERY_KEYS.MUCOSA_EXAMS], data.id);
      client.invalidateQueries({ queryKey: [MUCOSA_EXAMS_QUERY_KEYS.MUCOSA_EXAMS_SELECT] });
    },
  });
}

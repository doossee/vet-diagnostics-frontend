import { UpdateBody, AdditionalCrudModel } from "@/shared/types";
import { AdditionalCrudSchema } from "@/features/additional-crud";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ADDITIONAL_CRUD_QUERY_KEYS } from "../utils/constants/query-keys";
import { createQueryData, removeQueryData, updateQueryData } from "@/shared/helpers/query-updater";
import { fecesConsistencyControllerCreate, fecesConsistencyControllerDelete, fecesConsistencyControllerUpdate,
  fecesFormControllerCreate, fecesFormControllerDelete, fecesFormControllerUpdate,
  fecesSmellControllerCreate, fecesSmellControllerDelete, fecesSmellControllerUpdate,

  urineClarityControllerCreate, urineClarityControllerDelete, urineClarityControllerUpdate,
  urineConsistencyControllerCreate, urineConsistencyControllerDelete, urineConsistencyControllerUpdate,
  urineSmellControllerCreate, urineSmellControllerDelete, urineSmellControllerUpdate
} from "@/shared/api/api-new";

// DUNG
export function useCreateDungConsistencies() {
  const client = useQueryClient();

  return useMutation<any, any, AdditionalCrudSchema>({
    mutationFn: fecesConsistencyControllerCreate,
    onSuccess: (data) => {
      createQueryData<AdditionalCrudModel>(client, [ADDITIONAL_CRUD_QUERY_KEYS.DUNG_CONSISTENCIES], data);
      client.invalidateQueries({ queryKey: [ADDITIONAL_CRUD_QUERY_KEYS.DUNG_CONSISTENCIES_SELECT] });
      client.invalidateQueries({ queryKey: [ADDITIONAL_CRUD_QUERY_KEYS.FECES_CONSISTENCIES_LOOKUP] });
    },
  });
}

export function useUpdateDungConsistencies() {
  const client = useQueryClient();

  return useMutation<any, any, UpdateBody<AdditionalCrudSchema>>({
    mutationFn: async ({ id, body }) => fecesConsistencyControllerUpdate(id as string, body),
    onSuccess: (data) => {
      updateQueryData<AdditionalCrudModel>(client, [ADDITIONAL_CRUD_QUERY_KEYS.DUNG_CONSISTENCIES], data);
      client.invalidateQueries({ queryKey: [ADDITIONAL_CRUD_QUERY_KEYS.DUNG_CONSISTENCIES_SELECT] });
      client.invalidateQueries({ queryKey: [ADDITIONAL_CRUD_QUERY_KEYS.FECES_CONSISTENCIES_LOOKUP] });
    },
  });
}

export function useDeleteDungConsistencies() {
  const client = useQueryClient();

  return useMutation<any, any, number | string>({
    mutationFn: id => fecesConsistencyControllerDelete(id as string),
    onSuccess: (data) => {
      removeQueryData<AdditionalCrudModel>(client, [ADDITIONAL_CRUD_QUERY_KEYS.DUNG_CONSISTENCIES], data.id);
      client.invalidateQueries({ queryKey: [ADDITIONAL_CRUD_QUERY_KEYS.DUNG_CONSISTENCIES_SELECT] });
      client.invalidateQueries({ queryKey: [ADDITIONAL_CRUD_QUERY_KEYS.FECES_CONSISTENCIES_LOOKUP] });
    },
  });
}

// ===================

export function useCreateDungForms() {
  const client = useQueryClient();

  return useMutation<any, any, AdditionalCrudSchema>({
    mutationFn: fecesFormControllerCreate,
    onSuccess: (data) => {
      createQueryData<AdditionalCrudModel>(client, [ADDITIONAL_CRUD_QUERY_KEYS.DUNG_FORMS], data);
      client.invalidateQueries({ queryKey: [ADDITIONAL_CRUD_QUERY_KEYS.DUNG_FORMS_SELECT] });
      client.invalidateQueries({ queryKey: [ADDITIONAL_CRUD_QUERY_KEYS.FECES_FORMS_LOOKUP] });
    },
  });
}

export function useUpdateDungForms() {
  const client = useQueryClient();

  return useMutation<any, any, UpdateBody<AdditionalCrudSchema>>({
    mutationFn: async ({ id, body }) => fecesFormControllerUpdate(id as string, body),
    onSuccess: (data) => {
      updateQueryData<AdditionalCrudModel>(client, [ADDITIONAL_CRUD_QUERY_KEYS.DUNG_FORMS], data);
      client.invalidateQueries({ queryKey: [ADDITIONAL_CRUD_QUERY_KEYS.DUNG_FORMS_SELECT] });
      client.invalidateQueries({ queryKey: [ADDITIONAL_CRUD_QUERY_KEYS.FECES_FORMS_LOOKUP] });
    },
  });
}

export function useDeleteDungForms() {
  const client = useQueryClient();

  return useMutation<any, any, number | string>({
    mutationFn: id => fecesFormControllerDelete(id as string),
    onSuccess: (data) => {
      removeQueryData<AdditionalCrudModel>(client, [ADDITIONAL_CRUD_QUERY_KEYS.DUNG_FORMS], data.id);
      client.invalidateQueries({ queryKey: [ADDITIONAL_CRUD_QUERY_KEYS.DUNG_FORMS_SELECT] });
      client.invalidateQueries({ queryKey: [ADDITIONAL_CRUD_QUERY_KEYS.FECES_FORMS_LOOKUP] });
    },
  });
}

// ===================

export function useCreateDungSmells() {
  const client = useQueryClient();

  return useMutation<any, any, AdditionalCrudSchema>({
    mutationFn: fecesSmellControllerCreate,
    onSuccess: (data) => {
      createQueryData<AdditionalCrudModel>(client, [ADDITIONAL_CRUD_QUERY_KEYS.DUNG_SMELLS], data);
      client.invalidateQueries({ queryKey: [ADDITIONAL_CRUD_QUERY_KEYS.DUNG_SMELLS_SELECT] });
      client.invalidateQueries({ queryKey: [ADDITIONAL_CRUD_QUERY_KEYS.FECES_SMELLS_LOOKUP] });
    },
  });
}

export function useUpdateDungSmells() {
  const client = useQueryClient();

  return useMutation<any, any, UpdateBody<AdditionalCrudSchema>>({
    mutationFn: async ({ id, body }) => fecesSmellControllerUpdate(id as string, body),
    onSuccess: (data) => {
      updateQueryData<AdditionalCrudModel>(client, [ADDITIONAL_CRUD_QUERY_KEYS.DUNG_SMELLS], data);
      client.invalidateQueries({ queryKey: [ADDITIONAL_CRUD_QUERY_KEYS.DUNG_SMELLS_SELECT] });
      client.invalidateQueries({ queryKey: [ADDITIONAL_CRUD_QUERY_KEYS.FECES_SMELLS_LOOKUP] });
    },
  });
}

export function useDeleteDungSmells() {
  const client = useQueryClient();

  return useMutation<any, any, number | string>({
    mutationFn: id => fecesSmellControllerDelete(id as string),
    onSuccess: (data) => {
      removeQueryData<AdditionalCrudModel>(client, [ADDITIONAL_CRUD_QUERY_KEYS.DUNG_SMELLS], data.id);
      client.invalidateQueries({ queryKey: [ADDITIONAL_CRUD_QUERY_KEYS.DUNG_SMELLS_SELECT] });
      client.invalidateQueries({ queryKey: [ADDITIONAL_CRUD_QUERY_KEYS.FECES_SMELLS_LOOKUP] });
    },
  });
}


// URINE
// ==================

export function useCreateUrineSmells() {
  const client = useQueryClient();

  return useMutation<any, any, AdditionalCrudSchema>({
    mutationFn: urineSmellControllerCreate,
    onSuccess: (data) => {
      createQueryData<AdditionalCrudModel>(client, [ADDITIONAL_CRUD_QUERY_KEYS.URINE_SMELLS], data);
      client.invalidateQueries({ queryKey: [ADDITIONAL_CRUD_QUERY_KEYS.URINE_SMELLS_SELECT] });
      client.invalidateQueries({ queryKey: [ADDITIONAL_CRUD_QUERY_KEYS.URINE_SMELLS_LOOKUP] });
    },
  });
}

export function useUpdateUrineSmells() {
  const client = useQueryClient();

  return useMutation<any, any, UpdateBody<AdditionalCrudSchema>>({
    mutationFn: async ({ id, body }) => urineSmellControllerUpdate(id as string, body),
    onSuccess: (data) => {
      updateQueryData<AdditionalCrudModel>(client, [ADDITIONAL_CRUD_QUERY_KEYS.URINE_SMELLS], data);
      client.invalidateQueries({ queryKey: [ADDITIONAL_CRUD_QUERY_KEYS.URINE_SMELLS_SELECT] });
      client.invalidateQueries({ queryKey: [ADDITIONAL_CRUD_QUERY_KEYS.URINE_SMELLS_LOOKUP] });
    },
  });
}

export function useDeleteUrineSmells() {
  const client = useQueryClient();

  return useMutation<any, any, number | string>({
    mutationFn: id => urineSmellControllerDelete(id as string),
    onSuccess: (data) => {
      removeQueryData<AdditionalCrudModel>(client, [ADDITIONAL_CRUD_QUERY_KEYS.URINE_SMELLS], data.id);
      client.invalidateQueries({ queryKey: [ADDITIONAL_CRUD_QUERY_KEYS.URINE_SMELLS_SELECT] });
      client.invalidateQueries({ queryKey: [ADDITIONAL_CRUD_QUERY_KEYS.URINE_SMELLS_LOOKUP] });
    },
  });
}

// ==================

export function useCreateUrineClarities() {
  const client = useQueryClient();

  return useMutation<any, any, AdditionalCrudSchema>({
    mutationFn: urineClarityControllerCreate,
    onSuccess: (data) => {
      createQueryData<AdditionalCrudModel>(client, [ADDITIONAL_CRUD_QUERY_KEYS.URINE_CLARITIES], data);
      client.invalidateQueries({ queryKey: [ADDITIONAL_CRUD_QUERY_KEYS.URINE_CLARITIES_SELECT] });
      client.invalidateQueries({ queryKey: [ADDITIONAL_CRUD_QUERY_KEYS.URINE_CLARITIES_LOOKUP] });
    },
  });
}

export function useUpdateUrineClarities() {
  const client = useQueryClient();

  return useMutation<any, any, UpdateBody<AdditionalCrudSchema>>({
    mutationFn: async ({ id, body }) => urineClarityControllerUpdate(id as string, body),
    onSuccess: (data) => {
      updateQueryData<AdditionalCrudModel>(client, [ADDITIONAL_CRUD_QUERY_KEYS.URINE_CLARITIES], data);
      client.invalidateQueries({ queryKey: [ADDITIONAL_CRUD_QUERY_KEYS.URINE_CLARITIES_SELECT] });
      client.invalidateQueries({ queryKey: [ADDITIONAL_CRUD_QUERY_KEYS.URINE_CLARITIES_LOOKUP] });
    },
  });
}

export function useDeleteUrineClarities() {
  const client = useQueryClient();

  return useMutation<any, any, number | string>({
    mutationFn: id => urineClarityControllerDelete(id as string),
    onSuccess: (data) => {
      removeQueryData<AdditionalCrudModel>(client, [ADDITIONAL_CRUD_QUERY_KEYS.URINE_CLARITIES], data.id);
      client.invalidateQueries({ queryKey: [ADDITIONAL_CRUD_QUERY_KEYS.URINE_CLARITIES_SELECT] });
      client.invalidateQueries({ queryKey: [ADDITIONAL_CRUD_QUERY_KEYS.URINE_CLARITIES_LOOKUP] });
    },
  });
}

// ==================

export function useCreateUrineConsistencies() {
  const client = useQueryClient();

  return useMutation<any, any, AdditionalCrudSchema>({
    mutationFn: urineConsistencyControllerCreate,
    onSuccess: (data) => {
      createQueryData<AdditionalCrudModel>(client, [ADDITIONAL_CRUD_QUERY_KEYS.URINE_CONSISTENCIES], data);
      client.invalidateQueries({ queryKey: [ADDITIONAL_CRUD_QUERY_KEYS.URINE_CONSISTENCIES_SELECT] });
      client.invalidateQueries({ queryKey: [ADDITIONAL_CRUD_QUERY_KEYS.URINE_CONSISTENCIES_LOOKUP] });
    },
  });
}

export function useUpdateUrineConsistencies() {
  const client = useQueryClient();

  return useMutation<any, any, UpdateBody<AdditionalCrudSchema>>({
    mutationFn: async ({ id, body }) => urineConsistencyControllerUpdate(id as string, body),
    onSuccess: (data) => {
      updateQueryData<AdditionalCrudModel>(client, [ADDITIONAL_CRUD_QUERY_KEYS.URINE_CONSISTENCIES], data);
      client.invalidateQueries({ queryKey: [ADDITIONAL_CRUD_QUERY_KEYS.URINE_CONSISTENCIES_SELECT] });
      client.invalidateQueries({ queryKey: [ADDITIONAL_CRUD_QUERY_KEYS.URINE_CONSISTENCIES_LOOKUP] });
    },
  });
}

export function useDeleteUrineConsistencies() {
  const client = useQueryClient();

  return useMutation<any, any, number | string>({
    mutationFn: id => urineConsistencyControllerDelete(id as string),
    onSuccess: (data) => {
      removeQueryData<AdditionalCrudModel>(client, [ADDITIONAL_CRUD_QUERY_KEYS.URINE_CONSISTENCIES], data.id);
      client.invalidateQueries({ queryKey: [ADDITIONAL_CRUD_QUERY_KEYS.URINE_CONSISTENCIES_SELECT] });
      client.invalidateQueries({ queryKey: [ADDITIONAL_CRUD_QUERY_KEYS.URINE_CONSISTENCIES_LOOKUP] });
    },
  });
}

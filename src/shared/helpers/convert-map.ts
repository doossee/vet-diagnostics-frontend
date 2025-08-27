import { PaginatedEntity } from "@/shared/types";

export function ConvertMap<T, K>(data: PaginatedEntity<T>, callBack: (item: T) => K) {
  return {
    data: data.data?.map(callBack) ?? [],
    meta: data.meta
  }
}
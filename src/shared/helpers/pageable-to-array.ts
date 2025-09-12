import { PaginatedEntity } from "@/shared/types";
import { InfiniteData } from "@tanstack/react-query";
import { matrixToArray } from "@/shared/helpers/matrix-to-array";

export function pageableToArray<T>(data?: InfiniteData<PaginatedEntity<T>>) {
  return matrixToArray<T>(data?.pages?.map((item) => item?.data) ?? []);
}

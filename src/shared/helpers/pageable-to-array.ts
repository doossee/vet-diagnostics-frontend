import { InfiniteData } from "@tanstack/react-query";
import { matrixToArray } from "@/shared/helpers/matrix-to-array";

type PageableLike<T> = {
  data?: T[] | null;
};

export function pageableToArray<T>(data?: InfiniteData<PageableLike<T>>) {
  const pages = data?.pages?.map((item) => item?.data).filter((item): item is T[] => Array.isArray(item)) ?? [];
  return matrixToArray<T>(pages);
}

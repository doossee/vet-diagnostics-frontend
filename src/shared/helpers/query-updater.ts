import { QueryClient, QueryKey } from "@tanstack/react-query";
import { PaginatedEntity } from "../types";

interface Props<T> {
  client: QueryClient;
  queryKey: QueryKey;
  item?: T;
  updater: (old: PaginatedEntity<T>, key?: QueryKey) => any;
}

export function setCustomQueryData<T>({ queryKey, client, updater }: Props<T>) {
  const queries = client
    .getQueryCache()
    .findAll({ queryKey })
    .filter((q) => q.isActive());

  queries.forEach((query) => {
    const key = query.queryKey;
    const old = query.state.data as PaginatedEntity<T> | undefined;

    if (!old) return;

    const updated = updater(old, key);
    client.setQueryData(key, updated);
  });
}

export function createQueryData<T>(client: QueryClient, queryKey: QueryKey, item: T) {
  setCustomQueryData<T>({
    queryKey,
    client,
    updater: (old) => ({
      ...old,
      data: [...old.data, item],
      meta: { ...old.meta, total: old.meta.total + 1 },
    }),
  });
}

export function updateQueryData<T extends { id: number | string }>(client: QueryClient, queryKey: QueryKey, item: T) {
  setCustomQueryData<T>({
    queryKey,
    client,
    updater: (old) => ({
      ...old,
      data: old.data.map((d) => (d.id === item.id ? item : d)),
    }),
  });
}

export function removeQueryData<T extends { id: number | string }>(client: QueryClient, queryKey: QueryKey, id: number | string) {
  setCustomQueryData<T>({
    queryKey,
    client,
    updater: (old) => ({
      ...old,
      data: old.data.filter((d) => d.id !== id),
      meta: { ...old.meta, total: old.meta.total - 1 },
    }),
  });
}

import { InfiniteData, QueryClient, QueryKey } from "@tanstack/react-query";
import { PaginatedEntity } from "../types";

interface Props<T> {
  client: QueryClient;
  queryKey: QueryKey;
  item?: T;
  updater: (old: PaginatedEntity<T>, key?: QueryKey) => any;
  updaterInfinite?: (old: InfiniteData<PaginatedEntity<T>>, key?: QueryKey) => InfiniteData<PaginatedEntity<T>>;
}

export function setCustomQueryData<T>({ queryKey, client, updater, updaterInfinite }: Props<T>) {
  const queries = client
    .getQueryCache()
    .findAll({ queryKey })
    .filter((q) => q.isActive());

  queries.forEach((query) => {
    const key = query.queryKey;
    const old = query.state.data as PaginatedEntity<T> | undefined;

    if (!old) return;
  
    if ("pages" in old && Array.isArray(old.pages)) {
      if (!updaterInfinite) return;
      const updated = updaterInfinite(old as any, key);
      client.setQueryData(key, updated);
      return;
    }

    const updated = updater(old, key);
    client.setQueryData(key, updated);
  });
}

export function createQueryData<T>(client: QueryClient, queryKey: QueryKey, item: T, position: "first" | "last" = "last" ) {
  setCustomQueryData<T>({
    queryKey,
    client,
    // updater: (old) => {
    //   return {
    //   ...old,
    //   data: [...old.data, item],
    //   meta: { ...old.meta, total: old.meta.total + 1 },
    // }},
    updater: (old) => ({
      ...old,
      data: position === "first" ? [item, ...old.data] : [...old.data, item],
      meta: { ...old.meta, total: old.meta.total + 1 },
    }),

    // useInfiniteQuery
    updaterInfinite: (old) => ({
      ...old,
      pages: old.pages.map((page, i) =>
        i === old.pages.length - 1 ? {
          ...page,
          data: position === "first" ? [item, ...page.data] : [...page.data, item],
          meta: { ...page.meta, total: page.meta.total + 1 },
        } : page
      ),
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
    updaterInfinite: (old) => ({
      ...old,
      pages: old.pages.map((page) => ({
        ...page,
        data: page.data.map((d) => (d.id === item.id ? item : d)),
      })),
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
    updaterInfinite: (old) => ({
      ...old,
      pages: old.pages.map((page) => ({
        ...page,
        data: page.data.filter((d) => d.id !== id),
        meta: { ...page.meta, total: page.meta.total - 1 },
      })),
    }),
  });
}

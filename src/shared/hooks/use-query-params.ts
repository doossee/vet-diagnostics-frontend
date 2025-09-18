"use client";

import { isNullish } from "../helpers/is-nullish";
import { useRouter } from '@/shared/i18n/routing';
import { useSearchParams, usePathname } from "next/navigation";

export function useSearchQueryParams() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const getAll = (keys?: string[]) => {
    const params: Record<string, string> = {};

    searchParams.forEach((value, key) => (params[key] = value));

    if(keys && keys.length > 0) {
      return keys.reduce((acc, key) => {
        if(params[key] !== undefined) acc[key] = params[key]

        return acc
      }, {} as Record<string, string>)
    }

    return params;
  };

  const getFirst = (keys: string[]) => {
    const params: Record<string, string> = {};

    searchParams.forEach((value, key) => (params[key] = value));

    for (const key of keys) {
      if (params[key] !== undefined) {
        return { [key]: params[key] };
      }
    }

    return {};
  };

  const get = <T extends boolean>(key: string, numberable?: T): T extends true ? number | null : string | null => {
    const value = searchParams.get(key);

    if (numberable) {
      return value !== null ? Number(value) as any : null as any;
    }

    return value as string as any;
  };

  const set = (key: string, value: unknown, path?: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (isNullish(value)) {
      params.delete(key);
    } else {
      params.set(key, String(value));
    }

    const query = params.toString();

    if (path) {
      navigatePath(path, query);
    } else {
      replacePath(query);
    }
  };

  const setMany = (entries: { [key: string]: unknown }, path?: string) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(entries).forEach(([key, value]) => {
      if (isNullish(value)) {
        params.delete(key);
      } else {
        params.set(key, String(value));
      }
    });

    const query = params.toString();

    if (path) {
      navigatePath(path, query);
    } else {
      replacePath(query);
    }
  };

  const remove = (key: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(key);
    replacePath(params.toString());
  };

  const replacePath = (query: string) => {
    const newUrl = query ? `${pathname}?${query}` : pathname;
    window.history.replaceState(null, "", newUrl);
  };

  const navigatePath = (path: string, query: string) => {
    router.push(`${path}?${query}`);
  };

  return {
    get,
    set,
    getAll,
    remove,
    setMany,
    getFirst,
  };
}

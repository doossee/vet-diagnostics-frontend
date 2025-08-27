'use client'

import { isNullish } from '../helpers/is-nullish'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'

export function useSearchQueryParams() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const getAll = () => {
    const params: Record<string, string> = {}
    searchParams.forEach((value, key) => params[key] = value)
    return params
  }

  const get = (key: string, numberable?: boolean) => {
    const numberableValue = searchParams.get(key) ? Number(searchParams.get(key)) : null
    return numberable ? numberableValue : searchParams.get(key)
  }

  const set = (key: string, value: unknown, path?: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (isNullish(value)) {
      params.delete(key)
    } else {
      params.set(key, String(value))
    }

    const query = params.toString()

    if(path) {
      navigatePath(path, query)
    } else {
      replacePath(query)
    }
  }

  const setMany = (entries: { [key: string]: unknown } [], path?: string) => {
    const params = new URLSearchParams(searchParams.toString())
    entries.forEach(obj => {
      Object.entries(obj).forEach(([key, value]) => {
        if(isNullish(value)) {
          params.delete(key)
        } else {
          params.set(key, String(value))
        }
      })
    })
    
    const query = params.toString()

    if(path) {
      navigatePath(path, query)
    } else {
      replacePath(query)
    }
  }

  const remove = (key: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete(key)
    replacePath(params.toString())
  }

  const replacePath = (query: string) => {
    router.replace(`${pathname}?${query}`)
  }

  const navigatePath = (path: string, query: string) => {
    router.replace(`${path}?${query}`)
  }

  return {
    get,
    set,
    getAll,
    remove,
    setMany,
  }
}
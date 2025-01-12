'use client'

import debounce from "lodash/debounce"
import { createPortal } from "react-dom"
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'
import { useIsMobile } from '~/hooks/use-mobile'
import { useIsClient } from "~/hooks/use-client"
import { ReactNode, useCallback, useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardFooter } from "./ui/card"
import { Popover, PopoverTrigger, PopoverContent } from '~/components/ui/popover'
import { ArrowLeft, ArrowRight, MoveUp, MoveDown, ListFilter } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"

interface DataTableColumn<T> {
  key: string | keyof T
  title: string,
  sorting?: string
  hideTitleInMobile?: boolean
  render?: (item: T) => ReactNode
}

interface DataTableProps<T> {
  items: T[]
  callback: any
  filters?: any,
  loading?: boolean
  totalItems: number
  hideBottom?: boolean
  hideSearch?: boolean
  topSlot?: React.ReactNode
  columns: DataTableColumn<T>[],
}

export function DataTable<T extends { id: any }>({ columns, items, totalItems, loading, topSlot, callback, hideBottom, filters, hideSearch }: DataTableProps<T>) {
  const isMobile = useIsMobile()
  const isClient = useIsClient()

  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("")
  const [perPage, setPerPage] = useState(20)
  const [sorting, setSorting] = useState<{ [k: string]: 'asc' | 'desc' }>({})

  const handleFetch = () => {
    const params = { page, perPage, ...sorting }
    filters && Object.keys(filters).map(key => {
      if (filters[key]) Object.assign(params, { [key]: filters[key] })
    })
    search && Object.assign(params, { search })
    callback(params)
  }

  const handleSetSorting = (sort: string) => {
    if (sorting[sort]) {
      if (sorting[sort] === 'asc') setSorting({ [sort]: 'desc' })
      else if (sorting[sort] === 'desc') setSorting({})
    } else {
      setSorting({ [sort]: 'asc' })
    }
  }

  const handleSearch = useCallback(
    debounce((text: string) => setSearch(text), 500),
  [])

  useEffect(() => {
    handleFetch()
  }, [page, perPage, search, sorting, filters])

  const hasSorting = useCallback(() => {
    return columns.some(c => c.sorting)
  }, [columns])

  return (
    <Card className="shadow-none rounded-lg">
      <CardHeader className='p-2 flex flex-col sm:flex-row justify-between items-start gap-2'>
        {!hideSearch && <Input className='sm:max-w-[200px]' onChange={e => handleSearch(e.target.value.trim())} placeholder='Qidirish' />}
        {topSlot}
      </CardHeader>
      {
        isMobile && isClient && hasSorting() && createPortal((
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="icon">
                <ListFilter />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-fit p-2 shadow-sm">
              <div className="grid gap-2">
              {
                columns.filter(c => c.sorting).map((col, i) => (
                  <Button key={i} onClick={() => handleSetSorting(col.sorting!)} variant="outline" size="sm" className="w-full px-2 !py-0 text-sm !text-start">
                    {col.title}
                    {
                      sorting[col.sorting!] === 'asc' ? <MoveUp /> :
                      sorting[col.sorting!] === 'desc' ? <MoveDown /> : ""
                    }
                  </Button>
                ))
              }
              </div>
            </PopoverContent>
          </Popover>
        ), document.getElementById('top-bar-teleport')!)
      }
      <CardContent className="p-2">
        <div className="overflow-y-auto">
          {isMobile ?
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {
                loading && <div className="text-center text-gray-300 col-span-1 sm:col-span-2">Yuklanmoqda...</div>
              }
              {
                (items.length == 0 && !loading) && <div className="text-center text-gray-300 col-span-1 sm:col-span-2">Malumotlar yo'q</div>
              }
              {
                items.map((item, i) =>
                  <div key={i} className="rounded p-4 bg-background border space-y-1">
                    {
                      columns.map((col, i) =>
                        <div key={i} className="w-full">
                          
                          <div className="flex items-center w-full gap-2">
                            {!col.hideTitleInMobile && <span>{col.title}:</span>}
                            {
                              col.render ?
                              col.render(item) :
                              <span>{(item as any)[col.key]}</span>
                            }
                          </div>
                        </div>)
                    }
                  </div>)
              }
            </div>
            :
            <Table>
              <TableHeader>
                <TableRow>
                  {columns.map((col) =>
                    <TableHead key={col.key as string} className="text-nowrap">
                      {
                        col.sorting ?
                          <Button onClick={() => handleSetSorting(col.sorting!)} variant="ghost" size="sm" className="px-2 !py-0 text-sm">
                            {col.title}
                            {
                              sorting[col.sorting] === 'asc' ? <MoveUp /> :
                                sorting[col.sorting] === 'desc' ? <MoveDown /> : ""
                            }
                          </Button>
                          : col.title
                      }
                    </TableHead>
                  )}
                </TableRow>
              </TableHeader>
              <TableBody>
                {
                  loading && <TableRow>
                    <TableCell colSpan={columns.length} className="text-center text-gray-300">Yuklanmoqda...</TableCell>
                  </TableRow>
                }
                {
                  (items.length == 0 && !loading) && <TableRow>
                    <TableCell colSpan={columns.length} className="text-center text-gray-300">Malumotlar yo'q</TableCell>
                  </TableRow>
                }
                {
                  items.map((item, i) =>
                    <TableRow key={i}>
                      {
                        columns.map((col, i) =>
                          <TableCell key={i} className={col.sorting?"!pl-4":""}>
                            {col.render ? col.render(item) : (item as any)[col.key]}
                          </TableCell>)
                      }
                    </TableRow>)
                }
              </TableBody>
            </Table>
          }
        </div>
      </CardContent>
      {!hideBottom && <CardFooter className='p-2 flex justify-between items-center gap-2 w-full'>
        <Select value={String(perPage)} onValueChange={v => setPerPage(+v)}>
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder="20" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="50">50</SelectItem>
            <SelectItem value="100">100</SelectItem>
          </SelectContent>
        </Select>

        <div className='flex items-center gap-2'>
          <Button disabled={page === 1} size={'sm'} onClick={() => setPage((p) => p - 1)}>
            <ArrowLeft />
          </Button>
          <div>{page}/{Math.ceil(totalItems / perPage)}</div>
          <Button disabled={page === Math.ceil(totalItems / perPage) || totalItems == 0} size={'sm'} onClick={() => setPage((p) => p + 1)}>
            <ArrowRight />
          </Button>
        </div>
      </CardFooter>}
    </Card>
  );
}

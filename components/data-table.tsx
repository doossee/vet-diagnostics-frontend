'use client'

import debounce from "lodash/debounce"
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'
import { ArrowLeft, ArrowRight, MoveUp, MoveDown } from 'lucide-react'
import { ReactNode, useCallback, useEffect, useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"
import { Card, CardContent, CardHeader, CardFooter } from "./ui/card"

interface DataTableColumn<T> {
  key: string | keyof T
  title: string,
  sorting?: string
  render?: (item: T) => ReactNode
}

interface DataTableProps<T> {
  items: T[]
  callback: any
  filters?: any,
  loading?: boolean
  totalItems: number
  hideBottom?: boolean
  topSlot?: React.ReactNode
  columns: DataTableColumn<T>[],
}

export function DataTable<T extends { id: any }>({ columns, items, totalItems, loading, topSlot, callback, hideBottom, filters }: DataTableProps<T>) {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("")
  const [perPage, setPerPage] = useState(20)
  const [sorting, setSorting] = useState<{[k: string]: 'asc' | 'desc'}>({})

  useEffect(() => {
    handleFetch()
  }, [page, perPage, search, sorting, filters])

  const handleFetch = () => {
    const params = { page, perPage, ...sorting }
    filters && Object.keys(filters).map(key => {
      if(filters[key]) Object.assign(params, {[key]: filters[key]})
    })
    search && Object.assign(params, { search })
    callback(params)
  }

  const handleSearch = useCallback(
    debounce((text: string) => setSearch(text), 500),
  [])

  const handleSetSorting = (sort: string) => {
    if(sorting[sort]) {
      if(sorting[sort] === 'asc') setSorting({[sort]: 'desc'})
      else if(sorting[sort] === 'desc') setSorting({})
    } else {
      setSorting({[sort]: 'asc'})
    }
  }

  return (
    <Card className="shadow-none rounded-md">
      <CardHeader className='p-4 flex flex-col sm:flex-row justify-between items-center gap-2'>
        <Input className='sm:max-w-[200px]'  onChange={e => handleSearch(e.target.value.trim())} placeholder='Qidirish' />
        {topSlot}
      </CardHeader>
      <CardContent className="p-4">
        <div className="overflow-y-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((col) =>
                  <TableHead key={col.key as string} className="text-nowrap">
                    {
                      col.sorting ?
                      <Button onClick={() => handleSetSorting(col.sorting!)} variant="ghost" size="sm" className="px-2 !py-0 text-sm">
                        { col.title }
                        {
                          sorting[col.sorting] === 'asc' ? <MoveUp /> :
                          sorting[col.sorting] === 'desc' ? <MoveDown /> : ""
                        }
                      </Button>
                      :col.title
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
                      <TableCell key={i}>
                        {col.render ? col.render(item) : (item as any)[col.key]}
                      </TableCell>)
                    }
                  </TableRow>)
              }
            </TableBody>
          </Table>
        </div>
      </CardContent>
      {!hideBottom && <CardFooter className='p-4 flex justify-between items-center gap-2 w-full'>
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
            <Button disabled={page === Math.ceil(totalItems / perPage) || totalItems == 0} size={'sm'}  onClick={() => setPage((p) => p + 1)}>
                <ArrowRight />
            </Button>
        </div>
      </CardFooter>}
    </Card>
  );
}

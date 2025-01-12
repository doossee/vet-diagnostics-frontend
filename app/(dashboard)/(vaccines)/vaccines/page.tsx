'use client'

import { z } from "zod"
import { useState } from 'react'
import type { Vaccine } from "~/lib/type"
import { useForm } from "react-hook-form"
import { ALERT_MESSAGES } from "~/constants"
import { Button } from '~/components/ui/button'
import { useQuery } from "@tanstack/react-query"
import { DataTable } from '~/components/data-table'
import { DialogTitle } from '@radix-ui/react-dialog'
import { zodResolver } from "@hookform/resolvers/zod"
import { DatePicker } from "~/components/date-picker"
import { FiltersWrapper } from '~/components/filters-wrapper'
import { Dialog, DialogContent, DialogHeader } from "~/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import { animalsControllerFindAll, vaccineTypesControllerFindAll, vaccinesControllerCreate, vaccinesControllerFindAll, vaccinesControllerRemove, vaccinesControllerUpdate } from '~/lib/api'

export default function Vaccines() {
    const COLUMNS = [
        { title: 'Vaksina turi', key: 'type', sorting: 'byTypeId', render(item: Vaccine) {
            return item?.type?.name
        }  },
        { title: 'Hayvon', key: 'animal', sorting: 'byAnimalId', render(item: Vaccine) {
            return item?.animal?.name
        } },
        { title: 'Vaqti', key: 'date', sorting: 'byDate', render(item: Vaccine) {
            return new Date(item.date).toLocaleDateString()
        } },
        {
            title: 'Boshqarish', key: 'actions', render(item: Vaccine) {
                return (<div className="flex gap-2 items-center">
                    <Button onClick={() => handleEditItem(item)} size='sm'>
                        O'zgartirish
                    </Button>
                    <Button onClick={() => handleDelete(item.id)} size='sm'>
                        O'chirish
                    </Button>
                </div>)
            }
        },
    ]

    const [dialog, setDialog] = useState(false)
    const [loading, setLoading] = useState(true)
    const [totalItems, setTotalItems] = useState(0)
    const [items, setItems] = useState<Vaccine[]>([])
    const [itemId, setItemId] = useState<number | null>(null)
    const [filters, setFilters] = useState({
        date: null as Date | null,
        typeId: null as number | null,
        animalId: null as number | null,
    })

    const formSchema = z.object({
        date: z.date(),
        typeId: z.number(),
        animalId: z.number(),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            date: null,
            typeId: null,
            animalId: null,
        } as any,
    })

    const { data: animals }: any = useQuery({
        queryKey: ['animals'],
        queryFn: () => animalsControllerFindAll({page: 1, perPage: 100}),
    })

    const { data: types } = useQuery({
        queryKey: ['vaccine-types'],
        queryFn: () => vaccineTypesControllerFindAll({page: 1, perPage: 100})
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            if (itemId) {
                const data: any = await vaccinesControllerUpdate(itemId, values as any)
                setItems(p => p.map(i => {
                    if(i.id === itemId) return data
                    return i
                }))
            } else {
                const data: any = await vaccinesControllerCreate(values as any)
                setItems(p => [...p, data])
            }
    
            handleClose()
        } catch (error) {
            console.log(error)            
        }
    }

    async function handleGetItems(params: any) {
        try {
            setLoading(true)
            const {data, meta}: any = await vaccinesControllerFindAll(params)

            setItems(data)
            setTotalItems(meta.total)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    async function handleDelete(id: number) {
        try {
            if(!confirm(ALERT_MESSAGES.DELETE_CONFIRM)) return
            await vaccinesControllerRemove(id)
            setItems(p => p.filter(i => i.id !== id))
        } catch (error) {
            console.log(error)
        }
    }

    function handleEditItem(item: Vaccine) {
        setDialog(true)
        setItemId(item.id)

        form.setValue('typeId', item.typeId)
        form.setValue('animalId', item.animalId)
        form.setValue('date', new Date(item.date))
    }

    function handleClose() {
        form.reset()
        setItemId(null)
        setDialog(false)
    }

    return (
        <div>
            <FiltersWrapper>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mb-2">
                    <Select value={filters.typeId?String(filters.typeId):""} onValueChange={e => setFilters({...filters, typeId: +e})}>
                        <SelectTrigger className="bg-card">
                            <SelectValue placeholder="Tur bo'yicha saralash" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value={null as any}>Barchasi</SelectItem>
                            {
                                types?.data?.map(t => <SelectItem key={t.id} value={String(t.id)}>{t.name}</SelectItem>)
                            }
                        </SelectContent>
                    </Select>
                    <Select value={filters.animalId?String(filters.animalId):""} onValueChange={e => setFilters({...filters, animalId: +e})}>
                        <SelectTrigger className="bg-card">
                            <SelectValue placeholder="Hayvon bo'yicha saralash" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value={null as any}>Barchasi</SelectItem>
                            {
                                animals?.data?.map((a: any) => <SelectItem key={a.id} value={String(a.id)}>{a.name}</SelectItem>)
                            }
                        </SelectContent>
                    </Select>
                    <DatePicker buttonClass="bg-card border border-input dark:text-white hover:bg-card" field={{value: filters.date, onChange(date: any) {setFilters({...filters, date })}}} />
                </div>
            </FiltersWrapper>

            <DataTable
                hideSearch
                filters={filters}
                loading={loading}
                columns={COLUMNS}
                items={items as any}
                totalItems={totalItems}
                callback={handleGetItems}
                topSlot={<Button onClick={() => setDialog(true)} size={'default'} className="!mt-0 w-full sm:w-fit">Vaksina yaratish</Button>}
            />

            <Dialog open={dialog} onOpenChange={handleClose}>
                <DialogContent className="overflow-auto max-h-screen md:max-h-[95vh] max-w-[500px]" aria-describedby={undefined}>
                    <DialogHeader>
                        <DialogTitle>{itemId?"Vaksinani o'zgartirish":"Vaksina yaratish"}</DialogTitle>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                name="date"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem className="flex flex-col pt-1.5 gap-1">
                                        <FormLabel>Sana</FormLabel>
                                        <FormControl>
                                            <DatePicker field={field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="animalId"
                                control={form.control}
                                render={({ field: { value, onChange, ...others } }) => (
                                    <FormItem>
                                        <FormLabel>Hayvon</FormLabel>
                                        <FormControl>
                                            <Select value={value ? String(value) : ""} onValueChange={e => onChange(+e)} {...others}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Hayvon" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {
                                                        animals?.data?.map((d: any) => <SelectItem key={d.id} value={String(d.id)}>{d.name}</SelectItem>)
                                                    }
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="typeId"
                                control={form.control}
                                render={({ field: { value, onChange, ...others } }) => (
                                    <FormItem>
                                        <FormLabel>Vaksina turi</FormLabel>
                                        <FormControl>
                                            <Select value={value ? String(value) : ""} onValueChange={e => onChange(+e)} {...others}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Vaksina turi" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {
                                                        types?.data?.map(d => <SelectItem key={d.id} value={String(d.id)}>{d.name}</SelectItem>)
                                                    }
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button disabled={form.formState.isSubmitting} type="submit" className="w-full">{form.formState.isSubmitting?"Yuklanyapti...":"Saqlash"}</Button>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </div>
    )
}
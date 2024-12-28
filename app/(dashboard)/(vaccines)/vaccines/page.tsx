'use client'

import { z } from "zod"
import { useForm } from "react-hook-form"
import { useEffect, useState } from 'react'
import { Button } from '~/components/ui/button'
import { DataTable } from '~/components/data-table'
import { DialogTitle } from '@radix-ui/react-dialog'
import { zodResolver } from "@hookform/resolvers/zod"
import { DatePicker } from "~/components/date-picker"
import type { Vaccine, Animal, VaccineType } from "~/lib/type"
import { Dialog, DialogContent, DialogHeader } from "~/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import { animalsControllerFindAll, vaccineTypesControllerFindAll, vaccinesControllerCreate, vaccinesControllerFindAll, vaccinesControllerRemove, vaccinesControllerUpdate } from '~/lib/api'
import { Card, CardContent } from "~/components/ui/card"

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
    const [animals, setAnimals] = useState<Animal[]>([])
    const [types, setTypes] = useState<VaccineType[]>([])
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

    async function handleGetVaccineTypesAndAnimals() {
        try {
            const [A, T]: any = await Promise.all([
                animalsControllerFindAll({page: 1, perPage: 100}),
                vaccineTypesControllerFindAll({page: 1, perPage: 100})
            ])
            setTypes(T.data)
            setAnimals(A.data)
        } catch (error) {
            console.log(error)
        }
    }

    async function onSubmit(values: z.infer<typeof formSchema>) {
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
            if(!confirm('Delete?')) return
            await vaccinesControllerRemove(id)
            setItems(p => p.filter(i => i.id !== id))
        } catch (error) {
            console.log(error)
        }
    }

    function handleEditItem(item: Vaccine) {
        setDialog(true)
        setItemId(item.id)

        form.setValue('date', item.date)
        form.setValue('typeId', item.typeId)
        form.setValue('animalId', item.animalId)
    }

    function handleClose() {
        form.reset()
        setItemId(null)
        setDialog(false)
    }

    useEffect(() => {
        handleGetVaccineTypesAndAnimals()
    }, [])

    return (
        <div>
            <Card className="rounded-md shadow-none mb-4">
                <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 p-2">
                    <Select value={filters.typeId?String(filters.typeId):""} onValueChange={e => setFilters({...filters, typeId: +e})}>
                        <SelectTrigger>
                            <SelectValue placeholder="Tur bo'yicha saralash" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value={null as any}>Barchasi</SelectItem>
                            {
                                types.map(t => <SelectItem key={t.id} value={String(t.id)}>{t.name}</SelectItem>)
                            }
                        </SelectContent>
                    </Select>
                    <Select value={filters.animalId?String(filters.animalId):""} onValueChange={e => setFilters({...filters, animalId: +e})}>
                        <SelectTrigger>
                            <SelectValue placeholder="Hayvon bo'yicha saralash" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value={null as any}>Barchasi</SelectItem>
                            {
                                animals.map(a => <SelectItem key={a.id} value={String(a.id)}>{a.name}</SelectItem>)
                            }
                        </SelectContent>
                    </Select>
                    <DatePicker field={{value: filters.date, onChange(date: any) {setFilters({...filters, date })}}} />
                </CardContent>
            </Card>

            <DataTable
                filters={filters}
                loading={loading}
                columns={COLUMNS}
                items={items as any}
                totalItems={totalItems}
                callback={handleGetItems}
                topSlot={<Button onClick={() => setDialog(true)} size={'default'} className="w-full sm:w-fit">Vaksina yaratish</Button>}
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
                                                        animals.map(d => <SelectItem key={d.id} value={String(d.id)}>{d.name}</SelectItem>)
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
                                                        types.map(d => <SelectItem key={d.id} value={String(d.id)}>{d.name}</SelectItem>)
                                                    }
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full">Saqlash</Button>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </div>
    )
}
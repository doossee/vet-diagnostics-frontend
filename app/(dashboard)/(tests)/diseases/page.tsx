'use client'

import { z } from "zod"
import { useForm } from "react-hook-form"
import { useEffect, useState } from 'react'
import { ALERT_MESSAGES } from "~/constants"
import { Button } from '~/components/ui/button'
import { DataTable } from '~/components/data-table'
import { Textarea } from "~/components/ui/textarea"
import { DialogTitle } from '@radix-ui/react-dialog'
import { zodResolver } from "@hookform/resolvers/zod"
import { DateTimePicker } from "~/components/date-time-picker"
import type { DiseaseType, Disease, Animal } from "~/lib/type"
import { Dialog, DialogContent, DialogHeader } from "~/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form'
import { animalsControllerFindAll, diseaseTypesControllerFindAll, diseasesControllerFindAll, diseasesControllerCreate, diseasesControllerRemove, diseasesControllerUpdate } from '~/lib/api'

export default function Diseases() {
    const COLUMNS = [
        { title: 'Boshlanish vaqti', key: 'startTime', render(item: Disease) {
            return new Date(item.startTime).toLocaleDateString()
        } },
        { title: 'Tugash vaqti', key: 'endTime', render(item: Disease) {
            return new Date(item.endTime).toLocaleDateString()
        } },
        { title: 'Xulosa', key: 'conclusion' },
        { title: 'Hayvon', key: 'animal', render(item: Disease) {
            return item.animal?.name
        } },
        { title: 'Kasallik turi', key: 'type', render(item: Disease) {
            return item.type?.name
        } },
        { title: 'Boshqarish', key: 'actions', render(item: Disease) {
            return (<div className="flex gap-2 items-center">
                <Button onClick={() => handleEditItem(item)} size='sm'>
                    O'zgartirish
                </Button>
                <Button onClick={() => handleDelete(item.id)} size='sm'>
                    O'chirish
                </Button>
            </div>)
        } },
    ]

    const [dialog, setDialog] = useState(false)
    const [loading, setLoading] = useState(true)
    const [totalItems, setTotalItems] = useState(0)
    const [items, setItems] = useState<Disease[]>([])
    const [animals, setAnimals] = useState<Animal[]>([])
    const [itemId, setItemId] = useState<number | null>(null)
    const [diseaseTypes, setDiseassTypes] = useState<DiseaseType[]>([])
    const [createLoading, setCreateLoading] = useState(false)

    const formSchema = z.object({
        endTime: z.date(),
        typeId: z.number(),
        startTime: z.date(),
        animalId: z.number(),
        conclusion: z.string(),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            typeId: null,
            endTime: null,
            animalId: null,
            conclusion: "",
            startTime: null,
        } as any,
    })

    // TODO: fix bug with dates

    async function handleGetAnimalsAndDiseases() {
        try {
            const [A, D]: any = await Promise.all([
                animalsControllerFindAll({page: 1, perPage: 1000}),
                diseaseTypesControllerFindAll({page: 1, perPage: 1000} as any)
            ])
            setAnimals(A.data)
            setDiseassTypes(D.data)
        } catch (error) {
            console.log(error)
        }
    }

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            setCreateLoading(true)

            if (itemId) {
                const data: any = await diseasesControllerUpdate(itemId, values as any)
                setItems(p => p.map(i => {
                    if(i.id === itemId) return data
                    return i
                }))
            } else {
                const data: any = await diseasesControllerCreate(values as any)
                setItems(p => [...p, data])
            }
    
            handleClose()
        } catch (error) {
            console.log(error)            
        } finally {
            setCreateLoading(false)
        }
    }

    async function handleGetItems(params: any) {
        try {
            setLoading(true)
            const {data, meta} = await diseasesControllerFindAll(params)
            setItems(data as any)
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
            await diseasesControllerRemove(id)
            setItems(p => p.filter(i => i.id !== id))
        } catch (error) {
            console.log(error)
        }
    }

    function handleEditItem(item: Disease) {
        setDialog(true)
        setItemId(item.id)

        form.setValue('typeId', item.typeId)
        form.setValue('animalId', item.animalId)
        form.setValue('conclusion', item.conclusion||'')
        form.setValue('endTime', new Date(item.endTime!))
        form.setValue('startTime', new Date(item.startTime!))
        form.trigger()
    }

    function handleClose() {
        form.reset()
        setItemId(null)
        setDialog(false)
    }

    useEffect(() => {
        handleGetAnimalsAndDiseases()
    }, [])

    return (
        <div>
            <DataTable
                loading={loading}
                columns={COLUMNS}
                items={items as any}
                totalItems={totalItems}
                callback={handleGetItems}
                topSlot={<Button onClick={() => setDialog(true)} size={'default'} className="w-full sm:w-fit">Kasallik yaratish</Button>} />

            <Dialog open={dialog} onOpenChange={handleClose}>
                <DialogContent className="overflow-auto max-h-screen md:max-h-[95vh] max-w-[500px]" aria-describedby={undefined}>
                    <DialogHeader>
                        <DialogTitle>{itemId?"Kasallikni o'zgartirish":"Kasallik yaratish"}</DialogTitle>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                name="startTime"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Boshlanish vaqti</FormLabel>
                                        <FormControl>
                                            <DateTimePicker field={field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="endTime"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Tugash vaqti</FormLabel>
                                        <FormControl>
                                            <DateTimePicker field={field} />
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
                                        <FormLabel>Kasallik turi</FormLabel>
                                        <FormControl>
                                            <Select value={value ? String(value) : ""} onValueChange={e => onChange(+e)} {...others}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Kasallik turi" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {
                                                        diseaseTypes.map(d => <SelectItem key={d.id} value={String(d.id)}>{d.name}</SelectItem>)
                                                    }
                                                </SelectContent>
                                            </Select>
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
                                name="conclusion"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Xulosa</FormLabel>
                                        <FormControl>
                                            <Textarea rows={6} className="resize-none" placeholder="Xulosa" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button disabled={createLoading} type="submit" className="w-full">{createLoading?"Yuklanyapti...":"Saqlash"}</Button>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </div>
    )
}
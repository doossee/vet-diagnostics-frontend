'use client'

import { z } from "zod"
import { useState } from 'react'
import { useForm } from "react-hook-form"
import type { Disease } from "~/lib/type"
import { ALERT_MESSAGES } from "~/constants"
import { Input } from "~/components/ui/input"
import { Button } from '~/components/ui/button'
import { useQuery } from "@tanstack/react-query"
import { DataTable } from '~/components/data-table'
import { Textarea } from "~/components/ui/textarea"
import { DialogTitle } from '@radix-ui/react-dialog'
import { zodResolver } from "@hookform/resolvers/zod"
import { DateTimePicker } from "~/components/date-time-picker"
import { Dialog, DialogContent, DialogHeader } from "~/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form'
import { animalsControllerFindAll, diseaseTypesControllerFindAll, inspectionsControllerCreate, diseasesControllerCreate, diseasesControllerRemove, diseasesControllerUpdate, diseasesControllerFindAll } from '~/lib/api'

export default function Diseases() {
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

    const inspectionFormSchema = z.object({
        animalId: z.number(),
        diseaseId: z.number().nullable(),
        conclusion: z.string().optional(),
        type: z.string().default("DISEASE"),
        pulse: z.coerce.number().min(1, "Puls 0 dan katta qiymat kiritilshi shart"),
        temperature: z.coerce.number().min(1, "Harorat 0 dan katta qiymat kiritilshi shart"),
        rumination: z.coerce.number().min(1, "Ruminatsiya 0 dan katta qiymat kiritilshi shart"),
        respiratoryRate: z.coerce.number().min(1, "Nafas olish tezligi 0 dan katta qiymat kiritilshi shart"),
    })

    const inspectionForm = useForm<z.infer<typeof inspectionFormSchema>>({
        resolver: zodResolver(inspectionFormSchema),
        defaultValues: {
            pulse: 0,
            rumination: 0,
            temperature: 0,
            animalId: null,
            type: "DISEASE",
            diseaseId: null,
            respiratoryRate: 0,
        } as any,
    })

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
                <Button onClick={() => inspectionForm.setValue('diseaseId', item.id)} size='sm'>
                    Tekshiruv yaratish
                </Button>
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
    const [itemId, setItemId] = useState<number | null>(null)

    // TODO: fix bug with dates

    const { data: animals }: any = useQuery({
        queryKey: ['animals'],
        queryFn: () => animalsControllerFindAll({page: 1, perPage: 100}),
    })

    const { data: diseaseTypes } = useQuery({
        queryKey: ['disease-types'],
        queryFn: () => diseaseTypesControllerFindAll({page: 1, perPage: 100}),
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
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
        }
    }

    async function handleGetItems(params: any) {
        try {
            setLoading(true)
            const {data, meta} = await diseasesControllerFindAll({params})
            
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

    async function handleCreateInspections(values: z.infer<typeof inspectionFormSchema>) {
        try {
            await inspectionsControllerCreate(values as any)
    
            handleCloseInspection()
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

    function handleCloseInspection() {
        inspectionForm.reset()
    }

    return (
        <div>
            <DataTable
                loading={loading}
                columns={COLUMNS}
                items={items as any}
                totalItems={totalItems}
                callback={handleGetItems}
                topSlot={<Button onClick={() => setDialog(true)} size={'default'} className="!mt-0 w-full sm:w-fit">Kasallik yaratish</Button>} />

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
                                                        diseaseTypes?.data?.map(d => <SelectItem key={d.id} value={String(d.id)}>{d.name}</SelectItem>)
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
                            <Button disabled={form.formState.isSubmitting} type="submit" className="w-full">{form.formState.isSubmitting?"Yuklanyapti...":"Saqlash"}</Button>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>

            <Dialog open={inspectionForm.watch('diseaseId') !== null} onOpenChange={handleCloseInspection}>
                <DialogContent className="overflow-auto max-h-screen md:max-h-[95vh] max-w-[500px]" aria-describedby={undefined}>
                    <DialogHeader>
                        <DialogTitle>{itemId?"Tekshiruvni o'zgartirish":"Tekshiruv yaratish"}</DialogTitle>
                    </DialogHeader>
                    <Form {...inspectionForm}>
                        <form onSubmit={inspectionForm.handleSubmit(handleCreateInspections)} className="space-y-4">
                            <FormField
                                name="pulse"
                                control={inspectionForm.control}
                                render={({ field }) => (
                                    <FormItem className="flex flex-col gap-1 pt-1.5">
                                        <FormLabel>Puls</FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder="Puls" {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="rumination"
                                control={inspectionForm.control}
                                render={({ field }) => (
                                    <FormItem className="flex flex-col gap-1 pt-1.5">
                                        <FormLabel>Ruminatsiya</FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder="Ruminatsiya" {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="temperature"
                                control={inspectionForm.control}
                                render={({ field }) => (
                                    <FormItem className="flex flex-col gap-1 pt-1.5">
                                        <FormLabel>Harorati</FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder="Harorati" {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="respiratoryRate"
                                control={inspectionForm.control}
                                render={({ field }) => (
                                    <FormItem className="flex flex-col gap-1 pt-1.5">
                                        <FormLabel>Nafas olish tezligi</FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder="Nafas olish tezligi" {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="animalId"
                                control={inspectionForm.control}
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
                                                        animals?.data?.map((a: any) => <SelectItem key={a.id} value={String(a.id)}>{a.name}</SelectItem>)
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
                                control={inspectionForm.control}
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

                            <Button disabled={inspectionForm.formState.isSubmitting} type="submit" className="w-full">{inspectionForm.formState.isSubmitting?"Yuklanyapti...":"Saqlash"}</Button>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </div>
    )
}
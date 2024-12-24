'use client'

import { z } from "zod"
import { useForm } from "react-hook-form"
import { useEffect, useState } from 'react'
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'
import { DataTable } from '~/components/data-table'
import { DialogTitle } from '@radix-ui/react-dialog'
import { zodResolver } from "@hookform/resolvers/zod"
import type { Color, Inspection, Disease, Animal } from "~/lib/type"
import { Dialog, DialogContent, DialogHeader } from "~/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form'
import { animalsControllerFindAll, diseasesControllerFindAll, inspectionsControllerFindAll, inspectionsControllerCreate, inspectionsControllerRemove, inspectionsControllerUpdate } from '~/app/api'

export default function Inspections() {
    const COLUMNS = [
        { title: 'Puls', key: 'pulse' },
        { title: 'Ruminatsiya', key: 'rumination' },
        { title: 'Harorati', key: 'temperature' },
        { title: 'Nafas olish tezligi', key: 'respiratoryRate' },
        {
            title: 'Kasallik', key: 'disease', render(item: Inspection) {
                return item.disease?.id
            }
        },
        {
            title: 'Boshqarish', key: 'actions', render(item: Inspection) {
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
    const [items, setItems] = useState<Inspection[]>([])
    const [animals, setAnimals] = useState<Animal[]>([])
    const [diseases, setDiseases] = useState<Disease[]>([])
    const [itemId, setItemId] = useState<number | null>(null)

    const formSchema = z.object({
        pulse: z.coerce.number(),
        rumination: z.coerce.number(),
        temperature: z.coerce.number(),
        animalId: z.number().nullable(),
        diseaseId: z.number().nullable(),
        respiratoryRate: z.coerce.number(),
        generalInspectionId: z.number().nullable(),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            pulse: 0,
            rumination: 0,
            temperature: 0,
            animalId: null,
            diseaseId: null,
            respiratoryRate: 0,
            generalInspectionId: null,
        },
    })

    useEffect(() => {
        handleGetAnimalsAndDiseases()
    }, [])

    async function handleGetAnimalsAndDiseases() {
        try {
            const [A, D]: any = await Promise.all([
                animalsControllerFindAll({page: 1, perPage: 1000}),
                diseasesControllerFindAll({page: 1, perPage: 1000} as any),
            ])
            setAnimals(A.data)
            setDiseases(D.data)
        } catch (error) {
            console.log(error)
        }
    }

    async function onSubmit(values: z.infer<typeof formSchema>) {
        if (itemId) {
            const data: any = await inspectionsControllerUpdate(itemId, values as any)
            setItems(p => p.map(i => {
                if(i.id === itemId) return data
                return i
            }))
        } else {
            const data: any = await inspectionsControllerCreate(values as any)
            setItems(p => [...p, data])
        }

        handleClose()
    }

    async function handleGetItems(params: any) {
        try {
            setLoading(true)
            const {data, meta} = await inspectionsControllerFindAll(params)

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
            if(!confirm('Delete?')) return
            await inspectionsControllerRemove(id)
            setItems(p => p.filter(i => i.id !== id))
        } catch (error) {
            console.log(error)
        }
    }

    function handleEditItem(item: Inspection) {
        setDialog(true)
        setItemId(item.id)

        form.setValue('pulse', item.pulse!)
        form.setValue('animalId', item.animalId!)
        form.setValue('diseaseId', item.diseaseId!)
        form.setValue('rumination', item.rumination!)
        form.setValue('temperature', item.temperature!)
        form.setValue('respiratoryRate', item.respiratoryRate!)
        form.setValue('generalInspectionId', item.generalInspectionId!)
    }

    function handleClose() {
        form.reset()
        setItemId(null)
        setDialog(false)
    }

    return (
        <div>
            <DataTable
                loading={loading}
                columns={COLUMNS}
                items={items as any}
                totalItems={totalItems}
                callback={handleGetItems}
                topSlot={<Button onClick={() => setDialog(true)} size={'default'} className="w-full sm:w-fit">Tekshiruv yaratish</Button>} />

            <Dialog open={dialog} onOpenChange={handleClose}>
                <DialogContent style={{ maxHeight: '95vh', maxWidth: 500, overflow: 'auto' }} aria-describedby={undefined}>
                    <DialogHeader>
                        <DialogTitle>Tekshiruv yaratish</DialogTitle>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                name="pulse"
                                control={form.control}
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
                                control={form.control}
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
                                control={form.control}
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
                                control={form.control}
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
                                name="diseaseId"
                                control={form.control}
                                render={({ field: { value, onChange, ...others } }) => (
                                    <FormItem>
                                        <FormLabel>Kasallik</FormLabel>
                                        <FormControl>
                                            <Select value={value ? String(value) : ""} onValueChange={e => onChange(+e)} {...others}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Kasallik" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {
                                                        diseases.map(d => <SelectItem key={d.id} value={String(d.id)}>{d.id}</SelectItem>)
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
                                                        animals.map(a => <SelectItem key={a.id} value={String(a.id)}>{a.id}</SelectItem>)
                                                    }
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* <FormField
                                name="generalInspectionId"
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
                            /> */}

                            <Button type="submit" className="w-full">Saqlash</Button>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </div>
    )
}
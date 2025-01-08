'use client'

import { z } from "zod"
import { useForm } from "react-hook-form"
import { useEffect, useState } from 'react'
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'
import { DataTable } from '~/components/data-table'
import { Textarea } from "~/components/ui/textarea"
import { DialogTitle } from '@radix-ui/react-dialog'
import { zodResolver } from "@hookform/resolvers/zod"
import type { Inspection, Animal } from "~/lib/type"
import { ALERT_MESSAGES, INSPECTION_TYPES } from "~/constants"
import { Dialog, DialogContent, DialogHeader } from "~/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form'
import { animalsControllerFindAll, inspectionsControllerFindAll, inspectionsControllerCreate, inspectionsControllerRemove, inspectionsControllerUpdate } from '~/lib/api'

export default function Inspections() {
    const COLUMNS = [
        { title: 'Puls', key: 'pulse' },
        { title: 'Ruminatsiya', key: 'rumination' },
        { title: 'Harorati', key: 'temperature' },
        { title: 'Nafas olish tezligi', key: 'respiratoryRate' },
        { title: 'Tekshiruv turi', key: 'type', render(item: any) {
            return INSPECTION_TYPES[item.type as keyof typeof INSPECTION_TYPES]
        } },
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
    const [itemId, setItemId] = useState<number | null>(null)
    const [createLoading, setCreateLoading] = useState(false)

    const formSchema = z.object({
        animalId: z.number(),
        conclusion: z.string().optional(),
        type: z.enum(["EVENING", "MORNING", "DISEASE", "GENERAL"]),
        pulse: z.coerce.number().min(1, "Puls 0 dan katta qiymat kiritilshi shart"),
        temperature: z.coerce.number().min(1, "Harorat 0 dan katta qiymat kiritilshi shart"),
        rumination: z.coerce.number().min(1, "Ruminatsiya 0 dan katta qiymat kiritilshi shart"),
        respiratoryRate: z.coerce.number().min(1, "Nafas olish tezligi 0 dan katta qiymat kiritilshi shart"),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            pulse: 0,
            rumination: 0,
            temperature: 0,
            animalId: null,
            type: "MORNING",
            respiratoryRate: 0,
        } as any,
    })

    async function handleGetAnimals() {
        try {
            const [A, D]: any = await Promise.all([
                animalsControllerFindAll({page: 1, perPage: 1000}),
            ])
            setAnimals(A.data)
        } catch (error) {
            console.log(error)
        }
    }

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            setCreateLoading(true)

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
        } catch (error) {
            console.log(error)            
        } finally {
            setCreateLoading(false)
        }
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
            if(!confirm(ALERT_MESSAGES.DELETE_CONFIRM)) return
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
        form.setValue('type', item.type as any)
        form.setValue('animalId', item.animalId!)
        form.setValue('rumination', item.rumination!)
        form.setValue('temperature', item.temperature!)
        form.setValue('conclusion', item.conclusion||'')
        form.setValue('respiratoryRate', item.respiratoryRate!)
    }

    function handleClose() {
        form.reset()
        setItemId(null)
        setDialog(false)
    }
    
    useEffect(() => {
        handleGetAnimals()
    }, [])

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
                <DialogContent className="overflow-auto max-h-screen md:max-h-[95vh] max-w-[500px]" aria-describedby={undefined}>
                    <DialogHeader>
                        <DialogTitle>{itemId?"Tekshiruvni o'zgartirish":"Tekshiruv yaratish"}</DialogTitle>
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
                                name="type"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Tekshiruv turi</FormLabel>
                                        <FormControl>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Tekshiruv turi" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {
                                                        Object.keys(INSPECTION_TYPES).map(k => <SelectItem disabled={k === "GENERAL" || k === "DISEASE"} key={k} value={k}>{INSPECTION_TYPES[k as keyof typeof INSPECTION_TYPES]}</SelectItem>)
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
                                                        animals.map(a => <SelectItem key={a.id} value={String(a.id)}>{a.name}</SelectItem>)
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
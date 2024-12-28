'use client'

import { z } from "zod"
import { useForm } from "react-hook-form"
import { useEffect, useState } from 'react'
import { Button } from '~/components/ui/button'
import { DataTable } from '~/components/data-table'
import { DialogTitle } from '@radix-ui/react-dialog'
import { zodResolver } from "@hookform/resolvers/zod"
import type { Color, Animal, GeneralInspection } from "~/lib/type"
import { Dialog, DialogContent, DialogHeader } from "~/components/ui/dialog"
import { CUSTOMER_TYPES, OBESITY_TYPES, BODY_TYPES, BODY_STRUCTURES } from '~/constants'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import { animalsControllerFindAll, colorsControllerFindAll, generalInspectionControllerCreate, generalInspectionControllerFindAll, generalInspectionControllerRemove, generalInspectionControllerUpdate } from '~/lib/api'

export default function GeneralInspections() {
    const COLUMNS = [
        {
            title: 'Semizligi', key: 'obesity', render(item: GeneralInspection) {
                return OBESITY_TYPES[item.obesity]
            }
        },
        {
            title: 'Hayvon jussasi', key: 'bodyType', render(item: GeneralInspection) {
                return BODY_TYPES[item.bodyType]
            }
        },
        {
            title: 'Tana tuzilishi', key: 'bodyStructure', render(item: GeneralInspection) {
                return BODY_STRUCTURES[item.bodyStructure]
            }
        },
        {
            title: 'Hayvon mijozi', key: 'customerType', render(item: GeneralInspection) {
                return CUSTOMER_TYPES[item.customerType]
            }
        },
        {
            title: 'Rangi', key: 'color', render(item: GeneralInspection) {
                return item.color?.name
            }
        },
        {
            title: 'Hayvon', key: 'animal', render(item: GeneralInspection) {
                return item.animal?.name
            }
        },
        {
            title: 'Boshqarish', key: 'actions', render(item: GeneralInspection) {
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
    const [colors, setColors] = useState<Color[]>([])
    const [animals, setAnimals] = useState<Animal[]>([])
    const [itemId, setItemId] = useState<number | null>(null)
    const [items, setItems] = useState<GeneralInspection[]>([])

    const formSchema = z.object({
        colorId: z.number(),
        animalId: z.number(),
        customerType: z.enum(["MOBILE", "CALM"]),
        bodyType: z.enum(["WEAK", "MEDIUM", "STRONG"]),
        obesity: z.enum(["HIGH","MEDIUM","LOW","LEAN","CACHEXIA"]),
        bodyStructure: z.enum(["COARSE", "SLIM", "DENSE", "WEAK"]),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            colorId: null,
            animalId: null,
            bodyType: "MEDIUM",
            obesity: "CACHEXIA",
            customerType: "CALM",
            bodyStructure: "COARSE",
        } as any,
    })

    async function handleGetAnimalsDiseasesColors() {
        try {
            const [A, C]: any = await Promise.all([
                animalsControllerFindAll({page: 1, perPage: 1000}),
                colorsControllerFindAll({page: 1, perPage: 1000})
            ])
            setColors(C.data)
            setAnimals(A.data)
        } catch (error) {
            console.log(error)
        }
    }

    async function onSubmit(values: z.infer<typeof formSchema>) {
        if (itemId) {
            const data: any = await generalInspectionControllerUpdate(itemId, values as any)
            setItems(p => p.map(i => {
                if(i.id === itemId) return data
                return i
            }))
        } else {
            const data: any = await generalInspectionControllerCreate(values as any)
            setItems(p => [...p, data])
        }

        handleClose()
    }

    async function handleGetItems(params: any) {
        try {
            setLoading(true)
            const {data, meta} = await generalInspectionControllerFindAll(params)
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
            await generalInspectionControllerRemove(id)
            setItems(p => p.filter(i => i.id !== id))
        } catch (error) {
            console.log(error)
        }
    }

    function handleEditItem(item: GeneralInspection) {
        setDialog(true)
        setItemId(item.id)

        form.setValue('colorId', item.colorId!)
        form.setValue('obesity', item.obesity!)
        form.setValue('animalId', item.animalId!)
        form.setValue('bodyType', item.bodyType!)
        form.setValue('customerType', item.customerType!)
        form.setValue('bodyStructure', item.bodyStructure!)
    }

    function handleClose() {
        form.reset()
        setItemId(null)
        setDialog(false)
    }

    useEffect(() => {
        handleGetAnimalsDiseasesColors()
    }, [])

    return (
        <div>
            <DataTable
                loading={loading}
                columns={COLUMNS}
                items={items as any}
                totalItems={totalItems}
                callback={handleGetItems}
                topSlot={<Button onClick={() => setDialog(true)} size={'default'} className="w-full sm:w-fit">Umummiy tekshiruv yaratish</Button>} />

            <Dialog open={dialog} onOpenChange={handleClose}>
                <DialogContent className="overflow-auto max-h-screen md:max-h-[95vh] max-w-[500px]" aria-describedby={undefined}>
                    <DialogHeader>
                        <DialogTitle>{itemId?"Umummiy tekshiruvni o'zgartirish":"Umummiy tekshiruv yaratish"}</DialogTitle>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            
                            <FormField
                                name="obesity"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Semizligi</FormLabel>
                                        <FormControl>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Semizligi" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {
                                                        Object.keys(OBESITY_TYPES).map(k => <SelectItem key={k} value={k}>{OBESITY_TYPES[k as keyof typeof OBESITY_TYPES]}</SelectItem>)
                                                    }
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="bodyType"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Hayvon jussasi</FormLabel>
                                        <FormControl>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Hayvon jussasi" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {
                                                        Object.keys(BODY_TYPES).map(k => <SelectItem key={k} value={k}>{BODY_TYPES[k as keyof typeof BODY_TYPES]}</SelectItem>)
                                                    }
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="bodyStructure"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Tana tuzilishi</FormLabel>
                                        <FormControl>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Tana tuzilishi" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {
                                                        Object.keys(BODY_STRUCTURES).map(k => <SelectItem key={k} value={k}>{BODY_STRUCTURES[k as keyof typeof BODY_STRUCTURES]}</SelectItem>)
                                                    }
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="customerType"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Hayvon mijozi</FormLabel>
                                        <FormControl>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Hayvon mijozi" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {
                                                        Object.keys(CUSTOMER_TYPES).map(k => <SelectItem key={k} value={k}>{CUSTOMER_TYPES[k as keyof typeof CUSTOMER_TYPES]}</SelectItem>)
                                                    }
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="colorId"
                                control={form.control}
                                render={({ field: { value, onChange, ...others } }) => (
                                    <FormItem>
                                        <FormLabel>Rangi</FormLabel>
                                        <FormControl>
                                            <Select value={value ? String(value) : ""} onValueChange={e => onChange(+e)} {...others}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Rangi" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {
                                                        colors.map(d => <SelectItem key={d.id} value={String(d.id)}>{d.name}</SelectItem>)
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
                            <Button type="submit" className="w-full">Saqlash</Button>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </div>
    )
}
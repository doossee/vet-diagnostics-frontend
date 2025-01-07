'use client'

import { z } from "zod"
import { useForm } from "react-hook-form"
import { useEffect, useState } from 'react'
import { ALERT_MESSAGES } from "~/constants"
import { Input } from "~/components/ui/input"
import { Divider } from "~/components/divider"
import { Button } from '~/components/ui/button'
import { DataTable } from '~/components/data-table'
import { DialogTitle } from '@radix-ui/react-dialog'
import { zodResolver } from "@hookform/resolvers/zod"
import { Dialog, DialogContent, DialogHeader } from "~/components/ui/dialog"
import { CUSTOMER_TYPES, OBESITY_TYPES, BODY_TYPES, BODY_STRUCTURES } from '~/constants'
import type { Color, Animal, GeneralInspection, Disease, Eyelid, LeatherCover } from "~/lib/type"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import { eyelidsControllerFindAll, leatherCoversControllerFindAll, diseasesControllerFindAll, animalsControllerFindAll, colorsControllerFindAll, generalInspectionControllerCreate, generalInspectionControllerFindAll, generalInspectionControllerRemove, generalInspectionControllerUpdate } from '~/lib/api'

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
    const [eyelids, setEyelids] = useState<Eyelid[]>([])
    const [itemId, setItemId] = useState<number | null>(null)
    const [items, setItems] = useState<GeneralInspection[]>([])
    const [leatherCovers, setLeatherCovers] = useState<LeatherCover[]>([])
    const [createLoading, setCreateLoading] = useState(false)

    const formSchema = z.object({
        colorId: z.number(),
        animalId: z.number(),
        eyelidId: z.number(),
        leatherCoverId: z.number(),
        customerType: z.enum(["MOBILE", "CALM"]),
        bodyType: z.enum(["WEAK", "MEDIUM", "STRONG"]),
        obesity: z.enum(["HIGH","MEDIUM","LOW","LEAN","CACHEXIA"]),
        bodyStructure: z.enum(["COARSE", "SLIM", "DENSE", "WEAK"]),
        pulse: z.coerce.number().min(1, "Puls 0 dan katta qiymat kiritilshi shart"),
        rumination: z.coerce.number().min(1, "Ruminatsiya 0 dan katta qiymat kiritilshi shart"),
        temperature: z.coerce.number().min(1, "Harorat 0 dan katta qiymat kiritilshi shart"),
        respiratoryRate: z.coerce.number().min(1, "Nafas olish tezligi 0 dan katta qiymat kiritilshi shart"),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            colorId: null,
            animalId: null,
            eyelidId: null,
            bodyType: "MEDIUM",
            obesity: "CACHEXIA",
            leatherCoverId: null,
            customerType: "CALM",
            bodyStructure: "COARSE",
            
            pulse: 0,
            rumination: 0,
            temperature: 0,
            respiratoryRate: 0,
        } as any,
    })

    async function handleGetAnimalsColors() {
        try {
            const [A, C, E, L]: any = await Promise.all([
                animalsControllerFindAll({page: 1, perPage: 1000}),
                colorsControllerFindAll({page: 1, perPage: 1000}),
                eyelidsControllerFindAll({page: 1, perPage: 1000}),
                leatherCoversControllerFindAll({page: 1, perPage: 1000}),
            ])
            setColors(C.data)
            setAnimals(A.data)
            setEyelids(E.data)
            setLeatherCovers(L.data)
        } catch (error) {
            console.log(error)
        }
    }

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            setCreateLoading(true)

            if (itemId) {
                // const data: any = await generalInspectionControllerUpdate(itemId, body as any)
                // setItems(p => p.map(i => {
                //     if(i.id === itemId) return data
                //     return i
                // }))
            } else {
                const data: any = await generalInspectionControllerCreate(values as any)
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
            if(!confirm(ALERT_MESSAGES.DELETE_CONFIRM)) return
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
        form.setValue('eyelidId', item.eyelidId!)
        form.setValue('bodyType', item.bodyType!)
        form.setValue('customerType', item.customerType!)
        form.setValue('bodyStructure', item.bodyStructure!)
        form.setValue('leatherCoverId', item.leatherCoverId!)
    }

    function handleClose() {
        form.reset()
        setItemId(null)
        setDialog(false)
    }

    useEffect(() => {
        handleGetAnimalsColors()
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
                <DialogContent className="overflow-auto max-h-screen md:max-h-[95vh] max-w-[600px]" aria-describedby={undefined}>
                    <DialogHeader>
                        <DialogTitle>{itemId?"Umummiy tekshiruvni o'zgartirish":"Umummiy tekshiruv yaratish"}</DialogTitle>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            
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

                            <FormField
                                name="leatherCoverId"
                                control={form.control}
                                render={({ field: { value, onChange, ...others } }) => (
                                    <FormItem>
                                        <FormLabel>Teri qoplamasi</FormLabel>
                                        <FormControl>
                                            <Select value={value ? String(value) : ""} onValueChange={e => onChange(+e)} {...others}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Teri qoplamasi" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {
                                                        leatherCovers.map(d => <SelectItem key={d.id} value={String(d.id)}>{d.name}</SelectItem>)
                                                    }
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="eyelidId"
                                control={form.control}
                                render={({ field: { value, onChange, ...others } }) => (
                                    <FormItem>
                                        <FormLabel>Ko'z qopqog'i</FormLabel>
                                        <FormControl>
                                            <Select value={value ? String(value) : ""} onValueChange={e => onChange(+e)} {...others}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Ko'z qopqog'i" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {
                                                        eyelids.map(d => <SelectItem key={d.id} value={String(d.id)}>{d.name}</SelectItem>)
                                                    }
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            

                            <Divider label="Gabitus" className="col-span-1 md:col-span-2" />
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

                            <Divider label="Tekshiruv" className="col-span-1 md:col-span-2" />

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

                            <Button disabled={createLoading} type="submit" className="w-full">{createLoading?"Yuklanyapti...":"Saqlash"}</Button>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </div>
    )
}
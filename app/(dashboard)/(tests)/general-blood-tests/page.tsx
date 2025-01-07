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
import { DatePicker } from "~/components/date-picker"
import type { Animal, GeneralBloodTest } from "~/lib/type"
import { GENERAL_BLOOD_TESTS, ALERT_MESSAGES } from '~/constants'
import { Dialog, DialogContent, DialogHeader } from "~/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import { generalBloodTestControllerCreate, generalBloodTestControllerFindAll, generalBloodTestControllerUpdate, generalBloodTestControllerRemove, animalsControllerFindAll } from '~/lib/api'

type GENERAL_BLOOD = keyof typeof GENERAL_BLOOD_TESTS

const defaultValues: any = {}
const formSchemaValues: any = {}

Object.keys(GENERAL_BLOOD_TESTS).map(key => {
    defaultValues[key] = 0
    formSchemaValues[key] = z.coerce.number().min(1, GENERAL_BLOOD_TESTS[key as GENERAL_BLOOD] + " 0 dan katta qiymant kiritilishi shart")
})

export default function GeneralBloodTests() {
    const COLUMNS = [
        { title: 'Sanasi', key: 'date', render(item: GeneralBloodTest) {
            return new Date(item.date).toLocaleDateString()
        } },
        ...Object.keys(GENERAL_BLOOD_TESTS).map(key => ({
            key,
            title: GENERAL_BLOOD_TESTS[key as GENERAL_BLOOD],
        })),
        { title: 'Xulosa', key: 'conclusion' },
        {
            title: 'Hayvon', key: 'animal', render(item: GeneralBloodTest) {
                return item.animal?.name
            }
        },
        {
            title: 'Boshqarish', key: 'actions', render(item: GeneralBloodTest) {
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
    const [animals, setAnimals] = useState<Animal[]>([])
    const [itemId, setItemId] = useState<number | null>(null)
    const [items, setItems] = useState<GeneralBloodTest[]>([])
    const [createLoading, setCreateLoading] = useState(false)

    const formSchema = z.object({
        date: z.date(),
        animalId: z.number(),
        conclusion: z.string(),
        ...formSchemaValues,
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            date: null,
            animalId: null,
            conclusion: "",
            ...defaultValues,
        },
    })

    async function handleGetAnimals() {
        try {
            const { data }: any = await animalsControllerFindAll({page: 1, perPage: 1000})
            setAnimals(data)
        } catch (error) {
            console.log(error)
        }
    }

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            setCreateLoading(true)
            
            if (itemId) {
                const data: any = await generalBloodTestControllerUpdate(itemId, values as any)
                setItems(p => p.map(i => {
                    if(i.id === itemId) return data
                    return i
                }))
            } else {
                const data: any = await generalBloodTestControllerCreate(values as any)
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
            const {data, meta} = await generalBloodTestControllerFindAll(params)
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
            await generalBloodTestControllerRemove(id)
            setItems(p => p.filter(i => i.id !== id))
        } catch (error) {
            console.log(error)
        }
    }

    function handleEditItem(item: GeneralBloodTest) {
        setDialog(true)
        setItemId(item.id)

        form.setValue('animalId', item.animalId)
        form.setValue('date', new Date(item.date))
        form.setValue('conclusion', item.conclusion!)
        Object.keys(GENERAL_BLOOD_TESTS).map(key => {
            form.setValue(key as GENERAL_BLOOD, item[key as GENERAL_BLOOD]||0)
        })
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
                topSlot={<Button onClick={() => setDialog(true)} size={'default'} className="w-full sm:w-fit">Qon tahlili yaratish</Button>} />

            <Dialog open={dialog} onOpenChange={handleClose}>
                <DialogContent className="overflow-auto max-h-screen md:max-h-[95vh] max-w-[600px]" aria-describedby={undefined}>
                    <DialogHeader>
                        <DialogTitle>{itemId?"Tahlilni o'zgartirish":"Tahlil yaratish"}</DialogTitle>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <FormField
                                name="date"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem className="flex flex-col gap-2 pt-1">
                                        <FormLabel>Sanasi</FormLabel>
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
                                                        animals.map(a => <SelectItem key={a.id} value={String(a.id)}>{a.name}</SelectItem>)
                                                    }
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {
                                Object.keys(GENERAL_BLOOD_TESTS).map(key => {
                                    return (
                                        <FormField
                                            key={key}
                                            control={form.control}
                                            name={key as GENERAL_BLOOD}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>{GENERAL_BLOOD_TESTS[key as GENERAL_BLOOD]}</FormLabel>
                                                    <FormControl>
                                                        <Input type="number" placeholder={GENERAL_BLOOD_TESTS[key as GENERAL_BLOOD]} {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    )
                                })
                            }
                            <FormField
                                name="conclusion"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem className="col-span-1 sm:col-span-2">
                                        <FormLabel>Xulosa</FormLabel>
                                        <FormControl>
                                            <Textarea rows={6} className="resize-none" placeholder="Xulosa manzi" {...field} />
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
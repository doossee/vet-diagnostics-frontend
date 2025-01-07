'use client'

import { z } from "zod"
import { useForm } from "react-hook-form"
import { useEffect, useState } from 'react'
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'
import { DataTable } from '~/components/data-table'
import { DialogTitle } from '@radix-ui/react-dialog'
import { zodResolver } from "@hookform/resolvers/zod"
import type { Animal, BloodSerumTest } from "~/lib/type"
import { BLOOD_SERUM_TESTS, ALERT_MESSAGES } from '~/constants'
import { Dialog, DialogContent, DialogHeader } from "~/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import { animalsControllerFindAll, bloodSerumTestsControllerCreate, bloodSerumTestsControllerFindAll, bloodSerumTestsControllerRemove, bloodSerumTestsControllerUpdate } from '~/lib/api'

type BLOOD_SERUM = keyof typeof BLOOD_SERUM_TESTS

const defaultValues: any = {}
const formSchemaValues: any = {}

Object.keys(BLOOD_SERUM_TESTS).map(key => {
    defaultValues[key] = 0
    formSchemaValues[key] = z.coerce.number().min(1, BLOOD_SERUM_TESTS[key as BLOOD_SERUM] + " 0 dan katta qiymant kiritilishi shart")
})

export default function BloodSerumTests() {
    const COLUMNS = [
        ...Object.keys(BLOOD_SERUM_TESTS).map(key => ({
            key,
            title: BLOOD_SERUM_TESTS[key as BLOOD_SERUM],
        })),
        {
            title: 'Hayvon', key: 'animal', render(item: BloodSerumTest) {
                return item.animal?.name
            }
        },
        {
            title: 'Boshqarish', key: 'actions', render(item: BloodSerumTest) {
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
    const [items, setItems] = useState<BloodSerumTest[]>([])
    const [itemId, setItemId] = useState<number | null>(null)
    const [createLoading, setCreateLoading] = useState(false)
    
    const formSchema = z.object({
        animalId: z.number().min(1, "Hayvon tanlanishi shart shart"),
        ...formSchemaValues
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            animalId: null,
            ...defaultValues,
        } as any,
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
                const data: any = await bloodSerumTestsControllerUpdate(itemId, values as any)
                setItems(p => p.map(i => {
                    if(i.id === itemId) return data
                    return i
                }))
            } else {
                const data: any = await bloodSerumTestsControllerCreate(values as any)
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
            const { data, meta } = await bloodSerumTestsControllerFindAll(params)
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
            await bloodSerumTestsControllerRemove(id)
            setItems(p => p.filter(i => i.id !== id))
        } catch (error) {
            console.log(error)
        }
    }

    function handleEditItem(item: BloodSerumTest) {
        setDialog(true)
        setItemId(item.id)

        form.setValue('animalId', item.animalId)
        Object.keys(BLOOD_SERUM_TESTS).map((key) => {
            form.setValue(key as BLOOD_SERUM, (item as any)[key as BLOOD_SERUM])
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
                topSlot={<Button onClick={() => setDialog(true)} size={'default'} className="w-full sm:w-fit">Tahlil yaratish</Button>}
            />

            <Dialog open={dialog} onOpenChange={handleClose}>
                <DialogContent className="overflow-auto max-h-screen md:max-h-[95vh] max-w-[600px]" aria-describedby={undefined}>
                    <DialogHeader>
                        <DialogTitle>{itemId?"Qon serum tahlilini o'zgartirish":"Qon serum tahlil yaratish"}</DialogTitle>
                    </DialogHeader>
                    
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <FormField
                                name="animalId"
                                control={form.control}
                                render={({ field: { value, onChange, ...others } }) => (
                                    <FormItem className="col-span-1 sm:col-span-2">
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
                                Object.keys(BLOOD_SERUM_TESTS).map(key => {
                                    return (
                                        <FormField
                                            key={key}
                                            control={form.control}
                                            name={key as BLOOD_SERUM}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>{BLOOD_SERUM_TESTS[key as BLOOD_SERUM]}</FormLabel>
                                                    <FormControl>
                                                        <Input type="number" placeholder={BLOOD_SERUM_TESTS[key as BLOOD_SERUM]} {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    )
                                })
                            }
                            <Button disabled={createLoading} type="submit" className="w-full">{createLoading?"Yuklanyapti...":"Saqlash"}</Button>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </div>
    )
}
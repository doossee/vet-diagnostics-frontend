'use client'

import { z } from "zod"
import { useForm } from "react-hook-form"
import { useEffect, useState } from 'react'
import { Input } from '~/components/ui/input'
import { BLOOD_SERUM_TESTS } from '~/constants'
import { Button } from '~/components/ui/button'
import { DataTable } from '~/components/data-table'
import { DialogTitle } from '@radix-ui/react-dialog'
import { zodResolver } from "@hookform/resolvers/zod"
import type { Animal, BloodSerumTest } from "~/lib/type"
import { Dialog, DialogContent, DialogHeader } from "~/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import { animalsControllerFindAll, bloodSerumTestsControllerCreate, bloodSerumTestsControllerFindAll, bloodSerumTestsControllerRemove, bloodSerumTestsControllerUpdate } from '~/lib/api'

type BLOOD_SERUM = keyof typeof BLOOD_SERUM_TESTS

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
    
    const formSchema = z.object({
        urea: z.coerce.number(),
        glucose: z.coerce.number(),
        albumen: z.coerce.number(),
        creatine: z.coerce.number(),
        vitaminA: z.coerce.number(),
        vitaminB: z.coerce.number(),
        ureaAcid: z.coerce.number(),
        citricAcid: z.coerce.number(),
        lacticAcid: z.coerce.number(),
        pyruvicAcid: z.coerce.number(),
        cholesterol: z.coerce.number(),
        totalLipids: z.coerce.number(),
        totalProtein: z.coerce.number(),
        totalCalcium: z.coerce.number(),
        betaGlobulin: z.coerce.number(),
        gammaGlobulin: z.coerce.number(),
        alphaGlobulin: z.coerce.number(),
        totalBilirubin: z.coerce.number(),
        alkalineReserve: z.coerce.number(),
        organicPhosphorus: z.coerce.number(),
        animalId: z.number().nullable(),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            urea: 0,
            albumen: 0,
            glucose: 0,
            ureaAcid: 0,
            vitaminA: 0,
            vitaminB: 0,
            creatine: 0,
            citricAcid: 0,
            lacticAcid: 0,
            animalId: null,
            cholesterol: 0,
            totalLipids: 0,
            pyruvicAcid: 0,
            totalProtein: 0,
            totalCalcium: 0,
            betaGlobulin: 0,
            gammaGlobulin: 0,
            alphaGlobulin: 0,
            totalBilirubin: 0,
            alkalineReserve: 0,
            organicPhosphorus: 0,
        },
    })

    useEffect(() => {
        handleGetAnimals()
    }, [])

    async function handleGetAnimals() {
        try {
            const { data }: any = await animalsControllerFindAll({page: 1, perPage: 1000})
            setAnimals(data)
        } catch (error) {
            console.log(error)
        }
    }

    async function onSubmit(values: z.infer<typeof formSchema>) {
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
            if(!confirm('Delete?')) return
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
                <DialogContent style={{ maxHeight: '95vh', maxWidth: 600, overflow: 'auto' }} aria-describedby={undefined}>
                    <DialogHeader>
                        <DialogTitle>Qon serum tahlil yaratish</DialogTitle>
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
                            <Button type="submit" className="col-span-1 sm:col-span-2">Saqlash</Button>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </div>
    )
}
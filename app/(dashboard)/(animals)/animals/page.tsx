'use client'

import { z } from "zod"
import { GENDERS, BREED } from '~/constants'
import { useForm } from "react-hook-form"
import { useEffect, useState } from 'react'
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'
import { DataTable } from '~/components/data-table'
import { useAuthData } from '~/hooks/use-auth-data'
import { DialogTitle } from '@radix-ui/react-dialog'
import { zodResolver } from "@hookform/resolvers/zod"
import { DatePicker } from '~/components/date-picker'
import type { Color, Animal, AnimalType } from "~/lib/type"
import { Dialog, DialogContent, DialogHeader } from "~/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import { colorsControllerFindAll, animalTypesControllerFindAll, animalsControllerFindAll, animalsControllerCreate, animalsControllerRemove, animalsControllerUpdate } from '~/app/api'

export default function Animals() {
    const COLUMNS = [
        { title: 'Nomi', key: 'name' },
        { title: 'Yoshi', key: 'age' },
        { title: 'Turi', key: 'type', render(item: Animal) {
            return item.type?.name
        } },
        { title: 'Rangi', key: 'color', render(item: Animal) {
            return item.color?.name
        } },
        { title: 'Vazni', key: 'weight' },
        { title: 'Fermer', key: 'farmer', render(item: Animal) {
            return item.farmer?.user?.firstName + ' ' + item.farmer?.user?.lastName
        } },
        { title: 'Id Kodi', key: 'idCode' },
        { title: 'Manzili', key: 'address' },
        {
            title: 'Jinsi', key: 'gender', render(item: Animal) {
                return GENDERS.find(g => g.value === item.gender)?.name
            }
        },
        {
            title: 'Zoti', key: 'breed', render(item: Animal) {
                return BREED.find(b => b.value === item.breed)?.name
            }
        },
        { title: 'Keltirilgan kuni', key: 'arrivalDate' },
        {
            title: 'Boshqarish', key: 'actions', render(item: Animal) {
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

    const { userData } = useAuthData()
    const [dialog, setDialog] = useState(false)
    const [loading, setLoading] = useState(true)
    const [items, setItems] = useState<Animal[]>([])
    const [totalItems, setTotalItems] = useState(0)
    const [itemId, setItemId] = useState<number | null>(null)
    const [animalColors, setAnimalColors] = useState<Color[]>([])
    const [animalTypes, setAnimalTypes] = useState<AnimalType[]>([])

    const formSchema = z.object({
        name: z.string(),
        weight: z.number(),
        idCode: z.string(),
        typeId: z.number().nullable(),
        birthDate: z.date().nullable(),
        colorId: z.number().nullable(),
        farmerId: z.number().nullable(),
        breed: z.enum(["MEAT", "MILK"]),
        arrivalDate: z.date().nullable(),
        gender: z.enum(["MALE", "FEMALE"]),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            weight: 0,
            idCode: "",
            typeId: null,
            breed: "MILK",
            colorId: null,
            farmerId: null,
            gender: "MALE",
            birthDate: null,
            arrivalDate: null,
        },
    })

    useEffect(() => {
        form.setValue('farmerId', userData?.userId!)
        handleGetColorsAndTypes()
    }, [])

    async function handleGetColorsAndTypes() {
        try {
            const [C, T]: any = await Promise.all([
                colorsControllerFindAll({page: 1, perPage: 100}),
                animalTypesControllerFindAll({page: 1, perPage: 100})
            ])
            setAnimalColors(C.data)
            setAnimalTypes(T.data)
        } catch (error) {
            console.log(error)
        }
    }

    async function onSubmit(values: z.infer<typeof formSchema>) {
        if (itemId) {
            const data: any = await animalsControllerUpdate(itemId, values as any)
            setItems(p => p.map(i => {
                if(i.id === itemId) return data
                return i
            }))
        } else {
            form.setValue('farmerId', userData?.userId!)
            const data: any = await animalsControllerCreate({...values} as any)
            setItems(p => [...p, data])
        }

        handleClose()
    }

    async function handleGetItems(params: any) {
        try {
            setLoading(true)
            const {data, meta}: any = await animalsControllerFindAll(params)
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
            await animalsControllerRemove(id)
            setItems(p => p.filter(i => i.id !== id))
        } catch (error) {
            console.log(error)
        }
    }

    function handleEditItem(item: Animal) {
        setDialog(true)
        setItemId(item.id)

        form.setValue('name', item.name)
        form.setValue('breed', item.breed)
        form.setValue('gender', item.gender)
        form.setValue('idCode', item.idCode)
        form.setValue('weight', item.weight)
        form.setValue('typeId', item.typeId)
        form.setValue('colorId', item.colorId)
        form.setValue('birthDate', item.birthDate)
        form.setValue('arrivalDate', item.arrivalDate)
    }

    function handleClose() {
        setItemId(null)
        setDialog(false)
        form.resetField('name')
        form.resetField('breed')
        form.resetField('gender')
        form.resetField('idCode')
        form.resetField('weight')
        form.resetField('typeId')
        form.resetField('colorId')
        form.resetField('birthDate')
        form.resetField('arrivalDate')
    }

    return (
        <div>
            <DataTable
                loading={loading}
                columns={COLUMNS}
                items={items as any}
                totalItems={totalItems}
                callback={handleGetItems}
                topSlot={<Button onClick={() => setDialog(true)} size={'default'} className="w-full sm:w-fit">Hayvon qo'shish</Button>}
            />

            <Dialog open={dialog} onOpenChange={handleClose}>
                <DialogContent style={{ maxHeight: '95vh', maxWidth: 600, overflow: 'auto' }} aria-describedby={undefined}>
                    <DialogHeader>
                        <DialogTitle>Hayvon qo'shish</DialogTitle>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                name="name"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Hayvon nomi</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Hayvon nomi" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="idCode"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Kodi</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Id Kodi" {...field} />
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
                                        <FormLabel>Turi</FormLabel>
                                        <FormControl>
                                            <Select value={value?String(value):""} onValueChange={e => onChange(+e)} {...others}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Turi" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {
                                                        animalTypes.map(d => <SelectItem key={d.id} value={String(d.id)}>{d.name}</SelectItem>)
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
                                            <Select value={value?String(value):""} onValueChange={e => onChange(+e)} {...others}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Rangi" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {
                                                        animalColors.map(d => <SelectItem key={d.id} value={String(d.id)}>{d.name}</SelectItem>)
                                                    }
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="weight"
                                control={form.control}
                                render={({ field: { value, onChange, ...other } }) => (
                                    <FormItem>
                                        <FormLabel>Vazni</FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder="Vazni" value={value} onChange={v => onChange(+v.target.value)} {...other} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="gender"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Jinsi</FormLabel>
                                        <FormControl>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Jinsi" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {
                                                        GENDERS.map(g => <SelectItem key={g.value} value={g.value}>{g.name}</SelectItem>)
                                                    }
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="breed"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Zoti</FormLabel>
                                        <FormControl>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Zoti" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {
                                                        BREED.map(g => <SelectItem key={g.value} value={g.value}>{g.name}</SelectItem>)
                                                    }
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="birthDate"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem className="flex flex-col pt-1.5 gap-1">
                                        <FormLabel>Tugilgan sanasi</FormLabel>
                                        <FormControl>
                                            <DatePicker field={field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="arrivalDate"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem className="flex flex-col pt-1.5 gap-1">
                                        <FormLabel>Keltirilgan sanasi</FormLabel>
                                        <FormControl>
                                            <DatePicker field={field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="col-span-1 md:col-span-2">Saqlash</Button>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </div>
    )
}
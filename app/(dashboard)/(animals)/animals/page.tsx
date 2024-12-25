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
import type { Color, Animal, AnimalType, Gender, Breed } from "~/lib/type"
import { Dialog, DialogContent, DialogHeader } from "~/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import { colorsControllerFindAll, animalTypesControllerFindAll, animalsControllerFindAll, animalsControllerCreate, animalsControllerRemove, animalsControllerUpdate } from '~/lib/api'
import { Card, CardContent } from "~/components/ui/card"

export default function Animals() {
    const COLUMNS = [
        { title: 'Nomi', key: 'name' },
        { title: 'Tug\'ilgan kuni', key: 'birthDate', sorting: 'byBirthDate', render(item: Animal) {
            return new Date(item.birthDate!).toLocaleDateString()
        } },
        { title: 'Turi', key: 'type', sorting: 'byTypeId', render(item: Animal) {
            return item.type?.name
        } },
        { title: 'Rangi', key: 'color', sorting: 'byColorId', render(item: Animal) {
            return item.color?.name
        } },
        { title: 'Vazni', key: 'weight' },
        { title: 'Fermer', key: 'farmer', render(item: Animal) {
            return item.farmer?.user?.firstName + ' ' + item.farmer?.user?.lastName
        } },
        { title: 'Id Kodi', key: 'idCode' },
        { title: 'Manzili', key: 'address' },
        { title: 'Jinsi', key: 'gender', sorting: 'byGender', render(item: Animal) {
            return GENDERS.find(g => g.value === item.gender)?.name
        } },
        { title: 'Zoti', key: 'breed', sorting: 'byBreed', render(item: Animal) {
            return BREED.find(b => b.value === item.breed)?.name
        } },
        { title: 'Keltirilgan kuni', key: 'arrivalDate', render(item: Animal) {
            return new Date(item.arrivalDate!).toLocaleDateString()
        } },
        { title: 'Boshqarish', key: 'actions', render(item: Animal) {
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

    const { userData } = useAuthData()
    const [filters, setFilters] = useState({
        typeId: null as number | null,
        colorId: null as number | null,
        gender: null as Gender | null,
        breed: null as Breed | null,
    })
    const [dialog, setDialog] = useState(false)
    const [loading, setLoading] = useState(true)
    const [totalItems, setTotalItems] = useState(0)
    const [items, setItems] = useState<Animal[]>([])
    const [itemId, setItemId] = useState<number | null>(null)
    const [animalColors, setAnimalColors] = useState<Color[]>([])
    const [animalTypes, setAnimalTypes] = useState<AnimalType[]>([])

    const formSchema = z.object({
        name: z.string(),
        weight: z.number(),
        idCode: z.string(),
        typeId: z.number(),
        birthDate: z.date(),
        colorId: z.number(),
        arrivalDate: z.date(),
        farmerId: z.number().nullable(),
        breed: z.enum(["MEAT", "MILK"]),
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
        } as any,
    })

    useEffect(() => {
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
        form.setValue('birthDate', new Date(item.birthDate))
        form.setValue('arrivalDate', new Date(item.arrivalDate))
    }

    function handleClose() {
        form.reset()
        setItemId(null)
        setDialog(false)
    }

    return (
        <div>
            <Card className="rounded-md shadow-none mb-4">
                <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 p-2">
                    <Select value={filters.typeId?String(filters.typeId):""} onValueChange={e => setFilters({...filters, typeId: +e})}>
                        <SelectTrigger>
                            <SelectValue placeholder="Tur bo'yicha saralash" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value={null as any}>Barchasi</SelectItem>
                            {
                                animalTypes.map(d => <SelectItem key={d.id} value={String(d.id)}>{d.name}</SelectItem>)
                            }
                        </SelectContent>
                    </Select>
                    <Select value={filters.gender?filters.gender:""} onValueChange={e => setFilters({...filters, gender: e as any})}>
                        <SelectTrigger>
                            <SelectValue placeholder="Jinsi bo'yicha saralash" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value={null as any}>Barchasi</SelectItem>
                            {
                                GENDERS.map(g => <SelectItem key={g.value} value={g.value}>{g.name}</SelectItem>)
                            }
                        </SelectContent>
                    </Select>
                    <Select value={filters.breed?filters.breed:""} onValueChange={e => setFilters({...filters, breed: e as any})}>
                        <SelectTrigger>
                            <SelectValue placeholder="Zoti bo'yicha saralash" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value={null as any}>Barchasi</SelectItem>
                            {
                                BREED.map(b => <SelectItem key={b.value} value={b.value}>{b.name}</SelectItem>)
                            }
                        </SelectContent>
                    </Select>
                    <Select value={filters.colorId?String(filters.colorId):""} onValueChange={e => setFilters({...filters, colorId: +e})}>
                        <SelectTrigger>
                            <SelectValue placeholder="Rangi bo'yicha saralash" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value={null as any}>Barchasi</SelectItem>
                            {
                                animalColors.map(b => <SelectItem key={b.id} value={String(b.id)}>{b.name}</SelectItem>)
                            }
                        </SelectContent>
                    </Select>
                </CardContent>
            </Card>

            <DataTable
                loading={loading}
                columns={COLUMNS}
                filters={filters}
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
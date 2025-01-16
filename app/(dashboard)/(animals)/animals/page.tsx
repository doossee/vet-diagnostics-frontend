'use client'

import { z } from "zod"
import { useForm } from "react-hook-form"
import { useEffect, useState } from 'react'
import { GENDERS, BREED } from '~/constants'
import { ALERT_MESSAGES } from "~/constants"
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'
import { useQuery } from "@tanstack/react-query"
import { DataTable } from '~/components/data-table'
import { useAuthData } from '~/hooks/use-auth-data'
import { DialogTitle } from '@radix-ui/react-dialog'
import { zodResolver } from "@hookform/resolvers/zod"
import { DatePicker } from '~/components/date-picker'
import { FiltersWrapper } from '~/components/filters-wrapper'
import type { Animal, Gender, Breed, Farmer } from "~/lib/type"
import { Dialog, DialogContent, DialogHeader } from "~/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import { farmersControllerFindAll, colorsControllerFindAll, animalTypesControllerFindAll, animalsControllerFindAll, animalsControllerCreate, animalsControllerRemove, animalsControllerUpdate } from '~/lib/api'

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
        // { title: 'Fermer', key: 'farmer', render(item: Animal) {
        //     return item.farmer?.user?.firstName + ' ' + item.farmer?.user?.lastName
        // } },
        { title: 'Id Kodi', key: 'idCode' },
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

    const [filters, setFilters] = useState({
        typeId: null as number | null,
        colorId: null as number | null,
        gender: null as Gender | null,
        breed: null as Breed | null,
    })
    const { userData } = useAuthData()
    const [dialog, setDialog] = useState(false)
    const [loading, setLoading] = useState(true)
    const [totalItems, setTotalItems] = useState(0)
    const [items, setItems] = useState<Animal[]>([])
    const [farmers, setFarmers] = useState<Farmer[]>([])
    const [itemId, setItemId] = useState<number | null>(null)

    const formSchema = z.object({
        birthDate: z.date({ required_error: "Tug'ilgan vaqti kiritilishi shart", invalid_type_error: "Tug'ilgan vaqti kiritilishi shart" }),
        colorId: z.number({ required_error: 'Rang belgilanishi shart', invalid_type_error: 'Rang belgilanishi shart' }),
        arrivalDate: z.date({ required_error: 'Keltirilgan vaqti kiritilishi shart', invalid_type_error: 'Keltirilgan vaqti kiritilishi shart' }),
        farmerId: z.number().nullable(),
        breed: z.enum(["MEAT", "MILK"]),
        gender: z.enum(["MALE", "FEMALE"]),
        name: z.string().min(1, "Hayvon nomi kiritilishi shart"),
        typeId: z.number().min(1, "Hayvon turi kiritilishi shart"),
        weight: z.number().min(1, "Hayvon vazni kiritilishi shart"),
        idCode: z.string().min(1, "Hayvon id kodi kiritilishi shart"),
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

    async function handleGetFarmers() {
        try {
            const { data } = await farmersControllerFindAll({page:1, perPage: 1000})
            setFarmers(data as any)
        } catch (error) {
            console.log(error)
        }
    }

    const { data: colors } = useQuery({
        queryKey: ['animal-colors'],
        queryFn: () => colorsControllerFindAll({page: 1, perPage: 100})
    })
    
    const { data: types } = useQuery({
        queryKey: ['animal-types'],
        queryFn: () => animalTypesControllerFindAll({page: 1, perPage: 100})
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            if (itemId) {
                const { farmerId, ...others } = values
                const data: any = await animalsControllerUpdate(itemId, others as any)
                setItems(p => p.map(i => {
                    if(i.id === itemId) return data
                    return i
                }))
            } else {
                if(userData?.userRole === 'FARMER')
                    values.farmerId = userData?.userId!
    
                const data: any = await animalsControllerCreate({...values} as any)
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
            if(!confirm(ALERT_MESSAGES.DELETE_CONFIRM)) return
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
        form.setValue('farmerId', item.farmerId!)
        form.setValue('birthDate', new Date(item.birthDate))
        form.setValue('arrivalDate', new Date(item.arrivalDate))
    }

    function handleClose() {
        form.reset()
        setItemId(null)
        setDialog(false)
    }

    useEffect(() => {
        if(userData?.userRole !== "FARMER") {
            handleGetFarmers()
        }
    }, [])

    return (
        <div>
            <FiltersWrapper>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 mb-2">
                    <Select value={filters.typeId?String(filters.typeId):""} onValueChange={e => setFilters({...filters, typeId: +e})}>
                        <SelectTrigger className="bg-card">
                            <SelectValue placeholder="Tur bo'yicha saralash" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value={null as any}>Barchasi</SelectItem>
                            {
                                types?.data?.map(d => <SelectItem key={d.id} value={String(d.id)}>{d.name}</SelectItem>)
                            }
                        </SelectContent>
                    </Select>
                    <Select value={filters.gender?filters.gender:""} onValueChange={e => setFilters({...filters, gender: e as any})}>
                        <SelectTrigger className="bg-card">
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
                        <SelectTrigger className="bg-card">
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
                        <SelectTrigger className="bg-card">
                            <SelectValue placeholder="Rangi bo'yicha saralash" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value={null as any}>Barchasi</SelectItem>
                            {
                                colors?.data?.map(b => <SelectItem key={b.id} value={String(b.id)}>{b.name}</SelectItem>)
                            }
                        </SelectContent>
                    </Select>
                </div>
            </FiltersWrapper>

            <DataTable
                loading={loading}
                columns={COLUMNS}
                filters={filters}
                items={items as any}
                totalItems={totalItems}
                callback={handleGetItems}
                topSlot={<Button onClick={() => setDialog(true)} size={'default'} className="!mt-0 w-full sm:w-fit">Hayvon qo'shish</Button>}
            />

            <Dialog open={dialog} onOpenChange={handleClose}>
                <DialogContent className="bg-card overflow-auto max-h-screen md:max-h-[95vh] max-w-[650px]" aria-describedby={undefined}>
                    <DialogHeader>
                        <DialogTitle>{itemId? "Hayvonni o'zgartirish" : "Hayvon qo'shish"}</DialogTitle>
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
                                                        types?.data?.map(d => <SelectItem key={d.id} value={String(d.id)}>{d.name}</SelectItem>)
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
                                                        colors?.data?.map(d => <SelectItem key={d.id} value={String(d.id)}>{d.name}</SelectItem>)
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
                            
                            {userData?.userRole === 'ADMIN' ? <FormField
                                name="farmerId"
                                control={form.control}
                                render={({ field: { value, onChange, ...others } }) => (
                                    <FormItem>
                                        <FormLabel>Fermer</FormLabel>
                                        <FormControl>
                                            <Select value={value ? String(value) : ""} onValueChange={e => onChange(+e)} {...others}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Fermer" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {
                                                        farmers.map((v, i) => <SelectItem key={i} value={String(v.user?.id)}>{v.user?.firstName} {v.user.lastName}</SelectItem>)
                                                    }
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />: <span></span>}
                            <Button disabled={form.formState.isSubmitting} type="submit" className="w-full">{form.formState.isSubmitting?"Yuklanyapti...":"Saqlash"}</Button>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </div>
    )
}
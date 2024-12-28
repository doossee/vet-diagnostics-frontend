'use client'

import { z } from "zod"
import { GENDERS } from '~/constants'
import { useForm } from "react-hook-form"
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'
import { useAuthData } from "~/hooks/use-auth-data"
import { DataTable } from '~/components/data-table'
import { DialogTitle } from '@radix-ui/react-dialog'
import { zodResolver } from "@hookform/resolvers/zod"
import { DatePicker } from '~/components/date-picker'
import { useCallback, useEffect, useState } from 'react'
import { Card, CardContent } from "~/components/ui/card"
import { Dialog, DialogContent, DialogHeader } from "~/components/ui/dialog"
import type { District, User, Farmer, Veterinarian, Gender } from "~/lib/type"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import { veterinariansControllerFindAll, regionsControllerFindAll, farmersControllerCreate, districtsControllerFindAll, farmersControllerFindAll, farmersControllerRemove, farmersControllerUpdate, usersControllerUpdate } from '~/lib/api'

export default function Veterinarians() {
    const COLUMNS = [
        {
            title: 'Ism Familiyasi', key: 'name', sorting: 'firstName', render(item: Farmer) {
                return `${item.user?.firstName} ${item.user?.lastName}`
            }
        },
        { title: 'Telefoni', key: 'phone', render(item: Farmer) {
            return item.user?.phone
        } },
        { title: 'Manzili', key: 'address', render(item: Farmer) {
            return item.user?.address
        } },
        {
            title: 'Jinsi', key: 'gender', render(item: Farmer) {
                return GENDERS.find(g => g.value === item.user?.gender)?.name
            }
        },
        { title: 'Tug\'gilgan kuni', key: 'birthdate', render(item: Farmer) {
            return new Date(item.user?.birthDate!).toLocaleDateString()
        } },
        {
            title: 'Tuman nomi', key: 'district', render(item: Farmer) {
                return item.user?.district?.name
            }
        },
        {
            title: 'Boshqarish', key: 'actions', render(item: Farmer) {
                return (<div className="flex gap-2 items-center">
                    <Button onClick={() => handleEditItem(item.user)} size='sm'>
                        O'zgartirish
                    </Button>
                    <Button onClick={() => handleDelete(item.id)} size='sm'>
                        O'chirish
                    </Button>
                </div>)
            }
        },
    ]

    const [filters, setFilters] = useState({
        gender: null as Gender | null,
        birthDate: null as null | Date,
        regionId: null as null | number,
        districtId: null as null | number,
    })
    const { userData } = useAuthData()
    const [dialog, setDialog] = useState(false)
    const [loading, setLoading] = useState(true)
    const [totalItems, setTotalItems] = useState(0)
    const [items, setItems] = useState<Farmer[]>([])
    const [regions, setRegions] = useState<District[]>([])
    const [itemId, setItemId] = useState<number | null>(null)
    const [districts, setDistricts] = useState<District[]>([])
    const [regionId, setRegionId] = useState<number|null>(null)
    const [veterinarians, setVeterinarians] = useState<Veterinarian[]>([])

    const formSchema = z.object({
        phone: z.string().regex(/\+998\d{9}/, "Telefon to'g'ri formatda kiritilishi shart"),
        gender: z.string().min(1, "Jins tanlanishi shart"),
        address: z.string().optional(),
        birthDate: z.date(),
        password: z.string().min(1, "Ism kiritilishi shart"),
        lastName: z.string().min(1, "Ism kiritilishi shart"),
        firstName: z.string().min(1, "Ism kiritilishi shart"),
        districtId: z.number(),
        middleName: z.string().optional(),
        veterinarianId: z.number().nullable()
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            phone: "",
            address: "",
            lastName: "",
            password: "",
            firstName: "",
            gender: "MALE",
            middleName: "",
            birthDate: null,
            districtId: null,
        } as any,
    })

    async function handleGetDistrictsAndRegions(role: string) {
        try {
            const promises = [
                regionsControllerFindAll({page: 1, perPage: 1000}),
                districtsControllerFindAll({page: 1, perPage: 1000}),]
            if(role === 'ADMIN') promises.push(veterinariansControllerFindAll({page: 1, perPage: 1000}) as any)
            const [R, D, V]: any = await Promise.all(promises)
            setRegions(R.data)
            setDistricts(D.data)
            if(role === 'ADMIN') setVeterinarians(V.data)
        } catch (error) {
            console.log(error)
        }
    }

    async function onSubmit(values: z.infer<typeof formSchema>) {
        if(userData?.userRole === 'VETERINARIAN') form.setValue('veterinarianId', userData?.userId!)
        if (itemId) {
            const data: any = await usersControllerUpdate(itemId, values as any)
            setItems(p => p.map(i => {
                if(i.userId === itemId) return {...i, user: data}
                return i
            }))
        } else {
            const data: any = await farmersControllerCreate({...values} as any)
            setItems(p => [...p, data])
        }

        handleClose()
    }

    async function handleGetItems(params: any) {
        try {
            setLoading(true)
            const {data, meta} = await farmersControllerFindAll(params)
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
            await farmersControllerRemove(id)
            setItems(p => p.filter(i => i.id !== id))
        } catch (error) {
            console.log(error)
        }
    }

    function handleEditItem(item: User) {
        setDialog(true)
        setItemId(item.id)

        form.setValue('phone', item.phone)
        form.setValue('lastName', item.lastName)
        form.setValue('firstName', item.firstName)
        form.setValue('address', item.address || '')
        form.setValue('birthDate', item.birthDate!)
        form.setValue('gender', item.gender || 'MALE')
        form.setValue('districtId', item.districtId)
        form.setValue('middleName', item.middleName || '')
    }

    function handleClose() {
        form.reset()
        setItemId(null)
        setDialog(false)
    }

    const filteredDistricts = useCallback(() => {
        if(regionId) return districts.filter(d => d.regionId === regionId)
        else return []
    }, [regionId])

    useEffect(() => {
        handleGetDistrictsAndRegions(userData?.userRole!)
    }, [])

    return (
        <div>
            <Card className="rounded-md shadow-none mb-4">
                <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 p-2">
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
                    <Select value={filters.regionId ? String(filters.regionId) : ""} onValueChange={e => setFilters({...filters, regionId: +e})}>
                        <SelectTrigger>
                            <SelectValue placeholder="Viloyat bo'yicha saralash" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value={null as any}>Barchasi</SelectItem>
                            {
                                regions.map(r => <SelectItem key={r.id} value={String(r.id)}>{r.name}</SelectItem>)
                            }
                        </SelectContent>
                    </Select>
                    <Select value={filters.districtId ? String(filters.districtId) : ""} onValueChange={e => setFilters({...filters, districtId: +e})}>
                        <SelectTrigger>
                            <SelectValue placeholder="Tuman bo'yicha saralash" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value={null as any}>Barchasi</SelectItem>
                            {
                                districts.filter(d => d.regionId === filters.regionId).map(d => <SelectItem key={d.id} value={String(d.id)}>{d.name}</SelectItem>)
                            }
                        </SelectContent>
                    </Select>
                </CardContent>
            </Card>

            <DataTable
                filters={filters}
                loading={loading}
                columns={COLUMNS}
                items={items as any}
                totalItems={totalItems}
                callback={handleGetItems}
                topSlot={<Button onClick={() => setDialog(true)} size={'default'} className="w-full sm:w-fit">Fermer Qo'shish</Button>}
            />

            <Dialog open={dialog} onOpenChange={handleClose}>
                <DialogContent className="overflow-auto max-h-screen md:max-h-[95vh] max-w-[650px]" aria-describedby={undefined}>
                    <DialogHeader>
                        <DialogTitle>Fermer Qo'shish</DialogTitle>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                name="firstName"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Ism</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Ism" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="lastName"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Familiya</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Familiya" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="middleName"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Otasining ismi</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Otasining ismi" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="address"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Yashash manzili</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Yashash manzili" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="phone"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem className="flex flex-col gap-1 pt-1.5">
                                        <FormLabel>Telefon raqami</FormLabel>
                                        <FormControl>
                                            <Input placeholder="+998 00 000 00 00" {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="password"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Parol</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Parol" {...field} />
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
                                name="birthDate"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem className="flex flex-col pt-1.5 gap-1">
                                        <FormLabel>Tug'ilgan sanasi</FormLabel>
                                        <FormControl>
                                            <DatePicker field={field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="grid gap-2 pt-2">
                                <FormLabel>Viloyat</FormLabel>
                                <FormControl>
                                    <Select value={String(regionId)} onValueChange={e => setRegionId(+e)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Viloyat" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {
                                                regions.map(r => <SelectItem key={r.id} value={String(r.id)}>{r.name}</SelectItem>)
                                            }
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                            </div>
                            <FormField
                                name="districtId"
                                control={form.control}
                                render={({ field: { value, onChange, ...others } }) => (
                                    <FormItem>
                                        <FormLabel>Tuman</FormLabel>
                                        <FormControl>
                                            <Select value={value ? String(value) : ""} onValueChange={e => onChange(+e)} {...others}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Tuman" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {
                                                        filteredDistricts().map(d => <SelectItem key={d.id} value={String(d.id)}>{d.name}</SelectItem>)
                                                    }
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {userData?.userRole === 'ADMIN' && <FormField
                                name="veterinarianId"
                                control={form.control}
                                render={({ field: { value, onChange, ...others } }) => (
                                    <FormItem>
                                        <FormLabel>Veterinar</FormLabel>
                                        <FormControl>
                                            <Select value={value ? String(value) : ""} onValueChange={e => onChange(+e)} {...others}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Veterinar" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {
                                                        veterinarians.filter(v => form.getValues('districtId') ? v.user.districtId === form.getValues('districtId') : true).map((v, i) => <SelectItem key={i} value={String(v.user?.id)}>{v.user?.firstName} {v.user.lastName}</SelectItem>)
                                                    }
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />}
                            <Button type="submit" className="col-span-1 md:col-span-2">Saqlash</Button>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </div>
    )
}
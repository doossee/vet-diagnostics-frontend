'use client'

import { z } from "zod"
import { GENDERS } from '~/constants'
import { useForm } from "react-hook-form"
import { useEffect, useState } from 'react'
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'
import { DataTable } from '~/components/data-table'
import { DialogTitle } from '@radix-ui/react-dialog'
import { zodResolver } from "@hookform/resolvers/zod"
import { DatePicker } from '~/components/date-picker'
import type { District, User, Farmer } from "~/lib/type"
import { Dialog, DialogContent, DialogHeader } from "~/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import { farmersControllerCreate, districtsControllerFindAll, farmersControllerFindAll, farmersControllerRemove, farmersControllerUpdate, usersControllerUpdate } from '~/lib/api'
import { useAuthData } from "~/hooks/use-auth-data"

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

    
    const { userData } = useAuthData()
    const [dialog, setDialog] = useState(false)
    const [loading, setLoading] = useState(true)
    const [totalItems, setTotalItems] = useState(0)
    const [items, setItems] = useState<Farmer[]>([])
    const [itemId, setItemId] = useState<number | null>(null)
    const [districts, setDistricts] = useState<District[]>([])

    const formSchema = z.object({
        phone: z.string(),
        gender: z.string(),
        address: z.string(),
        lastName: z.string(),
        password: z.string(),
        firstName: z.string(),
        birthDate: z.date().nullable(),
        middleName: z.string().optional(),
        districtId: z.number().nullable(),
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
        },
    })

    useEffect(() => {
        form.setValue('veterinarianId', userData?.userId!)
        handleGetDistricts()
    }, [])

    async function handleGetDistricts() {
        try {
            const {data}: any = await districtsControllerFindAll({page: 1, perPage: 100})
            setDistricts(data)
        } catch (error) {
            console.log(error)
        }
    }

    async function onSubmit(values: z.infer<typeof formSchema>) {
        form.setValue('veterinarianId', userData?.userId!)
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

    return (
        <div>
            <DataTable
                loading={loading}
                columns={COLUMNS}
                items={items as any}
                totalItems={totalItems}
                callback={handleGetItems}
                topSlot={<Button onClick={() => setDialog(true)} size={'default'} className="w-full sm:w-fit">Fermer Qo'shish</Button>}
            />

            <Dialog open={dialog} onOpenChange={handleClose}>
                <DialogContent style={{ maxHeight: '95vh', maxWidth: 600, overflow: 'auto' }} aria-describedby={undefined}>
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
                            <FormField
                                name="districtId"
                                control={form.control}
                                render={({ field: { value, onChange, ...others } }) => (
                                    <FormItem>
                                        <FormLabel>Tuman nomi</FormLabel>
                                        <FormControl>
                                            <Select value={value ? String(value) : ""} onValueChange={e => onChange(+e)} {...others}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Tuman nomi" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {
                                                        districts.map(d => <SelectItem key={d.id} value={String(d.id)}>{d.name}</SelectItem>)
                                                    }
                                                </SelectContent>
                                            </Select>
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
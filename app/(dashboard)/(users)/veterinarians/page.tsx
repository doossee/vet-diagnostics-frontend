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
import type { District, User, Veterinarian } from "~/lib/type"
import { Dialog, DialogContent, DialogHeader } from "~/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import { districtsControllerFindAll, veterinariansControllerFindAll, veterinariansControllerCreate, veterinariansControllerRemove, usersControllerUpdate } from '~/lib/api'

export default function Veterinarians() {
    const COLUMNS = [
        { title: 'Ism Familiyasi', key: 'name', sorting: 'firstName', render(item: Veterinarian) {
            return `${item.user?.firstName} ${item.user?.lastName}`
        }  },
        { title: 'Telefoni', key: 'phone', render(item: Veterinarian) {
            return item.user?.phone
        }  },
        { title: 'Manzili', key: 'address', render(item: Veterinarian) {
            return item.user?.address
        }  },
        { title: 'Jinsi', key: 'gender', render(item: Veterinarian) {
            return GENDERS.find(g => g.value === item.user?.gender)?.name
        } },
        { title: 'Tug\'gilgan kuni', key: 'birthdate', render(item: Veterinarian) {
            return new Date(item.user?.birthDate!).toDateString()
        }  },
        {
            title: 'Tuman nomi', key: 'district', render(item: Veterinarian) {
                return item.user?.district?.name
            }
        },
        {
            title: 'Boshqarish', key: 'actions', render(item: Veterinarian) {
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

    const [dialog, setDialog] = useState(false)
    const [loading, setLoading] = useState(true)
    const [totalItems, setTotalItems] = useState(0)
    const [items, setItems] = useState<Veterinarian[]>([])
    const [itemId, setItemId] = useState<number | null>(null)
    const [districts, setDistricts] = useState<District[]>([])

    const formSchema = z.object({
        phone: z.string(),
        gender: z.string(),
        address: z.string(),
        birthDate: z.date(),
        password: z.string(),
        lastName: z.string(),
        firstName: z.string(),
        districtId: z.number(),
        middleName: z.string().optional(),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            phone: "",
            address: "",
            lastName: "",
            password: "",
            firstName: "",
            middleName: "",
            gender: "MALE",
            birthDate: null,
            districtId: null,
        } as any,
    })

    useEffect(() => {
        handleGetDistricts()
    }, [])

    async function handleGetDistricts() {
        try {
            const { data }: any = await districtsControllerFindAll({page: 1, perPage: 1000})
            setDistricts(data)
        } catch (error) {
            console.log(error)
        }
    }

    async function onSubmit(values: z.infer<typeof formSchema>) {
        if (itemId) {
            const data: any = await usersControllerUpdate(itemId, values as any)
            setItems(p => p.map(i => {
                if(i.id === itemId) return data
                return i
            }))
        } else {
            const data: any = await veterinariansControllerCreate({...values, role: 'VETERINARIAN'} as any)
            setItems(p => [...p, data])
        }

        handleClose()
    }

    async function handleGetItems(params: any) {
        try {
            setLoading(true)
            const { data, meta } = await veterinariansControllerFindAll(params)
            setItems(data as any)
            console.log(data);
            
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
            await veterinariansControllerRemove(id)
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
        form.setValue('address', item.address||'')
        form.setValue('gender', item.gender||'MALE')
        form.setValue('districtId', item.districtId)
        form.setValue('middleName', item.middleName||'')
        form.setValue('birthDate', new Date(item.birthDate!))
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
                topSlot={<Button onClick={() => setDialog(true)} size={'default'} className="w-full sm:w-fit">Veterinar Qo'shish</Button>}
            />

            <Dialog open={dialog} onOpenChange={handleClose}>
                <DialogContent style={{ maxHeight: '95vh', maxWidth: 600, overflow: 'auto' }} aria-describedby={undefined}>
                    <DialogHeader>
                        <DialogTitle>Veterinar Qo'shish</DialogTitle>
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
                                    <FormItem className="flex flex-col gap-1 pt-1.5">
                                        <FormLabel>Parol</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="Parol yarating" {...field} />
                                        </FormControl>
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
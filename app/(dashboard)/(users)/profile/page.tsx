'use client'

import { z } from "zod"
import { Loader } from 'lucide-react'
import { GENDERS } from '~/constants'
import type { User } from "~/lib/type"
import { useForm } from "react-hook-form"
import { useEffect, useState } from 'react'
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'
import { useAuthData } from "~/hooks/use-auth-data"
import { Separator } from "~/components/ui/separator"
import { zodResolver } from "@hookform/resolvers/zod"
import { DatePicker } from '~/components/date-picker'
import { usersControllerUpdate, usersControllerFindOne } from '~/lib/api'
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import { cn } from "~/lib/utils"

export default function Veterinarians() {
    const { userData } = useAuthData()
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState<User|null>(null)

    const formSchema = z.object({
        phone: z.string().min(8, "Telefon to'g'ri formatda kiritilishi shart"),
        gender: z.string().min(1, "Jins tanlanishi shart"),
        address: z.string().optional(),
        birthDate: z.date(),
        password: z.string().optional(),
        lastName: z.string().min(1, "Familiya kiritilishi shart"),
        firstName: z.string().min(1, "Ism kiritilishi shart"),
        middleName: z.string().optional(),
        confirmPassword: z.string().optional(),
    })
    .superRefine((data, ctx) => {
        if (data.password !== data.confirmPassword) {
            ctx.addIssue({
                path: ["confirmPassword"],
                message: "Parollar bir xil bo'lishi kerak",
                code: "custom",
            });
        }
    })
    .transform(({ confirmPassword, ...rest }) => rest);

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
            confirmPassword: "",
        } as any,
    })

    async function getUser(id: number) {
        try {
            setLoading(true)
            const data = await usersControllerFindOne(id)
            setUser(data as any)

            form.setValue('phone', data.phone||'')
            form.setValue('address', data.address||'')
            form.setValue('lastName', data.lastName||'')
            form.setValue('gender', data.gender||'MALE')
            form.setValue('firstName', data.firstName||'')
            form.setValue('middleName', data.middleName||'')
            data.birthDate&&form.setValue('birthDate', new Date(data.birthDate))
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const { password, ...others } = values
            if(password?.trim()) (others as any).password = password
                
            await usersControllerUpdate(user?.id!, others as any)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        userData?.userId && getUser(userData.userId)
    }, [])

    return (
        <div>
            <Card className="shadow-none rounded-lg">
                <CardHeader className="pl-4">
                    <CardTitle className="flex items-center gap-2">Malumotlarni o'zgartirish {loading&&<Loader className="animate-spin size-4" />}</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className={cn("grid grid-cols-1 md:grid-cols-2 gap-4", loading && "opacity-50")}>
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

                            <Separator className="col-span-1 md:col-span-2" />
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
                                name={"confirmPassword" as any}
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem className="flex flex-col gap-1 pt-1.5">
                                        <FormLabel>Parolni takrorlang</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="Parolni takrorlang" {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <Button disabled={loading||form.formState.isSubmitting} type="submit" className="w-full">{form.formState.isSubmitting ? "Yuklanyapti..." : "Saqlash"}</Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}
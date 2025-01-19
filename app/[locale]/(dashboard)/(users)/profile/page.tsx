'use client'

import { z } from "zod"
import { cn } from "~/lib/utils"
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
import { useLocale, useTranslations } from "next-intl"
import { usersControllerUpdate, usersControllerFindOne } from '~/lib/api'
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'

export default function Veterinarians() {
    const t = useTranslations()
    const locale = useLocale() as 'uz' | 'ru'

    const { userData } = useAuthData()
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState<User|null>(null)

    const formSchema = z.object({
        phone: z.string().min(8, t('required.phoneRequired')),
        gender: z.string().min(1, t('required.genderRequired')),
        address: z.string().optional(),
        birthDate: z.date({ required_error: t('required.birthDateRequired'), invalid_type_error: t('required.birthDateRequired') }),
        password: z.string().optional(),
        lastName: z.string().min(1, t("required.lastNameRequired")),
        firstName: z.string().min(1, t("required.firstNameRequired")),
        middleName: z.string().optional(),
        confirmPassword: z.string().optional(),
    })
    .superRefine((data, ctx) => {
        if (data.password !== data.confirmPassword) {
            ctx.addIssue({
                path: ["confirmPassword"],
                message: t("required.passwordRequired"),
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
                    <CardTitle className="flex items-center gap-2">{t('users.changeUserData')} {loading&&<Loader className="animate-spin size-4" />}</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className={cn("grid grid-cols-1 md:grid-cols-2 gap-4", loading && "opacity-50")}>
                            <FormField
                                name="firstName"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t('users.firstName')}</FormLabel>
                                        <FormControl>
                                            <Input placeholder={t('users.firstName')} {...field} />
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
                                        <FormLabel>{t('users.lastName')}</FormLabel>
                                        <FormControl>
                                            <Input placeholder={t('users.lastName')} {...field} />
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
                                        <FormLabel>{t('users.middleName')}</FormLabel>
                                        <FormControl>
                                            <Input placeholder={t('users.middleName')} {...field} />
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
                                        <FormLabel>{t('form.address')}</FormLabel>
                                        <FormControl>
                                            <Input placeholder={t('form.address')} {...field} />
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
                                        <FormLabel>{t('form.phone')}</FormLabel>
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
                                        <FormLabel>{t('form.gender')}</FormLabel>
                                        <FormControl>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder={t('form.gender')} />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {
                                                        GENDERS.map(g => <SelectItem key={g.value} value={g.value}>{g[locale]}</SelectItem>)
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
                                        <FormLabel>{t('form.birthDate')}</FormLabel>
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
                                        <FormLabel>{t('form.password')}</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder={t('form.password')} {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name={"confirmPassword" as any}
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem className="flex flex-col gap-1 pt-1.5">
                                        <FormLabel>{t('form.confirmPassword')}</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder={t('form.confirmPassword')} {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <Button disabled={form.formState.isSubmitting} type="submit" className="w-full">{t(form.formState.isSubmitting?"form.submiting":"form.submit")}</Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}
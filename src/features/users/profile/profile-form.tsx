'use client'

import { useEffect } from "react"
import { cn } from "@/shared/lib/utils"
import { useForm } from "react-hook-form"
import { userValues } from '../user.model'
import { GENDERS } from '@/shared/constants'
import { useI18n } from "@/shared/hooks/use-i18n"
import { Input } from '@/shared/components/ui/input'
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from '@/shared/components/ui/button'
import { Separator } from '@/shared/components/ui/separator'
import { DatePicker } from '@/shared/components/date-picker'
import { ProfileSchema, createProfileSchema, } from './profile.model'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/select'

interface UserFormProps {
    loading: boolean
    defaultValues?: ProfileSchema
    onSubmit: (values: ProfileSchema) => void
}

function mergeDefaultValues(profile: Partial<ProfileSchema> | undefined): ProfileSchema {
    return {
        phone: profile?.phone ?? userValues.phone,
        gender: profile?.gender ?? userValues.gender,
        address: profile?.address ?? userValues.address,
        lastName: profile?.lastName ?? userValues.lastName,
        password: profile?.password ?? userValues.password,
        firstName: profile?.firstName ?? userValues.firstName,
        middleName: profile?.middleName ?? userValues.middleName,
        birthDate: profile?.birthDate ? new Date(profile.birthDate) : userValues.birthDate as any,
    }
}

export function ProfileForm({ onSubmit, loading, defaultValues }: UserFormProps) {
    const { t, locale } = useI18n()
    
    const form = useForm<ProfileSchema>({
        resolver: zodResolver(createProfileSchema(t)),
        defaultValues: mergeDefaultValues(defaultValues),
    })

    useEffect(() => {
        if (defaultValues) {
            form.reset(mergeDefaultValues(defaultValues))
        }
    }, [defaultValues, form])

    return (
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
    )
}
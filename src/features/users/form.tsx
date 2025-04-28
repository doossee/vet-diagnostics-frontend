'use client';

import { useForm } from "react-hook-form"
import { GENDERS } from '@/shared/constants'
import { useCallback, useEffect } from 'react'
import { useI18n } from "@/shared/hooks/use-i18n"
import { Input } from '@/shared/components/ui/input'
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from '@/shared/components/ui/button'
import { Region, District, User } from '@/shared/types'
import { Separator } from '@/shared/components/ui/separator'
import { DatePicker } from '@/shared/components/date-picker'
import { UserSchema, createUserSchema, userValues } from './user.model'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/select'

interface UserFormProps {
    regions: Region[]
    districts: District[]
    veterinarians?: User[]
    itemId?: number | null
    regionId?: number | null
    defaultValues?: UserSchema
    showVeterinarians?: boolean
    setRegionId: (p: any) => any
    onSubmit: (values: UserSchema) => void
}

export function UserForm({ onSubmit, setRegionId, regions, regionId, showVeterinarians, veterinarians, districts, itemId, defaultValues }: UserFormProps) {
    const { t, locale } = useI18n()

    const form = useForm<UserSchema>({
        resolver: zodResolver(createUserSchema(t, itemId!)),
        defaultValues: defaultValues ? {...defaultValues, birthDate: new Date(defaultValues.birthDate)} : userValues as any,
    })

    const districtId = form.watch('districtId')

    const vets = useCallback(() => {
        return veterinarians?.filter(v => v.districtId === form.watch('districtId'))
    }, [districtId, veterinarians])

    useEffect(() => {
        const _length = veterinarians?.filter(v => v.districtId === form.watch('districtId'))?.length || 0
        if(_length === 0) {
            form.setValue('veterinarianId', null as any)
        }
    }, [districtId, veterinarians])

    return (<Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <div className="grid gap-2 pt-1">
                <FormLabel>{t('form.regionName')}</FormLabel>
                <FormControl>
                    <Select value={String(regionId)} onValueChange={e => setRegionId(+e)}>
                        <SelectTrigger>
                            <SelectValue placeholder={t('form.regionName')} />
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
                        <FormLabel>{t('form.districtName')}</FormLabel>
                        <FormControl>
                            <Select value={value ? String(value) : ""} onValueChange={e => onChange(+e)} {...others}>
                                <SelectTrigger>
                                    <SelectValue placeholder={t('form.districtName')} />
                                </SelectTrigger>
                                <SelectContent>
                                    {
                                        districts?.map(d => <SelectItem key={d.id} value={String(d.id)}>{d.name}</SelectItem>)
                                    }
                                </SelectContent>
                            </Select>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            {showVeterinarians && <FormField
                name="veterinarianId"
                control={form.control}
                render={({ field: { value, onChange, ...others } }) => (
                    <FormItem>
                        <FormLabel>{t('form.veterinarian')}</FormLabel>
                        <FormControl>
                            <Select value={value ? String(value) : ""} onValueChange={e => onChange(+e)} {...others}>
                                <SelectTrigger>
                                    <SelectValue placeholder={t('form.veterinarian')} />
                                </SelectTrigger>
                                <SelectContent>
                                    {
                                        vets()?.map((v, i) =>
                                            <SelectItem key={i} value={String(v.id)}>{v.firstName} {v.lastName}</SelectItem>)
                                    }
                                </SelectContent>
                            </Select>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />}

            <Separator className="col-span-1 md:col-span-2" />
            <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                    <FormItem className="flex flex-col gap-1 pt-1.5">
                        <FormLabel>{t('form.password')}</FormLabel>
                        <FormControl>
                            <Input required={itemId===null} type="password" placeholder={t('form.password')} {...field} />
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
                            <Input required={itemId===null} type="password" placeholder={t('form.confirmPassword')} {...field} />
                        </FormControl>
                    </FormItem>
                )}
            />
            <Button disabled={form.formState.isSubmitting} type="submit" className="w-full">{t(form.formState.isSubmitting?"form.submiting":"form.submit")}</Button>
        </form>
    </Form>)
}
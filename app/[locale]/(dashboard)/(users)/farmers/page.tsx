'use client'

import { z } from "zod"
import { GENDERS } from '~/constants'
import { useForm } from "react-hook-form"
import { ALERT_MESSAGES } from "~/constants"
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'
import { useQuery } from "@tanstack/react-query"
import { useAuthData } from "~/hooks/use-auth-data"
import { DataTable } from '~/components/data-table'
import { DialogTitle } from '@radix-ui/react-dialog'
import { Separator } from "~/components/ui/separator"
import { zodResolver } from "@hookform/resolvers/zod"
import { DatePicker } from '~/components/date-picker'
import { useLocale, useTranslations } from "next-intl"
import { useCallback, useEffect, useState } from 'react'
import { FiltersWrapper } from '~/components/filters-wrapper'
import type { Farmer, Veterinarian, Gender } from "~/lib/type"
import { Dialog, DialogContent, DialogHeader } from "~/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import { veterinariansControllerFindAll, regionsControllerFindAll, farmersControllerCreate, districtsControllerFindAll, farmersControllerFindAll, farmersControllerRemove, usersControllerUpdate } from '~/lib/api'

export default function Veterinarians() {
    const t = useTranslations()
    const locale = useLocale() as 'uz' | 'ru'

    const COLUMNS: any = [
        { title: t('form.name'), key: 'name', sorting: 'firstName', render(item: Farmer) {
            return `${item.user?.firstName} ${item.user?.lastName}`
        } },
        { title: t('form.phone'), key: 'phone', render(item: Farmer) {
            return item.user?.phone
        } },
        { title: t('form.address'), key: 'address', render(item: Farmer) {
            return item.user?.address
        } },
        { title: t('form.gender'), key: 'gender', render(item: Farmer) {
            return GENDERS.find(g => g.value === item.user?.gender)?.[locale]
        } },
        { title: t('form.birthDate'), key: 'birthdate', render(item: Farmer) {
            return new Date(item.user?.birthDate!).toLocaleDateString()
        } },
        { title: t('form.districtName'), key: 'district', render(item: Farmer) {
            return item.user?.district?.name
        } },
        { title: t('table.actions'), key: 'actions', render(item: Farmer) {
            return (<div className="flex gap-2 items-center">
                <Button onClick={() => handleEditItem(item)} size='sm'>
                    {t('table.edit')}
                </Button>
                <Button onClick={() => handleDelete(item.userPtrId)} size='sm'>
                    {t('table.delete')}
                </Button>
            </div>)
        } },
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
    const [itemId, setItemId] = useState<number | null>(null)
    const [regionId, setRegionId] = useState<number|null>(null)
    const [veterinarians, setVeterinarians] = useState<Veterinarian[]>([])

    const formSchema = z.object({
        phone: z.string().min(8, t('required.phoneRequired')),
        gender: z.string().min(1, t('required.genderRequired')),
        address: z.string().optional(),
        birthDate: z.date({ required_error: t('required.birthDateRequired'), invalid_type_error: t('required.birthDateRequired') }),
        password: z.string().optional(),
        lastName: z.string().min(1, t("required.lastNameRequired")),
        firstName: z.string().min(1, t("required.firstNameRequired")),
        districtId: z.number({ required_error: t("required.districtRequired"), invalid_type_error: t("required.districtRequired") }),
        middleName: z.string().optional(),
        veterinarianId: z.number().nullable(),
        confirmPassword: z.string().optional(),
    })
    .superRefine((data, ctx) => {
        if (!itemId) {
          if (!data.password?.trim()) {
            ctx.addIssue({
              path: ["password"],
              message: t("required.passwordRequired"),
              code: "custom",
            });
          }
          if (data.password !== data.confirmPassword) {
            ctx.addIssue({
              path: ["confirmPassword"],
              message: t("required.confirmPasswordRequired"),
              code: "custom",
            });
          }
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

    const { data: regions } = useQuery({
        queryKey: ['regions'],
        queryFn: () => regionsControllerFindAll({page: 1, perPage: 100}),
    })

    const { data: districts } = useQuery({
        queryKey: ['districts'],
        queryFn: () => districtsControllerFindAll({page: 1, perPage: 100}),
    })

    async function handleGetVeterinarians() {
        try {
            const { data } = await veterinariansControllerFindAll({page: 1, perPage: 1000})
            setVeterinarians(data as any)
        } catch (error) {
            console.log(error)
        }
    }

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            if (itemId) {
                const { password, veterinarianId, ...others } = values
                if(password?.trim()) (others as any).password = password
                
                const data: any = await usersControllerUpdate(itemId, others as any)
                setItems(p => p.map(i => {
                    if(i.userPtrId === itemId) return {...i, user: data}
                    return i
                }))
            } else {
                if (userData?.userRole === 'VETERINARIAN')
                    values.veterinarianId = userData?.userId!
        
                const data: any = await farmersControllerCreate({...values} as any)
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
            if(!confirm(ALERT_MESSAGES.DELETE_CONFIRM[locale])) return
            await farmersControllerRemove(id)
            setItems(p => p.filter(i => i.userPtrId !== id))
        } catch (error) {
            console.log(error)
        }
    }

    function handleEditItem(item: Farmer) {
        setDialog(true)
        setItemId(item.userPtrId)
        handleSetRegionId(item.user.districtId)

        form.setValue('phone', item.user.phone)
        form.setValue('lastName', item.user.lastName)
        form.setValue('firstName', item.user.firstName)
        form.setValue('address', item.user?.address || '')
        form.setValue('districtId', item.user?.districtId)
        form.setValue('gender', item.user?.gender || 'MALE')
        form.setValue('veterinarianId', item.veterinarianId)
        form.setValue('middleName', item.user?.middleName || '')
        form.setValue('birthDate', new Date(item.user?.birthDate!))
    }

    function handleSetRegionId(id: number) {
        const d = districts?.data?.find(_ => _.id === id)
        if(!d) return
        setRegionId(d.regionId)
    }

    function handleClose() {
        form.reset()
        setItemId(null)
        setDialog(false)
    }

    const filteredDistricts = useCallback(() => {
        if(regionId) return districts?.data?.filter(d => d.regionId === regionId)
        else return []
    }, [regionId])

    useEffect(() => {
        if(userData?.userRole === "ADMIN") {
            handleGetVeterinarians()
        }
    }, [])

    return (
        <div>
            <FiltersWrapper>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mb-2">
                    <Select value={filters.gender?filters.gender:""} onValueChange={e => setFilters({...filters, gender: e as any})}>
                        <SelectTrigger className="bg-card">
                            <SelectValue placeholder={t('filters.byGender')} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value={null as any}>{t('filters.all')}</SelectItem>
                            {
                                GENDERS.map(g => <SelectItem key={g.value} value={g.value}>{g[locale]}</SelectItem>)
                            }
                        </SelectContent>
                    </Select>
                    <Select value={filters.regionId ? String(filters.regionId) : ""} onValueChange={e => setFilters({...filters, regionId: +e})}>
                        <SelectTrigger className="bg-card">
                            <SelectValue placeholder={t('filters.byRegion')} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value={null as any}>{t('filters.all')}</SelectItem>
                            {
                                regions?.data?.map(r => <SelectItem key={r.id} value={String(r.id)}>{r.name}</SelectItem>)
                            }
                        </SelectContent>
                    </Select>
                    <Select value={filters.districtId ? String(filters.districtId) : ""} onValueChange={e => setFilters({...filters, districtId: +e})}>
                        <SelectTrigger className="bg-card">
                            <SelectValue placeholder={t('filters.byDistrict')} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value={null as any}>{t('filters.all')}</SelectItem>
                            {
                                districts?.data?.filter(d => d.regionId === filters.regionId).map(d => <SelectItem key={d.id} value={String(d.id)}>{d.name}</SelectItem>)
                            }
                        </SelectContent>
                    </Select>
                </div>
            </FiltersWrapper>

            <DataTable
                filters={filters}
                loading={loading}
                columns={COLUMNS}
                items={items as any}
                totalItems={totalItems}
                callback={handleGetItems}
                topSlot={<Button onClick={() => setDialog(true)} size={'default'} className="!mt-0 w-full sm:w-fit">{t('users.createFarmer')}</Button>}
            />

            <Dialog open={dialog} onOpenChange={handleClose}>
                <DialogContent className="overflow-auto max-h-screen md:max-h-[95vh] max-w-[650px]" aria-describedby={undefined}>
                    <DialogHeader>
                        <DialogTitle>{t(itemId?'users.editFarmer':'users.createFarmer')}</DialogTitle>
                    </DialogHeader>
                    <Form {...form}>
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
                            <div className="grid gap-2 pt-2">
                                <FormLabel>{t('form.regionName')}</FormLabel>
                                <FormControl>
                                    <Select value={String(regionId)} onValueChange={e => setRegionId(+e)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder={t('form.regionName')} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {
                                                regions?.data?.map(r => <SelectItem key={r.id} value={String(r.id)}>{r.name}</SelectItem>)
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
                                                        filteredDistricts()?.map(d => <SelectItem key={d.id} value={String(d.id)}>{d.name}</SelectItem>)
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
                                        <FormLabel>{t('form.veterinarian')}</FormLabel>
                                        <FormControl>
                                            <Select value={value ? String(value) : ""} onValueChange={e => onChange(+e)} {...others}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder={t('form.veterinarian')} />
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
                    </Form>
                </DialogContent>
            </Dialog>
        </div>
    )
}
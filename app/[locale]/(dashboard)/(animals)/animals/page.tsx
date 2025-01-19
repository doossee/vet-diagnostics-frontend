'use client'

import { z } from "zod"
import { useForm } from "react-hook-form"
import { useEffect, useState } from 'react'
import { useLocale, useTranslations } from "next-intl"
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
    const t = useTranslations()
    const locale = useLocale() as 'uz' | 'ru'

    const COLUMNS = [
        { title: t("animals.name"), key: 'name' },
        { title: t("form.birthDate"), key: 'birthDate', sorting: 'byBirthDate', render(item: Animal) {
            return new Date(item.birthDate!).toLocaleDateString()
        } },
        { title: t("form.type"), key: 'type', sorting: 'byTypeId', render(item: Animal) {
            return item.type?.name
        } },
        { title: t("form.color"), key: 'color', sorting: 'byColorId', render(item: Animal) {
            return item.color?.name
        } },
        { title: t("animals.weight"), key: 'weight' },
        { title: t("animals.idCode"), key: 'idCode' },
        { title: t("form.gender"), key: 'gender', sorting: 'byGender', render(item: Animal) {
            return GENDERS.find(g => g.value === item.gender)?.[locale]
        } },
        { title: t("animals.breed"), key: 'breed', sorting: 'byBreed', render(item: Animal) {
            return BREED.find(b => b.value === item.breed)?.[locale]
        } },
        { title: t("animals.arrivalDate"), key: 'arrivalDate', render(item: Animal) {
            return new Date(item.arrivalDate!).toLocaleDateString()
        } },
        { title: t('table.actions'), key: 'actions', render(item: Animal) {
            return (<div className="flex gap-2 items-center">
                <Button onClick={() => handleEditItem(item)} size='sm'>
                    {t('table.edit')}
                </Button>
                <Button onClick={() => handleDelete(item.id)} size='sm'>
                    {t('table.delete')}
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
        birthDate: z.date({ required_error: t('required.birthDateRequired'), invalid_type_error: t('required.birthDateRequired') }),
        colorId: z.number({ required_error: t('required.colorRequired'), invalid_type_error: t('required.colorRequired') }),
        arrivalDate: z.date({ required_error: t("required.arrivalDateRequired"), invalid_type_error: t("required.arrivalDateRequired") }),
        farmerId: z.number().nullable(),
        breed: z.enum(["MEAT", "MILK"], { required_error: t("required.breedRequired"), invalid_type_error: t("required.breedRequired") }),
        gender: z.enum(["MALE", "FEMALE"], { required_error: t("required.genderRequired"), invalid_type_error: t("required.genderRequired") }),
        name: z.string().min(1, t("required.animalNameRequired")),
        typeId: z.number().min(1, t("required.animalTypeRequired")),
        weight: z.number().min(1, t("required.weightRequired")),
        idCode: z.string().min(1, t("required.idCodeRequired")),
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
            if(!confirm(ALERT_MESSAGES.DELETE_CONFIRM[locale])) return
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
                            <SelectValue placeholder={t('filters.byType')} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value={null as any}>{t('filters.all')}</SelectItem>
                            {
                                types?.data?.map(d => <SelectItem key={d.id} value={String(d.id)}>{d.name}</SelectItem>)
                            }
                        </SelectContent>
                    </Select>
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
                    <Select value={filters.breed?filters.breed:""} onValueChange={e => setFilters({...filters, breed: e as any})}>
                        <SelectTrigger className="bg-card">
                            <SelectValue placeholder={t('filters.byBreed')} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value={null as any}>{t('filters.all')}</SelectItem>
                            {
                                BREED.map(b => <SelectItem key={b.value} value={b.value}>{b[locale]}</SelectItem>)
                            }
                        </SelectContent>
                    </Select>
                    <Select value={filters.colorId?String(filters.colorId):""} onValueChange={e => setFilters({...filters, colorId: +e})}>
                        <SelectTrigger className="bg-card">
                            <SelectValue placeholder={t('filters.byColor')} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value={null as any}>{t('filters.all')}</SelectItem>
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
                topSlot={<Button onClick={() => setDialog(true)} size={'default'} className="!mt-0 w-full sm:w-fit">{t('animals.createButton')}</Button>}
            />

            <Dialog open={dialog} onOpenChange={handleClose}>
                <DialogContent className="bg-card overflow-auto max-h-screen md:max-h-[95vh] max-w-[650px]" aria-describedby={undefined}>
                    <DialogHeader>
                        <DialogTitle>{t(itemId? "animals.editAnimal":"animals.createAnimal")}</DialogTitle>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                name="name"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t('animals.name')}</FormLabel>
                                        <FormControl>
                                            <Input placeholder={t('animals.name')} {...field} />
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
                                        <FormLabel>{t('animals.idCode')}</FormLabel>
                                        <FormControl>
                                            <Input placeholder={t('animals.idCode')} {...field} />
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
                                        <FormLabel>{t('form.type')}</FormLabel>
                                        <FormControl>
                                            <Select value={value?String(value):""} onValueChange={e => onChange(+e)} {...others}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder={t('form.type')} />
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
                                        <FormLabel>{t('form.color')}</FormLabel>
                                        <FormControl>
                                            <Select value={value?String(value):""} onValueChange={e => onChange(+e)} {...others}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder={t('form.color')} />
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
                                        <FormLabel>{t('animals.weight')}</FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder={t('animals.weight')} value={value} onChange={v => onChange(+v.target.value)} {...other} />
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
                                name="breed"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t('animals.breed')}</FormLabel>
                                        <FormControl>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder={t('animals.breed')} />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {
                                                        BREED.map(g => <SelectItem key={g.value} value={g.value}>{g[locale]}</SelectItem>)
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
                            <FormField
                                name="arrivalDate"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem className="flex flex-col pt-1.5 gap-1">
                                        <FormLabel>{t('animals.arrivalDate')}</FormLabel>
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
                                        <FormLabel>{t('form.farmer')}</FormLabel>
                                        <FormControl>
                                            <Select value={value ? String(value) : ""} onValueChange={e => onChange(+e)} {...others}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder={t('form.farmer')} />
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
                            <Button disabled={form.formState.isSubmitting} type="submit" className="w-full">{t(form.formState.isSubmitting?"form.submiting":"form.submit")}</Button>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </div>
    )
}
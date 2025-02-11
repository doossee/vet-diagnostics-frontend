'use client'

import { z } from "zod"
import { useState } from 'react'
import { useForm } from "react-hook-form"
import type { UrineTest } from "~/lib/type"
import { ALERT_MESSAGES } from "~/constants"
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'
import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from 'next/navigation'
import { DataTable } from '~/components/data-table'
import { DialogTitle } from '@radix-ui/react-dialog'
import { zodResolver } from "@hookform/resolvers/zod"
import { useLocale, useTranslations } from "next-intl"
import { useRouter, usePathname } from '~/i18n/routing'
import { SMELL_TYPES, CLARITY_TYPES } from '~/constants'
import { Dialog, DialogContent, DialogHeader } from "~/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import { animalsControllerFindAll, diseasesControllerFindAll, urineColorsControllerFindAll, animalsControllerFindOne, urineTestsControllerFindAll, urineTestsControllerCreate, urineTestsControllerRemove, urineTestsControllerUpdate } from '~/lib/api'

export default function UrineTests() {
    const router = useRouter()
    const t = useTranslations()
    const pathname = usePathname()
    const query = useSearchParams()
    const locale = useLocale() as 'ru' | 'uz'

    const newAnimal = query.get('new')
    const animalId = query.get('animalId') ? Number(query.get('animalId')) : null
    
    const COLUMNS = [
        { title: t("inspections.consistency"), key: 'consistency' },
        { title: t("inspections.smell"), key: 'smell', render(item: UrineTest) {
            return SMELL_TYPES[item.smell][locale]
        } },
        { title: t("inspections.clarity"), key: 'clarity', render(item: UrineTest) {
            return CLARITY_TYPES[item.clarity][locale]
        } },
        { title: t("form.color"), key: 'color', render(item: UrineTest) {
            return item.color?.name
        } },
        { title: t("form.animal"), key: 'animal', render(item: UrineTest) {
            return item.animal?.nameOrCode
        } },
        { title: t("form.disease"), key: 'disease', render(item: UrineTest) {
            return `${new Date(item.disease?.startTime!).toLocaleDateString()}-${new Date(item.disease?.endTime!).toLocaleDateString()}`
        } },
        { title: t("table.actions"), key: 'actions', render(item: UrineTest) {
            return (<div className="flex gap-2 items-center">
                <Button onClick={() => handleEditItem(item)} size='sm'>
                    {t("table.edit")}
                </Button>
                <Button onClick={() => handleDelete(item.id)} size='sm'>
                    {t("table.delete")}
                </Button>
            </div>)
        } },
    ]

    const [loading, setLoading] = useState(true)
    const [totalItems, setTotalItems] = useState(0)
    const [dialog, setDialog] = useState(!!newAnimal)
    const [items, setItems] = useState<UrineTest[]>([])
    const [itemId, setItemId] = useState<number | null>(null)
    
    const formSchema = z.object({
        clarity: z.enum(["CLEAR", "NOT_CLEAR"], { required_error: t("required.clarityRequired"), invalid_type_error: t("required.clarityRequired") }),
        smell: z.enum(["PUNGENT", "WEAK", "HAS", "NO"], { required_error: t("required.smellRequired"), invalid_type_error: t("required.smellRequired") }),
        consistency: z.coerce.number().min(1, t("required.consistencyGreetThan0")),
        colorId: z.number({ required_error: t("required.colorRequired"), invalid_type_error: t("required.colorRequired") }),
        animalId: z.number({ required_error: t("required.animalRequired"), invalid_type_error: t("required.animalRequired") }),
        diseaseId: z.number({ required_error: t("required.diseaseRequired"), invalid_type_error: t("required.diseaseRequired") }),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            animalId,
            smell: "NO",
            colorId: null,
            consistency: 0,
            diseaseId: null,
            clarity: "CLEAR",
        } as any,
    })

    const { data: animals }: any = useQuery({
        queryKey: ['animals'],
        queryFn: async () => {
            if(animalId) {
                const data = await animalsControllerFindOne(animalId)
                return { data: [data] }
            } else {
                const data = await animalsControllerFindAll({page: 1, perPage: 100})
                return data
            }
        } 
    })

    const { data: diseases } = useQuery({
        queryKey: ['diseases'],
        queryFn: () => diseasesControllerFindAll ({page: 1, perPage: 100} as any),
    })

    const { data: colors } = useQuery({
        queryKey: ['urine-colors'],
        queryFn: () => urineColorsControllerFindAll({page: 1, perPage: 100}),
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            if (itemId) {
                const data: any = await urineTestsControllerUpdate(itemId, values as any)
                setItems(p => p.map(i => {
                    if(i.id === itemId) return data
                    return i
                }))
            } else {
                const data: any = await urineTestsControllerCreate(values as any)
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
            const {data, meta} = await urineTestsControllerFindAll( animalId ? {...params } : params )
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
            await urineTestsControllerRemove(id)
            setItems(p => p.filter(i => i.id !== id))
        } catch (error) {
            console.log(error)
        }
    }

    function handleEditItem(item: UrineTest) {
        setDialog(true)
        setItemId(item.id)

        form.setValue('smell', item.smell)
        form.setValue('clarity', item.clarity)
        form.setValue('colorId', item.colorId)
        form.setValue('animalId', item.animalId!)
        form.setValue('diseaseId', item.diseaseId!)
        form.setValue('consistency', item.consistency)
    }

    function handleClose() {
        form.reset()
        setItemId(null)
        setDialog(false)
        newAnimal && router.push(pathname + ( animalId ? '?animalId='+animalId : ''))
    }

    return (
        <div>
            <DataTable
                loading={loading}
                columns={COLUMNS}
                items={items as any}
                totalItems={totalItems}
                callback={handleGetItems}
                topSlot={<Button onClick={() => setDialog(true)} size={'default'} className="!mt-0 w-full sm:w-fit">{t("inspections.createUrineTest")}</Button>} />

            <Dialog open={dialog} onOpenChange={handleClose}>
                <DialogContent className="overflow-auto max-h-screen md:max-h-[95vh] max-w-[500px]" aria-describedby={undefined}>
                    <DialogHeader>
                        <DialogTitle>{t(itemId?"inspections.editUrineTest":"inspections.createUrineTest")}</DialogTitle>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                name="consistency"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem className="flex flex-col gap-1 pt-1.5">
                                        <FormLabel>{t("inspections.consistency")}</FormLabel>
                                        <FormControl>
                                            <Input placeholder={t("inspections.consistency")} {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="smell"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t("inspections.smell")}</FormLabel>
                                        <FormControl>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder={t("inspections.smell")} />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {
                                                        Object.keys(SMELL_TYPES).map(k => <SelectItem key={k} value={k}>{SMELL_TYPES[k as keyof typeof SMELL_TYPES][locale]}</SelectItem>)
                                                    }
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />                    
                            <FormField
                                name="clarity"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t("inspections.clarity")}</FormLabel>
                                        <FormControl>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder={t("inspections.clarity")} />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {
                                                        Object.keys(CLARITY_TYPES).map(k => <SelectItem key={k} value={k}>{CLARITY_TYPES[k as keyof typeof CLARITY_TYPES][locale]}</SelectItem>)
                                                    }
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="diseaseId"
                                control={form.control}
                                render={({ field: { value, onChange, ...others } }) => (
                                    <FormItem>
                                        <FormLabel>{t("form.disease")}</FormLabel>
                                        <FormControl>
                                            <Select value={value ? String(value) : ""} onValueChange={e => onChange(+e)} {...others}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder={t("form.disease")} />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {
                                                        diseases?.data.map(d => <SelectItem key={d.id} value={String(d.id)}>{new Date(d.startTime).toLocaleDateString()}-{new Date(d.endTime).toLocaleDateString()}</SelectItem>)
                                                    }
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="animalId"
                                control={form.control}
                                render={({ field: { value, onChange, ...others } }) => (
                                    <FormItem>
                                        <FormLabel>{t("form.animal")}</FormLabel>
                                        <FormControl>
                                            <Select value={value ? String(value) : ""} onValueChange={e => onChange(+e)} {...others}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder={t("form.animal")} />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {
                                                        animals?.data?.map((d: any) => <SelectItem key={d.id} value={String(d.id)}>{d.nameOrCode}</SelectItem>)
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
                                        <FormLabel>{t("form.color")}</FormLabel>
                                        <FormControl>
                                            <Select value={value ? String(value) : ""} onValueChange={e => onChange(+e)} {...others}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder={t("form.color")} />
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
                            <Button disabled={form.formState.isSubmitting} type="submit" className="w-full">{t(form.formState.isSubmitting?"form.submiting":"form.submit")}</Button>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </div>
    )
}
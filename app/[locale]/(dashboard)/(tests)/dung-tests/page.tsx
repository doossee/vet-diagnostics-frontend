'use client'

import { z } from "zod"
import { useState } from 'react'
import { useForm } from "react-hook-form"
import type { DungTest } from "~/lib/type"
import { ALERT_MESSAGES } from "~/constants"
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'
import { useQuery } from "@tanstack/react-query"
import { DataTable } from '~/components/data-table'
import { DialogTitle } from '@radix-ui/react-dialog'
import { zodResolver } from "@hookform/resolvers/zod"
import { useLocale, useTranslations } from "next-intl"
import { SMELL_TYPES, DUNG_FORMS, CLARITY_TYPES } from '~/constants'
import { Dialog, DialogContent, DialogHeader } from "~/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import { animalsControllerFindAll, diseasesControllerFindAll, dungColorsControllerFindAll, dungTestsControllerCreate, dungTestsControllerFindAll, dungTestsControllerRemove, dungTestsControllerUpdate } from '~/lib/api'

export default function DungTests() {
    const t = useTranslations()
    const locale = useLocale() as 'uz' | 'ru'

    const COLUMNS = [
        { title: t("inspections.consistency"), key: 'consistency' },
        { title: t("inspections.worms"), key: 'worms' },
        { title: t("inspections.smell"), key: 'smell', render(item: DungTest) {
            return SMELL_TYPES[item.smell][locale]
        } },
        { title: t("inspections.clarity"), key: 'clarity', render(item: DungTest) {
            return CLARITY_TYPES[item.clarity][locale]
        } },
        { title: t("form.color"), key: 'color', render(item: DungTest) {
            return item.color?.name
        } },
        { title: t("inspections.form"), key: 'form', render(item: DungTest) {
            return DUNG_FORMS[item.form]?.[locale]
        } },
        { title: t("form.animal"), key: 'animal', render(item: DungTest) {
            return item.animal?.name
        } },
        { title: t("form.disease"), key: 'disease', render(item: DungTest) {
            return `${new Date(item.disease?.startTime!).toLocaleDateString()}-${new Date(item.disease?.endTime!).toLocaleDateString()}`
        } },
        { title: t("table.actions"), key: 'actions', render(item: DungTest) {
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

    const [dialog, setDialog] = useState(false)
    const [loading, setLoading] = useState(true)
    const [totalItems, setTotalItems] = useState(0)
    const [items, setItems] = useState<DungTest[]>([])
    const [itemId, setItemId] = useState<number | null>(null)
    
    const formSchema = z.object({
        colorId: z.number({ required_error: t("required.colorRequired"), invalid_type_error: t("required.colorRequired") }),
        animalId: z.number({ required_error: t("required.animalRequired"), invalid_type_error: t("required.animalRequired") }),
        diseaseId: z.number({ required_error: t("required.diseaseRequired"), invalid_type_error: t("required.diseaseRequired") }),
        clarity: z.enum(["CLEAR", "NOT_CLEAR"], { required_error: t("required.clarityRequired"), invalid_type_error: t("required.clarityRequired") }),
        smell: z.enum(["PUNGENT", "WEAK", "HAS", "NO"], { required_error: t("required.smellRequired"), invalid_type_error: t("required.smellRequired") }),
        form: z.enum(["NORMAL", "SOLID", "LIQUID", "MEDIUM"], { required_error: t("required.formRequired"), invalid_type_error: t("required.formRequired") }),
        worms: z.coerce.number().min(1, t("required.wormsGreetThan0")),
        consistency: z.coerce.number().min(1, t("required.consistencyGreetThan0")),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            worms: 0,
            smell: "NO",
            colorId: null,
            consistency: 0,
            animalId: null,
            form: "LIQUID",
            diseaseId: null,
            clarity: "CLEAR",
        } as any,
    })

    const { data: animals }: any = useQuery({
        queryKey: ['animals'],
        queryFn: () => animalsControllerFindAll({page: 1, perPage: 100}),
    })

    const { data: diseases } = useQuery({
        queryKey: ['diseases'],
        queryFn: () => diseasesControllerFindAll({page: 1, perPage: 100} as any),
    })

    const { data: colors } = useQuery({
        queryKey: ['dung-colors'],
        queryFn: () => dungColorsControllerFindAll({page: 1, perPage: 100}),
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            if (itemId) {
                const data: any = await dungTestsControllerUpdate(itemId, values as any)
                setItems(p => p.map(i => {
                    if(i.id === itemId) return data
                    return i
                }))
            } else {
                const data: any = await dungTestsControllerCreate(values as any)
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
            const {data, meta} = await dungTestsControllerFindAll(params)
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
            await dungTestsControllerRemove(id)
            setItems(p => p.filter(i => i.id !== id))
        } catch (error) {
            console.log(error)
        }
    }

    function handleEditItem(item: DungTest) {
        setDialog(true)
        setItemId(item.id)

        form.setValue('form', item.form)
        form.setValue('worms', item.worms)
        form.setValue('smell', item.smell)
        form.setValue('clarity', item.clarity)
        form.setValue('colorId', item.colorId!)
        form.setValue('animalId', item.animalId!)
        form.setValue('diseaseId', item.diseaseId!)
        form.setValue('consistency', item.consistency)
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
                topSlot={<Button onClick={() => setDialog(true)} size={'default'} className="!mt-0 w-full sm:w-fit">{t("inspections.createDungTest")}</Button>} />

            <Dialog open={dialog} onOpenChange={handleClose}>
                <DialogContent className="overflow-auto max-h-screen md:max-h-[95vh] max-w-[500px]" aria-describedby={undefined}>
                    <DialogHeader>
                        <DialogTitle>{t(itemId?"inspections.editDungTest":"inspections.createDungTest")}</DialogTitle>
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
                                            <Input type="number" placeholder={t("inspections.consistency")} {...field} />
                                        </FormControl>
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
                                name="worms"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem className="flex flex-col gap-1 pt-1.5">
                                        <FormLabel>{t("inspections.worms")}</FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder={t("inspections.worms")} {...field} />
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
                                                        Object.keys(SMELL_TYPES).map((k,i) => <SelectItem key={i} value={k}>{SMELL_TYPES[k as keyof typeof SMELL_TYPES][locale]}</SelectItem>)
                                                    }
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="form"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t("inspections.form")}</FormLabel>
                                        <FormControl>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder={t("inspections.form")} />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {
                                                        Object.keys(DUNG_FORMS).map((k,i) => <SelectItem key={i} value={k}>{DUNG_FORMS[k as keyof typeof DUNG_FORMS][locale]}</SelectItem>)
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
                                                        diseases?.data?.map(d => <SelectItem key={d.id} value={String(d.id)}>{new Date(d.startTime).toLocaleDateString()}-{new Date(d.endTime).toLocaleDateString()}</SelectItem>)
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
                                                        animals?.data?.map((d: any) => <SelectItem key={d.id} value={String(d.id)}>{d.name}</SelectItem>)
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
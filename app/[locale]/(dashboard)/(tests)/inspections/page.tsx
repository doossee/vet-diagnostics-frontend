'use client'

import { z } from "zod"
import { useState } from 'react'
import { useForm } from "react-hook-form"
import type { Inspection } from "~/lib/type"
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'
import { useQuery } from "@tanstack/react-query"
import { DataTable } from '~/components/data-table'
import { Textarea } from "~/components/ui/textarea"
import { DialogTitle } from '@radix-ui/react-dialog'
import { zodResolver } from "@hookform/resolvers/zod"
import { useLocale, useTranslations } from "next-intl"
import { ALERT_MESSAGES, INSPECTION_TYPES } from "~/constants"
import { Dialog, DialogContent, DialogHeader } from "~/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form'
import { animalsControllerFindAll, inspectionsControllerFindAll, inspectionsControllerCreate, inspectionsControllerRemove, inspectionsControllerUpdate } from '~/lib/api'

export default function Inspections() {
    const t = useTranslations()
    const locale = useLocale() as 'uz' | 'ru'

    const COLUMNS = [
        { title: t("inspections.pulse"), key: 'pulse' },
        { title: t("inspections.rumination"), key: 'rumination' },
        { title: t("inspections.temperature"), key: 'temperature' },
        { title: t("inspections.respiratoryRate"), key: 'respiratoryRate' },
        { title: t("inspections.inspectionType"), key: 'type', render(item: any) {
            return INSPECTION_TYPES[item.type as keyof typeof INSPECTION_TYPES][locale]
        } },
        { title: t("table.actions"), key: 'actions', render(item: Inspection) {
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
    const [items, setItems] = useState<Inspection[]>([])
    const [itemId, setItemId] = useState<number | null>(null)

    const formSchema = z.object({
        animalId: z.number({ required_error: t("required.animalRequired"), invalid_type_error: t("required.animalRequired") }),
        conclusion: z.string().optional(),
        type: z.enum(["EVENING", "MORNING", "DISEASE", "GENERAL"], { required_error: t("required.inspectionTypeRequired"), invalid_type_error: t("required.inspectionTypeRequired") }),
        pulse: z.coerce.number().min(1, t("required.pulseGreetThan0")),
        temperature: z.coerce.number().min(1, t("required.temperatureThan0")),
        rumination: z.coerce.number().min(1, t("required.ruminationGreetThan0")),
        respiratoryRate: z.coerce.number().min(1, t("required.respiratoryRateGreetThan0")),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            pulse: 0,
            rumination: 0,
            temperature: 0,
            animalId: null,
            type: "MORNING",
            respiratoryRate: 0,
        } as any,
    })

    const { data: animals }: any = useQuery({
        queryKey: ['animals'],
        queryFn: () => animalsControllerFindAll({page: 1, perPage: 100}),
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            if (itemId) {
                const data: any = await inspectionsControllerUpdate(itemId, values as any)
                setItems(p => p.map(i => {
                    if(i.id === itemId) return data
                    return i
                }))
            } else {
                const data: any = await inspectionsControllerCreate(values as any)
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
            const {data, meta} = await inspectionsControllerFindAll(params)

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
            await inspectionsControllerRemove(id)
            setItems(p => p.filter(i => i.id !== id))
        } catch (error) {
            console.log(error)
        }
    }

    function handleEditItem(item: Inspection) {
        setDialog(true)
        setItemId(item.id)

        form.setValue('pulse', item.pulse!)
        form.setValue('type', item.type as any)
        form.setValue('animalId', item.animalId!)
        form.setValue('rumination', item.rumination!)
        form.setValue('temperature', item.temperature!)
        form.setValue('conclusion', item.conclusion||'')
        form.setValue('respiratoryRate', item.respiratoryRate!)
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
                topSlot={<Button onClick={() => setDialog(true)} size={'default'} className="!mt-0 w-full sm:w-fit">{t("inspections.createInspection")}</Button>} />

            <Dialog open={dialog} onOpenChange={handleClose}>
                <DialogContent className="overflow-auto max-h-screen md:max-h-[95vh] max-w-[500px]" aria-describedby={undefined}>
                    <DialogHeader>
                        <DialogTitle>{t(itemId?"inspections.editInspection":"inspections.createInspection")}</DialogTitle>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                name="pulse"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem className="flex flex-col gap-1 pt-1.5">
                                        <FormLabel>{t("inspections.pulse")}</FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder={t("inspections.pulse")} {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="rumination"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem className="flex flex-col gap-1 pt-1.5">
                                        <FormLabel>{t("inspections.rumination")}</FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder={t("inspections.rumination")} {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="temperature"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem className="flex flex-col gap-1 pt-1.5">
                                        <FormLabel>{t("inspections.temperature")}</FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder={t("inspections.temperature")} {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="respiratoryRate"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem className="flex flex-col gap-1 pt-1.5">
                                        <FormLabel>{t("inspections.respiratoryRate")}</FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder={t("inspections.respiratoryRate")} {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="type"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t("inspections.inspectionType")}</FormLabel>
                                        <FormControl>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder={t("inspections.inspectionType")} />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {
                                                        Object.keys(INSPECTION_TYPES).map(k => <SelectItem disabled={k === "GENERAL" || k === "DISEASE"} key={k} value={k}>{INSPECTION_TYPES[k as keyof typeof INSPECTION_TYPES][locale]}</SelectItem>)
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
                                                        animals?.data?.map((a: any) => <SelectItem key={a.id} value={String(a.id)}>{a.name}</SelectItem>)
                                                    }
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="conclusion"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t("inspections.conclusion")}</FormLabel>
                                        <FormControl>
                                            <Textarea rows={6} className="resize-none" placeholder={t("inspections.conclusion")} {...field} />
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
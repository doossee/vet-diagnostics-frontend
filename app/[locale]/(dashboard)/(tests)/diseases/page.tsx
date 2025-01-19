'use client'

import { z } from "zod"
import { useState } from 'react'
import { useForm } from "react-hook-form"
import type { Disease } from "~/lib/type"
import { useLocale, useTranslations } from "next-intl"
import { ALERT_MESSAGES } from "~/constants"
import { Input } from "~/components/ui/input"
import { Button } from '~/components/ui/button'
import { useQuery } from "@tanstack/react-query"
import { DataTable } from '~/components/data-table'
import { Textarea } from "~/components/ui/textarea"
import { DialogTitle } from '@radix-ui/react-dialog'
import { zodResolver } from "@hookform/resolvers/zod"
import { DatePicker } from "~/components/date-picker"
import { Dialog, DialogContent, DialogHeader } from "~/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form'
import { animalsControllerFindAll, diseaseTypesControllerFindAll, inspectionsControllerCreate, diseasesControllerCreate, diseasesControllerRemove, diseasesControllerUpdate, diseasesControllerFindAll } from '~/lib/api'

export default function Diseases() {
    const t = useTranslations()
    const locale = useLocale() as 'uz' | 'ru'

    const formSchema = z.object({
        endTime: z.date({ required_error: t("required.endTimeRequired"), invalid_type_error: t("required.endTimeRequired") }),
        typeId: z.number({ required_error: t("required.diseaseTypeRequired"), invalid_type_error: t("required.diseaseTypeRequired") }),
        startTime: z.date({ required_error: t("required.startTimeRequired"), invalid_type_error: t("required.startTimeRequired") }),
        animalId: z.number({ required_error: t("required.animalRequired"), invalid_type_error: t("required.animalRequired") }),
        conclusion: z.string(),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            typeId: null,
            endTime: null,
            animalId: null,
            conclusion: "",
            startTime: null,
        } as any,
    })

    const inspectionFormSchema = z.object({
        animalId: z.number({ required_error: t("required.animalRequired"), invalid_type_error: t("required.animalRequired") }),
        diseaseId: z.number().nullable(),
        conclusion: z.string().optional(),
        type: z.string().default("DISEASE"),
        pulse: z.coerce.number().min(1, t("required.pulseGreetThan0")),
        temperature: z.coerce.number().min(1, t("required.temperatureThan0")),
        rumination: z.coerce.number().min(1, t("required.ruminationGreetThan0")),
        respiratoryRate: z.coerce.number().min(1, t("required.respiratoryRateGreetThan0")),
    })

    const inspectionForm = useForm<z.infer<typeof inspectionFormSchema>>({
        resolver: zodResolver(inspectionFormSchema),
        defaultValues: {
            pulse: 0,
            rumination: 0,
            temperature: 0,
            animalId: null,
            type: "DISEASE",
            diseaseId: null,
            respiratoryRate: 0,
        } as any,
    })

    const COLUMNS = [
        { title: t("form.startDate"), key: 'startTime', render(item: Disease) {
            return new Date(item.startTime).toLocaleDateString()
        } },
        { title: t("form.endDate"), key: 'endTime', render(item: Disease) {
            return new Date(item.endTime).toLocaleDateString()
        } },
        { title: t("inspections.conclusion"), key: 'conclusion' },
        { title: t("form.animal"), key: 'animal', render(item: Disease) {
            return item.animal?.name
        } },
        { title: t("form.diseaseType"), key: 'type', render(item: Disease) {
            return item.type?.name
        } },
        { title: t("table.actions"), key: 'actions', render(item: Disease) {
            return (<div className="flex gap-2 items-center">
                <Button onClick={() => inspectionForm.setValue('diseaseId', item.id)} size='sm'>
                    {t("inspections.createInspection")}
                </Button>
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
    const [items, setItems] = useState<Disease[]>([])
    const [itemId, setItemId] = useState<number | null>(null)

    const { data: animals }: any = useQuery({
        queryKey: ['animals'],
        queryFn: () => animalsControllerFindAll({page: 1, perPage: 100}),
    })

    const { data: diseaseTypes } = useQuery({
        queryKey: ['disease-types'],
        queryFn: () => diseaseTypesControllerFindAll({page: 1, perPage: 100}),
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            if (itemId) {
                const data: any = await diseasesControllerUpdate(itemId, values as any)
                setItems(p => p.map(i => {
                    if(i.id === itemId) return data
                    return i
                }))
            } else {
                const data: any = await diseasesControllerCreate(values as any)
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
            const {data, meta} = await diseasesControllerFindAll({params})
            
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
            await diseasesControllerRemove(id)
            setItems(p => p.filter(i => i.id !== id))
        } catch (error) {
            console.log(error)
        }
    }

    async function handleCreateInspections(values: z.infer<typeof inspectionFormSchema>) {
        try {
            await inspectionsControllerCreate(values as any)
    
            handleCloseInspection()
        } catch (error) {
            console.log(error)            
        }
    }

    function handleEditItem(item: Disease) {
        setDialog(true)
        setItemId(item.id)

        form.setValue('typeId', item.typeId)
        form.setValue('animalId', item.animalId)
        form.setValue('conclusion', item.conclusion||'')
        form.setValue('endTime', new Date(item.endTime!))
        form.setValue('startTime', new Date(item.startTime!))
        form.trigger()
    }

    function handleClose() {
        form.reset()
        setItemId(null)
        setDialog(false)
    }

    function handleCloseInspection() {
        inspectionForm.reset()
    }

    return (
        <div>
            <DataTable
                loading={loading}
                columns={COLUMNS}
                items={items as any}
                totalItems={totalItems}
                callback={handleGetItems}
                topSlot={<Button onClick={() => setDialog(true)} size={'default'} className="!mt-0 w-full sm:w-fit">{t("inspections.createDisease")}</Button>} />

            <Dialog open={dialog} onOpenChange={handleClose}>
                <DialogContent className="overflow-auto max-h-screen md:max-h-[95vh] max-w-[500px]" aria-describedby={undefined}>
                    <DialogHeader>
                        <DialogTitle>{t(itemId?"inspections.editDisease":"inspections.createDisease")}</DialogTitle>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                name="startTime"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t("form.startDate")}</FormLabel>
                                        <FormControl>
                                            <DatePicker field={field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="endTime"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t("form.endDate")}</FormLabel>
                                        <FormControl>
                                            <DatePicker field={field} />
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
                                        <FormLabel>{t("form.diseaseType")}</FormLabel>
                                        <FormControl>
                                            <Select value={value ? String(value) : ""} onValueChange={e => onChange(+e)} {...others}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder={t("form.diseaseType")} />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {
                                                        diseaseTypes?.data?.map(d => <SelectItem key={d.id} value={String(d.id)}>{d.name}</SelectItem>)
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

            <Dialog open={inspectionForm.watch('diseaseId') !== null} onOpenChange={handleCloseInspection}>
                <DialogContent className="overflow-auto max-h-screen md:max-h-[95vh] max-w-[500px]" aria-describedby={undefined}>
                    <DialogHeader>
                        <DialogTitle>{t(itemId?"inspections.editInspection":"inspections.createInspection")}</DialogTitle>
                    </DialogHeader>
                    <Form {...inspectionForm}>
                        <form onSubmit={inspectionForm.handleSubmit(handleCreateInspections)} className="space-y-4">
                            <FormField
                                name="pulse"
                                control={inspectionForm.control}
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
                                control={inspectionForm.control}
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
                                control={inspectionForm.control}
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
                                control={inspectionForm.control}
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
                                name="animalId"
                                control={inspectionForm.control}
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
                                control={inspectionForm.control}
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

                            <Button disabled={inspectionForm.formState.isSubmitting} type="submit" className="w-full">{t(inspectionForm.formState.isSubmitting?"form.submiting":"form.submit")}</Button>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </div>
    )
}
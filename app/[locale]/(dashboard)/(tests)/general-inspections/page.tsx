'use client'

import { z } from "zod"
import { useState } from 'react'
import { useForm } from "react-hook-form"
import { ALERT_MESSAGES } from "~/constants"
import { Input } from "~/components/ui/input"
import { Divider } from "~/components/divider"
import { Button } from '~/components/ui/button'
import { useQuery } from "@tanstack/react-query"
import { DataTable } from '~/components/data-table'
import type { GeneralInspection } from "~/lib/type"
import { DialogTitle } from '@radix-ui/react-dialog'
import { zodResolver } from "@hookform/resolvers/zod"
import { useLocale, useTranslations } from "next-intl"
import { Dialog, DialogContent, DialogHeader } from "~/components/ui/dialog"
import { CUSTOMER_TYPES, OBESITY_TYPES, BODY_TYPES, BODY_STRUCTURES, POSITIONS } from '~/constants'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import { eyelidsControllerFindAll, leatherCoversControllerFindAll, animalsControllerFindAll, colorsControllerFindAll, generalInspectionControllerCreate, generalInspectionControllerFindAll, generalInspectionControllerRemove, generalInspectionControllerUpdate } from '~/lib/api'

export default function GeneralInspections() {
    const t = useTranslations()
    const locale = useLocale() as 'ru' | 'uz'

    const COLUMNS = [
        { title: t("inspections.obesity"), key: 'obesity', render(item: GeneralInspection) {
            return OBESITY_TYPES[item.obesity][locale]
        } },
        { title: t("inspections.bodyType"), key: 'bodyType', render(item: GeneralInspection) {
            return BODY_TYPES[item.bodyType][locale]
        } },
        { title: t("inspections.bodyStructure"), key: 'bodyStructure', render(item: GeneralInspection) {
            return BODY_STRUCTURES[item.bodyStructure][locale]
        } },
        { title: t("inspections.bodyPosition"), key: 'bodyPosition', render(item: GeneralInspection) {
            return POSITIONS[item.bodyPosition][locale]
        } },
        { title: t("inspections.customerType"), key: 'customerType', render(item: GeneralInspection) {
            return CUSTOMER_TYPES[item.character][locale]
        } },
        { title: t("form.color"), key: 'color', render(item: GeneralInspection) {
            return item.color?.name
        } },
        { title: t("form.animal"), key: 'animal', render(item: GeneralInspection) {
            return item.animal.nameOrCode
        } },
        {  title: t("table.actions"), key: 'actions', render(item: GeneralInspection) {
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
    const [itemId, setItemId] = useState<number | null>(null)
    const [items, setItems] = useState<GeneralInspection[]>([])

    const formSchema = z.object({
        colorId: z.number({ required_error: t("required.colorRequired"), invalid_type_error: t("required.colorRequired") }),
        animalId: z.number({ required_error: t("required.animalRequired"), invalid_type_error: t("required.animalRequired") }),
        eyelidId: z.number({ required_error: t("required.eyeLidRequired"), invalid_type_error: t("required.eyeLidRequired") }),
        leatherCoverId: z.number({ required_error: t("required.leatherCoverRequired"), invalid_type_error: t("required.leatherCoverRequired") }),
        character: z.enum(["MOBILE", "CALM"], { required_error: t("required.customerTypeRequired"), invalid_type_error: t("required.customerTypeRequired") }),
        bodyType: z.enum(["WEAK", "MEDIUM", "STRONG"], { required_error: t("required.bodyTypeRequired"), invalid_type_error: t("required.bodyTypeRequired") }),
        obesity: z.enum(["HIGH","MEDIUM","LOW","LEAN","CACHEXIA"], { required_error: t("required.obesityRequired"), invalid_type_error: t("required.obesityRequired") }),
        bodyPosition: z.enum(["NATURAL", "FORCED", "FORCED_STANDING", "FORCED_LYING", "FORCED_SITTING", "NON_THERAPEUTIC"], { required_error: t("required.bodyPositionRequired"), invalid_type_error: t("required.bodyPositionRequired") }),
        bodyStructure: z.enum(["COARSE", "SLIM", "DENSE", "WEAK"], { required_error: t("required.bodyStructureTypeRequired"), invalid_type_error: t("required.bodyStructureTypeRequired") }),
        pulse: z.coerce.number().min(1, t("required.pulseGreetThan0")),
        temperature: z.coerce.number().min(1, t("required.temperatureThan0")),
        rumination: z.coerce.number().min(1, t("required.ruminationGreetThan0")),
        respiratoryRate: z.coerce.number().min(1, t("required.respiratoryRateGreetThan0")),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            colorId: null,
            animalId: null,
            eyelidId: null,
            character: "CALM",
            bodyType: "MEDIUM",
            obesity: "CACHEXIA",
            leatherCoverId: null,
            bodyPosition: "NATURAL",
            bodyStructure: "COARSE",
            
            pulse: 0,
            rumination: 0,
            temperature: 0,
            respiratoryRate: 0,
        } as any,
    })

    const { data: animals }: any = useQuery({
        queryKey: ['animals'],
        queryFn: () => animalsControllerFindAll({page: 1, perPage: 100}),
    })

    const { data: colors } = useQuery({
        queryKey: ['colors'],
        queryFn: () => colorsControllerFindAll({page: 1, perPage: 100}),
    })

    const { data: eyeLids } = useQuery({
        queryKey: ['eye-lids'],
        queryFn: () => eyelidsControllerFindAll({page: 1, perPage: 100}),
    })

    const { data: leatherCovers } = useQuery({
        queryKey: ['leather-covers'],
        queryFn: () => leatherCoversControllerFindAll({page: 1, perPage: 100}),
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            if (itemId) {
                const data: any = await generalInspectionControllerUpdate(itemId, values as any)
                setItems(p => p.map(i => {
                    if(i.id === itemId) return data
                    return i
                }))
            } else {
                const data: any = await generalInspectionControllerCreate(values as any)
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
            const {data, meta} = await generalInspectionControllerFindAll(params)
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
            await generalInspectionControllerRemove(id)
            setItems(p => p.filter(i => i.id !== id))
        } catch (error) {
            console.log(error)
        }
    }

    function handleEditItem(item: GeneralInspection) {
        setDialog(true)
        setItemId(item.id)

        form.setValue('colorId', item.colorId!)
        form.setValue('obesity', item.obesity!)
        form.setValue('animalId', item.animalId!)
        form.setValue('eyelidId', item.eyelidId!)
        form.setValue('bodyType', item.bodyType!)
        form.setValue('character', item.character!)
        form.setValue('bodyStructure', item.bodyStructure!)
        form.setValue('leatherCoverId', item.leatherCoverId!)
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
                topSlot={<Button onClick={() => setDialog(true)} size={'default'} className="!mt-0 w-full sm:w-fit">{t("inspections.createGeneralInspections")}</Button>} />

            <Dialog open={dialog} onOpenChange={handleClose}>
                <DialogContent className="overflow-auto max-h-screen md:max-h-[95vh] max-w-[600px]" aria-describedby={undefined}>
                    <DialogHeader>
                        <DialogTitle>{t(itemId?"inspections.editGeneralInspections":"inspections.createGeneralInspections")}</DialogTitle>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            
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
                                name="leatherCoverId"
                                control={form.control}
                                render={({ field: { value, onChange, ...others } }) => (
                                    <FormItem>
                                        <FormLabel>{t("management.leatherCover")}</FormLabel>
                                        <FormControl>
                                            <Select value={value ? String(value) : ""} onValueChange={e => onChange(+e)} {...others}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder={t("management.leatherCover")} />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {
                                                        leatherCovers?.data?.map(d => <SelectItem key={d.id} value={String(d.id)}>{d.name}</SelectItem>)
                                                    }
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="eyelidId"
                                control={form.control}
                                render={({ field: { value, onChange, ...others } }) => (
                                    <FormItem>
                                        <FormLabel>{t("management.eyeLid")}</FormLabel>
                                        <FormControl>
                                            <Select value={value ? String(value) : ""} onValueChange={e => onChange(+e)} {...others}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder={t("management.eyeLid")} />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {
                                                        eyeLids?.data?.map(d => <SelectItem key={d.id} value={String(d.id)}>{d.name}</SelectItem>)
                                                    }
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            

                            <Divider label={t("inspections.habitus")} className="col-span-1 md:col-span-2" />

                            <FormField
                                name="obesity"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t("inspections.obesity")}</FormLabel>
                                        <FormControl>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder={t("inspections.obesity")} />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {
                                                        Object.keys(OBESITY_TYPES).map(k => <SelectItem key={k} value={k}>{OBESITY_TYPES[k as keyof typeof OBESITY_TYPES][locale]}</SelectItem>)
                                                    }
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="bodyType"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t("inspections.bodyType")}</FormLabel>
                                        <FormControl>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder={t("inspections.bodyType")} />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {
                                                        Object.keys(BODY_TYPES).map(k => <SelectItem key={k} value={k}>{BODY_TYPES[k as keyof typeof BODY_TYPES][locale]}</SelectItem>)
                                                    }
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="bodyPosition"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t("inspections.bodyPosition")}</FormLabel>
                                        <FormControl>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder={t("inspections.bodyPosition")} />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {
                                                        Object.keys(POSITIONS).map(k => <SelectItem key={k} value={k}>{POSITIONS[k as keyof typeof POSITIONS][locale]}</SelectItem>)
                                                    }
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="bodyStructure"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t("inspections.bodyStructure")}</FormLabel>
                                        <FormControl>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder={t("inspections.bodyStructure")} />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {
                                                        Object.keys(BODY_STRUCTURES).map(k => <SelectItem key={k} value={k}>{BODY_STRUCTURES[k as keyof typeof BODY_STRUCTURES][locale]}</SelectItem>)
                                                    }
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="character"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t("inspections.customerType")}</FormLabel>
                                        <FormControl>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder={t("inspections.customerType")} />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {
                                                        Object.keys(CUSTOMER_TYPES).map(k => <SelectItem key={k} value={k}>{CUSTOMER_TYPES[k as keyof typeof CUSTOMER_TYPES][locale]}</SelectItem>)
                                                    }
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Divider label={t("inspections.inspection")} className="col-span-1 md:col-span-2" />

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
                            <Button disabled={form.formState.isSubmitting} type="submit" className="w-full">{t(form.formState.isSubmitting?"form.submiting":"form.submit")}</Button>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </div>
    )
}
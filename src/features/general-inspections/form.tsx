import { useForm } from "react-hook-form"
import { useI18n } from "@/shared/hooks/use-i18n"
import { Input } from '@/shared/components/ui/input'
import { Divider } from '@/shared/components/divider'
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from '@/shared/components/ui/button'
import { Textarea } from "@/shared/components/ui/textarea"
import { Eyelid, LeatherCover, Color } from '@/shared/types'
import { AnimalSelect } from "@/shared/components/animal-select"
import { GeneralInspectionSchema, createGeneralInspectionSchema, generalInspectionValues } from './general-inspection.model'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/select'
import { BODY_STRUCTURES, BODY_TYPES, CUSTOMER_TYPES, OBESITY_TYPES, POSITIONS } from '@/shared/constants'

interface GeneralInspectionFormProps {
    eyeLids: Eyelid[]
    animalColors: Color[]
    leatherCovers: LeatherCover[]
    defaultValues?: GeneralInspectionSchema
    onSubmit: (values: GeneralInspectionSchema) => void
}

export function GeneralInspectionForm({ onSubmit, defaultValues, eyeLids, leatherCovers, animalColors }: GeneralInspectionFormProps) {
    const { t, locale } = useI18n()

    const form = useForm<GeneralInspectionSchema>({
        resolver: zodResolver(createGeneralInspectionSchema(t)) as any,
        defaultValues: defaultValues || generalInspectionValues as any,
    })

    return (<Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <AnimalSelect form={form} />
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
                                        animalColors.map(d => <SelectItem key={d.id} value={String(d.id)}>{d.name}</SelectItem>)
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
                                        leatherCovers.map(d => <SelectItem key={d.id} value={String(d.id)}>{d.name}</SelectItem>)
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
                                        eyeLids.map(d => <SelectItem key={d.id} value={String(d.id)}>{d.name}</SelectItem>)
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
            <FormField
                name="conclusion"
                control={form.control}
                render={({ field }) => (
                    <FormItem className="flex flex-col gap-1 pt-1.5 md:col-span-2">
                        <FormLabel>{t("inspections.conclusion")}</FormLabel>
                        <FormControl>
                            <Textarea className="resize-none" rows={6} placeholder={t("inspections.conclusion")} {...field} />
                        </FormControl>
                    </FormItem>
                )}
            />
            <Button disabled={form.formState.isSubmitting} type="submit" className="w-full">{t(form.formState.isSubmitting?"form.submiting":"form.submit")}</Button>
        </form>
    </Form>)
}
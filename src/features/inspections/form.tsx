import { useForm } from "react-hook-form"
import { useI18n } from "@/shared/hooks/use-i18n"
import { Input } from '@/shared/components/ui/input'
import { zodResolver } from "@hookform/resolvers/zod"
import { INSPECTION_TYPES } from '@/shared/constants'
import { Button } from '@/shared/components/ui/button'
import { Textarea } from "@/shared/components/ui/textarea"
import { AnimalSelect } from '@/shared/components/animal-select'
import { InspectionSchema, createInspectionSchema, inspectionValues } from './inspection.model'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/select'

interface InspectionFormProps {
    type: "DISEASE" | "MORNING"
    defaultValues?: InspectionSchema
    onSubmit: (values: InspectionSchema) => void
}

export function InspectionForm({ onSubmit, defaultValues, type }: InspectionFormProps) {
    const { t, locale } = useI18n()

    const form = useForm<InspectionSchema>({
        resolver: zodResolver(createInspectionSchema(t, type)) as any,
        defaultValues: defaultValues || inspectionValues as any,
    })

    return (<Form {...form}>
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
            { type === "MORNING" && <FormField
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
            /> }
            
            <AnimalSelect form={form} />

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
    </Form>)
}
import { useForm } from "react-hook-form"
import { DiseaseType } from '@/shared/types'
import { useI18n } from "@/shared/hooks/use-i18n"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from '@/shared/components/ui/button'
import { Textarea } from "@/shared/components/ui/textarea"
import { DatePicker } from '@/shared/components/date-picker'
import { AnimalSelect } from '@/shared/components/animal-select'
import { DiseaseSchema, createDiseaseSchema, diseaseValues } from './disease.model'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/select'

interface DiseaseFormProps {
    diseaseTypes: DiseaseType[]
    defaultValues?: DiseaseSchema
    onSubmit: (values: DiseaseSchema) => void
}

export function DiseaseForm({ onSubmit, defaultValues, diseaseTypes }: DiseaseFormProps) {
    const { t } = useI18n()

    const form = useForm<DiseaseSchema>({
        resolver: zodResolver(createDiseaseSchema(t)),
        defaultValues: defaultValues ? {
            ...defaultValues,
            endTime: new Date(defaultValues.endTime),
            startTime: new Date(defaultValues.startTime),
        } : diseaseValues as any,
    })

    return (<Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 h-full">
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
                                        diseaseTypes.map(d => <SelectItem key={d.id} value={String(d.id)}>{d.name}</SelectItem>)
                                    }
                                </SelectContent>
                            </Select>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

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
            <div className="flex-1" />
            <Button disabled={form.formState.isSubmitting} type="submit" className="w-full">{t(form.formState.isSubmitting?"form.submiting":"form.submit")}</Button>
        </form>
    </Form>)
}
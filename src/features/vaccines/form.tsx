import { useForm } from "react-hook-form"
import { VaccineType } from "@/shared/types"
import { useI18n } from "@/shared/hooks/use-i18n"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from '@/shared/components/ui/button'
import { DatePicker } from "@/shared/components/date-picker"
import { AnimalSelect } from "@/shared/components/animal-select"
import { VaccineSchema, createVaccineSchema, vaccineValues } from './vaccine.model'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/select'

interface VaccineFormProps {
    vaccineTypes: VaccineType[]
    defaultValues?: VaccineSchema
    onSubmit: (values: VaccineSchema) => void
}

export function VaccineForm({ onSubmit, defaultValues, vaccineTypes }: VaccineFormProps) {
    const { t } = useI18n()

    const form = useForm<VaccineSchema>({
        resolver: zodResolver(createVaccineSchema(t)),
        defaultValues: defaultValues ? {...defaultValues, date: new Date(defaultValues.date)} : vaccineValues as any,
    })

    return (<Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
                name="date"
                control={form.control}
                render={({ field }) => (
                    <FormItem className="flex flex-col pt-1.5 gap-1">
                        <FormLabel>{t("form.date")}</FormLabel>
                        <FormControl>
                            <DatePicker field={field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            
            <AnimalSelect form={form} />

            <FormField
                name="typeId"
                control={form.control}
                render={({ field: { value, onChange, ...others } }) => (
                    <FormItem>
                        <FormLabel>{t("management.vaccineType")}</FormLabel>
                        <FormControl>
                            <Select value={value ? String(value) : ""} onValueChange={e => onChange(+e)} {...others}>
                                <SelectTrigger>
                                    <SelectValue placeholder={t("management.vaccineType")} />
                                </SelectTrigger>
                                <SelectContent>
                                    {
                                        vaccineTypes.map(d => <SelectItem key={d.id} value={String(d.id)}>{d.name}</SelectItem>)
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
    </Form>)
}
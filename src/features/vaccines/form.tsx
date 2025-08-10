import clsx from "clsx"
import { useEffect } from "react"
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
    hideAnimals?: boolean
    defaultValues?: VaccineSchema
    onSubmit: (values: VaccineSchema) => void
    onSkip?: () => void
}

export function VaccineForm({ onSubmit, defaultValues, vaccineTypes, hideAnimals, onSkip }: VaccineFormProps) {
    const { t } = useI18n()

    const form = useForm<VaccineSchema>({
        resolver: zodResolver(createVaccineSchema(t)),
        defaultValues: defaultValues ? {...defaultValues, date: new Date(defaultValues.date)} : vaccineValues as any,
    })

    useEffect(() => {
        if(hideAnimals) form.setValue('animalId', 0)
    }, [hideAnimals])

    return (<Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 h-full">
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
            
            {!hideAnimals && <AnimalSelect form={form} />}

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
            <div className="flex-1" />
            <div className={clsx("grid gap-4", !!onSkip?'md:grid-cols-2':'')}>
                {!!onSkip && <Button onClick={onSkip} type="button" variant={"secondary"}>{t("form.skip")}</Button>}
                <Button disabled={form.formState.isSubmitting} type="submit">{t(form.formState.isSubmitting?"form.submiting":"form.submit")}</Button>
            </div>
        </form>
    </Form>)
}
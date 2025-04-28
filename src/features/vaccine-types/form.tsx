import { useForm } from "react-hook-form"
import { useI18n } from "@/shared/hooks/use-i18n"
import { Input } from '@/shared/components/ui/input'
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from '@/shared/components/ui/button'
import { VaccineTypeSchema, vaccineTypeValues, createVaccineTypeSchema } from './vaccine-type.model'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/components/ui/form'

interface VaccineTypeFormProps {
    defaultValues?: VaccineTypeSchema
    onSubmit: (values: VaccineTypeSchema) => void
}

export function VaccineTypeForm({ onSubmit, defaultValues }: VaccineTypeFormProps) {
    const { t } = useI18n()

    const form = useForm<VaccineTypeSchema>({
        resolver: zodResolver(createVaccineTypeSchema(t)),
        defaultValues: defaultValues || vaccineTypeValues,
    })

    return (<Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>{t("management.typeName")}</FormLabel>
                        <FormControl>
                            <Input placeholder={t("management.typeName")} {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <Button disabled={form.formState.isSubmitting} type="submit" className="w-full">{t(form.formState.isSubmitting?"form.submiting":"form.submit")}</Button>
        </form>
    </Form>)
}
import { useForm } from "react-hook-form"
import { useI18n } from "@/shared/hooks/use-i18n"
// import { Input } from '@/shared/components/ui/input'
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from '@/shared/components/ui/button'
import { Textarea } from '@/shared/components/ui/textarea'
import { UrineColorSchema, createUrineColorSchema, urineColorValues } from './urine-color'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/components/ui/form'

interface UrineColorFormProps {
    defaultValues?: UrineColorSchema
    onSubmit: (values: UrineColorSchema) => void
}

export function UrineColorForm({ onSubmit, defaultValues }: UrineColorFormProps) {
    const { t } = useI18n()

    const form = useForm<UrineColorSchema>({
        resolver: zodResolver(createUrineColorSchema(t)),
        defaultValues: defaultValues || urineColorValues,
    })

    return (<Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>{t("management.colorName")}</FormLabel>
                        <FormControl>
                            <Textarea placeholder={t("management.colorName")} {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <Button disabled={form.formState.isSubmitting} type="submit" className="w-full">{t(form.formState.isSubmitting?"form.submiting":"form.submit")}</Button>
        </form>
    </Form>)
}
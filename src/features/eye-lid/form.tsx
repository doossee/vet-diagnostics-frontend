import { useForm } from "react-hook-form"
import { useI18n } from "@/shared/hooks/use-i18n"
import { Input } from '@/shared/components/ui/input'
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from '@/shared/components/ui/button'
import { EyeLidSchema, createEyeLidSchema, eyeLidValues } from './eye-lid.model'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/components/ui/form'

interface EyeLidFormProps {
    defaultValues?: EyeLidSchema
    onSubmit: (values: EyeLidSchema) => void
}

export function EyeLidForm({ onSubmit, defaultValues }: EyeLidFormProps) {
    const { t } = useI18n()

    const form = useForm<EyeLidSchema>({
        resolver: zodResolver(createEyeLidSchema(t)),
        defaultValues: defaultValues || eyeLidValues,
    })

    return (<Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 h-full">
            <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>{t("management.eyeLidName")}</FormLabel>
                        <FormControl>
                            <Input placeholder={t("management.eyeLidName")} {...field} />
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
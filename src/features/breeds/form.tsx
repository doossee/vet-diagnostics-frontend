import { Breed } from "@/shared/types"
import { useForm } from "react-hook-form"
import { useI18n } from "@/shared/hooks/use-i18n"
import { Input } from '@/shared/components/ui/input'
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from '@/shared/components/ui/button'
import { BreedSelect } from './components/breed-select'
import { BreedSchema, breedValues, createBreedSchema } from './breed'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/components/ui/form'

interface BreedFormProps {
    defaultValues?: BreedSchema
    onSubmit: (values: BreedSchema) => void
}

export function BreedForm({ onSubmit, defaultValues }: BreedFormProps) {
    const { t } = useI18n()

    const form = useForm<BreedSchema>({
        resolver: zodResolver(createBreedSchema(t)),
        defaultValues: defaultValues || breedValues,
    })

    return (<Form {...form}>
        
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 h-full">
            <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>{t("management.breedName")}</FormLabel>
                        <FormControl>
                            <Input placeholder={t("management.breedName")} {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <BreedSelect name="parentId" form={form} />

            <div className="flex-1" />
            <Button disabled={form.formState.isSubmitting} type="submit" className="w-full">{t(form.formState.isSubmitting?"form.submiting":"form.submit")}</Button>
        </form>
    </Form>)
}
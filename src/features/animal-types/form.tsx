import { useForm } from "react-hook-form"
import { useI18n } from "@/shared/hooks/use-i18n"
import { Input } from '@/shared/components/ui/input'
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from '@/shared/components/ui/button'
import { AnimalTypeSchema, animalTypeValues, createAnimalTypeSchema } from './animal-type.model'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/components/ui/form'

interface AnimalTypeFormProps {
    defaultValues: AnimalTypeSchema | undefined
    onSubmit: (values: AnimalTypeSchema) => void
}

export function AnimalTypeForm ({ onSubmit, defaultValues }: AnimalTypeFormProps) {
    const { t } = useI18n()

    const form = useForm<AnimalTypeSchema>({
        resolver: zodResolver(createAnimalTypeSchema(t)),
        defaultValues: defaultValues || animalTypeValues,
    })    

    return (<Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>{t('animalTypes.name')}</FormLabel>
                        <FormControl>
                            <Input placeholder={t('animalTypes.name')} {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <Button disabled={form.formState.isSubmitting} type="submit" className="w-full">{form.formState.isSubmitting?t('form.submiting'):t('form.submit')}</Button>
        </form>
    </Form>)
}
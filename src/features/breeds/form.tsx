import { Breed } from "@/shared/types"
import { useForm } from "react-hook-form"
import { useI18n } from "@/shared/hooks/use-i18n"
import { Input } from '@/shared/components/ui/input'
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from '@/shared/components/ui/button'
import { BreedSchema, breedValues, createBreedSchema } from './breed'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/select'

interface BreedFormProps {
    breeds: Breed[]
    defaultValues?: BreedSchema
    onSubmit: (values: BreedSchema) => void
}

export function BreedForm({ onSubmit, breeds, defaultValues }: BreedFormProps) {
    const { t } = useI18n()

    const form = useForm<BreedSchema>({
        resolver: zodResolver(createBreedSchema(t)),
        defaultValues: defaultValues || breedValues,
    })

    return (<Form {...form}>
        
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
            <FormField
                name="parentId"
                control={form.control}
                render={({ field: { value, onChange, ...others } }) => (
                    <FormItem>
                        <FormLabel>{t('management.breedParent')}</FormLabel>
                        <FormControl>
                            <Select value={value ? String(value) : ""} onValueChange={e => onChange(+e)} {...others}>
                                <SelectTrigger>
                                    <SelectValue placeholder={t('management.breedParent')} />
                                </SelectTrigger>
                                <SelectContent>
                                    {
                                        breeds.map((b, i) => <SelectItem key={i} value={String(b.id)}>{b.name}</SelectItem>)
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
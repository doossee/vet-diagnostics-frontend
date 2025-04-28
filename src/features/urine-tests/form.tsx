import { useForm } from "react-hook-form"
import { useI18n } from "@/shared/hooks/use-i18n"
import { Input } from '@/shared/components/ui/input'
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from '@/shared/components/ui/button'
import { Disease, Animal, UrineColor } from '@/shared/types'
import { CLARITY_TYPES, SMELL_TYPES } from "@/shared/constants"
import { AnimalSelect } from "@/shared/components/animal-select"
import { UrineTestSchema, createUrineTestSchema, urineTestValues } from './urine-test.model'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/select'

interface UrineTestFormProps {
    diseases: Disease[]
    urineColors: UrineColor[]
    defaultValues?: UrineTestSchema
    onSubmit: (values: UrineTestSchema) => void
}

export function UrineTestForm({ onSubmit, defaultValues, diseases, urineColors }: UrineTestFormProps) {
    const { t, locale } = useI18n()

    const form = useForm<UrineTestSchema>({
        resolver: zodResolver(createUrineTestSchema(t)),
        defaultValues: defaultValues || urineTestValues as any,
    })

    return (<Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
                name="consistency"
                control={form.control}
                render={({ field }) => (
                    <FormItem className="flex flex-col gap-1 pt-1.5">
                        <FormLabel>{t("inspections.consistency")}</FormLabel>
                        <FormControl>
                            <Input type="number" placeholder={t("inspections.consistency")} {...field} />
                        </FormControl>
                    </FormItem>
                )}
            />
            <FormField
                name="smell"
                control={form.control}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>{t("inspections.smell")}</FormLabel>
                        <FormControl>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger>
                                    <SelectValue placeholder={t("inspections.smell")} />
                                </SelectTrigger>
                                <SelectContent>
                                    {
                                        Object.keys(SMELL_TYPES).map(k => <SelectItem key={k} value={k}>{SMELL_TYPES[k as keyof typeof SMELL_TYPES][locale]}</SelectItem>)
                                    }
                                </SelectContent>
                            </Select>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />                    
            <FormField
                name="clarity"
                control={form.control}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>{t("inspections.clarity")}</FormLabel>
                        <FormControl>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger>
                                    <SelectValue placeholder={t("inspections.clarity")} />
                                </SelectTrigger>
                                <SelectContent>
                                    {
                                        Object.keys(CLARITY_TYPES).map(k => <SelectItem key={k} value={k}>{CLARITY_TYPES[k as keyof typeof CLARITY_TYPES][locale]}</SelectItem>)
                                    }
                                </SelectContent>
                            </Select>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                name="diseaseId"
                control={form.control}
                render={({ field: { value, onChange, ...others } }) => (
                    <FormItem>
                        <FormLabel>{t("form.disease")}</FormLabel>
                        <FormControl>
                            <Select value={value ? String(value) : ""} onValueChange={e => onChange(+e)} {...others}>
                                <SelectTrigger>
                                    <SelectValue placeholder={t("form.disease")} />
                                </SelectTrigger>
                                <SelectContent>
                                    {
                                        diseases.map(d => <SelectItem key={d.id} value={String(d.id)}>{new Date(d.startTime).toLocaleDateString()}-{new Date(d.endTime).toLocaleDateString()}</SelectItem>)
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
                name="colorId"
                control={form.control}
                render={({ field: { value, onChange, ...others } }) => (
                    <FormItem>
                        <FormLabel>{t("form.color")}</FormLabel>
                        <FormControl>
                            <Select value={value ? String(value) : ""} onValueChange={e => onChange(+e)} {...others}>
                                <SelectTrigger>
                                    <SelectValue placeholder={t("form.color")} />
                                </SelectTrigger>
                                <SelectContent>
                                    {
                                        urineColors.map(d => <SelectItem key={d.id} value={String(d.id)}>{d.name}</SelectItem>)
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
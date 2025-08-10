import { Region } from "@/shared/types"
import { useForm } from "react-hook-form"
import { useI18n } from "@/shared/hooks/use-i18n"
import { Input } from '@/shared/components/ui/input'
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from '@/shared/components/ui/button'
import { DistrictSchema, createDistrictSchema, districtValues } from './districts'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/select'

interface DistrictFormProps {
    regions: Region[]
    defaultValues?: DistrictSchema
    onSubmit: (values: DistrictSchema) => void
}

export function DistrictForm({ onSubmit, regions, defaultValues }: DistrictFormProps) {
    const { t } = useI18n()

    const form = useForm<DistrictSchema>({
        resolver: zodResolver(createDistrictSchema(t)),
        defaultValues: defaultValues || districtValues as any,
    })

    return (<Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 h-full">
            <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>{t('form.districtName')}</FormLabel>
                        <FormControl>
                            <Input placeholder={t('form.districtName')} {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                name="regionId"
                control={form.control}
                render={({ field: { value, onChange, ...others } }) => (
                    <FormItem>
                        <FormLabel>{t('form.regionName')}</FormLabel>
                        <FormControl>
                            <Select value={value?String(value):""} onValueChange={e => onChange(+e)} {...others}>
                                <SelectTrigger>
                                    <SelectValue placeholder={t('form.regionName')} />
                                </SelectTrigger>
                                <SelectContent>
                                    {
                                        regions.map(r => <SelectItem key={r.id} value={String(r.id)}>{r.name}</SelectItem>)
                                    }
                                </SelectContent>
                            </Select>
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
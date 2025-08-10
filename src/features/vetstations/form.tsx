import { useForm } from "react-hook-form"
import { Region, District } from "@/shared/types"
import { useI18n } from "@/shared/hooks/use-i18n"
import { Input } from '@/shared/components/ui/input'
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from '@/shared/components/ui/button'
import { VetStationSchema, createVetStationSchema, vetStationValues } from './vetstations'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/select'

interface VetStationFormProps {
    regions: Region[]
    districts: District[]
    regionId: number | null
    defaultValues?: VetStationSchema
    setRegionId: (p: any) => any
    onSubmit: (values: VetStationSchema) => void
}

export function VetStationForm({ onSubmit, setRegionId, regions, districts, regionId, defaultValues }: VetStationFormProps) {
    const { t } = useI18n()

    const form = useForm<VetStationSchema>({
        resolver: zodResolver(createVetStationSchema(t)),
        defaultValues: defaultValues || vetStationValues as any,
    })

    return (<Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 h-full">
            <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>{t('regions.vetStationName')}</FormLabel>
                        <FormControl>
                            <Input placeholder={t('regions.vetStationName')} {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                name="address"
                control={form.control}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>{t('regions.vetStationAddress')}</FormLabel>
                        <FormControl>
                            <Input placeholder={t('regions.vetStationAddress')} {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            
            <div className="grid gap-2 pt-2">
                <FormLabel>{t('form.regionName')}</FormLabel>
                <FormControl>
                    <Select value={regionId?String(regionId):""} onValueChange={e => setRegionId(+e)}>
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
            </div>
            <FormField
                name="districtId"
                control={form.control}
                render={({ field: { value, onChange, ...others } }) => (
                    <FormItem>
                        <FormLabel>{t("form.districtName")}</FormLabel>
                        <FormControl>
                            <Select value={value?String(value):""} onValueChange={e => onChange(+e)} {...others}>
                                <SelectTrigger>
                                    <SelectValue placeholder={t("form.districtName")} />
                                </SelectTrigger>
                                <SelectContent>
                                    {
                                        districts.map(d => <SelectItem key={d.id} value={String(d.id)}>{d.name}</SelectItem>)
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
"use client";

import { z } from "zod"
import { VaccineType } from '~/lib/type'
import { useForm } from "react-hook-form"
import { useTranslations } from "next-intl"
import { Button } from '~/components/ui/button'
import { zodResolver } from "@hookform/resolvers/zod"
import { DatePicker } from '~/components/date-picker'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'

interface VaccineFormProps {
    onSubmit: any
    types: VaccineType[]
}

export function VaccineForm({ onSubmit, types }: VaccineFormProps) {
    const t = useTranslations()

    const formSchema = z.object({
        date: z.date({ required_error: t("required.dateRequired"), invalid_type_error: t("required.dateRequired") }),
        typeId: z.number({ required_error: t("required.vaccineTypeRequired"), invalid_type_error: t("required.vaccineTypeRequired") }),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            date: null,
            typeId: null,
        } as any,
    })

    return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
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
                                        types?.map(d => <SelectItem key={d.id} value={String(d.id)}>{d.name}</SelectItem>)
                                    }
                                </SelectContent>
                            </Select>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <span className="hidden sm:block md:hidden"></span>
            <div className="flex items-end">
                <Button disabled={form.formState.isSubmitting} type="submit" className="w-full">{t(form.formState.isSubmitting?"form.submiting":"form.submit")}</Button>
            </div>
        </form>
    </Form>
    )
}
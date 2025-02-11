"use client";

import { z } from "zod"
import { useForm } from "react-hook-form"
import { Input } from '~/components/ui/input'
import { Divider } from "~/components/divider"
import { Button } from '~/components/ui/button'
import { Textarea } from "~/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { useLocale, useTranslations } from "next-intl"
import { Color, Eyelid, LeatherCover } from '~/lib/type'
import { CUSTOMER_TYPES, OBESITY_TYPES, BODY_TYPES, BODY_STRUCTURES, POSITIONS } from '~/constants'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'

interface GeneralInspectionFormProps {
    onSubmit: any
    colors: Color[]
    eyeLids: Eyelid[]
    leatherCovers: LeatherCover[]
}

export function GeneralInspectionForm({ onSubmit, colors, leatherCovers, eyeLids }: GeneralInspectionFormProps) {
    const t = useTranslations()
    const locale = useLocale() as 'uz' | 'ru'

    const formSchema = z.object({
        colorId: z.number({ required_error: t("required.colorRequired"), invalid_type_error: t("required.colorRequired") }),
        eyelidId: z.number({ required_error: t("required.eyeLidRequired"), invalid_type_error: t("required.eyeLidRequired") }),
        leatherCoverId: z.number({ required_error: t("required.leatherCoverRequired"), invalid_type_error: t("required.leatherCoverRequired") }),
        character: z.enum(["MOBILE", "CALM"], { required_error: t("required.customerTypeRequired"), invalid_type_error: t("required.customerTypeRequired") }),
        bodyType: z.enum(["WEAK", "MEDIUM", "STRONG"], { required_error: t("required.bodyTypeRequired"), invalid_type_error: t("required.bodyTypeRequired") }),
        obesity: z.enum(["HIGH", "MEDIUM", "LOW", "LEAN", "CACHEXIA"], { required_error: t("required.obesityRequired"), invalid_type_error: t("required.obesityRequired") }),
        bodyPosition: z.enum(["NATURAL", "FORCED", "FORCED_STANDING", "FORCED_LYING", "FORCED_SITTING", "NON_THERAPEUTIC"], { required_error: t("required.bodyPositionRequired"), invalid_type_error: t("required.bodyPositionRequired") }),
        bodyStructure: z.enum(["COARSE", "SLIM", "DENSE", "WEAK"], { required_error: t("required.bodyStructureTypeRequired"), invalid_type_error: t("required.bodyStructureTypeRequired") }),
        pulse: z.coerce.number().min(1, t("required.pulseGreetThan0")),
        temperature: z.coerce.number().min(1, t("required.temperatureThan0")),
        rumination: z.coerce.number().min(1, t("required.ruminationGreetThan0")),
        respiratoryRate: z.coerce.number().min(1, t("required.respiratoryRateGreetThan0")),
        conclusion: z.string(),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            colorId: null,
            eyelidId: null,
            character: "CALM",
            bodyType: "MEDIUM",
            obesity: "CACHEXIA",
            leatherCoverId: null,
            bodyPosition: "NATURAL",
            bodyStructure: "COARSE",

            pulse: 0,
            rumination: 0,
            temperature: 0,
            conclusion: "",
            respiratoryRate: 0,
        } as any,
    })

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

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
                                            colors?.map(d => <SelectItem key={d.id} value={String(d.id)}>{d.name}</SelectItem>)
                                        }
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    name="leatherCoverId"
                    control={form.control}
                    render={({ field: { value, onChange, ...others } }) => (
                        <FormItem>
                            <FormLabel>{t("management.leatherCover")}</FormLabel>
                            <FormControl>
                                <Select value={value ? String(value) : ""} onValueChange={e => onChange(+e)} {...others}>
                                    <SelectTrigger>
                                        <SelectValue placeholder={t("management.leatherCover")} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {
                                            leatherCovers?.map(d => <SelectItem key={d.id} value={String(d.id)}>{d.name}</SelectItem>)
                                        }
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    name="eyelidId"
                    control={form.control}
                    render={({ field: { value, onChange, ...others } }) => (
                        <FormItem>
                            <FormLabel>{t("management.eyeLid")}</FormLabel>
                            <FormControl>
                                <Select value={value ? String(value) : ""} onValueChange={e => onChange(+e)} {...others}>
                                    <SelectTrigger>
                                        <SelectValue placeholder={t("management.eyeLid")} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {
                                            eyeLids?.map(d => <SelectItem key={d.id} value={String(d.id)}>{d.name}</SelectItem>)
                                        }
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />


                <Divider label={t("inspections.habitus")} className="col-span-1 md:col-span-2 lg:col-span-3" />

                <FormField
                    name="obesity"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t("inspections.obesity")}</FormLabel>
                            <FormControl>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <SelectTrigger>
                                        <SelectValue placeholder={t("inspections.obesity")} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {
                                            Object.keys(OBESITY_TYPES).map(k => <SelectItem key={k} value={k}>{OBESITY_TYPES[k as keyof typeof OBESITY_TYPES][locale]}</SelectItem>)
                                        }
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    name="bodyType"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t("inspections.bodyType")}</FormLabel>
                            <FormControl>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <SelectTrigger>
                                        <SelectValue placeholder={t("inspections.bodyType")} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {
                                            Object.keys(BODY_TYPES).map(k => <SelectItem key={k} value={k}>{BODY_TYPES[k as keyof typeof BODY_TYPES][locale]}</SelectItem>)
                                        }
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    name="bodyPosition"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t("inspections.bodyPosition")}</FormLabel>
                            <FormControl>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <SelectTrigger>
                                        <SelectValue placeholder={t("inspections.bodyPosition")} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {
                                            Object.keys(POSITIONS).map(k => <SelectItem key={k} value={k}>{POSITIONS[k as keyof typeof POSITIONS][locale]}</SelectItem>)
                                        }
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    name="bodyStructure"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t("inspections.bodyStructure")}</FormLabel>
                            <FormControl>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <SelectTrigger>
                                        <SelectValue placeholder={t("inspections.bodyStructure")} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {
                                            Object.keys(BODY_STRUCTURES).map(k => <SelectItem key={k} value={k}>{BODY_STRUCTURES[k as keyof typeof BODY_STRUCTURES][locale]}</SelectItem>)
                                        }
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    name="character"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t("inspections.customerType")}</FormLabel>
                            <FormControl>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <SelectTrigger>
                                        <SelectValue placeholder={t("inspections.customerType")} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {
                                            Object.keys(CUSTOMER_TYPES).map(k => <SelectItem key={k} value={k}>{CUSTOMER_TYPES[k as keyof typeof CUSTOMER_TYPES][locale]}</SelectItem>)
                                        }
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Divider label={t("inspections.inspection")} className="col-span-1 md:col-span-2 lg:col-span-3" />

                <FormField
                    name="pulse"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem className="flex flex-col gap-1 pt-1.5">
                            <FormLabel>{t("inspections.pulse")}</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder={t("inspections.pulse")} {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    name="rumination"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem className="flex flex-col gap-1 pt-1.5">
                            <FormLabel>{t("inspections.rumination")}</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder={t("inspections.rumination")} {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    name="temperature"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem className="flex flex-col gap-1 pt-1.5">
                            <FormLabel>{t("inspections.temperature")}</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder={t("inspections.temperature")} {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    name="respiratoryRate"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem className="flex flex-col gap-1 pt-1.5">
                            <FormLabel>{t("inspections.respiratoryRate")}</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder={t("inspections.respiratoryRate")} {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    name="conclusion"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem className="flex flex-col gap-1 pt-1.5 md:col-span-2">
                            <FormLabel>{t("inspections.conclusion")}</FormLabel>
                            <FormControl>
                                <Textarea className="resize-none" rows={6} placeholder={t("inspections.conclusion")} {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <span className="hidden lg:block"></span>
                <span className="hidden md:block"></span>
                <div className="flex items-end">
                    <Button disabled={form.formState.isSubmitting} type="submit" className="w-full">{t(form.formState.isSubmitting ? "form.submiting" : "form.next")}</Button>
                </div>
            </form>
        </Form>
    )
}
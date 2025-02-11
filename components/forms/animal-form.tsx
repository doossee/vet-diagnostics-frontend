"use client";

import { z } from "zod"
import { useForm } from "react-hook-form"
import { ANIMAL_GENDERS } from '~/constants'
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'
import { zodResolver } from "@hookform/resolvers/zod"
import { DatePicker } from '~/components/date-picker'
import { useLocale, useTranslations } from "next-intl"
import { AnimalType, Breed, Color, Farmer } from '~/lib/type'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'

interface AnimalFormProps {
    onSubmit: any
    breeds: Breed[]
    colors: Color[]
    farmers?: Farmer[]
    showFarmer: boolean
    types: AnimalType[]
}

export function AnimalForm({ onSubmit, types, colors, breeds, farmers, showFarmer }: AnimalFormProps) {
    const t = useTranslations()
    const locale = useLocale() as 'uz' | 'ru'

    const formSchema = z.object({
        birthDate: z.date({ required_error: t('required.birthDateRequired'), invalid_type_error: t('required.birthDateRequired') }),
        colorId: z.number({ required_error: t('required.colorRequired'), invalid_type_error: t('required.colorRequired') }),
        arrivalDate: z.date({ required_error: t("required.arrivalDateRequired"), invalid_type_error: t("required.arrivalDateRequired") }),
        farmerId: z.number().nullable(),
        breedId: z.number().min(1, t("required.breedRequired")),
        gender: z.enum(["MALE", "FEMALE"], { required_error: t("required.genderRequired"), invalid_type_error: t("required.genderRequired") }),
        nameOrCode: z.string().min(1, t("required.animalNameRequired")),
        typeId: z.number().min(1, t("required.animalTypeRequired")),
        weight: z.number().min(1, t("required.weightRequired")),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nameOrCode: "",
            weight: 0,
            typeId: null,
            breedId: null,
            colorId: null,
            farmerId: null,
            gender: "MALE",
            birthDate: null,
            arrivalDate: null,
        } as any,
    })

    return (
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <FormField
                name="nameOrCode"
                control={form.control}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>{t('animals.name')}</FormLabel>
                        <FormControl>
                            <Input placeholder={t('animals.name')} {...field} />
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
                        <FormLabel>{t('form.type')}</FormLabel>
                        <FormControl>
                            <Select value={value?String(value):""} onValueChange={e => onChange(+e)} {...others}>
                                <SelectTrigger>
                                    <SelectValue placeholder={t('form.type')} />
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
            <FormField
                name="colorId"
                control={form.control}
                render={({ field: { value, onChange, ...others } }) => (
                    <FormItem>
                        <FormLabel>{t('animals.color')}</FormLabel>
                        <FormControl>
                            <Select value={value?String(value):""} onValueChange={e => onChange(+e)} {...others}>
                                <SelectTrigger>
                                    <SelectValue placeholder={t('animals.color')} />
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
                name="weight"
                control={form.control}
                render={({ field: { value, onChange, ...other } }) => (
                    <FormItem>
                        <FormLabel>{t('animals.weight')}</FormLabel>
                        <FormControl>
                            <Input type="number" placeholder={t('animals.weight')} value={value} onChange={v => onChange(+v.target.value)} {...other} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                name="gender"
                control={form.control}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>{t('form.gender')}</FormLabel>
                        <FormControl>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger>
                                    <SelectValue placeholder={t('form.gender')} />
                                </SelectTrigger>
                                <SelectContent>
                                    {
                                        ANIMAL_GENDERS.map(g => <SelectItem key={g.value} value={g.value}>{g[locale]}</SelectItem>)
                                    }
                                </SelectContent>
                            </Select>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                name="breedId"
                control={form.control}
                render={({ field: { value, onChange, ...others } }) => (
                    <FormItem>
                        <FormLabel>{t('animals.breed')}</FormLabel>
                        <FormControl>
                            <Select  value={value ? String(value) : ""} onValueChange={e => onChange(+e)} {...others}>
                                <SelectTrigger>
                                    <SelectValue placeholder={t('animals.breed')} />
                                </SelectTrigger>
                                <SelectContent>
                                    {
                                        breeds?.map(g => <SelectItem key={g.id} value={String(g.id)}>{g.name}</SelectItem>)
                                    }
                                </SelectContent>
                            </Select>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                name="birthDate"
                control={form.control}
                render={({ field }) => (
                    <FormItem className="flex flex-col pt-1.5 gap-1">
                        <FormLabel>{t('form.birthDate')}</FormLabel>
                        <FormControl>
                            <DatePicker field={field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                name="arrivalDate"
                control={form.control}
                render={({ field }) => (
                    <FormItem className="flex flex-col pt-1.5 gap-1">
                        <FormLabel>{t('animals.arrivalDate')}</FormLabel>
                        <FormControl>
                            <DatePicker field={field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            
            {showFarmer && <FormField
                name="farmerId"
                control={form.control}
                render={({ field: { value, onChange, ...others } }) => (
                    <FormItem>
                        <FormLabel>{t('form.farmer')}</FormLabel>
                        <FormControl>
                            <Select value={value ? String(value) : ""} onValueChange={e => onChange(+e)} {...others}>
                                <SelectTrigger>
                                    <SelectValue placeholder={t('form.farmer')} />
                                </SelectTrigger>
                                <SelectContent>
                                    {
                                        farmers?.map((v, i) => <SelectItem key={i} value={String(v?.user?.id)}>{v.user?.firstName} {v.user.lastName}</SelectItem>)
                                    }
                                </SelectContent>
                            </Select>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />}
            <span className="hidden lg:block"></span>
            <span className="hidden lg:block"></span>
            <div className="flex items-end">
                <Button disabled={form.formState.isSubmitting} type="submit" className="w-full">{t(form.formState.isSubmitting?"form.submiting":"form.next")}</Button>
            </div>
        </form>
    </Form>
    )
}
import clsx from "clsx"
import { ReactNode } from "react"
import { useForm } from "react-hook-form"
import { useI18n } from "@/shared/hooks/use-i18n"
import { ANIMAL_GENDERS } from '@/shared/constants'
import { Input } from '@/shared/components/ui/input'
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from '@/shared/components/ui/button'
import { DatePicker } from '@/shared/components/date-picker'
import { AnimalType, Farmer, Color, Breed } from '@/shared/types'
import { AnimalSchema, animalValues, createAnimalSchema } from './animal.model'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/select'

interface AnimalFormProps {
    breeds: Breed[]
    colors: Color[]
    farmers: Farmer[]
    showFarmer: boolean
    animalTypes: AnimalType[]
    defaultValues?: AnimalSchema
    submitRightContent?: ReactNode
    onSubmit: (values: AnimalSchema) => void
}

export function AnimalForm({ onSubmit, animalTypes, breeds, colors, defaultValues, farmers, showFarmer, submitRightContent }: AnimalFormProps) {
    const { t, locale } = useI18n()

    const form = useForm<AnimalSchema>({
        resolver: zodResolver(createAnimalSchema(t)),
        defaultValues: defaultValues ? {
            ...defaultValues,
            arrivalDate: new Date(defaultValues.arrivalDate),
            birthDate: new Date(defaultValues.birthDate)
        } : animalValues as any,
    })

    return (<Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 h-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                <Select value={value ? String(value) : ""} onValueChange={e => onChange(+e)} {...others}>
                                    <SelectTrigger>
                                        <SelectValue placeholder={t('form.type')} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {
                                            animalTypes.map(d => <SelectItem key={d.id} value={String(d.id)}>{d.name}</SelectItem>)
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
                                <Select value={value ? String(value) : ""} onValueChange={e => onChange(+e)} {...others}>
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
                                <Select value={value ? String(value) : ""} onValueChange={e => onChange(+e)} {...others}>
                                    <SelectTrigger>
                                        <SelectValue placeholder={t('animals.breed')} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {
                                            breeds.map(g => <SelectItem key={g.id} value={String(g.id)}>{g.name}</SelectItem>)
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
                                            farmers.map((v, i) => <SelectItem key={i} value={String(v.user?.id)}>{v.user?.firstName} {v.user.lastName}</SelectItem>)
                                        }
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />}
            </div>
            <div className="flex-1 flex items-end w-full">
                <div className={clsx("grid place-items-end gap-4 w-full", submitRightContent ? "grid-cols-2" : "")}>
                    <Button disabled={form.formState.isSubmitting} type="submit" className="w-full">{t(form.formState.isSubmitting ? "form.submiting" : "form.submit")}</Button>
                    {submitRightContent}
                </div>
            </div>
        </form>
    </Form>)
}
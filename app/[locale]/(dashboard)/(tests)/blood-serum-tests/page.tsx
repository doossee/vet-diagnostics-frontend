'use client'

import { z } from "zod"
import { useState } from 'react'
import { useForm } from "react-hook-form"
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'
import type { BloodSerumTest } from "~/lib/type"
import { useQuery } from "@tanstack/react-query"
import { DataTable } from '~/components/data-table'
import { DialogTitle } from '@radix-ui/react-dialog'
import { zodResolver } from "@hookform/resolvers/zod"
import { useLocale, useTranslations } from "next-intl"
import { BLOOD_SERUM_TESTS, ALERT_MESSAGES } from '~/constants'
import { Dialog, DialogContent, DialogHeader } from "~/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import { animalsControllerFindAll, bloodSerumTestsControllerCreate, bloodSerumTestsControllerFindAll, bloodSerumTestsControllerRemove, bloodSerumTestsControllerUpdate } from '~/lib/api'

type BLOOD_SERUM = keyof typeof BLOOD_SERUM_TESTS

const defaultValues: any = {}
const formSchemaValues: any = {}


export default function BloodSerumTests() {
    const t = useTranslations()
    const locale = useLocale() as 'ru' | 'uz'

    Object.keys(BLOOD_SERUM_TESTS).map(key => {
        defaultValues[key] = 0
        formSchemaValues[key] = z.coerce.number().min(1, BLOOD_SERUM_TESTS[key as BLOOD_SERUM][locale] + " " + t("required.moreThan0"))
    })

    const COLUMNS = [
        ...Object.keys(BLOOD_SERUM_TESTS).map(key => ({
            key,
            title: BLOOD_SERUM_TESTS[key as BLOOD_SERUM][locale],
        })),
        { title: t('form.animal'), key: 'animal', render(item: BloodSerumTest) {
            return item.animal?.name
        } },
        { title: t("table.actions"), key: 'actions', render(item: BloodSerumTest) {
            return (<div className="flex gap-2 items-center">
                <Button onClick={() => handleEditItem(item)} size='sm'>
                    {t("table.edit")}
                </Button>
                <Button onClick={() => handleDelete(item.id)} size='sm'>
                    {t("table.delete")}
                </Button>
            </div>)
        } },
    ]

    const [dialog, setDialog] = useState(false)
    const [loading, setLoading] = useState(true)
    const [totalItems, setTotalItems] = useState(0)
    const [items, setItems] = useState<BloodSerumTest[]>([])
    const [itemId, setItemId] = useState<number | null>(null)
    
    const formSchema = z.object({
        animalId: z.number({ required_error: t('required.animalRequired'), invalid_type_error: t('required.animalRequired') }),
        ...formSchemaValues
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            animalId: null,
            ...defaultValues,
        } as any,
    })

    const { data: animals }: any = useQuery({
        queryKey: ['animals'],
        queryFn: () => animalsControllerFindAll({page: 1, perPage: 100}),
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            if (itemId) {
                const data: any = await bloodSerumTestsControllerUpdate(itemId, values as any)
                setItems(p => p.map(i => {
                    if(i.id === itemId) return data
                    return i
                }))
            } else {
                const data: any = await bloodSerumTestsControllerCreate(values as any)
                setItems(p => [...p, data])
            }
    
            handleClose()
        } catch (error) {
            console.log(error)            
        }
    }

    async function handleGetItems(params: any) {
        try {
            setLoading(true)
            const { data, meta } = await bloodSerumTestsControllerFindAll(params)
            setItems(data as any)
            setTotalItems(meta.total)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    async function handleDelete(id: number) {
        try {
            if(!confirm(ALERT_MESSAGES.DELETE_CONFIRM[locale])) return
            await bloodSerumTestsControllerRemove(id)
            setItems(p => p.filter(i => i.id !== id))
        } catch (error) {
            console.log(error)
        }
    }

    function handleEditItem(item: BloodSerumTest) {
        setDialog(true)
        setItemId(item.id)

        form.setValue('animalId', item.animalId)
        Object.keys(BLOOD_SERUM_TESTS).map((key) => {
            form.setValue(key as BLOOD_SERUM, (item as any)[key as BLOOD_SERUM])
        })
    }

    function handleClose() {
        form.reset()
        setItemId(null)
        setDialog(false)
    }

    return (
        <div>
            <DataTable
                loading={loading}
                columns={COLUMNS}
                items={items as any}
                totalItems={totalItems}
                callback={handleGetItems}
                topSlot={<Button onClick={() => setDialog(true)} size={'default'} className="!mt-0 w-full sm:w-fit">{t('inspections.createBloodSerumTest')}</Button>}
            />

            <Dialog open={dialog} onOpenChange={handleClose}>
                <DialogContent className="overflow-auto max-h-screen md:max-h-[95vh] max-w-[600px]" aria-describedby={undefined}>
                    <DialogHeader>
                        <DialogTitle>{t(itemId?"inspections.editBloodSerumTest":"inspections.createBloodSerumTest")}</DialogTitle>
                    </DialogHeader>
                    
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <FormField
                                name="animalId"
                                control={form.control}
                                render={({ field: { value, onChange, ...others } }) => (
                                    <FormItem className="col-span-1 sm:col-span-2">
                                        <FormLabel>{t('form.animal')}</FormLabel>
                                        <FormControl>
                                            <Select value={value ? String(value) : ""} onValueChange={e => onChange(+e)} {...others}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder={t('form.animal')} />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {
                                                        animals?.data?.map((a: any) => <SelectItem key={a.id} value={String(a.id)}>{a.name}</SelectItem>)
                                                    }
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {
                                Object.keys(BLOOD_SERUM_TESTS).map(key => {
                                    return (
                                        <FormField
                                            key={key}
                                            control={form.control}
                                            name={key as BLOOD_SERUM}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>{BLOOD_SERUM_TESTS[key as BLOOD_SERUM][locale]}</FormLabel>
                                                    <FormControl>
                                                        <Input type="number" placeholder={BLOOD_SERUM_TESTS[key as BLOOD_SERUM][locale]} {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    )
                                })
                            }
                            <Button disabled={form.formState.isSubmitting} type="submit" className="w-full">{t(form.formState.isSubmitting?"form.submiting":"form.submit")}</Button>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </div>
    )
}
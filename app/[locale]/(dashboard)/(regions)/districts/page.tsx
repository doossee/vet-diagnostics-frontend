'use client'

import { z } from "zod"
import { useState } from 'react'
import { useForm } from "react-hook-form"
import type { District } from "~/lib/type"
import { useLocale, useTranslations } from 'next-intl'
import { ALERT_MESSAGES } from "~/constants"
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'
import { useQuery } from "@tanstack/react-query"
import { DataTable } from '~/components/data-table'
import { DialogTitle } from '@radix-ui/react-dialog'
import { zodResolver } from "@hookform/resolvers/zod"
import { Dialog, DialogContent, DialogHeader } from "~/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import { districtsControllerFindAll, districtsControllerCreate, districtsControllerUpdate, districtsControllerRemove, regionsControllerFindAll } from '~/lib/api'

export default function Districts() {
    const t = useTranslations()
    const locale = useLocale() as 'uz' | 'ru'

    const COLUMNS = [
        { title: t('form.districtName'), key: 'name' },
        { title: t('form.regionName'), key: 'region', render(item: District) {
            return item.region?.name
        } },
        { title: t('table.actions'), key: 'actions', hideTitleInMobile: true, render(item: District) {
            return (<div className="flex gap-2 items-center">
                <Button onClick={() => handleEditItem(item)} size='sm'>
                    {t('table.edit')}
                </Button>
                <Button onClick={() => handleDelete(item.id)} size='sm'>
                    {t('table.delete')}
                </Button>
            </div>)
        } },
    ]
    
    const [total, setTotal] = useState(0)
    const [dialog, setDialog] = useState(false)
    const [loading, setLoading] = useState(true)
    const [items, setItems] = useState<District[]>([])
    const [itemId, setItemId] = useState<number|null>(null)

    const formSchema = z.object({
        name: z.string().min(1, t("required.districtNameRequired")),
        regionId: z.number({ required_error: t("required.regionRequired"), invalid_type_error: t("required.regionRequired") }),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          name: "",
          regionId: null
        } as any,
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            if(itemId) {
                const data: any = await districtsControllerUpdate(itemId, values as any)
                setItems(p => p.map(i => {
                    if(i.id === itemId) return data
                    return i
                }))
            } else {
                const data: any = await districtsControllerCreate(values as any)
                setItems(p => [...p, data])
            }
    
            handleClose()
        } catch (error) {
            console.log(error)            
        }
    }

    async function handleGetItems(params: any) {
        setLoading(true)
        const {data, meta} = await districtsControllerFindAll(params)
        setLoading(false)
        setTotal(meta.total)
        setItems(data as any)
    }

    async function handleDelete(id: number) {
        if(!confirm(ALERT_MESSAGES.DELETE_CONFIRM[locale])) return
        await districtsControllerRemove(id)
        setItems(p => p.filter(i => i.id !== id))
    }

    function handleEditItem(item: District) {
        setDialog(true)
        setItemId(item.id)

        form.setValue('name', item.name)
        form.setValue('regionId', item.regionId)
    }

    function handleClose() {
        form.reset()
        setItemId(null)
        setDialog(false)
    }

    const { data: regions } = useQuery({
        queryKey: ['regions'],
        queryFn: () => regionsControllerFindAll({ page: 1, perPage: 1000 })
    })

    return (
        <div>
            <DataTable
                loading={loading}
                columns={COLUMNS}
                totalItems={total}
                items={items as any}
                callback={handleGetItems}
                topSlot={
                    <Button onClick={() => setDialog(true)} size={'default'} className="!mt-0 w-full sm:w-fit">{t('regions.createDistrict')}</Button>
                } 
            />

            <Dialog open={dialog} onOpenChange={handleClose}>
                <DialogContent className="bg-card overflow-auto max-h-screen md:max-h-[95vh] max-w-[500px]" aria-describedby={undefined}>
                    <DialogHeader>
                        <DialogTitle>{t(itemId?"regions.editDistrict":"regions.createDistrict")}</DialogTitle>
                    </DialogHeader>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                                                            regions?.data?.map(r => <SelectItem key={r.id} value={String(r.id)}>{r.name}</SelectItem>)
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
                        </Form>
                </DialogContent>
            </Dialog>
        </div>
    )
}
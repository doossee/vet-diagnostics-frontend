'use client'

import { z } from "zod"
import { useForm } from "react-hook-form"
import { useLocale, useTranslations } from "next-intl"
import { ALERT_MESSAGES } from "~/constants"
import type { VetStation } from "~/lib/type"
import { useCallback, useState } from 'react'
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'
import { useQuery } from "@tanstack/react-query"
import { DataTable } from '~/components/data-table'
import { DialogTitle } from '@radix-ui/react-dialog'
import { zodResolver } from "@hookform/resolvers/zod"
import { Dialog, DialogContent, DialogHeader } from "~/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import { regionsControllerFindAll, vetStationsControllerFindAll, vetStationsControllerCreate, vetStationsControllerUpdate, vetStationsControllerRemove, districtsControllerFindAll } from '~/lib/api'

export default function VetStations() {
    const t = useTranslations()
    const locale = useLocale() as 'uz' | 'ru'

    const COLUMNS = [
        { title: t('regions.vetStationName'), key: 'name' },
        { title: t('regions.vetStationAddress'), key: 'address' },
        { title: t('form.districtName'), key: 'district', render(item: VetStation) {
            return item?.district?.name
        } },
        { title: t('table.actions'), key: 'actions', render(item: VetStation) {
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

    const [dialog, setDialog] = useState(false)
    const [loading, setLoading] = useState(true)
    const [totalItems, setTotalItems] = useState(0)
    const [items, setItems] = useState<VetStation[]>([])
    const [itemId, setItemId] = useState<number|null>(null)
    const [regionId, setRegionId] = useState<number|null>(null)

    const formSchema = z.object({
        name: z.string().min(1, t('required.vetStationNameRequired')),
        address: z.string().min(1, t('required.vetStationAddressRequired')),
        districtId: z.number({ required_error: t('required.districtRequired'), invalid_type_error: t('required.districtRequired') })
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          name: "",
          address: "",
          districtId: null
        } as any,
    })

    const { data: regions } = useQuery({
        queryKey: ['regions'],
        queryFn: () => regionsControllerFindAll({page: 1, perPage: 1000})
    })

    const { data: districts } = useQuery({
        queryKey: ['districts'],
        queryFn: () => districtsControllerFindAll({page: 1, perPage: 1000})
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            if(itemId) {
                const data: any = await vetStationsControllerUpdate(itemId, values as any)
                setItems(p => p.map(i => {
                    if(i.id === itemId) return data
                    return i
                }))
            } else {
                const data: any = await vetStationsControllerCreate(values as any)
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
            const { data, meta } = await vetStationsControllerFindAll(params)
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
            await vetStationsControllerRemove(id)
            setItems(p => p.filter(i => i.id !== id))
        } catch (error) {
            console.log(error)
        }
    }

    function handleEditItem(item: VetStation) {
        setDialog(true)
        setItemId(item.id)
        handleSetRegionId(item.districtId)

        form.setValue('name', item.name)
        form.setValue('address', item.address)
        form.setValue('districtId', item.districtId)
    }

    function handleClose() {
        form.reset()
        setItemId(null)
        setDialog(false)
        setRegionId(null)
    }

    function handleSetRegionId(id: number) {
        const d = districts?.data?.find(_ => _.id === id)
        if(!d) return
        setRegionId(d.regionId)
    }

    const filteredDistricts = useCallback(() => {
        if(regionId) return districts?.data?.filter(d => d.regionId === regionId)
        else return []
    }, [regionId])

    return (
        <div>
            <DataTable
                loading={loading}
                columns={COLUMNS}
                items={items as any}
                totalItems={totalItems}
                callback={handleGetItems}
                topSlot={
                    <Button onClick={() => setDialog(true)} size={'default'} className="!mt-0 w-full sm:w-fit">{t("regions.createVetStation")}</Button>
                } 
            />

            <Dialog open={dialog} onOpenChange={handleClose}>
                <DialogContent className="bg-card overflow-auto max-h-screen md:max-h-[95vh] max-w-[500px]" aria-describedby={undefined}>
                    <DialogHeader>
                        <DialogTitle>{t(itemId?"regions.editVetStation":"regions.createVetStation")}</DialogTitle>
                    </DialogHeader>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                                                    regions?.data?.map(r => <SelectItem key={r.id} value={String(r.id)}>{r.name}</SelectItem>)
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
                                                            filteredDistricts()?.map(d => <SelectItem key={d.id} value={String(d.id)}>{d.name}</SelectItem>)
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
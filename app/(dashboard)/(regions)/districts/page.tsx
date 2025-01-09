'use client'

import { z } from "zod"
import { useState } from 'react'
import { useForm } from "react-hook-form"
import type { District } from "~/lib/type"
import { ALERT_MESSAGES } from "~/constants"
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'
import { DataTable } from '~/components/data-table'
import { DialogTitle } from '@radix-ui/react-dialog'
import { zodResolver } from "@hookform/resolvers/zod"
import { Dialog, DialogContent, DialogHeader } from "~/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import { districtsControllerFindAll, districtsControllerCreate, districtsControllerUpdate, districtsControllerRemove, regionsControllerFindAll } from '~/lib/api'
import { useQuery } from "@tanstack/react-query"

export default function Districts() {
    const COLUMNS = [
        { title: 'Tuman nomi', key: 'name' },
        { title: 'Viloyat', key: 'region', render(item: District) {
            return item.region?.name
        } },
        { title: 'Boshqarish', key: 'actions', hideTitleInMobile: true, render(item: District) {
            return (<div className="flex gap-2 items-center">
                <Button onClick={() => handleEditItem(item)} size='sm'>
                    O'zgartirish
                </Button>
                <Button onClick={() => handleDelete(item.id)} size='sm'>
                    O'chirish
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
        name: z.string().min(1, "Tuman nomi kiritilishi shart"),
        regionId: z.number().min(1, "Viloyat kiritilishi shart"),
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
        if(!confirm(ALERT_MESSAGES.DELETE_CONFIRM)) return
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
                    <Button onClick={() => setDialog(true)} size={'default'} className="!mt-0 w-full sm:w-fit">Tuman yaratish</Button>
                } 
            />

            <Dialog open={dialog} onOpenChange={handleClose}>
                <DialogContent className="bg-card overflow-auto max-h-screen md:max-h-[95vh] max-w-[500px]" aria-describedby={undefined}>
                    <DialogHeader>
                        <DialogTitle>{itemId?"Tumanni o'zgartirish":"Tuman yaratish"}</DialogTitle>
                    </DialogHeader>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                <FormField
                                    name="name"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Tuman nomi</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Tuman nomi" {...field} />
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
                                            <FormLabel>Viloyat nomi</FormLabel>
                                            <FormControl>
                                                <Select value={value?String(value):""} onValueChange={e => onChange(+e)} {...others}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Viloyat nomi" />
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
                                <Button disabled={form.formState.isSubmitting} type="submit" className="w-full">{form.formState.isSubmitting?"Yuklanyapti...":"Saqlash"}</Button>
                            </form>
                        </Form>
                </DialogContent>
            </Dialog>
        </div>
    )
}
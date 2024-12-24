'use client'

import { DataTable } from '~/components/data-table'
import { districtsControllerFindAll, districtsControllerCreate, districtsControllerUpdate, districtsControllerRemove, regionsControllerFindAll } from '~/app/api'

import { z } from "zod"
import { useForm } from "react-hook-form"
import { useEffect, useState } from 'react'
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'
import type { District, Region } from "~/lib/type"
import { DialogTitle } from '@radix-ui/react-dialog'
import { zodResolver } from "@hookform/resolvers/zod"
import { Dialog, DialogContent, DialogHeader } from "~/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'

export default function Districts() {
    const COLUMNS = [
        { title: 'Tuman nomi', key: 'name' },
        { title: 'Viloyat', key: 'region', render(item: District) {
            return item.region?.name
        } },
        { title: 'Boshqarish', key: 'actions', render(item: District) {
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
    const [regions, setRegions] = useState<Region[]>([])
    const [itemId, setItemId] = useState<number|null>(null)

    const formSchema = z.object({
        name: z.string().min(1),
        regionId: z.number().nullable(),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          name: "",
          regionId: null
        },
    })

    useEffect(() => {
        handleGetRegions()
    }, [])

    async function handleGetRegions() {
        const {data}: any = await regionsControllerFindAll({page: 1, perPage: 100})
        setRegions(data)
    }


    async function onSubmit(values: z.infer<typeof formSchema>) {
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
    }

    async function handleGetItems(params: any) {
        setLoading(true)
        const {data, meta} = await districtsControllerFindAll(params)
        setLoading(false)
        setTotal(meta.total)
        setItems(data as any)
    }

    async function handleDelete(id: number) {
        if(!confirm('Delete?')) return
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

    return (
        <div>
            <DataTable
                hideBottom
                loading={loading}
                columns={COLUMNS}
                totalItems={total}
                items={items as any}
                callback={handleGetItems}
                topSlot={
                    <Button onClick={() => setDialog(true)} size={'default'} className="w-full sm:w-fit">Tuman yaratish</Button>
                } 
            />

            <Dialog open={dialog} onOpenChange={handleClose}>
                <DialogContent style={{ maxHeight: '95vh', maxWidth: 500, overflow: 'auto'}} aria-describedby={undefined}>
                    <DialogHeader>
                        <DialogTitle>Tuman yaratish</DialogTitle>
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
                                                            regions.map(r => <SelectItem key={r.id} value={String(r.id)}>{r.name}</SelectItem>)
                                                        }
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" className="w-full">Saqlash</Button>
                            </form>
                        </Form>
                </DialogContent>
            </Dialog>
        </div>
    )
}